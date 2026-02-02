# Contact Properties - Tri-State Aquatic Solutions

## Overview

This document defines all contact properties, custom fields, lead scoring criteria, and segmentation strategies for the CRM system.

---

## Standard Contact Properties

### Use HubSpot Defaults

The following standard properties should be used as-is:

| Property | Type | Description |
|----------|------|-------------|
| First Name | Text | Contact's first name |
| Last Name | Text | Contact's last name |
| Email | Email | Primary email address |
| Phone Number | Phone | Primary phone number |
| Mobile Phone Number | Phone | Mobile/cell phone |
| Street Address | Text | Property street address |
| City | Text | City |
| State/Region | Dropdown | State |
| Postal Code | Text | ZIP code |
| Country | Dropdown | Country (default: US) |
| Lifecycle Stage | Dropdown | Lead → Customer journey |
| Lead Status | Dropdown | Current lead status |
| Contact Owner | User | Assigned sales rep |
| Create Date | Date | Record creation |
| Last Activity Date | Date | Most recent activity |

---

## Required Contact Fields

### Mandatory for All Contacts

These fields must be populated before saving a new contact:

| Field | Why Required |
|-------|--------------|
| First Name | Personalization, identification |
| Last Name | Identification, formal communication |
| Email OR Phone | Must have at least one contact method |
| Lead Source | Attribution, ROI tracking |
| Lifecycle Stage | Pipeline management |

### Mandatory for Qualified Leads

Before moving to "Marketing Qualified Lead" or "Sales Qualified Lead":

| Field | Why Required |
|-------|--------------|
| Street Address | Service area verification |
| City | Service area verification |
| State | Service area verification |
| Postal Code | Service area routing |
| Pool Interest Type | Qualification |
| Property Ownership | Qualification |

### Mandatory for Customers

Before marking as "Customer":

| Field | Why Required |
|-------|--------------|
| All above fields | Complete record |
| Pool Type Installed | Service records |
| Installation Date | Warranty tracking |
| Financing Used | Business analytics |

---

## Custom Properties for Pool Buyers

### Property: Pool Interest Details

#### Pool Interest Type
- **Internal Name:** pool_interest_type
- **Type:** Multiple checkboxes
- **Options:**
  - Inground Pool - Fiberglass
  - Inground Pool - Concrete/Gunite
  - Inground Pool - Vinyl Liner
  - Above Ground Pool
  - Hot Tub/Spa
  - Pool Renovation
  - Pool Service Only
  - Undecided

#### Preferred Pool Size
- **Internal Name:** preferred_pool_size
- **Type:** Dropdown
- **Options:**
  - Small (under 300 sq ft)
  - Medium (300-500 sq ft)
  - Large (500-800 sq ft)
  - Extra Large (800+ sq ft)
  - Undecided

#### Budget Range
- **Internal Name:** budget_range
- **Type:** Dropdown
- **Options:**
  - Under $30,000
  - $30,000 - $50,000
  - $50,000 - $75,000
  - $75,000 - $100,000
  - $100,000 - $150,000
  - $150,000+
  - Not Disclosed

#### Timeline
- **Internal Name:** purchase_timeline
- **Type:** Dropdown
- **Options:**
  - Immediately (within 30 days)
  - 1-3 months
  - 3-6 months
  - 6-12 months
  - Next year or later
  - Just researching

### Property: Qualification Data

#### Property Ownership
- **Internal Name:** property_ownership
- **Type:** Dropdown
- **Options:**
  - Owns property
  - Renting (disqualified)
  - Buying soon
  - Unknown

#### Property Type
- **Internal Name:** property_type
- **Type:** Dropdown
- **Options:**
  - Single Family Home
  - Townhouse
  - Multi-Family
  - Commercial
  - Other

#### Lot Size
- **Internal Name:** lot_size
- **Type:** Text
- **Description:** Approximate lot size in sq ft or acres

