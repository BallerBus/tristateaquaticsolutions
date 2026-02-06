# PRD-02: Interactive Lead Capture Optimization
## Tri-State Aquatic Solutions - Conversion Optimization

**Version:** 1.0
**Priority:** P1 (Critical)
**Status:** Ready for Implementation
**Est. Impact:** 50%+ increase in lead capture rate

---

## 1. Executive Summary

Optimize existing interactive tools (pool cost calculator, pool quiz, comparison tool) to maximize lead capture while improving user experience. The website already has these tools built - this PRD focuses on UX refinement, better lead capture flows, and A/B testing to improve conversion rates.

### Success Metrics
| Metric | Current | Target (90 days) |
|--------|---------|------------------|
| Calculator completion rate | TBD | 60%+ |
| Quiz completion rate | TBD | 70%+ |
| Email capture rate (tools) | TBD | 35%+ |
| Tool → Consultation rate | TBD | 15%+ |

---

## 2. Current State Analysis

### Existing Interactive Tools
| Tool | Location | Status |
|------|----------|--------|
| Pool Cost Calculator | `/tools/pool-cost-calculator.html` | Built |
| Pool Quiz | `/tools/pool-quiz/` | Built |
| Compare Pools Tool | `/tools/compare-pools/` | Built |
| ROI Calculator | `/tools/roi-calculator.html` | Built |
| Maintenance Cost Calculator | `/tools/maintenance-cost-calculator.html` | Built |
| Timeline Tool | `/tools/timeline/` | Built |
| Pool Size Guide | `/tools/pool-size-guide.html` | Built |
| Payment Calculator | `/financing/payment-calculator.html` | Built |

### Existing Components
| Component | Location | Purpose |
|-----------|----------|---------|
| Quiz Lead Capture | `/components/quiz-lead-capture.html` | Captures quiz completions |
| Calculator Email Capture | `/components/calculator-email-capture.html` | Captures calculator users |
| Exit Intent Popup | `/components/exit-intent-popup.html` | Captures abandoners |
| Contact Form | `/components/contact-form.html` | Main contact form |

### Identified Gaps
1. **No unified tracking** - Can't measure tool effectiveness
2. **Friction in lead capture** - Too many fields, bad timing
3. **No progressive profiling** - Asking everything upfront
4. **Missing follow-up automation** - Leads not nurtured after tool use
5. **Mobile experience issues** - Tools may not be mobile-optimized

---

## 3. Requirements & Specifications

### 3.1 Pool Cost Calculator Optimization

**Current Issues to Fix:**
- Unknown drop-off points
- Lead capture may be too early/late
- Results may not be compelling enough

**Required Changes:**

**Step 1: Add Analytics Tracking**
```javascript
// Track each step completion
gtag('event', 'calculator_step_complete', {
  'step_number': stepNumber,
  'step_name': stepName,
  'time_on_step': timeOnStep
});

// Track drop-offs
gtag('event', 'calculator_abandoned', {
  'last_step': lastCompletedStep,
  'total_time': totalTimeSpent
});

// Track completions
gtag('event', 'calculator_complete', {
  'estimated_cost': estimatedCost,
  'pool_type': selectedPoolType,
  'features_selected': featuresArray
});
```

**Step 2: Optimize Lead Capture Timing**
- Show email capture AFTER showing basic results
- Position: "Get your detailed cost breakdown emailed to you"
- Only require: Name, Email, Phone (optional)
- Add: "We'll include 3 pool designs that fit your budget"

**Step 3: Improve Results Display**
```html
<!-- Results should include -->
<div class="calculator-results">
  <h2>Your Estimated Pool Cost: $XX,XXX - $XX,XXX</h2>

  <div class="breakdown">
    <h3>Here's what's included:</h3>
    <ul>
      <li>✓ Pool shell and installation</li>
      <li>✓ Basic equipment package</li>
      <li>✓ Permit assistance</li>
      <li>✓ Standard decking allowance</li>
    </ul>
  </div>

  <div class="value-add">
    <h3>Want to see your options?</h3>
    <p>Enter your email and we'll send you:</p>
    <ul>
      <li>📋 Detailed cost breakdown PDF</li>
      <li>🏊 3 pool designs in your budget</li>
      <li>💰 Financing options starting at $XXX/month</li>
    </ul>

    <form id="calculator-capture">
      <input type="text" name="name" placeholder="Your Name" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="tel" name="phone" placeholder="Phone (optional)">
      <button type="submit">Send My Cost Breakdown</button>
    </form>
  </div>
</div>
```

