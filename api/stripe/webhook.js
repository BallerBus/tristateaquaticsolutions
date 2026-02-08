const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

// Disable Vercel's default body parsing so we can verify the Stripe signature
module.exports.config = {
  api: {
    bodyParser: false
  }
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Stripe-Signature');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  let event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      await handleCheckoutCompleted(session);
    } catch (err) {
      console.error('Error processing checkout.session.completed:', err);
      // Return 200 so Stripe doesn't retry — log the error for investigation
    }
  }

  return res.status(200).json({ received: true });
};

async function handleCheckoutCompleted(session) {
  const metadata = session.metadata || {};
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID || 'A0e67CElQk4EoVK0XY2K';

  if (!apiKey) {
    console.error('GHL_API_KEY not configured — skipping CRM sync');
    return;
  }

  const ghlHeaders = {
    'Authorization': `Bearer ${apiKey}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  // 1. Search for existing contact by email
  let contactId;
  const email = session.customer_email || session.customer_details?.email;

  if (email) {
    const searchParams = new URLSearchParams({ locationId, email });
    const searchRes = await fetch(`${GHL_BASE_URL}/contacts/?${searchParams.toString()}`, {
      method: 'GET',
      headers: ghlHeaders
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.contacts && searchData.contacts.length > 0) {
        contactId = searchData.contacts[0].id;
      }
    }
  }

  // 2. Create or update contact
  const contactPayload = {
    firstName: metadata.firstName || '',
    lastName: metadata.lastName || '',
    email: email || '',
    phone: metadata.phone || '',
    address1: metadata.address || '',
    tags: ['Deposit Paid', 'Design Deposit', 'Hot Lead', 'Pool Installation Interest'],
    source: 'Pool Configurator'
  };

  if (contactId) {
    // Update existing contact — merge tags
    const existingRes = await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
      method: 'GET',
      headers: ghlHeaders
    });

    if (existingRes.ok) {
      const existingData = await existingRes.json();
      const existingTags = existingData.contact?.tags || [];
      contactPayload.tags = [...new Set([...existingTags, ...contactPayload.tags])];
    }

    await fetch(`${GHL_BASE_URL}/contacts/${contactId}`, {
      method: 'PUT',
      headers: ghlHeaders,
      body: JSON.stringify(contactPayload)
    });
  } else {
    contactPayload.locationId = locationId;
    const createRes = await fetch(`${GHL_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(contactPayload)
    });

    if (createRes.ok) {
      const createData = await createRes.json();
      contactId = createData.contact?.id;
    }
  }

  if (!contactId) {
    console.error('Failed to create/find GHL contact');
    return;
  }

  // 3. Create opportunity in pipeline
  let monetaryValue = 0;
  if (metadata.priceRangeLow && metadata.priceRangeHigh) {
    const low = parseInt(metadata.priceRangeLow.replace(/[^0-9]/g, ''), 10) || 0;
    const high = parseInt(metadata.priceRangeHigh.replace(/[^0-9]/g, ''), 10) || 0;
    monetaryValue = Math.round((low + high) / 2);
  }

  await fetch(`${GHL_BASE_URL}/opportunities/`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      locationId,
      contactId,
      pipelineId: 'LGgQEViEFr1pAKKzvMtJ',
      pipelineStageId: 'a8b53e0c-ccd5-45df-af4e-304811750b53',
      name: `Design Deposit - ${metadata.firstName || ''} ${metadata.lastName || ''}`.trim(),
      status: 'open',
      monetaryValue,
      source: 'Pool Configurator'
    })
  });

  // 4. Create follow-up task
  const upgrades = metadata.upgrades ? JSON.parse(metadata.upgrades) : [];
  const configSummary = [
    `Pool Type: ${metadata.poolType || 'N/A'}`,
    `Finish: ${metadata.finish || 'N/A'}`,
    metadata.fiberglassColor ? `Fiberglass Color: ${metadata.fiberglassColor}` : null,
    upgrades.length > 0 ? `Upgrades: ${upgrades.join(', ')}` : null,
    `Budget: ${metadata.priceRangeLow || '?'} - ${metadata.priceRangeHigh || '?'}`
  ].filter(Boolean).join('\n');

  await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tasks`, {
    method: 'POST',
    headers: ghlHeaders,
    body: JSON.stringify({
      title: 'Design Deposit Received - Schedule Site Visit',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      description: `Design deposit paid via pool configurator.\n\nPool Configuration:\n${configSummary}\n\nAction: Schedule site visit within 48 hours.`,
      status: 'pending'
    })
  });

  console.log(`Checkout processed for ${metadata.firstName} ${metadata.lastName} (${email}), contact: ${contactId}`);
}
