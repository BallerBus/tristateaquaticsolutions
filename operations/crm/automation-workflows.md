# Automation Workflows - Tri-State Aquatic Solutions

## Overview

This document defines CRM automation workflows for lead management, nurture sequences, sales follow-up, and customer engagement.

---

## Lead Assignment Rules

### Workflow 1: New Lead Assignment (Round Robin)

**Name:** Lead Assignment - Round Robin

**Trigger:**
- Contact is created
- AND Lead Source is not empty
- AND Contact Owner is not set

**Actions:**
1. Rotate through sales team members equally
2. Set Contact Owner to next available rep
3. Create task: "Contact new lead within 24 hours"
4. Send internal notification to assigned rep

**Configuration:**

```
Round Robin Members:
- Sales Rep 1
- Sales Rep 2
- Sales Manager (overflow)

Working Hours: 8 AM - 6 PM ET
Skip if rep is on PTO (use calendar integration)
```

---

### Workflow 2: Territory-Based Assignment

**Name:** Lead Assignment - By Territory

**Trigger:**
- Contact is created
- AND Postal Code is known
- AND Contact Owner is not set

**Actions:**
1. Check postal code against territory map
2. Assign to territory owner
3. If no territory match, use round robin
4. Create follow-up task

**Territory Map:**

| Territory | Postal Codes | Owner |
|-----------|--------------|-------|
| Primary | 07001-07199, 07301-07399 | Rep A |
| Secondary | 07201-07299, 07401-07499 | Rep B |
| Extended | All other NJ | Sales Manager |

---

### Workflow 3: Hot Lead Priority Assignment

**Name:** Lead Assignment - Hot Leads

**Trigger:**
- Contact is created OR Lead Score changes
- AND Lead Score >= 80

**Actions:**
1. Assign to senior sales rep (or sales manager if rep busy)
2. Send immediate SMS alert to owner
3. Send immediate email notification
4. Create task: "URGENT: Contact hot lead within 1 hour"
5. Add to "Hot Leads" list for visibility

---

### Workflow 4: After-Hours Lead Handling

**Name:** Lead Assignment - After Hours

**Trigger:**
- Contact is created
- AND Time is outside business hours (6 PM - 8 AM ET)
- AND Day is weekend

**Actions:**
1. Send auto-reply email acknowledging receipt
2. Create task for next business day: "Follow up on after-hours lead"
3. Assign to on-call rep if defined
4. Add to "Morning Follow-Up" list

---

## Lead Nurture Workflows

### Workflow 5: New Lead Welcome Sequence

**Name:** Nurture - New Lead Welcome

**Trigger:**
- Contact is created
- AND Lifecycle Stage = Lead
- AND Email is known

**Sequence:**

| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Welcome + Why Choose Us |
| 2 | Email | Pool Type Guide |
| 5 | Email | Customer Success Story |
| 7 | Email | FAQ + Common Questions |
| 10 | Email | Free Consultation Offer |
| 14 | Internal Task | Review engagement, decide next step |

**Exit Conditions:**
- Deal is created
- Contact replies to email
- Contact schedules consultation
- Contact unsubscribes

---

### Workflow 6: Pool Interest Nurture - Fiberglass

**Name:** Nurture - Fiberglass Interest

**Trigger:**
- Pool Interest Type contains "Fiberglass"
- AND Lifecycle Stage = Lead or MQL

**Sequence:**

| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Fiberglass Pool Benefits Guide |
| 3 | Email | Fiberglass Shape Options |
| 7 | Email | Fiberglass vs Other Types |
| 10 | Email | Installation Timeline Explained |
| 14 | Email | Maintenance Guide + Cost Savings |
| 21 | Email | Customer Testimonial |
| 28 | Email | Special Offer / CTA |

---

### Workflow 7: Pool Interest Nurture - Concrete

**Name:** Nurture - Concrete Pool Interest

