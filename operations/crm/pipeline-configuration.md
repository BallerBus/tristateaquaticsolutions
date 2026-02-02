# Pipeline Configuration - Tri-State Aquatic Solutions

## Overview

This document defines the CRM pipeline stages, deal properties, and stage requirements for both sales and service operations.

---

## Sales Pipeline

### Pipeline Name: Pool Sales

**Purpose:** Track prospects from initial lead through closed sale

### Stage Configuration

| Stage | Order | Probability | Time Goal | Description |
|-------|-------|-------------|-----------|-------------|
| New Lead | 1 | 10% | 24 hours | Fresh lead, uncontacted |
| Contacted | 2 | 20% | 48 hours | Initial contact made |
| Consultation Scheduled | 3 | 30% | 5 days | Site visit/meeting scheduled |
| Consultation Complete | 4 | 40% | 3 days | Site assessed, needs identified |
| Quote Sent | 5 | 50% | 7 days | Formal proposal delivered |
| Quote Follow-Up | 6 | 60% | 7 days | Following up on proposal |
| Negotiation | 7 | 70% | 14 days | Price/terms under discussion |
| Contract Sent | 8 | 80% | 5 days | Contract awaiting signature |
| Closed Won | 9 | 100% | - | Deal signed, deposit received |
| Closed Lost | 10 | 0% | - | Deal did not close |

### Stage Details

#### Stage 1: New Lead

**Entry Criteria:**
- Lead submitted via website form
- Phone inquiry received
- Referral provided
- Trade show/event contact

**Required Actions:**
- [ ] Review lead information
- [ ] Verify contact details
- [ ] Assign to sales rep
- [ ] Set follow-up task

**Exit Criteria:**
- First contact attempt made

**Automation:**
- Auto-assign to sales rep (round robin or territory-based)
- Send immediate confirmation email
- Create follow-up task (24 hours)
- Notify sales manager if uncontacted after 24 hours

---

#### Stage 2: Contacted

**Entry Criteria:**
- Phone call connected OR
- Email response received OR
- Text message exchange

**Required Actions:**
- [ ] Qualify lead interest level
- [ ] Identify pool type interest
- [ ] Confirm property ownership
- [ ] Assess timeline
- [ ] Set next step

**Exit Criteria:**
- Consultation scheduled OR
- Lead disqualified

**Key Questions to Ask:**
1. What type of pool are you interested in? (Inground/Above ground)
2. What is your ideal timeline for installation?
3. Do you own the property?
4. What is your approximate budget range?
5. Have you received other quotes?

---

#### Stage 3: Consultation Scheduled

**Entry Criteria:**
- Calendar appointment confirmed
- Date/time set for site visit

**Required Actions:**
- [ ] Send calendar invite with confirmation
- [ ] Send pre-consultation questionnaire
- [ ] Prepare property research
- [ ] Confirm appointment 24 hours before

**Exit Criteria:**
- Consultation completed

**Pre-Consultation Prep:**
- Review property on Google Maps/satellite
- Check HOA requirements if applicable
- Prepare product catalogs
- Bring measurement tools
- Have tablet/laptop for design preview

---

#### Stage 4: Consultation Complete

**Entry Criteria:**
- Site visit conducted
- Customer needs documented
- Pool location identified
- Design preferences captured

**Required Actions:**
- [ ] Document site measurements
- [ ] Upload site photos
- [ ] Record customer preferences
- [ ] Identify potential challenges
- [ ] Begin quote preparation

**Exit Criteria:**
- Quote completed and ready to send

**Required Documentation:**
- Site photos (minimum 5)
- Measurements recorded
- Customer preference notes
- Utility locations noted
- Access considerations documented

---

#### Stage 5: Quote Sent

**Entry Criteria:**
- Formal quote document created
- Quote reviewed for accuracy
- Quote delivered to customer

**Required Actions:**
- [ ] Send quote via email with cover letter
- [ ] Explain quote components
- [ ] Set follow-up reminder (3 days)
- [ ] Track quote open/view

