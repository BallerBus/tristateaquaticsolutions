# PRD-06: Email Marketing System
## Tri-State Aquatic Solutions - Conversion Optimization

**Version:** 1.0
**Priority:** P2 (High)
**Status:** Ready for Implementation
**Est. Impact:** 20%+ improvement in lead-to-consultation rate

---

## 1. Executive Summary

Build a comprehensive email marketing system with automated nurture sequences, seasonal campaigns, and post-project engagement. Email is the highest-ROI marketing channel and critical for nurturing high-consideration pool purchases over the 3-6 month buying cycle.

### Success Metrics
| Metric | Current | 90-Day Target |
|--------|---------|---------------|
| Email list size | TBD | 500+ |
| Open rate | TBD | 30%+ |
| Click rate | TBD | 5%+ |
| Email → Consultation rate | TBD | 15%+ |

---

## 2. Current State Analysis

### Existing Email Assets
- Email sequences documented in `/marketing/email-sequences.md`
- Extended sequences in `/marketing/email-sequences-extended.md`
- Lead magnet email sequences exist
- Seasonal campaign content available

### Gaps Identified
1. **No confirmed email platform** - Need to implement
2. **Automation triggers** - Not configured
3. **Segmentation** - Not established
4. **Lead scoring integration** - Not implemented
5. **Tracking/attribution** - Needs setup

---

## 3. Requirements & Specifications

### 3.1 Email Platform Selection

**Recommended: ActiveCampaign**
- Cost: $29-$79/month for small list
- Features: Automation, CRM, lead scoring, segmentation
- Alternative: Mailchimp ($13-$20/month) or HubSpot (free-$45/month)

**Required Features:**
- [ ] Automated sequences/workflows
- [ ] Segmentation by behavior and attributes
- [ ] A/B testing capability
- [ ] CRM/lead management
- [ ] Analytics and reporting
- [ ] Form/landing page integration
- [ ] Mobile-responsive templates

### 3.2 Email List Segmentation

**Segment by Lead Source:**
| Segment | Trigger | Treatment |
|---------|---------|-----------|
| Calculator users | Used cost calculator | Send cost-focused content |
| Quiz completers | Completed pool quiz | Send personalized pool recommendations |
| Content downloaders | Downloaded lead magnet | Send related content series |
| Consultation requests | Requested consultation | High-touch sales sequence |
| Website browsers | Multiple page visits | General nurture sequence |

**Segment by Timeline:**
| Segment | Criteria | Treatment |
|---------|----------|-----------|
| Ready now | Timeline: ASAP/3 months | Aggressive follow-up, sales focus |
| Planning ahead | Timeline: This year | Nurture, education focus |
| Future dreamers | Timeline: Next year+ | Long-term nurture, inspiration |
| Unknown | No timeline indicated | Discovery sequence |

**Segment by Location:**
| Segment | Criteria | Treatment |
|---------|----------|-----------|
| Tier 1 locations | Gladwyne, Villanova, Hockessin, etc. | Priority, premium messaging |
| Tier 2 locations | Wayne, Malvern, West Chester, etc. | Standard messaging |
| Tier 3 locations | Expansion areas | Qualified with availability |
| Out of area | Outside service area | Remove or refer |

### 3.3 Automated Email Sequences

#### Sequence 1: New Lead Nurture (7 emails)

**Trigger:** Any new lead capture (form, calculator, quiz, download)

| Email | Day | Subject Line | Goal |
|-------|-----|--------------|------|
| 1 | 0 | Welcome + [resource they requested] | Deliver value, set expectations |
| 2 | 3 | "The question every pool buyer forgets to ask" | Education, positioning |
| 3 | 6 | "Here's what your backyard could look like" | Inspiration, social proof |
| 4 | 10 | "The real cost of waiting another year" | Address objections, urgency |
| 5 | 14 | "Fiberglass vs. Concrete: the numbers" | Education, differentiation |
| 6 | 18 | "Our spring schedule is filling up" | Urgency, scarcity |
| 7 | 21 | "One last thought before I go..." | Final push, consultation CTA |

