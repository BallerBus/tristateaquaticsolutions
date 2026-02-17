// Stripe Customer Portal API
// Creates a portal session for customers to manage their billing
// Adapted from ContentCreationDude pattern

const { getStripe } = require('../_config/stripe.js');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://tristateaquaticsolutions.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerId, customerEmail } = req.body || {};

    if (!customerId && !customerEmail) {
      return res.status(400).json({ error: 'Customer ID or email is required' });
    }

    let stripeCustomerId = customerId;

    // If email provided but no customer ID, look up customer
    if (!stripeCustomerId && customerEmail) {
      const customers = await getStripe().customers.list({
        email: customerEmail,
        limit: 1
      });
      
      if (customers.data.length === 0) {
        return res.status(404).json({ error: 'No billing account found for this email' });
      }
      
      stripeCustomerId = customers.data[0].id;
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_URL || 'https://tristateaquaticsolutions.com'}/`,
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('[stripe/create-portal] Error:', error);
    return res.status(500).json({ 
      error: 'Failed to create portal session',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
