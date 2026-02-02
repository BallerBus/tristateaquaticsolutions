# A/B Test Tracker
## Tri-State Aquatic Solutions

---

## Active Tests

| Test ID | Name | Status | Start Date | End Date | Variants | Primary Metric |
|---------|------|--------|------------|----------|----------|----------------|
| TSA-001 | Hero Headline Test | Planned | TBD | TBD | 3 | Form submissions |
| TSA-002 | CTA Button Text | Planned | TBD | TBD | 3 | CTA clicks |
| TSA-003 | Form Layout | Planned | TBD | TBD | 3 | Form completions |

---

## Test Documentation Template

### Test ID: TSA-XXX

#### Overview
| Field | Value |
|-------|-------|
| **Test Name** | [Descriptive name] |
| **Test ID** | TSA-XXX |
| **Status** | Planning / Running / Analyzing / Complete |
| **Owner** | [Name] |
| **Start Date** | YYYY-MM-DD |
| **End Date** | YYYY-MM-DD |
| **Duration** | X days |

#### Hypothesis

**Format:**
```
IF [we change X]
THEN [metric Y will improve by Z%]
BECAUSE [reasoning based on user behavior/data]
```

**Example:**
```
IF we change the CTA button text from "Contact Us" to "Get Your Free Quote"
THEN form submissions will increase by 15%
BECAUSE users will better understand the value of clicking
```

#### Test Details

| Element | Description |
|---------|-------------|
| **Page(s) Tested** | Homepage, /contact |
| **Element Tested** | Primary CTA button |
| **Test Type** | A/B (2 variants) |
| **Traffic Allocation** | 50/50 |
| **Target Audience** | All visitors |
| **Device Targeting** | All devices |

#### Variants

| Variant | Name | Description | Screenshot |
|---------|------|-------------|------------|
| Control | Current CTA | "Contact Us" button | [link] |
| A | Action CTA | "Get Your Free Quote" | [link] |
| B | Benefit CTA | "See Your Pool Design" | [link] |

#### Metrics

**Primary Metric:**
- Form submissions (count and rate)

**Secondary Metrics:**
- CTA click rate
- Time on page
- Scroll depth
- Bounce rate

**Guardrail Metrics:**
- Page load time
- Mobile usability errors
- Form abandonment rate

#### Sample Size Calculation

| Parameter | Value |
|-----------|-------|
| Baseline conversion rate | 3% |
| Minimum detectable effect | 20% relative |
| Statistical significance | 95% |
| Power | 80% |
| **Required sample per variant** | 9,600 |
| **Total sample needed** | 28,800 |
| **Expected daily traffic** | 200 |
| **Estimated duration** | 48 days |

#### Results

##### Raw Data

| Variant | Visitors | Conversions | Conv. Rate | Relative Change |
|---------|----------|-------------|------------|-----------------|
| Control | | | | - |
| Variant A | | | | vs control |
| Variant B | | | | vs control |

##### Statistical Analysis

| Comparison | p-value | Significant? | Confidence Interval |
|------------|---------|--------------|---------------------|
| A vs Control | | Yes/No | [X%, Y%] |
| B vs Control | | Yes/No | [X%, Y%] |
| A vs B | | Yes/No | [X%, Y%] |

##### Secondary Metrics

| Metric | Control | Variant A | Variant B |
|--------|---------|-----------|-----------|
| CTA clicks | | | |
| Time on page | | | |
| Scroll depth | | | |
| Bounce rate | | | |

#### Decision

**Winner:** [Control / Variant A / Variant B / Inconclusive]

**Confidence Level:** XX%

**Business Impact:**
- Estimated additional conversions per month: X
- Estimated revenue impact: $X

**Recommendation:**
- [ ] Implement winner
- [ ] Run follow-up test
- [ ] Document learnings and move on

#### Learnings

**What we learned:**
1. [Key insight 1]
2. [Key insight 2]
3. [Key insight 3]

**Follow-up tests to consider:**
1. [Follow-up idea 1]
2. [Follow-up idea 2]