#### HOA Status
- **Internal Name:** hoa_status
- **Type:** Dropdown
- **Options:**
  - No HOA
  - HOA - No pool restrictions
  - HOA - Approval required
  - HOA - Pool not allowed
  - Unknown

#### Financing Interest
- **Internal Name:** financing_interest
- **Type:** Dropdown
- **Options:**
  - Paying cash
  - Interested in financing
  - Need financing to proceed
  - Undecided

### Property: Customer Profile

#### Has Existing Pool
- **Internal Name:** has_existing_pool
- **Type:** Dropdown
- **Options:**
  - No pool
  - Yes - Inground
  - Yes - Above ground
  - Yes - Hot tub only

#### Existing Pool Condition
- **Internal Name:** existing_pool_condition
- **Type:** Dropdown
- **Options:**
  - Good condition
  - Needs minor repairs
  - Needs major renovation
  - Needs replacement
  - N/A

#### Number of Children
- **Internal Name:** number_of_children
- **Type:** Number
- **Description:** For family-oriented marketing

#### Primary Pool Use
- **Internal Name:** primary_pool_use
- **Type:** Multiple checkboxes
- **Options:**
  - Family recreation
  - Exercise/lap swimming
  - Entertainment/parties
  - Relaxation
  - Property value
  - Therapy/health

### Property: Source Tracking

#### Lead Source (Primary)
- **Internal Name:** lead_source_primary
- **Type:** Dropdown
- **Options:**
  - Website - Organic Search
  - Website - Paid Search (Google Ads)
  - Website - Direct
  - Website - Referral
  - Facebook - Organic
  - Facebook - Paid Ad
  - Instagram
  - Google Business Profile
  - Phone Call - Inbound
  - Referral - Customer
  - Referral - Partner
  - Trade Show/Event
  - Print Advertising
  - Home Show
  - Walk-in
  - Other

#### Lead Source Detail
- **Internal Name:** lead_source_detail
- **Type:** Text
- **Description:** Specific campaign, keyword, or referrer name

#### Referring Customer
- **Internal Name:** referring_customer
- **Type:** Contact (association)
- **Description:** Link to customer who referred this lead

#### UTM Campaign
- **Internal Name:** utm_campaign
- **Type:** Text
- **Description:** Marketing campaign tracking

#### UTM Source
- **Internal Name:** utm_source
- **Type:** Text
- **Description:** Traffic source tracking

#### UTM Medium
- **Internal Name:** utm_medium
- **Type:** Text
- **Description:** Marketing medium tracking

### Property: Engagement Tracking

#### Last Quote Date
- **Internal Name:** last_quote_date
- **Type:** Date
- **Description:** Most recent quote sent

#### Total Quotes Sent
- **Internal Name:** total_quotes_sent
- **Type:** Number
- **Description:** Count of quotes over time

#### Consultation Count
- **Internal Name:** consultation_count
- **Type:** Number
- **Description:** Number of site visits

#### Last Consultation Date
- **Internal Name:** last_consultation_date
- **Type:** Date
- **Description:** Most recent site visit

### Property: Customer Data

#### Customer Since
- **Internal Name:** customer_since
- **Type:** Date
- **Description:** Date of first purchase

#### Pool Type Installed
- **Internal Name:** pool_type_installed
- **Type:** Dropdown
- **Options:** (same as pool interest type)

#### Installation Date
- **Internal Name:** installation_date
- **Type:** Date
- **Description:** Pool installation completion date

#### Warranty Expiration
- **Internal Name:** warranty_expiration
- **Type:** Date
- **Description:** Warranty end date

#### Lifetime Value
- **Internal Name:** lifetime_value
- **Type:** Currency
- **Description:** Total revenue from customer

#### NPS Score
- **Internal Name:** nps_score
- **Type:** Number
- **Description:** Net Promoter Score (0-10)

