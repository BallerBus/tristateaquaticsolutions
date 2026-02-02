# Meta Events Catalog

## Tri-State Aquatic Solutions

Complete catalog of Meta Pixel events, parameters, custom conversions, and audience strategies for the pool service industry.

---

## Table of Contents

1. [Standard Events](#standard-events)
2. [Custom Events - Pool Industry](#custom-events---pool-industry)
3. [Event Parameters Reference](#event-parameters-reference)
4. [Custom Conversions Setup](#custom-conversions-setup)
5. [Audience Creation](#audience-creation)
6. [Lookalike Audience Strategy](#lookalike-audience-strategy)
7. [Implementation Checklist](#implementation-checklist)

---

## Standard Events

These are Meta's predefined events with built-in optimization support.

### PageView

**Trigger:** Every page load (automatic)

| Parameter | Value | Notes |
|-----------|-------|-------|
| event_name | PageView | Standard |
| event_id | Auto-generated | For deduplication |

**Implementation:**
```javascript
// Automatic on pixel init
fbq('track', 'PageView');
```

---

### ViewContent

**Trigger:** When user views key content pages

| Parameter | Type | Example | Required |
|-----------|------|---------|----------|
| content_name | string | "Pool Installation Services" | Recommended |
| content_category | string | "Pool Services" | Recommended |
| content_type | string | "service" | Recommended |
| content_ids | array | ["service_001"] | Optional |
| value | number | 0 | Optional |
| currency | string | "USD" | If value set |

**Use Cases:**
- Service pages (installation, maintenance, repair)
- Pricing/packages page
- Gallery pages
- About us page
- Blog posts

**Implementation:**
```javascript
// Service page
MetaPixel.trackViewContent({
  content_name: 'Pool Installation Services',
  content_category: 'Pool Services',
  content_type: 'service',
  content_ids: ['pool_installation'],
});

// Gallery page
MetaPixel.trackViewContent({
  content_name: 'Project Gallery',
  content_category: 'Gallery',
  content_type: 'gallery',
});
```

---

### Lead

**Trigger:** When user submits a form or requests information

| Parameter | Type | Example | Required |
|-----------|------|---------|----------|
| content_name | string | "Quote Request" | Recommended |
| content_category | string | "Lead" | Recommended |
| value | number | 150 | Optional (est. lead value) |
| currency | string | "USD" | If value set |

**Use Cases:**
- Quote request form submission
- Contact form submission
- Newsletter signup
- Download gated content

**Implementation:**
```javascript
MetaPixel.trackLead({
  content_name: 'Quote Request',
  content_category: 'Pool Installation Lead',
  value: 150, // Estimated lead value
  currency: 'USD',
});
```

---

### Contact

**Trigger:** When user initiates contact

| Parameter | Type | Example | Required |
|-----------|------|---------|----------|
| content_name | string | "Phone Click" | Recommended |
| contact_method | string | "phone" | Custom |

**Use Cases:**
- Phone number click (tel: link)
- Email click (mailto: link)
- Live chat initiation
- Directions/map click

**Implementation:**
```javascript
// Phone click
MetaPixel.trackContact({
  content_name: 'Phone Click',
  contact_method: 'phone',
});

// Email click
MetaPixel.trackContact({
  content_name: 'Email Click',
  contact_method: 'email',
});
```

---

### Schedule

**Trigger:** When user schedules an appointment

| Parameter | Type | Example | Required |
|-----------|------|---------|----------|
| content_name | string | "Free Consultation" | Recommended |
| appointment_type | string | "consultation" | Custom |
| value | number | 0 | Optional |
| currency | string | "USD" | If value set |

**Use Cases:**
- Consultation booking
- Service appointment scheduling
- Pool opening/closing scheduling

**Implementation:**
```javascript
MetaPixel.trackSchedule({
  content_name: 'Free Consultation',
  appointment_type: 'consultation',
});
```

---

### CompleteRegistration

**Trigger:** When user creates an account

| Parameter | Type | Example | Required |
|-----------|------|---------|----------|
| content_name | string | "Customer Portal" | Recommended |
| status | string | "complete" | Recommended |

**Use Cases:**
- Customer portal registration
- Maintenance plan signup
- Warranty registration

**Implementation:**
```javascript
MetaPixel.trackCompleteRegistration({
  content_name: 'Customer Portal',
  status: 'complete',
});
```

---

## Custom Events - Pool Industry

These custom events are specific to the pool service industry.

### QuoteRequest

**Purpose:** Track quote/estimate requests

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| content_name | string | "Pool Installation Quote" | Required |
| service_type | string | "Pool Installation" | Required |
| pool_type | string | "Inground Fiberglass" | Optional |
| estimated_budget | string | "$50,000-$75,000" | Optional |
| timeline | string | "3-6 months" | Optional |
| value | number | 200 | Est. lead value |
| currency | string | "USD" | Required if value |

**Implementation:**
```javascript
MetaPixel.trackQuoteRequest({
  content_name: 'Pool Installation Quote',
  service_type: 'Pool Installation',
  pool_type: 'Inground Fiberglass',
  estimated_budget: '$50,000-$75,000',
  timeline: '3-6 months',
  value: 200,
  currency: 'USD',
});
```

---

### ServiceInterest

**Purpose:** Track interest in specific services

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| service_type | string | "Pool Maintenance" | Required |
| content_name | string | "Weekly Pool Service" | Optional |
| interest_level | string | "high" | Optional |

**Service Types:**
| Service Type | Description |
|--------------|-------------|
| Pool Installation | New pool construction |
| Pool Renovation | Remodeling existing pools |
| Pool Maintenance | Regular cleaning/service |
| Pool Repair | Equipment/structural repair |
| Pool Opening | Spring opening service |
| Pool Closing | Winterization service |
| Spa & Hot Tub | Hot tub services |
| Water Features | Fountains, waterfalls |
| Pool Deck | Decking installation |
| Pool Lighting | LED/lighting upgrades |
| Pool Heating | Heater installation |
| Pool Automation | Smart controls |
| Safety Covers | Cover installation |
| Liner Replacement | Vinyl liner replacement |
| Equipment Upgrade | Pump, filter upgrades |

**Implementation:**
```javascript
MetaPixel.trackServiceInterest('Pool Installation', {
  content_name: 'Inground Pool Installation',
  interest_level: 'high',
});
```

---

### PoolTypeInterest

**Purpose:** Track interest in specific pool types

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| pool_type | string | "Inground Fiberglass" | Required |
| size_preference | string | "medium" | Optional |
| feature_interest | array | ["lighting", "waterfall"] | Optional |

**Pool Types:**
| Pool Type | Description |
|-----------|-------------|
| Inground Vinyl | Vinyl liner pools |
| Inground Fiberglass | Fiberglass shell pools |
| Inground Concrete | Gunite/shotcrete pools |
| Above Ground | Above ground pools |
| Semi-Inground | Partially buried pools |
| Infinity Edge | Vanishing edge pools |
| Lap Pool | Exercise/lap pools |
| Plunge Pool | Small plunge pools |

**Implementation:**
```javascript
MetaPixel.trackPoolTypeInterest('Inground Fiberglass', {
  size_preference: 'medium',
  feature_interest: ['lighting', 'spa'],
});
```

---

### ConsultationBooked

**Purpose:** Track when consultations are scheduled

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| consultation_type | string | "In-Home" | Required |
| service_interest | string | "Pool Installation" | Required |
| preferred_date | string | "2024-03-15" | Optional |
| value | number | 500 | Est. conversion value |

**Implementation:**
```javascript
MetaPixel.trackConsultationBooked({
  consultation_type: 'In-Home',
  service_interest: 'Pool Installation',
  preferred_date: '2024-03-15',
  value: 500,
  currency: 'USD',
});
```

---

### FinancingInterest

**Purpose:** Track financing page engagement

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| content_name | string | "Pool Financing Options" | Required |
| financing_type | string | "Monthly Payment Calculator" | Optional |
| estimated_amount | string | "$40,000-$60,000" | Optional |

**Implementation:**
```javascript
MetaPixel.trackFinancingInterest({
  content_name: 'Pool Financing Options',
  financing_type: 'Monthly Payment Calculator',
  estimated_amount: '$50,000',
});
```

---

### GalleryView

**Purpose:** Track project gallery engagement

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| gallery_type | string | "Pool Installations" | Required |
| images_viewed | number | 5 | Optional |
| time_spent | number | 120 | Seconds, optional |

**Implementation:**
```javascript
MetaPixel.trackGalleryView('Pool Installations', {
  images_viewed: 5,
  time_spent: 120,
});
```

---

### ServiceAreaCheck

**Purpose:** Track service area lookups

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| zip_code | string | "15001" | Required |
| in_service_area | boolean | true | Required |
| city | string | "Pittsburgh" | Optional |

**Implementation:**
```javascript
MetaPixel.trackServiceAreaCheck('15001', true);
```

---

### VideoWatch

**Purpose:** Track video engagement

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| video_title | string | "Pool Installation Process" | Required |
| percent_watched | number | 75 | Required |
| video_duration | number | 180 | Seconds, optional |

**Implementation:**
```javascript
MetaPixel.trackVideoWatch('Pool Installation Process', 75);
```

---

### Download

**Purpose:** Track content downloads

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| download_type | string | "Brochure" | Required |
| download_name | string | "Pool Buying Guide" | Required |
| file_type | string | "PDF" | Optional |

**Download Types:**
- Brochure
- Price Guide
- Maintenance Guide
- Warranty Information
- Pool Care Tips

**Implementation:**
```javascript
MetaPixel.trackDownload('Brochure', 'Pool Buying Guide 2024');
```

---

### ReviewView

**Purpose:** Track review/testimonial page views

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| review_source | string | "Google Reviews" | Optional |
| reviews_viewed | number | 10 | Optional |
| average_rating | number | 4.8 | Optional |

**Implementation:**
```javascript
MetaPixel.trackReviewView({
  review_source: 'Customer Testimonials',
  reviews_viewed: 5,
  average_rating: 4.9,
});
```

---

### WarrantyInterest

**Purpose:** Track warranty page engagement

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| warranty_type | string | "Lifetime Structural" | Optional |
| product_category | string | "Fiberglass Pools" | Optional |

**Implementation:**
```javascript
MetaPixel.trackWarrantyInterest({
  warranty_type: 'Lifetime Structural',
  product_category: 'Fiberglass Pools',
});
```

---

## Event Parameters Reference

### User Data Parameters (Advanced Matching)

| Parameter | Key | Format | Example |
|-----------|-----|--------|---------|
| Email | em | SHA256 hash of lowercase, trimmed | abc123... |
| Phone | ph | SHA256 hash of digits only | def456... |
| First Name | fn | SHA256 hash of lowercase | ghi789... |
| Last Name | ln | SHA256 hash of lowercase | jkl012... |
| City | ct | SHA256 hash of lowercase, no spaces | mno345... |
| State | st | SHA256 hash of 2-letter code | pqr678... |
| Zip Code | zp | 5-digit zip | 15001 |
| Country | country | ISO 2-letter code | us |
| External ID | external_id | Your customer ID | cust_12345 |

### Custom Data Parameters

| Parameter | Type | Use |
|-----------|------|-----|
| content_name | string | Name of content/service |
| content_category | string | Category classification |
| content_type | string | Type (service, product, etc.) |
| content_ids | array | Your internal IDs |
| value | number | Monetary value |
| currency | string | ISO currency code |

---

## Custom Conversions Setup

Create custom conversions in Events Manager for specific business goals.

### High-Value Lead Conversions

#### 1. Pool Installation Lead
```
Event: Lead or QuoteRequest
URL contains: /pool-installation OR /new-pool
OR
Custom Parameter: service_type = "Pool Installation"
Value: $500 (average lead value)
```

#### 2. Consultation Booked
```
Event: ConsultationBooked
Value: $750 (higher intent)
Attribution: 7-day click, 1-day view
```

#### 3. Phone Call Conversion
```
Event: Contact
Custom Parameter: contact_method = "phone"
Value: $100
```

### Service-Specific Conversions

#### 4. Maintenance Plan Interest
```
Event: ServiceInterest
Custom Parameter: service_type = "Pool Maintenance"
Value: $50
```

#### 5. Renovation Interest
```
Event: ServiceInterest
Custom Parameter: service_type = "Pool Renovation"
Value: $300
```

### Engagement Conversions

#### 6. Video Engagement
```
Event: VideoWatch
Custom Parameter: percent_watched >= 50
Value: $10
```

#### 7. Gallery Engagement
```
Event: GalleryView
Custom Parameter: images_viewed >= 5
Value: $15
```

### Setup in Events Manager

1. Go to Events Manager
2. Custom Conversions → Create Custom Conversion
3. Configure:
   - Name: [Descriptive name]
   - Data Source: Your Pixel
   - Event: [Standard or Custom event]
   - Rules: [URL or parameter conditions]
   - Category: [Lead, Contact, etc.]
   - Value: [Conversion value]

---

## Audience Creation

### Website Custom Audiences

#### High-Intent Audiences

**1. Quote Request Submitters (180 days)**
```
Include: Event = QuoteRequest OR Event = Lead
Retention: 180 days
Est. Size: 500-2,000
Use: Retargeting, Lookalikes
```

**2. Consultation Bookers (180 days)**
```
Include: Event = ConsultationBooked
Retention: 180 days
Est. Size: 100-500
Use: Exclusion (already converted), High-value lookalike
```

**3. Service Page Visitors (30 days)**
```
Include: Event = ViewContent
URL Contains: /services/ OR /pool-installation
Retention: 30 days
Est. Size: 2,000-5,000
Use: Retargeting with service ads
```

#### Engagement Audiences

**4. Gallery Viewers (60 days)**
```
Include: Event = GalleryView
Retention: 60 days
Est. Size: 1,000-3,000
Use: Visual-focused retargeting
```

**5. Video Watchers (60 days)**
```
Include: Event = VideoWatch
Optional: percent_watched >= 50
Retention: 60 days
Est. Size: 500-1,500
Use: Engaged audience retargeting
```

**6. Financing Page Visitors (90 days)**
```
Include: Event = FinancingInterest
Retention: 90 days
Est. Size: 300-1,000
Use: Retarget with financing offers
```

#### Service-Specific Audiences

**7. Pool Installation Interest (90 days)**
```
Include: Event = PoolTypeInterest OR
         Event = ServiceInterest WHERE service_type = "Pool Installation"
Retention: 90 days
Est. Size: 1,000-3,000
Use: Installation-specific campaigns
```

**8. Maintenance Interest (60 days)**
```
Include: Event = ServiceInterest
Custom: service_type = "Pool Maintenance"
Retention: 60 days
Est. Size: 500-1,500
Use: Maintenance plan campaigns
```

**9. Renovation Interest (90 days)**
```
Include: Event = ServiceInterest
Custom: service_type = "Pool Renovation"
Retention: 90 days
Est. Size: 300-1,000
Use: Renovation campaigns
```

#### Exclusion Audiences

**10. Recent Converters (30 days)**
```
Include: Event = ConsultationBooked OR Event = Lead
Retention: 30 days
Use: EXCLUDE from prospecting campaigns
```

**11. All Website Visitors (180 days)**
```
Include: Event = PageView
Retention: 180 days
Use: General retargeting, Lookalike source
```

---

## Lookalike Audience Strategy

### Seed Audience Priorities

| Priority | Seed Audience | Lookalike % | Use Case |
|----------|---------------|-------------|----------|
| 1 | Consultation Bookers | 1%, 3%, 5% | Highest value prospecting |
| 2 | Quote Requesters | 1%, 3%, 5% | High intent prospecting |
| 3 | Installation Interest | 2%, 5% | Service-specific prospecting |
| 4 | All Converters | 1%, 3% | Broad prospecting |
| 5 | Engaged Visitors | 5%, 10% | Awareness campaigns |

### Lookalike Creation Strategy

#### Tier 1: High-Value Lookalikes
```
Seed: Consultation Bookers (last 180 days)
Lookalike: 1% - Best match
Location: PA, OH, WV (service area)
Est. Reach: 200,000-400,000
Use: Primary prospecting campaigns
```

#### Tier 2: Intent Lookalikes
```
Seed: Quote Requesters + Lead Events (last 180 days)
Lookalike: 1-3%
Location: PA, OH, WV (service area)
Est. Reach: 400,000-800,000
Use: Secondary prospecting, scale
```

#### Tier 3: Service-Specific Lookalikes
```
Seed A: Pool Installation Interest
Lookalike: 2%
Use: Installation campaigns

Seed B: Pool Maintenance Interest
Lookalike: 3%
Use: Maintenance campaigns

Seed C: Pool Renovation Interest
Lookalike: 3%
Use: Renovation campaigns
```

#### Tier 4: Engagement Lookalikes
```
Seed: All Website Visitors (180 days) with 3+ sessions
Lookalike: 5%
Location: Service area
Est. Reach: 800,000-1,200,000
Use: Awareness, brand campaigns
```

### Audience Layering Strategy

**Campaign Structure:**
```
Campaign: Pool Installation - Prospecting
├── Ad Set 1: LAL 1% Consultation Bookers
├── Ad Set 2: LAL 1% Quote Requesters
├── Ad Set 3: LAL 2% Installation Interest
├── Ad Set 4: Interest Targeting (Pool, Home Improvement)
└── Ad Set 5: LAL 3-5% All Converters (Scale)

Exclusions (All Ad Sets):
- Consultation Bookers (180 days)
- Quote Requesters (30 days)
- Existing Customers (if uploaded)
```

---

## Implementation Checklist

### Phase 1: Basic Setup
- [ ] Install Meta Pixel base code
- [ ] Verify PageView tracking
- [ ] Test in Meta Pixel Helper extension
- [ ] Configure Events Manager

### Phase 2: Standard Events
- [ ] Implement ViewContent on service pages
- [ ] Implement Lead on form submissions
- [ ] Implement Contact on phone/email clicks
- [ ] Implement Schedule on booking confirmations
- [ ] Test all events in Events Manager

### Phase 3: Custom Events
- [ ] Implement QuoteRequest
- [ ] Implement ServiceInterest
- [ ] Implement PoolTypeInterest
- [ ] Implement ConsultationBooked
- [ ] Implement FinancingInterest
- [ ] Implement GalleryView
- [ ] Implement VideoWatch
- [ ] Implement Download
- [ ] Test all custom events

### Phase 4: Advanced Matching
- [ ] Configure user data collection
- [ ] Implement form data storage
- [ ] Test advanced matching parameters
- [ ] Verify Event Match Quality (EMQ) score

### Phase 5: Event Deduplication
- [ ] Implement event ID generation
- [ ] Store event IDs for CAPI matching
- [ ] Test deduplication in Events Manager

### Phase 6: Custom Conversions
- [ ] Create Pool Installation Lead conversion
- [ ] Create Consultation Booked conversion
- [ ] Create Phone Call conversion
- [ ] Create service-specific conversions
- [ ] Set appropriate conversion values

### Phase 7: Audiences
- [ ] Create high-intent audiences
- [ ] Create engagement audiences
- [ ] Create service-specific audiences
- [ ] Create exclusion audiences
- [ ] Create lookalike audiences

### Phase 8: Testing & Optimization
- [ ] Run test campaigns with new audiences
- [ ] Monitor conversion tracking accuracy
- [ ] Optimize EMQ scores (target 6+)
- [ ] Document audience performance
- [ ] Iterate based on results

---

## Quick Reference: Event Triggers

| Page/Action | Events to Fire |
|-------------|----------------|
| Any page load | PageView |
| Service page view | PageView, ViewContent |
| Gallery page view | PageView, ViewContent, GalleryView |
| Pricing page view | PageView, ViewContent |
| Contact form submit | Lead |
| Quote form submit | Lead, QuoteRequest |
| Consultation booking | Schedule, ConsultationBooked, Lead |
| Phone click | Contact |
| Email click | Contact |
| Video play (50%+) | VideoWatch |
| PDF download | Download |
| Financing calculator use | FinancingInterest |
| Reviews page view | ViewContent, ReviewView |
| Warranty page view | ViewContent, WarrantyInterest |
| Service area check | ServiceAreaCheck |

---

## Resources

- [Meta Pixel Standard Events](https://developers.facebook.com/docs/meta-pixel/reference)
- [Custom Conversions Guide](https://www.facebook.com/business/help/742478679120153)
- [Custom Audiences Guide](https://www.facebook.com/business/help/744354708981227)
- [Lookalike Audiences Guide](https://www.facebook.com/business/help/164749007013531)
