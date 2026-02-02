# Customer Journey Tracking - Tri-State Aquatic Solutions

## Overview

This document defines the customer journey tracking framework for Tri-State Aquatic Solutions, enabling comprehensive understanding of how prospects move from awareness to purchase.

---

## Journey Stage Definitions

### Stage Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  AWARENESS  │───▶│ INTEREST    │───▶│ CONSIDERATION│───▶│  DECISION   │───▶│  PURCHASE   │
│             │    │             │    │              │    │             │    │             │
│  "I might   │    │ "I'm        │    │  "Which pool │    │ "I want     │    │  "Let's     │
│   want a    │    │  learning   │    │   is right   │    │  Tri-State" │    │   sign"     │
│   pool"     │    │  about      │    │   for me?"   │    │             │    │             │
│             │    │  pools"     │    │              │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Stage 1: Awareness

**Definition:** Prospect becomes aware of Tri-State Aquatic Solutions or the possibility of pool ownership.

| Indicator | Weight | Tracking Method |
|-----------|--------|-----------------|
| First website visit | Primary | GA4 new user |
| Social media ad view | Primary | Meta Pixel |
| Display ad impression | Secondary | Google Ads |
| Search query (pool-related) | Primary | Search Console |
| Word-of-mouth referral | Primary | UTM/Survey |

**Typical Touchpoints:**
- Organic search: "pool installers near me"
- Social media ad view
- Google Business Profile discovery
- Referral from friend/neighbor
- Drive-by of branded vehicle/job site

**Stage Entry Criteria:**
- First tracked interaction with brand
- No prior website visits
- No prior form submissions

**Stage Exit Criteria:**
- Second website visit within 30 days
- Email signup
- Content engagement (2+ min on site)

---

### Stage 2: Interest

**Definition:** Prospect actively seeks information about pools and/or Tri-State Aquatic Solutions.

| Indicator | Weight | Tracking Method |
|-----------|--------|-----------------|
| Return website visit | Primary | GA4 returning user |
| Blog content consumption | Primary | Scroll depth tracking |
| Video views | Primary | YouTube Analytics |
| Social media follow | Secondary | Social analytics |
| Newsletter signup | Primary | Form submission |

**Typical Touchpoints:**
- Reading blog posts about pool types
- Watching project videos
- Following on social media
- Browsing gallery pages
- Downloading guides/resources

**Stage Entry Criteria:**
- 2+ website sessions
- Single session > 3 minutes
- 3+ page views

**Stage Exit Criteria:**
- Tool usage (calculator, configurator)
- Service page visits (specific pool types)
- Price research behavior

---

### Stage 3: Consideration

**Definition:** Prospect actively evaluates pool options and compares providers.

| Indicator | Weight | Tracking Method |
|-----------|--------|-----------------|
| Calculator usage | Primary | Event tracking |
| Service page views | Primary | Page view tracking |
| Multiple return visits | Primary | Session counting |
| Pricing page visits | Primary | Page view tracking |
| Competitor comparison | Secondary | Search behavior |

**Typical Touchpoints:**
- Using pool cost calculator
- Viewing specific service pages (fiberglass, vinyl, concrete)
- Reading FAQ page
- Viewing financing options
- Comparing multiple pool companies

**Stage Entry Criteria:**
- Calculator or configurator usage
- Viewed 2+ service-specific pages
- Returned 3+ times

**Stage Exit Criteria:**
- Quote request submission
- Contact form submission
- Phone call to sales

---

### Stage 4: Decision

**Definition:** Prospect has decided they want a pool and is choosing a provider.

| Indicator | Weight | Tracking Method |
|-----------|--------|-----------------|
| Quote request submitted | Primary | Form tracking |
| Consultation scheduled | Primary | Calendar/CRM |
| Follow-up engagement | Primary | Email/CRM tracking |
| Questions about process | Primary | Call/chat tracking |
| Contract page views | Secondary | Page tracking |

**Typical Touchpoints:**
- Submitting quote request
- Scheduling consultation
- Asking detailed questions
- Discussing financing
- Reviewing contract terms

**Stage Entry Criteria:**
- Quote request submitted
- Phone inquiry about specific project
- Consultation request

**Stage Exit Criteria:**
- Signed contract
- Deposit paid
- Lost/disqualified

