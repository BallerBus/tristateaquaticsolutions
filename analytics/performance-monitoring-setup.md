# Performance Monitoring Setup Guide

## Tri-State Aquatic Solutions Website

This guide covers the complete setup for monitoring Core Web Vitals and website performance.

---

## Table of Contents

1. [Google Search Console Setup](#google-search-console-setup)
2. [PageSpeed Insights Monitoring](#pagespeed-insights-monitoring)
3. [Lighthouse CI Setup](#lighthouse-ci-setup)
4. [Real User Monitoring (RUM)](#real-user-monitoring-rum)
5. [Synthetic Monitoring](#synthetic-monitoring)
6. [Alert Thresholds](#alert-thresholds)
7. [Performance Budget](#performance-budget)

---

## Google Search Console Setup

Google Search Console provides real field data from actual Chrome users.

### Step 1: Verify Site Ownership

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Enter your domain: `tristateaquaticsolutions.com`
4. Choose verification method:
   - **Recommended**: DNS verification
   - Add TXT record to DNS: `google-site-verification=YOUR_CODE`

### Step 2: Access Core Web Vitals Report

1. Navigate to **Experience > Core Web Vitals**
2. View separate reports for:
   - Mobile users
   - Desktop users

### Step 3: Configure Notifications

1. Go to **Settings > Email Preferences**
2. Enable:
   - [x] Core Web Vitals issues
   - [x] Security issues
   - [x] Coverage issues

### Step 4: Link to Google Analytics

1. In Search Console, go to **Settings**
2. Click **Associations**
3. Associate with your Google Analytics 4 property

### Understanding the Report

The Core Web Vitals report shows:
- **Good URLs**: Meet all Core Web Vitals thresholds
- **Needs Improvement**: One or more metrics need attention
- **Poor URLs**: One or more metrics fail thresholds

Data is grouped by URL patterns to help identify issues at scale.

---

## PageSpeed Insights Monitoring

### Manual Testing

1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter URL: `https://tristateaquaticsolutions.com`
3. Review both Mobile and Desktop results

### Understanding Results

PageSpeed Insights provides two types of data:

#### Field Data (Real Users)
- Based on Chrome User Experience Report (CrUX)
- Shows actual user experience
- 28-day rolling average
- Most important for SEO

#### Lab Data (Simulated)
- Based on Lighthouse test
- Consistent testing conditions
- Good for debugging
- Shows optimization opportunities

### Key URLs to Test

Test all critical pages regularly:

| Page | URL | Priority |
|------|-----|----------|
| Homepage | `/` | High |
| Services | `/services` | High |
| Contact | `/contact` | High |
| Gallery | `/gallery` | Medium |
| About | `/about` | Medium |

### API Access for Automation

```bash
# Get PageSpeed Insights data via API
API_KEY="your-api-key"
URL="https://tristateaquaticsolutions.com"

curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${URL}&key=${API_KEY}&strategy=mobile&category=performance"
```

### Weekly Monitoring Script

```bash
#!/bin/bash
# weekly-psi-check.sh

API_KEY="your-api-key"
URLS=(
  "https://tristateaquaticsolutions.com"
  "https://tristateaquaticsolutions.com/services"
  "https://tristateaquaticsolutions.com/contact"
)

for url in "${URLS[@]}"; do
  echo "Testing: $url"
  curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}&strategy=mobile" \
    | jq '{url: .id, score: .lighthouseResult.categories.performance.score, lcp: .lighthouseResult.audits["largest-contentful-paint"].numericValue, cls: .lighthouseResult.audits["cumulative-layout-shift"].numericValue}'
done
```

---

## Lighthouse CI Setup

Lighthouse CI enables automated performance testing in your CI/CD pipeline.

### Step 1: Install Lighthouse CI

```bash
npm install -D @lhci/cli
```

### Step 2: Create Configuration

Create `lighthouserc.js` in project root:

```javascript
module.exports = {
  ci: {
    collect: {
      // URLs to test
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/contact'
      ],
      // Start server before testing
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 30000,
      // Number of runs per URL
      numberOfRuns: 3,
      // Lighthouse settings
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1
        }
      }
    },
    assert: {
      // Performance assertions
      assertions: {
        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],

        // Additional metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'interactive': ['warn', { maxNumericValue: 3800 }],

        // Category scores (0-1)
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }]
      }
    },
    upload: {
      // Options for storing results
      target: 'temporary-public-storage'
      // Or use LHCI server:
      // target: 'lhci',
      // serverBaseUrl: 'https://your-lhci-server.com',
      // token: process.env.LHCI_TOKEN
    }
  }
};
```

### Step 3: Add to GitHub Actions

Create `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse Results
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-results
          path: .lighthouseci/
```

### Step 4: Set Up LHCI Server (Optional)

For persistent storage and trend analysis:

```bash
# Using Docker
docker run -d \
  --name lhci-server \
  -p 9001:9001 \
  -v lhci-data:/data \
  patrickhulce/lhci-server

# Create project and get token
docker exec -it lhci-server lhci wizard
```

Update `lighthouserc.js`:

```javascript
upload: {
  target: 'lhci',
  serverBaseUrl: 'https://your-lhci-server.com',
  token: process.env.LHCI_TOKEN
}
```

---

## Real User Monitoring (RUM)

RUM collects performance data from actual visitors.

### Option 1: Google Analytics 4 (Recommended)

Our `performance-monitoring.js` sends Web Vitals to GA4. Ensure GA4 is configured:

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Add tracking code to website:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Performance Monitoring -->
<script src="/analytics/performance-monitoring.js"></script>
```

3. Create custom reports for Web Vitals:
   - Go to **Explore > Blank**
   - Add dimensions: `Event name`, `metric_rating`
   - Add metrics: `Event count`, `Average value`
   - Filter by `Event category = Web Vitals`

### Option 2: Custom RUM Dashboard

Create a simple RUM dashboard using GA4 BigQuery export:

```sql
-- Query for Core Web Vitals by day
SELECT
  FORMAT_DATE('%Y-%m-%d', PARSE_DATE('%Y%m%d', event_date)) AS date,
  event_name AS metric,
  APPROX_PERCENTILES(
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'value'),
    [0.75, 0.95]
  ) AS percentiles
FROM `your-project.analytics_XXXXXX.events_*`
WHERE event_name IN ('LCP', 'FID', 'CLS', 'INP', 'TTFB')
  AND _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY))
GROUP BY date, metric
ORDER BY date DESC, metric
```

### Option 3: Third-Party RUM Services

| Service | Best For | Pricing |
|---------|----------|---------|
| [SpeedCurve](https://speedcurve.com) | Comprehensive dashboards | $20-500/mo |
| [Calibre](https://calibreapp.com) | Developer-focused | $29-499/mo |
| [Sentry](https://sentry.io) | Error + performance | Free-$80+/mo |
| [New Relic](https://newrelic.com) | Full-stack monitoring | Free tier available |

---

## Synthetic Monitoring

Synthetic monitoring tests from consistent locations on a schedule.

### Option 1: Uptime Robot (Free)

1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add monitors:
   - Type: HTTP(s)
   - URL: `https://tristateaquaticsolutions.com`
   - Interval: 5 minutes
3. Set up alerts for downtime

### Option 2: Pingdom

1. Sign up at [pingdom.com](https://www.pingdom.com)
2. Create uptime check
3. Create page speed check (synthetic)
4. Configure alerts

### Option 3: WebPageTest API

Automate WebPageTest runs:

```bash
#!/bin/bash
# Run WebPageTest via API

API_KEY="your-webpagetest-api-key"
URL="https://tristateaquaticsolutions.com"

# Submit test
RESPONSE=$(curl -s "https://www.webpagetest.org/runtest.php?url=${URL}&f=json&k=${API_KEY}&location=Dulles:Chrome&runs=3")
TEST_ID=$(echo $RESPONSE | jq -r '.data.testId')

echo "Test submitted: $TEST_ID"
echo "Results will be at: https://www.webpagetest.org/result/$TEST_ID/"
```

### Recommended Monitoring Schedule

| Test Type | Frequency | Tool |
|-----------|-----------|------|
| Uptime | Every 5 minutes | Uptime Robot |
| Performance (synthetic) | Daily | Lighthouse CI |
| Performance (detailed) | Weekly | WebPageTest |
| Full audit | Monthly | Manual PSI + DevTools |

---

## Alert Thresholds

### Performance Alerts

Set up alerts when metrics exceed these thresholds:

| Metric | Warning | Critical |
|--------|---------|----------|
| LCP | > 2.5s | > 4.0s |
| FID | > 100ms | > 300ms |
| CLS | > 0.1 | > 0.25 |
| INP | > 200ms | > 500ms |
| TTFB | > 800ms | > 1800ms |
| Performance Score | < 80 | < 50 |

### Availability Alerts

| Condition | Alert Level |
|-----------|-------------|
| Site down > 1 minute | Warning |
| Site down > 5 minutes | Critical |
| Response time > 2s | Warning |
| Response time > 5s | Critical |
| SSL certificate expires < 30 days | Warning |
| SSL certificate expires < 7 days | Critical |

### Setting Up Alerts in GA4

1. Go to **Admin > Custom Definitions > Custom Metrics**
2. Create metrics for each Web Vital
3. Go to **Explore** and create alerts based on thresholds

### Email/Slack Notifications

Example notification setup with a cron job:

```javascript
// check-performance.js
const https = require('https');

const API_KEY = process.env.PSI_API_KEY;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const URL = 'https://tristateaquaticsolutions.com';

async function checkPerformance() {
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${URL}&key=${API_KEY}&strategy=mobile`
  );
  const data = await response.json();

  const score = data.lighthouseResult.categories.performance.score * 100;
  const lcp = data.lighthouseResult.audits['largest-contentful-paint'].numericValue;

  if (score < 80 || lcp > 2500) {
    await sendSlackAlert({
      text: `Performance Alert for ${URL}`,
      attachments: [{
        color: score < 50 ? 'danger' : 'warning',
        fields: [
          { title: 'Performance Score', value: `${score}`, short: true },
          { title: 'LCP', value: `${(lcp/1000).toFixed(2)}s`, short: true }
        ]
      }]
    });
  }
}

async function sendSlackAlert(payload) {
  await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

checkPerformance();
```

---

## Performance Budget

A performance budget sets limits on metrics that impact user experience.

### Budget Definition

| Metric | Budget | Notes |
|--------|--------|-------|
| **Total Page Weight** | < 1.5 MB | Including all resources |
| **JavaScript** | < 300 KB | Compressed/transferred |
| **CSS** | < 100 KB | Compressed/transferred |
| **Images** | < 1 MB | Per page |
| **Fonts** | < 100 KB | All fonts combined |
| **Third-party** | < 200 KB | External scripts |
| **HTTP Requests** | < 50 | Per page |
| **LCP** | < 2.5s | Lab measurement |
| **CLS** | < 0.1 | Lab measurement |
| **TBT** | < 200ms | Total Blocking Time |

### Implementing Budget in Build

Add to `lighthouserc.js`:

```javascript
assertions: {
  // Resource budgets
  'resource-summary:script:size': ['error', { maxNumericValue: 300000 }],
  'resource-summary:stylesheet:size': ['error', { maxNumericValue: 100000 }],
  'resource-summary:image:size': ['error', { maxNumericValue: 1000000 }],
  'resource-summary:font:size': ['error', { maxNumericValue: 100000 }],
  'resource-summary:third-party:size': ['warn', { maxNumericValue: 200000 }],

  // Request counts
  'resource-summary:total:count': ['warn', { maxNumericValue: 50 }],

  // Timing budgets
  'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
  'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
  'total-blocking-time': ['error', { maxNumericValue: 200 }]
}
```

### Budget Tracking Dashboard

Create a spreadsheet to track budget over time:

| Date | Page Weight | JS Size | CSS Size | Images | LCP | CLS | Status |
|------|-------------|---------|----------|--------|-----|-----|--------|
| 2024-01-01 | 1.2 MB | 250 KB | 80 KB | 800 KB | 2.1s | 0.05 | Pass |
| 2024-01-08 | 1.4 MB | 280 KB | 85 KB | 950 KB | 2.3s | 0.08 | Pass |
| 2024-01-15 | 1.6 MB | 320 KB | 90 KB | 1.1 MB | 2.8s | 0.12 | Fail |

### Budget Violation Response Plan

When budget is exceeded:

1. **Identify the cause**: Check recent changes
2. **Assess impact**: Is it affecting Core Web Vitals?
3. **Prioritize fix**: Based on impact severity
4. **Implement fix**: Within 1 sprint/week
5. **Verify fix**: Re-run tests to confirm

---

## Quick Setup Checklist

### Week 1: Foundation

- [ ] Set up Google Search Console
- [ ] Verify domain ownership
- [ ] Link Search Console to GA4
- [ ] Add performance-monitoring.js to website
- [ ] Test with PageSpeed Insights

### Week 2: Automated Testing

- [ ] Install Lighthouse CI
- [ ] Create lighthouserc.js configuration
- [ ] Add GitHub Actions workflow
- [ ] Run first automated test

### Week 3: Monitoring & Alerts

- [ ] Set up Uptime Robot
- [ ] Configure performance alerts
- [ ] Create GA4 custom reports
- [ ] Document alert response procedures

### Week 4: Optimization Baseline

- [ ] Run full WebPageTest analysis
- [ ] Document current performance metrics
- [ ] Define performance budget
- [ ] Create optimization roadmap

---

## Resources

- [web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Web Vitals Library](https://github.com/GoogleChrome/web-vitals)
- [CrUX Dashboard](https://developer.chrome.com/docs/crux/dashboard/)
