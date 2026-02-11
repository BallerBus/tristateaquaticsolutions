/**
 * Vercel Serverless Function: Lead Capture
 * POST /api/leads/capture
 *
 * Accepts { email, source, firstName (optional), page (optional) }
 * Creates or updates a GHL contact with exit-intent tags.
 *
 * Env vars: GHL_API_KEY, GHL_LOCATION_ID
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

const LEAD_TAGS = [
  'Exit Intent Lead',
  'Pool Guide Download',
  'Pool Installation Interest'
];

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source, firstName, page } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    console.error('GHL_API_KEY not configured');
    // Still return 200 to the client so the popup shows success
    return res.status(200).json({ ok: true, note: 'Lead captured (GHL not configured)' });
  }

  const locationId = process.env.GHL_LOCATION_ID || 'A0e67CElQk4EoVK0XY2K';

  const ghlHeaders = {
    'Authorization': `Bearer ${apiKey}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  try {
    // 1. Search for existing contact by email
    let contactId = null;
    let existingTags = [];

    const searchParams = new URLSearchParams({ locationId, email });
    const searchRes = await fetch(`${GHL_BASE_URL}/contacts/?${searchParams.toString()}`, {
      method: 'GET',
      headers: ghlHeaders
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.contacts && searchData.contacts.length > 0) {
        contactId = searchData.contacts[0].id;
        existingTags = searchData.contacts[0].tags || [];
      }
    }

    // 2. Merge tags (keep existing + add new ones)
    const mergedTags = Array.from(new Set([...existingTags, ...LEAD_TAGS]));

    // 3. Build contact payload
    const contactPayload = {
      email: email,
      locationId: locationId,
      tags: mergedTags,
      source: source || 'exit_intent_popup'
    };

    if (firstName) {
      contactPayload.firstName = firstName;
    }

    // Add custom field note about the capture
    const captureNote = [
      `Exit intent lead captured on ${new Date().toISOString()}`,
      page ? `Page: ${page}` : null,
      source ? `Source: ${source}` : null
    ].filter(Boolean).join(' | ');

    if (contactId) {
      // 4a. Update existing contact
      const updateRes = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
        method: 'PUT',
        headers: ghlHeaders,
        body: JSON.stringify({
          tags: mergedTags
        })
      });

      if (!updateRes.ok) {
        const errText = await updateRes.text();
        console.error('GHL update error:', updateRes.status, errText);
        // Still return 200 - we don't want the popup to show an error
        return res.status(200).json({ ok: true, note: 'Contact exists, tag update attempted' });
      }

      // Add a note to the contact
      await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({ body: captureNote, locationId })
      }).catch(function (e) {
        console.error('GHL note error:', e.message);
      });

      console.log('Updated existing GHL contact:', contactId);
    } else {
      // 4b. Create new contact
      const createRes = await fetch(`${GHL_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify(contactPayload)
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error('GHL create error:', createRes.status, errText);
        return res.status(200).json({ ok: true, note: 'Contact creation attempted' });
      }

      const createData = await createRes.json();
      contactId = createData.contact?.id;
      console.log('Created new GHL contact:', contactId);

      // Add a note
      if (contactId) {
        await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({ body: captureNote, locationId })
        }).catch(function (e) {
          console.error('GHL note error:', e.message);
        });
      }
    }

    return res.status(200).json({ ok: true, contactId: contactId });
  } catch (err) {
    console.error('Lead capture error:', err);
    // Return 200 anyway so the user sees the success screen
    return res.status(200).json({ ok: true, note: 'Error occurred but lead noted' });
  }
};
