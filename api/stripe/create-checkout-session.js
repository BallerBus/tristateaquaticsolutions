const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
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
          unit_amount: 100000 // $1,000.00 in cents
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
      error: 'Failed to create checkout session',
      message: error.message
    });
  }
};
