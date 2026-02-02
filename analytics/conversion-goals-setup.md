# Tri-State Aquatic Solutions - Conversion Goals Setup Guide

Complete setup instructions for conversion tracking across all advertising and analytics platforms.

---

## Table of Contents

1. [GA4 Conversion Configuration](#ga4-conversion-configuration)
2. [Google Ads Conversion Import](#google-ads-conversion-import)
3. [Facebook Conversions API (CAPI) Setup](#facebook-conversions-api-capi-setup)
4. [LinkedIn Conversion Tracking](#linkedin-conversion-tracking)
5. [Attribution Model Recommendations](#attribution-model-recommendations)
6. [Conversion Value Optimization](#conversion-value-optimization)
7. [Testing & Validation](#testing--validation)

---

## GA4 Conversion Configuration

### Step 1: Access GA4 Admin

1. Navigate to [analytics.google.com](https://analytics.google.com)
2. Select the **Tri-State Aquatic Solutions** property
3. Click **Admin** (gear icon) in the bottom left
4. Under **Data display**, click **Conversions**

### Step 2: Mark Events as Conversions

Mark the following events as conversions in GA4:

#### Primary Conversions (High Priority)

| Event Name | Type | Expected Volume | Notes |
|------------|------|-----------------|-------|
| `generate_lead` | Contact Form | 50-100/month | Primary lead event |
| `phone_call_click` | Click-to-Call | 30-50/month | High-intent mobile users |
| `consultation_booked` | Booking | 20-40/month | Highest value conversion |
| `schedule_appointment` | Booking | Combined with above | GA4 recommended event |

#### Secondary Conversions (Micro-conversions)

| Event Name | Type | Expected Volume | Notes |
|------------|------|-----------------|-------|
| `calculator_complete` | Engagement | 100-200/month | Strong buying signal |
| `lead_magnet_download` | Lead Gen | 75-150/month | Email capture |
| `quiz_complete` | Engagement | 50-100/month | Product interest |
| `chat_engagement` | Chat | 40-80/month | Direct engagement |

### Step 3: Set Conversion Values

In GA4 Admin > Conversions, configure values:

```
generate_lead: $500 (USD)
phone_call_click: $750 (USD)
consultation_booked: $1,000 (USD)
calculator_complete: $300 (USD)
lead_magnet_download: $150 (USD)
quiz_complete: $200 (USD)
chat_engagement: $250 (USD)
```

### Step 4: Configure Enhanced Conversions

1. Go to **Admin** > **Data Streams**
2. Select your web stream
3. Click **Configure tag settings**
4. Enable **Enhanced conversions**
5. Configure user-provided data collection:

```javascript
// Enhanced conversions data layer push
gtag('set', 'user_data', {
    email: '<USER_EMAIL>',       // Will be hashed automatically
    phone_number: '<USER_PHONE>', // Will be hashed automatically
    address: {
        first_name: '<FIRST_NAME>',
        last_name: '<LAST_NAME>',
        city: '<CITY>',
        region: '<STATE>',
        postal_code: '<ZIP>',
        country: 'US'
    }
});
```

### Step 5: Create Audiences for Remarketing

Navigate to **Admin** > **Audiences** and create:

#### 1. Calculator Users (Not Converted)
```
Include: calculator_complete event
Exclude: generate_lead event (last 30 days)
Membership: 30 days
```

#### 2. High-Intent Visitors
```
Include:
- scroll_depth >= 75% OR
- session_duration > 3 minutes OR
- page_views > 4
Exclude: generate_lead (last 30 days)
Membership: 14 days
```

#### 3. Lead Magnet Downloaders
```
Include: lead_magnet_download event
Exclude: consultation_booked (last 60 days)
Membership: 60 days
```

#### 4. Form Abandoners
```
Include: form_start event
Exclude: generate_lead (same session)
Membership: 7 days
```

---

## Google Ads Conversion Import

### Step 1: Link GA4 to Google Ads

1. In GA4, go to **Admin** > **Product Links** > **Google Ads Links**
2. Click **Link**
3. Select your Google Ads account
4. Enable **Personalized advertising**
5. Enable **Auto-tagging** if not already enabled in Google Ads

### Step 2: Import Conversions from GA4

1. In Google Ads, go to **Tools & Settings** > **Measurement** > **Conversions**
2. Click **+ New conversion action**
3. Select **Import** > **Google Analytics 4 properties**
4. Select your GA4 property
5. Choose conversions to import:

#### Recommended Conversions to Import

| GA4 Event | Google Ads Name | Category | Value |
|-----------|-----------------|----------|-------|
| `generate_lead` | Lead - Contact Form | Lead | $500 |
| `phone_call_click` | Lead - Phone Call | Lead | $750 |
| `consultation_booked` | Lead - Consultation | Lead | $1,000 |
| `calculator_complete` | Engagement - Calculator | Lead | $300 |

### Step 3: Configure Conversion Settings

For each imported conversion:

#### Contact Form Lead
```
Name: Lead - Contact Form
Category: Lead
Value: Use the value from Google Analytics
Count: One (per interaction)
Click-through window: 30 days
Engaged-view window: 3 days
Attribution model: Data-driven (recommended)
```

#### Phone Call Lead
```
Name: Lead - Phone Call
Category: Lead
Value: $750 (or dynamic from GA4)
Count: One
Click-through window: 30 days
Attribution model: Data-driven
```

#### Consultation Booking
```
Name: Lead - Consultation Booked
Category: Lead
Value: $1,000 (or dynamic)
Count: One
Click-through window: 30 days
Attribution model: Data-driven
Primary conversion: Yes (for bidding)
```

### Step 4: Set Up Offline Conversion Import (Optional)

For tracking closed deals back to ads:

1. **Tools & Settings** > **Measurement** > **Uploads**
2. Click **+ Upload**
3. Select **Conversion adjustments**
4. Format for upload:

```csv
Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
gclid123,Lead - Consultation Booked,2024-03-15 10:30:00,50000,USD
```

### Step 5: Enable Auto-Tagging Verification

In Google Ads:
1. **Admin** > **Account settings**
2. Verify **Auto-tagging** is ON
3. Add `gclid` to thank you page URLs for tracking

---

## Facebook Conversions API (CAPI) Setup

### Option 1: Server-Side Implementation (Recommended)

#### Step 1: Create Facebook System User

1. Go to [Business Settings](https://business.facebook.com/settings)
2. Navigate to **Users** > **System Users**
3. Click **Add** and create a system user
4. Generate an access token with `ads_management` and `business_management` permissions

#### Step 2: Get Pixel ID and Access Token

1. Go to **Events Manager**
2. Select your Pixel
3. Copy the **Pixel ID**
4. In **Settings** > **Conversions API**, generate a token

#### Step 3: Server-Side Event Sending

Create a server endpoint to send events:

```javascript
// Node.js Example (server-side)
const bizSdk = require('facebook-nodejs-business-sdk');

const accessToken = 'YOUR_ACCESS_TOKEN';
const pixelId = 'YOUR_PIXEL_ID';

bizSdk.FacebookAdsApi.init(accessToken);

const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

async function sendConversionEvent(eventData) {
    const timestamp = Math.floor(Date.now() / 1000);

    const userData = new UserData()
        .setEmails([eventData.email]) // Will be hashed
        .setPhones([eventData.phone]) // Will be hashed
        .setClientIpAddress(eventData.ip)
        .setClientUserAgent(eventData.userAgent)
        .setFbp(eventData.fbp) // _fbp cookie
        .setFbc(eventData.fbc); // _fbc cookie

    const serverEvent = new ServerEvent()
        .setEventName(eventData.eventName)
        .setEventTime(timestamp)
        .setUserData(userData)
        .setEventId(eventData.eventId) // For deduplication
        .setEventSourceUrl(eventData.pageUrl)
        .setActionSource('website');

    if (eventData.value) {
        serverEvent.setCustomData({
            value: eventData.value,
            currency: 'USD'
        });
    }

    const eventRequest = new EventRequest(accessToken, pixelId)
        .setEvents([serverEvent]);

    const response = await eventRequest.execute();
    return response;
}
```

#### Step 4: Event Mapping for CAPI

| Website Event | Facebook Event | Parameters |
|---------------|----------------|------------|
| `generate_lead` | `Lead` | content_name, value |
| `phone_call_click` | `Contact` | content_name |
| `consultation_booked` | `Schedule` | value, currency |
| `calculator_complete` | `Lead` | content_name, value |
| `lead_magnet_download` | `Lead` | content_name, content_category |
| `quiz_complete` | `CompleteRegistration` | value |

### Option 2: Partner Integration (Easier)

Use a partner integration for simpler setup:

1. **Google Tag Manager Server-Side**
2. **Segment**
3. **Zapier**
4. **Customer.io**

#### GTM Server-Side Setup

1. Create a GTM Server container
2. Add the **Facebook Conversions API** tag template
3. Configure with your Pixel ID and access token
4. Set up triggers for each conversion event

### Step 5: Configure Event Match Quality

Improve match rates by sending these parameters:

| Parameter | Priority | Description |
|-----------|----------|-------------|
| `em` (email) | High | Hashed email address |
| `ph` (phone) | High | Hashed phone number |
| `fn` (first name) | Medium | Hashed first name |
| `ln` (last name) | Medium | Hashed last name |
| `ct` (city) | Medium | Hashed city |
| `st` (state) | Medium | Hashed state |
| `zp` (zip) | Medium | Hashed zip code |
| `client_ip_address` | High | User's IP address |
| `client_user_agent` | High | Browser user agent |
| `fbc` | High | Click ID cookie |
| `fbp` | High | Browser ID cookie |

### Step 6: Set Up Standard Events in Events Manager

1. Go to **Events Manager** > **Your Pixel**
2. Click **Settings**
3. Under **Conversions API**, verify events are being received
4. Check **Event Match Quality** score (aim for 6+)

### Step 7: Configure Aggregated Event Measurement (iOS 14+)

1. In Events Manager, go to **Aggregated Event Measurement**
2. Verify your domain
3. Prioritize up to 8 events:

| Priority | Event | Optimization |
|----------|-------|--------------|
| 1 | `Schedule` (Consultation) | Value |
| 2 | `Lead` (Contact Form) | Value |
| 3 | `Lead` (Calculator) | Value |
| 4 | `CompleteRegistration` (Quiz) | Count |
| 5 | `Contact` (Phone Click) | Count |
| 6 | `ViewContent` | Count |
| 7 | `PageView` | Count |
| 8 | (Reserved) | - |

---

## LinkedIn Conversion Tracking

### Step 1: Create LinkedIn Insight Tag

1. Go to **Campaign Manager** > **Account Assets** > **Insight Tag**
2. Copy the Insight Tag code
3. Install on all pages:

```html
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
```

### Step 2: Create Conversions

1. Go to **Account Assets** > **Conversions**
2. Click **Create conversion**

#### Contact Form Conversion
```
Name: Contact Form Submission
Type: Site-wide Insight Tag
Conversion window: 30 days
Last-touch attribution model
Campaign type: Lead Generation
Conversion value: $500
```

#### Phone Call Conversion
```
Name: Phone Call Click
Type: Event-specific
Event: lintrk('track', { conversion_id: 'XXXXXX' })
Conversion window: 30 days
Value: $750
```

#### Consultation Booking Conversion
```
Name: Consultation Booked
Type: Event-specific
Event: lintrk('track', { conversion_id: 'YYYYYY' })
Conversion window: 30 days
Value: $1,000
```

### Step 3: Implement Event-Specific Tracking

Add to your conversion tracking script:

```javascript
// After form submission
window.lintrk('track', { conversion_id: 'XXXXXX' });

// After consultation booking
window.lintrk('track', { conversion_id: 'YYYYYY' });

// After phone click
window.lintrk('track', { conversion_id: 'ZZZZZZ' });
```

### Step 4: Create Matched Audiences

1. Go to **Account Assets** > **Matched Audiences**
2. Create website retargeting audiences:

| Audience | URL Rule | Duration |
|----------|----------|----------|
| All Visitors | Contains: tsaquaticsolutions.com | 90 days |
| Service Pages | Contains: /services/ | 30 days |
| Calculator Users | Contains: /calculator/ | 14 days |
| Contact Page | Equals: /contact/ | 7 days |

---

## Attribution Model Recommendations

### Recommended Attribution Models by Platform

| Platform | Model | Rationale |
|----------|-------|-----------|
| GA4 | Data-driven | Best for understanding true path |
| Google Ads | Data-driven | Optimizes bidding across touchpoints |
| Facebook | 7-day click, 1-day view | Accounts for view-through conversions |
| LinkedIn | Last-touch | B2B typically has direct conversions |

### GA4 Attribution Settings

1. Go to **Admin** > **Attribution settings**
2. Configure:

```
Reporting attribution model: Data-driven
Lookback window:
  - Acquisition events: 30 days
  - All other events: 90 days
```

### Understanding Attribution for Pool Installation

Pool installation has a **long consideration cycle** (30-90 days). Recommended approach:

#### Multi-Touch Attribution View
```
First Touch: 20% credit (awareness)
Middle Touches: 30% credit (consideration)
Last Touch: 50% credit (conversion)
```

#### Channel Attribution Guidelines

| Channel | Typical Role | Attribution Weight |
|---------|--------------|-------------------|
| Organic Search | Awareness/Research | First touch credit |
| Google Ads | Intent capture | Last touch credit |
| Facebook Ads | Awareness/Remarketing | Assisted credit |
| Direct | Conversion | Last touch credit |
| Referral | Trust building | First/assist credit |

### Cross-Platform Attribution Strategy

Since users interact across multiple platforms:

1. **Use UTM parameters consistently**
2. **Import offline conversions** with click IDs
3. **Cross-reference lead source** in CRM
4. **Monthly attribution review** comparing platforms

---

## Conversion Value Optimization

### Dynamic Conversion Values

Instead of static values, pass dynamic values based on user behavior:

#### Calculator-Based Value

```javascript
// When calculator completes, capture the estimate
function getLeadValue(calculatorResult) {
    const baseValue = 500; // Base lead value
    const estimatedProject = calculatorResult.totalCost || 45000;

    // Higher estimated projects = higher lead value
    const multiplier = Math.min(estimatedProject / 45000, 2.5);

    return Math.round(baseValue * multiplier);
}

// Pass to GA4
gtag('event', 'generate_lead', {
    value: getLeadValue(calculatorResult),
    currency: 'USD'
});
```

#### Service-Based Value

| Service Interest | Base Value | Multiplier | Final Value |
|-----------------|------------|------------|-------------|
| Plunge Pool | $500 | 0.9x | $450 |
| Fiberglass Pool | $500 | 1.0x | $500 |
| Concrete Pool | $500 | 1.5x | $750 |
| Metal/Container Pool | $500 | 0.8x | $400 |
| Pool + Spa Combo | $500 | 1.3x | $650 |

#### Location-Based Value

Higher-income areas may have higher close rates:

| Region | Multiplier | Rationale |
|--------|------------|-----------|
| Main Line PA | 1.2x | Higher home values |
| Northern Delaware | 1.0x | Base rate |
| Suburban Philadelphia | 1.1x | Strong market |
| Rural PA | 0.8x | Longer sales cycle |

### Value-Based Bidding Setup

#### Google Ads
1. Go to **Tools & Settings** > **Bidding** > **Portfolio bid strategies**
2. Create strategy: **Maximize conversion value**
3. Set target ROAS based on actual close data

#### Recommended ROAS Targets

| Campaign Type | Target ROAS | Notes |
|---------------|-------------|-------|
| Brand Search | 500% | High intent |
| Non-Brand Search | 300% | New customer acquisition |
| Display Remarketing | 400% | Re-engagement |
| Performance Max | 350% | Blended |

### Offline Conversion Import for True Value

Track actual closed deals back to ads:

1. **Export leads** from CRM with Google Click ID
2. **Match to closed deals** with actual project value
3. **Upload to Google Ads** monthly

```csv
Google Click ID,Conversion Name,Conversion Time,Conversion Value
gclid123abc,Closed - Pool Sale,2024-04-15 14:30:00,52000
gclid456def,Closed - Pool Sale,2024-04-20 09:15:00,48500
```

---

## Testing & Validation

### Pre-Launch Testing Checklist

#### GA4 Testing

- [ ] Verify real-time events in GA4 DebugView
- [ ] Confirm conversion marking for key events
- [ ] Test event parameters are populating
- [ ] Validate enhanced conversions data
- [ ] Check cross-domain tracking (if applicable)

#### Google Ads Testing

- [ ] Confirm conversions imported from GA4
- [ ] Verify conversion values are passing
- [ ] Test conversion tag in Tag Assistant
- [ ] Check phone call conversion tracking
- [ ] Validate offline import format

#### Facebook Testing

- [ ] Use Facebook Pixel Helper extension
- [ ] Verify events in Events Manager Test Events
- [ ] Check Event Match Quality score
- [ ] Test CAPI events via Postman/curl
- [ ] Confirm deduplication is working

#### LinkedIn Testing

- [ ] Verify Insight Tag in LinkedIn Tag Helper
- [ ] Test conversion tracking events
- [ ] Check matched audience population
- [ ] Validate conversion attribution

### Testing Tools

| Tool | Platform | Purpose |
|------|----------|---------|
| GA4 DebugView | GA4 | Real-time event debugging |
| Tag Assistant | Google | Tag verification |
| Facebook Pixel Helper | Facebook | Pixel debugging |
| LinkedIn Insight Tag Helper | LinkedIn | Tag verification |
| Charles Proxy | All | Network request inspection |

### Monthly Audit Checklist

- [ ] Conversion counts match between platforms (±10%)
- [ ] No duplicate conversions firing
- [ ] Event parameters are complete
- [ ] Enhanced conversions match rate > 50%
- [ ] Facebook Event Match Quality > 6
- [ ] Attribution reports align with CRM data
- [ ] Conversion values reflect actual lead quality

### Discrepancy Troubleshooting

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| GA4 shows more conversions than Google Ads | Attribution window differences | Align windows |
| Facebook shows low event match quality | Missing user parameters | Add email/phone hashing |
| No conversions from mobile | Click-to-call not tracking | Verify tel: link tracking |
| Duplicate conversions | Missing event deduplication | Add event_id parameter |
| Low conversion values | Static values only | Implement dynamic values |

---

## Quick Reference: Tracking Codes

### GA4 + Google Ads Tag

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // GA4
  gtag('config', 'G-XXXXXXXXXX');

  // Google Ads
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

### Facebook Pixel

```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
</script>
```

### LinkedIn Insight Tag

```html
<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "XXXXXXX";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
```

---

## Support Resources

- **GA4 Help Center:** [support.google.com/analytics](https://support.google.com/analytics)
- **Google Ads Conversions:** [support.google.com/google-ads/answer/6095821](https://support.google.com/google-ads/answer/6095821)
- **Facebook Conversions API:** [developers.facebook.com/docs/marketing-api/conversions-api](https://developers.facebook.com/docs/marketing-api/conversions-api)
- **LinkedIn Conversions:** [business.linkedin.com/marketing-solutions/insight-tag](https://business.linkedin.com/marketing-solutions/insight-tag)

---

*Document Version: 1.0*
*Last Updated: February 2024*
*Next Review: May 2024*
