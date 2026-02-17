// Stripe Checkout Session API
// Creates a checkout session for deposits or service payments
// Adapted from ContentCreationDude pattern + GHL integration

const { getStripe, STRIPE_CONFIG } = require('../_config/stripe.js');

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'A0e67CElQk4EoVK0XY2K';

async function createGhlLead(customer, metadata) {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    console.log('GHL_API_KEY not configured — skipping lead capture');
    return;
  }

  const ghlHeaders = {
    'Authorization': `Bearer ${apiKey}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  try {
    // Search for existing contact
    let contactId;
    const searchParams = new URLSearchParams({ locationId: GHL_LOCATION_ID, email: customer.email });
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

    const contactPayload = {
      firstName: customer.firstName || customer.name?.split(' ')[0] || '',
      lastName: customer.lastName || customer.name?.split(' ').slice(1).join(' ') || '',
      email: customer.email,
      phone: customer.phone || '',
      tags: ['Deposit Page', 'Pool Installation Interest'],
      source: 'Payment Deposit Page'
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
      contactPayload.locationId = GHL_LOCATION_ID;
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
      // Add a note about the deposit intent
      await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          body: `Started checkout from deposit page.\n\nDeposit Amount: $${metadata.amount / 100}\nType: ${metadata.type || 'deposit'}\n\nAwaiting payment completion.`
        })
      });
    }

    console.log(`GHL lead captured from deposit page: ${customer.email}, contact: ${contactId || 'new'}`);
  } catch (err) {
    console.error('GHL lead capture error (non-blocking):', err.message);
  }
}

const ALLOWED_ORIGIN = 'https://tristateaquaticsolutions.com';

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      type = 'deposit',  // 'deposit' or 'service'
      amount,            // Custom amount in cents (for variable pricing)
      customerEmail,
      customerName,
      description,       // Description of what they're paying for
      metadata = {}    // Additional data to store with the session
    } = req.body || {};

    // Validate required fields
    if (!customerEmail) {
      return res.status(400).json({ error: 'Customer email is required' });
    }

    // Get or create Stripe customer
    let customer;
    const existingCustomers = await getStripe().customers.list({
      email: customerEmail,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      // Update customer info if name provided
      if (customerName && customer.name !== customerName) {
        await getStripe().customers.update(customer.id, {
          name: customerName,
          metadata: {
            ...customer.metadata,
            ...metadata,
            type: type,
            source: 'tristateaquaticsolutions.com'
          }
        });
      }
    } else {
      customer = await getStripe().customers.create({
        email: customerEmail,
        name: customerName || '',
        phone: metadata.phone || '',
        metadata: {
          ...metadata,
          type: type,
          source: 'tristateaquaticsolutions.com'
        }
      });
    }

    // Capture lead in GHL before Stripe redirect (don't block on failure)
    createGhlLead(
      { email: customerEmail, name: customerName, phone: metadata.phone },
      { amount, type }
    ).catch(() => {});

    // Build line items based on payment type
    let lineItems;
    
    if (type === 'deposit') {
      // Pool installation deposit - typically $2,000 or custom
      const depositAmount = amount || 200000; // $2,000 in cents
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pool Installation Deposit',
            description: description || 'Deposit to secure your Spring 2026 pool installation spot',
            images: ['https://tristateaquaticsolutions.com/images/hero-pool.jpg'],
          },
          unit_amount: depositAmount,
        },
        quantity: 1,
      }];
    } else if (type === 'service') {
      // Service payment - variable amount
      const serviceAmount = amount || 15000; // $150 in cents (default maintenance)
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pool Service Payment',
            description: description || 'Pool maintenance, opening, or closing service',
            images: ['https://tristateaquaticsolutions.com/images/hero-pool.jpg'],
          },
          unit_amount: serviceAmount,
        },
        quantity: 1,
      }];
    } else {
      return res.status(400).json({ error: 'Invalid payment type. Use "deposit" or "service"' });
    }

    // Create Stripe Checkout session
    const session = await getStripe().checkout.sessions.create({
      customer: customer.id,
      mode: 'payment',  // One-time payment (not subscription)
      line_items: lineItems,
      success_url: STRIPE_CONFIG.successUrl,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      metadata: {
        type: type,
        customer_email: customerEmail,
        customer_name: customerName || '',
        ...metadata
      },
      // Collect phone number if not provided
      phone_number_collection: {
        enabled: !metadata.phone
      },
      // Custom text on checkout page
      custom_text: {
        submit: {
          message: type === 'deposit' 
            ? 'Your deposit secures your spot for Spring 2026 installation. Balance due at project completion.'
            : 'Thank you for choosing Tri-State Aquatic Solutions!',
        }
      }
    });

    return res.status(200).json({ 
      url: session.url,
      sessionId: session.id,
      customerId: customer.id
    });

  } catch (error) {
    console.error('[stripe/create-checkout] Error:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