---

### Stage 5: Purchase

**Definition:** Prospect becomes a customer by signing contract.

| Indicator | Weight | Tracking Method |
|-----------|--------|-----------------|
| Contract signed | Primary | CRM |
| Deposit received | Primary | Payment system |
| Project scheduled | Primary | Project management |

**Typical Touchpoints:**
- Contract review and signing
- Deposit payment
- Project kickoff meeting
- Design finalization

**Stage Completion:**
- Project deposit paid
- Contract fully executed
- Start date scheduled

---

## Touchpoint Tracking

### Digital Touchpoint Events

| Touchpoint | GA4 Event Name | Parameters |
|------------|----------------|------------|
| Page view | `page_view` | page_title, page_location |
| Scroll depth | `scroll` | percent_scrolled |
| Video start | `video_start` | video_title, video_provider |
| Video progress | `video_progress` | video_percent |
| Video complete | `video_complete` | video_title |
| File download | `file_download` | file_name, file_type |
| Outbound click | `click` | link_url, link_domain |
| Calculator start | `calculator_start` | calculator_type |
| Calculator complete | `calculator_complete` | calculator_type, result_value |
| Form start | `form_start` | form_name |
| Form submit | `form_submit` | form_name |
| Chat initiated | `chat_start` | - |
| Phone click | `phone_click` | phone_number |

### Touchpoint Data Structure

```javascript
// Touchpoint object stored in session
{
  id: "tp_abc123",
  timestamp: "2024-03-15T14:30:00Z",
  type: "page_view",
  channel: "organic_search",
  source: "google",
  medium: "organic",
  campaign: null,
  page: "/services/fiberglass-pools",
  session_id: "sess_xyz789",
  user_id: "user_456def",
  device: "desktop",
  location: {
    city: "Florence",
    region: "Kentucky",
    country: "US"
  },
  referrer: "https://google.com/search",
  engagement: {
    time_on_page: 145,
    scroll_depth: 85,
    interactions: 3
  }
}
```

### Touchpoint Aggregation

```javascript
// User journey touchpoint array
{
  user_id: "user_456def",
  first_touch_date: "2024-02-01",
  last_touch_date: "2024-03-15",
  total_touchpoints: 12,
  total_sessions: 5,
  current_stage: "consideration",
  touchpoints: [
    {date: "2024-02-01", channel: "organic_search", page: "/"},
    {date: "2024-02-08", channel: "social", page: "/blog/pool-costs"},
    {date: "2024-02-15", channel: "direct", page: "/gallery"},
    {date: "2024-03-01", channel: "email", page: "/services/fiberglass"},
    {date: "2024-03-10", channel: "paid_search", page: "/calculator"},
    {date: "2024-03-15", channel: "direct", page: "/contact"}
  ],
  stage_progression: [
    {stage: "awareness", entered: "2024-02-01"},
    {stage: "interest", entered: "2024-02-08"},
    {stage: "consideration", entered: "2024-03-01"}
  ]
}
```

---

## Time to Conversion Analysis

### Conversion Time Benchmarks

| Conversion Event | Target Time | Current Avg | Industry Avg |
|------------------|-------------|-------------|--------------|
| First visit to newsletter signup | 2 sessions | - | 3 sessions |
| First visit to quote request | 30 days | - | 45 days |
| Quote request to consultation | 3 days | - | 5 days |
| Consultation to signed contract | 14 days | - | 21 days |
| **Total: First visit to purchase** | **60 days** | **-** | **90 days** |

### Time Analysis by Channel

| Acquisition Channel | Avg. Days to Conversion | Conversion Rate |
|--------------------|-------------------------|-----------------|
| Organic Search | - | - |
| Paid Search | - | - |
| Social Media | - | - |
| Referral | - | - |
| Direct | - | - |
| Email | - | - |

### Time Analysis by Lead Score

| Lead Score at First Touch | Avg. Days to Conversion |
|---------------------------|-------------------------|
| 0-19 (Cold) | - |
| 20-44 (Cool) | - |
| 45-69 (Warm) | - |
| 70-100 (Hot) | - |

### Velocity Tracking

**Fast Track Indicators:**
- Multiple sessions in first week
- Calculator + Quote request same session
- Phone call within 24 hours of first visit
- Referral from existing customer

