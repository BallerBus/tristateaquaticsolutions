# Attribution Model - Tri-State Aquatic Solutions

## Overview

This document outlines the multi-touch attribution framework for Tri-State Aquatic Solutions, enabling accurate measurement of marketing channel effectiveness and campaign ROI.

---

## Attribution Model Types

### Models Implemented

| Model | Use Case | Primary Application |
|-------|----------|---------------------|
| First-Touch | Brand awareness measurement | Top-of-funnel evaluation |
| Last-Touch | Conversion optimization | Bottom-of-funnel evaluation |
| Linear | Equal channel credit | Balanced view |
| Time Decay | Recent touchpoint emphasis | Sales cycle analysis |
| Position-Based | First/last emphasis | Full-funnel view |
| Data-Driven (GA4) | ML-based allocation | Primary reporting model |

---

## Multi-Touch Attribution Setup

### Touchpoint Definition

A touchpoint is any measurable interaction between a prospect and Tri-State Aquatic Solutions.

#### Digital Touchpoints

| Touchpoint | Channel Category | Tracking Method |
|------------|------------------|-----------------|
| Organic search click | Organic Search | GA4 + UTM |
| Paid search click | Paid Search | GA4 + GCLID |
| Facebook ad click | Paid Social | UTM + Facebook Pixel |
| Instagram ad click | Paid Social | UTM + Meta Pixel |
| Direct website visit | Direct | GA4 |
| Email click | Email | UTM |
| Referral site click | Referral | GA4 |
| Google Business Profile | Local | GA4 + GBP tracking |
| YouTube video view | Video | UTM + YouTube Analytics |
| Display ad click | Display | UTM + DCM |

#### Offline Touchpoints

| Touchpoint | Channel Category | Tracking Method |
|------------|------------------|-----------------|
| Phone call | Phone | Call tracking software |
| In-person consultation | Direct Sales | CRM manual entry |
| Trade show contact | Events | Lead form with source |
| Referral (word of mouth) | Referral | CRM tagging |
| Print ad response | Traditional | Unique phone/URL |
| Vehicle wrap inquiry | Traditional | "How did you hear" |

### Attribution Window

| Conversion Type | Lookback Window | Rationale |
|-----------------|-----------------|-----------|
| Quote request | 90 days | Long consideration cycle |
| Consultation booked | 90 days | High-value decision |
| Project signed | 180 days | Extended sales cycle |
| Service appointment | 30 days | Shorter decision |

---

## First-Touch vs Last-Touch Analysis

### First-Touch Attribution

**Definition:** 100% credit to the first interaction that introduced the lead.

**When to Use:**
- Evaluating brand awareness campaigns
- Measuring top-of-funnel effectiveness
- Budget allocation for discovery channels

**Implementation:**
```javascript
// Capture first touch on initial visit
if (!getCookie('first_touch_source')) {
  setCookie('first_touch_source', getTrafficSource(), 365);
  setCookie('first_touch_medium', getMedium(), 365);
  setCookie('first_touch_campaign', getCampaign(), 365);
  setCookie('first_touch_date', new Date().toISOString(), 365);
}
```

**First-Touch Report Structure:**

| Metric | Description |
|--------|-------------|
| First Touch Source | Original traffic source |
| First Touch Medium | Channel type |
| First Touch Campaign | Campaign name |
| Days to Conversion | Time from first touch to conversion |
| Conversion Value | Revenue attributed |

### Last-Touch Attribution

**Definition:** 100% credit to the final interaction before conversion.

**When to Use:**
- Evaluating conversion-focused campaigns
- Optimizing bottom-of-funnel channels
- Short-term campaign performance

**Implementation:**
```javascript
// Update last touch on every visit
setCookie('last_touch_source', getTrafficSource(), 30);
setCookie('last_touch_medium', getMedium(), 30);
setCookie('last_touch_campaign', getCampaign(), 30);
setCookie('last_touch_date', new Date().toISOString(), 30);
```

### Comparative Analysis Framework

| Channel | First-Touch % | Last-Touch % | Variance | Insight |
|---------|---------------|--------------|----------|---------|
| Organic Search | 40% | 25% | -15% | Discovery channel |
| Paid Search | 20% | 35% | +15% | Closing channel |
| Social Media | 25% | 10% | -15% | Awareness driver |
| Direct | 10% | 25% | +15% | Brand recall |
| Email | 5% | 5% | 0% | Consistent influence |

---

## Data-Driven Attribution in GA4

### Overview

GA4's data-driven attribution uses machine learning to analyze conversion paths and assign credit based on actual impact.

### Setup Requirements

1. **Minimum Data Thresholds:**
   - 300+ conversions per month (recommended)
   - 3,000+ ad interactions per month
   - 90+ days of historical data

2. **Conversion Events to Configure:**
   ```
   - quote_request_submitted
   - contact_form_submitted
   - phone_call_initiated
   - consultation_booked
   - calculator_completed
   - chat_started
   ```

3. **GA4 Configuration:**

Navigate to: Admin > Attribution Settings

```
Reporting attribution model: Data-driven
Lookback window (acquisition): 90 days
Lookback window (other): 90 days
```

