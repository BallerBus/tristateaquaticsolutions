# SEO Monitoring & Rank Tracking Setup

## Tri-State Aquatic Solutions
**Last Updated:** February 2026

---

## 1. Google Search Console Configuration

### Initial Setup

1. **Verify Domain Ownership**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: `tristateaquaticsolutions.com`
   - Choose DNS verification method (recommended for domain-wide verification)
   - Add TXT record to DNS: `google-site-verification=XXXXXXXXXX`

2. **Add All Property Variations**
   ```
   https://tristateaquaticsolutions.com
   https://www.tristateaquaticsolutions.com
   http://tristateaquaticsolutions.com (for redirect monitoring)
   http://www.tristateaquaticsolutions.com (for redirect monitoring)
   ```

3. **Submit Sitemaps**
   - Main sitemap: `https://tristateaquaticsolutions.com/sitemap.xml`
   - News/Blog sitemap: `https://tristateaquaticsolutions.com/blog-sitemap.xml`
   - Image sitemap: `https://tristateaquaticsolutions.com/image-sitemap.xml`

### GSC Configuration Settings

| Setting | Configuration |
|---------|--------------|
| Country targeting | United States |
| Preferred domain | https://www.tristateaquaticsolutions.com |
| Crawl rate | Let Google decide |
| URL parameters | Configure as needed |

### Key Reports to Monitor

1. **Performance Report**
   - Filter by page, query, country, device
   - Compare date ranges (last 28 days vs previous period)
   - Export weekly for trend analysis

2. **Coverage Report**
   - Valid pages
   - Excluded pages (and reasons)
   - Error pages
   - Valid with warnings

3. **Enhancements**
   - Mobile Usability
   - Breadcrumbs
   - Local Business schema
   - FAQ schema
   - Product schema (if applicable)

### Alert Configuration

Set up email alerts for:
- [ ] New crawl errors
- [ ] Significant traffic drops (>20%)
- [ ] Manual actions
- [ ] Security issues
- [ ] New linking domains

---

## 2. Bing Webmaster Tools Setup

### Initial Setup

1. **Create Account**
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - Sign in with Microsoft account
   - Import from Google Search Console (fastest method)

2. **Verification Options**
   - XML file upload
   - Meta tag
   - CNAME record
   - Auto-import from GSC (recommended)

3. **Submit Sitemaps**
   - Same sitemaps as GSC
   - Bing accepts standard XML sitemap format

### Bing-Specific Settings

| Setting | Configuration |
|---------|--------------|
| Geo-targeting | United States |
| Crawl control | Normal |
| Deep links | Enable |
| Block URLs | Configure as needed |

### Key Bing Reports

1. **Search Performance**
   - Clicks, impressions, CTR, position
   - Page and keyword level data

2. **SEO Reports**
   - SEO analyzer
   - Site scan for technical issues

3. **URL Inspection**
   - Check indexing status
   - Request re-crawl

---

## 3. Keyword Rank Tracking Setup

### Recommended Tools (By Priority)

#### Primary Tool: SEMrush
**Monthly Cost:** $129.95/month (Pro plan)

**Setup Steps:**
1. Create project for tristateaquaticsolutions.com
2. Add competitors (3-5 local competitors)
3. Import keyword list (see keyword-tracking.md)
4. Configure tracking settings:
   - Device: Desktop + Mobile (separate tracking)
   - Location: Cincinnati, OH + Columbus, OH + Lexington, KY
   - Search engine: Google + Bing
   - Tracking frequency: Daily

**Key Features to Use:**
- Position Tracking
- Organic Research
- Keyword Gap
- Site Audit (monthly)
- Backlink Analytics

#### Alternative Tool: Ahrefs
**Monthly Cost:** $99/month (Lite plan)

**Setup Steps:**
1. Add site to dashboard
2. Set up rank tracker project
3. Add keywords by location
4. Configure alerts

**Key Features:**
- Rank Tracker
- Site Explorer
- Content Explorer
- Site Audit

#### Budget Option: SE Ranking
**Monthly Cost:** $44/month

**Features:**
- Unlimited projects
- 500 keywords
- Daily rank updates
- On-page SEO checker

#### Free Option: Google Search Console + Sheets
**Setup:**
1. Export GSC data weekly
2. Import to tracking spreadsheet
3. Use formulas to calculate position changes

### Rank Tracking Configuration

| Parameter | Setting |
|-----------|---------|
| Tracking frequency | Daily for top 50 keywords, Weekly for all |
| Locations | Cincinnati, Columbus, Lexington, Louisville, Indianapolis |
| Devices | Desktop (primary), Mobile (secondary) |
| Search engines | Google (primary), Bing (secondary) |
| Competitors | 5 local competitors |

---

## 4. Backlink Monitoring Setup

### Primary Backlink Tool: Ahrefs or SEMrush

**Configuration:**
1. Add domain to monitor
2. Set up new/lost backlink alerts
3. Configure competitor backlink tracking
4. Schedule weekly backlink reports

### Backlink Metrics to Track

| Metric | Target | Current |
|--------|--------|---------|
| Domain Rating (DR) | 40+ | [Current] |
| Referring Domains | 200+ | [Current] |
| Dofollow links | 70%+ | [Current] |
| Referring domain growth | +10/month | [Current] |

### Alert Configuration

Set alerts for:
- [ ] New backlinks from DR 50+ sites
- [ ] Lost backlinks from important sites
- [ ] New competitor backlinks
- [ ] Toxic backlink detection