**Exit Criteria:**
- Customer response received OR
- 7 days elapsed (move to Follow-Up)

**Quote Requirements:**
- Itemized pricing
- Timeline estimate
- Warranty information
- Terms and conditions
- Financing options (if applicable)
- Expiration date (30 days typical)

---

#### Stage 6: Quote Follow-Up

**Entry Criteria:**
- Quote sent but no response for 7+ days
- Customer requested time to decide

**Required Actions:**
- [ ] Call to follow up on quote
- [ ] Address questions/concerns
- [ ] Offer to revise if needed
- [ ] Re-confirm interest level

**Exit Criteria:**
- Moved to Negotiation (active interest) OR
- Moved to Closed Lost (declined) OR
- Quote revised and re-sent

**Follow-Up Sequence:**
1. Day 3: Email check-in
2. Day 7: Phone call
3. Day 14: Email with incentive offer
4. Day 21: Final check-in call
5. Day 30: Move to Lost (can be re-engaged later)

---

#### Stage 7: Negotiation

**Entry Criteria:**
- Customer actively discussing terms
- Price negotiation requested
- Scope adjustments under discussion

**Required Actions:**
- [ ] Document requested changes
- [ ] Calculate revised pricing
- [ ] Verify margin requirements
- [ ] Get manager approval if needed
- [ ] Present revised terms

**Exit Criteria:**
- Terms agreed, contract sent OR
- Unable to reach agreement (Closed Lost)

**Negotiation Guidelines:**
- Maximum discount without approval: 5%
- Discounts 5-10%: Sales Manager approval
- Discounts >10%: Owner approval
- Never discount below minimum margin
- Consider value-adds over price cuts

---

#### Stage 8: Contract Sent

**Entry Criteria:**
- Terms agreed upon
- Contract document sent
- Deposit terms communicated

**Required Actions:**
- [ ] Send contract for signature
- [ ] Review contract terms with customer
- [ ] Answer final questions
- [ ] Follow up within 48 hours

**Exit Criteria:**
- Contract signed and deposit received

**Contract Checklist:**
- [ ] Correct customer information
- [ ] Accurate pricing
- [ ] Correct pool specifications
- [ ] Realistic timeline
- [ ] Deposit amount correct
- [ ] All addenda included

---

#### Stage 9: Closed Won

**Entry Criteria:**
- Contract signed
- Deposit received
- All paperwork complete

**Required Actions:**
- [ ] Send welcome/thank you email
- [ ] Create service/installation record
- [ ] Notify installation team
- [ ] Schedule project kickoff
- [ ] Request referral

**Post-Close Process:**
1. Immediate thank you call
2. Welcome packet email
3. Installation team introduction
4. Permit process initiation
5. Financing finalization (if applicable)

---

#### Stage 10: Closed Lost

**Entry Criteria:**
- Customer declined to proceed
- Unable to reach customer
- Disqualified lead

**Required Actions:**
- [ ] Document lost reason
- [ ] Send "sorry to see you go" email
- [ ] Add to re-engagement list
- [ ] Update analytics

**Lost Reasons (Required Selection):**
- Price too high
- Chose competitor
- Timeline too long
- Budget changed
- Project cancelled
- Couldn't qualify (credit/property)
- No response
- Other (require notes)

---

## Service Pipeline

### Pipeline Name: Service & Installation

**Purpose:** Track active projects from sale through completion

### Stage Configuration

| Stage | Order | Description |
|-------|-------|-------------|
| Project Initiation | 1 | Handoff from sales, paperwork processing |
| Permitting | 2 | Permit application and approval |
| Scheduling | 3 | Installation date scheduling |
| Pre-Installation | 4 | Site prep, materials ordered |
| Installation | 5 | Active installation in progress |
| Inspection | 6 | Final inspection scheduling/completion |
| Completion | 7 | Project complete, handoff to customer |
| Warranty Active | 8 | Project in warranty period |

### Stage Details

#### Stage 1: Project Initiation

**Entry Criteria:**
- Deal marked Closed Won in Sales Pipeline
- Deposit received