**Email 1: Welcome (Day 0)**
```
Subject: Your [Resource Name] is here + a quick note from Brandon

Hi [First Name],

Thanks for downloading [Resource Name]! You can access it here: [Download Link]

I'm Brandon, the owner of Tri-State Aquatic Solutions. I started this company because I believe every family deserves a backyard they love coming home to.

If you're thinking about a pool, here's what I want you to know: this is a big decision, and you shouldn't rush it. Over the next few weeks, I'll share some insights that took me years to learn—things like:

• How to avoid the #1 mistake pool buyers make
• Why some pools cost 3x more to maintain (and how to avoid that)
• The honest truth about installation timelines
• What questions to ask ANY pool builder

No pressure, no sales tactics. Just helpful information.

Talk soon,
Brandon Calloway
Owner, Tri-State Aquatic Solutions

P.S. Have a question? Just reply to this email. I read every message personally.
```

**Email 4: Urgency (Day 10)**
```
Subject: The real cost of waiting another year

Hi [First Name],

I talk to a lot of homeowners who say, "Maybe next year."

I get it. A pool is a big investment, and it's easy to put off.

But here's what I've learned after helping dozens of families:

The families who wait often tell me they wish they hadn't.

Here's why:

1. **Another summer of "we should've..."**
   Those hot July weekends when you're stuck inside or paying $50 to crowd a public pool.

2. **Construction costs only go up**
   Materials, labor, and permits increase 5-8% annually. A pool that costs $65K today will cost $70K+ next year.

3. **The best installation slots fill first**
   Spring installations require fall planning. Wait until spring, and you might not swim until late summer.

4. **Your kids are only this age once**
   That's the one I hear most often from customers. "I wish we'd done this when the kids were younger."

I'm not trying to pressure you. If next year is right for you, that's okay.

But if you've been on the fence, I'd love to at least show you what's possible. A free consultation takes 30 minutes and comes with zero obligation.

[SCHEDULE MY FREE CONSULTATION]

Whatever you decide, I'm here to help.

Brandon

P.S. Our current promotion includes [current offer] for consultations scheduled this month.
```

#### Sequence 2: Post-Consultation Follow-up (5 emails)

**Trigger:** Consultation completed, no contract signed

| Email | Day | Subject Line | Goal |
|-------|-----|--------------|------|
| 1 | 1 | "Great meeting you, [Name]!" | Thank you, recap |
| 2 | 4 | "Your quote is ready" | Deliver proposal if not done live |
| 3 | 7 | "A few projects I thought you'd like" | Social proof, inspiration |
| 4 | 14 | "Any questions about your quote?" | Address objections |
| 5 | 21 | "Is a pool still on your mind?" | Re-engagement |

#### Sequence 3: Stale Lead Re-engagement (4 emails)

**Trigger:** No engagement for 30+ days

| Email | Day | Subject Line | Goal |
|-------|-----|--------------|------|
| 1 | 30 | "Still thinking about a pool, [Name]?" | Check-in |
| 2 | 45 | "Things have changed since we last talked" | New content/offer |
| 3 | 60 | "Last chance: [seasonal offer]" | Urgency |
| 4 | 90 | "Should I remove you from my list?" | Clean list, re-engage |

#### Sequence 4: Post-Project Review Request (5 emails)

**Trigger:** Project completed

| Email | Day | Subject Line | Goal |
|-------|-----|--------------|------|
| 1 | 3 | "How's that first swim?" | Check-in, delight |
| 2 | 7 | "Would you share your experience?" | Review request |
| 3 | 14 | "A few tips for your new pool" | Value, engagement |
| 4 | 30 | "Enjoying your pool? Tell Google!" | Review reminder |
| 5 | 60 | "Know anyone who'd love a pool?" | Referral request |

### 3.4 Seasonal Campaigns

**Campaign Calendar:**