**Trigger:**
- Pool Interest Type contains "Concrete" OR "Gunite"
- AND Lifecycle Stage = Lead or MQL

**Sequence:**

| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Custom Concrete Pool Guide |
| 3 | Email | Design Possibilities |
| 7 | Email | Construction Process Explained |
| 14 | Email | Long-term Value of Concrete |
| 21 | Email | Portfolio Showcase |
| 28 | Email | Consultation Invitation |

---

### Workflow 8: Budget-Based Nurture

**Name:** Nurture - By Budget Tier

**Trigger:**
- Budget Range is known
- AND Lifecycle Stage = Lead or MQL

**Branch Logic:**

**If Budget >= $75K (Luxury):**
| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Luxury Pool Design Guide |
| 5 | Email | Premium Features Showcase |
| 10 | Email | VIP Consultation Offer |

**If Budget $50K-$75K (Premium):**
| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Premium Pool Options |
| 5 | Email | Value Engineering Tips |
| 10 | Email | Financing Options |

**If Budget < $50K (Value):**
| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Smart Pool Buying Guide |
| 5 | Email | Financing Options |
| 10 | Email | Above Ground Alternatives |

---

### Workflow 9: Long Timeline Nurture

**Name:** Nurture - Future Buyers

**Trigger:**
- Timeline = "6-12 months" OR "Next year or later"
- AND Lifecycle Stage = Lead

**Sequence:**

| Month | Action | Content |
|-------|--------|---------|
| 1 | Email | Planning Your Pool Project |
| 2 | Email | Seasonal Buying Guide |
| 3 | Email | Design Inspiration |
| 4 | Email | Budget Planning Tips |
| 5 | Email | HOA & Permit Guide |
| 6 | Email | Ready to Start? Check-in |

---

## Quote Follow-Up Automation

### Workflow 10: Quote Delivery Confirmation

**Name:** Quote - Delivery Confirmation

**Trigger:**
- Deal Stage changes to "Quote Sent"

**Actions:**
1. Log quote sent activity
2. Set "Last Quote Date" to today
3. Increment "Total Quotes Sent" by 1
4. Create task: "Quote follow-up call" (due in 3 days)
5. Send email: "Your pool quote is ready"

---

### Workflow 11: Quote Follow-Up Sequence

**Name:** Quote - Follow-Up Sequence

**Trigger:**
- Deal Stage = "Quote Sent"
- AND Days in Stage >= 3

**Sequence:**

| Day | Action | Content |
|-----|--------|---------|
| 3 | Email | Quote reminder + questions offer |
| 5 | Internal Task | Make follow-up call |
| 7 | Email | Value reinforcement |
| 10 | Internal Task | Second follow-up call |
| 14 | Email | Limited time incentive |
| 21 | Email | Final check-in |
| 30 | Internal Task | Evaluate - close or nurture |

**Exit Conditions:**
- Deal stage changes (any direction)
- Contact replies

---

### Workflow 12: Quote Viewed Notification

**Name:** Quote - Viewed Alert

**Trigger:**
- Quote document is opened/viewed (if using quote tracking)
- AND Deal Stage = "Quote Sent"

**Actions:**
1. Send notification to deal owner
2. Update "Quote Viewed Date" property
3. Create task: "Quote was viewed - follow up now"
4. If viewed 3+ times, flag as "High Interest"

---

### Workflow 13: Stale Quote Alert

**Name:** Quote - Stale Alert

**Trigger:**
- Deal Stage = "Quote Sent" OR "Quote Follow-Up"
- AND Days in Stage >= 14
- AND Last Activity > 7 days ago

**Actions:**
1. Notify sales manager
2. Create task for deal owner: "STALE: Quote needs attention"
3. Add to "Stale Quotes" list

---

## Post-Sale Workflows

### Workflow 14: Closed Won - Customer Onboarding

**Name:** Post-Sale - Onboarding

