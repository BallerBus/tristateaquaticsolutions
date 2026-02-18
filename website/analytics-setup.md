# Tri-State Aquatic Solutions - Analytics Setup Guide
**Created by:** Brandon Bot
**Date:** 2026-02-02
**Priority:** HIGH - Activate Analytics System

---

## Analytics Stack (Robust)

### 1. Google Tag Manager (GTM)
- Tag management for all tracking scripts
- Easily add/update/remove tags without code changes
- Built-in GA4 configuration

### 2. Google Analytics 4 (GA4)
- Website traffic and user behavior
- Conversion tracking
- Funnel analysis
- Real-time monitoring

### 3. Hotjar
- Heatmaps (clicks, scrolls, attention)
- Session recordings
- User feedback surveys
- Form analysis

### 4. Vercel Analytics
- Page performance metrics
- Core Web Vitals
- Speed insights

---

## Tasks To Complete

### 1. Create Google Tag Manager Account
**Status:** NEEDS DOING | **Difficulty:** Easy (5 min)

1. Go to https://tagmanager.google.com
2. Create account: "Tri-State Aquatic Solutions"
3. Create container: "Website" (Web platform)
4. Copy Container ID (format: `GTM-XXXXXXX`)

**Tags to configure in GTM:**
- GA4 Configuration Tag (fires on all pages)
- GA4 Event Tags (conversions below)
- Hotjar Tag (fires on all pages)

---

### 2. Create Google Analytics 4 Property
**Status:** NEEDS DOING | **Difficulty:** Easy (5 min)

1. Go to https://analytics.google.com
2. Create new property: "Tri-State Aquatic Solutions"
3. Get the Measurement ID (format: `G-JQEE2JQN7W`)
4. Link GA4 to GTM:
   - In GA4: Admin → Property Settings → Associate with GTM
   - Enter your GTM Container ID

**Key Events to Track as Conversions:**
- `generate_lead` - Contact form submission
- `phone_click` - Click-to-call button
- `directions_click` - Get directions request
- `gallery_view` - View gallery
- `quote_request` - Request a quote
- `page_view` - All page views (default)

---

### 3. Create Hotjar Account
**Status:** NEEDS DOING | **Difficulty:** Easy (5 min)

1. Go to https://hotjar.com
2. Create free account
3. Add site: `tristateaquaticsolutions.com`
4. Get Site ID (numeric, like `1234567`)
5. Copy Heatmap tracking code snippet

**Hotjar Settings:**
- Enable Heatmaps (Click, Move, Scroll)
- Enable Session Recordings (capture user journeys)
- Set recording sampling to 20% of visitors
- Enable Form Analysis for contact forms

---

### 4. Add GTM to Website
**Status:** NEEDS DOING | **Difficulty:** Easy (10 min)

Add this to `<head>` of every page (should already be in template):

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Replace `GTM-XXXXXXX` with your actual container ID.

---

### 5. Configure GTM Tags

**Tag 1: GA4 Configuration**
- Type: Google Analytics: GA4 Configuration
- Measurement ID: `G-JQEE2JQN7W`
- Trigger: All Pages

**Tag 2: Click-to-Call Tracking**
- Type: Google Analytics: GA4 Event
- Event Name: `phone_click`
- Trigger: Click - Just Links → Filter: `href` contains `tel:`

**Tag 3: Form Submission Tracking**
- Type: Google Analytics: GA4 Event
- Event Name: `generate_lead`
- Trigger: Form Submission → All Forms

**Tag 4: Hotjar**
- Type: Custom HTML
- Paste Hotjar tracking code
- Trigger: All Pages

---

### 6. Set Environment Variables (Optional - if using Vercel)

Create `.env.local` in website root:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-JQEE2JQN7W
NEXT_PUBLIC_HOTJAR_ID=XXXXXXXX
NEXT_PUBLIC_HOTJAR_VERSION=11
NEXT_PUBLIC_SITE_URL=https://tristateaquaticsolutions.com
```

---

## Tracking Checklist

### Essential Events Tracked
| Event | Category | Action | Label |
|-------|----------|--------|-------|
| Phone click | Engagement | Click | Phone CTA |
| Contact form | Conversion | Submit | Contact form |
| Quote request | Conversion | Submit | Quote form |
| Gallery view | Engagement | View | Gallery |
| Pool page view | Engagement | View | {pool-type} |
| Service page | Engagement | View | {service-name} |
| Location page | Engagement | View | {location} |

### Funnels to Monitor
1. **Lead Funnel:** Home → Pool Type → Gallery → Contact → Quote Request
2. **Phone Call Funnel:** Any page → Phone Click → Call
3. **Quote Funnel:** Home → Quote Request → Submission → Follow-up

---

## Reports to Review Weekly

### GA4 Reports
- Acquisition → Traffic Acquisition (how visitors find you)
- Engagement → Pages and Screens (most viewed)
- Conversions → All Conversions (lead events)
- Real-time (check active visitors)

### Hotjar Reports
- Heatmaps (hot spots on pages)
- Recordings (user journey playback)
- Form Analysis (drop-off points)

---

## Files Created

| File | Purpose |
|------|---------|
| `website/analytics-config.js` | Configuration file (replace IDs) |
| `website/integrations/gtm-head.html` | GTM head tag snippet |
| `website/integrations/gtm-noscript.html` | GTM noscript tag snippet |
| `website/integrations/hotjar.html` | Hotjar tracking code |
| `website/analytics-setup.md` | This file |

---

## Quick Reference - IDs to Get

| Service | What to Find | Format | Status |
|---------|--------------|--------|--------|
| Google Tag Manager | Container ID | `GTM-XXXXXXX` | ⏳ |
| Google Analytics 4 | Measurement ID | `G-JQEE2JQN7W` | ⏳ |
| Hotjar | Site ID | `1234567` | ⏳ |

---

## After Setup Complete

1. ✅ Verify GTM preview mode works
2. ✅ Check GA4 Real-Time shows your visit
3. ✅ Test phone click tracking (click the phone number)
4. ✅ View Hotjar heatmap data after 1 week
5. ✅ Set up weekly email reports in GA4

---

## Questions?

- GA4 Help: https://support.google.com/analytics
- GTM Help: https://support.google.com/tagmanager
- Hotjar Help: https://help.hotjar.com
