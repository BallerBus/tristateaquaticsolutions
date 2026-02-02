# A/B Testing Playbook
## Tri-State Aquatic Solutions

---

## Table of Contents

1. [A/B Testing Methodology](#ab-testing-methodology)
2. [Statistical Significance Requirements](#statistical-significance-requirements)
3. [Sample Size Calculator Guidance](#sample-size-calculator-guidance)
4. [Test Duration Guidelines](#test-duration-guidelines)
5. [Prioritization Framework](#prioritization-framework)
6. [Test Backlog](#test-backlog)

---

## A/B Testing Methodology

### Core Principles

1. **Test One Variable at a Time**: Isolate changes to understand what drives results
2. **Start with High-Impact Areas**: Focus on pages with most traffic and conversion potential
3. **Document Everything**: Record hypotheses, results, and learnings
4. **Run Tests to Completion**: Don't peek and stop early
5. **Implement Winners**: Actually deploy winning variants

### Test Development Process

#### Step 1: Identify Opportunity
- Review analytics for drop-off points
- Analyze heatmaps and session recordings
- Gather customer feedback
- Competitive research

#### Step 2: Form Hypothesis
Use the format:
```
IF [we change X]
THEN [metric Y will improve]
BECAUSE [reasoning based on user behavior/psychology]
```

#### Step 3: Design Variants
- **Control**: Current version (no changes)
- **Variant(s)**: Modified version(s)
- Keep changes focused and measurable

#### Step 4: Technical Setup
1. Configure experiment in `ab-testing.js`
2. Create variant content (CSS classes or dynamic content)
3. Set up conversion tracking
4. QA across devices/browsers

#### Step 5: Launch & Monitor
- Verify tracking is working
- Monitor for technical issues
- Don't make changes mid-test

#### Step 6: Analyze & Document
- Wait for statistical significance
- Document results in test tracker
- Share learnings with team

#### Step 7: Implement or Iterate
- Deploy winner or
- Design follow-up test based on learnings

---

## Statistical Significance Requirements

### Minimum Requirements

| Metric | Significance Level | Power | Minimum Detectable Effect |
|--------|-------------------|-------|---------------------------|
| Primary Conversion | 95% | 80% | 10% relative improvement |
| Secondary Metrics | 90% | 80% | 15% relative improvement |
| Micro-conversions | 90% | 70% | 20% relative improvement |

### Understanding the Numbers

- **Significance Level (95%)**: 5% chance of false positive (saying variant wins when it doesn't)
- **Statistical Power (80%)**: 80% chance of detecting a real effect if one exists
- **Minimum Detectable Effect (MDE)**: Smallest improvement we can reliably detect

### When to Call a Test

**Winner Declared When:**
- Reached required sample size
- Statistical significance achieved (p < 0.05)
- Consistent results over multiple days
- No concerning secondary metric degradation

**Test Inconclusive When:**
- Reached max duration without significance
- Effect size smaller than MDE
- High day-to-day variance

**Stop Test Early When:**
- Major technical issues discovered
- Variant causing significant harm (>20% decrease)
- External factors invalidate test (site outage, etc.)

---

## Sample Size Calculator Guidance

### Quick Reference Table

For our typical conversion rates and traffic:

| Baseline Conv. Rate | MDE | Sample Size Per Variant |
|---------------------|-----|-------------------------|
| 1% | 10% relative | 115,000 |
| 1% | 20% relative | 29,000 |
| 2% | 10% relative | 57,000 |
| 2% | 20% relative | 14,500 |
| 3% | 10% relative | 38,000 |
| 3% | 20% relative | 9,600 |
| 5% | 10% relative | 22,500 |
| 5% | 20% relative | 5,700 |
| 10% | 10% relative | 10,600 |
| 10% | 20% relative | 2,700 |

### Sample Size Formula

```
n = 2 * (Zα/2 + Zβ)² * p(1-p) / δ²

Where:
- n = sample size per variant
- Zα/2 = 1.96 for 95% confidence
- Zβ = 0.84 for 80% power
- p = baseline conversion rate
- δ = absolute difference to detect
```

### Recommended Calculators

1. **Evan Miller's Calculator**: https://www.evanmiller.org/ab-testing/sample-size.html
2. **Optimizely Calculator**: https://www.optimizely.com/sample-size-calculator/
3. **AB Testguide**: https://abtestguide.com/calc/

### Adjustments for Our Business

Given pool installation is high-value, low-volume:

- **Primary Metric**: Form submissions (not purchases)
- **Expected Rate**: 2-5% form submission rate
- **Realistic MDE**: 20-30% relative improvement
- **Typical Sample**: 3,000-10,000 visitors per variant

---

## Test Duration Guidelines

### Minimum Duration Rules

1. **Absolute Minimum**: 7 days (capture weekly patterns)
2. **Recommended Minimum**: 14 days (two full weekly cycles)
3. **Complex Tests**: 21-28 days (capture monthly patterns)

### Maximum Duration

- **Standard Tests**: 6 weeks maximum
- **Low Traffic Tests**: 8 weeks maximum
- **After Maximum**: Declare inconclusive, move on

### Duration Estimation

```
Duration (days) = (Required Sample Size × Number of Variants) / Daily Traffic to Test Page
```

**Example for our site:**
- Required sample: 5,000 per variant
- 2 variants = 10,000 total
- 200 daily visitors to homepage
- Duration = 10,000 / 200 = 50 days

### Factors That Extend Duration

- Seasonal fluctuations (summer vs winter for pools)
- Multiple variants (more variants = more traffic needed)
- Lower traffic pages
- Smaller expected effect size

### When to Test

**Best Testing Periods:**
- March-May (spring research season)
- September-October (fall planning season)

**Avoid Testing During:**
- Holiday weeks (Thanksgiving, Christmas)
- Major promotions or campaigns
- Website redesigns or migrations

---

## Prioritization Framework

### PIE Scoring Framework

Rate each test idea 1-10 on three factors:

| Factor | Description | Questions to Ask |
|--------|-------------|------------------|
| **P**otential | How much improvement is possible? | What's the max upside? How broken is it currently? |
| **I**mportance | How valuable is the traffic/page? | Traffic volume? Revenue impact? Strategic importance? |
| **E**ase | How easy to implement? | Dev time? Resources needed? Technical complexity? |

**PIE Score** = (Potential + Importance + Ease) / 3

### ICE Scoring Framework (Alternative)

| Factor | Description | Scale |
|--------|-------------|-------|
| **I**mpact | Expected improvement size | 1-10 |
| **C**onfidence | How sure are we it will work? | 1-10 |
| **E**ase | Implementation difficulty (inverse) | 1-10 |

**ICE Score** = Impact × Confidence × Ease

### Prioritization Matrix

```
         High Impact
              │
              │  QUICK WINS     DO FIRST
              │    (3)            (1)
   ───────────┼───────────────────────
              │
              │   MAYBE          DO NEXT
              │    (4)            (2)
              │
         Low Impact

         Easy ─────────────────── Hard
                  Ease
```

### Our Priority Order

1. **Highest Priority**: High impact, easy implementation
2. **High Priority**: High impact, harder implementation
3. **Medium Priority**: Quick wins with moderate impact
4. **Low Priority**: Low impact regardless of ease

---

## Test Backlog

### Category 1: Headlines (Tests 1-5)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 1 | **Hero Headline: Urgency** | IF we add urgency ("Book Now for Summer 2024") THEN conversions increase BECAUSE seasonal motivation drives action | P:8 I:9 E:9 = **8.7** |
| 2 | **Hero Headline: Value Prop** | IF we lead with benefit ("Your Dream Pool in 2 Weeks") THEN conversions increase BECAUSE speed is key differentiator | P:8 I:9 E:9 = **8.7** |
| 3 | **Hero Headline: Social Proof** | IF we include proof ("Trusted by 500+ Families") THEN conversions increase BECAUSE trust reduces perceived risk | P:7 I:9 E:9 = **8.3** |
| 4 | **Hero Headline: Question Format** | IF we ask a question ("Ready for Summer?") THEN engagement increases BECAUSE questions create mental participation | P:6 I:9 E:9 = **8.0** |
| 5 | **Service Page Headlines** | IF we use specific benefit headlines per service THEN page engagement increases BECAUSE specificity builds relevance | P:7 I:7 E:8 = **7.3** |

### Category 2: CTAs (Tests 6-10)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 6 | **CTA: Action-Oriented** | IF CTA says "Get Your Free Quote" vs "Contact Us" THEN clicks increase BECAUSE clear value is promised | P:9 I:9 E:10 = **9.3** |
| 7 | **CTA: Benefit-Focused** | IF CTA says "See Your Pool Design" THEN clicks increase BECAUSE outcome is visualized | P:8 I:9 E:10 = **9.0** |
| 8 | **CTA: Low Commitment** | IF CTA says "Just Looking? Get Ideas" THEN clicks increase from hesitant visitors BECAUSE pressure is reduced | P:7 I:8 E:10 = **8.3** |
| 9 | **CTA Button Color** | IF we use orange vs blue CTA buttons THEN clicks increase BECAUSE contrast draws attention | P:5 I:9 E:10 = **8.0** |
| 10 | **CTA Button Size** | IF we increase CTA button size by 25% THEN clicks increase BECAUSE visibility improves | P:4 I:9 E:10 = **7.7** |

### Category 3: Form Layouts (Tests 11-15)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 11 | **Form: Reduced Fields** | IF we reduce form to 3 fields (name, email, phone) THEN submissions increase BECAUSE friction decreases | P:9 I:9 E:7 = **8.3** |
| 12 | **Form: Progressive Disclosure** | IF we show fields one at a time THEN completion increases BECAUSE task seems manageable | P:8 I:9 E:5 = **7.3** |
| 13 | **Form: Single Column** | IF we use single-column vs multi-column form THEN completion increases BECAUSE scanning is easier | P:6 I:9 E:8 = **7.7** |
| 14 | **Form: With Progress Bar** | IF we add progress indicator THEN completion increases BECAUSE end is visible | P:7 I:9 E:6 = **7.3** |
| 15 | **Form: Inline Validation** | IF we add real-time validation THEN completion increases BECAUSE errors are caught immediately | P:6 I:8 E:5 = **6.3** |

### Category 4: Pricing Display (Tests 16-18)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 16 | **Pricing: Range Display** | IF we show "$35k-$55k" vs "Starting at $35k" THEN qualified leads increase BECAUSE expectations are set | P:8 I:8 E:9 = **8.3** |
| 17 | **Pricing: Monthly Payment** | IF we show monthly financing ($299/mo) THEN inquiries increase BECAUSE affordability is clear | P:8 I:8 E:8 = **8.0** |
| 18 | **Pricing: Package Tiers** | IF we show good/better/best packages THEN decision-making improves BECAUSE comparison is easy | P:7 I:7 E:5 = **6.3** |

### Category 5: Social Proof Placement (Tests 19-22)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 19 | **Testimonials Above Fold** | IF testimonials are visible immediately THEN trust increases faster BECAUSE proof comes before pitch | P:8 I:9 E:8 = **8.3** |
| 20 | **Testimonials Near CTA** | IF testimonial appears next to form THEN conversions increase BECAUSE reassurance at decision point | P:9 I:9 E:8 = **8.7** |
| 21 | **Review Count Badge** | IF we show "4.9 stars (47 reviews)" badge THEN trust increases BECAUSE social proof is quantified | P:7 I:8 E:9 = **8.0** |
| 22 | **Video Testimonials** | IF we feature video over text testimonials THEN engagement increases BECAUSE video is more believable | P:7 I:7 E:5 = **6.3** |

### Category 6: Image Selection (Tests 23-25)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 23 | **Hero: Lifestyle vs Pool** | IF hero shows family enjoying pool vs just pool THEN emotional connection increases BECAUSE outcome is visualized | P:7 I:9 E:8 = **8.0** |
| 24 | **Gallery: Before/After** | IF we lead with before/after images THEN interest increases BECAUSE transformation is visible | P:8 I:7 E:7 = **7.3** |
| 25 | **Local Photos vs Stock** | IF we use local project photos THEN trust increases BECAUSE authenticity is apparent | P:8 I:8 E:6 = **7.3** |

### Category 7: Page Layouts (Tests 26-28)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 26 | **Homepage: Long vs Short** | IF we use shorter homepage with clear sections THEN engagement increases BECAUSE scanning is easier | P:6 I:9 E:4 = **6.3** |
| 27 | **Service Page: Tabs vs Scroll** | IF we use tabs to organize content THEN engagement increases BECAUSE user controls experience | P:5 I:6 E:5 = **5.3** |
| 28 | **Mobile: Bottom CTA Bar** | IF we add sticky bottom CTA on mobile THEN conversions increase BECAUSE action is always accessible | P:8 I:8 E:6 = **7.3** |

### Category 8: Navigation (Tests 29-30)

| # | Test Name | Hypothesis | Priority (PIE) |
|---|-----------|------------|----------------|
| 29 | **Nav: Phone Number Visible** | IF phone number is in header THEN calls increase BECAUSE contact method is obvious | P:7 I:8 E:9 = **8.0** |
| 30 | **Nav: Simplified Menu** | IF we reduce menu items from 8 to 5 THEN navigation improves BECAUSE choices are clearer | P:5 I:7 E:7 = **6.3** |

---

## Test Backlog Summary by Priority

### Immediate Priority (Score 8.5+)
1. CTA: Action-Oriented (9.3)
2. CTA: Benefit-Focused (9.0)
3. Testimonials Near CTA (8.7)
4. Hero Headline: Urgency (8.7)
5. Hero Headline: Value Prop (8.7)

### High Priority (Score 7.5-8.4)
6. Hero Headline: Social Proof (8.3)
7. Form: Reduced Fields (8.3)
8. Pricing: Range Display (8.3)
9. Testimonials Above Fold (8.3)
10. CTA: Low Commitment (8.3)
11. Review Count Badge (8.0)
12. CTA Button Color (8.0)
13. Hero: Lifestyle vs Pool (8.0)
14. Hero Headline: Question Format (8.0)
15. Pricing: Monthly Payment (8.0)
16. Nav: Phone Number Visible (8.0)
17. CTA Button Size (7.7)
18. Form: Single Column (7.7)

### Medium Priority (Score 6.5-7.4)
19. Service Page Headlines (7.3)
20. Form: Progressive Disclosure (7.3)
21. Form: With Progress Bar (7.3)
22. Gallery: Before/After (7.3)
23. Local Photos vs Stock (7.3)
24. Mobile: Bottom CTA Bar (7.3)

### Lower Priority (Score <6.5)
25. Form: Inline Validation (6.3)
26. Pricing: Package Tiers (6.3)
27. Video Testimonials (6.3)
28. Homepage: Long vs Short (6.3)
29. Nav: Simplified Menu (6.3)
30. Service Page: Tabs vs Scroll (5.3)

---

## Quick Start: First 3 Tests

Based on prioritization, start with:

### Test 1: CTA Text Optimization
- **Current**: "Contact Us"
- **Variant A**: "Get Your Free Quote"
- **Variant B**: "See Your Pool Design"
- **Primary Metric**: Form submissions
- **Expected Duration**: 14-21 days

### Test 2: Social Proof Near Form
- **Current**: Testimonials in separate section
- **Variant A**: Single testimonial next to form
- **Variant B**: Review badge next to form
- **Primary Metric**: Form submissions
- **Expected Duration**: 14-21 days

### Test 3: Hero Headline
- **Current**: [Document current headline]
- **Variant A**: Urgency-focused
- **Variant B**: Benefit-focused (speed)
- **Primary Metric**: Scroll depth + form submissions
- **Expected Duration**: 14-21 days

---

## Resources

### Recommended Reading
- "Trustworthy Online Controlled Experiments" by Kohavi, Tang, Xu
- "You Should Test That" by Chris Goward
- "A/B Testing" by Dan Siroker

### Tools We Use
- **Testing Framework**: Custom (`ab-testing.js`)
- **Analytics**: GA4
- **Sample Size Calculator**: Evan Miller's Calculator
- **Session Recording**: [TBD - Hotjar/FullStory]
- **Heatmaps**: [TBD - Hotjar/Microsoft Clarity]

### Team Contacts
- Test Design: [Marketing Lead]
- Implementation: [Development Lead]
- Analysis: [Analytics Lead]