### Data-Driven Model Insights

**Credit Distribution Analysis:**

| Touchpoint Position | Typical Credit | Interpretation |
|--------------------|----------------|----------------|
| First interaction | 15-25% | Brand introduction value |
| Middle interactions | 5-15% each | Nurturing value |
| Last interaction | 25-40% | Conversion driver |
| Assist interactions | 10-20% | Supporting role |

### Model Comparison Report

**GA4 Path:** Advertising > Attribution > Model Comparison

Compare data-driven against:
- Last click
- First click
- Linear
- Position-based
- Time decay

**Key Metrics to Analyze:**
- Conversions by model
- Conversion value by model
- CPA by model
- ROAS by model

---

## Channel Value Assessment

### Channel Performance Framework

| Channel | Metric | Target | Current | Status |
|---------|--------|--------|---------|--------|
| **Organic Search** | | | | |
| - Conversions | Monthly | 15 | - | - |
| - Conversion Rate | % | 3.5% | - | - |
| - Avg. Order Value | $ | $45,000 | - | - |
| **Paid Search** | | | | |
| - Conversions | Monthly | 10 | - | - |
| - CPA | $ | $500 | - | - |
| - ROAS | Ratio | 10:1 | - | - |
| **Social Media** | | | | |
| - Assisted Conversions | Monthly | 20 | - | - |
| - Engagement Rate | % | 4% | - | - |
| - Brand Lift | % | 15% | - | - |
| **Email** | | | | |
| - Conversions | Monthly | 5 | - | - |
| - Revenue Attributed | $ | $200,000 | - | - |
| - Email ROAS | Ratio | 40:1 | - | - |
| **Referral** | | | | |
| - Conversions | Monthly | 8 | - | - |
| - Avg. Order Value | $ | $55,000 | - | - |
| - Customer LTV | $ | $75,000 | - | - |

### Channel Role Classification

| Channel | Primary Role | Secondary Role | Budget Priority |
|---------|--------------|----------------|-----------------|
| Organic Search | Acquisition | Trust building | High (SEO investment) |
| Paid Search | Conversion | Acquisition | High |
| Facebook/Instagram | Awareness | Retargeting | Medium |
| Google Display | Awareness | Remarketing | Low-Medium |
| YouTube | Consideration | Brand building | Medium |
| Email | Nurturing | Conversion | Low (high ROI) |
| Direct | Conversion | Loyalty | N/A |
| Referral | Acquisition | Trust | Referral program |

### Channel Incrementality Testing

**Test Framework:**

1. **Holdout Tests**
   - Pause channel for geographic segment
   - Measure conversion impact
   - Calculate true incrementality

2. **Lift Studies**
   - Run brand lift surveys
   - Measure awareness changes
   - Correlate with conversions

3. **Media Mix Modeling**
   - Quarterly analysis
   - Budget optimization
   - Diminishing returns identification

---

## Campaign Attribution

### UTM Parameter Standards

#### UTM Structure

| Parameter | Purpose | Format | Example |
|-----------|---------|--------|---------|
| utm_source | Traffic source | lowercase | google, facebook, newsletter |
| utm_medium | Marketing medium | lowercase | cpc, social, email |
| utm_campaign | Campaign name | lowercase-hyphen | spring-pool-sale-2024 |
| utm_term | Keyword (paid) | lowercase | fiberglass+pool+cost |
| utm_content | Ad variation | lowercase-hyphen | blue-cta-button |

#### Campaign Naming Convention

```
[season]-[offer-type]-[audience]-[year]-[variant]

Examples:
- spring-free-consultation-homeowners-2024-v1
- summer-pool-financing-families-2024-facebook
- fall-winterization-existing-customers-2024-email
- evergreen-brand-awareness-2024-display
```

### Campaign Tracking Template

**Google Ads:**
```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}&gclid={gclid}
```

**Facebook Ads:**
```
{lpurl}?utm_source=facebook&utm_medium={{placement}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&fbclid={{fbclid}}
```

**Email Campaigns:**
```
{url}?utm_source=newsletter&utm_medium=email&utm_campaign={campaign_name}&utm_content={link_description}
```

### Campaign Performance Dashboard

| Campaign | Impressions | Clicks | CTR | Conversions | CPA | Revenue | ROAS |
|----------|-------------|--------|-----|-------------|-----|---------|------|
| Spring Sale 2024 | - | - | - | - | - | - | - |
| Pool Financing | - | - | - | - | - | - | - |
| Retargeting | - | - | - | - | - | - | - |
| Brand Awareness | - | - | - | - | - | - | - |

---

## Offline Conversion Tracking

### Call Tracking Implementation

**Provider Setup:** (CallRail, CallTrackingMetrics, or similar)

| Tracking Type | Use Case | Configuration |
|---------------|----------|---------------|
| Dynamic Number Insertion | Website visitors | JavaScript pixel |
| Static tracking numbers | Print/Traditional | Unique numbers per source |
| Whisper messages | Source identification | Play source before connect |

**Call Attribution Data:**