| Month | Campaign Theme | Email Focus |
|-------|----------------|-------------|
| January | "New Year, New Backyard" | Planning for summer |
| February | "Valentine's Day Family Gift" | Emotional appeal |
| March | "Spring Planning" | Timeline urgency |
| April | "Last Call for Summer" | Scarcity, deadlines |
| May | "Memorial Day Dreams" | Lifestyle inspiration |
| June | "Summer Is Here" | Quick install options |
| July | "Beat the Heat" | Current customer engagement |
| August | "Fall Planning Begins" | Next year planning |
| September | "Off-Season Advantages" | Pricing benefits |
| October | "Winter Prep" | Pool closing, next year |
| November | "Thankful for Our Customers" | Appreciation, referrals |
| December | "2027 Planning" | Next year bookings |

**Sample Seasonal Campaign (March - Spring Planning):**

```
Subject: Swimming by Memorial Day? Here's what to do NOW.

[Header Image: Beautiful pool in spring setting]

Hi [First Name],

If you want to be swimming by Memorial Day, the clock is ticking.

Here's the timeline for a spring pool installation:

✓ March: Design consultation & permits submitted
✓ April: Permit approval & pre-construction
✓ Early May: Installation (2-4 weeks for fiberglass)
✓ Late May: SWIM TIME! 🏊

We're currently booking March and April installations, and slots are filling fast.

[SCHEDULE MY FREE CONSULTATION]

What you'll get in your consultation:
• On-site measurement of your yard
• Pool design recommendations for your space
• Detailed, transparent quote (no hidden costs)
• Timeline for your specific project
• Answers to all your questions

No pressure. No obligation. Just helpful information to make your decision easier.

Ready to make this summer different?

[BOOK MY CONSULTATION NOW]

To sunny days ahead,
Brandon Calloway

P.S. Fun fact: 70% of pool buyers say they wish they'd done it sooner. Don't let another summer pass you by.
```

### 3.5 Email Template Design

**Brand Guidelines for Email:**
- Header: Logo + tagline
- Colors: Match website palette
- Fonts: Clean, readable (system fonts for email)
- Images: High-quality, compressed
- CTAs: Prominent, single clear action
- Footer: Contact info, social links, unsubscribe

**Email Width:** 600px max
**Mobile:** Must be responsive

### 3.6 Lead Scoring Model

**Score Points by Action:**

| Action | Points |
|--------|--------|
| Email open | +1 |
| Email click | +5 |
| Website visit | +2 |
| Calculator use | +10 |
| Quiz completion | +10 |
| Content download | +5 |
| Pricing page view | +8 |
| Contact page view | +8 |
| Form submission | +20 |
| Consultation request | +50 |

**Score Thresholds:**
| Score | Status | Action |
|-------|--------|--------|
| 0-10 | Cold | Continue nurture |
| 11-30 | Warming | Increase email frequency |
| 31-50 | Warm | Send consultation offer |
| 51-75 | Hot | Personal outreach |
| 76+ | Very Hot | Phone call within 24 hours |

---

## 4. Implementation Checklist

### Phase 1: Platform Setup (Week 1)
- [ ] Select and sign up for email platform
- [ ] Import any existing contacts
- [ ] Set up sending domain authentication (SPF, DKIM)
- [ ] Create email templates (header, footer)
- [ ] Set up unsubscribe and preference center
- [ ] Connect to website forms

### Phase 2: Core Sequences (Week 2-3)
- [ ] Build New Lead Nurture sequence (7 emails)
- [ ] Build Post-Consultation sequence (5 emails)
- [ ] Build Post-Project sequence (5 emails)
- [ ] Set up automation triggers
- [ ] Test all sequences end-to-end

### Phase 3: Segmentation & Scoring (Week 3-4)
- [ ] Create all segments (source, timeline, location)
- [ ] Set up lead scoring rules
- [ ] Configure score-based alerts
- [ ] Test segmentation logic
- [ ] Create segment-specific content variations

### Phase 4: Seasonal Campaigns (Week 4-5)
- [ ] Create first seasonal campaign
- [ ] Schedule 3-month campaign calendar
- [ ] Build campaign templates
- [ ] Set up A/B testing for subjects

### Phase 5: Re-engagement & Optimization (Week 6-8)
- [ ] Build Stale Lead sequence
- [ ] Set up re-engagement automation
- [ ] Create list cleaning process
- [ ] Implement A/B testing strategy
- [ ] Review and optimize based on data

