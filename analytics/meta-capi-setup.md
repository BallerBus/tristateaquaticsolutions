# Meta Conversions API (CAPI) Setup Guide

## Tri-State Aquatic Solutions

This guide covers the implementation of Meta's Conversions API for server-side tracking to complement the browser-based Pixel.

---

## Overview

### What is Conversions API?

The Conversions API (CAPI) is Meta's server-side tracking solution that sends web events directly from your server to Meta's servers. Unlike the browser-based Pixel, CAPI:

- **Bypasses ad blockers** - Server-side events are not affected by browser extensions
- **Improves data accuracy** - Not impacted by iOS 14.5+ privacy changes
- **Enhances attribution** - Better event matching through server-side user data
- **Increases conversion optimization** - More complete data for Meta's algorithms

### Why You Need Both Pixel + CAPI

| Aspect | Pixel Only | CAPI Only | Pixel + CAPI |
|--------|------------|-----------|--------------|
| Browser events | Yes | No | Yes |
| Ad blocker resistant | No | Yes | Partially |
| iOS 14.5+ tracking | Limited | Full | Full |
| Real-time events | Yes | Slight delay | Yes |
| Event deduplication | N/A | N/A | Required |
| Recommended by Meta | No | No | **Yes** |

---

## Server-Side Tracking Benefits

### 1. Improved Match Quality

Server-side data typically includes:
- Hashed email addresses (from form submissions)
- Hashed phone numbers
- Customer IDs
- Full address information

This results in **higher Event Match Quality (EMQ)** scores, typically 6-8+ out of 10.

### 2. More Resilient Data Collection

- Not affected by browser restrictions
- Works with Safari ITP limitations
- Resistant to third-party cookie deprecation
- Consistent across all devices

### 3. Better Attribution

- More conversions attributed to ads
- Improved ROAS reporting
- Better audience building
- Enhanced lookalike audience quality

### 4. Compliance Benefits

- Greater control over data shared
- Easier to implement consent management
- Clear audit trail of data sent

---

## Implementation Options

### Option 1: Partner Integration via GTM Server-Side (Recommended)

**Best for:** Most businesses, easiest maintenance

#### Setup Steps:

1. **Set up GTM Server-Side Container**
   ```
   1. Go to tagmanager.google.com
   2. Create new container → Select "Server"
   3. Choose hosting option:
      - Google Cloud Platform (recommended)
      - Manual deployment
   ```

2. **Configure Server URL**
   ```
   Your server URL will look like:
   https://gtm.tristateaquaticsolutions.com

   Update first-party domain in GTM to match
   ```

3. **Install Meta CAPI Tag**
   ```
   1. In GTM Server container → Tags → New
   2. Search for "Facebook Conversions API"
   3. Configure with:
      - Pixel ID: XXXXXXXXXXXXXXXXX
      - Access Token: [Generate in Events Manager]
   ```

4. **Configure Event Parameters**
   ```javascript
   // Required parameters for each event:
   {
     event_name: "Lead",
     event_time: Math.floor(Date.now() / 1000),
     event_id: "{{Event ID}}", // For deduplication
     event_source_url: "{{Page URL}}",
     user_data: {
       em: "{{Hashed Email}}",
       ph: "{{Hashed Phone}}",
       fn: "{{Hashed First Name}}",
       ln: "{{Hashed Last Name}}",
       ct: "{{Hashed City}}",
       st: "{{Hashed State}}",
       zp: "{{Zip Code}}",
       country: "us",
       client_ip_address: "{{IP Address}}",
       client_user_agent: "{{User Agent}}",
       fbc: "{{Facebook Click ID}}",
       fbp: "{{Facebook Browser ID}}"
     },
     custom_data: {
       // Event-specific data
     }
   }
   ```

5. **Set up Client in Server Container**
   ```
   1. Clients → New → GA4 Client (or Custom)
   2. Configure to receive events from web container
   ```

#### Estimated Cost:
- GTM Server hosting: $50-150/month on GCP
- Setup time: 4-8 hours

---

### Option 2: Third-Party Tools

#### A. Stape.io (Recommended Third-Party)

**Pros:**
- Simplified GTM Server hosting
- Pre-built integrations
- Lower cost than GCP direct
- Excellent documentation

**Setup:**
1. Create account at stape.io
2. Create new server container
3. Connect to your GTM
4. Configure Meta CAPI tag

**Cost:** Starting at $20/month for 500K requests

#### B. Zapier / Make (Integromat)

**Best for:** Simple implementations, low volume

**Setup:**
```
Trigger: Webhook (from your website)
Action: Meta Conversions API

Configure:
- Pixel ID
- Access Token
- Event mapping
```

**Pros:**
- No coding required
- Visual workflow builder
- Quick setup

**Cons:**
- Limited customization
- Per-task pricing can get expensive
- Potential latency

#### C. Customer.io / Segment

**Best for:** If already using these platforms

These platforms offer native CAPI integrations:
- Segment: Sources → Facebook Conversions API
- Customer.io: Integrations → Facebook CAPI

---