**Implementation notes:**
- [Any technical considerations for rollout]

---

## Results Tracking Spreadsheet Structure

### Tab 1: Test Registry

| Column | Description | Example |
|--------|-------------|---------|
| A: Test ID | Unique identifier | TSA-001 |
| B: Test Name | Descriptive name | Hero Headline Test |
| C: Status | Current state | Running |
| D: Start Date | Launch date | 2024-03-01 |
| E: End Date | Actual/planned end | 2024-03-21 |
| F: Page | Tested page(s) | Homepage |
| G: Element | What's being tested | H1 headline |
| H: Hypothesis | Brief hypothesis | Urgency increases conv |
| I: Primary Metric | Main success metric | Form submissions |
| J: Owner | Person responsible | John Smith |
| K: Priority Score | PIE/ICE score | 8.7 |

### Tab 2: Daily Results

| Column | Description |
|--------|-------------|
| A: Date | YYYY-MM-DD |
| B: Test ID | Reference to test |
| C: Variant | Control, A, B, etc. |
| D: Visitors | Daily visitors |
| E: Conversions | Daily conversions |
| F: Conv. Rate | D/C as percentage |
| G: Cumulative Visitors | Running total |
| H: Cumulative Conversions | Running total |
| I: Cumulative Rate | Running rate |
| J: Notes | Any observations |

### Tab 3: Final Results

| Column | Description |
|--------|-------------|
| A: Test ID | Reference to test |
| B: Variant | Control, A, B, etc. |
| C: Total Visitors | Final visitor count |
| D: Total Conversions | Final conversion count |
| E: Conversion Rate | Final rate |
| F: Relative Lift | % change vs control |
| G: p-value | Statistical p-value |
| H: Significant? | Yes/No |
| I: CI Lower | Lower confidence bound |
| J: CI Upper | Upper confidence bound |
| K: Winner? | Yes/No |
| L: Implemented? | Yes/No |
| M: Implementation Date | YYYY-MM-DD |

### Tab 4: Learnings Log

| Column | Description |
|--------|-------------|
| A: Test ID | Reference to test |
| B: Date Completed | When test ended |
| C: Category | Headline, CTA, Form, etc. |
| D: Key Learning | Main insight |
| E: Impact | High/Medium/Low |
| F: Applicable To | Other tests/pages |
| G: Follow-up Action | Next steps |

---

## Winner Implementation Checklist

### Pre-Implementation

- [ ] Test reached statistical significance (p < 0.05)
- [ ] Test ran for minimum duration (7+ days)
- [ ] Results consistent across segments (device, source)
- [ ] No negative impact on guardrail metrics
- [ ] Results reviewed by team lead
- [ ] Implementation plan documented

### Implementation Steps

- [ ] Create implementation ticket/task
- [ ] Update codebase with winning variant
- [ ] Remove A/B test code/flags
- [ ] QA changes across devices
- [ ] Deploy to staging environment
- [ ] Stakeholder sign-off
- [ ] Deploy to production
- [ ] Verify tracking is updated
- [ ] Announce to team

### Post-Implementation

- [ ] Monitor metrics for 7 days post-launch
- [ ] Confirm conversion rates match test results
- [ ] Document in learnings log
- [ ] Update test tracker status to "Implemented"
- [ ] Archive test documentation
- [ ] Plan follow-up tests if applicable

### Rollback Plan

If metrics degrade post-implementation:

1. **Immediate (< 24 hours)**: Revert code changes
2. **Short-term**: Re-enable A/B test to gather more data
3. **Analysis**: Investigate discrepancy between test and production
4. **Communication**: Notify team of rollback and reasons

---

## Learning Documentation

### Learning Categories

1. **Headlines**: What messaging resonates
2. **CTAs**: What drives action
3. **Forms**: What reduces friction
4. **Layout**: What improves scanning/engagement
5. **Visual**: What imagery performs best
6. **Trust**: What builds credibility
7. **Pricing**: How to present costs

### Learning Template

