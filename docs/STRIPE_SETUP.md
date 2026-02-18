# Stripe Integration for TriState Aquatic Solutions

Adapted from ContentCreationDude pattern. This document outlines the Stripe setup for collecting pool installation deposits and service payments.

## File Structure

```
tristateaquaticsolutions/
├── api/
│   ├── _config/
│   │   └── stripe.js          # Stripe configuration (lazy init pattern)
│   ├── stripe/
│   │   ├── create-checkout.js # Creates checkout sessions
│   │   └── create-portal.js   # Creates customer portal sessions
│   └── webhooks/
│       └── stripe.js          # Handles Stripe webhooks
├── website/
│   └── payment/
│       ├── deposit.html       # Deposit collection page
│       ├── success.html       # Payment success page
│       └── cancel.html        # Payment cancelled page
└── package.json               # Added stripe dependency
```

## Environment Variables

Add these to your Vercel dashboard (Settings > Environment Variables):

```bash
# Required
STRIPE_SECRET_KEY=sk_live_...              # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...            # Webhook endpoint secret
NEXT_PUBLIC_URL=https://tristateaquaticsolutions.com  # Your domain

# Optional
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # For client-side features
```

## Stripe Account Setup

1. **Create/Access Stripe Account**
   - Go to https://dashboard.stripe.com/register
   - Complete business verification
   - Set up payout account (bank account for deposits)

2. **Get API Keys**
   - Navigate to Developers > API Keys
   - Copy Publishable key (pk_...)
   - Reveal and copy Secret key (sk_...)

3. **Configure Webhook**
   - Go to Developers > Webhooks
   - Add endpoint: `https://tristateaquaticsolutions.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - Copy the webhook signing secret (whsec_...)

4. **Set Vercel Environment Variables**
   ```bash
   vercel env add STRIPE_SECRET_KEY
   vercel env add STRIPE_WEBHOOK_SECRET
   vercel env add NEXT_PUBLIC_URL
   ```

## Features

### Deposit Collection (`/payment/deposit.html`)

- **Fixed amounts**: $2,000 (Standard), $3,500 (Priority), $5,000 (Premium)
- **Custom amounts**: Minimum $1,000
- **Customer data collected**: Name, email, phone
- **Receipts**: Automated via Stripe
- **CRM Integration**: Automatically creates/updates contacts in GoHighLevel (GHL)
- **Pipeline**: Creates opportunities in GHL pipeline
- **Tasks**: Auto-creates follow-up tasks for sales team

### GHL Integration

The Stripe integration connects with GoHighLevel CRM:

- **On checkout start**: Creates/updates contact, adds "Deposit Page" tag
- **On payment completion**: 
  - Updates contact with "Deposit Paid" tag
  - Creates/updates opportunity in pipeline
  - Creates follow-up task ("Schedule site visit within 48 hours")
- **Pipeline ID**: `LGgQEViEFr1pAKKzvMtJ`
- **Stage ID**: `a8b53e0c-ccd5-45df-af4e-304811750b53`

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stripe/create-checkout` | POST | Creates checkout session |
| `/api/stripe/create-portal` | POST | Creates customer portal session |
| `/api/webhooks/stripe` | POST | Handles Stripe events |

### Checkout Request Format

```json
{
  "type": "deposit",
  "amount": 200000,
  "customerEmail": "customer@example.com",
  "customerName": "John Doe",
  "metadata": {
    "phone": "(302) 555-1234",
    "source": "deposit_page"
  }
}
```

### Webhook Events Handled

- `checkout.session.completed` - Payment successful
- `payment_intent.succeeded` - Payment intent succeeded
- `payment_intent.payment_failed` - Payment failed
- `charge.refunded` - Refund processed
- `customer.created` - New customer created

## Testing

### Test Mode
Use Stripe test keys (sk_test_...) to test without real charges:

**Test Card Numbers:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires 3D Secure: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

### Test Checkout Flow

1. Visit `/payment/deposit.html`
2. Select deposit amount
3. Fill in contact details
4. Click "Proceed to Secure Payment"
5. Complete Stripe checkout with test card
6. Verify redirect to `/payment/success.html`

## Production Checklist

- [ ] Stripe account verified and active
- [ ] Live API keys configured in Vercel
- [ ] Webhook endpoint configured and verified
- [ ] Test checkout flow completed
- [ ] Payment success/cancel pages tested
- [ ] Brand colors applied to checkout theme ( optional, in Stripe Dashboard)
- [ ] Business info updated in Stripe (logo, support email, etc.)
- [ ] Payout schedule configured
- [ ] Email notifications set up in Stripe

## Troubleshooting

### Webhook Signature Verification Failed
- Check STRIPE_WEBHOOK_SECRET matches the endpoint secret from Stripe Dashboard
- Ensure webhook endpoint URL matches exactly (including https)

### Checkout Session Not Created
- Check STRIPE_SECRET_KEY is correct
- Verify API route is accessible at `/api/stripe/create-checkout`
- Check Vercel function logs for errors

### Environment Variables Not Loading
- Ensure variables are set in Vercel dashboard, not just local .env.local
- Redeploy after adding environment variables

## Security Notes

- Secret keys are server-side only (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
- Webhook signatures are verified on every request
- Customer data is passed through to Stripe for PCI compliance
- No payment data is stored on our servers

## Support

For Stripe-specific issues:
- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

For integration issues:
- Check Vercel function logs
- Review webhook delivery attempts in Stripe Dashboard
