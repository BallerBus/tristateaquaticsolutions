/**
 * Vercel Serverless Function for GoHighLevel API
 *
 * Deploy this to: /api/ghl/contacts.js
 *
 * Environment Variables (add to Vercel):
 * - GHL_API_KEY: YOUR_GHL_API_KEY
 * - GHL_LOCATION_ID: A0e67CElQk4EoVK0XY2K
 */

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID || 'A0e67CElQk4EoVK0XY2K';

  if (!apiKey) {
    console.error('GHL_API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const contactData = req.body;

    // Validate required fields
    if (!contactData.firstName && !contactData.lastName) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!contactData.email && !contactData.phone) {
      return res.status(400).json({ error: 'Email or phone is required' });
    }

    // Check for existing contact
    let existingContact = null;
    const searchParams = new URLSearchParams({ locationId });

    if (contactData.email) {
      searchParams.append('email', contactData.email);
    } else if (contactData.phone) {
      searchParams.append('phone', contactData.phone);
    }

    const searchResponse = await fetch(`${GHL_BASE_URL}/contacts/?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    });

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      if (searchData.contacts && searchData.contacts.length > 0) {
        existingContact = searchData.contacts[0];
      }
    }

    let result;

    if (existingContact) {
      // Update existing contact - merge tags
      const existingTags = existingContact.tags || [];
      const newTags = contactData.tags || [];
      const mergedTags = [...new Set([...existingTags, ...newTags])];

      const updatePayload = {
        ...contactData,
        tags: mergedTags
      };
      delete updatePayload.locationId; // Not needed for updates

      const updateResponse = await fetch(`${GHL_BASE_URL}/contacts/${existingContact.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      });

      if (!updateResponse.ok) {
        const error = await updateResponse.json();
        throw new Error(error.message || 'Failed to update contact');
      }

      result = await updateResponse.json();
      result.isNew = false;

    } else {
      // Create new contact
      const createPayload = {
        ...contactData,
        locationId
      };

      const createResponse = await fetch(`${GHL_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createPayload)
      });

      if (!createResponse.ok) {
        const error = await createResponse.json();
        throw new Error(error.message || 'Failed to create contact');
      }

      result = await createResponse.json();
      result.isNew = true;
    }

    // If high-value lead (score >= 50), create an opportunity
    const leadScoreField = contactData.customFields?.find(
      cf => cf.id === 'NjVEV6p5lJxiIEKPKhIk'
    );
    const leadScore = leadScoreField ? parseInt(leadScoreField.value) : 0;

    if (leadScore >= 50 && result.isNew) {
      const contactId = result.contact?.id;

      if (contactId) {
        // Create opportunity
        await fetch(`${GHL_BASE_URL}/opportunities/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            locationId,
            contactId,
            pipelineId: 'LGgQEViEFr1pAKKzvMtJ',
            pipelineStageId: 'a8b53e0c-ccd5-45df-af4e-304811750b53',
            name: `Pool Project - ${contactData.firstName} ${contactData.lastName}`,
            status: 'open',
            source: 'Website'
          })
        });

        // Create urgent task
        await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tasks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: 'Hot Lead - Call Within 5 Minutes',
            dueDate: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
            description: `High lead score: ${leadScore}. Priority follow-up required.`,
            status: 'pending'
          })
        });
      }
    }

    return res.status(result.isNew ? 201 : 200).json({
      success: true,
      contactId: result.contact?.id,
      isNew: result.isNew
    });

  } catch (error) {
    console.error('GHL API Error:', error);
    return res.status(500).json({
      error: 'Failed to process contact',
      message: error.message
    });
  }
}
