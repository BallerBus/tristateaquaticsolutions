# Lead Scoring Model - Tri-State Aquatic Solutions

## Overview

This document defines the lead scoring methodology for Tri-State Aquatic Solutions, enabling sales prioritization and marketing automation based on prospect engagement and fit.

## Scoring Methodology

### Total Score Calculation

```
Total Lead Score = Behavioral Score + Demographic Score + Engagement Score
Maximum Possible Score: 100 points
```

### Score Components

| Component | Weight | Max Points |
|-----------|--------|------------|
| Behavioral | 40% | 40 |
| Demographic | 30% | 30 |
| Engagement | 30% | 30 |

---

## Behavioral Scoring (40 points max)

### Page Visit Scoring

| Page Category | Points per Visit | Max Points |
|---------------|------------------|------------|
| Pricing/Quote pages | 5 | 10 |
| Service pages (specific pool types) | 3 | 9 |
| Gallery/Portfolio | 2 | 6 |
| About/Team pages | 1 | 3 |
| Blog/Educational content | 1 | 4 |
| FAQ page | 2 | 4 |
| Contact page | 4 | 4 |

### Time on Site Scoring

| Session Duration | Points |
|------------------|--------|
| < 30 seconds | 0 |
| 30 seconds - 2 minutes | 2 |
| 2 - 5 minutes | 4 |
| 5 - 10 minutes | 6 |
| > 10 minutes | 8 |

### Content Consumption Scoring

| Content Type | Points |
|--------------|--------|
| Viewed pool cost calculator | 5 |
| Downloaded any resource | 4 |
| Watched video (50%+ completion) | 3 |
| Read blog post (scroll depth 75%+) | 2 |
| Viewed 3+ project gallery images | 2 |

### Recency Multiplier

| Last Visit | Multiplier |
|------------|------------|
| Today | 1.0x |
| Within 3 days | 0.9x |
| Within 7 days | 0.75x |
| Within 14 days | 0.5x |
| Within 30 days | 0.25x |
| > 30 days | 0.1x |

---

## Demographic Scoring (30 points max)

### Geographic Location

| Location | Points |
|----------|--------|
| Primary service area (50-mile radius) | 15 |
| Secondary service area (50-100 miles) | 8 |
| Extended service area (100-150 miles) | 3 |
| Outside service area | 0 |

**Primary Service Areas:**
- Northern Kentucky (Covington, Newport, Florence, Fort Mitchell)
- Greater Cincinnati, OH
- Southeast Indiana (Lawrenceburg, Aurora)

### Property Type Indicators

| Property Indicator | Points |
|--------------------|--------|
| Owns home (indicated) | 5 |
| Property value > $400K (estimated) | 3 |
| Has existing pool (renovation lead) | 4 |
| New construction inquiry | 5 |
| Commercial property | 3 |

### Project Timeline

| Timeline Indicated | Points |
|--------------------|--------|
| Immediate (within 30 days) | 7 |
| Near-term (1-3 months) | 5 |
| Planning phase (3-6 months) | 3 |
| Future planning (6+ months) | 1 |
| Not specified | 2 |

---

## Engagement Scoring (30 points max)

### Form Submissions

| Form Type | Points |
|-----------|--------|
| Quote request form | 10 |
| Contact form | 7 |
| Newsletter signup | 3 |
| Resource download form | 4 |
| Calculator result submission | 8 |

### Interactive Tool Usage

| Tool | Points |
|------|--------|
| Pool cost calculator (completed) | 6 |
| Pool design configurator | 5 |
| Maintenance cost estimator | 4 |
| ROI calculator | 4 |

### Return Visit Behavior

| Behavior | Points |
|----------|--------|
| Second visit within 7 days | 3 |
| Third+ visit within 14 days | 5 |
| Visited from multiple devices | 2 |
| Returned after email open | 3 |

### Communication Engagement

| Action | Points |
|--------|--------|
| Email open | 1 |
| Email click | 3 |
| Replied to email | 5 |
| Phone call initiated | 8 |
| Live chat initiated | 6 |
| Social media message | 4 |

---

## Score Thresholds

### Lead Categories

| Category | Score Range | Description | Recommended Action |
|----------|-------------|-------------|-------------------|
| **Hot** | 70-100 | High intent, ready to buy | Immediate personal outreach within 1 hour |
| **Warm** | 45-69 | Interested, needs nurturing | Personal follow-up within 24 hours |
| **Cool** | 20-44 | Early stage, exploring | Automated nurture sequence |
| **Cold** | 0-19 | Low engagement | Long-term drip campaign |

### Hot Lead Triggers (Automatic Upgrade)

Certain actions automatically elevate a lead to "Hot" regardless of score:

1. Quote form submission
2. Phone call to sales line
3. Return visit to pricing page 3+ times
4. Calculator completion + Contact page visit in same session
5. Direct inquiry about specific project timeline

### Negative Scoring (Score Reduction)

| Condition | Point Deduction |
|-----------|-----------------|
| Unsubscribed from email | -10 |
| Email bounce (invalid) | -15 |
| Outside service area | -20 |
| Competitor (identified) | -50 |
| Job seeker (career page focus) | -40 |
| 60+ days inactive | -15 |

