# Tri-State Aquatic Solutions
## Comprehensive Analytics & Tracking Implementation Plan

**Last Updated:** February 2026
**Version:** 1.0
**Website:** tristateaquaticsolutions.com
**Business Type:** Pool Installation (Fiberglass, Concrete, Plunge Pools)
**Service Area:** Main Line PA & Northern Delaware

---

## Table of Contents

1. [Google Analytics 4 Setup](#1-google-analytics-4-setup)
2. [Event Tracking Plan](#2-event-tracking-plan)
3. [Conversion Tracking](#3-conversion-tracking)
4. [Google Tag Manager Container](#4-google-tag-manager-container)
5. [Custom Dashboards](#5-custom-dashboards)
6. [UTM Parameter Strategy](#6-utm-parameter-strategy)
7. [Call Tracking Setup](#7-call-tracking-setup)
8. [CRM Integration](#8-crm-integration)

---

## 1. Google Analytics 4 Setup

### Account Structure

```
Account: Dude Venture Services LLC
├── Property: Tri-State Aquatic Solutions (Production)
│   ├── Data Stream: Web - tristateaquaticsolutions.com
│   └── Data Stream: Web - tristateaquatic.com (redirect domain)
└── Property: Tri-State Aquatic Solutions (Staging) [Optional]
    └── Data Stream: Web - staging.tristateaquaticsolutions.com
```

### Property Configuration

#### Basic Settings
| Setting | Value |
|---------|-------|
| Property Name | Tri-State Aquatic Solutions - Production |
| Industry Category | Home & Garden |
| Business Size | Small |
| Reporting Time Zone | America/New_York (Eastern) |
| Currency | USD |

#### Data Collection Settings
| Setting | Recommended Value |
|---------|-------------------|
| Google Signals | Enable |
| User-ID | Enable (when CRM connected) |
| Granular Location | Enable |
| Device Data | Enable |
| Session Timeout | 30 minutes |
| Engaged Sessions Timer | 10 seconds |

#### Data Retention Settings
| Setting | Value |
|---------|-------|
| Event Data Retention | 14 months |
| User Data Retention | 14 months |
| Reset on New Activity | Yes |

### Data Streams Setup

#### Primary Web Stream Configuration
```
Stream Name: tristateaquaticsolutions.com
Stream URL: https://tristateaquaticsolutions.com
Stream ID: [Auto-generated]
Measurement ID: G-XXXXXXXXXX
```

#### Enhanced Measurement Settings

| Feature | Status | Notes |
|---------|--------|-------|
| Page views | ON | Track all page views automatically |
| Scrolls | ON | Fire at 90% scroll depth |
| Outbound clicks | ON | Track all external links |
| Site search | ON | Query parameter: `q`, `s`, `search` |
| Video engagement | ON | YouTube embeds, HTML5 video |
| File downloads | ON | Extensions: pdf, doc, docx, xls, xlsx, zip |
| Form interactions | OFF | Custom implementation for better control |

### Internal Traffic Filters

Create filters to exclude:
1. Office IP addresses
2. Developer/agency IP addresses
3. Bryce's home IP address

```
Filter Name: Exclude Internal Traffic
Filter Type: Data Filter - Internal Traffic
Parameter: traffic_type
Value: internal
```

### Referral Exclusions

Add these domains to prevent self-referrals:
- tristateaquaticsolutions.com
- tristateaquatic.com
- calendly.com (if using for scheduling)
- Payment processor domains (if applicable)

---

## 2. Event Tracking Plan

### Event Naming Convention

**Format:** `category_action_label`

- Use snake_case
- Keep names under 40 characters
- Be descriptive but concise

### Core Events

#### 2.1 Page Views (Automatic + Enhanced)

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `page_view` | `page_location`, `page_title`, `page_referrer` | Every page load | Auto (GA4) |

**Custom Parameters to Add:**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'page_location': window.location.href,
  'page_title': document.title,
  'page_type': 'service|location|blog|tool|landing',
  'service_area': 'main-line-pa|northern-de|both',
  'pool_type': 'fiberglass|concrete|plunge|none'
});
```

#### 2.2 Scroll Depth Tracking

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `scroll_depth` | `percent_scrolled`, `page_location` | 25%, 50%, 75%, 90%, 100% | GTM |

**Implementation:**
```javascript
// GTM Custom HTML Tag
window.dataLayer = window.dataLayer || [];
var scrollMarks = [25, 50, 75, 90, 100];
var scrollMarksReached = [];

window.addEventListener('scroll', function() {
  var scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

  scrollMarks.forEach(function(mark) {
    if (scrollPercent >= mark && scrollMarksReached.indexOf(mark) === -1) {
      scrollMarksReached.push(mark);
      dataLayer.push({
        'event': 'scroll_depth',
        'percent_scrolled': mark,
        'page_location': window.location.pathname
      });
    }
  });
});
```

#### 2.3 Form Submissions

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `form_submit_contact` | `form_id`, `form_location`, `lead_type` | Contact form submit | GTM |
| `form_submit_consultation` | `form_id`, `form_location`, `pool_type` | Consultation form | GTM |
| `form_submit_quote` | `form_id`, `form_location`, `estimated_value` | Quote request form | GTM |
| `form_submit_newsletter` | `form_id`, `form_location` | Newsletter signup | GTM |
| `form_submit_exit_popup` | `offer_type`, `page_location` | Exit intent popup | GTM |
| `form_submit_calculator` | `calculator_type`, `email_captured` | Calculator email capture | GTM |
| `form_submit_quiz` | `quiz_completed`, `recommended_pool` | Quiz lead capture | GTM |

**Contact Form Data Layer Push:**
```javascript
// Add to form submission handler
dataLayer.push({
  'event': 'form_submit_contact',
  'form_id': 'main-contact-form',
  'form_location': window.location.pathname,
  'lead_type': 'consultation|quote|general',
  'service_interest': selectedService,
  'location': userZipCode
});
```

#### 2.4 Button Clicks (CTAs)

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `cta_click` | `cta_text`, `cta_location`, `cta_destination`, `cta_type` | CTA button click | GTM |

**CTA Types:**
- `primary_hero` - Main hero section CTA
- `secondary_hero` - Secondary hero CTA
- `sticky_mobile` - Mobile sticky CTA bar
- `navbar` - Navigation CTA
- `section_cta` - In-page section CTAs
- `footer_cta` - Footer contact CTA
- `popup_cta` - Popup/modal CTAs

**Implementation:**
```javascript
// Add data attributes to CTA buttons
<button
  class="cta-btn"
  data-cta-text="Get Free Consultation"
  data-cta-location="hero"
  data-cta-type="primary_hero"
>Get Free Consultation</button>

// GTM Tag for CTA clicks
dataLayer.push({
  'event': 'cta_click',
  'cta_text': element.dataset.ctaText,
  'cta_location': element.dataset.ctaLocation,
  'cta_destination': element.href || 'same-page',
  'cta_type': element.dataset.ctaType
});
```

#### 2.5 Phone Number Clicks

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `click_phone` | `phone_number`, `click_location`, `page_type` | tel: link click | GTM |

**Implementation:**
```javascript
// GTM Trigger: Click - Just Links
// Trigger fires on: Click URL contains "tel:"

dataLayer.push({
  'event': 'click_phone',
  'phone_number': '(302) 555-1234',
  'click_location': 'header|footer|contact-page|sticky-cta',
  'page_type': document.body.dataset.pageType
});
```

#### 2.6 Email Clicks

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `click_email` | `email_address`, `click_location` | mailto: link click | GTM |

**Implementation:**
```javascript
// GTM Trigger: Click - Just Links
// Trigger fires on: Click URL contains "mailto:"

dataLayer.push({
  'event': 'click_email',
  'email_address': 'info@tristateaquatic.com',
  'click_location': 'header|footer|contact-page'
});
```

#### 2.7 PDF Downloads

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `file_download` | `file_name`, `file_extension`, `file_category`, `link_url` | .pdf link click | GTM |

**File Categories:**
- `brochure` - Company/service brochures
- `buyers_guide` - Pool buyers guide
- `checklist` - Pool planning checklist
- `pricing` - Pricing information
- `warranty` - Warranty documents
- `permit_info` - Permit requirements
- `maintenance` - Maintenance guides

**Implementation:**
```javascript
dataLayer.push({
  'event': 'file_download',
  'file_name': 'pool-buyers-guide-2026.pdf',
  'file_extension': 'pdf',
  'file_category': 'buyers_guide',
  'link_url': '/resources/pool-buyers-guide.pdf'
});
```

#### 2.8 Video Plays

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `video_start` | `video_title`, `video_provider`, `video_url`, `video_duration` | Video play initiated | GTM |
| `video_progress` | `video_title`, `video_percent`, `video_current_time` | 25%, 50%, 75%, 100% | GTM |
| `video_complete` | `video_title`, `video_duration` | Video ended | GTM |

**For YouTube Embeds:**
```javascript
// Enable YouTube API in GTM (Built-in Variables)
// Create YouTube Video trigger

dataLayer.push({
  'event': 'video_start',
  'video_title': {{Video Title}},
  'video_provider': 'youtube',
  'video_url': {{Video URL}},
  'video_duration': {{Video Duration}}
});
```

**For HTML5 Videos:**
```javascript
// Add to custom video player
document.querySelectorAll('video').forEach(function(video) {
  video.addEventListener('play', function() {
    dataLayer.push({
      'event': 'video_start',
      'video_title': this.dataset.title || 'Unknown',
      'video_provider': 'html5',
      'video_duration': Math.round(this.duration)
    });
  });
});
```

#### 2.9 Calculator Interactions

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `calculator_start` | `calculator_type`, `page_location` | Calculator opened/first interaction | GTM |
| `calculator_step` | `calculator_type`, `step_number`, `step_name`, `step_value` | Each step completed | GTM |
| `calculator_complete` | `calculator_type`, `estimated_cost`, `pool_type`, `pool_size`, `features_selected` | Final calculation shown | GTM |
| `calculator_email_capture` | `calculator_type`, `estimated_cost`, `email_provided` | User provides email for detailed quote | GTM |

**Calculator Types:**
- `pool_cost` - Main pool cost calculator
- `financing` - Financing calculator
- `roi` - Pool value ROI calculator

**Implementation (Pool Calculator):**
```javascript
// Calculator start
dataLayer.push({
  'event': 'calculator_start',
  'calculator_type': 'pool_cost',
  'page_location': window.location.pathname
});

// Step completion
dataLayer.push({
  'event': 'calculator_step',
  'calculator_type': 'pool_cost',
  'step_number': 1,
  'step_name': 'pool_type',
  'step_value': 'fiberglass'
});

// Final result
dataLayer.push({
  'event': 'calculator_complete',
  'calculator_type': 'pool_cost',
  'estimated_cost': 65000,
  'pool_type': 'fiberglass',
  'pool_size': 'medium',
  'features_selected': ['spa', 'lighting', 'automation']
});
```

#### 2.10 Quiz Completions

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `quiz_start` | `quiz_name`, `page_location` | Quiz started | GTM |
| `quiz_question_answer` | `quiz_name`, `question_number`, `question_text`, `answer_selected` | Each question answered | GTM |
| `quiz_complete` | `quiz_name`, `result_type`, `recommended_pool`, `total_time_seconds` | Quiz finished | GTM |
| `quiz_lead_capture` | `quiz_name`, `result_type`, `email_provided` | User provides contact info | GTM |
| `quiz_abandon` | `quiz_name`, `last_question_completed`, `time_spent` | User leaves mid-quiz | GTM |

**Implementation:**
```javascript
// Quiz start
dataLayer.push({
  'event': 'quiz_start',
  'quiz_name': 'pool_type_finder',
  'page_location': '/tools/pool-quiz/'
});

// Question answered
dataLayer.push({
  'event': 'quiz_question_answer',
  'quiz_name': 'pool_type_finder',
  'question_number': 3,
  'question_text': 'What is your primary use for the pool?',
  'answer_selected': 'family_recreation'
});

// Quiz complete
dataLayer.push({
  'event': 'quiz_complete',
  'quiz_name': 'pool_type_finder',
  'result_type': 'fiberglass_recommended',
  'recommended_pool': 'fiberglass',
  'total_time_seconds': 145
});
```

#### 2.11 Chat Widget Opens

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `chat_widget_open` | `trigger_type`, `page_location`, `time_on_page` | Chat bubble clicked | GTM |
| `chat_message_sent` | `message_type`, `page_location` | User sends message | GTM |
| `chat_conversation_complete` | `duration_seconds`, `messages_exchanged`, `outcome` | Chat ended | GTM |

**Trigger Types:**
- `user_initiated` - User clicked chat button
- `proactive` - Auto-opened based on behavior
- `exit_intent` - Opened on exit intent

**Implementation:**
```javascript
// Most chat widgets provide callback functions
// Example for common chat platforms:

// Tawk.to
Tawk_API.onChatStarted = function(){
  dataLayer.push({
    'event': 'chat_widget_open',
    'trigger_type': 'user_initiated',
    'page_location': window.location.pathname
  });
};

// Drift
drift.on('startConversation', function() {
  dataLayer.push({
    'event': 'chat_widget_open',
    'trigger_type': 'user_initiated',
    'page_location': window.location.pathname
  });
});
```

#### 2.12 Outbound Link Clicks

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `outbound_click` | `link_url`, `link_domain`, `link_text`, `click_location` | External link clicked | GTM |

**Implementation:**
```javascript
// GTM Trigger: Click - Just Links
// Trigger condition: Click URL does not contain tristateaquatic

dataLayer.push({
  'event': 'outbound_click',
  'link_url': {{Click URL}},
  'link_domain': {{Click URL Hostname}},
  'link_text': {{Click Text}},
  'click_location': 'header|body|footer|sidebar'
});
```

### Additional Engagement Events

#### 2.13 Gallery Interactions

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `gallery_view` | `gallery_type`, `image_count` | Gallery opened | GTM |
| `gallery_image_view` | `image_name`, `image_category`, `image_position` | Image viewed | GTM |
| `gallery_image_enlarge` | `image_name`, `image_category` | Lightbox opened | GTM |

#### 2.14 Social Shares

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `social_share` | `platform`, `content_type`, `content_url` | Share button clicked | GTM |

**Platforms:** facebook, twitter, pinterest, linkedin, email, copy_link

#### 2.15 Navigation Events

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `menu_open` | `menu_type` | Mobile menu opened | GTM |
| `mega_menu_hover` | `menu_section` | Mega menu dropdown viewed | GTM |
| `breadcrumb_click` | `breadcrumb_text`, `breadcrumb_position` | Breadcrumb clicked | GTM |

#### 2.16 Content Engagement

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `accordion_expand` | `accordion_title`, `section_name` | FAQ/accordion opened | GTM |
| `tab_click` | `tab_name`, `tab_section` | Tab switched | GTM |
| `testimonial_view` | `testimonial_id`, `author_name`, `pool_type` | Testimonial carousel view | GTM |

#### 2.17 Error Tracking

| Event Name | Parameters | Trigger | Method |
|------------|------------|---------|--------|
| `form_error` | `form_id`, `error_field`, `error_message` | Form validation error | GTM |
| `page_not_found` | `requested_url`, `referrer` | 404 page viewed | GTM |
| `js_error` | `error_message`, `error_source`, `error_line` | JavaScript error | GTM |

---

## 3. Conversion Tracking

### Goal Definitions

#### Primary Conversions (High Value)

| Conversion Name | Event | Value | Description |
|-----------------|-------|-------|-------------|
| Consultation Request | `form_submit_consultation` | $500 | Direct high-intent lead |
| Phone Call | `click_phone` | $200 | High-intent engagement |
| Quote Request | `form_submit_quote` | $300 | Project inquiry |
| Live Chat Initiated | `chat_widget_open` | $100 | Engaged visitor |

#### Secondary Conversions (Medium Value)

| Conversion Name | Event | Value | Description |
|-----------------|-------|-------|-------------|
| Calculator Completion | `calculator_complete` | $75 | Engaged prospect |
| Quiz Completion | `quiz_complete` | $75 | Qualified lead indicator |
| Email Captured | `form_submit_newsletter` | $25 | Nurture opportunity |
| Exit Popup Conversion | `form_submit_exit_popup` | $50 | Recovered lead |

#### Micro Conversions (Engagement)

| Conversion Name | Event | Value | Description |
|-----------------|-------|-------|-------------|
| PDF Download | `file_download` | $10 | Research stage |
| Video Complete | `video_complete` | $15 | Deep engagement |
| Gallery View | `gallery_view` | $5 | Visual interest |
| Deep Scroll | `scroll_depth` (90%+) | $5 | Content engagement |

### GA4 Conversion Setup

In GA4 Admin > Events > Mark as conversion:

```
Priority 1 (Primary):
☑ form_submit_consultation
☑ form_submit_quote
☑ click_phone
☑ chat_widget_open

Priority 2 (Secondary):
☑ calculator_complete
☑ quiz_lead_capture
☑ form_submit_newsletter
☑ file_download (for buyers guide specifically)

Priority 3 (Micro):
☑ calculator_start
☑ quiz_start
```

### Conversion Values

**Dynamic Value Implementation:**
```javascript
// For calculator completions, pass the estimated project value
gtag('event', 'calculator_complete', {
  'value': estimatedCost * 0.01, // 1% of project as lead value
  'currency': 'USD'
});

// Example: $65,000 pool = $650 lead value
```

### Attribution Settings

#### GA4 Attribution Model Settings
| Setting | Recommended |
|---------|-------------|
| Reporting Attribution Model | Data-driven |
| Lookback Window (acquisition) | 30 days |
| Lookback Window (other conversions) | 90 days |

#### Attribution Analysis Strategy

Track these paths for pool installation leads (long sales cycle):
1. First touch (awareness)
2. Last touch (conversion)
3. Full path (all touchpoints)

**Custom Attribution Report Dimensions:**
- Source/Medium combinations
- Device category
- Location (city/region)
- Landing page
- Pool type interest

### Cross-Domain Tracking

**Domains to Link:**
- tristateaquaticsolutions.com (primary)
- tristateaquatic.com (redirect)
- calendly.com (if using for scheduling)
- Any payment processor used

**GTM Implementation:**
```javascript
// GA4 Configuration Tag - Fields to Set
{
  "linker": {
    "domains": ["tristateaquaticsolutions.com", "tristateaquatic.com", "calendly.com"]
  }
}
```

---

## 4. Google Tag Manager Container

### Container Structure

```
GTM Account: Dude Venture Services LLC
└── Container: Tri-State Aquatic Solutions Web
    ├── Container ID: GTM-XXXXXXX
    └── Container Type: Web
```

### Tags to Implement

#### Analytics Tags

| Tag Name | Tag Type | Trigger | Priority |
|----------|----------|---------|----------|
| GA4 - Configuration | Google Analytics: GA4 Configuration | All Pages | 1 |
| GA4 - Page View | Google Analytics: GA4 Event | All Pages | 1 |
| GA4 - Scroll Depth | Google Analytics: GA4 Event | Scroll Depth Trigger | 2 |
| GA4 - Form Submissions | Google Analytics: GA4 Event | Form Submit Success | 1 |
| GA4 - CTA Clicks | Google Analytics: GA4 Event | CTA Click Trigger | 2 |
| GA4 - Phone Clicks | Google Analytics: GA4 Event | Tel Link Click | 1 |
| GA4 - Email Clicks | Google Analytics: GA4 Event | Mailto Link Click | 2 |
| GA4 - File Downloads | Google Analytics: GA4 Event | File Download Trigger | 2 |
| GA4 - Video Events | Google Analytics: GA4 Event | YouTube/Video Triggers | 2 |
| GA4 - Calculator Events | Google Analytics: GA4 Event | Calculator Triggers | 1 |
| GA4 - Quiz Events | Google Analytics: GA4 Event | Quiz Triggers | 1 |
| GA4 - Chat Events | Google Analytics: GA4 Event | Chat Triggers | 1 |
| GA4 - Outbound Clicks | Google Analytics: GA4 Event | Outbound Link Trigger | 3 |

#### Marketing Tags

| Tag Name | Tag Type | Trigger | Priority |
|----------|----------|---------|----------|
| Google Ads - Conversion Tracking | Google Ads Conversion | Conversion Events | 1 |
| Google Ads - Remarketing | Google Ads Remarketing | All Pages | 2 |
| Facebook Pixel - Base | Custom HTML | All Pages | 2 |
| Facebook Pixel - Events | Custom HTML | Conversion Events | 2 |
| Microsoft Ads UET | Custom HTML | All Pages | 3 |
| LinkedIn Insight | Custom HTML | All Pages | 3 |
| Pinterest Tag | Custom HTML | All Pages (optional) | 3 |

#### Utility Tags

| Tag Name | Tag Type | Trigger | Priority |
|----------|----------|---------|----------|
| Hotjar Tracking | Custom HTML | All Pages | 3 |
| Google Optimize | Google Optimize | All Pages (before GA4) | 1 |
| Call Tracking DNI | Custom HTML | All Pages | 2 |

### Triggers to Create

#### Built-in Triggers
- All Pages (Page View)
- All Links (Click - Just Links)
- All Elements (Click - All Elements)
- DOM Ready
- Window Loaded

#### Custom Triggers

| Trigger Name | Type | Conditions |
|--------------|------|------------|
| Form Submit - Contact | Custom Event | event = form_submit_contact |
| Form Submit - Consultation | Custom Event | event = form_submit_consultation |
| Form Submit - Quote | Custom Event | event = form_submit_quote |
| Form Submit - All | Custom Event | event matches regex form_submit_.* |
| CTA Click | Click - All Elements | Click Classes contains cta-btn OR data-cta-type exists |
| Phone Link Click | Click - Just Links | Click URL contains tel: |
| Email Link Click | Click - Just Links | Click URL contains mailto: |
| File Download | Click - Just Links | Click URL matches regex \.(pdf|doc|docx|xls|xlsx|zip)$ |
| Outbound Link Click | Click - Just Links | Click URL does not contain tristateaquatic |
| Scroll Depth - 25% | Scroll Depth | Vertical - 25 Percent |
| Scroll Depth - 50% | Scroll Depth | Vertical - 50 Percent |
| Scroll Depth - 75% | Scroll Depth | Vertical - 75 Percent |
| Scroll Depth - 90% | Scroll Depth | Vertical - 90 Percent |
| YouTube Video - Start | YouTube Video | Start |
| YouTube Video - Progress | YouTube Video | 25%, 50%, 75%, 100% |
| YouTube Video - Complete | YouTube Video | Complete |
| Calculator Start | Custom Event | event = calculator_start |
| Calculator Complete | Custom Event | event = calculator_complete |
| Quiz Start | Custom Event | event = quiz_start |
| Quiz Complete | Custom Event | event = quiz_complete |
| Chat Open | Custom Event | event = chat_widget_open |
| Exit Intent | Custom HTML | (exit intent detection script) |

### Variables to Create

#### Built-in Variables to Enable
- Page URL
- Page Path
- Page Hostname
- Page Title
- Referrer
- Click URL
- Click Text
- Click Classes
- Click ID
- Click Target
- Click Element
- Form ID
- Form Classes
- Form Target
- Video Title
- Video URL
- Video Duration
- Video Current Time
- Video Percent
- Scroll Depth Threshold
- Scroll Depth Units

#### Custom Variables

| Variable Name | Type | Purpose |
|---------------|------|---------|
| DLV - event_category | Data Layer Variable | Event categorization |
| DLV - event_action | Data Layer Variable | Event action |
| DLV - event_label | Data Layer Variable | Event label |
| DLV - form_id | Data Layer Variable | Form identification |
| DLV - lead_type | Data Layer Variable | Lead qualification |
| DLV - calculator_type | Data Layer Variable | Calculator tracking |
| DLV - estimated_cost | Data Layer Variable | Lead value |
| DLV - pool_type | Data Layer Variable | Product interest |
| DLV - quiz_result | Data Layer Variable | Quiz outcome |
| CJS - Page Type | Custom JavaScript | Returns page type based on URL |
| CJS - Service Area | Custom JavaScript | Determines service area from URL |
| CJS - User ID | Custom JavaScript | Returns user ID if set |
| Lookup - Page Type | Lookup Table | Maps URLs to page types |
| RegEx - Extract File Name | RegEx Table | Extracts filename from URL |
| Const - GA4 Measurement ID | Constant | G-XXXXXXXXXX |

**Custom JavaScript - Page Type:**
```javascript
function() {
  var path = {{Page Path}};
  if (path === '/') return 'homepage';
  if (path.indexOf('/pools/') > -1) return 'pool-type';
  if (path.indexOf('/services/') > -1) return 'service';
  if (path.indexOf('/locations/') > -1) return 'location';
  if (path.indexOf('/blog/') > -1) return 'blog';
  if (path.indexOf('/tools/') > -1) return 'tool';
  if (path.indexOf('/contact') > -1) return 'contact';
  if (path.indexOf('/gallery') > -1) return 'gallery';
  if (path.indexOf('/about') > -1) return 'about';
  if (path.indexOf('/testimonials') > -1) return 'testimonials';
  if (path.indexOf('/resources') > -1) return 'resources';
  if (path.indexOf('/landing/') > -1) return 'landing';
  return 'other';
}
```

### Folder Organization

```
GTM Folders:
├── 01 - Configuration
│   ├── GA4 - Configuration
│   └── Consent Mode Tags
├── 02 - Page View Tracking
│   ├── GA4 - Page View
│   └── Virtual Page Views
├── 03 - Event Tracking
│   ├── Scroll Events
│   ├── Click Events
│   ├── Form Events
│   └── Video Events
├── 04 - Conversion Tracking
│   ├── Lead Generation
│   ├── Phone Calls
│   └── Engagements
├── 05 - Advertising
│   ├── Google Ads
│   ├── Facebook
│   ├── Microsoft Ads
│   └── LinkedIn
├── 06 - User Experience
│   ├── Hotjar
│   └── Google Optimize
├── 07 - Utility
│   ├── Call Tracking
│   ├── Error Tracking
│   └── Debug Tags
└── 99 - Deprecated
    └── (Old tags for reference)
```

---

## 5. Custom Dashboards

### KPIs to Track

#### Business KPIs
| KPI | Target | Measurement |
|-----|--------|-------------|
| Leads Generated | 15-20/month | Form submissions + phone calls + chat |
| Lead Quality Score | 60%+ qualified | Quiz completions + calculator users |
| Cost Per Lead | <$150 | Marketing spend / leads |
| Lead to Consultation | 50%+ | Consultations / leads |
| Website Conversion Rate | 3-5% | Conversions / sessions |

#### Engagement KPIs
| KPI | Target | Measurement |
|-----|--------|-------------|
| Average Session Duration | >3 minutes | Time on site |
| Pages Per Session | >2.5 | Pageviews / sessions |
| Bounce Rate | <50% | Single page sessions |
| Return Visitor Rate | 25%+ | Returning / total users |
| Calculator Completion Rate | 40%+ | Completions / starts |
| Quiz Completion Rate | 60%+ | Completions / starts |

#### Traffic KPIs
| KPI | Target | Measurement |
|-----|--------|-------------|
| Organic Traffic Growth | +10%/month | Google/organic sessions |
| Local Search Visibility | Top 3 map pack | Local search impressions |
| Referral Traffic | 15%+ | Referral sessions |
| Direct Traffic | 20%+ | Direct sessions |

### Dashboard Layouts

#### Executive Dashboard (Weekly Review)

```
┌─────────────────────────────────────────────────────────────────┐
│  LEADS THIS WEEK                              vs Last Week      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │   12    │  │    8    │  │    3    │  │   23    │           │
│  │ Forms   │  │ Calls   │  │ Chats   │  │ TOTAL   │           │
│  │  +20%   │  │  +5%    │  │  -10%   │  │  +12%   │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
├─────────────────────────────────────────────────────────────────┤
│  LEAD SOURCES (This Week)                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Google Organic    ███████████████░░░░  45%              │   │
│  │  Google Ads        ██████████░░░░░░░░░  28%              │   │
│  │  Direct            ████████░░░░░░░░░░░  15%              │   │
│  │  Social            ███░░░░░░░░░░░░░░░░   8%              │   │
│  │  Referral          ██░░░░░░░░░░░░░░░░░   4%              │   │
│  └──────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  TOP LANDING PAGES                │  TOP SERVICE INTERESTS      │
│  1. /pools/fiberglass/ (32%)      │  1. Fiberglass Pools (45%)  │
│  2. Homepage (28%)                │  2. Plunge Pools (30%)      │
│  3. /locations/gladwyne-pa/ (15%) │  3. Concrete Pools (20%)    │
│  4. /tools/pool-calculator/ (12%) │  4. Maintenance (5%)        │
│  5. /contact/ (13%)               │                             │
├─────────────────────────────────────────────────────────────────┤
│  CONVERSION FUNNEL                                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Sessions  ─→  Engaged  ─→  Tool Use  ─→  Lead  ─→  Sale │   │
│  │    1,250      890 (71%)    245 (28%)    23 (9%)    2     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### Marketing Dashboard (Campaign Performance)

```
┌─────────────────────────────────────────────────────────────────┐
│  CHANNEL PERFORMANCE (Last 30 Days)                             │
├───────────────┬──────────┬─────────┬─────────┬────────┬────────┤
│ Channel       │ Sessions │  Leads  │   CVR   │  CPL   │  ROI   │
├───────────────┼──────────┼─────────┼─────────┼────────┼────────┤
│ Google Organic│   3,450  │    42   │  1.2%   │   $0   │   --   │
│ Google Ads    │   1,890  │    28   │  1.5%   │  $125  │  3.2x  │
│ Facebook Ads  │     780  │     8   │  1.0%   │  $187  │  1.8x  │
│ Direct        │   1,200  │    15   │  1.3%   │   $0   │   --   │
│ Referral      │     450  │     6   │  1.3%   │   $0   │   --   │
├───────────────┼──────────┼─────────┼─────────┼────────┼────────┤
│ TOTAL         │   7,770  │    99   │  1.3%   │  $62   │  2.8x  │
└───────────────┴──────────┴─────────┴─────────┴────────┴────────┘

┌─────────────────────────────────────────────────────────────────┐
│  TOP PERFORMING CONTENT                                         │
│  1. Blog: "Fiberglass vs Concrete Pools" - 1,234 views, 8 leads │
│  2. Tool: Pool Cost Calculator - 890 uses, 12 leads             │
│  3. Landing: /gladwyne-pa/ - 567 views, 6 leads                 │
│  4. Quiz: "Which Pool Is Right?" - 456 completions, 9 leads     │
│  5. Blog: "Best Time to Install Pool" - 423 views, 3 leads      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  AD CAMPAIGN PERFORMANCE                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Campaign           │ Impressions │ Clicks │ CTR   │ Conv  │  │
│  ├────────────────────┼─────────────┼────────┼───────┼───────┤  │
│  │ Fiberglass Pools   │   45,000    │  890   │ 1.98% │  12   │  │
│  │ Main Line PA       │   32,000    │  650   │ 2.03% │   8   │  │
│  │ Plunge Pools       │   18,000    │  320   │ 1.78% │   5   │  │
│  │ Pool Installation  │   28,000    │  510   │ 1.82% │   3   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

#### Content Performance Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  BLOG PERFORMANCE                                               │
├─────────────────────────────────────────────────────────────────┤
│  Post Title                    │ Views │ Avg Time │ Leads │ CVR │
├────────────────────────────────┼───────┼──────────┼───────┼─────┤
│  Fiberglass vs Concrete Pools  │ 1,234 │  4:32    │   8   │ 0.6%│
│  Pool Cost Guide Pennsylvania  │   987 │  5:12    │   6   │ 0.6%│
│  Best Time to Install Pool     │   756 │  3:45    │   4   │ 0.5%│
│  Pool Installation Process     │   654 │  4:15    │   3   │ 0.5%│
│  Plunge Pools Small Backyards  │   543 │  3:30    │   5   │ 0.9%│
└────────────────────────────────┴───────┴──────────┴───────┴─────┘

┌─────────────────────────────────────────────────────────────────┐
│  TOOL ENGAGEMENT                                                │
├────────────────┬─────────┬──────────┬────────────┬──────────────┤
│  Tool          │ Starts  │ Complete │ Completion │ Email Capture│
├────────────────┼─────────┼──────────┼────────────┼──────────────┤
│  Pool Calculator   890   │   534    │    60%     │     156      │
│  Pool Quiz     │   654   │   392    │    60%     │     118      │
│  Timeline Tool │   234   │   187    │    80%     │      --      │
│  Financing Calc│   189   │   142    │    75%     │      45      │
│  Pool Comparison   156   │   124    │    79%     │      --      │
└────────────────┴─────────┴──────────┴────────────┴──────────────┘
```

### Report Templates

#### Weekly Lead Report (Automated Email)

**Send:** Every Monday 8:00 AM
**Recipients:** Bryce, Sales Team

```
Subject: Weekly Lead Report - Tri-State Aquatic [Week of {date}]

LEAD SUMMARY
============
Total Leads: {total}
  - Form Submissions: {forms}
  - Phone Calls: {calls}
  - Chat Conversations: {chats}

Week over Week: {change}%

TOP LEAD SOURCES
================
1. {source1}: {count1} leads ({percent1}%)
2. {source2}: {count2} leads ({percent2}%)
3. {source3}: {count3} leads ({percent3}%)

HIGH-VALUE LEADS (Calculator/Quiz Users)
========================================
{lead_name} - {pool_type} - {estimated_value} - {source}
{lead_name} - {pool_type} - {estimated_value} - {source}

ACTION ITEMS
============
- {number} leads awaiting follow-up
- {number} leads marked as qualified
- Average response time: {hours} hours
```

#### Monthly Performance Report

**Generate:** 1st of each month
**Format:** PDF with charts

Sections:
1. Executive Summary
2. Traffic Overview
3. Lead Generation
4. Channel Performance
5. Content Performance
6. Geographic Distribution
7. Device/Browser Analysis
8. Recommendations

### Automated Reporting Setup

#### GA4 Custom Reports

Create these saved explorations:

1. **Lead Source Analysis**
   - Dimensions: Session source/medium, Landing page
   - Metrics: Sessions, Conversions, Conversion rate

2. **Geographic Performance**
   - Dimensions: City, Region
   - Metrics: Sessions, Conversions, Engagement rate

3. **Content Engagement**
   - Dimensions: Page path, Page title
   - Metrics: Views, Average engagement time, Scroll events

4. **User Journey Analysis**
   - Technique: Path exploration
   - Starting point: Landing page
   - Ending point: Conversion events

#### Looker Studio Dashboards

Create connected dashboards with:
- GA4 connector
- Google Search Console connector
- Google Ads connector
- Manual data uploads for CRM/sales data

---

## 6. UTM Parameter Strategy

### Naming Conventions

#### Source (utm_source)
Identifies the referrer

| Source Value | Use Case |
|--------------|----------|
| google | Google Ads, Google organic (auto-tagged) |
| facebook | Facebook/Instagram ads and posts |
| instagram | Instagram (when separate tracking needed) |
| bing | Bing/Microsoft Ads |
| linkedin | LinkedIn ads and posts |
| pinterest | Pinterest |
| nextdoor | Nextdoor posts/ads |
| email | Email campaigns |
| sms | Text message campaigns |
| direct_mail | Direct mail with QR codes |
| houzz | Houzz profile/directory |
| thumbtack | Thumbtack leads |
| homeadvisor | HomeAdvisor leads |
| yelp | Yelp profile |
| referral | Partner referrals |
| newsletter | Newsletter sends |

#### Medium (utm_medium)
Identifies the marketing medium

| Medium Value | Use Case |
|--------------|----------|
| cpc | Paid search (cost-per-click) |
| ppc | Alternative for paid search |
| paid_social | Paid social media ads |
| organic_social | Organic social media posts |
| email | Email marketing |
| sms | Text messages |
| display | Display/banner ads |
| retargeting | Retargeting campaigns |
| video | Video ads (YouTube, etc.) |
| referral | Partner/affiliate referral |
| directory | Directory listings |
| qr | QR code scans |
| offline | Offline campaign tracking |

#### Campaign (utm_campaign)
Identifies the specific campaign

**Format:** `{year}-{month}_{campaign-type}_{description}`

**Examples:**
- `2026-02_spring_pool-season-launch`
- `2026-03_promo_early-bird-discount`
- `2026-q2_brand_main-line-awareness`
- `2026-ongoing_retargeting_site-visitors`
- `2026-06_seasonal_summer-installation`

#### Content (utm_content)
Identifies specific ad creative or link

**Format:** `{ad-variation}_{placement}` or `{content-description}`

**Examples:**
- `hero-cta_homepage`
- `sidebar-banner_blog`
- `carousel-ad-1_facebook`
- `video-testimonial_youtube`
- `button-blue_email-header`
- `image-pool-family_social`

#### Term (utm_term)
Identifies paid search keywords

**Examples:**
- `fiberglass+pool+installation`
- `pool+builders+main+line+pa`
- `swimming+pool+cost`

### Campaign Tracking Templates

#### Google Ads
Auto-tagging recommended. Manual tagging format:
```
utm_source=google
utm_medium=cpc
utm_campaign={campaign_name}
utm_content={adgroup}
utm_term={keyword}
```

#### Facebook/Instagram Ads
```
utm_source=facebook
utm_medium=paid_social
utm_campaign={campaign_name}
utm_content={adset_name}_{ad_name}
```

#### Email Marketing
```
utm_source=email
utm_medium=email
utm_campaign={campaign_name}
utm_content={email_variant}
```

#### Social Media Posts (Organic)
```
utm_source={platform}
utm_medium=organic_social
utm_campaign={campaign_name}
utm_content={post_description}
```

#### QR Codes (Print/Direct Mail)
```
utm_source=direct_mail
utm_medium=qr
utm_campaign={mailer_name}
utm_content={mailer_version}
```

### UTM Builder Template

**Spreadsheet Columns:**

| Column | Description | Example |
|--------|-------------|---------|
| Base URL | Page to track | https://tristateaquaticsolutions.com/contact/ |
| Source | Traffic source | facebook |
| Medium | Marketing medium | paid_social |
| Campaign | Campaign name | 2026-02_spring_pool-launch |
| Content | Ad/creative ID | carousel-1_fiberglass |
| Term | Keyword (optional) | -- |
| Full URL | Generated URL | [auto-generate] |
| Short URL | Bit.ly link | [create] |
| QR Code | If needed | [generate] |

**URL Generator Formula:**
```
=A2&"?utm_source="&B2&"&utm_medium="&C2&"&utm_campaign="&D2&IF(E2<>"","&utm_content="&E2,"")&IF(F2<>"","&utm_term="&F2,"")
```

### Campaign Taxonomy Document

Maintain a master document tracking:
- All active campaigns
- UTM parameters used
- Start/end dates
- Budget allocated
- Target audience
- Expected outcomes
- Actual results

---

## 7. Call Tracking Setup

### Dynamic Number Insertion (DNI)

#### Recommended Platforms

| Platform | Pricing | Features | Best For |
|----------|---------|----------|----------|
| CallRail | $45/mo+ | GA4 integration, call recording, keyword tracking | Best overall |
| CallTrackingMetrics | $39/mo+ | Multi-channel, AI transcription | Advanced needs |
| WhatConverts | $30/mo+ | Lead tracking beyond calls | Budget option |

#### CallRail Setup

**Account Configuration:**
```
Company: Tri-State Aquatic Solutions
Primary Number: (302) 555-1234
Tracking Numbers Needed: 5-10 (minimum)

Number Pool Allocation:
- Website DNI: 5 numbers (rotating pool)
- Google Ads: 1 dedicated number
- Facebook Ads: 1 dedicated number
- Print/Direct Mail: 1 dedicated number
- Google Business Profile: 1 dedicated number
```

**DNI JavaScript Implementation:**
```html
<!-- CallRail Tracking Script -->
<script>
(function(a,b,c,d,e,f,g){
  a['CallRailObject']=e;a[e]=a[e]||function(){
  (a[e].q=a[e].q||[]).push(arguments)};a[e].l=1*new Date();
  f=b.createElement(c);g=b.getElementsByTagName(c)[0];
  f.async=1;f.src=d;g.parentNode.insertBefore(f,g)
})(window,document,'script','//cdn.callrail.com/companies/{COMPANY_ID}/numbers.js','cr');
cr('init',{domain:'tristateaquaticsolutions.com'});
</script>
```

**Source Tracking Configuration:**
```javascript
// CallRail source-based number swapping
cr('track', {
  'google_paid': '302-555-0001',
  'facebook_paid': '302-555-0002',
  'organic': '302-555-0003',
  'direct': '302-555-0004'
});
```

### GA4 Integration

**CallRail to GA4 Push Events:**
```javascript
// Push call events to GA4 dataLayer
window.addEventListener('message', function(event) {
  if (event.data.type === 'CallRail') {
    dataLayer.push({
      'event': 'phone_call',
      'call_duration': event.data.duration,
      'call_source': event.data.source,
      'call_medium': event.data.medium,
      'call_campaign': event.data.campaign,
      'caller_number': event.data.caller_number,
      'call_recording_url': event.data.recording_url
    });
  }
});
```

**GA4 Event Configuration:**
```javascript
gtag('event', 'phone_call', {
  'call_duration': duration,
  'call_source': source,
  'call_medium': medium,
  'call_status': 'answered|missed|voicemail',
  'value': callValue
});
```

### Call Scoring & Qualification

**Call Score Criteria:**
| Factor | Points | Description |
|--------|--------|-------------|
| Duration > 2 min | +20 | Substantive conversation |
| Duration > 5 min | +30 | Deep engagement |
| Mentioned pool type | +15 | Product interest |
| Asked about pricing | +20 | High intent |
| Requested consultation | +25 | Sales-ready |
| First-time caller | +10 | New lead |
| From service area | +10 | Geographic fit |
| From target zip codes | +15 | Premium area |

**Automated Scoring Rules:**
```
Score 80+: Hot Lead → Immediate callback
Score 50-79: Warm Lead → Same-day follow-up
Score 20-49: Cool Lead → Add to nurture
Score <20: Not Qualified → Review manually
```

### Call Recording & Compliance

**Recording Disclaimer (One-Party Consent States - PA/DE):**
Delaware and Pennsylvania are both one-party consent states, but best practice is to disclose:

**Greeting Script:**
> "Thank you for calling Tri-State Aquatic Solutions. This call may be recorded for quality and training purposes. How can I help you today?"

**Website Disclosure:**
Add to Privacy Policy:
> "Phone calls to our business may be recorded for quality assurance, training, and record-keeping purposes."

### Call Tracking Reports

**Daily Call Summary:**
- Total calls received
- Calls by source
- Average call duration
- Missed call rate
- Peak call times

**Weekly Call Analysis:**
- Call volume trends
- Source performance
- Keyword attribution (for PPC)
- Lead quality scores
- Recording reviews needed

---

## 8. CRM Integration

### Recommended CRM Platforms

| Platform | Pricing | Best For | Integration Ease |
|----------|---------|----------|------------------|
| HubSpot CRM | Free-$800/mo | Full marketing suite | Excellent |
| Pipedrive | $15-99/user/mo | Sales-focused | Good |
| Keap (Infusionsoft) | $79-199/mo | Small business automation | Moderate |
| Monday Sales CRM | $10-24/user/mo | Visual pipeline | Good |

### Lead Source Tracking

**Data to Capture from Website:**

| Field | Source | Storage Location |
|-------|--------|------------------|
| First Touch Source | UTM parameters (first visit) | Hidden form field |
| Last Touch Source | UTM parameters (conversion) | Hidden form field |
| Landing Page (First) | Cookie/localStorage | Hidden form field |
| Landing Page (Conversion) | Page URL | Hidden form field |
| Device Type | User agent | Hidden form field |
| Geographic Location | IP geolocation | Hidden form field |
| Tool Interactions | dataLayer | Hidden form field |
| Quiz Results | Quiz data | Hidden form field |
| Calculator Estimate | Calculator data | Hidden form field |

**Hidden Form Field Implementation:**
```html
<form id="contact-form">
  <!-- Visible fields -->
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <input type="tel" name="phone" required>
  <textarea name="message"></textarea>

  <!-- Hidden tracking fields -->
  <input type="hidden" name="utm_source" id="utm_source">
  <input type="hidden" name="utm_medium" id="utm_medium">
  <input type="hidden" name="utm_campaign" id="utm_campaign">
  <input type="hidden" name="utm_content" id="utm_content">
  <input type="hidden" name="first_touch_source" id="first_touch_source">
  <input type="hidden" name="landing_page" id="landing_page">
  <input type="hidden" name="device_type" id="device_type">
  <input type="hidden" name="pool_interest" id="pool_interest">
  <input type="hidden" name="estimated_budget" id="estimated_budget">
  <input type="hidden" name="gclid" id="gclid">
  <input type="hidden" name="fbclid" id="fbclid">

  <button type="submit">Submit</button>
</form>

<script>
// Populate hidden fields on page load
document.addEventListener('DOMContentLoaded', function() {
  // Get current UTM parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Populate UTM fields
  document.getElementById('utm_source').value = urlParams.get('utm_source') || '';
  document.getElementById('utm_medium').value = urlParams.get('utm_medium') || '';
  document.getElementById('utm_campaign').value = urlParams.get('utm_campaign') || '';
  document.getElementById('utm_content').value = urlParams.get('utm_content') || '';
  document.getElementById('gclid').value = urlParams.get('gclid') || '';
  document.getElementById('fbclid').value = urlParams.get('fbclid') || '';

  // Get first touch from localStorage (set on first visit)
  document.getElementById('first_touch_source').value = localStorage.getItem('first_touch_source') || '';
  document.getElementById('landing_page').value = localStorage.getItem('landing_page') || window.location.pathname;

  // Device type
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  document.getElementById('device_type').value = isMobile ? 'mobile' : 'desktop';

  // Get quiz/calculator data if exists
  const quizData = sessionStorage.getItem('quiz_result');
  const calcData = sessionStorage.getItem('calculator_estimate');

  if (quizData) {
    document.getElementById('pool_interest').value = JSON.parse(quizData).recommended_pool || '';
  }
  if (calcData) {
    document.getElementById('estimated_budget').value = JSON.parse(calcData).estimate || '';
  }
});

// Set first touch on initial visit
if (!localStorage.getItem('first_touch_source')) {
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_source') || document.referrer || 'direct';
  localStorage.setItem('first_touch_source', source);
  localStorage.setItem('landing_page', window.location.pathname);
}
</script>
```

### Pipeline Reporting

**CRM Pipeline Stages:**

| Stage | Definition | Expected Duration |
|-------|------------|-------------------|
| New Lead | Just submitted contact form | 0-1 day |
| Contacted | Initial outreach made | 1-2 days |
| Qualified | Confirmed interest and fit | 1-3 days |
| Consultation Scheduled | Meeting booked | 3-7 days |
| Consultation Complete | Site visit done | 1 day |
| Proposal Sent | Quote delivered | 1-3 days |
| Negotiation | Discussing terms | 3-14 days |
| Contract Signed | Deal won | -- |
| Lost | Deal lost | -- |

**Pipeline Metrics to Track:**
- Lead-to-consultation rate
- Consultation-to-proposal rate
- Proposal-to-close rate
- Average deal size
- Average sales cycle length
- Win rate by source
- Lost reason analysis

### ROI Calculation

**Lead Value Calculation:**

```
Average Contract Value: $65,000
Average Close Rate: 15%
Lead Value = $65,000 × 0.15 = $9,750 per qualified lead

Breakdown by Lead Quality:
- Hot Lead (quiz + calculator user): $12,000 value (20% close rate)
- Warm Lead (form submission only): $8,000 value (12% close rate)
- Cool Lead (phone inquiry): $6,500 value (10% close rate)
```

**Marketing ROI Tracking:**

| Channel | Spend | Leads | Cost/Lead | Closed | Revenue | ROI |
|---------|-------|-------|-----------|--------|---------|-----|
| Google Ads | $2,500 | 20 | $125 | 2 | $130,000 | 52x |
| Facebook | $1,200 | 8 | $150 | 1 | $65,000 | 54x |
| SEO/Content | $1,500 | 15 | $100 | 2 | $130,000 | 87x |
| **Total** | **$5,200** | **43** | **$121** | **5** | **$325,000** | **63x** |

**Monthly ROI Report Fields:**
```
Channel Performance Report
--------------------------
Channel: {channel_name}
Total Spend: ${spend}
Leads Generated: {lead_count}
Cost Per Lead: ${cpl}
Leads Closed: {closed_count}
Revenue Generated: ${revenue}
ROI: {roi}x
Notes: {observations}
```

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        WEBSITE                                  │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │  Form Submit    │    │  Phone Click    │                    │
│  │  + Hidden Data  │    │  (CallRail DNI) │                    │
│  └────────┬────────┘    └────────┬────────┘                    │
│           │                      │                              │
│           ▼                      ▼                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Google Tag Manager dataLayer               │   │
│  └─────────────────────────────────────────────────────────┘   │
│           │                      │                              │
└───────────┼──────────────────────┼──────────────────────────────┘
            │                      │
            ▼                      ▼
┌───────────────────┐    ┌───────────────────┐    ┌──────────────┐
│   Google Analytics│    │    CallRail       │    │   Form       │
│        GA4        │    │                   │    │   Handler    │
│                   │    │  Call Tracking    │    │  (Webhook)   │
└─────────┬─────────┘    └─────────┬─────────┘    └──────┬───────┘
          │                        │                      │
          │                        │                      │
          ▼                        ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                           CRM                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Lead Record                          │   │
│  │  - Contact Information                                  │   │
│  │  - Source/Medium/Campaign                               │   │
│  │  - First Touch Attribution                              │   │
│  │  - Call Recording Link                                  │   │
│  │  - Quiz/Calculator Data                                 │   │
│  │  - Lead Score                                           │   │
│  │  - Pipeline Stage                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REPORTING & ANALYSIS                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Looker Studio   │  │  CRM Reports    │  │ Custom Reports  │ │
│  │ Dashboards      │  │                 │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Timeline

### Phase 1: Foundation (Week 1-2)

- [ ] Create GA4 property and data stream
- [ ] Install GTM container on all pages
- [ ] Configure basic page view tracking
- [ ] Set up enhanced measurement
- [ ] Create internal traffic filters
- [ ] Verify data is flowing correctly

### Phase 2: Event Tracking (Week 2-3)

- [ ] Implement form submission tracking
- [ ] Set up CTA click tracking
- [ ] Configure phone/email click tracking
- [ ] Add scroll depth tracking
- [ ] Implement file download tracking
- [ ] Set up video tracking
- [ ] Test all events in GTM Preview mode

### Phase 3: Conversions & Tools (Week 3-4)

- [ ] Implement calculator event tracking
- [ ] Set up quiz event tracking
- [ ] Configure conversion goals in GA4
- [ ] Add conversion values
- [ ] Set up cross-domain tracking
- [ ] Implement outbound click tracking

### Phase 4: Call Tracking (Week 4)

- [ ] Set up CallRail account
- [ ] Configure DNI on website
- [ ] Create source-specific numbers
- [ ] Integrate with GA4
- [ ] Test call attribution
- [ ] Set up call scoring rules

### Phase 5: CRM & Reporting (Week 5)

- [ ] Configure CRM lead capture
- [ ] Set up hidden form fields
- [ ] Create CRM-GA4 integration
- [ ] Build Looker Studio dashboards
- [ ] Set up automated reports
- [ ] Create UTM tracking spreadsheet

### Phase 6: Optimization (Ongoing)

- [ ] Monitor data quality weekly
- [ ] Refine conversion values monthly
- [ ] Update dashboards as needed
- [ ] A/B test tracking implementations
- [ ] Document any changes made

---

## Maintenance & Quality Assurance

### Weekly Checks

- [ ] Verify conversion tracking is firing
- [ ] Check for any tracking errors in GTM
- [ ] Review real-time data in GA4
- [ ] Confirm call tracking is working
- [ ] Spot-check form submissions in CRM

### Monthly Audits

- [ ] Review all tags in GTM
- [ ] Verify data accuracy vs CRM
- [ ] Update any changed page URLs
- [ ] Check for duplicate tracking
- [ ] Review attribution accuracy
- [ ] Update conversion values if needed

### Quarterly Reviews

- [ ] Full analytics audit
- [ ] Review and update KPIs
- [ ] Assess new tracking opportunities
- [ ] Update UTM strategy if needed
- [ ] Train team on any changes
- [ ] Document lessons learned

---

## Appendix

### A. GTM Tag Templates

[See separate GTM export file]

### B. GA4 Custom Definitions

**Custom Dimensions:**
| Name | Scope | Parameter |
|------|-------|-----------|
| Page Type | Event | page_type |
| Pool Type Interest | Event | pool_type |
| Service Area | Event | service_area |
| Lead Type | Event | lead_type |
| Calculator Type | Event | calculator_type |
| Quiz Result | User | quiz_result |
| Lead Score | User | lead_score |

**Custom Metrics:**
| Name | Scope | Parameter | Unit |
|------|-------|-----------|------|
| Estimated Project Value | Event | estimated_cost | Currency |
| Quiz Completion Time | Event | completion_time | Seconds |
| Call Duration | Event | call_duration | Seconds |

### C. Data Layer Reference

Complete dataLayer specification for developers:

```javascript
// Standard page view
{
  'event': 'page_view',
  'page_type': string,
  'service_area': string,
  'pool_type': string
}

// Form submission
{
  'event': 'form_submit_{form_type}',
  'form_id': string,
  'form_location': string,
  'lead_type': string,
  'service_interest': string,
  'user_location': string
}

// Calculator events
{
  'event': 'calculator_{action}',
  'calculator_type': string,
  'step_number': number,
  'step_name': string,
  'step_value': string|number,
  'estimated_cost': number,
  'pool_type': string,
  'features_selected': array
}

// Quiz events
{
  'event': 'quiz_{action}',
  'quiz_name': string,
  'question_number': number,
  'answer_selected': string,
  'result_type': string,
  'recommended_pool': string,
  'total_time_seconds': number
}
```

### D. Troubleshooting Guide

**Common Issues:**

1. **No data appearing in GA4**
   - Check GTM container is published
   - Verify Measurement ID is correct
   - Check for ad blockers during testing
   - Use GA4 DebugView for real-time testing

2. **Duplicate events**
   - Check for multiple GTM containers
   - Verify triggers aren't firing twice
   - Review tag firing sequence

3. **Missing conversions**
   - Confirm conversion is marked in GA4
   - Check trigger conditions in GTM
   - Verify form submission handler is correct

4. **Call tracking not attributing**
   - Verify DNI script is loading
   - Check number pool is adequate
   - Confirm cookies are enabled for testing

---

**Document Version:** 1.0
**Last Updated:** February 2026
**Author:** Marketing Team
**Next Review:** March 2026