**Required Actions:**
- [ ] Assign project manager
- [ ] Verify all documentation
- [ ] Confirm financing (if applicable)
- [ ] Begin permit preparation
- [ ] Schedule kickoff call

**Exit Criteria:**
- Permit application ready to submit

---

#### Stage 2: Permitting

**Entry Criteria:**
- All documentation gathered
- Permit application submitted

**Required Actions:**
- [ ] Submit permit application
- [ ] Track permit status
- [ ] Respond to any requests
- [ ] Notify customer of updates

**Exit Criteria:**
- Permit approved

**Typical Timeline:** 2-6 weeks (varies by jurisdiction)

---

#### Stage 3: Scheduling

**Entry Criteria:**
- Permit approved
- Materials availability confirmed

**Required Actions:**
- [ ] Confirm material delivery dates
- [ ] Check crew availability
- [ ] Schedule installation date
- [ ] Confirm with customer

**Exit Criteria:**
- Installation date confirmed

---

#### Stage 4: Pre-Installation

**Entry Criteria:**
- Installation date set
- Less than 2 weeks from installation

**Required Actions:**
- [ ] Order/confirm materials
- [ ] Utility marking requested
- [ ] Customer site prep instructions sent
- [ ] Final confirmation call (3 days prior)

**Exit Criteria:**
- Installation day arrives

---

#### Stage 5: Installation

**Entry Criteria:**
- Installation day begins

**Required Actions:**
- [ ] Daily progress updates to customer
- [ ] Document with photos
- [ ] Track any changes/issues
- [ ] Coordinate inspections if required

**Exit Criteria:**
- Installation substantially complete

---

#### Stage 6: Inspection

**Entry Criteria:**
- Installation complete
- Ready for final inspection

**Required Actions:**
- [ ] Schedule inspection
- [ ] Address any inspection items
- [ ] Pass final inspection

**Exit Criteria:**
- Inspection passed

---

#### Stage 7: Completion

**Entry Criteria:**
- Inspection passed
- Final payment collected

**Required Actions:**
- [ ] Customer walkthrough/training
- [ ] Hand over documentation
- [ ] Collect final payment
- [ ] Request review/testimonial
- [ ] Take completion photos

**Exit Criteria:**
- All items complete, warranty begins

---

#### Stage 8: Warranty Active

**Entry Criteria:**
- Project complete
- Warranty period active

**Properties to Track:**
- Warranty start date
- Warranty end date
- Service visits logged
- Issues reported

---

## Deal Properties

### Standard Properties (Use Defaults)

- Deal Name
- Deal Owner
- Pipeline
- Deal Stage
- Amount
- Close Date
- Create Date
- Last Activity Date

### Custom Properties - Sales Pipeline

| Property Name | Type | Description | Required |
|--------------|------|-------------|----------|
| Pool Type | Dropdown | Inground/Above Ground/Hot Tub | Yes |
| Pool Size | Text | Dimensions or model | Yes |
| Pool Shape | Dropdown | Rectangle/Oval/Kidney/Freeform | No |
| Material Type | Dropdown | Fiberglass/Concrete/Vinyl | Yes |
| Installation Complexity | Dropdown | Standard/Moderate/Complex | No |
| Access Difficulty | Dropdown | Easy/Moderate/Difficult | No |
| HOA Approval Required | Checkbox | Yes/No | No |
| Financing Requested | Checkbox | Yes/No | No |
| Financing Status | Dropdown | Applied/Approved/Declined/Not Needed | No |
| Lead Source Detail | Text | Specific source detail | No |
| Quote Expiration Date | Date | When quote expires | No |
| Competitor Quotes | Text | Competitors bidding | No |
| Lost Reason | Dropdown | Why deal was lost | Required if lost |
| Lost Notes | Text | Details on lost reason | No |

### Custom Properties - Service Pipeline