---

## Lead Decay Model

### Score Depreciation Schedule

Leads lose points over time without engagement:

| Time Since Last Activity | Score Reduction |
|--------------------------|-----------------|
| 7 days | -5% |
| 14 days | -10% |
| 30 days | -20% |
| 60 days | -35% |
| 90 days | -50% |

### Re-engagement Reset

When a lead re-engages after dormancy:
- Score decay is paused
- Previous behavioral score preserved at 50%
- New activity added to reduced base

---

## CRM Integration

### Data Flow Architecture

```
Website Activity
      │
      ▼
Lead Tracking Script (lead-tracking.js)
      │
      ▼
Google Analytics 4 / Tag Manager
      │
      ▼
Score Calculation Engine
      │
      ▼
CRM System (HubSpot/Salesforce)
      │
      ▼
Sales Team Notifications
```

### CRM Field Mapping

| Lead Score Component | CRM Field |
|---------------------|-----------|
| Total Score | `lead_score` |
| Behavioral Score | `behavioral_score` |
| Demographic Score | `demographic_score` |
| Engagement Score | `engagement_score` |
| Lead Category | `lead_category` |
| Score Change Date | `score_updated_at` |
| First Touch Source | `first_touch_source` |
| Last Touch Source | `last_touch_source` |

### Automation Rules

#### Hot Lead Alert
```
IF lead_score >= 70
THEN:
  - Send Slack notification to #sales
  - Create high-priority task in CRM
  - Send immediate auto-response email
  - Add to "Hot Leads" dashboard
```

#### Warm Lead Nurture
```
IF lead_score >= 45 AND lead_score < 70
THEN:
  - Enroll in "Consideration" email sequence
  - Schedule follow-up task (24 hours)
  - Add to "Warm Leads" list
```

#### Cool Lead Development
```
IF lead_score >= 20 AND lead_score < 45
THEN:
  - Enroll in "Education" email sequence
  - Add to remarketing audience
  - Monthly check-in task
```

#### Cold Lead Reactivation
```
IF lead_score < 20 AND days_since_activity > 30
THEN:
  - Enroll in "Re-engagement" sequence
  - Add to seasonal promo list
  - Quarterly review for removal
```

---

## Scoring Model Validation

### Monthly Review Metrics

1. **Conversion Rate by Score Tier**
   - Hot leads should convert at 25%+
   - Warm leads should convert at 10-15%
   - Cool leads should convert at 3-5%

2. **Score Accuracy Assessment**
   - Compare predicted vs actual conversions
   - Adjust point values based on correlation

3. **False Positive/Negative Analysis**
   - Track hot leads that don't convert
   - Track conversions from cool/cold leads
   - Refine scoring thresholds

### A/B Testing Schedule

| Quarter | Test Focus |
|---------|------------|
| Q1 | Behavioral scoring weight adjustment |
| Q2 | Time decay rate optimization |
| Q3 | Engagement scoring refinement |
| Q4 | Full model recalibration |

---

## Implementation Checklist

- [ ] Configure GA4 events for all scored behaviors
- [ ] Set up Tag Manager triggers for page visits
- [ ] Implement lead-tracking.js on all pages
- [ ] Create CRM custom fields for scoring
- [ ] Build score calculation logic in CRM
- [ ] Configure automation workflows
- [ ] Set up sales notification system
- [ ] Create lead score dashboard
- [ ] Train sales team on score interpretation
- [ ] Establish baseline metrics for validation

---

## Appendix: Scoring Examples

### Example 1: Hot Lead (Score: 82)

```
Behavioral (35/40):
- Viewed pricing page (5)
- Viewed 3 service pages (9)
- Viewed gallery (2)
- Visited contact page (4)
- Time on site: 12 min (8)
- Used pool calculator (5)
- Recency: Today (1.0x)

Demographic (22/30):
- Location: Florence, KY (15)
- Property value indicator (3)
- Timeline: 1-3 months (4)

Engagement (25/30):
- Quote form submitted (10)
- Return visit within 7 days (3)
- Email opened (1)
- Email clicked (3)
- Calculator completed (6)
- Third visit (2)

Total: 82 → HOT LEAD
```

### Example 2: Warm Lead (Score: 54)

```
Behavioral (22/40):
- Viewed 2 service pages (6)
- Viewed gallery (2)
- Read blog post (2)
- Time on site: 6 min (6)
- Watched video (3)
- Recency: 5 days ago (0.75x)

Demographic (18/30):
- Location: Cincinnati (15)
- Timeline: Not specified (3)

Engagement (14/30):
- Newsletter signup (3)
- Second visit (3)
- Used calculator (6)
- Email opened (2)

Total: 54 → WARM LEAD
```

### Example 3: Cool Lead (Score: 28)

```
Behavioral (12/40):
- Viewed home page only (0)
- Viewed 1 service page (3)
- Time on site: 3 min (4)
- Recency: 12 days ago (0.5x)

Demographic (10/30):
- Location: Edge of service area (8)
- No property info (0)
- Timeline: 6+ months (2)

Engagement (6/30):
- First visit only (0)
- Downloaded resource (4)
- Newsletter signup (3)
- Email bounced (-1)

Total: 28 → COOL LEAD
```