**Trigger:**
- Deal Stage changes to "Closed Won"

**Actions:**
1. Update Contact Lifecycle Stage to "Customer"
2. Set "Customer Since" to today
3. Create associated company (if not exists)
4. Send email: "Welcome to the family!"
5. Create task: "Schedule project kickoff call"
6. Notify installation team
7. Add to "New Customers" list
8. Trigger service pipeline deal creation

**Email Sequence:**

| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Welcome + next steps |
| 1 | Email | What to expect during installation |
| 3 | Email | Meet your project team |
| 7 | Internal Task | Kickoff call completed? |

---

### Workflow 15: Installation Complete - Handoff

**Name:** Post-Sale - Installation Complete

**Trigger:**
- Service Pipeline Stage changes to "Completion"

**Actions:**
1. Set "Installation Date" to today
2. Calculate and set "Warranty Expiration" (Installation Date + warranty period)
3. Send email: "Congratulations on your new pool!"
4. Create task: "Request review in 2 weeks"
5. Add to "Review Request" list

**Email Sequence:**

| Day | Action | Content |
|-----|--------|---------|
| 0 | Email | Congratulations + care tips |
| 7 | Email | Pool care reminder |
| 14 | Email | Review request |
| 21 | Email | Referral program invite |
| 30 | Email | First month check-in |

---

### Workflow 16: Review Request Campaign

**Name:** Post-Sale - Review Request

**Trigger:**
- Installation Date is 14 days ago
- AND Review Given = "No review requested"

**Actions:**
1. Update "Review Given" to "Review requested"
2. Send email with Google review link
3. Create task: "Check if review was left"
4. If no review in 7 days, send reminder
5. If no review in 14 days, try different platform (Facebook)

---

### Workflow 17: Referral Program Invitation

**Name:** Post-Sale - Referral Invite

**Trigger:**
- Installation Date is 30 days ago
- AND NPS Score >= 8 (if captured)
- OR Review Given contains "Review given"

**Actions:**
1. Send email: Referral program invitation
2. Add to "Referral Program" list
3. Create task: "Follow up on referral interest"

---

## Re-Engagement Workflows

### Workflow 18: Stale Lead Re-Engagement

**Name:** Re-Engage - Stale Leads

**Trigger:**
- Last Activity > 60 days ago
- AND Lifecycle Stage = Lead or MQL
- AND Deal Stage is empty OR Closed Lost
- AND Not in "Do Not Contact" list

**Actions:**
1. Send email: "Still thinking about a pool?"
2. Wait 7 days
3. If no engagement, send second email
4. Wait 14 days
5. If no engagement, add to "Cold - Archive" list
6. Reduce lead score by 20 points

---

### Workflow 19: Lost Deal Re-Engagement

**Name:** Re-Engage - Lost Deals

**Trigger:**
- Deal Stage changed to "Closed Lost"
- AND Lost Reason is NOT "Outside service area" or "Renting"
- Wait 90 days after lost date

**Actions:**
1. Send email: "Things may have changed..."
2. Wait 7 days
3. If opened, create task for sales rep
4. If no engagement, wait 90 more days and try again

**Re-engagement Cadence:**
- 90 days post-loss
- 180 days post-loss
- 1 year post-loss (seasonal)
- Stop after 3 attempts with no engagement

---

### Workflow 20: Seasonal Re-Engagement

**Name:** Re-Engage - Spring Campaign

**Trigger:**
- Date is February 15 (annually)
- AND Lifecycle Stage = Lead, MQL, or SQL
- AND No active deal

**Actions:**
1. Send email: "Spring pool season is coming!"
2. Offer early-season incentive
3. Create tasks for sales team to call
4. Wait 14 days
5. Send follow-up email to non-responders

---

## Task Creation Triggers

### Workflow 21: Form Submission Task

**Name:** Task - Form Submitted

**Trigger:**
- Any form is submitted

