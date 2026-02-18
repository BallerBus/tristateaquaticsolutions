# Google Tag Manager Implementation Guide
## Tri-State Aquatic Solutions

This guide provides complete instructions for implementing Google Tag Manager (GTM) on the Tri-State Aquatic Solutions website.

---

## Table of Contents

1. [GTM Account and Container Setup](#1-gtm-account-and-container-setup)
2. [Installing GTM on Your Website](#2-installing-gtm-on-your-website)
3. [Tag Configuration](#3-tag-configuration)
4. [Trigger Setup Guide](#4-trigger-setup-guide)
5. [Variable Definitions](#5-variable-definitions)
6. [Preview and Debug](#6-preview-and-debug)
7. [Publishing Workflow](#7-publishing-workflow)
8. [Version Control Best Practices](#8-version-control-best-practices)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. GTM Account and Container Setup

### Creating a GTM Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click "Create Account"
3. Fill in the account details:
   - **Account Name**: Tri-State Aquatic Solutions
   - **Country**: United States
4. Create a container:
   - **Container Name**: tristateaquaticsolutions.com
   - **Target Platform**: Web
5. Accept the Terms of Service
6. Note your Container ID (format: GTM-XXXXXXX)

### Importing the Pre-configured Container

To import the pre-configured container (`gtm-container-export.json`):

1. In GTM, go to **Admin** > **Import Container**
2. Click "Choose container file" and select `gtm-container-export.json`
3. Choose workspace: "Existing" (Default Workspace) or "New"
4. Choose import option:
   - **Merge**: Adds to existing configuration (recommended for new containers)
   - **Overwrite**: Replaces all existing configuration
5. Click "Confirm"
6. Review the imported items in the workspace

### Update Placeholder IDs

After importing, update these placeholder values with your actual IDs:

| Variable Name | Placeholder | Where to Get |
|--------------|-------------|--------------|
| GA4 Measurement ID | G-JQEE2JQN7W | Google Analytics 4 |
| Facebook Pixel ID | XXXXXXXXXXXXXXX | Meta Business Suite |
| Google Ads Conversion ID | AW-XXXXXXXXXX | Google Ads |
| LinkedIn Partner ID | XXXXXXX | LinkedIn Campaign Manager |

---

## 2. Installing GTM on Your Website

### Head Section Code

Add this code as high as possible in the `<head>` section of every page:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

### Body Section Code

Add this code immediately after the opening `<body>` tag:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### Using the gtm-container.js File

For dynamic implementation, include the JavaScript file:

```html
<script src="/analytics/gtm-container.js"></script>
```

This file provides:
- Data layer initialization
- Tracking functions for all key events
- Auto-tracking for scroll depth, time on page, clicks, and forms

---

## 3. Tag Configuration

### GA4 Configuration Tag

**Purpose**: Initialize Google Analytics 4 tracking

| Setting | Value |
|---------|-------|
| Tag Type | Google Analytics: GA4 Configuration |
| Measurement ID | {{GA4 Measurement ID}} |
| Send Page View | Yes |
| Trigger | All Pages |

### GA4 Event Tags

#### Form Submission
- **Event Name**: `generate_lead`
- **Parameters**: form_name, form_type, page_location
- **Trigger**: CE - Form Submission

#### Quote Request
- **Event Name**: `request_quote`
- **Parameters**: pool_type, service_type, conversion_type
- **Trigger**: CE - Quote Request

#### Phone Click
- **Event Name**: `phone_call`
- **Parameters**: phone_number, click_location
- **Trigger**: CE - Phone Click

#### Scroll Depth
- **Event Name**: `scroll`
- **Parameters**: percent_scrolled, page_location
- **Triggers**: Scroll - 25%, 50%, 75%, 100%

#### Video Events
- **video_start**: Fires on YouTube video play
- **video_complete**: Fires on YouTube video completion

### Facebook Pixel Tags

#### Base Code
- Fires on all pages
- Tracks PageView automatically

#### Lead Event
```javascript
fbq('track', 'Lead', {
  content_name: '{{DLV - Form Name}}',
  content_category: '{{DLV - Form Type}}'
});
```

#### SubmitApplication Event
- Fires on quote requests
- Includes pool type and service type

### Google Ads Tags

#### Conversion Tracking
- Uses lookup table for conversion labels by form type
- Fires on form submissions

#### Quote Conversion (High Value)
- Conversion value: $100
- Fires specifically on quote requests

#### Phone Call Conversion
- Fires on tel: link clicks

#### Remarketing Tag
- Fires on all pages for audience building

### LinkedIn Insight Tag

- Loads on all pages
- Tracks conversions on form submissions and quote requests

---

## 4. Trigger Setup Guide

### Page View Triggers

| Trigger Name | Type | Fires On |
|-------------|------|----------|
| All Pages | Page View | Every page load |
| DOM Ready | DOM Ready | When DOM is fully loaded |
| Window Loaded | Window Loaded | When page fully loads |

### Custom Event Triggers

| Trigger Name | Event Name | Purpose |
|-------------|------------|---------|
| CE - Form Submission | formSubmission | Any form submission |
| CE - Quote Request | quoteRequest | Quote form submissions |
| CE - CTA Click | ctaClick | CTA button clicks |
| CE - Phone Click | phoneClick | Phone link clicks |
| CE - Scroll Depth | scrollDepth | Custom scroll tracking |
| CE - Video Interaction | videoInteraction | Video play/pause/complete |
| CE - Tool Usage | toolUsage | Calculator/tool interactions |
| CE - Social Click | socialClick | Social media link clicks |
| CE - Cost Calculator Complete | costCalculatorComplete | Pool cost calculator |

### Click Triggers

| Trigger Name | Condition |
|-------------|-----------|
| Click - Phone Links | Click URL starts with "tel:" |
| Click - Email Links | Click URL starts with "mailto:" |
| Click - CTA Buttons | Click Classes match cta, btn-primary, quote-btn, contact-btn |

### Scroll Depth Triggers

| Trigger | Threshold |
|---------|-----------|
| Scroll - 25% | 25% vertical scroll |
| Scroll - 50% | 50% vertical scroll |
| Scroll - 75% | 75% vertical scroll |
| Scroll - 100% | 100% vertical scroll |

### YouTube Video Triggers

| Trigger | Action |
|---------|--------|
| YouTube Video - Start | Video begins playing |
| YouTube Video - Complete | Video reaches end |
| YouTube Video - Progress | 25%, 50%, 75% progress |

---

## 5. Variable Definitions

### Constant Variables

| Variable Name | Type | Value/Purpose |
|--------------|------|---------------|
| GA4 Measurement ID | Constant | Your GA4 property ID |
| Facebook Pixel ID | Constant | Your Meta Pixel ID |
| Google Ads Conversion ID | Constant | Your Google Ads conversion ID |
| LinkedIn Partner ID | Constant | Your LinkedIn partner ID |

### Data Layer Variables

| Variable Name | Data Layer Key | Default |
|--------------|----------------|---------|
| DLV - Event Name | event | - |
| DLV - Page Type | pageType | other |
| DLV - Form Name | formName | - |
| DLV - Form Type | formType | contact |
| DLV - Conversion Type | conversionType | - |
| DLV - Button Text | buttonText | - |
| DLV - Button Location | buttonLocation | - |
| DLV - Phone Number | phoneNumber | - |
| DLV - Scroll Percentage | scrollPercentage | - |
| DLV - Video Name | videoName | - |
| DLV - Video Action | videoAction | - |
| DLV - Pool Type | poolType | - |
| DLV - Service Type | serviceType | - |
| DLV - Tool Name | toolName | - |
| DLV - Social Platform | socialPlatform | - |

### JavaScript Variables

| Variable Name | Purpose |
|--------------|---------|
| JS - User Agent | Returns navigator.userAgent |
| JS - Screen Resolution | Returns screen width x height |
| JS - Viewport Size | Returns window innerWidth x innerHeight |
| JS - Browser Language | Returns navigator.language |

### Lookup Table Variables

| Variable Name | Input | Purpose |
|--------------|-------|---------|
| Lookup - Conversion Label by Form Type | {{DLV - Form Type}} | Maps form type to Google Ads conversion label |

### Built-in Variables (Enable These)

- Page URL, Page Hostname, Page Path
- Referrer
- Event
- Click Element, Classes, ID, Target, URL, Text
- Form Element, Classes, ID, Target, URL, Text
- Scroll Depth Threshold, Units, Direction
- Video Provider, URL, Title, Duration, Percent, Visible, Status, Current Time

---

## 6. Preview and Debug

### Entering Preview Mode

1. In GTM, click the **Preview** button in the top right
2. Enter your website URL
3. Click **Start**
4. A new browser tab opens with your site and GTM debug panel

### Using the Debug Panel

The debug panel shows:

- **Summary**: Overview of all tags fired
- **Tags**: Which tags fired and which didn't
- **Variables**: Current values of all variables
- **Data Layer**: All data layer pushes
- **Errors**: Any JavaScript errors

### Testing Checklist

#### Page Load Events
- [ ] GA4 Configuration fires on page load
- [ ] Facebook Pixel PageView fires
- [ ] LinkedIn Insight Tag fires
- [ ] Google Ads Remarketing fires

#### Form Submissions
- [ ] Submit a test form
- [ ] Verify GA4 generate_lead event fires
- [ ] Verify Facebook Lead event fires
- [ ] Verify Google Ads conversion fires
- [ ] Check data layer for correct form data

#### Phone/Email Clicks
- [ ] Click a phone link
- [ ] Verify phone_call event fires
- [ ] Click an email link
- [ ] Verify data layer capture

#### Scroll Tracking
- [ ] Scroll to 25% and verify trigger
- [ ] Scroll to 50% and verify trigger
- [ ] Scroll to 75% and verify trigger
- [ ] Scroll to 100% and verify trigger

#### Video Tracking
- [ ] Play a YouTube video
- [ ] Verify video_start fires
- [ ] Watch to completion
- [ ] Verify video_complete fires

### Browser Console Debugging

Check the browser console for:

```javascript
// View entire data layer
console.log(window.dataLayer);

// Filter for specific events
dataLayer.filter(item => item.event === 'formSubmission');
```

---

## 7. Publishing Workflow

### Pre-Publish Checklist

1. [ ] All tags tested in Preview mode
2. [ ] No JavaScript errors in console
3. [ ] Correct measurement IDs configured
4. [ ] Conversion tracking verified
5. [ ] All triggers working as expected
6. [ ] Variables returning correct values

### Creating a Version

1. Click **Submit** in the top right
2. Choose **Publish and Create Version**
3. Enter version details:
   - **Version Name**: Use descriptive name (e.g., "v1.0 - Initial GA4 + Facebook Setup")
   - **Version Description**: Document all changes
4. Click **Publish**

### Version Naming Convention

```
v[MAJOR].[MINOR] - [Brief Description]

Examples:
v1.0 - Initial Setup with GA4, Facebook, Google Ads, LinkedIn
v1.1 - Added scroll depth tracking
v1.2 - Fixed phone click trigger
v2.0 - Major update: Added calculator tracking
```

### Rollback Procedure

If issues are discovered after publishing:

1. Go to **Versions** in GTM
2. Find the previous working version
3. Click the three dots menu
4. Select **Publish**
5. Confirm the rollback

---

## 8. Version Control Best Practices

### Workspace Management

- Use **Default Workspace** for standard changes
- Create **separate workspaces** for major features
- Merge workspaces before publishing

### Container Export Schedule

Export your container regularly:

1. Go to **Admin** > **Export Container**
2. Select the latest version
3. Save with naming convention: `gtm-tsas-YYYY-MM-DD.json`
4. Store in version control (Git)

### Change Documentation

For each change, document:

```markdown
## Change Log Entry

**Date**: 2024-02-02
**Version**: v1.1
**Author**: [Name]

### Changes Made
- Added new trigger for cost calculator
- Updated Facebook Pixel event parameters
- Fixed scroll depth threshold issue

### Testing Notes
- Tested on Chrome, Firefox, Safari
- Verified in GA4 real-time reports
- Confirmed Facebook Events Manager receipt

### Related Issues
- Fixes JIRA-123
```

### Folder Organization in GTM

Organize tags, triggers, and variables into folders:

```
Tags/
├── Analytics/
│   ├── GA4 - Configuration
│   └── GA4 - Events/
├── Advertising/
│   ├── Facebook Pixel/
│   ├── Google Ads/
│   └── LinkedIn/
└── Utility/
    └── Conversion Linker

Triggers/
├── Page View/
├── Custom Events/
├── Clicks/
├── Forms/
├── Scroll/
└── Video/

Variables/
├── Constants/
├── Data Layer/
├── JavaScript/
└── Lookup Tables/
```

---

## 9. Troubleshooting

### Common Issues

#### Tags Not Firing

1. Check trigger conditions in Preview mode
2. Verify data layer events are being pushed
3. Check for JavaScript errors in console
4. Ensure GTM code is installed correctly

#### Data Layer Variables Empty

1. Verify the data layer push happens before GTM loads
2. Check variable names match exactly (case-sensitive)
3. Use Data Layer version 2 in variable settings

#### Conversion Not Recording

1. Verify conversion ID and label are correct
2. Check that conversion linker tag is firing
3. Test with Google Tag Assistant
4. Allow 24-48 hours for conversions to appear

#### Facebook Events Not Appearing

1. Check Facebook Pixel Helper browser extension
2. Verify pixel ID is correct
3. Ensure events fire after base pixel code
4. Check for ad blockers

### Debugging Tools

| Tool | Purpose |
|------|---------|
| GTM Preview Mode | Test tags before publishing |
| Google Tag Assistant | Verify Google tags |
| Facebook Pixel Helper | Debug Facebook events |
| GA4 DebugView | Real-time GA4 event viewing |
| Browser DevTools | Console errors, network requests |

### Getting Help

- [GTM Help Center](https://support.google.com/tagmanager)
- [GA4 Help](https://support.google.com/analytics)
- [Facebook Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [LinkedIn Insight Tag Guide](https://www.linkedin.com/help/lms/answer/65513)

---

## Quick Reference: Data Layer Push Examples

### Form Submission
```javascript
window.dataLayer.push({
  'event': 'formSubmission',
  'formName': 'contact-form',
  'formType': 'contact'
});
```

### Quote Request
```javascript
window.dataLayer.push({
  'event': 'quoteRequest',
  'poolType': 'fiberglass',
  'serviceType': 'installation'
});
```

### Phone Click
```javascript
window.dataLayer.push({
  'event': 'phoneClick',
  'phoneNumber': '302-555-1234',
  'clickLocation': 'header'
});
```

### CTA Click
```javascript
window.dataLayer.push({
  'event': 'ctaClick',
  'buttonText': 'Get Free Quote',
  'buttonLocation': 'hero'
});
```

---

## Contact

For implementation questions or issues, contact the web development team.

**Last Updated**: February 2024
**GTM Container ID**: GTM-XXXXXXX (replace with actual)
