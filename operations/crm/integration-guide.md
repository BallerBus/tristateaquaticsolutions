# Integration Guide - Tri-State Aquatic Solutions

## Overview

This document provides detailed instructions for integrating the CRM with essential business tools and platforms.

---

## Website Form Integration

### Option 1: HubSpot Native Forms

**Best For:** Simple forms, full HubSpot ecosystem

**Setup Steps:**

1. **Create Form in HubSpot:**
   - Navigate to Marketing > Forms
   - Click "Create form"
   - Select "Embedded form"
   - Add fields (see below)
   - Configure form options

2. **Configure Form Fields:**

   **Contact Request Form:**
   | Field | Type | Required |
   |-------|------|----------|
   | First Name | Text | Yes |
   | Last Name | Text | Yes |
   | Email | Email | Yes |
   | Phone | Phone | Yes |
   | Pool Interest Type | Dropdown | Yes |
   | Timeline | Dropdown | No |
   | Message | Text Area | No |

   **Free Consultation Form:**
   | Field | Type | Required |
   |-------|------|----------|
   | First Name | Text | Yes |
   | Last Name | Text | Yes |
   | Email | Email | Yes |
   | Phone | Phone | Yes |
   | Street Address | Text | Yes |
   | City | Text | Yes |
   | State | Dropdown | Yes |
   | ZIP Code | Text | Yes |
   | Pool Interest Type | Dropdown | Yes |
   | Preferred Contact Method | Dropdown | No |

3. **Embed on Website:**

   **Method A: JavaScript Embed**
   ```html
   <!--HubSpot Form Embed Code-->
   <script charset="utf-8" type="text/javascript"
     src="//js.hsforms.net/forms/embed/v2.js">
   </script>
   <script>
     hbspt.forms.create({
       region: "na1",
       portalId: "YOUR_PORTAL_ID",
       formId: "YOUR_FORM_ID"
     });
   </script>
   ```

   **Method B: WordPress Plugin**
   - Install "HubSpot - CRM, Email Marketing, Live Chat, Forms & Analytics"
   - Connect to HubSpot account
   - Use shortcode: `[hubspot type=form portal=XXXXX id=XXXXX]`

4. **Configure Form Actions:**
   - Send notification email to sales team
   - Add contact to nurture workflow
   - Set lifecycle stage to "Lead"
   - Trigger lead assignment workflow

### Option 2: Third-Party Form Integration

**Best For:** Existing forms, complex requirements

**Supported Integrations:**
- Typeform
- JotForm
- Gravity Forms (WordPress)
- Contact Form 7 (with extension)
- Formstack

**Setup (Example: Gravity Forms):**

1. Install HubSpot Add-On for Gravity Forms
2. Connect HubSpot account
3. Map form fields to HubSpot properties
4. Test submission
5. Verify contact creation

### UTM Parameter Tracking

**Configure forms to capture:**
```
utm_source
utm_medium
utm_campaign
utm_term
utm_content
```

**Add hidden fields to forms that auto-populate from URL parameters.**

---

## Email Integration

### Gmail Integration

**Requirements:**
- Google Workspace or Gmail account
- HubSpot Sales Extension

**Setup Steps:**

1. **Install Chrome Extension:**
   - Navigate to HubSpot > Settings > Integrations > Email
   - Click "Connect personal email"
   - Select Gmail
   - Follow OAuth authorization

2. **Configure Email Logging:**
   - Settings > Objects > Activities
   - Enable "Log emails sent from Gmail"
   - Enable "Track email opens and clicks"

3. **Install HubSpot Chrome Extension:**
   - Visit Chrome Web Store
   - Search "HubSpot Sales"
   - Install and log in

4. **Features Enabled:**
   - Email tracking (opens/clicks)
   - Templates in Gmail
   - CRM sidebar in Gmail
   - Meeting scheduling links
   - Automatic email logging

### Microsoft Outlook Integration

**Requirements:**
- Outlook desktop or web
- HubSpot Sales Add-in

**Setup Steps:**

1. **Install Outlook Add-in:**
   - Open Outlook
   - Click "Get Add-ins"
   - Search "HubSpot Sales"
   - Add to Outlook

2. **Connect Account:**
   - Click HubSpot icon in Outlook
   - Log in to HubSpot
   - Authorize connection

3. **Configure Settings:**
   - Enable email tracking
   - Enable automatic logging
   - Set logging preferences

### Email Signature Configuration

**Add tracking link to signature:**
```html
<a href="https://meetings.hubspot.com/YOUR-MEETING-LINK">
  Schedule a Call
</a>
```