### Option 3: Direct API Implementation

**Best for:** Full control, custom requirements, developer resources

#### Architecture

```
[Website] → [Your Server/API] → [Meta Conversions API]
     ↓
[Meta Pixel] → [Meta Servers]
```

#### Implementation Steps:

1. **Generate Access Token**
   ```
   1. Go to Meta Events Manager
   2. Select your Pixel
   3. Settings → Generate Access Token
   4. Store securely (never expose client-side)
   ```

2. **Create Server Endpoint**

   **Node.js Example:**
   ```javascript
   // server/api/meta-capi.js
   const crypto = require('crypto');
   const fetch = require('node-fetch');

   const PIXEL_ID = 'XXXXXXXXXXXXXXXXX';
   const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
   const API_VERSION = 'v18.0';

   // SHA256 hash function for user data
   function hashData(data) {
     if (!data) return null;
     return crypto
       .createHash('sha256')
       .update(data.toLowerCase().trim())
       .digest('hex');
   }

   async function sendEvent(eventData) {
     const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

     const payload = {
       data: [eventData],
       access_token: ACCESS_TOKEN,
       // Test mode - remove in production
       // test_event_code: 'TEST12345'
     };

     try {
       const response = await fetch(url, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload),
       });

       const result = await response.json();
       console.log('CAPI Response:', result);
       return result;
     } catch (error) {
       console.error('CAPI Error:', error);
       throw error;
     }
   }

   // Express route handler
   app.post('/api/track-event', async (req, res) => {
     const {
       eventName,
       eventId,
       userData,
       customData,
     } = req.body;

     const eventData = {
       event_name: eventName,
       event_time: Math.floor(Date.now() / 1000),
       event_id: eventId, // Must match Pixel event_id
       event_source_url: req.headers.referer,
       action_source: 'website',
       user_data: {
         em: hashData(userData.email),
         ph: hashData(userData.phone?.replace(/\D/g, '')),
         fn: hashData(userData.firstName),
         ln: hashData(userData.lastName),
         ct: hashData(userData.city?.replace(/\s/g, '')),
         st: hashData(userData.state),
         zp: userData.zip?.substring(0, 5),
         country: 'us',
         client_ip_address: req.ip,
         client_user_agent: req.headers['user-agent'],
         fbc: req.cookies._fbc || null,
         fbp: req.cookies._fbp || null,
       },
       custom_data: customData,
     };

     try {
       const result = await sendEvent(eventData);
       res.json({ success: true, result });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });
   ```

3. **Client-Side Integration**
   ```javascript
   // Send to both Pixel and CAPI
   async function trackLeadWithCAPI(formData) {
     // Generate event ID for deduplication
     const eventId = MetaPixel.generateEventId('Lead');

     // Track via Pixel
     fbq('track', 'Lead', {
       content_name: 'Quote Request',
     }, { eventID: eventId });

     // Send to CAPI endpoint
     await fetch('/api/track-event', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         eventName: 'Lead',
         eventId: eventId, // Same ID for deduplication
         userData: {
           email: formData.email,
           phone: formData.phone,
           firstName: formData.firstName,
           lastName: formData.lastName,
           city: formData.city,
           state: formData.state,
           zip: formData.zip,
         },
         customData: {
           content_name: 'Quote Request',
           service_type: formData.serviceType,
         },
       }),
     });
   }
   ```

