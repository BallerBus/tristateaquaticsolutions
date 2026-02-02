# GoHighLevel CRM Integration Guide

## Tri-State Aquatic Solutions CRM Setup

**Location ID:** A0e67CElQk4EoVK0XY2K
**API Version:** 2021-07-28

---

## Current Setup Status

### Completed (via API)

#### Tags (12 created)
| Tag Name | Purpose |
|----------|---------|
| Hot Lead | Lead score 60+ |
| Warm Lead | Lead score 30-59 |
| Pool Installation Interest | Interested in pool installation |
| Fiberglass Pool | Interested in fiberglass specifically |
| Website Lead | Originated from website |
| Consultation Scheduled | Has scheduled a consultation |
| Quote Sent | Quote has been delivered |
| Main Line PA | Located in Main Line PA service area |
| Northern Delaware | Located in Northern DE service area |
| Referral | Came via referral |
| Customer - Active | Current active customer |
| VIP Customer | High-value/repeat customer |

#### Custom Fields (10 created)
| Field Name | ID | Type | Purpose |
|------------|-----|------|---------|
| Budget Range | JNuCCv9A7P3lDwPyTHJQ | Dropdown | $40K-60K, $60K-80K, $80K-100K, $100K+ |
| Project Timeline | sHZPxSX8v3AxT7VlPMNU | Dropdown | 1-3 months, 3-6 months, etc. |
| Pool Type Interest | 6rUIe2iyKFOQH5LQoKCN | Dropdown | Fiberglass, Concrete, Vinyl |
| Lead Source | UJMHkM8jJQZXKWcRwT4v | Text | How they found us |
| Lead Score | NjVEV6p5lJxiIEKPKhIk | Number | Calculated engagement score (0-100) |
| Property Type | QMCtIhvB1wJFFZo9p57T | Dropdown | Single Family, Estate, etc. |
| Estimated Project Value | g8K6n1GQFXTR4AKHpIR9 | Monetary | Dollar amount |
| Financing Interest | pBwNIFFsNPa7d5WwKTfX | Dropdown | Yes, No, Not Sure |
| UTM Source | dYINQnIPCcl8LdCBGJnr | Text | Marketing attribution |
| UTM Medium | aKlNHbgbJH5zIRdGMT2i | Text | Marketing attribution |
| UTM Campaign | QdV5Pu8xScZLwFXCbJpk | Text | Marketing attribution |

#### Calendar (1 created)
| Calendar | ID | Duration |
|----------|-----|----------|
| Pool Consultation | bv7cBA8pwgKIFg0dJ7du | 30 minutes |
- **Hours:** Mon-Fri 9am-5pm, Sat 10am-2pm

#### Existing Pipelines
| Pipeline | ID | Stages |
|----------|-----|--------|
| Active Deals | LGgQEViEFr1pAKKzvMtJ | Discovery Scheduled → Discovery Completed → Site Walk Scheduled → Proposal Sent → Verbal Yes → Won |
| Outbound Prospecting | CuYXKTlImuCBVU121aP1 | Uncontacted → Attempting Contact → Connected → DM Connected |

#### Existing Forms
| Form | ID |
|------|-----|
| Basic Contact Us Form | RuQ3jUXPZ8wpCywCNTp0 |
| Tristate Contact Us Form | mwzpnfe1nSwGVlSGI8hm |

---

## Manual Setup Required

### 1. Add Pipeline Creation Scope (if needed)

Your API key needs additional scopes to create pipelines. In GHL:

1. Go to **Settings** → **Integrations** → **Private Integrations**
2. Find your integration
3. Add these scopes:
   - `opportunities.write`
   - `opportunities.readonly`
   - `pipelines.write`
   - `pipelines.readonly`
4. Save and regenerate API key if needed

### 2. Create Pool Installation Pipeline (Manual)

In GHL, create a new pipeline called **"Pool Installation Project"** with these stages:

| Stage | Position | Purpose |
|-------|----------|---------|
| Permit Application Submitted | 0 | Initial permit filed |
| Permit Approved | 1 | Permit received |
| Site Preparation | 2 | Excavation, grading |
| Equipment Delivery Scheduled | 3 | Pool shell arriving |
| Pool Shell Installation | 4 | Main install day |
| Plumbing & Electrical | 5 | Connections |
| Backfill & Grading | 6 | Surrounding work |
| Decking/Patio Work | 7 | Finishing touches |
| Final Inspection | 8 | Municipal inspection |
| Customer Handoff & Training | 9 | Pool school, keys |
| Project Complete | 10 | Final stage |

### 3. Set Up Business Phone & Email

**IMPORTANT:** Do NOT use personal email or phone for automated communications.

1. In GHL, go to **Settings** → **Phone Numbers**
2. Purchase a dedicated business number for Tri-State
3. Go to **Settings** → **Email Services**
4. Set up a dedicated business email (e.g., info@tristateaquaticsolutions.com)

### 4. Embed Calendar on Website

Add this embed code to your scheduling page:

```html
<iframe
  src="https://api.leadconnectorhq.com/widget/booking/bv7cBA8pwgKIFg0dJ7du"
  style="width: 100%; height: 700px; border: none; overflow: hidden;"
  scrolling="no"
  id="ghl-calendar-embed">
</iframe>

<script src="https://api.leadconnectorhq.com/js/embed.js"></script>
```