### 3.2 Pool Quiz Optimization

**Current Flow Analysis Needed:**
- How many questions?
- Where do users drop off?
- What's the value proposition?

**Required Changes:**

**Step 1: Streamline to 5-7 Questions Max**
```
Q1: What's your primary goal for your pool? [Exercise / Family Fun / Entertainment / Relaxation]
Q2: How would you describe your backyard size? [Compact / Medium / Large / Not sure]
Q3: Which features are must-haves? [Multi-select: Tanning ledge, Hot tub, Deep end, Beach entry]
Q4: What's your timeline? [ASAP / This year / Next year / Just exploring]
Q5: What's your budget range? [Under $50K / $50-75K / $75-100K / $100K+ / Not sure]
Q6: Where is your home located? [Dropdown of service areas]
```

**Step 2: Show Personalized Results**
```html
<div class="quiz-results">
  <h2>🎯 Your Perfect Pool Match</h2>

  <div class="recommendation">
    <img src="/images/pools/[recommended-pool].jpg" alt="Recommended pool">
    <h3>The [Pool Model Name]</h3>
    <p>Based on your answers, this [size] [shape] pool is perfect for [their primary goal].</p>

    <ul class="match-reasons">
      <li>✓ Perfect for [their yard size] backyards</li>
      <li>✓ Includes [their selected features]</li>
      <li>✓ Fits your $[budget range] budget</li>
      <li>✓ Can be installed by [their timeline]</li>
    </ul>

    <p class="price-range">Estimated investment: $XX,XXX - $XX,XXX</p>
  </div>

  <div class="cta-section">
    <h3>Ready to see this pool in your backyard?</h3>
    <p>Schedule a free design consultation and we'll show you exactly how this pool would look in YOUR space.</p>

    <form id="quiz-capture">
      <input type="text" name="name" placeholder="Your Name" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="tel" name="phone" placeholder="Phone" required>
      <button type="submit">Book My Free Consultation</button>
    </form>

    <p class="urgency">⚡ [X] homeowners in [their area] booked consultations this week</p>
  </div>
</div>
```

### 3.3 Lead Magnet Integration

**Create Gated Content Offers:**

| Lead Magnet | Target Audience | Capture Location |
|-------------|-----------------|------------------|
| 2026 Pool Cost Guide PDF | Price researchers | Calculator results |
| Backyard Transformation Lookbook | Visual shoppers | Gallery pages |
| Pool Permit Checklist | Planners | Permit pages |
| Fiberglass vs Concrete Comparison | Comparison shoppers | Compare tool |
| Main Line Pool Planning Guide | Qualified leads | Quiz results |

**Lead Magnet Delivery Flow:**
1. User completes tool/form
2. Thank you page shows: "Check your email!"
3. Immediate email with download link
4. Lead enters nurture sequence
5. Follow-up call within 24 hours (high-intent leads)

### 3.4 Progressive Profiling

**First Interaction (Minimal):**
- Name
- Email

**Second Interaction (Add):**
- Phone
- Location/Zip

**Third Interaction (Add):**
- Timeline
- Budget range

**Implementation:**
```javascript
// Check what we already know about the user
const existingData = getLeadData(email);

// Only show fields we don't have
const fieldsToShow = [
  !existingData.phone && 'phone',
  !existingData.zip && 'zip',
  !existingData.timeline && 'timeline'
].filter(Boolean);

// Pre-fill known information
if (existingData.name) {
  document.getElementById('name').value = existingData.name;
}
```

### 3.5 Exit Intent Optimization

**Trigger Conditions:**
- Mouse moves toward browser close button
- Tab becomes inactive after 30+ seconds
- Scroll behavior indicates leaving
- Mobile: Start to swipe away

**Exit Intent Popup Content:**
```html
<div class="exit-popup">
  <button class="close-popup">×</button>

  <h2>Wait! Don't leave without your free guide</h2>

  <div class="offer">
    <img src="/images/lead-magnets/cost-guide-cover.png" alt="Pool Cost Guide">
    <div class="offer-details">
      <h3>2026 Main Line Pool Cost Guide</h3>
      <ul>
        <li>✓ Real pricing for your area</li>
        <li>✓ Hidden costs to watch for</li>
        <li>✓ Financing options explained</li>
        <li>✓ 10 questions to ask any builder</li>
      </ul>
    </div>
  </div>

  <form id="exit-capture">
    <input type="email" placeholder="Enter your email" required>
    <button type="submit">Send My Free Guide</button>
  </form>

  <p class="privacy">We respect your privacy. Unsubscribe anytime.</p>
</div>
```