**Actions:**
1. Create task: "New form submission: [Form Name]"
2. Due: Today (within business hours) or Next business day
3. Assign to contact owner (or round robin if no owner)
4. Priority: High for consultation requests, Normal for others

---

### Workflow 22: Email Reply Task

**Name:** Task - Email Reply Received

**Trigger:**
- Contact replies to any email
- AND Contact has deal

**Actions:**
1. Create task: "Reply received - respond within 4 hours"
2. Assign to deal owner
3. Priority: High
4. Send notification to owner

---

### Workflow 23: Inactivity Task

**Name:** Task - Contact Inactive

**Trigger:**
- Deal exists
- AND Deal Stage is not Closed
- AND Last Activity > 14 days ago

**Actions:**
1. Create task: "Re-engage inactive contact"
2. Due: Today
3. Assign to deal owner
4. Repeat weekly until activity or deal closes

---

### Workflow 24: Warranty Expiration Task

**Name:** Task - Warranty Expiring

**Trigger:**
- Warranty Expiration is 60 days from now

**Actions:**
1. Create task: "Warranty expiring - contact customer"
2. Due: In 7 days
3. Assign to customer success/service rep
4. Send email: "Your warranty is expiring soon"

---

## Internal Notifications

### Workflow 25: High-Value Lead Alert

**Name:** Alert - High Value Lead

**Trigger:**
- Budget Range changes to "$100,000+" OR "$150,000+"
- OR Deal Amount >= $100,000

**Actions:**
1. Send Slack/email notification to sales manager
2. Send notification to assigned rep
3. Create task: "VIP lead - prioritize outreach"

---

### Workflow 26: Competitor Quote Alert

**Name:** Alert - Competitor Mentioned

**Trigger:**
- Competitor Quotes field is updated
- OR Note/email contains competitor names

**Actions:**
1. Notify sales manager
2. Create task: "Competitive situation - prepare comparison"
3. Add to "Competitive Deals" list

---

### Workflow 27: Deal Stage Change Notification

**Name:** Alert - Deal Progression

**Trigger:**
- Deal Stage changes

**Actions:**
1. If moved to "Consultation Complete" - notify for quote prep
2. If moved to "Contract Sent" - notify management
3. If moved to "Closed Won" - celebrate notification to team
4. If moved to "Closed Lost" - notify for analysis

---

## Workflow Best Practices

### Enrollment Settings

**Always Configure:**
- Re-enrollment: Allow or prevent based on workflow purpose
- Suppression lists: Honor do-not-contact lists
- Business hours: Respect time zone for customer-facing actions
- Rate limits: Prevent email overload

### Testing Workflows

**Before Activation:**
1. Create test contacts with test email addresses
2. Enroll test contacts manually
3. Verify each step executes correctly
4. Check email content and personalization
5. Verify tasks are created properly
6. Test exit conditions

### Workflow Maintenance

**Monthly Review:**
- Check enrollment counts
- Review email performance (opens, clicks)
- Check for stuck enrollments
- Update content as needed

**Quarterly Review:**
- Analyze conversion rates
- A/B test subject lines
- Update sequences based on performance
- Remove underperforming workflows

---

## Workflow Dependencies

```
Lead Created
    └── Lead Assignment (1, 2, 3, or 4)
    └── New Lead Welcome (5)
        └── Interest-Based Nurture (6, 7, 8, or 9)

Form Submitted
    └── Form Submission Task (21)

Deal Created
    └── Quote Delivery (10)
        └── Quote Follow-Up (11)
            └── Stale Quote Alert (13)

Deal Won
    └── Customer Onboarding (14)
        └── Installation Complete (15)
            └── Review Request (16)
            └── Referral Invite (17)

Deal Lost
    └── Lost Deal Re-Engagement (19)

No Activity (60+ days)
    └── Stale Lead Re-Engagement (18)
    └── Seasonal Re-Engagement (20)
```
