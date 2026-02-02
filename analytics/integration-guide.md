# Analytics Integration Guide

**Tri-State Aquatic Solutions**
*Complete guide for integrating analytics across all website pages*

Last Updated: 2026-02-02

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Configuration](#configuration)
4. [Integration by Page Type](#integration-by-page-type)
5. [Event Tracking](#event-tracking)
6. [Testing & Verification](#testing--verification)
7. [Troubleshooting](#troubleshooting)
8. [Privacy Compliance](#privacy-compliance)

---

## Overview

The analytics bundle includes:

- **Google Analytics 4 (GA4)** - Core analytics and event tracking
- **Google Tag Manager (GTM)** - Tag management and advanced triggers
- **Microsoft Clarity** - Session recordings and heatmaps
- **Performance Monitoring** - Core Web Vitals tracking
- **Cookie Consent** - GDPR/CCPA compliant consent management

### File Structure

```
website/analytics/
├── analytics-bundle.js      # Combined analytics initialization
├── analytics-head.html      # Head snippet (GTM + preconnect)
├── analytics-body.html      # Body snippet (GTM noscript + loader)
└── cookie-consent.js        # Cookie consent banner
```

---

## Quick Start

### Step 1: Update Configuration

Edit `analytics-bundle.js` and replace placeholder IDs:

```javascript
const CONFIG = {
    ga4: {
        measurementId: 'G-XXXXXXXXXX', // Your GA4 ID
        enabled: true
    },
    gtm: {
        containerId: 'GTM-XXXXXXX',    // Your GTM Container ID
        enabled: true
    },
    clarity: {
        projectId: 'XXXXXXXXXX',        // Your Clarity Project ID
        enabled: true
    }
};
```

Also update `analytics-head.html`:
- Replace `GTM-XXXXXXX` with your GTM Container ID

And `analytics-body.html`:
- Replace `GTM-XXXXXXX` with your GTM Container ID

### Step 2: Add to HTML Pages

Add to every HTML page:

**In `<head>` section (as early as possible):**

```html
<!-- After charset and viewport meta tags -->
<!-- COPY CONTENTS FROM: /analytics/analytics-head.html -->
```

**Immediately after opening `<body>` tag:**

```html
<body>
<!-- COPY CONTENTS FROM: /analytics/analytics-body.html -->
```

### Step 3: Deploy and Test

1. Deploy changes to staging
2. Use browser DevTools to verify scripts load
3. Check GTM Preview mode
4. Verify GA4 DebugView
5. Deploy to production

---

## Configuration

### Debug Mode

Enable debug mode during development:

```javascript
// In browser console
TSASAnalytics.enableDebug();

// Or set in analytics-bundle.js
debug: true
```

### Disable Specific Platforms

```javascript
// In analytics-bundle.js
ga4: { enabled: false },    // Disable GA4
gtm: { enabled: false },    // Disable GTM
clarity: { enabled: false } // Disable Clarity
```

### Performance Monitoring

Adjust sample rate and thresholds:

```javascript
performance: {
    enabled: true,
    sampleRate: 0.5, // Track 50% of users
    thresholds: {
        lcp: 2500,   // Largest Contentful Paint target
        fid: 100,    // First Input Delay target
        cls: 0.1,    // Cumulative Layout Shift target
        ttfb: 600    // Time to First Byte target
    }
}
```

---

## Integration by Page Type

### Standard Content Pages

For pages like `/about/`, `/faq/`, etc.:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title | Tri-State Aquatic Solutions</title>

    <!-- Analytics Head Snippet -->
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="preconnect" href="https://www.google-analytics.com">
    <link rel="preconnect" href="https://www.clarity.ms">
    <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
    </script>
    <!-- End Analytics Head -->

    <!-- Other head content -->
</head>
<body data-page-type="content" data-page-category="general">
    <!-- GTM noscript -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>

    <!-- Analytics Bundle Loader -->
    <script src="/analytics/analytics-bundle.js" async defer></script>

    <!-- Page content -->
</body>
</html>
```

### Landing Pages

For conversion-focused landing pages:

```html
<body data-page-type="landing" data-page-category="lead-generation">
    <!-- GTM noscript + analytics loader -->

    <!-- Track specific CTA buttons -->
    <button data-analytics-cta="get-free-quote"
            data-analytics-location="hero">
        Get Free Quote
    </button>

    <!-- Track form submissions -->
    <form data-analytics-form="contact-form" id="contact-form">
        <!-- form fields -->
    </form>
</body>
```

### Blog Posts

```html
<body data-page-type="blog" data-page-category="pool-installation">
    <!-- Analytics snippets -->

    <script>
    // Track article reading
    document.addEventListener('DOMContentLoaded', function() {
        TSASAnalytics.events.custom('article_view', {
            'article_title': 'Your Article Title',
            'article_category': 'pool-installation',
            'author': 'Tri-State Aquatic Solutions'
        });
    });
    </script>
</body>
```

### Tool/Calculator Pages

```html
<body data-page-type="tool" data-page-category="calculator">
    <!-- Analytics snippets -->

    <script>
    function onCalculatorSubmit(inputs, result) {
        TSASAnalytics.events.calculatorUsage(
            'pool-cost-calculator',
            inputs,
            result
        );
    }
    </script>
</body>
```

### Location Pages

```html
<body data-page-type="location" data-page-category="delaware">
    <script>
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'page_type': 'location',
        'location_city': 'Wilmington',
        'location_state': 'DE',
        'service_area': 'Northern Delaware'
    });
    </script>
    <!-- Analytics snippets -->
</body>
```

---

## Event Tracking

### Automatic Tracking

The bundle automatically tracks:

- **Phone clicks** - `tel:` links
- **Outbound links** - External website clicks
- **Scroll depth** - 25%, 50%, 75%, 90%, 100%
- **Form submissions** - All forms with `data-analytics-form`
- **CTA clicks** - Elements with `data-analytics-cta`

### Manual Event Tracking

```javascript
// Form submission
TSASAnalytics.events.formSubmit('contact-form', {
    form_location: 'footer'
});

// CTA click
TSASAnalytics.events.ctaClick('schedule-consultation', 'hero');

// Phone call
TSASAnalytics.events.phoneCall('(302) 555-0123');

// Lead generation
TSASAnalytics.events.leadGenerated('quiz', {
    quiz_result: 'fiberglass-pool',
    estimated_budget: '$50,000-75,000'
});

// Calculator usage
TSASAnalytics.events.calculatorUsage('financing',
    { pool_cost: 50000, term: 120 },
    { monthly_payment: 450 }
);

// Quiz completion
TSASAnalytics.events.quizComplete('pool-finder',
    { style: 'modern', size: 'medium' },
    'Fiberglass Pool'
);

// File download
TSASAnalytics.events.download('pool-buyers-guide.pdf', 'pdf');

// Video interaction
TSASAnalytics.events.videoInteraction('play', 'Pool Installation Process');
TSASAnalytics.events.videoInteraction('complete', 'Pool Installation Process', 100);

// Custom event
TSASAnalytics.events.custom('custom_event_name', {
    custom_param: 'value'
});
```

### Data Layer Push (GTM)

```javascript
// Push to dataLayer directly
window.dataLayer.push({
    'event': 'custom_event',
    'custom_data': {
        key: 'value'
    }
});
```

---

## Testing & Verification

### Pre-Launch Checklist

- [ ] GTM Container ID is correct in all files
- [ ] GA4 Measurement ID is correct
- [ ] Clarity Project ID is correct
- [ ] Debug mode is disabled for production
- [ ] Cookie consent banner appears for new visitors
- [ ] Privacy policy link in consent banner works
- [ ] All pages include analytics head snippet
- [ ] All pages include analytics body snippet
- [ ] Phone click tracking works
- [ ] Form submission tracking works
- [ ] Scroll depth tracking works

### Browser DevTools Verification

1. **Check script loading:**
   ```
   Network tab → Filter by "gtm" or "analytics"
   ```

2. **Check dataLayer:**
   ```javascript
   // Console
   console.log(window.dataLayer);
   ```

3. **Check analytics object:**
   ```javascript
   // Console
   console.log(TSASAnalytics);
   console.log(TSASAnalytics.isReady());
   ```

### GTM Preview Mode

1. Go to Google Tag Manager
2. Click "Preview" in top right
3. Enter your website URL
4. Verify tags fire on page load
5. Test events (form submit, button clicks)

### GA4 DebugView

1. Go to GA4 Admin → DebugView
2. Enable debug mode:
   ```javascript
   TSASAnalytics.enableDebug();
   ```
3. Navigate your site and verify events appear

### Clarity Dashboard

1. Go to clarity.microsoft.com
2. Check Recordings tab for new sessions
3. Verify heatmaps are being generated

### Performance Testing

```javascript
// Get current performance metrics
console.log(TSASAnalytics.performance.getMetrics());
```

---

## Troubleshooting

### Analytics Not Loading

**Symptoms:** No network requests to Google/Clarity

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify script paths are correct (`/analytics/analytics-bundle.js`)
3. Check if ad blockers are active
4. Verify GTM container ID is correct

### Cookie Consent Not Appearing

**Symptoms:** Banner never shows

**Solutions:**
1. Clear cookies and refresh
2. Check if `tsas_analytics_consent` cookie exists
3. Verify `cookie-consent.js` is loading
4. Check console for errors

### Events Not Tracking

**Symptoms:** Events not appearing in GA4/GTM

**Solutions:**
1. Check consent status:
   ```javascript
   TSASAnalytics.consent.getStatus();
   ```
2. Verify user has granted consent
3. Enable debug mode and check console
4. Verify element has correct `data-analytics-*` attributes

### GTM Tags Not Firing

**Symptoms:** Tags show as "Not Fired" in Preview

**Solutions:**
1. Check trigger conditions
2. Verify consent mode is configured in GTM
3. Check if dataLayer events are pushing correctly
4. Review GTM container for errors

### Performance Metrics Missing

**Symptoms:** Web Vitals not tracking

**Solutions:**
1. Check browser support (needs Performance Observer API)
2. Verify sample rate isn't set too low
3. Wait for page fully load
4. Check if consent was granted

### Clarity Not Recording

**Symptoms:** No sessions in Clarity dashboard

**Solutions:**
1. Verify Project ID is correct
2. Check if consent includes Clarity
3. Wait 15-30 minutes for data to appear
4. Check Clarity dashboard for setup errors

---

## Privacy Compliance

### GDPR Requirements

- Cookie consent obtained before tracking
- Clear explanation of cookies used
- Option to decline all non-essential cookies
- Easy way to withdraw consent
- Privacy policy linked from consent banner

### CCPA Requirements

- Notice at collection
- Right to opt-out
- Link to privacy policy
- Do Not Sell option (if applicable)

### Consent Mode v2

The implementation uses Google Consent Mode v2:

```javascript
// Default (before consent)
gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
});

// After user accepts
gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted'
});
```

### Data Retention

Configure in GA4 Admin:
- User data retention: 14 months (recommended)
- Reset on new activity: On

### IP Anonymization

IP anonymization is enabled by default:

```javascript
gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true
});
```

---

## Advanced Configuration

### Custom Dimensions in GA4

```javascript
// Set user properties
gtag('set', 'user_properties', {
    'user_type': 'returning_visitor',
    'preferred_pool_type': 'fiberglass'
});
```

### Enhanced Ecommerce (if needed)

```javascript
// Track lead value
gtag('event', 'generate_lead', {
    'currency': 'USD',
    'value': 50000 // Estimated pool value
});
```

### Cross-Domain Tracking

If tracking across multiple domains, configure in GTM:
1. Enable cross-domain tracking in GA4 tag
2. Add domains to referral exclusion list

---

## Support

For questions about analytics implementation:
- Review this guide
- Check browser console for errors
- Enable debug mode for verbose logging
- Contact development team

For Google Analytics issues:
- [GA4 Help Center](https://support.google.com/analytics)
- [GTM Help Center](https://support.google.com/tagmanager)

For Clarity issues:
- [Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)
