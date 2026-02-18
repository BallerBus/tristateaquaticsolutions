// Stripe Webhook Handler
// Processes Stripe events for payment confirmations
// Adapted from ContentCreationDude pattern + GHL integration

const { getStripe } = require('../_config/stripe.js');

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'A0e67CElQk4EoVK0XY2K';

async function syncWithGHL(session) {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    console.log('GHL_API_KEY not configured — skipping CRM sync');
    return;
  }

  const metadata = session.metadata || {};
  const email = session.customer_email || session.customer_details?.email;
  
  if (!email) {
    console.log('No email in session — skipping GHL sync');
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
    const searchParams = new URLSearchParams({ locationId: GHL_LOCATION_ID, email });
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
      firstName: metadata.customer_name?.split(' ')[0] || metadata.firstName || '',
      lastName: metadata.customer_name?.split(' ').slice(1).join(' ') || metadata.lastName || '',
      email: email,
      phone: metadata.phone || metadata.customer_phone || '',
      tags: ['Deposit Paid', 'Design Deposit', 'Hot Lead', 'Pool Installation Interest'],
      source: metadata.source || 'Payment Page'
    };

    if (contactId) {
      // Update existing contact
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
      // Create opportunity
      const amount = session.amount_total ? session.amount_total / 100 : 0;
      await fetch(`${GHL_BASE_URL}/opportunities/`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          contactId,
          pipelineId: 'LGgQEViEFr1pAKKzvMtJ',
          pipelineStageId: 'a8b53e0c-ccd5-45df-af4e-304811750b53',
          name: `Design Deposit - ${contactPayload.firstName} ${contactPayload.lastName}`.trim(),
          status: 'open',
          monetaryValue: amount,
          source: metadata.source || 'Payment Page'
        })
      });

      // Create follow-up task
      await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tasks`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          title: 'Deposit Received - Schedule Consultation',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          description: `Deposit of $${amount} paid via ${metadata.source || 'payment page'}.\n\nAction: Schedule site visit within 48 hours.`,
          status: 'pending'
        })
      });
    }

    console.log(`GHL sync complete for ${email}, contact: ${contactId || 'new'}`);
  } catch (err) {
    console.error('GHL sync error:', err.message);
  }
}

// Store processed events in memory (use database in production for deduplication)
const processedEvents = new Set();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error('[stripe-webhook] Missing signature or webhook secret');
    return res.status(400).json({ error: 'Missing signature' });
  }

  let event;

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Deduplication check
  if (processedEvents.has(event.id)) {
    console.log(`[stripe-webhook] Event ${event.id} already processed`);
    return res.status(200).json({ received: true, deduplicated: true });
  }
  processedEvents.add(event.id);

  // Keep set size manageable
  if (processedEvents.size > 1000) {
    const iterator = processedEvents.values();
    for (let i = 0; i < 100; i++) {
      processedEvents.delete(iterator.next().value);
    }
  }

  console.log(`[stripe-webhook] Processing event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        console.log(`[stripe-webhook] Payment completed for session: ${session.id}`);
        console.log(`[stripe-webhook] Customer: ${session.customer_email || session.customer}`);
        console.log(`[stripe-webhook] Payment type: ${session.metadata?.type || 'unknown'}`);
        console.log(`[stripe-webhook] Amount: ${session.amount_total / 100} ${session.currency?.toUpperCase()}`);

        // Sync with GHL CRM
        syncWithGHL(session).catch(err => console.error('GHL sync failed:', err));

        // Here you would typically:
        // 1. Send confirmation email to customer
        // 2. Send notification to business
        // 3. Update CRM or database
        // 4. Create calendar event for consultation (if deposit)
        
        // Example: Send notification email (implement with your email service)
        // await sendPaymentConfirmation(session);
        
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`[stripe-webhook] Payment intent succeeded: ${paymentIntent.id}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log(`[stripe-webhook] Payment failed: ${paymentIntent.id}`);
        console.log(`[stripe-webhook] Failure message: ${paymentIntent.last_payment_error?.message}`);
        
        // Could send email notification about failed payment
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        console.log(`[stripe-webhook] Refund processed: ${charge.id}`);
        break;
      }

      case 'customer.created': {
        const customer = event.data.object;
        console.log(`[stripe-webhook] New customer created: ${customer.id} (${customer.email})`);
        break;
      }

      default:
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`[stripe-webhook] Error processing ${event.type}:`, error);
    // Still return 200 to prevent Stripe from retrying
    // Log error for manual review
  }

  return res.status(200).json({ received: true });
};