### Monthly Backlink Audit

1. **Check for toxic links**
   - Spammy directories
   - Irrelevant foreign sites
   - Link farms

2. **Disavow if necessary**
   - Create disavow file
   - Submit to Google Disavow Tool

3. **Identify link opportunities**
   - Competitor link analysis
   - Broken link opportunities
   - Unlinked brand mentions

---

## 5. Technical SEO Monitoring

### Automated Monitoring Tools

#### Screaming Frog SEO Spider
**Setup:**
- Schedule monthly crawls
- Configure crawl settings:
  - Crawl limit: All pages
  - User agent: Googlebot
  - Render JavaScript: Yes
  - Check external links: Yes

**Export Reports:**
- Page titles analysis
- Meta descriptions
- H1 tags
- Response codes
- Redirect chains
- Canonical tags

#### Google PageSpeed Insights API
**Setup automated monitoring:**
```javascript
// Example monitoring script
const PSI_API_KEY = 'your-api-key';
const PAGES_TO_MONITOR = [
  'https://tristateaquaticsolutions.com/',
  'https://tristateaquaticsolutions.com/services/',
  'https://tristateaquaticsolutions.com/pool-installation/',
  // Add all key pages
];
```

### Technical Metrics Dashboard

| Metric | Tool | Frequency | Target |
|--------|------|-----------|--------|
| Page speed (mobile) | PageSpeed Insights | Weekly | 90+ |
| Page speed (desktop) | PageSpeed Insights | Weekly | 95+ |
| Core Web Vitals | GSC/CrUX | Monthly | Pass all |
| Mobile usability | GSC | Weekly | 0 errors |
| Index coverage | GSC | Daily | <5% excluded |
| Crawl errors | GSC | Daily | 0 errors |
| Schema validity | Schema.org validator | Monthly | 0 errors |
| SSL certificate | Uptime monitor | Daily | Valid |
| Sitemap health | GSC | Weekly | All submitted |

### Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | <2.5s | Main content loads quickly |
| INP (Interaction to Next Paint) | <200ms | Page responds to interactions |
| CLS (Cumulative Layout Shift) | <0.1 | Visual stability |

### Technical SEO Checklist

#### Daily Automated Checks
- [ ] Site uptime monitoring
- [ ] SSL certificate validity
- [ ] Homepage accessibility

#### Weekly Manual Checks
- [ ] GSC coverage errors
- [ ] New crawl errors
- [ ] Mobile usability issues
- [ ] Core Web Vitals status

#### Monthly Technical Audit
- [ ] Full site crawl with Screaming Frog
- [ ] Broken link check
- [ ] Redirect chain analysis
- [ ] Duplicate content check
- [ ] Page speed testing (all key pages)
- [ ] Schema validation
- [ ] XML sitemap validation
- [ ] Robots.txt review

---

## 6. Monitoring Dashboard Setup

### Recommended: Google Looker Studio

**Data Sources to Connect:**
1. Google Search Console
2. Google Analytics 4
3. Google Sheets (for keyword rankings)
4. Ahrefs/SEMrush API (if available)

**Dashboard Sections:**

1. **Overview**
   - Total organic traffic (last 30 days)
   - Total impressions
   - Average position
   - Total indexed pages

2. **Keyword Performance**
   - Top 20 keywords by clicks
   - Keywords in top 3
   - Keywords 4-10
   - Keywords 11-20
   - Position changes

3. **Page Performance**
   - Top pages by traffic
   - Pages with declining traffic
   - New pages indexed

4. **Technical Health**
   - Crawl errors over time
   - Page speed scores
   - Core Web Vitals

5. **Backlinks**
   - New backlinks this month
   - Referring domain growth
   - Top linking pages

---

## 7. Reporting Schedule

### Weekly Report (Every Monday)
- Keyword position changes
- Traffic vs previous week
- New crawl errors
- New backlinks

### Monthly Report (First of Month)
- Full keyword ranking report
- Traffic trends
- Conversion analysis
- Technical audit summary
- Backlink profile changes
- Competitor comparison

### Quarterly Report
- Overall SEO performance vs goals
- Strategy adjustments needed
- Content performance analysis
- Link building progress
- Technical improvements made

---

## 8. Tool Access & Credentials

### Account Management

| Tool | Login Email | Account Type | Renewal Date |
|------|-------------|--------------|--------------|
| Google Search Console | [business email] | Free | N/A |
| Bing Webmaster Tools | [business email] | Free | N/A |
| SEMrush | [business email] | Pro | [date] |
| Ahrefs | [business email] | Lite | [date] |
| Screaming Frog | [business email] | Paid | [date] |
| Google Looker Studio | [business email] | Free | N/A |

### Team Access Levels

| Team Member | GSC | BWM | SEMrush | Ahrefs |
|-------------|-----|-----|---------|--------|
| Owner | Full | Full | Full | Full |
| Marketing | Full | Full | Read | Read |
| Developer | Read | Read | None | None |

---

## 9. Integration Checklist

- [ ] GSC connected to GA4
- [ ] GSC connected to Looker Studio
- [ ] Bing Webmaster Tools verified
- [ ] Rank tracking tool configured
- [ ] Backlink monitoring active
- [ ] Technical monitoring automated
- [ ] Alert emails configured
- [ ] Dashboard created
- [ ] Team access granted
- [ ] Reporting schedule set