**Exit Intent Rules:**
- Only show once per session
- Don't show if user already submitted a form
- Don't show on thank you pages
- Mobile: Show as bottom sheet, not popup

---

## 4. Technical Implementation

### 4.1 Form Tracking Setup

**Google Analytics 4 Events:**
```javascript
// Form impression
gtag('event', 'form_view', {
  'form_name': formName,
  'form_location': pageUrl
});

// Form interaction start
gtag('event', 'form_start', {
  'form_name': formName,
  'first_field': firstFieldInteracted
});

// Form submission
gtag('event', 'generate_lead', {
  'form_name': formName,
  'lead_type': leadType,
  'estimated_value': estimatedProjectValue
});

// Form abandonment
gtag('event', 'form_abandoned', {
  'form_name': formName,
  'fields_completed': fieldsCompleted,
  'last_field': lastFieldTouched
});
```

### 4.2 A/B Testing Framework

**Tests to Run:**

| Test | Variants | Metric | Duration |
|------|----------|--------|----------|
| Calculator CTA text | "Get Quote" vs "See My Options" | Click rate | 2 weeks |
| Quiz length | 5 vs 7 questions | Completion rate | 2 weeks |
| Lead capture timing | Before vs After results | Capture rate | 2 weeks |
| Exit popup offer | Cost Guide vs Free Consult | Conversion rate | 2 weeks |
| Form fields | 2 vs 3 required | Submission rate | 2 weeks |

**A/B Test Implementation:**
```javascript
// Simple A/B test function
function getVariant(testName) {
  const storedVariant = localStorage.getItem(`ab_${testName}`);
  if (storedVariant) return storedVariant;

  const variant = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(`ab_${testName}`, variant);

  gtag('event', 'experiment_impression', {
    'experiment_id': testName,
    'variant_id': variant
  });

  return variant;
}

// Usage
const ctaVariant = getVariant('calculator_cta');
if (ctaVariant === 'A') {
  ctaButton.textContent = 'Get Quote';
} else {
  ctaButton.textContent = 'See My Options';
}
```

### 4.3 CRM/Email Integration

**Lead Data to Capture:**
```javascript
const leadData = {
  // Contact info
  name: formData.name,
  email: formData.email,
  phone: formData.phone || null,

  // Source tracking
  source: 'website',
  medium: utmParams.medium || 'organic',
  campaign: utmParams.campaign || null,
  landingPage: firstPageUrl,
  conversionPage: currentPageUrl,

  // Tool-specific data
  toolUsed: toolName,
  estimatedBudget: calculatedBudget || quizBudget,
  timeline: selectedTimeline,
  poolType: selectedPoolType,
  features: selectedFeatures,
  location: selectedLocation || detectedLocation,

  // Engagement data
  pagesViewed: pagesVisited.length,
  timeOnSite: totalTimeOnSite,
  previousVisits: visitCount,

  // Qualification
  leadScore: calculateLeadScore(),
  priority: determinePriority()
};
```

**Lead Scoring Model:**
```javascript
function calculateLeadScore() {
  let score = 0;

  // Budget signals (+20 max)
  if (budget > 75000) score += 20;
  else if (budget > 50000) score += 15;
  else if (budget > 35000) score += 10;

  // Timeline signals (+20 max)
  if (timeline === 'asap') score += 20;
  else if (timeline === 'this_year') score += 15;
  else if (timeline === 'next_year') score += 10;

  // Location signals (+20 max)
  if (tier1Locations.includes(location)) score += 20;
  else if (tier2Locations.includes(location)) score += 15;
  else if (serviceArea.includes(location)) score += 10;

  // Engagement signals (+20 max)
  if (pagesViewed > 10) score += 10;
  if (usedCalculator) score += 5;
  if (usedQuiz) score += 5;

  // Contact completeness (+20 max)
  if (phone) score += 15;
  if (email && phone) score += 5;

  return score; // Max 100
}
```

---

## 5. Implementation Checklist

