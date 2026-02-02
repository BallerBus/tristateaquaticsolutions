# Looker Studio Dashboard Setup Guide

## Tri-State Aquatic Solutions - Analytics Dashboard

### Overview

This document outlines the complete setup for Looker Studio (formerly Google Data Studio) dashboards to monitor and analyze Tri-State Aquatic Solutions' digital marketing performance.

---

## Dashboard Architecture

### Dashboard Hierarchy

```
Main Dashboard (Executive Overview)
├── Traffic & Acquisition Dashboard
├── Behavior & Engagement Dashboard
├── Conversion & Lead Dashboard
├── Revenue Attribution Dashboard
└── SEO Performance Dashboard
```

---

## Data Source Connections

### Required Data Sources

| Source | Purpose | Connection Type |
|--------|---------|-----------------|
| Google Analytics 4 | Website analytics | Native connector |
| Google Search Console | SEO performance | Native connector |
| Google Ads | Paid advertising | Native connector |
| Google Sheets | Custom data | Native connector |
| CallRail (if used) | Phone tracking | Custom API/Sheets |
| CRM Data | Lead tracking | Google Sheets import |

### Setting Up Connections

#### GA4 Connection
1. Navigate to Looker Studio → Create → Data Source
2. Select "Google Analytics"
3. Choose GA4 property: "Tri-State Aquatic Solutions"
4. Select all available fields
5. Click "Connect"

#### Search Console Connection
1. Create new data source
2. Select "Search Console"
3. Choose "Site Impression" for comprehensive data
4. Select property: tristateaquaticsolutions.com

---

## Executive Overview Dashboard

### Page 1: High-Level KPIs

