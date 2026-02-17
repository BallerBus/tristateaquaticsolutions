// Stripe configuration for TriState Aquatic Solutions
// Adapted from ContentCreationDude pattern

const Stripe = require('stripe');

// Lazy initialization — only create Stripe client at runtime when actually needed
let _stripe = null;

function getStripe() {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is required');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
  }
  return _stripe;
}

// Product configuration for TriState services
const STRIPE_CONFIG = {
  // Deposit for pool installation (typically $2,000-$5,000)
  depositPriceId: process.env.STRIPE_DEPOSIT_PRICE_ID || '',
  
  // Service payment (for maintenance, openings, etc.)
  servicePriceId: process.env.STRIPE_SERVICE_PRICE_ID || '',
  
  get successUrl() { 
    return `${process.env.NEXT_PUBLIC_URL || 'https://tristateaquaticsolutions.com'}/payment/success.html`; 
  },
  get cancelUrl() { 
    return `${process.env.NEXT_PUBLIC_URL || 'https://tristateaquaticsolutions.com'}/payment/cancel.html`; 
  },
  
  // Business info for Stripe
  business: {
    name: 'Tri-State Aquatic Solutions',
    email: 'Bryce@TriStateAquaticSolutions.com',
    phone: '(302) 870-3113',
  }
};

module.exports = { getStripe, STRIPE_CONFIG };