### Phase 1: Analytics Foundation (Week 1)
- [ ] Add GA4 event tracking to all forms
- [ ] Add calculator step tracking
- [ ] Add quiz step tracking
- [ ] Set up form abandonment tracking
- [ ] Create conversion funnels in GA4
- [ ] Set up lead source tracking

### Phase 2: Calculator Optimization (Week 2-3)
- [ ] Audit current calculator UX
- [ ] Redesign results page
- [ ] Optimize lead capture form (reduce fields)
- [ ] Add value proposition to capture form
- [ ] Implement immediate email delivery
- [ ] Test on mobile devices

### Phase 3: Quiz Optimization (Week 3-4)
- [ ] Audit current quiz flow
- [ ] Reduce to 5-7 questions max
- [ ] Create personalized results templates
- [ ] Add social proof to results
- [ ] Optimize lead capture timing
- [ ] Mobile-optimize experience

### Phase 4: Lead Magnets (Week 4-5)
- [ ] Create 2026 Pool Cost Guide PDF
- [ ] Create Backyard Transformation Lookbook
- [ ] Create Pool Permit Checklist
- [ ] Set up download delivery automation
- [ ] Add lead magnets to appropriate pages
- [ ] Test email delivery flow

### Phase 5: Exit Intent & A/B Testing (Week 6-8)
- [ ] Redesign exit intent popup
- [ ] Implement exit intent rules
- [ ] Set up A/B testing framework
- [ ] Launch first 2 A/B tests
- [ ] Monitor and analyze results
- [ ] Implement winning variants

---

## 6. Lead Capture Form Templates

### Minimal Form (2 fields)
```html
<form class="lead-form minimal">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Email Address" required>
  <button type="submit">Get Started</button>
</form>
```

### Standard Form (3 fields)
```html
<form class="lead-form standard">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Email Address" required>
  <input type="tel" name="phone" placeholder="Phone Number">
  <button type="submit">Get My Free Quote</button>
</form>
```

### Qualified Lead Form (5 fields)
```html
<form class="lead-form qualified">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Email Address" required>
  <input type="tel" name="phone" placeholder="Phone Number" required>
  <select name="timeline" required>
    <option value="">When are you looking to build?</option>
    <option value="asap">As soon as possible</option>
    <option value="3months">Within 3 months</option>
    <option value="6months">Within 6 months</option>
    <option value="year">Within a year</option>
    <option value="exploring">Just exploring</option>
  </select>
  <select name="budget" required>
    <option value="">What's your budget range?</option>
    <option value="under50">Under $50,000</option>
    <option value="50-75">$50,000 - $75,000</option>
    <option value="75-100">$75,000 - $100,000</option>
    <option value="over100">$100,000+</option>
    <option value="unsure">Not sure yet</option>
  </select>
  <button type="submit">Book My Free Consultation</button>
</form>
```

---

## 7. Success Metrics & Tracking

### Weekly Tracking
| Metric | Tool | Target |
|--------|------|--------|
| Form submissions | GA4 | Track trend |
| Calculator completions | GA4 | 60%+ rate |
| Quiz completions | GA4 | 70%+ rate |
| Email capture rate | GA4 | 35%+ |

### Monthly Tracking
| Metric | Tool | Target |
|--------|------|--------|
| Total leads captured | CRM | 60-100 |
| Lead → Consultation rate | CRM | 25%+ |
| Tool-sourced leads | GA4 | 40%+ of total |
| Exit popup conversions | GA4 | 5%+ |

### A/B Test Tracking
| Test | Winner | Lift | Date |
|------|--------|------|------|
| [Test name] | [Variant] | [X%] | [Date] |

---

## 8. Dependencies & Risks

### Dependencies
- GA4 properly configured
- Email platform integration
- CRM system access
- Developer resources for changes

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Tool breaks during optimization | High | Test in staging first |
| Lead quality drops | Medium | Monitor lead scores |
| Mobile experience degrades | High | Mobile-first testing |
| Form spam increases | Low | Add honeypot/reCAPTCHA |

---

## 9. Resources

### Reference Documents
- `/marketing/conversion-optimization.md`
- `/marketing/lead-magnets/` (all lead magnet content)
- `/components/` (existing form components)

### Tools Needed
- Google Analytics 4
- Google Optimize (or VWO for A/B testing)
- Email platform (ActiveCampaign/Mailchimp)
- Form analytics (Hotjar or similar)

---

*Last Updated: February 2026*
*Owner: Marketing Team*
*Next Review: March 2026*