| Property Name | Type | Description | Required |
|--------------|------|-------------|----------|
| Permit Number | Text | Local permit tracking number | No |
| Permit Status | Dropdown | Applied/Approved/Denied | Yes |
| Permit Approval Date | Date | When permit was approved | No |
| Installation Start Date | Date | Scheduled start | Yes |
| Installation End Date | Date | Scheduled completion | No |
| Actual Start Date | Date | Real start date | No |
| Actual End Date | Date | Real completion date | No |
| Inspector Name | Text | Assigned inspector | No |
| Inspection Date | Date | Scheduled inspection | No |
| Inspection Status | Dropdown | Scheduled/Passed/Failed | No |
| Change Orders | Number | Count of change orders | No |
| Change Order Amount | Currency | Total change order value | No |
| Warranty Start Date | Date | When warranty begins | No |
| Warranty End Date | Date | When warranty expires | No |

---

## Probability Settings

### Sales Pipeline Probabilities

These probabilities should be calibrated after 6 months of data collection:

| Stage | Initial Setting | Notes |
|-------|-----------------|-------|
| New Lead | 10% | Low - most leads don't convert |
| Contacted | 20% | Qualified interest confirmed |
| Consultation Scheduled | 30% | Active engagement |
| Consultation Complete | 40% | Needs identified |
| Quote Sent | 50% | Proposal delivered |
| Quote Follow-Up | 60% | Still in consideration |
| Negotiation | 70% | Actively working deal |
| Contract Sent | 80% | High intent |
| Closed Won | 100% | Closed |
| Closed Lost | 0% | Closed |

### Probability Calibration

After 6 months, analyze actual conversion rates:

```
Actual Probability = (Deals Won from Stage) / (Total Deals in Stage) * 100

Example:
- 100 deals reached Quote Sent stage
- 45 of those eventually became Closed Won
- Actual probability: 45%
```

---

## Stage Movement Rules

### Manual vs. Automatic Movement

**Automatic Movement:**
- New Lead → Contacted: When email is sent or call logged
- Contract Sent → Closed Won: When payment is recorded

**Manual Movement Required:**
- Consultation Scheduled → Consultation Complete
- Quote Sent → Quote Follow-Up (after 7 days, prompted)
- Any stage → Closed Lost

### Required Fields by Stage

**Quote Sent:**
- Pool Type
- Pool Size
- Amount
- Close Date (estimated)

**Contract Sent:**
- All above plus
- Installation Complexity
- Access Difficulty

**Closed Won:**
- All above plus
- Actual close date
- Deposit amount

**Closed Lost:**
- Lost Reason (required)
- Lost Notes (recommended)

### Stage Skip Prevention

Configure to prevent skipping stages:
- Cannot move directly from New Lead to Quote Sent
- Cannot skip Consultation stages
- Must go through proper progression

---

## Pipeline Views and Filters

### Recommended Views

#### Sales Pipeline Views

1. **My Active Deals**
   - Filter: Deal Owner = Me, Stage ≠ Closed

2. **Deals Needing Action**
   - Filter: Last Activity > 7 days ago, Stage ≠ Closed

3. **Closing This Month**
   - Filter: Close Date = This Month, Stage = Negotiation or Contract Sent

4. **Stale Quotes**
   - Filter: Stage = Quote Sent or Quote Follow-Up, Days in Stage > 14

5. **Lost Deals - Recoverable**
   - Filter: Stage = Closed Lost, Lost Reason = "Price too high" or "Budget changed"

#### Service Pipeline Views

1. **Active Projects**
   - Filter: Stage ≠ Warranty Active

2. **Awaiting Permits**
   - Filter: Stage = Permitting

3. **Installing This Week**
   - Filter: Installation Start Date = This Week

4. **Ready for Inspection**
   - Filter: Stage = Inspection

---

## Pipeline Reporting

### Key Metrics to Track

**Velocity Metrics:**
- Average days in each stage
- Total sales cycle length
- Stage-to-stage conversion rates

**Volume Metrics:**
- Deals created per week/month
- Deals closed per week/month
- Pipeline value by stage

**Performance Metrics:**
- Win rate overall
- Win rate by lead source
- Win rate by sales rep
- Average deal size

See [reporting-dashboards.md](./reporting-dashboards.md) for dashboard configuration.
