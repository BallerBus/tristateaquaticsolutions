# Chatbot Platform Setup Guide

## Tri-State Aquatic Solutions

**Purpose:** Technical guide for implementing chatbot and live chat systems
**Audience:** Marketing team, web developer, Brandon
**Last Updated:** February 2026

---

## Table of Contents
1. [Platform Recommendations](#1-platform-recommendations)
2. [Implementation Checklist](#2-implementation-checklist)
3. [Integration Requirements](#3-integration-requirements)
4. [Testing Procedures](#4-testing-procedures)
5. [Analytics & Tracking](#5-analytics--tracking)
6. [Maintenance & Optimization](#6-maintenance--optimization)

---

# 1. Platform Recommendations

## 1.1 Platform Comparison Matrix

| Platform | Best For | Monthly Cost | Ease of Use | CRM Integration | AI Capability |
|----------|----------|--------------|-------------|-----------------|---------------|
| **HubSpot** | All-in-one CRM + Chat | Free-$45+ | Easy | Native | Good |
| **Intercom** | Advanced chatbots | $74+ | Moderate | Good | Excellent |
| **Drift** | B2B/Sales focus | $50+ | Moderate | Good | Excellent |
| **Tidio** | Budget-friendly | Free-$29+ | Very Easy | Basic | Good |
| **LiveChat** | Simple live chat | $20+ | Very Easy | Good | Basic |
| **Zendesk Chat** | Support focus | $14+ | Easy | Excellent | Good |
| **ManyChat** | Social (FB/IG) | Free-$15+ | Easy | Basic | Basic |
| **Crisp** | Startup-friendly | Free-$25+ | Easy | Good | Good |

---

## 1.2 Primary Recommendation: HubSpot

### Why HubSpot for Tri-State Aquatic Solutions

**Pros:**
- Free tier includes chat functionality
- Native CRM integration (already recommended in CRM guide)
- Easy to set up and manage
- Good chatbot builder
- Contact management included
- Email marketing integration
- Scalable as business grows

**Cons:**
- Advanced features require paid plans
- Chatbot AI less sophisticated than Intercom/Drift
- Some limitations on free tier

**Recommended Tier:** HubSpot Starter ($45/month) or Professional ($450/month) if budget allows

### HubSpot Setup Overview

1. Create HubSpot account (if not existing)
2. Navigate to Conversations > Chatflows
3. Create chatbot for website
4. Create live chat fallback
5. Install tracking code on website
6. Configure working hours
7. Set up notification preferences
8. Integrate with CRM contacts

---

## 1.3 Alternative Recommendation: Tidio

### Why Tidio as Alternative

**Pros:**
- Very affordable (free tier available)
- Easy setup (under 30 minutes)
- Good chatbot builder
- Integrates with most CRMs
- Mobile app for on-the-go responses
- Excellent for small businesses

**Cons:**
- Less sophisticated than enterprise options
- Limited advanced automation
- Basic analytics on free tier

**Recommended Tier:** Tidio Chatbots ($29/month)

---

## 1.4 Social Media Recommendation: ManyChat

### For Facebook Messenger & Instagram

**Why ManyChat:**
- Purpose-built for social messaging
- Easy visual flow builder
- Free tier covers basics
- Instagram DM automation
- Facebook Messenger automation
- Good for lead capture

**Recommended Tier:** ManyChat Pro ($15/month)

---

## 1.5 Decision Framework

```
IF:
- Already using HubSpot CRM → Use HubSpot Chat
- Need budget option + simplicity → Use Tidio
- Heavy social media focus → Use ManyChat
- Need advanced AI chatbots → Consider Intercom or Drift
- Already using Zendesk → Use Zendesk Chat
```

---

# 2. Implementation Checklist

## 2.1 Pre-Implementation Preparation

### Content Preparation
- [ ] Complete chatbot-flows.md script documentation
- [ ] Complete live-chat-scripts.md documentation
- [ ] Gather FAQ responses (20 questions minimum)
- [ ] Create response templates for common inquiries
- [ ] Define lead qualification criteria
- [ ] Establish escalation procedures

### Technical Preparation
- [ ] Access to website backend/CMS
- [ ] Admin access to chosen chat platform
- [ ] CRM admin access for integration
- [ ] Email service provider access
- [ ] Google Analytics access
- [ ] Facebook/Instagram business account access

### Team Preparation
- [ ] Identify who will respond to live chats (Brandon)
- [ ] Define backup responders
- [ ] Establish response time expectations
- [ ] Create notification procedures
- [ ] Train on chatbot platform

---

## 2.2 Website Chat Implementation

### Step 1: Platform Setup (Day 1)
- [ ] Create account on chosen platform
- [ ] Complete company profile
- [ ] Set business hours (Mon-Sat, 8am-8pm ET)
- [ ] Configure notification settings (email, mobile app, SMS)
- [ ] Add team member accounts if applicable

### Step 2: Chatbot Configuration (Days 2-3)
- [ ] Create welcome message flow
- [ ] Build service inquiry flow
- [ ] Build pricing inquiry flow
- [ ] Build consultation scheduling flow
- [ ] Configure FAQ responses
- [ ] Set up lead qualification questions
- [ ] Configure after-hours flow
- [ ] Set up handoff to human triggers

### Step 3: Live Chat Configuration (Day 3)
- [ ] Configure availability settings
- [ ] Set up away message
- [ ] Create canned/saved responses
- [ ] Configure routing rules
- [ ] Set up notification sounds/alerts

### Step 4: Visual Customization (Day 4)
- [ ] Match brand colors (Navy #0E1F34, Aqua #00A6B2)
- [ ] Add company logo
- [ ] Customize chat widget position
- [ ] Configure chat bubble text
- [ ] Add agent photos (Brandon)
- [ ] Test on mobile and desktop

### Step 5: Website Installation (Day 4-5)
- [ ] Obtain installation code/snippet
- [ ] Install on website (all pages)
- [ ] Verify tracking is working
- [ ] Test on staging environment first
- [ ] Deploy to production
- [ ] Verify functionality on all page types

### Step 6: CRM Integration (Day 5)
- [ ] Connect chat platform to CRM
- [ ] Map contact fields
- [ ] Configure lead creation rules
- [ ] Test contact sync
- [ ] Set up automation triggers

---

## 2.3 Social Media Chat Implementation

### Facebook Messenger Setup
- [ ] Access Facebook Business Page
- [ ] Enable Messenger for business
- [ ] Configure instant replies
- [ ] Set up greeting message
- [ ] Configure away message
- [ ] Set response time expectations
- [ ] Connect ManyChat (if using)
- [ ] Build chatbot flows
- [ ] Test all flows

### Instagram DM Setup
- [ ] Ensure business account
- [ ] Enable message requests
- [ ] Configure quick replies
- [ ] Set up saved replies
- [ ] Connect to ManyChat (if using)
- [ ] Build automation flows
- [ ] Test thoroughly

---

## 2.4 Post-Implementation Verification

### Functionality Testing
- [ ] All chatbot flows work correctly
- [ ] Lead capture forms submit properly
- [ ] CRM integration creates contacts
- [ ] Notifications reach Brandon
- [ ] After-hours flow activates correctly
- [ ] Mobile responsiveness confirmed
- [ ] Cross-browser testing complete

### Content Testing
- [ ] No typos or errors in responses
- [ ] All links work
- [ ] Phone number correct
- [ ] Email address correct
- [ ] Consultation scheduling works
- [ ] Brand voice consistent

---

# 3. Integration Requirements

## 3.1 CRM Integration (HubSpot)

### Required Connections
```
Chat Platform → HubSpot CRM

Data to Sync:
- Contact name
- Email address
- Phone number
- Chat transcript
- Lead source
- Conversation timestamp
- Page URL where chat started
- Custom fields (pool interest, timeline, location)
```

### Integration Setup (HubSpot Native)
1. Navigate to Settings > Integrations
2. Chat conversations auto-sync to CRM contacts
3. Configure contact property mapping
4. Set up workflow triggers based on chat events

### Integration Setup (Third-Party Chat + HubSpot)
1. Use native integration if available
2. Otherwise, use Zapier:
   - Trigger: New conversation in [Chat Platform]
   - Action: Create/Update contact in HubSpot
   - Map all relevant fields

---

## 3.2 Email Service Integration

### Purpose
- Send follow-up emails after chat
- Add to nurture sequences
- Trigger automation workflows

### Setup
```
Chat Platform → Email Service (via CRM or direct)

Triggers:
- New lead captured → Welcome email sequence
- Consultation scheduled → Confirmation email
- After-hours inquiry → Follow-up email
```

---

## 3.3 Calendar Integration

### Purpose
- Allow consultation scheduling in chat
- Sync with Brandon's calendar
- Prevent double-booking

### Options

**Option A: Native Calendar Integration**
- Connect Google Calendar or Outlook to chat platform
- Use built-in scheduling feature

**Option B: Calendly Integration**
- Create Calendly link for consultations
- Embed link in chatbot responses
- Sync Calendly to calendar

**Option C: HubSpot Meetings**
- Use HubSpot's meeting scheduler
- Native integration with HubSpot chat
- Auto-syncs to CRM

### Recommended: HubSpot Meetings (if using HubSpot)
1. Create meeting type "Free Design Consultation"
2. Set duration: 60 minutes
3. Set availability: Mon-Sat, business hours
4. Add buffer time: 30 minutes
5. Include in chatbot scheduling flow

---

## 3.4 Analytics Integration

### Google Analytics
```javascript
// Track chat events in GA
// Add to chatbot platform event settings

Events to track:
- chat_started
- chat_bot_response
- chat_human_handoff
- lead_captured
- consultation_scheduled
- chat_completed
```

### Setup in Google Analytics 4
1. Create custom events for chat interactions
2. Set up conversions for key actions:
   - Lead form submitted via chat
   - Consultation scheduled via chat
3. Create dashboard for chat performance

---

## 3.5 SMS/Text Integration

### Purpose
- Notify Brandon of new chats (when away from desk)
- Enable text follow-up after chat
- Appointment reminders via SMS

### Options
1. **Native SMS notifications** (most platforms support this)
2. **Twilio integration** for advanced SMS workflows
3. **HubSpot SMS** (requires Marketing Hub Professional+)

### Recommended Setup
1. Enable SMS notifications in chat platform settings
2. Configure for after-hours and high-priority triggers
3. Ensure phone number is correct

---

## 3.6 Integration Architecture Diagram

```
                    ┌─────────────────┐
                    │    Website      │
                    │ (Chat Widget)   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Chat Platform  │
                    │  (HubSpot/Tidio)│
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
   │     CRM     │   │   Calendar  │   │   Email     │
   │  (HubSpot)  │   │  (HubSpot/  │   │  Marketing  │
   │             │   │  Calendly)  │   │             │
   └──────┬──────┘   └─────────────┘   └──────┬──────┘
          │                                    │
          └───────────────┬────────────────────┘
                          │
                 ┌────────▼────────┐
                 │    Analytics    │
                 │  (GA4/HubSpot)  │
                 └─────────────────┘

Social Media Flow:
┌─────────────────┐     ┌─────────────────┐
│    Facebook     │────▶│    ManyChat     │────▶ CRM
│    Messenger    │     │  (Automation)   │
└─────────────────┘     └─────────────────┘
        │
┌───────▼─────────┐
│    Instagram    │
│       DM        │
└─────────────────┘
```

---

# 4. Testing Procedures

## 4.1 Pre-Launch Testing Checklist

### Chatbot Flow Testing

**Welcome Flow**
- [ ] Trigger activates correctly (time delay, page visit)
- [ ] All button options work
- [ ] Responses match documentation
- [ ] Next flows transition correctly
- [ ] Mobile display correct

**Service Inquiry Flow**
- [ ] Pool type options display correctly
- [ ] All paths lead to appropriate responses
- [ ] Information is accurate
- [ ] CTAs work properly

**Pricing Flow**
- [ ] Price ranges accurate
- [ ] Financing info correct
- [ ] Links to guides work
- [ ] Lead capture triggers correctly

**Scheduling Flow**
- [ ] Calendar displays available times
- [ ] Form fields capture correctly
- [ ] Confirmation message sends
- [ ] Calendar event creates
- [ ] Notification reaches Brandon

**FAQ Responses**
- [ ] All 20 FAQ responses accurate
- [ ] Responses trigger on correct keywords
- [ ] Links and phone numbers correct
- [ ] Responses conversational and on-brand

**Lead Qualification Flow**
- [ ] Location question works
- [ ] Timeline question works
- [ ] Budget question works (if included)
- [ ] Contact capture works
- [ ] Data syncs to CRM

**After-Hours Flow**
- [ ] Triggers at correct time
- [ ] Message is appropriate
- [ ] Callback request works
- [ ] Returns to normal at business hours

**Handoff Flow**
- [ ] Triggers on correct conditions
- [ ] Brandon receives notification
- [ ] Transition is smooth
- [ ] Lead info transfers correctly

---

### Live Chat Testing

**Availability**
- [ ] Shows "online" during business hours
- [ ] Shows "away" outside business hours
- [ ] Away message displays correctly

**Notifications**
- [ ] Desktop notification works
- [ ] Email notification works
- [ ] Mobile push notification works
- [ ] Sound alerts work

**Conversation**
- [ ] Messages send successfully
- [ ] Messages receive in real-time
- [ ] Typing indicator works
- [ ] File/image sharing works

**Contact Capture**
- [ ] Pre-chat form captures data
- [ ] Data syncs to CRM
- [ ] Transcript saves

---

### Integration Testing

**CRM Sync**
- [ ] New chat creates contact
- [ ] Existing contact recognized
- [ ] Custom fields populate
- [ ] Transcript attaches to contact
- [ ] Lead source tracks correctly

**Calendar**
- [ ] Available times accurate
- [ ] Booking creates event
- [ ] Confirmation email sends
- [ ] Event appears on calendar

**Email**
- [ ] Automated emails trigger
- [ ] Content is correct
- [ ] Unsubscribe works

---

## 4.2 Test Scenarios

### Scenario 1: New Visitor General Inquiry
```
1. Visit website homepage
2. Wait for chat widget to appear
3. Click to open chat
4. Verify welcome message displays
5. Select "Looking for specific information"
6. Test several FAQ responses
7. Verify helpful and accurate
8. End conversation
```

### Scenario 2: Pricing Inquiry to Consultation
```
1. Start new chat
2. Ask "How much does a pool cost?"
3. Verify pricing flow triggers
4. Select "Schedule consultation"
5. Complete scheduling flow
6. Verify calendar books correctly
7. Verify confirmation received
8. Check CRM for new contact
```

### Scenario 3: After-Hours Inquiry
```
1. Set system time outside business hours (or test after hours)
2. Visit website
3. Start chat
4. Verify after-hours message displays
5. Request callback
6. Complete form
7. Verify follow-up scheduled
```

### Scenario 4: Handoff to Human
```
1. Start chat during business hours
2. Navigate to complex question or request human
3. Verify handoff triggers correctly
4. Confirm Brandon receives notification
5. Transition to live chat
6. Complete conversation
7. Verify transcript saved
```

### Scenario 5: Mobile Experience
```
1. Open website on mobile device
2. Verify chat widget accessible
3. Start conversation
4. Complete full inquiry flow
5. Verify all elements display correctly
6. Test scheduling on mobile
7. Verify confirmation received
```

---

## 4.3 UAT Sign-Off

### User Acceptance Testing Checklist

**Functionality**
- [ ] All chatbot flows work as designed
- [ ] Live chat functions properly
- [ ] CRM integration working
- [ ] Calendar integration working
- [ ] Email notifications working
- [ ] SMS notifications working

**Content**
- [ ] All responses reviewed and approved
- [ ] Pricing accurate
- [ ] Contact information correct
- [ ] Tone and voice appropriate
- [ ] No spelling/grammar errors

**Performance**
- [ ] Widget loads quickly (< 2 seconds)
- [ ] Responses generate quickly (< 1 second)
- [ ] No noticeable lag or delays
- [ ] Mobile performance acceptable

**Security/Privacy**
- [ ] Privacy policy link included
- [ ] Data handling compliant
- [ ] Opt-out mechanism works
- [ ] No sensitive data exposed

---

# 5. Analytics & Tracking

## 5.1 Key Metrics to Track

### Volume Metrics
| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| Total Conversations | All chat sessions started | Track trend | Daily |
| Bot Conversations | Completed by chatbot only | 60%+ of total | Weekly |
| Human Conversations | Required human takeover | 40% or less | Weekly |
| Unique Visitors Chatted | Distinct users who chatted | Track trend | Weekly |

### Engagement Metrics
| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| Chat Start Rate | % of visitors who start chat | 3-5% | Weekly |
| Completion Rate | % who complete conversation | 70%+ | Weekly |
| Response Time | Average time to first response | < 30 seconds (bot), < 5 min (human) | Daily |
| Conversation Length | Average messages per chat | 5-10 messages | Weekly |

### Conversion Metrics
| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| Lead Capture Rate | % of chats that capture contact info | 30%+ | Weekly |
| Consultation Scheduled | Consultations booked via chat | 10%+ of leads | Weekly |
| Chat-to-Customer Rate | Customers who first engaged via chat | Track trend | Monthly |
| Revenue from Chat | Revenue attributed to chat-sourced leads | Track trend | Monthly |

### Quality Metrics
| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| CSAT Score | Customer satisfaction rating | 4.5+/5 | Weekly |
| Escalation Rate | % requiring human handoff | Track/optimize | Weekly |
| Resolution Rate | % resolved without follow-up | 80%+ | Weekly |
| Drop-Off Rate | % who abandon conversation | < 20% | Weekly |

---

## 5.2 Dashboard Setup

### HubSpot Chat Dashboard

**Widget 1: Conversation Volume**
- Total conversations (daily/weekly/monthly)
- Trend line over time
- Comparison to previous period

**Widget 2: Bot vs Human**
- Pie chart: Bot-only vs Human-assisted
- Track handoff reasons

**Widget 3: Lead Capture**
- Number of leads captured via chat
- Lead quality distribution
- Conversion to consultation

**Widget 4: Response Time**
- Average first response time
- Time by hour of day
- SLA compliance

**Widget 5: Top Inquiries**
- Most common questions/topics
- FAQ performance
- Gaps in bot coverage

**Widget 6: Conversion Funnel**
- Chat started → Lead captured → Consultation scheduled → Deal won

---

### Google Analytics Events

**Events to Configure:**

```javascript
// Chat Widget Opened
gtag('event', 'chat_opened', {
  'event_category': 'chat',
  'event_label': 'widget_opened'
});

// Chat Started (first message sent)
gtag('event', 'chat_started', {
  'event_category': 'chat',
  'event_label': 'conversation_started'
});

// Lead Captured
gtag('event', 'lead_captured', {
  'event_category': 'chat',
  'event_label': 'contact_form_submitted'
});

// Consultation Scheduled
gtag('event', 'consultation_scheduled', {
  'event_category': 'chat',
  'event_label': 'booking_completed'
});

// Human Handoff
gtag('event', 'human_handoff', {
  'event_category': 'chat',
  'event_label': 'escalated_to_human'
});
```

---

## 5.3 Reporting Cadence

### Daily Review (5 minutes)
- Check for any unanswered chats
- Review overnight conversations
- Note any issues or patterns

### Weekly Report
- Total conversation volume
- Lead capture rate
- Consultation bookings from chat
- Response time performance
- Top questions asked
- Any bot failures or issues

### Monthly Analysis
- Trend analysis (volume, conversion, quality)
- Bot optimization opportunities
- Script/flow updates needed
- ROI calculation
- Comparison to other lead sources

---

## 5.4 Attribution Tracking

### Lead Source Tracking

**In CRM, tag chat-sourced leads with:**
- Lead Source: Website Chat
- Lead Source Detail: [Specific page or flow]
- First Touch: Chat
- Original Conversation ID

### UTM Tracking for Chat Leads

When chat leads visit website from emails or follow-ups:
```
tristateaquaticsolutions.com/?utm_source=chat&utm_medium=follow-up&utm_campaign=lead-nurture
```

### Revenue Attribution

**Track in CRM:**
1. Deal created from chat-sourced contact
2. Deal value
3. Close rate for chat leads vs other sources
4. Average deal size comparison

---

# 6. Maintenance & Optimization

## 6.1 Ongoing Maintenance Tasks

### Daily
- [ ] Check for stuck/unanswered conversations
- [ ] Review any error notifications
- [ ] Respond to any pending messages

### Weekly
- [ ] Review chat analytics dashboard
- [ ] Identify unanswered questions (bot gaps)
- [ ] Check integration sync status
- [ ] Update responses if needed

### Monthly
- [ ] Full analytics review
- [ ] Update FAQ responses with new questions
- [ ] Optimize underperforming flows
- [ ] Review and update pricing/offers
- [ ] Test all integrations
- [ ] Review customer feedback

### Quarterly
- [ ] Comprehensive script review
- [ ] A/B test new approaches
- [ ] Evaluate platform performance
- [ ] Consider new features/upgrades
- [ ] Training refresher

---

## 6.2 Optimization Framework

### Identify Issues

**Bot Confusion Points:**
- Where do users ask to talk to human most?
- Where do conversations drop off?
- What questions stump the bot?

**Low Conversion Points:**
- Which flows have low completion rates?
- Where do users abandon scheduling?
- What pricing objections arise?

### Test Solutions

**A/B Testing Ideas:**
1. Welcome message variations
2. Button text options
3. Response length (short vs detailed)
4. Proactive chat timing
5. Lead form placement

**How to A/B Test:**
1. Create two versions of flow/message
2. Split traffic 50/50
3. Run for 2-4 weeks (minimum 100 conversations each)
4. Measure conversion metrics
5. Implement winner

### Implement Improvements

1. Document proposed change
2. Update in staging/test environment
3. Test thoroughly
4. Deploy to production
5. Monitor for 1 week
6. Confirm improvement or rollback

---

## 6.3 Common Issues & Solutions

### Issue: Low Chat Engagement

**Symptoms:**
- Few visitors opening chat
- Low proactive trigger response

**Solutions:**
- Adjust proactive timing (try 10 seconds vs 30)
- Update welcome message to be more engaging
- Test different chat widget positions
- Make chat more visible (contrast, animation)
- Personalize by page content

---

### Issue: High Bot Abandonment

**Symptoms:**
- Users start but don't complete conversations
- High drop-off in specific flows

**Solutions:**
- Shorten flows (fewer questions)
- Offer human option earlier
- Simplify button options
- Add more conversational language
- Check for technical issues

---

### Issue: Low Lead Capture Rate

**Symptoms:**
- Lots of conversations but few leads
- Users not providing contact info

**Solutions:**
- Delay lead form until value provided
- Offer something in exchange (guide, estimate)
- Make form shorter (name + email minimum)
- Add trust signals
- Test progressive disclosure

---

### Issue: Human Handoff Overload

**Symptoms:**
- Too many conversations escalating to Brandon
- Bot not resolving questions

**Solutions:**
- Identify common handoff triggers
- Add bot responses for common questions
- Improve FAQ coverage
- Train bot on new scenarios
- Consider if some handoffs are good (qualified leads)

---

## 6.4 Continuous Improvement Calendar

### Monthly Optimization Tasks

**Week 1:**
- Review previous month's analytics
- Identify top 3 improvement opportunities
- Prioritize based on impact

**Week 2:**
- Implement quick wins
- Start A/B tests
- Update content as needed

**Week 3:**
- Monitor test performance
- Gather user feedback
- Document learnings

**Week 4:**
- Conclude tests and implement winners
- Plan next month's optimizations
- Report on improvements

---

## 6.5 Escalation & Support Contacts

### Platform Support

**HubSpot:**
- Help Center: help.hubspot.com
- Support: Via portal (logged in)
- Community: community.hubspot.com

**Tidio:**
- Help Center: help.tidio.com
- Live Chat: Within dashboard
- Email: support@tidio.com

**ManyChat:**
- Help Center: help.manychat.com
- Community: Facebook Group

### Internal Escalation

**Technical Issues:**
1. Check platform status page
2. Review error logs
3. Contact platform support
4. Escalate to web developer if needed

**Content Issues:**
1. Review against documentation
2. Update chatbot-flows.md
3. Implement changes
4. Test before deploying

---

## Appendix: Quick Reference

### Brand Elements for Chat

| Element | Value |
|---------|-------|
| Primary Color | #0E1F34 (Navy) |
| Accent Color | #00A6B2 (Aqua) |
| Phone | 610-870-3113 |
| Email | brandon@tristateaquaticsolutions.com |
| Website | tristateaquaticsolutions.com |
| Business Hours | Mon-Sat, 8am-8pm ET |

### Key Chatbot Personalities

**Tone:** Friendly, helpful, knowledgeable, local
**Voice:** First person ("I'm Brandon", "We specialize in...")
**Avoid:** Overly formal, salesy, corporate-speak

### Response Time Targets

| Channel | Bot Response | Human Response |
|---------|--------------|----------------|
| Website Chat | Instant | < 5 minutes |
| Facebook | Instant | < 1 hour |
| Instagram | Instant | < 2 hours |
| After Hours | Instant (auto) | Next business day |

---

*Last Updated: February 2026*
*Document Owner: Marketing Team*
*Next Review: March 2026*