```javascript
// Data captured per call
{
  caller_number: "555-123-4567",
  tracking_number: "555-987-6543",
  source: "google_ads",
  campaign: "spring-pool-sale",
  keyword: "pool installation near me",
  landing_page: "/services/inground-pools",
  call_duration: 245, // seconds
  call_recording_url: "...",
  caller_name: "John Smith",
  call_outcome: "consultation_booked"
}
```

### Form Submission Tracking

**Hidden Fields to Capture:**

```html
<input type="hidden" name="first_touch_source" id="first_touch_source">
<input type="hidden" name="first_touch_medium" id="first_touch_medium">
<input type="hidden" name="first_touch_campaign" id="first_touch_campaign">
<input type="hidden" name="last_touch_source" id="last_touch_source">
<input type="hidden" name="last_touch_medium" id="last_touch_medium">
<input type="hidden" name="last_touch_campaign" id="last_touch_campaign">
<input type="hidden" name="gclid" id="gclid">
<input type="hidden" name="fbclid" id="fbclid">
<input type="hidden" name="landing_page" id="landing_page">
```

### Offline Conversion Import

**Google Ads Offline Conversions:**

1. Export lead data from CRM
2. Match GCLID to conversion
3. Import via Google Ads API

```csv
Google Click ID,Conversion Name,Conversion Time,Conversion Value
ABC123xyz,quote_to_sale,2024-03-15 14:30:00,45000
DEF456uvw,consultation_booked,2024-03-16 10:00:00,0
```

**Facebook Offline Conversions:**

1. Export conversion data
2. Include email/phone for matching
3. Upload via Facebook Events Manager

### CRM Integration for Attribution

**Required CRM Fields:**

| Field | Type | Source |
|-------|------|--------|
| first_touch_source | Text | Cookie |
| first_touch_medium | Text | Cookie |
| first_touch_campaign | Text | Cookie |
| first_touch_date | DateTime | Cookie |
| last_touch_source | Text | Cookie |
| last_touch_medium | Text | Cookie |
| last_touch_campaign | Text | Cookie |
| gclid | Text | URL parameter |
| fbclid | Text | URL parameter |
| all_touchpoints | JSON | Aggregated |
| conversion_path | Text | Computed |

**Attribution API Endpoint:**

```javascript
// POST to CRM when lead converts
{
  "contact_id": "12345",
  "conversion_type": "quote_request",
  "conversion_value": 50000,
  "conversion_date": "2024-03-15T14:30:00Z",
  "attribution": {
    "first_touch": {
      "source": "google",
      "medium": "organic",
      "campaign": null,
      "date": "2024-02-01T10:00:00Z"
    },
    "last_touch": {
      "source": "google",
      "medium": "cpc",
      "campaign": "spring-pool-sale",
      "date": "2024-03-15T14:00:00Z"
    },
    "all_touches": [
      {"source": "google", "medium": "organic", "date": "2024-02-01"},
      {"source": "facebook", "medium": "social", "date": "2024-02-15"},
      {"source": "google", "medium": "cpc", "date": "2024-03-01"},
      {"source": "direct", "medium": "none", "date": "2024-03-10"},
      {"source": "google", "medium": "cpc", "date": "2024-03-15"}
    ]
  }
}
```

---

## Attribution Reporting

### Weekly Attribution Report

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Total Conversions | - | - | - |
| Avg. Touchpoints per Conversion | - | - | - |
| Avg. Time to Conversion | - | - | - |
| Top Converting Channel | - | - | - |
| Highest ROI Channel | - | - | - |

### Monthly Channel Performance

| Channel | First-Touch Conv. | Last-Touch Conv. | Assisted Conv. | Revenue |
|---------|-------------------|------------------|----------------|---------|
| Organic Search | - | - | - | - |
| Paid Search | - | - | - | - |
| Social | - | - | - | - |
| Email | - | - | - | - |
| Direct | - | - | - | - |
| Referral | - | - | - | - |

### Quarterly Attribution Analysis

**Deliverables:**
1. Channel incrementality report
2. Budget reallocation recommendations
3. Campaign performance deep-dive
4. Attribution model accuracy assessment
5. Customer journey insights

---

## Implementation Checklist

### Phase 1: Foundation (Week 1-2)
- [ ] Implement UTM tracking standards
- [ ] Set up call tracking with dynamic insertion
- [ ] Configure hidden form fields
- [ ] Create CRM attribution fields
- [ ] Deploy lead-tracking.js

### Phase 2: GA4 Configuration (Week 3-4)
- [ ] Configure all conversion events
- [ ] Set attribution model to data-driven
- [ ] Set up conversion linker tag
- [ ] Configure cross-domain tracking
- [ ] Create attribution reports

### Phase 3: Integration (Week 5-6)
- [ ] Connect GA4 to CRM
- [ ] Set up offline conversion import
- [ ] Configure call tracking integration
- [ ] Test end-to-end attribution flow
- [ ] Validate data accuracy

### Phase 4: Optimization (Ongoing)
- [ ] Weekly attribution review
- [ ] Monthly channel assessment
- [ ] Quarterly model validation
- [ ] Continuous A/B testing
- [ ] Budget optimization based on insights
