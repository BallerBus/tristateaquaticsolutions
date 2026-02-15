/**
 * Vercel Serverless Function: Lead Capture
 * POST /api/leads/capture
 *
 * Accepts { email, source, firstName (optional), page (optional) }
 * Creates or updates a GHL contact with exit-intent tags.
 * Sends pool guide email via SendGrid.
 *
 * Env vars: GHL_API_KEY, GHL_LOCATION_ID, SENDGRID_API_KEY
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';

const LEAD_TAGS = [
  'Exit Intent Lead',
  'Pool Guide Download',
  'Pool Installation Interest'
];

function buildGuideEmailHtml() {
  return [
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">',
    '<div style="background: linear-gradient(135deg, #0E1F34, #1a3a5c); padding: 40px 30px; text-align: center;">',
    '<h1 style="color: #C9A962; font-size: 28px; margin: 0 0 8px;">Tri-State Aquatic Solutions</h1>',
    '<p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0;">Premium Pool Installation &amp; Services</p>',
    '</div>',
    '<div style="padding: 40px 30px;">',
    '<h2 style="color: #0E1F34; font-size: 24px; margin: 0 0 16px;">Your Free Pool Guide Is Here!</h2>',
    '<p style="color: #4B5563; line-height: 1.7; margin: 0 0 24px;">Thanks for your interest! Here are the <strong>5 things every homeowner should know before building a pool:</strong></p>',
    '<div style="background: #F9FAFB; border-radius: 12px; padding: 24px; margin: 0 0 24px;">',

    '<div style="margin-bottom: 16px;">',
    '<strong style="color: #0E1F34;">1. Know Your Local Regulations</strong>',
    '<p style="color: #6B7280; margin: 6px 0 0; font-size: 14px;">Permits, setback requirements, and HOA rules vary by municipality. We handle all permits for you in DE, Chester County PA, and Delaware County PA.</p>',
    '</div>',

    '<div style="margin-bottom: 16px;">',
    '<strong style="color: #0E1F34;">2. Choose the Right Pool Type for Your Yard</strong>',
    '<p style="color: #6B7280; margin: 6px 0 0; font-size: 14px;">Fiberglass pools install in 2-4 weeks vs. 3-6 months for concrete. Plunge and cocktail pools are perfect for smaller yards and lower maintenance.</p>',
    '</div>',

    '<div style="margin-bottom: 16px;">',
    '<strong style="color: #0E1F34;">3. Plan Your Budget Realistically</strong>',
    '<p style="color: #6B7280; margin: 6px 0 0; font-size: 14px;">Pool installation starts around $25,000 for boutique fiberglass pools. Factor in fencing, landscaping, and ongoing maintenance. Financing from $199/mo.</p>',
    '</div>',

    '<div style="margin-bottom: 16px;">',
    '<strong style="color: #0E1F34;">4. Think About Long-Term Maintenance</strong>',
    '<p style="color: #6B7280; margin: 6px 0 0; font-size: 14px;">Weekly chemical balancing, seasonal opening/closing, equipment checks. Plan for $150-300/month. Professional service saves time and extends pool life.</p>',
    '</div>',

    '<div>',
    '<strong style="color: #0E1F34;">5. Start Planning Early</strong>',
    '<p style="color: #6B7280; margin: 6px 0 0; font-size: 14px;">Spring installation spots fill fast. Start planning 3-6 months before you want to swim. Spring 2026 spots are filling up now!</p>',
    '</div>',

    '</div>',
    '<div style="text-align: center; margin: 32px 0;">',
    '<a href="https://www.tristateaquaticsolutions.com/design-your-pool/" style="display: inline-block; background: #C9A962; color: #0E1F34; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Design Your Pool &#8594;</a>',
    '</div>',
    '<p style="color: #6B7280; font-size: 14px; line-height: 1.6;">Have questions? Reply to this email or call us at <a href="tel:+13028703113" style="color: #C9A962;">(302) 870-3113</a>.</p>',
    '</div>',
    '<div style="background: #F9FAFB; padding: 24px 30px; text-align: center; border-top: 1px solid #E5E7EB;">',
    '<p style="color: #9CA3AF; font-size: 12px; margin: 0;">Tri-State Aquatic Solutions &middot; Hockessin, DE &middot; <a href="https://www.tristateaquaticsolutions.com" style="color: #C9A962;">tristateaquaticsolutions.com</a></p>',
    '</div>',
    '</div>'
  ].join('');
}

function buildGuideEmailText() {
  return [
    '5 Things Every Homeowner Should Know Before Building a Pool',
    '',
    '1. Know Your Local Regulations',
    'Permits, setback requirements, and HOA rules vary by municipality. We handle all permits for you in DE, Chester County PA, and Delaware County PA.',
    '',
    '2. Choose the Right Pool Type for Your Yard',
    'Fiberglass pools install in 2-4 weeks vs. 3-6 months for concrete. Plunge and cocktail pools are perfect for smaller yards.',
    '',
    '3. Plan Your Budget Realistically',
    'Pool installation starts around $25,000 for boutique fiberglass pools. Financing available from $199/mo.',
    '',
    '4. Think About Long-Term Maintenance',
    'Plan for $150-300/month in professional maintenance. It saves time and extends pool life.',
    '',
    '5. Start Planning Early',
    'Spring installation spots fill fast. Start planning 3-6 months before you want to swim.',
    '',
    'Ready to get started? Design your pool: https://www.tristateaquaticsolutions.com/design-your-pool/',
    '',
    'Questions? Call us at (302) 870-3113',
    '',
    'Tri-State Aquatic Solutions - Hockessin, DE',
    'tristateaquaticsolutions.com'
  ].join('\n');
}

async function sendGuideEmail(email) {
  const sgKey = process.env.SENDGRID_API_KEY;
  if (!sgKey) {
    console.error('SENDGRID_API_KEY not configured, skipping email');
    return;
  }

  const payload = {
    personalizations: [{ to: [{ email }] }],
    from: {
      email: 'brandon@tristateaquaticsolutions.com',
      name: 'Tri-State Aquatic Solutions'
    },
    reply_to: {
      email: 'brandon@tristateaquaticsolutions.com',
      name: 'Brandon - Tri-State Aquatic Solutions'
    },
    subject: 'Your Free Pool Guide: 5 Things Every Homeowner Should Know',
    content: [
      { type: 'text/plain', value: buildGuideEmailText() },
      { type: 'text/html', value: buildGuideEmailHtml() }
    ],
    tracking_settings: {
      open_tracking: { enable: true },
      click_tracking: { enable: true }
    }
  };

  const sgRes = await fetch(SENDGRID_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sgKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!sgRes.ok) {
    const errText = await sgRes.text();
    console.error('SendGrid error:', sgRes.status, errText);
  } else {
    console.log('Pool guide email sent to:', email);
  }
}

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

  // Send the pool guide email via SendGrid (fire and forget - don't block response)
  const emailPromise = sendGuideEmail(email).catch(err => {
    console.error('Email send error:', err.message);
  });

  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    console.error('GHL_API_KEY not configured');
    await emailPromise;
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
        await emailPromise;
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
        await emailPromise;
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

    await emailPromise;
    return res.status(200).json({ ok: true, contactId: contactId });
  } catch (err) {
    console.error('Lead capture error:', err);
    await emailPromise;
    return res.status(200).json({ ok: true, note: 'Error occurred but lead noted' });
  }
};