**Slow Track Indicators:**
- Single session, no return for 14+ days
- Blog-only consumption
- Timeline indicated as "future"
- Location at edge of service area

---

## Path Analysis

### Common Conversion Paths

#### Path 1: Research-Heavy (40% of conversions)
```
Organic Search → Blog Post → Gallery → Calculator → Service Page →
Contact Page → Quote Form
(Avg. 5-7 sessions over 3-4 weeks)
```

#### Path 2: Direct Intent (25% of conversions)
```
Paid Search → Service Page → Calculator → Quote Form
(Avg. 2-3 sessions over 1 week)
```

#### Path 3: Social Discovery (20% of conversions)
```
Social Media → Home Page → Gallery → Blog → Service Page →
Calculator → Quote Form
(Avg. 4-6 sessions over 2-3 weeks)
```

#### Path 4: Referral Fast-Track (15% of conversions)
```
Referral Link → About/Reviews Page → Service Page → Quote Form
(Avg. 2 sessions over 3-5 days)
```

### Path Analysis Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Path Length | Number of touchpoints before conversion | < 8 |
| Path Duration | Days from first touch to conversion | < 45 |
| Path Efficiency | Conversions / Total path starters | > 5% |
| Path Abandonment Rate | Drop-offs per step | < 30% per step |

### Page Flow Analysis

**High-Value Page Sequences:**

| Sequence | Conversion Rate |
|----------|-----------------|
| Service Page → Calculator → Quote Form | Highest |
| Gallery → Service Page → Contact | High |
| Blog → Service Page → Calculator | Medium-High |
| Home → Gallery → Service Page | Medium |

**Low-Value Page Sequences:**

| Sequence | Issue |
|----------|-------|
| Home → Exit | Bounce, unclear value prop |
| Blog → Blog → Exit | Engagement without action |
| Service → FAQ → Exit | Unanswered questions |

---

## Drop-off Identification

### Funnel Drop-off Points

| Stage Transition | Expected Rate | Current Rate | Gap |
|------------------|---------------|--------------|-----|
| Awareness → Interest | 25% | - | - |
| Interest → Consideration | 40% | - | - |
| Consideration → Decision | 30% | - | - |
| Decision → Purchase | 50% | - | - |

### Page-Level Drop-offs

| Page | Entry Count | Exit Count | Exit Rate | Action |
|------|-------------|------------|-----------|--------|
| Home | - | - | - | Improve CTA visibility |
| Services | - | - | - | Add social proof |
| Calculator | - | - | - | Simplify form |
| Quote Form | - | - | - | Reduce required fields |
| Contact | - | - | - | Add urgency element |

### Calculator Abandonment Analysis

| Calculator Step | Completion Rate | Drop-off Reason |
|-----------------|-----------------|-----------------|
| Pool type selection | 95% | - |
| Size selection | 88% | Confusion about options |
| Feature selection | 75% | Overwhelmed by choices |
| Contact info | 60% | Privacy concerns |
| Submit | 50% | Price shock |

### Form Abandonment Analysis

| Form Field | Abandonment Point % |
|------------|---------------------|
| Name | 5% |
| Email | 10% |
| Phone | 25% |
| Address | 35% |
| Project Details | 20% |
| Budget Range | 40% |
| Submit Button | 15% |

### Drop-off Recovery Strategies

| Drop-off Point | Recovery Strategy |
|----------------|-------------------|
| Calculator incomplete | Exit intent popup with save progress option |
| Form abandoned | Email reminder (if captured) |
| Service page exit | Retargeting with testimonial ads |
| Quote form incomplete | Live chat offer |
| Post-quote no response | Phone call + email sequence |

---

## Journey Optimization Opportunities

### Quick Wins (Implement Immediately)

| Opportunity | Impact | Effort | Priority |
|-------------|--------|--------|----------|
| Add progress indicator to calculator | High | Low | P1 |
| Reduce quote form fields | High | Low | P1 |
| Add exit intent on key pages | Medium | Low | P2 |
| Implement live chat | High | Medium | P2 |
| Add social proof to service pages | Medium | Low | P2 |

### Medium-Term Improvements (30-60 days)