---

## 5. Email Performance Benchmarks

### Industry Benchmarks (Home Services)
| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Open rate | <15% | 15-25% | 25-35% | >35% |
| Click rate | <1% | 1-3% | 3-5% | >5% |
| Click-to-open | <5% | 5-10% | 10-15% | >15% |
| Unsubscribe | >1% | 0.5-1% | 0.25-0.5% | <0.25% |
| Bounce rate | >5% | 2-5% | 1-2% | <1% |

### Target Metrics by Sequence
| Sequence | Open Rate | Click Rate |
|----------|-----------|------------|
| New Lead Nurture | 35%+ | 5%+ |
| Post-Consultation | 50%+ | 10%+ |
| Post-Project | 60%+ | 15%+ |
| Seasonal Campaigns | 25%+ | 4%+ |
| Re-engagement | 15%+ | 2%+ |

---

## 6. A/B Testing Plan

### Elements to Test
| Element | Variations | Measure |
|---------|------------|---------|
| Subject lines | Curiosity vs. direct | Open rate |
| Send time | Morning vs. evening | Open rate |
| CTA button | Color, text, placement | Click rate |
| Email length | Short vs. long | Click rate |
| Personalization | Name vs. no name | Open rate |
| Sender name | Brandon vs. Company | Open rate |

### Testing Schedule
| Month | Test Focus |
|-------|------------|
| Month 1 | Subject line styles |
| Month 2 | Send times |
| Month 3 | CTA variations |
| Month 4 | Email length |

---

## 7. Success Metrics & Tracking

### Weekly Tracking
| Metric | Tool | Target |
|--------|------|--------|
| Emails sent | Platform | Track volume |
| Open rate | Platform | 30%+ |
| Click rate | Platform | 5%+ |
| Unsubscribes | Platform | <0.5% |

### Monthly Tracking
| Metric | Tool | Target |
|--------|------|--------|
| List growth | Platform | +50/month |
| Email → Consultation | Platform + CRM | 15%+ |
| Revenue attributed | CRM | Track |
| Best performing content | Platform | Identify patterns |

### Quarterly Tracking
| Metric | Tool | Target |
|--------|------|--------|
| List quality score | Platform | 80%+ engaged |
| Sequence conversion rates | Platform | Benchmark and improve |
| Campaign ROI | Platform + CRM | Positive |

---

## 8. Compliance & Best Practices

### CAN-SPAM Compliance
- [ ] Physical address in footer
- [ ] Clear unsubscribe link
- [ ] Honor unsubscribes within 10 days
- [ ] Accurate "From" name
- [ ] No deceptive subject lines

### GDPR Considerations (if applicable)
- [ ] Explicit consent for marketing
- [ ] Easy unsubscribe
- [ ] Data access requests process
- [ ] Privacy policy link

### Deliverability Best Practices
- [ ] Authenticate sending domain
- [ ] Clean list regularly (remove bounces)
- [ ] Maintain engagement (remove inactive)
- [ ] Avoid spam trigger words
- [ ] Consistent sending volume

---

## 9. Dependencies & Risks

### Dependencies
- Email platform subscription
- Website form integration
- Lead data collection
- Content creation capacity

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low open rates | Medium | Test subject lines, improve list quality |
| High unsubscribes | Medium | Review content relevance, frequency |
| Deliverability issues | High | Proper authentication, list hygiene |
| Content bottleneck | Medium | Build content library in advance |

---

## 10. Resources

### Reference Documents
- `/marketing/email-sequences.md`
- `/marketing/email-sequences-extended.md`
- `/marketing/lead-magnets/` (all email sequences)
- `/marketing/seasonal-campaigns.md`

### Email Platform Resources
- [ActiveCampaign Help](https://help.activecampaign.com/)
- [Mailchimp Resources](https://mailchimp.com/resources/)
- [Email on Acid](https://www.emailonacid.com/) (testing)

---

*Last Updated: February 2026*
*Owner: Marketing Team*
*Next Review: March 2026*