#### Scorecard Row (Top)
```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   Sessions  │    Users    │  Pageviews  │ Bounce Rate │ Avg Session │
│    [#]      │     [#]     │     [#]     │    [%]      │  Duration   │
│   vs LY %   │   vs LY %   │   vs LY %   │   vs LY %   │   vs LY %   │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

**Configuration for Sessions Scorecard:**
- Metric: Sessions
- Comparison: Previous period
- Sparkline: Enabled (30 days)
- Conditional formatting:
  - Green: > 10% increase
  - Red: > 10% decrease

#### Conversion Scorecard Row
```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ Total Leads │ Form Fills  │ Phone Calls │ Conv. Rate  │ Est Revenue │
│    [#]      │     [#]     │     [#]     │    [%]      │    [$]      │
│   vs LY %   │   vs LY %   │   vs LY %   │   vs LY %   │   vs LY %   │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

### Page 1: Visualizations

#### Traffic Trend Chart
- Chart Type: Time series
- Metrics: Sessions, Users
- Dimension: Date
- Date Range: Last 12 months
- Comparison: Previous year (dotted line)

#### Traffic by Channel (Pie Chart)
- Dimension: Session default channel grouping
- Metric: Sessions
- Sort: Descending by sessions

#### Top Pages Table
| Page Title | Pageviews | Avg Time | Bounce Rate | Conversions |
|------------|-----------|----------|-------------|-------------|
| Homepage   | [#]       | [time]   | [%]         | [#]         |
| Services   | [#]       | [time]   | [%]         | [#]         |
| Contact    | [#]       | [time]   | [%]         | [#]         |

---

## Traffic Metrics Dashboard

### Key Traffic Metrics

#### Sessions Analysis
```yaml
Primary Metric: Sessions
Dimensions:
  - Date (daily, weekly, monthly views)
  - Device category
  - Geographic location
  - Landing page

Visualizations:
  - Time series trend
  - Device breakdown pie
  - Geographic heat map
  - Landing page performance table
```

#### Users Analysis
```yaml
Primary Metric: Total users
Secondary Metrics:
  - New users
  - Returning users
  - User engagement rate

Visualizations:
  - New vs returning users (stacked area)
  - User cohort analysis
  - Active user trends (DAU, WAU, MAU)
```

#### Pageviews Analysis
```yaml
Primary Metric: Pageviews
Secondary Metrics:
  - Unique pageviews
  - Pages per session
  - Average time on page

Visualizations:
  - Content drill-down table
  - Page path exploration
  - Exit pages analysis
```

### Traffic Dashboard Filters

| Filter | Type | Default |
|--------|------|---------|
| Date Range | Date picker | Last 30 days |
| Device | Dropdown | All devices |
| Source/Medium | Dropdown | All sources |
| Landing Page | Dropdown | All pages |
| Geographic | Dropdown | All locations |

---

## Acquisition Metrics Dashboard

### Source/Medium Analysis

#### Channel Performance Table
| Channel | Sessions | Users | New Users | Bounce Rate | Conv Rate | Conversions |
|---------|----------|-------|-----------|-------------|-----------|-------------|
| Organic Search | [#] | [#] | [#] | [%] | [%] | [#] |
| Direct | [#] | [#] | [#] | [%] | [%] | [#] |
| Referral | [#] | [#] | [#] | [%] | [%] | [#] |
| Paid Search | [#] | [#] | [#] | [%] | [%] | [#] |
| Social | [#] | [#] | [#] | [%] | [%] | [#] |

#### Source/Medium Detailed Table
```yaml
Dimensions:
  - Session source
  - Session medium
  - Session campaign

Metrics:
  - Sessions
  - Engaged sessions
  - Engagement rate
  - Conversions
  - Revenue (if tracked)

Sorting: Sessions descending
Row limit: 25
```

### Campaign Performance

#### Campaign Tracking Table
| Campaign | Source | Medium | Sessions | Cost | Conversions | CPA | ROAS |
|----------|--------|--------|----------|------|-------------|-----|------|
| [name] | [source] | [medium] | [#] | [$] | [#] | [$] | [%] |

**UTM Parameter Breakdown:**
- utm_source: Traffic source (google, facebook, email)
- utm_medium: Marketing medium (cpc, organic, email)
- utm_campaign: Campaign name (spring_promo_2024)
- utm_content: Ad variation identifier
- utm_term: Paid keyword

### Referral Analysis

#### Top Referring Sites
```yaml
Dimension: Session source (filtered to medium = referral)
Metrics:
  - Sessions
  - New users
  - Engagement rate
  - Conversions

Visualization: Horizontal bar chart
Sorting: Sessions descending
```

---

## Behavior Metrics Dashboard

### Engagement Metrics

#### Bounce Rate Analysis
```yaml
Definition: Sessions with only 1 pageview / Total sessions
Target: < 50% for service pages

Visualizations:
  - Bounce rate by page (bar chart)
  - Bounce rate trend (time series)
  - Bounce rate by device (comparison)
  - Bounce rate by source (table)

Filters:
  - Page type (service, blog, landing)
  - Device category
  - Traffic source
```

#### Time on Site Analysis
```yaml
Metrics:
  - Average session duration
  - Average engagement time per session
  - Engaged sessions per user

Benchmarks:
  - Homepage: 45-90 seconds
  - Service pages: 2-4 minutes
  - Blog posts: 3-5 minutes
  - Contact page: 1-2 minutes
```

#### Pages Per Session
```yaml
Primary Metric: Pages / Session
Target: 2.5+ pages per session

Analysis Dimensions:
  - By traffic source
  - By device type
  - By landing page
  - By user type (new vs returning)
```

### User Flow Visualization

#### Navigation Path Analysis
```
Homepage → Service Pages → Contact/Quote
    ↓           ↓              ↓
  [60%]       [25%]          [15%]
    ↓           ↓              ↓
Exit: 40%   Exit: 35%     Form Submit: 8%
```

#### Content Grouping
| Content Group | Pageviews | Avg Time | Exit Rate | Conversion Contribution |
|---------------|-----------|----------|-----------|------------------------|
| Homepage | [#] | [time] | [%] | [%] |
| Pool Services | [#] | [time] | [%] | [%] |
| Spa Services | [#] | [time] | [%] | [%] |
| Commercial | [#] | [time] | [%] | [%] |
| Blog/Resources | [#] | [time] | [%] | [%] |
| Contact/Quote | [#] | [time] | [%] | [%] |

---

## Conversion Metrics Dashboard

### Lead Tracking

#### Total Leads Scorecard
```yaml
Conversion Events:
  - form_submit (contact form completions)
  - phone_call (click-to-call events)
  - email_click (mailto: clicks)
  - quote_request (quote form completions)

Primary Display:
  - Total conversions
  - Conversion rate
  - Cost per conversion (if ads running)
```

#### Lead Trend Chart
- Chart Type: Combo chart (bars + line)
- Bars: Total leads by week
- Line: Conversion rate trend
- Date range: Last 90 days

### Form Fill Analysis

#### Form Performance Table
| Form Name | Submissions | Submission Rate | Avg Time to Complete |
|-----------|-------------|-----------------|---------------------|
| Contact Form | [#] | [%] | [time] |
| Quote Request | [#] | [%] | [time] |
| Newsletter Signup | [#] | [%] | [time] |

#### Form Abandonment Analysis
```yaml
Funnel Steps:
  1. Form page view: 100%
  2. Form interaction start: [%]
  3. Form field completion: [%]
  4. Form submission: [%]

Drop-off Analysis:
  - Field causing most abandonment
  - Device-specific abandonment rates
  - Time-of-day patterns
```

### Phone Call Tracking

#### Call Metrics (If CallRail Connected)
| Metric | Value | vs Previous Period |
|--------|-------|-------------------|
| Total Calls | [#] | [%] |
| Unique Callers | [#] | [%] |
| Answered Calls | [#] | [%] |
| Missed Calls | [#] | [%] |
| Avg Call Duration | [time] | [%] |

#### Call Source Attribution
| Source | Calls | % of Total | Answered Rate |
|--------|-------|-----------|---------------|
| Organic Search | [#] | [%] | [%] |
| Direct | [#] | [%] | [%] |
| Paid Search | [#] | [%] | [%] |
| Referral | [#] | [%] | [%] |

### Conversion Funnel Analysis

#### Website Conversion Funnel
```
Stage 1: All Sessions           [######################] 100%
Stage 2: Viewed Service Page    [###############       ] 65%
Stage 3: Viewed Contact/Quote   [########              ] 30%
Stage 4: Started Form           [#####                 ] 18%
Stage 5: Submitted Form         [###                   ] 12%
Stage 6: Confirmed Lead         [##                    ] 8%
```

---

## Revenue Attribution Dashboard

### Revenue Tracking Setup

#### Data Model
```yaml
Lead Data (Google Sheets):
  - Lead ID
  - Lead date
  - Lead source
  - Lead medium
  - Lead campaign
  - Service type requested
  - Estimated project value
  - Lead status (new, contacted, quoted, won, lost)
  - Actual revenue (when closed)
  - Close date

Import Method:
  - Manual entry into Google Sheets
  - Automated import from CRM (if available)
  - Weekly data sync recommended
```

### Revenue Attribution Table

| Source/Medium | Leads | Quotes Sent | Deals Won | Revenue | Avg Deal Size | Close Rate |
|---------------|-------|-------------|-----------|---------|---------------|------------|
| google/organic | [#] | [#] | [#] | [$] | [$] | [%] |
| google/cpc | [#] | [#] | [#] | [$] | [$] | [%] |
| (direct) | [#] | [#] | [#] | [$] | [$] | [%] |
| facebook/social | [#] | [#] | [#] | [$] | [$] | [%] |
| yelp/referral | [#] | [#] | [#] | [$] | [$] | [%] |

### Revenue Metrics Scorecards

```
┌────────────────┬────────────────┬────────────────┬────────────────┐
│ Total Revenue  │ Avg Deal Size  │  Close Rate    │   Pipeline     │
│    [$$$]       │     [$]        │     [%]        │    Value       │
│   vs LY %      │   vs LY %      │   vs LY %      │    [$$$]       │
└────────────────┴────────────────┴────────────────┴────────────────┘
```

### Attribution Models

#### First-Touch Attribution
- Credit to: First interaction channel
- Use case: Understanding awareness channels

#### Last-Touch Attribution
- Credit to: Final interaction before conversion
- Use case: Understanding closing channels

#### Linear Attribution
- Credit to: Equal distribution across all touchpoints
- Use case: Holistic channel value

#### Position-Based (40/20/40)
- Credit to: 40% first, 20% middle, 40% last
- Use case: Balanced attribution

---

## SEO Performance Dashboard

### Search Console Integration

#### Organic Search Performance
| Metric | This Period | Previous Period | Change |
|--------|-------------|-----------------|--------|
| Total Impressions | [#] | [#] | [%] |
| Total Clicks | [#] | [#] | [%] |
| Average CTR | [%] | [%] | [+/-] |
| Average Position | [#] | [#] | [+/-] |

#### Top Queries Table
| Query | Impressions | Clicks | CTR | Position | Landing Page |
|-------|-------------|--------|-----|----------|--------------|
| pool service near me | [#] | [#] | [%] | [#] | /services |
| pool cleaning [city] | [#] | [#] | [%] | [#] | /services/cleaning |

#### Top Pages Table
| Page | Impressions | Clicks | CTR | Position |
|------|-------------|--------|-----|----------|
| / | [#] | [#] | [%] | [#] |
| /services | [#] | [#] | [%] | [#] |
| /about | [#] | [#] | [%] | [#] |

### Keyword Tracking

#### Brand Keywords
| Keyword | Position | Change | Clicks | Impressions |
|---------|----------|--------|--------|-------------|
| tri-state aquatic solutions | [#] | [+/-] | [#] | [#] |
| tri-state pool service | [#] | [+/-] | [#] | [#] |

#### Service Keywords
| Keyword | Position | Change | Clicks | Impressions |
|---------|----------|--------|--------|-------------|
| pool service [city] | [#] | [+/-] | [#] | [#] |
| pool cleaning near me | [#] | [+/-] | [#] | [#] |
| hot tub repair [city] | [#] | [+/-] | [#] | [#] |

---

## Dashboard Best Practices

### Design Guidelines

1. **Color Scheme**
   - Primary: #0066CC (blue - water theme)
   - Secondary: #00AA88 (teal)
   - Success: #28A745 (green)
   - Warning: #FFC107 (yellow)
   - Danger: #DC3545 (red)
   - Background: #F8F9FA (light gray)

2. **Layout Principles**
   - Most important metrics at top
   - Left-to-right flow (awareness → conversion → revenue)
   - Consistent spacing and alignment
   - Mobile-responsive design

3. **Interactivity**
   - Date range selector on every page
   - Cross-filtering between charts
   - Drill-down capabilities
   - Tooltips with additional context

### Refresh Schedule

| Dashboard | Refresh Frequency | Data Freshness |
|-----------|------------------|----------------|
| Executive Overview | Daily | 24 hours |
| Traffic & Acquisition | Daily | 24 hours |
| Conversion Dashboard | Daily | 24 hours |
| Revenue Attribution | Weekly | Manual update |
| SEO Performance | Daily | 48 hours |

### Access & Sharing

#### User Roles
| Role | Access Level | Dashboards |
|------|--------------|------------|
| Owner | Edit + Share | All |
| Manager | View + Filter | All |
| Team Member | View only | Assigned |
| Client | View only | Executive Summary |

#### Sharing Settings
```yaml
Scheduled Email Reports:
  - Executive Summary: Weekly (Monday 8 AM)
  - Full Dashboard: Monthly (1st of month)

Link Sharing:
  - Dashboard URL with date range parameters
  - Embedded view for internal portals
  - PDF export for offline review
```

---

## Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Connect GA4 data source
- [ ] Connect Search Console data source
- [ ] Set up Google Sheets for lead tracking
- [ ] Create data blending for attribution

### Phase 2: Build Dashboards (Week 2-3)
- [ ] Create Executive Overview dashboard
- [ ] Create Traffic & Acquisition dashboard
- [ ] Create Behavior dashboard
- [ ] Create Conversion dashboard
- [ ] Create SEO dashboard

### Phase 3: Revenue Attribution (Week 4)
- [ ] Set up lead tracking spreadsheet
- [ ] Create revenue attribution dashboard
- [ ] Build data pipeline from CRM

### Phase 4: Refinement (Ongoing)
- [ ] Set up scheduled email reports
- [ ] Create calculated fields for custom metrics
- [ ] Build alert thresholds
- [ ] Document dashboard maintenance procedures

---

## Custom Calculated Fields

### Engagement Score
```
CASE
  WHEN Engagement rate > 0.7 THEN "High"
  WHEN Engagement rate > 0.4 THEN "Medium"
  ELSE "Low"
END
```

### Lead Quality Score
```
(Form submissions * 10) + (Phone calls * 15) + (Quote requests * 20)
```

### Revenue Per Session
```
Total Revenue / Sessions
```

### Cost Per Lead (CPL)
```
Total Ad Spend / Total Conversions
```

### Return on Ad Spend (ROAS)
```
Revenue from Ads / Total Ad Spend
```

---

## Troubleshooting

### Common Issues

1. **Data Not Showing**
   - Check data source connection
   - Verify date range includes data
   - Check filter settings

2. **Metrics Don't Match GA4**
   - Sampling may affect large datasets
   - Check for applied filters
   - Verify metric definitions match

3. **Slow Dashboard Load**
   - Reduce date range
   - Limit number of visualizations per page
   - Use data extracts for historical data

4. **Permission Errors**
   - Verify Google account access
   - Check data source sharing settings
   - Confirm user role permissions
