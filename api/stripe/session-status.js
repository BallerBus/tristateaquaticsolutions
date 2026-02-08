const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).json({ error: 'session_id query parameter is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.status(200).json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_email || session.customer_details?.email || null,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
      payment_intent: session.payment_intent
    });

  } catch (error) {
    console.error('Session retrieval error:', error);

    if (error.type === 'StripeInvalidRequestError') {
      return res.status(404).json({ error: 'Session not found' });
    }

    return res.status(500).json({
      error: 'Failed to retrieve session',
      message: error.message
    });
  }
};
