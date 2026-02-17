const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

async function createGhlLead(customer, poolConfig, metadata) {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    console.log('GHL_API_KEY not configured — skipping lead capture');
    return;
  }

  const locationId = process.env.GHL_LOCATION_ID || 'A0e67CElQk4EoVK0XY2K';
  const ghlHeaders = {
    'Authorization': `Bearer ${apiKey}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  try {
    // Search for existing contact
    let contactId;
    const searchParams = new URLSearchParams({ locationId, email: customer.email });
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

    const upgrades = metadata.upgrades ? JSON.parse(metadata.upgrades) : [];
    const configNote = [
      `Pool: ${metadata.poolType || 'N/A'}`,
      `Finish: ${metadata.finish || 'N/A'}`,
      metadata.fiberglassColor ? `Color: ${metadata.fiberglassColor}` : null,
      upgrades.length > 0 ? `Upgrades: ${upgrades.join(', ')}` : null,
      `Budget: ${metadata.priceRangeLow || '?'} - ${metadata.priceRangeHigh || '?'}`
    ].filter(Boolean).join(' | ');

    const contactPayload = {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      email: customer.email,
      phone: customer.phone || '',
      address1: metadata.address || '',
      tags: ['Checkout Started', 'Pool Installation Interest'],
      source: 'Pool Configurator'
    };

    if (contactId) {
      // Merge tags with existing
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

    if (contactId) {
      // Add a note with their pool configuration
      await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          body: `Started checkout from pool configurator.\n\n${configNote}\n\nAwaiting payment completion.`
        })
      });
    }

    console.log(`GHL lead captured: ${customer.firstName} ${customer.lastName} (${customer.email}), contact: ${contactId || 'new'}`);
  } catch (err) {
    // Don't block checkout if GHL fails
    console.error('GHL lead capture error (non-blocking):', err.message);
  }
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://tristateaquaticsolutions.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { customer, configuration, config: configAlt } = req.body;
    const poolConfig = configuration || configAlt || {};

    if (!customer || !customer.email) {
      return res.status(400).json({ error: 'Customer email is required' });
    }

    // Parse price range — supports both {low, high} object and "low - high" string
    let priceRangeLow = '';
    let priceRangeHigh = '';
    if (poolConfig.priceRange) {
      if (typeof poolConfig.priceRange === 'object') {
        priceRangeLow = String(poolConfig.priceRange.low || '');
        priceRangeHigh = String(poolConfig.priceRange.high || '');
      } else {
        const parts = String(poolConfig.priceRange).split('-').map(s => s.trim());
        priceRangeLow = parts[0] || '';
        priceRangeHigh = parts[1] || '';
      }
    }

    const fullAddress = [customer.address, customer.city, customer.state, customer.zip]
      .filter(Boolean).join(', ');

    const metadata = {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      phone: customer.phone || '',
      address: fullAddress,
      poolType: poolConfig.poolName || poolConfig.pool || poolConfig.poolType || '',
      finish: poolConfig.finishName || poolConfig.finish || '',
      fiberglassColor: poolConfig.color || poolConfig.fiberglassColor || '',
      upgrades: JSON.stringify(poolConfig.upgradeNames || poolConfig.upgrades || []),
      priceRangeLow,
      priceRangeHigh,
      source: 'pool-configurator'
    };

    // Capture lead in GHL before Stripe redirect (don't block on failure)
    createGhlLead(customer, poolConfig, metadata).catch(() => {});

    // Build line items - use STRIPE_PRICE_ID if set, otherwise use price_data
    let lineItems;
    if (process.env.STRIPE_PRICE_ID) {
      lineItems = [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }];
    } else {
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pool Design Deposit',
            description: 'Custom pool design consultation and site survey deposit'
          },
          unit_amount: 250000 // $2,500.00 in cents
        },
        quantity: 1
      }];
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: customer.email,
      metadata,
      success_url: 'https://tristateaquaticsolutions.com/design-your-pool/thank-you/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://tristateaquaticsolutions.com/design-your-pool/?canceled=true'
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return res.status(500).json({
      error: 'Failed to create checkout session'
    });
  }
};