| Opportunity | Impact | Effort | Priority |
|-------------|--------|--------|----------|
| Personalized retargeting sequences | High | Medium | P1 |
| Calculator results email capture | High | Medium | P1 |
| Journey-based email automation | High | High | P1 |
| Chat bot for common questions | Medium | Medium | P2 |
| Video testimonials on decision pages | Medium | Medium | P2 |

### Long-Term Initiatives (60-90 days)

| Opportunity | Impact | Effort | Priority |
|-------------|--------|--------|----------|
| AI-powered next-best-action recommendations | High | High | P1 |
| Predictive lead scoring based on journey | High | High | P1 |
| Full journey orchestration platform | High | Very High | P2 |
| Cross-device identity resolution | Medium | High | P2 |

### Journey Stage Optimization

#### Awareness Stage
- **Goal:** Reduce cost per new visitor
- **Tactics:**
  - Improve SEO for top-of-funnel queries
  - Optimize social ad creative for reach
  - Increase referral program visibility

#### Interest Stage
- **Goal:** Increase content engagement
- **Tactics:**
  - Create more video content
  - Develop downloadable guides
  - Improve blog content quality

#### Consideration Stage
- **Goal:** Increase calculator completion
- **Tactics:**
  - Simplify calculator steps
  - Add save/share functionality
  - Show comparable project examples

#### Decision Stage
- **Goal:** Increase quote-to-consultation rate
- **Tactics:**
  - Faster quote response time (< 1 hour)
  - Add scheduling widget to quote confirmation
  - Personalized follow-up based on project type

#### Purchase Stage
- **Goal:** Reduce time to signed contract
- **Tactics:**
  - Digital contract signing
  - Financing pre-qualification
  - Clear next-steps communication

---

## Journey Tracking Implementation

### Required Tracking Setup

#### GA4 Events
```javascript
// Stage progression event
gtag('event', 'stage_change', {
  'user_id': 'user_456def',
  'previous_stage': 'interest',
  'new_stage': 'consideration',
  'days_in_previous_stage': 14,
  'trigger_event': 'calculator_complete'
});

// Touchpoint event
gtag('event', 'touchpoint', {
  'touchpoint_type': 'page_view',
  'touchpoint_page': '/services/fiberglass-pools',
  'session_number': 5,
  'days_since_first_visit': 21,
  'current_stage': 'consideration'
});
```

#### DataLayer Push
```javascript
// Push stage data to dataLayer
window.dataLayer.push({
  'event': 'journey_stage_update',
  'journey': {
    'userId': 'user_456def',
    'currentStage': 'consideration',
    'daysInJourney': 21,
    'totalTouchpoints': 12,
    'lastChannel': 'organic_search',
    'leadScore': 54
  }
});
```

### Journey Dashboard Metrics

| Metric | Definition | Target | Visualization |
|--------|------------|--------|---------------|
| Stage Distribution | % of leads in each stage | - | Funnel chart |
| Stage Velocity | Avg. days per stage | < 14 per stage | Line chart |
| Touchpoints per Stage | Avg. interactions | 3-5 per stage | Bar chart |
| Stage Conversion Rate | % moving to next stage | > 30% | Funnel chart |
| Journey Completion Rate | % reaching purchase | > 5% | Single metric |
| Avg. Journey Duration | Days from awareness to purchase | < 60 | Single metric |

---

## Implementation Checklist

### Phase 1: Foundation (Week 1-2)
- [ ] Define and document all stage criteria
- [ ] Implement GA4 events for all touchpoints
- [ ] Create user_id tracking across sessions
- [ ] Set up dataLayer for stage tracking
- [ ] Configure CRM stage fields

### Phase 2: Tracking (Week 3-4)
- [ ] Implement touchpoint storage
- [ ] Create stage calculation logic
- [ ] Set up journey dashboard
- [ ] Configure drop-off alerts
- [ ] Test cross-device tracking

### Phase 3: Analysis (Week 5-6)
- [ ] Build path analysis reports
- [ ] Create drop-off analysis
- [ ] Implement time-to-conversion tracking
- [ ] Set up benchmark comparisons
- [ ] Document baseline metrics

### Phase 4: Optimization (Ongoing)
- [ ] Weekly journey review
- [ ] Monthly optimization sprints
- [ ] Quarterly strategy review
- [ ] Continuous A/B testing
- [ ] Journey mapping updates