```markdown
### Learning: [Brief Title]

**Test ID:** TSA-XXX
**Date:** YYYY-MM-DD
**Category:** [Headlines/CTAs/Forms/etc.]

**Context:**
[What we tested and why]

**Finding:**
[What we discovered]

**Impact:**
[How significant was this finding]

**Application:**
[Where else can we apply this learning]

**Confidence:**
[How confident are we in this finding]
```

### Sample Learnings

#### Learning: Action-Oriented CTAs Outperform Generic

**Test ID:** TSA-002
**Date:** 2024-03-15
**Category:** CTAs

**Context:**
Tested "Contact Us" vs "Get Your Free Quote" vs "See Your Pool Design"

**Finding:**
"Get Your Free Quote" increased clicks by 34% over "Contact Us". The word "Free" and the specific outcome ("Quote") both contributed to performance.

**Impact:**
High - applies to all CTAs across site

**Application:**
- Update all "Contact Us" buttons
- Test similar specific language in email campaigns
- Apply to Google Ads copy

**Confidence:**
High (p=0.01, ran 21 days, 15,000 visitors)

---

#### Learning: Social Proof Near Decision Point > Above Fold

**Test ID:** TSA-019
**Date:** 2024-04-01
**Category:** Trust

**Context:**
Tested testimonial placement: above fold vs next to contact form

**Finding:**
Testimonials next to the form increased submissions by 22%. Users need reassurance at the moment of decision, not during initial browsing.

**Impact:**
High - changes our layout strategy

**Application:**
- Add testimonial near all forms
- Consider "as seen in" logos near pricing
- Test review badges in multiple positions

**Confidence:**
High (p=0.02, ran 28 days, 12,000 visitors)

---

## Test Archive

### Completed Tests

| Test ID | Name | End Date | Winner | Lift | Implemented |
|---------|------|----------|--------|------|-------------|
| | | | | | |

### Inconclusive Tests

| Test ID | Name | End Date | Reason | Next Steps |
|---------|------|----------|--------|------------|
| | | | | |

### Abandoned Tests

| Test ID | Name | Abandon Date | Reason |
|---------|------|--------------|--------|
| | | | |

---

## Quarterly Review Template

### Q[X] 20XX A/B Testing Review

**Period:** [Date Range]

#### Summary Statistics

| Metric | Value |
|--------|-------|
| Tests launched | X |
| Tests completed | X |
| Tests with winner | X |
| Winners implemented | X |
| Average lift | X% |
| Total incremental conversions | X |

#### Top Wins

1. **[Test Name]**: X% lift, X incremental conversions
2. **[Test Name]**: X% lift, X incremental conversions
3. **[Test Name]**: X% lift, X incremental conversions

#### Key Learnings

1. [Learning 1]
2. [Learning 2]
3. [Learning 3]

#### Process Improvements

- What worked well this quarter
- What we'll improve next quarter

#### Next Quarter Priorities

1. [Test category/focus 1]
2. [Test category/focus 2]
3. [Test category/focus 3]

---

## Quick Reference

### Status Definitions

| Status | Meaning |
|--------|---------|
| **Planning** | Hypothesis formed, awaiting implementation |
| **In Development** | Being built by dev team |
| **QA** | Ready for quality assurance |
| **Scheduled** | Ready to launch on specific date |
| **Running** | Live and collecting data |
| **Analyzing** | Test ended, reviewing results |
| **Complete** | Analysis done, decision made |
| **Implemented** | Winner deployed to production |
| **Inconclusive** | No significant winner found |
| **Abandoned** | Stopped before completion |

### Decision Framework

```
Was test statistically significant?
├── Yes
│   ├── Variant better? → Implement winner
│   └── Control better? → Keep control, document learning
└── No
    ├── Ran max duration? → Declare inconclusive
    └── Continue test? → Extend if valuable
```

### Key Formulas

**Conversion Rate:**
```
CR = Conversions / Visitors × 100
```

**Relative Lift:**
```
Lift = (Variant CR - Control CR) / Control CR × 100
```

**Required Sample Size (per variant):**
```
Use calculator at evanmiller.org/ab-testing/sample-size.html
```