4. **Vercel/Next.js API Route**
   ```javascript
   // pages/api/meta-capi.js (Next.js)
   import crypto from 'crypto';

   const hashData = (data) => {
     if (!data) return null;
     return crypto
       .createHash('sha256')
       .update(data.toLowerCase().trim())
       .digest('hex');
   };

   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method not allowed' });
     }

     const { eventName, eventId, userData, customData } = req.body;

     const eventData = {
       event_name: eventName,
       event_time: Math.floor(Date.now() / 1000),
       event_id: eventId,
       event_source_url: req.headers.referer,
       action_source: 'website',
       user_data: {
         em: hashData(userData?.email),
         ph: hashData(userData?.phone?.replace(/\D/g, '')),
         fn: hashData(userData?.firstName),
         ln: hashData(userData?.lastName),
         client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
         client_user_agent: req.headers['user-agent'],
       },
       custom_data: customData || {},
     };

     const response = await fetch(
       `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
       {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           data: [eventData],
           access_token: process.env.META_ACCESS_TOKEN,
         }),
       }
     );

     const result = await response.json();
     res.status(200).json(result);
   }
   ```

---

## Event Matching Quality Optimization

### Understanding EMQ Score

Event Match Quality (EMQ) is a 1-10 score indicating how well Meta can match your events to users:
- **1-3:** Poor - Consider adding more user data
- **4-5:** Fair - Functional but room for improvement
- **6-7:** Good - Most events matched
- **8-10:** Excellent - Optimal matching

### Required vs Optional Parameters

| Parameter | Priority | Impact on EMQ |
|-----------|----------|---------------|
| `em` (email) | **Required** | High |
| `ph` (phone) | **Required** | High |
| `fn` (first name) | Recommended | Medium |
| `ln` (last name) | Recommended | Medium |
| `fbc` (click ID) | Recommended | High |
| `fbp` (browser ID) | Recommended | High |
| `ct` (city) | Optional | Low |
| `st` (state) | Optional | Low |
| `zp` (zip) | Optional | Low |
| `client_ip_address` | Recommended | Medium |
| `client_user_agent` | Recommended | Medium |
| `external_id` | Optional | Medium |

### Optimization Strategies

1. **Always Hash User Data**
   ```javascript
   // Correct - lowercase, trim, then SHA256
   const hashedEmail = crypto
     .createHash('sha256')
     .update(email.toLowerCase().trim())
     .digest('hex');

   // Phone - digits only, then hash
   const hashedPhone = crypto
     .createHash('sha256')
     .update(phone.replace(/\D/g, ''))
     .digest('hex');
   ```

2. **Capture Facebook Click ID (fbc)**
   ```javascript
   // fbc comes from URL parameter fbclid
   function getFbc() {
     const urlParams = new URLSearchParams(window.location.search);
     const fbclid = urlParams.get('fbclid');

     if (fbclid) {
       // Format: fb.1.timestamp.fbclid
       const timestamp = Math.floor(Date.now() / 1000);
       return `fb.1.${timestamp}.${fbclid}`;
     }

     // Check cookie
     return getCookie('_fbc');
   }
   ```

3. **Capture Browser ID (fbp)**
   ```javascript
   // fbp is set by the Pixel in _fbp cookie
   function getFbp() {
     return getCookie('_fbp');
   }
   ```

4. **Include IP and User Agent**
   ```javascript
   // Server-side
   const userData = {
     client_ip_address: req.ip || req.headers['x-forwarded-for'],
     client_user_agent: req.headers['user-agent'],
   };
   ```

---

## Testing and Verification

### 1. Test Events Tool

Access via Events Manager → Test Events

1. **Generate Test Event Code**
   ```
   1. Go to Meta Events Manager
   2. Select your Pixel
   3. Test Events tab
   4. Copy the test event code (e.g., TEST12345)
   ```

2. **Add to CAPI Request**
   ```javascript
   const payload = {
     data: [eventData],
     access_token: ACCESS_TOKEN,
     test_event_code: 'TEST12345', // Remove in production
   };
   ```

3. **Verify in Test Events Dashboard**
   - Check events appear
   - Verify parameter matching
   - Confirm deduplication works

### 2. Deduplication Verification

Test that duplicate events are properly deduplicated:

1. **Send Same Event ID from Both Sources**
   ```javascript
   const eventId = 'test_lead_12345';

   // Browser Pixel
   fbq('track', 'Lead', {}, { eventID: eventId });

   // CAPI
   await sendCAPIEvent({
     event_name: 'Lead',
     event_id: eventId, // Same ID
   });
   ```

2. **Check Events Manager**
   - Should show 1 event (not 2)
   - Deduplication status should show "Deduplicated"

### 3. Event Match Quality Check

In Events Manager:
1. Go to Data Sources → Your Pixel
2. Overview → Event Match Quality
3. Check EMQ score for each event type
4. Click into events to see matching details

### 4. Diagnostics

Common issues and fixes:

| Issue | Solution |
|-------|----------|
| Events not showing | Check access token, pixel ID |
| Low EMQ | Add more user data parameters |
| Duplicate events | Verify event_id matches |
| Events delayed | Normal - up to 20min for CAPI |
| Hash mismatch | Ensure lowercase + trim before hashing |

### 5. Debug Mode

Enable debug logging:

```javascript
// Client-side
META_PIXEL_CONFIG.debug = true;

// Server-side
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('CAPI Event:', JSON.stringify(eventData, null, 2));
}
```

---

## Production Checklist

Before going live:

- [ ] Remove `test_event_code` from CAPI requests
- [ ] Verify access token is stored securely (environment variable)
- [ ] Test all event types in Events Manager
- [ ] Verify deduplication is working
- [ ] Check EMQ scores are acceptable (6+)
- [ ] Set up error monitoring/alerting
- [ ] Document event mappings
- [ ] Train team on testing procedures

---

## Recommended Implementation Path

For Tri-State Aquatic Solutions, we recommend:

### Phase 1: Browser Pixel (Already Done)
- Basic tracking via meta-pixel.js
- Standard and custom events
- Advanced matching from forms

### Phase 2: GTM Server-Side (Recommended)
1. Set up GTM server container on Stape.io
2. Configure Meta CAPI tag
3. Connect to existing web container
4. Test thoroughly

### Phase 3: Direct API (Optional Enhancement)
- Implement for critical conversions
- Form submissions (Quote requests)
- Consultation bookings
- Phone call tracking

---

## Resources

- [Meta Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [GTM Server-Side Setup Guide](https://developers.google.com/tag-platform/tag-manager/server-side)
- [Stape.io Documentation](https://stape.io/docs)
- [Event Match Quality Best Practices](https://www.facebook.com/business/help/765081237991954)
