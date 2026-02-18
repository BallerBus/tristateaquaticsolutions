# Google Analytics 4 (GA4) Implementation Guide
## Tri-State Aquatic Solutions

---

## Table of Contents

1. [GA4 Property Setup](#1-ga4-property-setup)
2. [Data Stream Configuration](#2-data-stream-configuration)
3. [Event Naming Conventions](#3-event-naming-conventions)
4. [Conversion Setup](#4-conversion-setup)
5. [Audience Definitions](#5-audience-definitions)
6. [Attribution Settings](#6-attribution-settings)
7. [Data Retention Settings](#7-data-retention-settings)
8. [Google Ads Linking](#8-google-ads-linking)
9. [Search Console Linking](#9-search-console-linking)
10. [Custom Dimensions Setup](#10-custom-dimensions-setup)
11. [Testing & Validation](#11-testing--validation)

---

## 1. GA4 Property Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. In the **Property** column, click **+ Create Property**
4. Enter property details:
   - **Property name**: `Tri-State Aquatic Solutions - Production`
   - **Reporting time zone**: `Eastern Time (US & Canada)`
   - **Currency**: `US Dollar (USD)`
5. Click **Next**

### Step 2: Business Information

1. **Industry category**: `Home & Garden`
2. **Business size**: `Small`
3. **How do you intend to use Google Analytics?**:
   - [x] Get baseline reports
   - [x] Analyze how users interact with my site
   - [x] Optimize my advertising spend
   - [x] Increase my conversions
4. Click **Create**

### Step 3: Accept Terms of Service

1. Select your country
2. Accept the GA4 Terms of Service
3. Accept Data Processing Terms

---

## 2. Data Stream Configuration

### Create Web Data Stream

1. After property creation, select **Web** as platform
2. Enter stream details:
   - **Website URL**: `https://tristateaquaticsolutions.com`
   - **Stream name**: `Tri-State Aquatic Solutions Website`
3. Click **Create stream**

### Record Your Measurement ID

Your Measurement ID will look like: `G-JQEE2JQN7W`

**Save this ID** - you'll need it for all tracking code.

### Enhanced Measurement Settings

In the data stream settings, enable these automatic events:

| Event | Enable | Description |
|-------|--------|-------------|
| Page views | Yes | Track all page views |
| Scrolls | Yes | Track 90% scroll depth |
| Outbound clicks | Yes | Track clicks leaving site |
| Site search | Yes | Track internal searches |
| Video engagement | Yes | Track YouTube embeds |
| File downloads | Yes | Track PDF/doc downloads |
| Form interactions | Yes | Track form start/submit |

**Configure Site Search:**
1. Click the gear icon next to "Site search"
2. Add query parameters: `q, s, search, query`

**Configure Internal Traffic:**
1. Go to Admin > Data Streams > [Your Stream] > Configure tag settings
2. Click "Define internal traffic"
3. Add your office IP addresses to exclude internal visits

---

## 3. Event Naming Conventions

### Standard Event Naming Rules

- Use **snake_case** (lowercase with underscores)
- Maximum 40 characters
- Start with a letter
- No spaces or special characters
- Be descriptive but concise

### Recommended Events for Tri-State Aquatic Solutions

#### Lead Generation Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `generate_lead` | Form submission, quote request | `lead_source`, `pool_type_interest`, `value` |
| `quote_requested` | Quote form submitted | `pool_type`, `estimated_budget`, `timeline` |
| `book_consultation` | Consultation scheduled | `appointment_date`, `consultation_type` |
| `click_to_call` | Phone number clicked | `phone_number`, `cta_location` |
| `click_to_email` | Email link clicked | `email_address`, `cta_location` |

#### Calculator Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `calculator_start` | User begins calculator | `pool_type` |
| `calculator_step` | Each step completed | `step_number`, `step_name`, `selections` |
| `calculator_complete` | Calculator finished | `pool_type`, `estimated_cost`, `features` |

#### Engagement Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `scroll_depth` | Scroll milestones | `percent_scrolled` |
| `time_on_page` | Time milestones | `seconds_on_page`, `time_bucket` |
| `cta_click` | CTA button clicked | `cta_text`, `cta_location`, `cta_destination` |
| `gallery_interaction` | Gallery viewed/zoomed | `action`, `image_category`, `pool_type` |
| `video_start` | Video plays | `video_title`, `video_provider` |
| `video_progress` | Video milestones | `video_title`, `percent_watched` |
| `video_complete` | Video finishes | `video_title`, `video_duration` |

#### Form Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `form_start` | User focuses on form | `form_name` |
| `form_field_interaction` | Field filled | `form_name`, `field_name` |
| `form_submit` | Form submitted | `form_name`, `success` |
| `form_abandonment` | Form abandoned | `form_name`, `last_field`, `percent_complete` |

#### Other Events

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `view_service` | Service page viewed | `service_type` |
| `financing_interest` | Financing page/calculator | `action` |
| `search` | Site search used | `search_term`, `results_count` |
| `customer_stage_change` | Funnel progression | `new_stage`, `primary_interest` |

---

## 4. Conversion Setup

### Mark Events as Conversions

1. Go to **Admin** > **Events**
2. Find each event and toggle "Mark as conversion":

| Event | Conversion Value | Priority |
|-------|-----------------|----------|
| `generate_lead` | $150-500 | High |
| `quote_requested` | $300 | High |
| `book_consultation` | $500 | High |
| `click_to_call` | $200 | High |
| `calculator_complete` | $250 | Medium |
| `form_submit` | $150 | Medium |

### Configure Conversion Values

1. Go to **Admin** > **Conversions**
2. Click on each conversion
3. Enable "Default conversion value"
4. Set values based on lead type:

```
generate_lead: $150 (default)
quote_requested: $300
book_consultation: $500
click_to_call: $200
calculator_complete: $250
```

### Create Conversion Funnels

**Lead Funnel:**
1. `page_view` (homepage or service page)
2. `scroll_depth` (50%+)
3. `cta_click` or `form_start`
4. `form_submit` or `calculator_complete`
5. `generate_lead`

**Consultation Funnel:**
1. `page_view` (any page)
2. `view_service`
3. `cta_click` (get quote)
4. `quote_requested`
5. `book_consultation`

---

## 5. Audience Definitions

### Create These Audiences

#### High-Intent Prospects

**Name**: `High Intent - Quote Seekers`
**Description**: Users who requested quotes or spent significant time on service pages

**Conditions**:
- Include users when ANY of:
  - Event: `quote_requested`
  - Event: `calculator_complete`
  - Event: `click_to_call`
- AND page_view count >= 3 in last 30 days

**Membership duration**: 90 days

---

#### Calculator Users

**Name**: `Calculator Users - Not Converted`
**Description**: Users who used calculator but haven't submitted a form

**Conditions**:
- Include users when:
  - Event: `calculator_complete`
- Exclude users when:
  - Event: `generate_lead`

**Membership duration**: 30 days

---

#### Service Page Engagers

**Name**: `Engaged Service Visitors`
**Description**: Users who viewed service pages with high engagement

**Conditions**:
- Include users when:
  - Event: `view_service`
  - AND Event: `scroll_depth` with `percent_scrolled` >= 75

**Membership duration**: 60 days

---

#### Past Leads (Remarketing)

**Name**: `Past Leads - Follow Up`
**Description**: Users who submitted leads but may need follow-up

**Conditions**:
- Include users when:
  - Event: `generate_lead` occurred 14-90 days ago

**Membership duration**: 90 days

---

#### Inground Pool Interest

**Name**: `Inground Pool Interest`
**Description**: Users interested in inground pools

**Conditions**:
- Include users when:
  - User property: `primary_interest` = `inground_pool`
  - OR Event: `view_service` with `service_type` contains `inground`

**Membership duration**: 180 days

---

#### Video Engagers

**Name**: `Video Viewers - High Engagement`
**Description**: Users who watched videos to completion

**Conditions**:
- Include users when:
  - Event: `video_complete`

**Membership duration**: 60 days

---

#### Cart Abandoners (Calculator)

**Name**: `Calculator Abandoners`
**Description**: Started but didn't complete calculator

**Conditions**:
- Include users when:
  - Event: `calculator_step`
- Exclude users when:
  - Event: `calculator_complete`

**Membership duration**: 14 days

---

## 6. Attribution Settings

### Configure Attribution Model

1. Go to **Admin** > **Attribution Settings**

### Recommended Settings:

**Reporting attribution model**: `Data-driven`
- Uses machine learning to attribute conversions
- Best for understanding true channel value

**Lookback window**:
- **Acquisition events**: 90 days
- **All other events**: 30 days

**Why these settings:**
- Pool purchases are high-consideration with long decision cycles
- 90-day acquisition window captures the full research phase
- Data-driven model accounts for multi-touch journeys

### Alternative: If Data-Driven Not Available

If you don't have enough conversion data for data-driven attribution:

**Use**: `Position-based` (40/20/40)
- 40% credit to first interaction
- 20% credit to middle interactions
- 40% credit to last interaction

---

## 7. Data Retention Settings

### Configure Data Retention

1. Go to **Admin** > **Data Settings** > **Data Retention**

**Recommended Settings**:

| Setting | Value | Reason |
|---------|-------|--------|
| Event data retention | 14 months | Maximum allowed; preserves historical data |
| Reset user data on new activity | ON | Extends retention for active users |

### User Data Deletion

For GDPR/CCPA compliance, know how to delete user data:

1. Go to **Admin** > **Data Settings** > **Data Deletion**
2. You can delete data by:
   - User ID
   - Client ID
   - Date range

---

## 8. Google Ads Linking

### Link GA4 to Google Ads

1. Go to **Admin** > **Product Links** > **Google Ads Links**
2. Click **Link**
3. Select your Google Ads account
4. Enable these settings:
   - [x] Enable personalized advertising
   - [x] Enable auto-tagging
5. Click **Next** and **Submit**

### Import Conversions to Google Ads

After linking:

1. In Google Ads, go to **Tools & Settings** > **Conversions**
2. Click **+ New conversion action**
3. Select **Import** > **Google Analytics 4 properties**
4. Select your GA4 property
5. Import these conversions:
   - `generate_lead`
   - `quote_requested`
   - `book_consultation`
   - `click_to_call`
   - `calculator_complete`

### Enable Audiences in Google Ads

1. In GA4, go to **Admin** > **Product Links** > **Google Ads Links**
2. Click on your linked account
3. Enable **Enable Advertising Features**
4. In Google Ads, audiences will appear under **Audience Manager**

---

## 9. Search Console Linking

### Link GA4 to Search Console

1. Go to **Admin** > **Product Links** > **Search Console Links**
2. Click **Link**
3. Select your Search Console property
4. Select your web data stream
5. Click **Submit**

### Benefits of Search Console Link

- See organic search queries in GA4
- Understand which queries drive conversions
- Compare landing page performance

### View Search Console Data

After linking (24-48 hours):

1. Go to **Reports** > **Acquisition** > **Acquisition overview**
2. Click **View Google organic search queries**

---

## 10. Custom Dimensions Setup

### Create Custom Dimensions in GA4

1. Go to **Admin** > **Custom Definitions** > **Custom Dimensions**
2. Click **Create custom dimension**

### Event-Scoped Dimensions to Create

| Dimension Name | Event Parameter | Scope | Description |
|----------------|-----------------|-------|-------------|
| Lead Source | `lead_source` | Event | Traffic source of lead |
| Pool Type Interest | `pool_type_interest` | Event | Type of pool interested in |
| Pool Size Category | `pool_size_category` | Event | Size category (small/medium/large) |
| Service Area | `service_area` | Event | Geographic region |
| Budget Range | `budget_range` | Event | Estimated budget tier |
| Project Timeline | `project_timeline` | Event | When they want to start |
| Form Name | `form_name` | Event | Name of form submitted |
| CTA Location | `cta_location` | Event | Where CTA was clicked |
| Calculator Step | `calculator_step` | Event | Step in calculator flow |

### User-Scoped Dimensions to Create

| Dimension Name | User Property | Scope | Description |
|----------------|---------------|-------|-------------|
| Customer Stage | `customer_stage` | User | Funnel stage (visitor/lead/customer) |
| First Touch Source | `first_touch_source` | User | Original acquisition source |
| Primary Interest | `primary_interest` | User | Main service interest |

### Create Each Dimension

For each dimension:

1. Click **Create custom dimension**
2. **Dimension name**: [Name from table]
3. **Scope**: Event or User (as specified)
4. **Event parameter** or **User property**: [Parameter from table]
5. Click **Save**

---

## 11. Testing & Validation

### Enable Debug Mode

Add this temporarily to test:

```javascript
gtag('config', 'G-JQEE2JQN7W', {
  'debug_mode': true
});
```

### Use DebugView

1. Go to **Admin** > **DebugView**
2. Navigate your site in a separate tab
3. Watch events appear in real-time

### Verify Checklist

**Basic Tracking:**
- [ ] Page views recording correctly
- [ ] Page titles accurate
- [ ] Session data flowing

**Enhanced Measurement:**
- [ ] Scroll events firing at 90%
- [ ] Outbound clicks tracking
- [ ] File downloads tracking
- [ ] Form start/submit tracking

**Custom Events:**
- [ ] CTA clicks recording
- [ ] Phone clicks recording
- [ ] Calculator events flowing
- [ ] Form submissions tracking

**Custom Dimensions:**
- [ ] Lead source populating
- [ ] Pool type interest recording
- [ ] Service area tracking

**User Properties:**
- [ ] Customer stage updating
- [ ] First touch source persisting

**Conversions:**
- [ ] generate_lead marked as conversion
- [ ] Values passing correctly

### Google Tag Assistant

1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Enable on your site
3. Verify tags are firing correctly

### Real-Time Reports

1. Go to **Reports** > **Real-time**
2. Navigate your site
3. Verify:
   - Users showing
   - Events appearing
   - Conversions counting

---

## Quick Reference: Measurement Protocol

For server-side events (if needed):

```bash
POST https://www.google-analytics.com/mp/collect?measurement_id=G-JQEE2JQN7W&api_secret=YOUR_API_SECRET

{
  "client_id": "CLIENT_ID",
  "events": [{
    "name": "generate_lead",
    "params": {
      "lead_source": "phone",
      "value": 200,
      "currency": "USD"
    }
  }]
}
```

---

## Support & Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)
- [GA4 Custom Dimensions](https://support.google.com/analytics/answer/10075209)
- [GA4 Audiences](https://support.google.com/analytics/answer/9267572)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026 | Initial implementation guide |

---

*Document prepared for Tri-State Aquatic Solutions*