**Signature Elements:**
- Full name
- Title
- Phone number
- Email
- Company logo
- Meeting link
- Social media links

---

## Calendar Integration

### Google Calendar

**Setup Steps:**

1. **Connect Calendar:**
   - Settings > Integrations > Calendar
   - Click "Connect calendar"
   - Select Google Calendar
   - Authorize access

2. **Configure Meeting Links:**
   - Sales > Meetings
   - Create meeting link
   - Set availability
   - Configure meeting types

3. **Meeting Types to Create:**

   | Meeting Name | Duration | Description |
   |--------------|----------|-------------|
   | Quick Call | 15 min | Brief phone consultation |
   | Discovery Call | 30 min | Initial needs discussion |
   | Site Consultation | 60 min | On-site visit scheduling |
   | Design Review | 45 min | Pool design presentation |

4. **Availability Settings:**
   - Business hours: 8 AM - 6 PM ET
   - Buffer time: 15 minutes between meetings
   - Minimum notice: 24 hours
   - Block time for lunch (12-1 PM)

### Microsoft Outlook Calendar

**Setup Steps:**

1. Navigate to Settings > Integrations
2. Select Outlook Calendar
3. Authorize Microsoft account
4. Configure sync preferences

**Sync Options:**
- One-way: HubSpot to Outlook
- Two-way: Full synchronization
- Selective: Only certain meeting types

### Calendar Embed for Website

**Add booking widget to website:**

```html
<!-- HubSpot Meeting Widget -->
<div class="meetings-iframe-container"
     data-src="https://meetings.hubspot.com/YOUR-LINK?embed=true">
</div>
<script type="text/javascript"
  src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js">
</script>
```

---

## Phone System Integration

### Option 1: HubSpot Native Calling

**Best For:** Small teams, simplicity

**Setup:**
1. Settings > Calling
2. Get HubSpot phone number
3. Configure call recording (check state laws)
4. Set up voicemail

**Features:**
- Click-to-call from CRM
- Automatic call logging
- Call recording (where legal)
- Voicemail transcription

### Option 2: VoIP Integration (RingCentral)

**Best For:** Established phone system

**Setup Steps:**

1. Navigate to App Marketplace
2. Search "RingCentral"
3. Install integration
4. Connect RingCentral account
5. Map users

**Features:**
- Automatic call logging
- Click-to-call
- Call recordings synced
- SMS logging

### Option 3: CallRail Integration

**Best For:** Call tracking and attribution

**Setup Steps:**

1. Create CallRail account
2. Set up tracking numbers
3. Connect HubSpot integration
4. Configure webhook for call logging

**Features:**
- Dynamic number insertion
- Call source tracking
- Call recording
- Transcription
- Lead creation on missed calls

### Call Logging Best Practices

**Required Call Notes:**
- Call outcome (connected/voicemail/no answer)
- Call duration
- Next steps agreed
- Key discussion points

**Automatic Logging:**
- Enable "Log all calls automatically"
- Set default call outcome
- Configure call types

---

## Accounting Integration

### QuickBooks Integration

**Best For:** Financial data sync, invoice tracking

**Setup Steps:**

1. **Connect QuickBooks:**
   - App Marketplace > QuickBooks
   - Click "Connect app"
   - Authorize QuickBooks access

2. **Configure Sync Settings:**

   | HubSpot Object | QuickBooks Object | Direction |
   |----------------|-------------------|-----------|
   | Contacts | Customers | Two-way |
   | Deals | Invoices/Estimates | HubSpot → QB |
   | Products | Items | Two-way |

3. **Sync Rules:**
   - Trigger sync on deal close
   - Create QB customer from contact
   - Generate invoice from deal

4. **Data Mapping:**

   | HubSpot Field | QuickBooks Field |
   |---------------|------------------|
   | Contact Name | Customer Name |
   | Email | Email |
   | Phone | Phone |
   | Address | Billing Address |
   | Deal Amount | Invoice Amount |

### Payment Tracking

**Option 1: Native QuickBooks Sync**
- Payments recorded in QB sync to HubSpot
- Update deal stage on payment received

**Option 2: Stripe Integration**
- Connect Stripe to HubSpot
- Track payments directly
- Trigger workflows on payment

---

## Marketing Platform Integrations

### Facebook Lead Ads

**Setup:**
1. App Marketplace > Facebook Lead Ads
2. Connect Facebook account
3. Select Facebook Page
4. Map ad forms to HubSpot forms

**Automation:**
- Lead syncs immediately
- Trigger welcome workflow
- Assign to sales rep