### 5. Embed Forms on Website

For the contact form:

```html
<iframe
  src="https://api.leadconnectorhq.com/widget/form/mwzpnfe1nSwGVlSGI8hm"
  style="width: 100%; height: 500px; border: none;"
  id="ghl-form-embed">
</iframe>

<script src="https://api.leadconnectorhq.com/js/embed.js"></script>
```

---

## Website Integration

### Option 1: GHL Forms (Recommended for Simple Setup)

Use GHL's built-in forms with iframe embeds. No code required.

### Option 2: Custom Forms with API (Recommended for Full Control)

Use the provided JavaScript integration:

#### 1. Add to your HTML

```html
<!-- Before </body> -->
<script src="/integrations/gohighlevel/ghl-integration.js"></script>
```

#### 2. Mark forms for GHL tracking

```html
<form data-ghl data-ghl-redirect="/thank-you">
  <input type="text" name="firstName" required>
  <input type="text" name="lastName" required>
  <input type="email" name="email" required>
  <input type="tel" name="phone">
  <select name="budget">
    <option value="$40K-$60K">$40,000 - $60,000</option>
    <option value="$60K-$80K">$60,000 - $80,000</option>
    <option value="$80K-$100K">$80,000 - $100,000</option>
    <option value="$100K+">$100,000+</option>
  </select>
  <button type="submit">Get Free Quote</button>
</form>
```

#### 3. Deploy Serverless Function

For Vercel deployment, add `vercel-api.js` to `/api/ghl/contacts.js`

Set environment variables in Vercel:
```
GHL_API_KEY=pit-ddec3b6f-9555-40c6-a120-ace99ecd96ee
GHL_LOCATION_ID=A0e67CElQk4EoVK0XY2K
```

---

## Lead Scoring System

The integration automatically calculates lead scores (0-100):

### Scoring Criteria

| Action | Points |
|--------|--------|
| Page view | 2 (max 20) |
| Visit /contact or /quote | 15 |
| Visit /financing | 10 |
| Visit /schedule | 15 |
| Visit /pools/ pages | 5 |
| Visit /portfolio | 5 |
| Visit /calculator | 10 |
| Visit comparison pages | 7 |
| Google Ads click (gclid) | 10 |
| Google Ads paid search | 15 |
| Referral source | 20 |
| 2+ minutes on site | 5 |
| 5+ minutes on site | 10 |
| 10+ minutes on site | 15 |

### Lead Temperature

| Score | Temperature | Action |
|-------|-------------|--------|
| 60+ | Hot | Call within 5 minutes |
| 30-59 | Warm | Call within 24 hours |
| 0-29 | Cold | Email nurture sequence |

---

## Automation Workflows to Create

### 1. Hot Lead Alert
**Trigger:** Contact created with tag "Hot Lead"
**Actions:**
- Internal notification (SMS/email to sales team)
- Create task: "Call within 5 minutes"
- Move to "Active Deals" pipeline

### 2. New Lead Welcome
**Trigger:** Contact created with tag "Website Lead"
**Actions:**
- Wait 5 minutes
- Send welcome email (if business email configured)
- Add to email sequence

### 3. Consultation Confirmation
**Trigger:** Appointment created on Pool Consultation calendar
**Actions:**
- Add tag "Consultation Scheduled"
- Send confirmation email
- Create task: "Prepare for consultation"

### 4. Quote Follow-Up
**Trigger:** Tag "Quote Sent" added
**Actions:**
- Wait 2 days
- Send follow-up email
- Create task: "Follow up on quote"

### 5. Post-Installation Survey
**Trigger:** Opportunity moved to "Won" stage
**Actions:**
- Wait 30 days
- Send satisfaction survey
- Request Google review

---

## API Reference

### Create Contact
```bash
curl -X POST "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer pit-ddec3b6f-9555-40c6-a120-ace99ecd96ee" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "locationId": "A0e67CElQk4EoVK0XY2K",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "+14848437965",
    "tags": ["Website Lead", "Hot Lead"],
    "customFields": [
      {"id": "JNuCCv9A7P3lDwPyTHJQ", "value": "$60K-$80K"}
    ]
  }'
```

### Create Opportunity
```bash
curl -X POST "https://services.leadconnectorhq.com/opportunities/" \
  -H "Authorization: Bearer pit-ddec3b6f-9555-40c6-a120-ace99ecd96ee" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "locationId": "A0e67CElQk4EoVK0XY2K",
    "contactId": "CONTACT_ID",
    "pipelineId": "LGgQEViEFr1pAKKzvMtJ",
    "pipelineStageId": "a8b53e0c-ccd5-45df-af4e-304811750b53",
    "name": "Pool Project - John Smith",
    "status": "open"
  }'
```

---

## Troubleshooting

### "401 Unauthorized"
- Check API key is correct
- Verify scopes include required permissions
- Ensure key hasn't expired

### "Location not found"
- Verify location ID: A0e67CElQk4EoVK0XY2K
- Check you're using the correct GHL account

### Forms not submitting
- Check CORS headers on API endpoint
- Verify form field names match expected values
- Check browser console for JavaScript errors

---

## Support

For GHL support:
- Documentation: https://highlevel.stoplight.io/docs/integrations
- Support: https://support.gohighlevel.com

For website integration issues, check the browser console and server logs.