#### Review Given
- **Internal Name:** review_given
- **Type:** Dropdown
- **Options:**
  - No review requested
  - Review requested
  - Review given - Google
  - Review given - Facebook
  - Review given - Other
  - Declined to review

---

## Lead Scoring

### Scoring Model Overview

**Total Possible Score:** 100 points

| Category | Max Points | Purpose |
|----------|------------|---------|
| Fit Score | 50 | How well they match ideal customer |
| Engagement Score | 30 | Level of interaction |
| Timing Score | 20 | Purchase readiness |

### Fit Score (50 points max)

| Criteria | Points | Condition |
|----------|--------|-----------|
| Property Ownership | +20 | Owns property |
| Property Ownership | +5 | Buying soon |
| Property Ownership | -50 | Renting (disqualified) |
| Budget Range | +15 | $50K+ budget |
| Budget Range | +10 | $30K-$50K budget |
| Budget Range | +5 | Under $30K budget |
| Service Area | +10 | Within primary service area |
| Service Area | +5 | Extended service area |
| Service Area | -25 | Outside service area |
| HOA Status | +5 | No HOA or no restrictions |
| HOA Status | 0 | Approval required |
| HOA Status | -20 | Pool not allowed |

### Engagement Score (30 points max)

| Criteria | Points | Condition |
|----------|--------|-----------|
| Website Visits | +5 | Visited site 3+ times |
| Website Visits | +3 | Visited site 1-2 times |
| Page Views | +5 | Viewed pricing/gallery pages |
| Form Submission | +10 | Submitted contact form |
| Email Engagement | +3 | Opened email |
| Email Engagement | +5 | Clicked email link |
| Phone Contact | +5 | Had phone conversation |
| Consultation | +10 | Attended site consultation |
| Social Engagement | +2 | Engaged on social media |

### Timing Score (20 points max)

| Criteria | Points | Condition |
|----------|--------|-----------|
| Timeline | +20 | Immediately (30 days) |
| Timeline | +15 | 1-3 months |
| Timeline | +10 | 3-6 months |
| Timeline | +5 | 6-12 months |
| Timeline | 0 | Next year or later |
| Timeline | -5 | Just researching |
| Recency | +5 | Activity in last 7 days |
| Recency | +3 | Activity in last 30 days |
| Recency | 0 | Activity in last 90 days |
| Recency | -5 | No activity in 90+ days |

### Lead Score Thresholds

| Score Range | Lead Quality | Action |
|-------------|--------------|--------|
| 80-100 | Hot Lead | Immediate follow-up (same day) |
| 60-79 | Warm Lead | Follow-up within 24 hours |
| 40-59 | Cool Lead | Nurture sequence |
| 20-39 | Cold Lead | Marketing nurture only |
| 0-19 | Unqualified | Do not pursue |
| Negative | Disqualified | Remove from active lists |

### Score Decay

Implement score decay to keep leads fresh:

- **30 days no activity:** -5 points
- **60 days no activity:** -10 points (cumulative -15)
- **90 days no activity:** -10 points (cumulative -25)

---

## Segmentation Tags

### Lifecycle-Based Tags

| Tag | Description | Entry Criteria |
|-----|-------------|----------------|
| subscriber | Opted into email list | Email subscription |
| lead | Expressed interest | Form submission or inquiry |
| mql | Marketing qualified | Lead score 40+ |
| sql | Sales qualified | Lead score 60+ and contacted |
| opportunity | Active opportunity | Deal created |
| customer | Made purchase | Closed Won deal |
| evangelist | Promoter | NPS 9-10 or referral given |

### Interest-Based Tags

| Tag | Description |
|-----|-------------|
| interest-inground-fiberglass | Interested in fiberglass pools |
| interest-inground-concrete | Interested in concrete pools |
| interest-inground-vinyl | Interested in vinyl liner pools |
| interest-above-ground | Interested in above ground pools |
| interest-hot-tub | Interested in hot tubs/spas |
| interest-renovation | Interested in pool renovation |
| interest-service | Interested in service only |