### Google Ads

**Setup:**
1. Settings > Ads
2. Connect Google Ads account
3. Enable conversion tracking
4. Import HubSpot audiences

**Features:**
- Offline conversion tracking
- Contact list sync for targeting
- ROI reporting in HubSpot

### Facebook Pixel

**Add to website for:**
- Retargeting website visitors
- Custom audience building
- Conversion tracking

**Setup:**
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
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## Document and Contract Integration

### DocuSign Integration

**Best For:** Electronic signatures, contract management

**Setup:**
1. App Marketplace > DocuSign
2. Connect DocuSign account
3. Configure envelope templates

**Workflow:**
1. Deal reaches "Contract Sent" stage
2. DocuSign envelope sent automatically
3. Signed document logs to deal
4. Deal stage updates to "Closed Won"

### PandaDoc Integration

**Alternative to DocuSign**

**Features:**
- Quote and proposal generation
- Electronic signatures
- Content library
- Analytics on document views

### Google Drive/Dropbox Integration

**Setup:**
1. Connect cloud storage account
2. Configure file sync preferences
3. Set folder structure

**Use Cases:**
- Store site photos in contact record
- Attach contracts to deals
- Share documents with team

---

## Communication Tools

### Slack Integration

**Setup:**
1. App Marketplace > Slack
2. Connect Slack workspace
3. Configure notification channels

**Notification Triggers:**
| Event | Channel | Mention |
|-------|---------|---------|
| New Lead | #sales-leads | @sales-team |
| Deal Won | #wins | @here |
| Deal Lost | #sales-analysis | None |
| High-Value Lead | #sales-leads | @sales-manager |

### Microsoft Teams Integration

**Similar to Slack:**
- Notifications to channels
- Card-based updates
- Direct message alerts

---

## Advanced Integrations

### Zapier Connection

**For integrations not natively available**

**Popular Zaps:**
| Trigger | Action |
|---------|--------|
| New HubSpot Contact | Add to Mailchimp |
| Deal Won | Create Trello card |
| Form Submission | Send SMS via Twilio |
| Contact Created | Update Google Sheet |

### API Integration

**For custom integrations**

**HubSpot API Capabilities:**
- Contact management
- Deal management
- Form submissions
- Email sending
- Reporting

**API Authentication:**
- Private apps (recommended)
- OAuth for public apps
- API keys (legacy)

---

## Integration Testing Checklist

### Before Go-Live

- [ ] Test form submission creates contact
- [ ] Test email logging works
- [ ] Test calendar sync both directions
- [ ] Test phone click-to-call
- [ ] Test deal to invoice sync
- [ ] Test notification delivery
- [ ] Verify data mapping accuracy
- [ ] Check duplicate handling
- [ ] Test error handling

### Weekly Health Checks

- [ ] Forms submitting correctly
- [ ] Emails logging as expected
- [ ] Calendar showing accurately
- [ ] Call logs complete
- [ ] Data syncing without errors
- [ ] No integration errors in logs

---

## Troubleshooting Common Issues

### Forms Not Submitting

1. Check JavaScript console for errors
2. Verify embed code is correct
3. Check for plugin conflicts
4. Test in incognito browser
5. Verify HubSpot tracking code installed

### Email Not Logging

1. Check extension is active
2. Re-authorize email connection
3. Verify logging settings
4. Check email associations

### Calendar Not Syncing

1. Re-authorize calendar
2. Check sync direction settings
3. Verify calendar permissions
4. Test with new meeting

### Call Logging Issues

1. Verify phone integration active
2. Check user phone settings
3. Test call outcome logging
4. Review call association rules

---

## Integration Priority Matrix

### Implement First (Week 1)

| Integration | Impact | Effort |
|-------------|--------|--------|
| Website Forms | High | Low |
| Email (Gmail/Outlook) | High | Low |
| Calendar | High | Low |

### Implement Second (Week 2-3)

| Integration | Impact | Effort |
|-------------|--------|--------|
| Phone System | High | Medium |
| Facebook Lead Ads | Medium | Low |
| Slack/Teams | Medium | Low |

### Implement Third (Month 2)

| Integration | Impact | Effort |
|-------------|--------|--------|
| QuickBooks | Medium | Medium |
| DocuSign | Medium | Medium |
| Google Ads | Medium | Medium |

### Implement Later (As Needed)

| Integration | Impact | Effort |
|-------------|--------|--------|
| Zapier | Variable | Variable |
| Custom API | Variable | High |
| Advanced Analytics | Medium | High |
