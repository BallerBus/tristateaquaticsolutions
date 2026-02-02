# Tri-State Aquatic Solutions - Conversion Event Taxonomy

Complete documentation of all trackable conversion events, naming conventions, and funnel definitions.

---

## Table of Contents

1. [Event Naming Conventions](#event-naming-conventions)
2. [Macro-Conversions](#macro-conversions)
3. [Micro-Conversions](#micro-conversions)
4. [Event Parameters](#event-parameters)
5. [Conversion Values](#conversion-values)
6. [Funnel Definitions](#funnel-definitions)
7. [Data Layer Specifications](#data-layer-specifications)

---

## Event Naming Conventions

### General Rules

1. **Use snake_case** for all event names (e.g., `form_submit`, `phone_call_click`)
2. **Action + Object** pattern (e.g., `download_guide`, `view_calculator`)
3. **Consistent prefixes** for related events
4. **No special characters** except underscores
5. **Max 40 characters** for GA4 compatibility

### Event Name Prefixes

| Prefix | Usage | Example |
|--------|-------|---------|
| `generate_` | Lead generation events | `generate_lead` |
| `form_` | Form-related events | `form_submit`, `form_start` |
| `video_` | Video engagement | `video_start`, `video_complete` |
| `calculator_` | Calculator interactions | `calculator_complete` |
| `chat_` | Chat widget events | `chat_widget_open` |
| `booking_` | Consultation booking | `booking_complete` |
| `download_` | File downloads | `download_guide` |
| `click_` | Click actions | `click_to_call` |
| `view_` | Page/element views | `view_pricing` |

### Standard GA4 Event Names Used

We leverage GA4's recommended event names where applicable:

- `generate_lead` - Primary lead conversion
- `schedule_appointment` - Consultation booking
- `sign_up` - Newsletter/form signup
- `view_item` - Product/service page view
- `scroll` - Scroll depth (auto-tracked)
- `file_download` - Document downloads

---

## Macro-Conversions

High-value conversion actions that indicate strong purchase intent.

### 1. Contact Form Submission

**Event Name:** `generate_lead`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `form_name` | string | Form identifier | `"contact_main"` |
| `form_type` | string | Type of form | `"contact"` |
| `service_interest` | string | Service selected | `"pool_installation"` |
| `location` | string | User's location | `"Wayne, PA"` |
| `value` | number | Lead value | `500` |
| `currency` | string | Currency code | `"USD"` |
| `event_id` | string | Unique event ID | `"evt_1234567890"` |

**Estimated Value:** $500

---

### 2. Phone Call Click

**Event Name:** `phone_call_click`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `phone_number` | string | Phone number clicked | `"610-555-0100"` |
| `link_text` | string | Displayed text | `"Call Now"` |
| `link_location` | string | Page section | `"header"` |
| `value` | number | Lead value | `750` |
| `currency` | string | Currency code | `"USD"` |

**Estimated Value:** $750

---

### 3. Consultation Booking

**Event Name:** `consultation_booked` / `schedule_appointment`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `booking_type` | string | Type of consultation | `"in_home_consultation"` |
| `booking_date` | string | Scheduled date | `"2024-03-15T10:00:00"` |
| `invitee_email` | string | Customer email (hashed) | `"abc123..."` |
| `consultation_duration` | number | Duration in minutes | `60` |
| `value` | number | Lead value | `1000` |
| `currency` | string | Currency code | `"USD"` |

**Estimated Value:** $1,000

---

### 4. Chat Engagement (Message Sent)

**Event Name:** `chat_engagement`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `message_type` | string | First message or reply | `"initial_message"` |
| `conversation_id` | string | Chat session ID | `"conv_12345"` |
| `widget_type` | string | Chat provider | `"drift"` |
| `value` | number | Lead value | `250` |
| `currency` | string | Currency code | `"USD"` |

**Estimated Value:** $250

---

## Micro-Conversions

Lower-funnel engagement actions that indicate interest and move users toward macro-conversions.

### 5. Pool Cost Calculator Completion

**Event Name:** `calculator_complete`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `pool_type` | string | Type selected | `"plunge_pool"` |
| `pool_size` | string | Size selected | `"12x6"` |
| `estimated_cost` | number | Calculated estimate | `45000` |
| `features_selected` | array | Features chosen | `["heater", "lighting"]` |
| `value` | number | Micro-conversion value | `300` |
| `currency` | string | Currency code | `"USD"` |

**Estimated Value:** $300

---

### 6. Lead Magnet Download

**Event Name:** `lead_magnet_download`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `lead_magnet_name` | string | Name of resource | `"Ultimate Pool Buyers Guide"` |
| `lead_magnet_type` | string | Format type | `"pdf"` |
| `file_name` | string | Actual file name | `"pool-buyers-guide-2024.pdf"` |
| `value` | number | Micro-conversion value | `150` |
| `currency` | string | Currency code | `"USD"` |

**Estimated Value:** $150

**Available Lead Magnets:**

| Lead Magnet | Type | Value |
|-------------|------|-------|
| Ultimate Pool Buyer's Guide | PDF Guide | $150 |
| Pool Maintenance Checklist | PDF Checklist | $100 |
| Backyard Design Inspiration | PDF Lookbook | $125 |
| Cost Breakdown Worksheet | Spreadsheet | $175 |
| Financing Options Guide | PDF Guide | $150 |

---

### 7. Pool Style Quiz Completion

**Event Name:** `quiz_complete`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `quiz_result` | string | Recommended pool type | `"modern_plunge"` |
| `recommended_pool` | string | Specific recommendation | `"Plunge Pool Classic"` |
| `answers` | object | Quiz responses | `{style: "modern", budget: "mid"}` |
| `value` | number | Micro-conversion value | `200` |
| `currency` | string | Currency code | `"USD"` |

**Estimated Value:** $200

---

### 8. Video Completion

**Event Name:** `video_complete`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `video_title` | string | Video name | `"Pool Installation Process"` |
| `video_id` | string | Video identifier | `"abc123xyz"` |
| `video_provider` | string | Platform | `"youtube"` |
| `video_duration` | number | Length in seconds | `180` |
| `value` | number | Micro-conversion value | `100` |
| `currency` | string | Currency code | `"USD"` |

**Estimated Value:** $100

---

### 9. Calculator Step Progression

**Event Name:** `calculator_step_view`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `step_number` | number | Current step | `2` |
| `total_steps` | number | Total steps | `5` |
| `progress_percentage` | number | Completion % | `40` |

**Estimated Value:** N/A (engagement metric)

---

### 10. Email Click

**Event Name:** `email_click`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `email_address` | string | Email clicked | `"info@tsaquatic.com"` |
| `link_text` | string | Link text | `"Email Us"` |
| `link_location` | string | Page section | `"footer"` |

**Estimated Value:** N/A (engagement metric)

---

### 11. Chat Widget Open

**Event Name:** `chat_widget_open`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `widget_type` | string | Chat provider | `"intercom"` |
| `trigger_type` | string | How opened | `"user_click"` |

**Estimated Value:** N/A (engagement metric)

---

### 12. CTA Button Click

**Event Name:** `cta_click`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `cta_text` | string | Button text | `"Get Free Quote"` |
| `cta_url` | string | Destination URL | `"/contact"` |
| `cta_location` | string | Page section | `"hero"` |
| `cta_type` | string | CTA category | `"primary"` |

**Estimated Value:** N/A (engagement metric)

---

### 13. Scroll Depth

**Event Name:** `scroll_depth`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `scroll_depth` | number | Percentage reached | `75` |
| `page_height` | number | Total page height | `4500` |

**Estimated Value:** N/A (engagement metric)

---

### 14. Form Start

**Event Name:** `form_start`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `form_name` | string | Form identifier | `"contact_main"` |
| `form_type` | string | Type of form | `"contact"` |
| `first_field` | string | First field interacted | `"name"` |

**Estimated Value:** N/A (engagement metric)

---

### 15. File Download

**Event Name:** `file_download`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `file_name` | string | Downloaded file | `"brochure.pdf"` |
| `file_extension` | string | File type | `"pdf"` |
| `download_category` | string | File category | `"marketing"` |

**Estimated Value:** N/A (varies by content)

---

## Event Parameters

### Global Parameters (Included in All Events)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `event_id` | string | Yes | Unique event identifier for deduplication |
| `page_title` | string | Yes | Current page title |
| `page_location` | string | Yes | Full URL |
| `page_path` | string | Yes | URL path only |
| `page_referrer` | string | No | Referring URL |
| `timestamp` | string | Yes | ISO 8601 timestamp |

### UTM Parameters (When Present)

| Parameter | Type | Description |
|-----------|------|-------------|
| `utm_source` | string | Traffic source |
| `utm_medium` | string | Marketing medium |
| `utm_campaign` | string | Campaign name |
| `utm_term` | string | Search term |
| `utm_content` | string | Ad/content variation |

### User Parameters (Enhanced Conversions)

| Parameter | Type | Description | Privacy |
|-----------|------|-------------|---------|
| `user_email_hash` | string | SHA256 hashed email | Hashed |
| `user_phone_hash` | string | SHA256 hashed phone | Hashed |
| `user_first_name` | string | First name | Plaintext |
| `user_last_name` | string | Last name | Plaintext |
| `user_city` | string | City | Plaintext |
| `user_state` | string | State/Region | Plaintext |
| `user_zip` | string | Postal code | Plaintext |

---

## Conversion Values

### Estimated Lead Values by Conversion Type

| Conversion | Value | Rationale |
|------------|-------|-----------|
| Consultation Booked | $1,000 | Highest intent - ready for in-home visit |
| Phone Call Click | $750 | High intent - direct contact |
| Contact Form Submit | $500 | Strong intent - requesting information |
| Calculator Complete | $300 | Researching pricing - moderate intent |
| Chat Engagement | $250 | Active engagement - moderate intent |
| Quiz Complete | $200 | Exploring options - early stage |
| Lead Magnet Download | $150 | Information gathering - early stage |
| Video Complete | $100 | Content engagement - awareness stage |

### Value Calculation Methodology

**Base Formula:**
```
Lead Value = (Average Project Value × Close Rate × Lead Quality Factor)
```

**Example Calculation (Consultation Booking):**
- Average Project Value: $50,000
- Close Rate from Consultations: 25%
- Lead Quality Factor: 0.08 (high-intent adjustment)
- Lead Value = $50,000 × 0.25 × 0.08 = $1,000

### Value Adjustment by Source

| Traffic Source | Multiplier | Adjusted Contact Form Value |
|----------------|------------|----------------------------|
| Organic Search | 1.2x | $600 |
| Google Ads | 1.0x | $500 |
| Facebook Ads | 0.8x | $400 |
| Referral | 1.4x | $700 |
| Direct | 1.1x | $550 |

---

## Funnel Definitions

### Primary Sales Funnel

```
AWARENESS
    │
    ├── Page View
    ├── Video Start
    └── Blog Read
    │
    ▼
INTEREST
    │
    ├── Video Complete (>50%)
    ├── Scroll Depth (>75%)
    ├── Multiple Page Views
    └── Quiz Start
    │
    ▼
CONSIDERATION
    │
    ├── Calculator Use
    ├── Quiz Complete
    ├── Lead Magnet Download
    └── Gallery View (>5 images)
    │
    ▼
INTENT
    │
    ├── Calculator Complete
    ├── Contact Form Start
    ├── Chat Widget Open
    └── Phone Number View
    │
    ▼
EVALUATION
    │
    ├── Chat Message Sent
    ├── Email Click
    ├── Phone Call Click
    └── Contact Form Submit
    │
    ▼
CONVERSION
    │
    └── Consultation Booked
```

### Funnel Stage Definitions

#### 1. Awareness Stage
- **Definition:** User first interacts with brand
- **Key Events:** `page_view`, `video_start`, `scroll_depth_25`
- **Goal:** Generate interest

#### 2. Interest Stage
- **Definition:** User shows engagement beyond initial visit
- **Key Events:** `video_complete`, `scroll_depth_75`, `cta_click`
- **Goal:** Deepen engagement

#### 3. Consideration Stage
- **Definition:** User actively researching solutions
- **Key Events:** `calculator_step_view`, `quiz_complete`, `lead_magnet_download`
- **Goal:** Provide value, capture lead

#### 4. Intent Stage
- **Definition:** User showing buying signals
- **Key Events:** `calculator_complete`, `form_start`, `chat_widget_open`
- **Goal:** Enable easy contact

#### 5. Evaluation Stage
- **Definition:** User actively reaching out
- **Key Events:** `chat_engagement`, `phone_call_click`, `form_submit`
- **Goal:** Respond quickly

#### 6. Conversion Stage
- **Definition:** User commits to consultation
- **Key Events:** `consultation_booked`
- **Goal:** Book quality appointments

### Micro-Conversion Funnels

#### Calculator Funnel
```
calculator_view → calculator_step_1 → calculator_step_2 → ... → calculator_complete → form_submit
```

#### Lead Magnet Funnel
```
lead_magnet_view → form_start → form_submit → lead_magnet_download → email_nurture_click
```

#### Video Engagement Funnel
```
video_start → video_progress_25 → video_progress_50 → video_progress_75 → video_complete → cta_click
```

---

## Data Layer Specifications

### Standard Data Layer Structure

```javascript
window.dataLayer = window.dataLayer || [];

// Page View
dataLayer.push({
    event: 'page_view',
    page: {
        title: 'Pool Installation Services | Tri-State Aquatic Solutions',
        path: '/services/pool-installation',
        type: 'service_page',
        category: 'services'
    },
    user: {
        status: 'visitor', // or 'lead', 'customer'
        returning: false
    }
});

// Conversion Event
dataLayer.push({
    event: 'generate_lead',
    conversion: {
        type: 'contact_form',
        value: 500,
        currency: 'USD',
        event_id: 'evt_1234567890'
    },
    form: {
        name: 'contact_main',
        service_interest: 'pool_installation',
        location: 'Wayne, PA'
    }
});
```

### Enhanced E-commerce Data Layer

```javascript
// When viewing a service/product
dataLayer.push({
    event: 'view_item',
    ecommerce: {
        items: [{
            item_id: 'plunge_pool_classic',
            item_name: 'Plunge Pool Classic',
            item_category: 'pools',
            item_category2: 'plunge_pools',
            price: 45000,
            currency: 'USD'
        }]
    }
});

// When requesting quote
dataLayer.push({
    event: 'begin_checkout',
    ecommerce: {
        items: [{
            item_id: 'plunge_pool_classic',
            item_name: 'Plunge Pool Classic',
            price: 45000,
            quantity: 1
        }],
        value: 45000,
        currency: 'USD'
    }
});
```

---

## Platform-Specific Event Mapping

### GA4 Event Mapping

| Custom Event | GA4 Recommended Event | Notes |
|--------------|----------------------|-------|
| `contact_form_submit` | `generate_lead` | Mark as conversion |
| `consultation_booked` | `schedule_appointment` | Mark as conversion |
| `lead_magnet_download` | `generate_lead` | Secondary conversion |
| `phone_call_click` | `generate_lead` | Mark as conversion |
| `calculator_complete` | Custom event | Engagement event |

### Facebook Event Mapping

| Custom Event | Facebook Standard Event | Parameters |
|--------------|------------------------|------------|
| `contact_form_submit` | `Lead` | content_name, value |
| `consultation_booked` | `Schedule` | value, currency |
| `lead_magnet_download` | `Lead` | content_name, content_category |
| `phone_call_click` | `Contact` | content_name |
| `quiz_complete` | `CompleteRegistration` | value |

### LinkedIn Event Mapping

| Custom Event | LinkedIn Conversion | Notes |
|--------------|-------------------|-------|
| `contact_form_submit` | Lead | Primary conversion |
| `consultation_booked` | Lead | High-value conversion |
| `phone_call_click` | Lead | Track as lead |

---

## Implementation Checklist

### Required Events (Must Track)

- [ ] `generate_lead` (contact form)
- [ ] `phone_call_click`
- [ ] `consultation_booked`
- [ ] `calculator_complete`
- [ ] `lead_magnet_download`

### Recommended Events (Should Track)

- [ ] `chat_widget_open`
- [ ] `chat_engagement`
- [ ] `video_start`
- [ ] `video_complete`
- [ ] `quiz_complete`
- [ ] `scroll_depth`
- [ ] `cta_click`
- [ ] `email_click`

### Optional Events (Nice to Have)

- [ ] `form_start` (form abandonment tracking)
- [ ] `calculator_step_view`
- [ ] `video_progress` (25%, 50%, 75%)
- [ ] `gallery_view`
- [ ] `testimonial_read`

---

## Maintenance & Review Schedule

| Task | Frequency | Owner |
|------|-----------|-------|
| Verify conversion tracking | Weekly | Marketing |
| Review conversion values | Quarterly | Sales + Marketing |
| Audit event parameters | Monthly | Analytics |
| Test new form tracking | Per deployment | Development |
| Update lead magnet tracking | As added | Marketing |
| Review funnel definitions | Quarterly | Marketing |

---

*Document Version: 1.0*
*Last Updated: February 2024*
*Next Review: May 2024*