### Budget-Based Tags

| Tag | Description |
|-----|-------------|
| budget-luxury | $100K+ budget |
| budget-premium | $75K-100K budget |
| budget-standard | $50K-75K budget |
| budget-value | $30K-50K budget |
| budget-entry | Under $30K budget |

### Timeline-Based Tags

| Tag | Description |
|-----|-------------|
| timeline-immediate | Ready to buy now |
| timeline-soon | 1-3 months |
| timeline-planning | 3-6 months |
| timeline-future | 6+ months |
| timeline-researching | Just gathering info |

### Source-Based Tags

| Tag | Description |
|-----|-------------|
| source-organic | Organic search traffic |
| source-paid | Paid advertising |
| source-social | Social media |
| source-referral | Customer referral |
| source-partner | Partner referral |
| source-event | Trade show/event |

### Behavioral Tags

| Tag | Description |
|-----|-------------|
| behavior-engaged | High email engagement |
| behavior-website-active | Frequent website visits |
| behavior-quote-requested | Requested a quote |
| behavior-consultation-had | Had site consultation |
| behavior-stalled | Was active, now cold |
| behavior-re-engaged | Returned after being cold |

### Customer Tags

| Tag | Description |
|-----|-------------|
| customer-pool-owner | Has purchased a pool |
| customer-service-active | Active service customer |
| customer-warranty-active | In warranty period |
| customer-warranty-expiring | Warranty expires in 60 days |
| customer-referrer | Has referred others |
| customer-repeat | Multiple purchases |

### Disqualification Tags

| Tag | Description |
|-----|-------------|
| dq-renter | Does not own property |
| dq-outside-area | Outside service area |
| dq-hoa-restricted | HOA prohibits pools |
| dq-no-budget | Cannot afford services |
| dq-bad-fit | Other disqualifying factor |
| dq-do-not-contact | Requested no contact |

---

## Data Quality Rules

### Validation Rules

| Field | Validation |
|-------|------------|
| Email | Valid email format, not disposable |
| Phone | Valid phone format, 10 digits |
| Postal Code | Valid 5-digit ZIP |
| State | Valid 2-letter abbreviation |

### Duplicate Management

**Duplicate Detection:**
- Match on: Email (exact)
- Match on: Phone (normalized)
- Match on: First Name + Last Name + Street Address

**Merge Strategy:**
- Keep earliest create date
- Keep most recent activity
- Combine engagement history
- Keep highest lead score

### Data Enrichment

**Auto-Populate When Possible:**
- City/State from ZIP code
- Time zone from location
- Company from email domain (if applicable)

### Data Hygiene Schedule

**Weekly:**
- Review contacts without phone AND email
- Check for incomplete required fields

**Monthly:**
- Merge duplicate contacts
- Validate bounced emails
- Review disqualified contacts

**Quarterly:**
- Full database audit
- Update lifecycle stages
- Archive old unengaged contacts

---

## Property Groups

Organize custom properties into logical groups in HubSpot:

### Group: Pool Interest
- Pool Interest Type
- Preferred Pool Size
- Budget Range
- Timeline
- Has Existing Pool
- Existing Pool Condition
- Primary Pool Use

### Group: Property Information
- Property Ownership
- Property Type
- Lot Size
- HOA Status
- Street Address
- City
- State
- Postal Code

### Group: Lead Qualification
- Lead Score
- Financing Interest
- Referring Customer
- Lead Source Primary
- Lead Source Detail

### Group: Marketing Attribution
- UTM Campaign
- UTM Source
- UTM Medium
- First Touch Source
- Last Touch Source

### Group: Customer Data
- Customer Since
- Pool Type Installed
- Installation Date
- Warranty Expiration
- Lifetime Value
- NPS Score
- Review Given

### Group: Engagement History
- Last Quote Date
- Total Quotes Sent
- Consultation Count
- Last Consultation Date
