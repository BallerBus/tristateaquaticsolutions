# CRM and Marketing Automation Workflows
## Tri-State Aquatic Solutions

**Created:** February 2026
**Purpose:** Lead management, sales automation, and customer lifecycle optimization
**CRM Platforms:** Compatible with HubSpot, ActiveCampaign, Pipedrive, or similar

---

## Table of Contents
1. [Lead Lifecycle Stages](#1-lead-lifecycle-stages)
2. [Automation Workflows](#2-automation-workflows)
3. [Lead Scoring Model](#3-lead-scoring-model)
4. [Task Templates](#4-task-templates)
5. [Pipeline Reports and Dashboards](#5-pipeline-reports-and-dashboards)

---

# 1. Lead Lifecycle Stages

## Stage Overview

| Stage | Description | Typical Duration | Owner |
|-------|-------------|------------------|-------|
| New Lead | Initial contact, unqualified | 24-48 hours | Marketing |
| Marketing Qualified Lead (MQL) | Engaged, meets basic criteria | 1-2 weeks | Marketing |
| Sales Qualified Lead (SQL) | Budget, timeline, authority confirmed | 1-2 weeks | Sales (Brandon) |
| Consultation Scheduled | Meeting booked | Until appointment | Sales (Brandon) |
| Consultation Completed | Meeting held, needs assessed | 24-48 hours | Sales (Brandon) |
| Proposal Sent | Custom quote delivered | 7-14 days | Sales (Brandon) |
| Negotiation | Active discussion on terms | 1-2 weeks | Sales (Brandon) |
| Won | Contract signed, deposit received | N/A | Operations |
| Lost | Deal not closed | N/A | Marketing (re-engage) |
| Customer | Active project or completed | Ongoing | Operations |
| Advocate | Willing to refer/review | Ongoing | Sales (Brandon) |

---

## Stage 1: New Lead

### Definition
A contact who has provided their information through any channel but has not yet been evaluated for fit.

### Entry Criteria
- Form submission on website (contact form, consultation request, guide download)
- Phone inquiry logged in CRM
- Social media DM requesting information
- Third-party lead (HomeAdvisor, Angi, referral partner)
- Trade show or event contact
- Referral from existing customer

### Exit Criteria
- Lead responds to initial outreach AND meets MQL criteria
- Lead explicitly declines further contact
- No response after 7 days of attempted contact (moves to "Unresponsive" status)

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Lead created | Send welcome email with guide attachment | Immediate |
| Lead created | Create "Initial Contact" task for Brandon | Immediate |
| Lead created | Send internal notification to Brandon | Immediate |
| Lead created | Add to New Lead Nurture sequence | Immediate |
| Lead from referral | Send thank you email to referrer | Immediate |
| No response after 3 days | Send follow-up email #1 | Day 3 |
| No response after 5 days | Create phone call task | Day 5 |
| No response after 7 days | Mark as "Unresponsive" | Day 7 |

### Follow-Up Timeline
- **Hour 0-4:** Welcome email, internal notification
- **Hour 4-8:** Phone call attempt #1
- **Day 2:** Follow-up email if no phone connection
- **Day 3:** Phone call attempt #2
- **Day 5:** Final outreach attempt
- **Day 7:** Mark unresponsive, enter long-term nurture

### Owner Assignment
- **Primary:** Marketing (automated nurture)
- **Secondary:** Brandon Calloway (manual outreach)

---

## Stage 2: Marketing Qualified Lead (MQL)

### Definition
A lead who has demonstrated engagement and meets minimum qualification criteria.

### Entry Criteria
- Responded to email or phone outreach
- Downloaded multiple content pieces
- Visited website 3+ times
- Spent 2+ minutes on pricing or services pages
- Owns home in target service area (confirmed)
- Lead score reaches 30+ points

### Exit Criteria
- Confirms budget ($40,000+ for standard pool, $35,000+ for plunge pool)
- Confirms timeline (interested in pool within 12 months)
- Confirms decision-making authority
- Schedules consultation call
- Explicitly states not interested

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| MQL status assigned | Send "What to Expect" email | Immediate |
| MQL status assigned | Create qualification call task | Immediate |
| MQL status assigned | Add to MQL nurture sequence | Immediate |
| MQL for 3 days without call | Send calendar link email | Day 3 |
| MQL for 7 days without call | Escalation notification to Brandon | Day 7 |
| MQL opens email 3x+ | Priority notification to Brandon | Real-time |

### Follow-Up Timeline
- **Day 0:** Qualification call attempt
- **Day 1:** Follow-up email with calendar link
- **Day 3:** Second call attempt
- **Day 5:** Educational content email
- **Day 7:** Final qualification attempt
- **Day 10:** Return to long-term nurture if unqualified

### Owner Assignment
- **Primary:** Brandon Calloway (qualification and conversion)

---

## Stage 3: Sales Qualified Lead (SQL)

### Definition
A lead who meets all qualification criteria: Budget, Authority, Need, and Timeline (BANT).

### Entry Criteria
- Budget confirmed: $40,000+ (standard) or $35,000+ (plunge pool)
- Authority: Is the decision-maker or spouse/partner involved
- Need: Has clear reason for wanting a pool
- Timeline: Ready to proceed within 12 months
- Location: Within service area (Main Line PA, Chester County, Northern Delaware)

### Exit Criteria
- Consultation scheduled (moves to "Consultation Scheduled")
- Disqualified after deeper conversation
- No response after 14 days (returns to MQL with note)

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| SQL status assigned | Send consultation preparation email | Immediate |
| SQL status assigned | Create "Schedule Consultation" high-priority task | Immediate |
| SQL status assigned | Send internal Slack/SMS notification | Immediate |
| SQL for 2 days without consultation scheduled | Send calendar link reminder | Day 2 |
| SQL for 5 days without consultation scheduled | Phone call task created | Day 5 |
| SQL for 10 days without consultation scheduled | Escalation to personal follow-up | Day 10 |

### Follow-Up Timeline
- **Day 0:** Offer consultation times
- **Day 1:** Send calendar link if not scheduled
- **Day 3:** Phone call to schedule
- **Day 5:** Personalized video message
- **Day 7:** Final scheduling push
- **Day 14:** Return to MQL nurture

### Owner Assignment
- **Primary:** Brandon Calloway (exclusive)

---

## Stage 4: Consultation Scheduled

### Definition
A qualified lead with a confirmed date and time for an on-site design consultation.

### Entry Criteria
- Calendar appointment confirmed
- Address and contact information verified
- Date/time accepted by both parties

### Exit Criteria
- Consultation completed (moves to "Consultation Completed")
- Consultation canceled and not rescheduled (returns to SQL)
- No-show (returns to SQL with note)

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Appointment created | Send confirmation email | Immediate |
| Appointment created | Create consultation prep task | Immediate |
| Appointment created | Add to calendar with property address | Immediate |
| 3 days before appointment | Send "What to Prepare" email | 72 hours before |
| 1 day before appointment | Send reminder email | 24 hours before |
| Day of appointment | Send SMS reminder | 2 hours before |
| Appointment time passed | Create "Log Consultation" task | Immediate |
| No-show detected | Send reschedule email | 1 hour after |

### Follow-Up Timeline
- **Booking:** Confirmation email, calendar invite
- **72 hours before:** Preparation email (what to think about)
- **24 hours before:** Reminder email
- **2 hours before:** SMS reminder
- **Post-meeting:** Log outcomes, begin follow-up sequence

### Owner Assignment
- **Primary:** Brandon Calloway (exclusive)

---

## Stage 5: Consultation Completed

### Definition
A qualified lead who has had an on-site design consultation.

### Entry Criteria
- Consultation occurred (in-person or virtual)
- Notes logged in CRM
- Next steps discussed with prospect

### Exit Criteria
- Proposal sent (moves to "Proposal Sent")
- Lead declines to proceed (moves to "Lost")
- Lead requests delay (moves to SQL with future date)

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Consultation logged | Send thank you email | Same day evening |
| Consultation logged | Create "Prepare Proposal" task | Immediate |
| Consultation logged | Update lead score (+25 points) | Immediate |
| 24 hours post-consultation | Send "Next Steps" email | Day 1 |
| 3 days post-consultation without proposal | Create reminder task | Day 3 |
| 5 days post-consultation without proposal | Escalation notification | Day 5 |

### Follow-Up Timeline
- **Day 0:** Thank you email (evening after consultation)
- **Day 1:** Next steps email
- **Day 3:** Design preview teaser (if proposal not ready)
- **Day 5-7:** Proposal delivery target
- **Day 7:** If delayed, status update email

### Owner Assignment
- **Primary:** Brandon Calloway (exclusive)

---

## Stage 6: Proposal Sent

### Definition
A lead who has received a formal quote and project proposal.

### Entry Criteria
- Custom proposal/quote delivered via email
- 3D design rendering included
- All pricing disclosed

### Exit Criteria
- Lead accepts (moves to "Won")
- Lead enters negotiation (moves to "Negotiation")
- Lead declines (moves to "Lost")
- No response after 14 days (moves to "Lost")

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Proposal sent | Send proposal delivery email with attachments | Immediate |
| Proposal sent | Create "Proposal Review Call" task | 2 days later |
| Proposal sent | Track email opens | Real-time |
| Proposal opened 3+ times | Priority notification to Brandon | Real-time |
| 3 days post-proposal | Send check-in email | Day 3 |
| 7 days post-proposal | Send "Questions?" email | Day 7 |
| 10 days post-proposal | Create phone call task | Day 10 |
| 14 days post-proposal | Send "Final Thoughts" email | Day 14 |
| Proposal link clicked | Notification to Brandon | Real-time |

### Follow-Up Timeline
- **Day 0:** Proposal delivered, tracking enabled
- **Day 2:** Offer proposal review call
- **Day 3:** Check-in email
- **Day 7:** Address potential objections email
- **Day 10:** Phone call attempt
- **Day 14:** Final decision request
- **Day 21:** Move to "Lost" if no response

### Owner Assignment
- **Primary:** Brandon Calloway (exclusive)

---

## Stage 7: Negotiation

### Definition
A lead actively discussing terms, pricing, or scope adjustments.

### Entry Criteria
- Lead has requested changes to proposal
- Lead is comparing with competitors
- Lead has expressed budget concerns
- Lead is discussing with spouse/partner

### Exit Criteria
- Agreement reached (moves to "Won")
- Terms not acceptable (moves to "Lost")
- Lead goes silent for 14+ days (moves to "Lost")

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Negotiation status assigned | Create "Negotiation Strategy" task | Immediate |
| Negotiation status assigned | Pause standard follow-up sequence | Immediate |
| 5 days in negotiation | Send value reinforcement email | Day 5 |
| 7 days in negotiation | Create check-in call task | Day 7 |
| 10 days in negotiation | Send urgency/availability email | Day 10 |
| 14 days in negotiation | Final decision request | Day 14 |

### Follow-Up Timeline
- **Immediate:** Acknowledge concerns, provide options
- **Day 3:** Check on decision timeline
- **Day 5:** Reinforce value proposition
- **Day 7:** Offer decision support (Q&A call)
- **Day 10:** Create urgency (seasonal/availability)
- **Day 14:** Request final decision

### Owner Assignment
- **Primary:** Brandon Calloway (exclusive)

---

## Stage 8: Won

### Definition
A lead who has signed the contract and submitted the deposit.

### Entry Criteria
- Contract signed
- Deposit received
- Project start date confirmed

### Exit Criteria
- Project completed (moves to "Customer")

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Deal won | Send welcome/onboarding email | Immediate |
| Deal won | Create "Project Kickoff" task | Immediate |
| Deal won | Update revenue forecasting | Immediate |
| Deal won | Notify operations team | Immediate |
| Deal won | Send internal celebration notification | Immediate |
| Deal won | Add to Customer Onboarding sequence | Immediate |
| If referral | Send referrer thank you and reward notification | Immediate |

### Follow-Up Timeline
- **Day 0:** Welcome email, onboarding materials
- **Day 1:** Kickoff call scheduling
- **Day 3:** Project timeline confirmation
- **Week 1:** Permit status update
- **Ongoing:** Weekly project updates

### Owner Assignment
- **Primary:** Operations (project execution)
- **Secondary:** Brandon Calloway (relationship maintenance)

---

## Stage 9: Lost

### Definition
A lead who did not proceed with the project.

### Entry Criteria
- Lead explicitly declines
- Lead chooses competitor
- Lead goes unresponsive after proposal stage
- Budget/timeline no longer viable

### Exit Criteria
- Re-engages (returns to appropriate stage)
- Requests removal from contact list

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Lost status assigned | Send "Door is Always Open" email | Day 1 |
| Lost status assigned | Create "Lost Reason" task | Immediate |
| Lost status assigned | Remove from active sequences | Immediate |
| 30 days after lost | Add to Re-Engagement sequence | Day 30 |
| 90 days after lost | Send seasonal check-in email | Day 90 |
| 365 days after lost | Send annual "Still Thinking About a Pool?" email | Year 1 |

### Follow-Up Timeline
- **Day 1:** Graceful close email
- **Day 30:** Begin re-engagement sequence
- **Day 90:** Seasonal check-in
- **Day 180:** New offerings email
- **Day 365:** Annual follow-up

### Owner Assignment
- **Primary:** Marketing (re-engagement automation)

### Lost Reason Categories
Track in CRM for analysis:
- Price too high
- Chose competitor
- Timeline not right
- Budget not approved
- Decided against pool
- Moving/selling home
- Unresponsive
- Other (specify)

---

## Stage 10: Customer

### Definition
A lead who has become a paying customer with a completed project.

### Entry Criteria
- Project completed and final walkthrough done
- Final payment received
- Customer satisfaction confirmed

### Exit Criteria
- Becomes advocate (graduates to "Advocate")
- Requests no further contact

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Customer status assigned | Send project completion email | Immediate |
| Customer status assigned | Create "Request Review" task | 7 days later |
| 7 days post-completion | Send review request email | Day 7 |
| 14 days post-completion | Send maintenance tips email | Day 14 |
| 30 days post-completion | Send "How's the Pool?" check-in | Day 30 |
| 60 days post-completion | Send referral request email | Day 60 |
| 90 days post-completion | Offer maintenance service info | Day 90 |
| 365 days post-completion | Send anniversary email | Year 1 |

### Follow-Up Timeline
- **Day 0:** Completion celebration email
- **Day 7:** Review/testimonial request
- **Day 14:** Pool care tips
- **Day 30:** Satisfaction check-in
- **Day 60:** Referral ask
- **Day 90:** Maintenance services offer
- **Year 1:** Anniversary, referral ask, maintenance offer
- **Ongoing:** Seasonal tips, company updates

### Owner Assignment
- **Primary:** Marketing (automated nurture)
- **Secondary:** Brandon Calloway (relationship maintenance)

---

## Stage 11: Advocate

### Definition
A customer who actively promotes Tri-State Aquatic Solutions.

### Entry Criteria
- Left a 5-star review (Google, Facebook, etc.)
- Provided video testimonial
- Referred at least one lead
- Agreed to be a reference

### Exit Criteria
- Requests to stop being contacted for referrals

### Automated Actions
| Trigger | Action | Timing |
|---------|--------|--------|
| Advocate status assigned | Send thank you email | Immediate |
| Advocate status assigned | Add to VIP email list | Immediate |
| Advocate status assigned | Create "Referral Reward" task if applicable | Immediate |
| Quarterly | Send exclusive content/updates | Every 90 days |
| Referral submitted by advocate | Send thank you and reward notification | Immediate |
| Advocate anniversary | Send personalized thank you | Annually |

### Follow-Up Timeline
- **Immediate:** Thank you recognition
- **Monthly:** Pool tips and company updates
- **Quarterly:** Exclusive content, VIP offers
- **Annually:** Anniversary acknowledgment
- **Per referral:** Thank you and reward

### Owner Assignment
- **Primary:** Brandon Calloway (personal relationships)
- **Secondary:** Marketing (automated VIP nurture)

---

# 2. Automation Workflows

## Workflow 1: New Lead Welcome

### Purpose
Immediately engage new leads with valuable content and begin the qualification process.

### Trigger
- Contact form submission
- Consultation request form
- Pool guide download
- Phone inquiry logged
- Referral submitted

### Workflow Steps

```
TRIGGER: New lead created in CRM

Step 1: Immediate (0 min)
├── Send Welcome Email with Pool Guide
├── Create Task: "Initial Contact - {{Lead Name}}"
│   ├── Due: 4 hours
│   ├── Priority: High
│   └── Assigned: Brandon Calloway
├── Send Slack/SMS Notification: "New lead: {{Lead Name}} from {{Source}}"
└── Set Property: Lead Status = "New Lead"

Step 2: If from referral
├── Send Thank You Email to Referrer
├── Create Task: "Process Referral Reward - {{Referrer Name}}"
│   └── Due: 24 hours
└── Update Referrer's Record: Referrals +1

Step 3: 4 hours (if no response)
├── Create Task: "Phone Call Attempt #1 - {{Lead Name}}"
│   └── Due: Immediate
└── Log Call Attempt in Timeline

Step 4: Day 3 (if no response)
├── Send Follow-Up Email #1: "Quick Question About Your Pool Project"
└── Update Property: Follow-ups = 1

Step 5: Day 5 (if no response)
├── Create Task: "Phone Call Attempt #2 - {{Lead Name}}"
└── Send SMS (if mobile provided): "Hi {{FirstName}}, Brandon from Tri-State Aquatic Solutions. Just checking in about your pool project - happy to answer any questions!"

Step 6: Day 7 (if no response)
├── Send Final Follow-Up Email: "One More Try"
├── If still no response after Day 10:
│   ├── Set Status: "Unresponsive"
│   └── Add to Long-Term Nurture sequence
└── EXIT WORKFLOW
```

### Email Content Summary

**Email 1: Welcome (Immediate)**
- Subject: Your Pool Planning Guide is Ready, {{FirstName}}
- Content: Guide delivery, introduction to Brandon, what to expect
- CTA: Schedule Your Free Design Consultation

**Email 2: Follow-Up (Day 3)**
- Subject: Quick Question About Your Pool Project
- Content: Check if guide was helpful, offer to answer questions
- CTA: Reply with questions or schedule a call

**Email 3: Final (Day 7)**
- Subject: Is Now Not the Right Time?
- Content: Acknowledge timing, leave door open, offer value
- CTA: Reply "later" to stay in touch, or schedule call

---

## Workflow 2: Lead Nurture (MQL Sequence)

### Purpose
Educate and engage marketing qualified leads through valuable content until they're ready to schedule a consultation.

### Trigger
- Lead status changed to MQL
- Lead score reaches 30+ points
- Lead responds to outreach AND meets basic criteria

### Workflow Steps

```
TRIGGER: Lead status = MQL

Step 1: Immediate
├── Send "What to Expect" Email
├── Set Property: Nurture Sequence = "MQL"
└── Update Lead Score: +10 points

Step 2: Day 3
├── Send Educational Email #1: "Fiberglass vs Concrete: What to Know"
└── Track Opens/Clicks

Step 3: Day 6
├── Send Educational Email #2: "5 Questions Every Pool Buyer Should Ask"
└── If clicked pricing info: Update Lead Score +5

Step 4: Day 10
├── Send Social Proof Email: "Recent Main Line Transformation"
├── Include before/after gallery link
└── Track Gallery Visits

Step 5: Day 14
├── Send Timeline Education Email: "Your Pool Timeline Explained"
└── Include seasonal urgency if applicable

Step 6: Day 18
├── If lead has opened 3+ emails:
│   ├── Send Direct Ask Email: "Ready to See What's Possible?"
│   └── Create High-Priority Task: "Hot MQL Follow-Up"
├── If lead has opened <3 emails:
│   └── Send Re-Engagement Email: "Still Thinking About a Pool?"

Step 7: Day 21
├── Evaluate Lead Score
├── If Score > 50: Upgrade to SQL, exit workflow
├── If Score 30-50: Continue nurture, re-enter at Step 2
├── If Score < 30: Move to Long-Term Nurture
└── EXIT WORKFLOW
```

### Email Content Topics

1. **What to Expect** - Process overview, timeline, what makes us different
2. **Fiberglass Education** - Benefits, myths, comparisons
3. **Questions to Ask** - Buyer's checklist, red flags
4. **Social Proof** - Case study, testimonials, before/after
5. **Timeline Reality** - Seasonal factors, planning ahead
6. **Direct Ask** - Clear CTA to schedule consultation

---

## Workflow 3: Consultation Reminder

### Purpose
Ensure maximum show rate for scheduled consultations through strategic reminders.

### Trigger
- Consultation appointment created in CRM/Calendar
- Deal stage changed to "Consultation Scheduled"

### Workflow Steps

```
TRIGGER: Consultation appointment created

Step 1: Immediate
├── Send Confirmation Email
│   ├── Include: Date, time, address confirmation
│   ├── Include: What to prepare (inspiration photos, questions, decision-makers)
│   └── Include: Calendar invite attachment
├── Create Task: "Consultation Prep - {{Lead Name}}"
│   ├── Due: Day before appointment
│   └── Checklist: Review lead history, prep materials, confirm directions
└── Add property address to calendar event

Step 2: 72 hours before
├── Send Preparation Email
│   ├── Subject: Getting Ready for Our Meeting, {{FirstName}}
│   ├── Content: What to think about, how to prepare, what Brandon will cover
│   └── CTA: Reply with any advance questions
└── Confirm appointment still in calendar

Step 3: 24 hours before
├── Send Reminder Email
│   ├── Subject: See You Tomorrow!
│   ├── Content: Confirmation of time, Brandon's photo, what to expect
│   └── CTA: Need to reschedule? Click here
├── If mobile number available:
│   └── Queue SMS for Day-of

Step 4: 2 hours before
├── Send SMS Reminder (if mobile)
│   └── "Hi {{FirstName}}, Brandon here! Looking forward to meeting you at {{Time}}. See you soon!"
└── Update CRM: Reminder Sequence Complete

Step 5: Appointment time passed
├── Wait 30 minutes
├── If no outcome logged:
│   └── Create Task: "Log Consultation Outcome - {{Lead Name}}"
├── If no-show:
│   ├── Send Reschedule Email: "Sorry We Missed Each Other"
│   └── Create Task: "Reschedule No-Show - {{Lead Name}}"

EXIT WORKFLOW
```

### Reminder Email Content

**Confirmation (Immediate)**
- Warm confirmation
- Logistics (date, time, address)
- What will be covered
- Preparation suggestions

**Preparation (72 hours)**
- Encourage all decision-makers to attend
- Suggest gathering inspiration photos
- Prompt them to think about budget range
- Questions they should prepare

**Reminder (24 hours)**
- Friendly reminder
- Brandon's photo to humanize
- Easy reschedule option
- Excitement building

**SMS (2 hours)**
- Brief, personal, warm
- Direct from Brandon

---

## Workflow 4: Post-Consultation Follow-Up

### Purpose
Maintain momentum after consultation and move leads toward proposal acceptance.

### Trigger
- Consultation completed (outcome logged in CRM)
- Deal stage changed to "Consultation Completed"

### Workflow Steps

```
TRIGGER: Consultation logged as completed

Step 1: Same day (6 PM)
├── Send Thank You Email
│   ├── Subject: Great Meeting You Today, {{FirstName}}
│   ├── Content: Recap discussion, express excitement, preview next steps
│   └── Personalize based on consultation notes
└── Update Lead Score: +25 points

Step 2: Day 1
├── Create Task: "Begin Proposal - {{Lead Name}}"
│   ├── Due: 3 days
│   └── Include consultation notes
└── Send "Next Steps" Email with timeline expectation

Step 3: Day 3
├── If proposal not started:
│   └── Create Reminder Task: "URGENT: Proposal Overdue"
├── Send Design Preview Teaser Email (if applicable)
│   └── "Your design is taking shape!"

Step 4: Day 5-7 (Proposal Ready)
├── Send Proposal Email (manual trigger)
├── Change Stage: "Proposal Sent"
└── EXIT to Proposal Follow-Up Workflow

Step 5: If proposal delayed beyond Day 7
├── Send Status Update Email: "Quick Update on Your Proposal"
├── Explain delay, provide new timeline
└── Create Escalation Task
```

### Email Content

**Thank You (Same Day)**
- Personal thank you for their time
- Reference specific things discussed
- Reiterate enthusiasm for their project
- Set expectations for proposal timeline

**Next Steps (Day 1)**
- Confirm proposal timeline (5-7 days)
- What they can expect in the proposal
- Encourage questions in the meantime

**Design Preview (Day 3)**
- Teaser that design is progressing
- Build anticipation
- Optional: share one detail or feature discussed

---

## Workflow 5: Proposal Follow-Up

### Purpose
Maximize proposal-to-close conversion through strategic follow-up and objection handling.

### Trigger
- Proposal email sent
- Deal stage changed to "Proposal Sent"

### Workflow Steps

```
TRIGGER: Proposal sent via email

Step 1: Immediate
├── Set Deal Stage: "Proposal Sent"
├── Track Email Open
├── Track Proposal PDF Opens/Views
└── Create Task: "Proposal Review Call"
    └── Due: Day 2

Step 2: Real-time tracking
├── If proposal opened 3+ times in 24 hours:
│   ├── Send Internal Alert: "{{Lead Name}} is reviewing proposal actively!"
│   └── Create Priority Task: "Hot Proposal - Call Now"

Step 3: Day 2
├── Send Check-In Email
│   ├── Subject: Had a Chance to Review?
│   └── Offer to schedule review call
└── Create Task: "Phone Call - Proposal Review"

Step 4: Day 5 (if no response)
├── Send Questions Email
│   ├── Subject: Any Questions About Your Proposal?
│   ├── Address common concerns proactively
│   └── Offer financing information

Step 5: Day 7 (if no response)
├── Create Phone Call Task
└── Send Value Reinforcement Email
    └── Include testimonial or case study

Step 6: Day 10 (if no response)
├── Send Objection Handling Email
│   ├── Address comparison shopping
│   └── Reinforce unique value props
└── Create Priority Follow-Up Task

Step 7: Day 14 (if no response)
├── Send Final Decision Email
│   ├── Subject: {{FirstName}}, Ready to Move Forward?
│   ├── Include quote validity reminder (30 days)
│   └── Clear CTA to accept or discuss
└── Create Final Call Task

Step 8: Day 21 (if no response)
├── Send "Door is Open" Email
├── Change Stage: "Lost"
├── Set Lost Reason: "Unresponsive after proposal"
└── Add to Re-Engagement workflow (30-day delay)

EXIT WORKFLOW
```

### Email Sequence Summary

| Day | Email | Purpose |
|-----|-------|---------|
| 0 | Proposal Delivery | Custom quote with all details |
| 2 | Check-In | Confirm receipt, offer call |
| 5 | Questions | Address common concerns |
| 7 | Value | Testimonial, differentiation |
| 10 | Objection Handling | Compare shopping, decision support |
| 14 | Final Ask | Clear decision request |
| 21 | Door Open | Graceful close |

---

## Workflow 6: Lost Lead Re-Engagement

### Purpose
Re-engage leads who did not convert, understanding that timing often changes.

### Trigger
- Deal stage changed to "Lost"
- 30 days have passed since lost date

### Workflow Steps

```
TRIGGER: Lost lead + 30 days elapsed

ENTRY CONDITIONS:
├── Lead is not marked "Do Not Contact"
├── Lead did not choose competitor (different workflow)
└── Lead's email is valid

Step 1: Day 30 (post-lost)
├── Send Re-Engagement Email #1
│   ├── Subject: {{FirstName}}, Still Dreaming of That Backyard Retreat?
│   └── Gentle check-in, no pressure
└── Track Opens/Clicks

Step 2: Day 38 (if no response)
├── Send Re-Engagement Email #2
│   ├── Subject: Have You Considered a Plunge Pool?
│   └── Present alternative option that may be better fit
└── Include new content or offering

Step 3: Day 50 (if no response)
├── Send Social Proof Email
│   ├── Subject: Your Neighbors Are Swimming
│   └── Recent local project showcase
└── Track Engagement

Step 4: Day 65 (if no response)
├── Send Final Re-Engagement Email
│   ├── Subject: This Will Be My Last Email (For Now)
│   └── Graceful close, leave door open
├── If still no engagement:
│   ├── Move to Long-Term Nurture (quarterly)
│   └── EXIT WORKFLOW
├── If engaged:
│   ├── Return to MQL status
│   └── Enter Lead Nurture workflow

Step 5: Seasonal Triggers (ongoing)
├── Spring (February-March): Send seasonal push email
├── Fall (September): Send off-season planning email
└── Annual (Lost Date + 365 days): Send anniversary check-in

EXIT WORKFLOW (after Day 65 or re-engagement)
```

### Re-Engagement Messaging Strategy

**Email 1 (Day 30)**: Gentle check-in
- Acknowledge time has passed
- No pressure, just checking in
- Mention we're still here when ready

**Email 2 (Day 38)**: Alternative offering
- Present plunge pool option
- May address budget/scope concerns
- Fresh perspective on the project

**Email 3 (Day 50)**: Social proof
- Show recent local project
- Demonstrate ongoing success
- Create aspiration and FOMO

**Email 4 (Day 65)**: Graceful close
- Respectful final outreach
- Leave door open
- Easy way to opt out

---

## Workflow 7: Customer Onboarding

### Purpose
Deliver exceptional post-sale experience that builds advocacy and referrals.

### Trigger
- Deal marked as "Won"
- Contract signed and deposit received

### Workflow Steps

```
TRIGGER: Deal stage = Won

Step 1: Immediate
├── Send Welcome Email
│   ├── Subject: Welcome to the Tri-State Aquatic Solutions Family!
│   ├── Content: Congratulations, what to expect, contact info
│   └── Attach: Project timeline, payment schedule, FAQ
├── Create Tasks:
│   ├── "Project Kickoff Call" - Due: Day 2
│   ├── "Begin Permit Process" - Due: Day 3
│   └── "Order Materials" - Due: Week 1
├── Send Internal Notifications:
│   ├── Notify operations team
│   └── Update capacity planning
└── If referral source exists:
    └── Trigger Referral Reward workflow

Step 2: Day 1
├── Send "What to Expect" Email
│   ├── Detailed project phases explanation
│   ├── Communication expectations
│   └── Key dates and milestones
└── Create Customer Record in CRM

Step 3: Day 3
├── Kickoff Call Completed
├── Send Follow-Up Email with Call Notes
│   ├── Confirmed timeline
│   ├── Permit process status
│   └── Next communication date
└── Set up project milestone reminders

Step 4: Week 1
├── Send "Permit Update" Email
│   └── Status of permit submission
└── Schedule weekly check-in emails

Step 5: Throughout Project
├── Weekly Update Email (automated template)
│   ├── Progress this week
│   ├── Next week's plan
│   └── Photos (if applicable)
├── Milestone Emails:
│   ├── Permit Approved
│   ├── Installation Start Date Confirmed
│   ├── Pool Arrived
│   ├── Installation Complete
│   └── Final Walkthrough Scheduled

Step 6: Project Complete
├── Send Completion Celebration Email
├── Change Stage: "Customer"
├── Schedule Post-Completion Sequence
└── EXIT to Customer Retention workflow
```

### Onboarding Email Sequence

| Timing | Email | Content |
|--------|-------|---------|
| Day 0 | Welcome | Congratulations, expectations, contacts |
| Day 1 | What to Expect | Detailed process walkthrough |
| Day 3 | Kickoff Summary | Timeline, permits, next steps |
| Weekly | Progress Update | Current status, upcoming work |
| Milestones | Status Notification | Key milestone updates |
| Complete | Celebration | Congratulations, next steps |

---

## Workflow 8: Post-Project Review Request

### Purpose
Capture reviews and testimonials while customer satisfaction is highest.

### Trigger
- Project marked as complete
- Final walkthrough completed
- 7 days have passed since completion

### Workflow Steps

```
TRIGGER: Project complete + 7 days

Step 1: Day 7 (post-completion)
├── Send Review Request Email #1
│   ├── Subject: How's the Pool, {{FirstName}}?
│   ├── Content: Hope you're enjoying it, would love your feedback
│   ├── Include Direct Links:
│   │   ├── Google Review Link
│   │   ├── Facebook Review Link
│   │   └── Video Testimonial Request (optional)
│   └── Make it easy: one-click options
├── Create Task: "Follow Up on Review - {{Customer Name}}"
│   └── Due: Day 10
└── Track Email Opens and Link Clicks

Step 2: Day 10 (if no review submitted)
├── Send Gentle Reminder Email
│   ├── Subject: Quick Favor?
│   └── Emphasize: Takes 2 minutes, helps other families
└── Include same review links

Step 3: Day 14 (if no review submitted)
├── Send SMS Request (if mobile)
│   └── "Hi {{FirstName}}! Brandon from Tri-State. Loving how the pool turned out. If you have 2 mins, a Google review would mean the world to us! [link]"
└── Track SMS Click

Step 4: Day 21 (if no review submitted)
├── Send Final Request Email
│   ├── Subject: One Last Ask
│   └── Include alternative: written testimonial via email reply
├── If still no response after Day 30:
│   ├── Mark: Review Request Complete (No Review)
│   └── EXIT WORKFLOW
├── If review submitted at any point:
│   ├── Send Thank You Email (automated detection or manual)
│   ├── Update Status: Advocate
│   └── EXIT WORKFLOW

Step 5: Review Submitted (any time)
├── Detect via Google/Facebook API or manual logging
├── Send Personal Thank You Email
├── Create Task: "Send Thank You Gift - {{Customer Name}}"
├── Update Customer Status: Advocate
└── Trigger Advocate Workflow
```

### Review Request Best Practices

1. **Timing is crucial** - 7 days is optimal (still excited, had time to enjoy)
2. **Make it easy** - Direct links that go straight to review form
3. **Be genuine** - Not transactional, express authentic appreciation
4. **Offer options** - Some prefer Google, others Facebook, some written testimonial
5. **Follow up gently** - Persistence without annoyance
6. **Thank immediately** - When review is posted, acknowledge right away

---

## Workflow 9: Customer Anniversary

### Purpose
Maintain long-term relationships, generate referrals, and capture maintenance business.

### Trigger
- Annual anniversary of project completion
- Runs every year until customer opts out

### Workflow Steps

```
TRIGGER: Date = Customer's Pool Anniversary

Step 1: Anniversary Day
├── Send Anniversary Email
│   ├── Subject: Happy Pool-iversary, {{FirstName}}!
│   ├── Content:
│   │   ├── Celebrate their pool ownership
│   │   ├── Ask how they're enjoying it
│   │   ├── Include maintenance tips for the season
│   │   └── Referral ask with incentive
│   └── Include:
│       ├── Maintenance checklist
│       └── Referral offer details
├── Create Task: "Anniversary Check-In Call - {{Customer Name}}"
│   └── Due: Within 3 days
└── Update Property: Anniversaries Sent +1

Step 2: Day 3 (if no response to email)
├── Make Anniversary Phone Call
│   ├── Script: Check in, ask about pool, mention referral program
│   └── Log call outcome in CRM
└── If reached and positive:
    └── Update Notes with feedback

Step 3: Day 7
├── Send Maintenance Offer Email
│   ├── Subject: Keep Your Pool Perfect
│   ├── Content: Opening/closing services, ongoing maintenance
│   └── Special anniversary pricing if applicable
└── Create Task: "Follow Up on Maintenance Interest"

Step 4: Day 14
├── Send Referral Reminder Email
│   ├── Subject: Know Anyone Who'd Love a Pool?
│   ├── Content: Referral program details, rewards
│   └── Easy referral submission link
└── Track Referral Submissions

Step 5: Post-Anniversary
├── Log Anniversary Complete
├── Schedule Next Year's Anniversary
│   └── Set reminder for Year +1
└── EXIT WORKFLOW (until next year)
```

### Anniversary Email Template

**Subject:** Happy Pool-iversary, {{FirstName}}!

**Body:**
- Celebrate: "Hard to believe it's been X year(s)!"
- Reminisce: "Remember how that backyard looked before?"
- Inquire: "How's the pool treating you?"
- Value: Seasonal maintenance tip
- Ask: Referral request with clear incentive
- Offer: Maintenance services available

---

## Workflow 10: Referral Tracking

### Purpose
Manage the referral process from submission through reward fulfillment.

### Trigger
- Referral submitted via form, email, or phone
- New lead source = "Customer Referral"

### Workflow Steps

```
TRIGGER: Referral submitted / Lead source = Referral

Step 1: Immediate
├── Create Referral Record
│   ├── Referrer Name
│   ├── Referred Lead Name
│   ├── Relationship
│   └── Date Submitted
├── Send Thank You Email to Referrer
│   ├── Subject: Thank You for the Referral, {{ReferrerName}}!
│   ├── Content: Acknowledgment, what happens next, reward reminder
│   └── Include: Status tracking link (optional)
├── Send Internal Notification
│   └── "New referral from {{ReferrerName}}: {{ReferredName}}"
├── Create Task: "Process Referral - {{ReferredName}}"
│   └── Priority: High (referrals should be hot leads)
└── Tag New Lead: "Referral from {{ReferrerName}}"

Step 2: Lead Processing
├── Follow New Lead Welcome workflow (expedited)
├── Note in all communications: "Referred by {{ReferrerName}}"
└── Track Lead Progress

Step 3: Milestone Updates to Referrer
├── When referred lead schedules consultation:
│   └── Send Update Email: "Great News About Your Referral"
├── When referred lead becomes proposal stage:
│   └── Optional: Send Update Email
├── When referred lead becomes Won:
│   └── Trigger Reward Fulfillment (Step 4)
├── When referred lead becomes Lost:
│   ├── Send Gentle Update Email to Referrer
│   └── "The timing wasn't right, but we appreciate you connecting us"

Step 4: Reward Fulfillment (Lead = Won)
├── Create Task: "Fulfill Referral Reward - {{ReferrerName}}"
│   ├── Due: 5 business days
│   └── Include: Reward type, amount, delivery method
├── Send Celebration Email to Referrer
│   ├── Subject: Your Referral Reward is On Its Way!
│   ├── Content: Thank you, reward details, encourage more referrals
│   └── Ask: Would they like to share a testimonial?
├── Process Reward:
│   ├── Gift Card: Email delivery or mail physical
│   ├── Cash: Check or account credit
│   └── Discount: Apply to future maintenance services
├── Update Referrer Record:
│   ├── Referrals Converted +1
│   ├── Rewards Earned +$X
│   └── Update Advocate Score
└── Send Internal Confirmation: "Referral reward sent to {{ReferrerName}}"

Step 5: Ongoing Referrer Nurture
├── Add Referrer to VIP/Advocate list
├── Send quarterly thank you with referral reminder
└── Consider for testimonial/case study

EXIT WORKFLOW
```

### Referral Reward Structure

| Outcome | Reward |
|---------|--------|
| Referral submitted | Thank you email |
| Consultation scheduled | Update email |
| Deal won | $500 gift card OR $500 credit toward maintenance |
| Multiple referrals | Escalating rewards, VIP status |

### Referral Tracking Metrics

Track in CRM:
- Total referrals submitted
- Referrals converted to consultations
- Referrals converted to sales
- Referral conversion rate
- Average referral value
- Top referrers (by quantity and value)
- Referral reward costs
- Referral ROI

---

# 3. Lead Scoring Model

## Overview

Lead scoring helps prioritize outreach by quantifying lead quality and engagement. Higher scores indicate leads more likely to convert.

### Score Thresholds

| Score Range | Classification | Action |
|-------------|---------------|--------|
| 0-29 | Cold Lead | Nurture with automation only |
| 30-49 | Warm Lead (MQL) | Active marketing engagement |
| 50-74 | Hot Lead (SQL) | Personal sales outreach |
| 75+ | Very Hot Lead | Immediate priority follow-up |

---

## Demographic Scoring (Fit)

How well the lead matches our ideal customer profile.

| Attribute | Criteria | Points |
|-----------|----------|--------|
| **Location - Primary** | Hockessin, Wilmington, Main Line PA, Chester County | +25 |
| **Location - Secondary** | Northern Delaware, South Jersey | +15 |
| **Location - Tertiary** | Extended service area | +5 |
| **Location - Outside Area** | Outside service area | -50 |
| **Property Value** | $500K+ | +15 |
| **Property Value** | $300K-$499K | +10 |
| **Property Value** | Under $300K | 0 |
| **Homeowner Status** | Confirmed homeowner | +10 |
| **Homeowner Status** | Unknown/Renter | 0 |
| **Income Indicator** | High income zip code | +10 |
| **Pool Type Interest** | Fiberglass | +10 |
| **Pool Type Interest** | Plunge Pool | +10 |
| **Pool Type Interest** | Concrete/Gunite | +5 |
| **Budget Indicated** | $60K+ | +15 |
| **Budget Indicated** | $40K-$59K | +10 |
| **Budget Indicated** | Under $40K | 0 |
| **Timeline** | Within 3 months | +15 |
| **Timeline** | 3-6 months | +10 |
| **Timeline** | 6-12 months | +5 |
| **Timeline** | 12+ months or "just browsing" | 0 |

### Fit Score Maximum: 85 points

---

## Behavioral Scoring (Engagement)

How engaged the lead is with our brand and content.

### Website Behavior

| Action | Points | Notes |
|--------|--------|-------|
| Visited website | +1 | Per session, max +5 |
| Viewed pricing page | +5 | High intent signal |
| Viewed gallery page | +3 | Research behavior |
| Viewed process page | +3 | Serious consideration |
| Viewed fiberglass page | +5 | Product interest |
| Viewed plunge pool page | +5 | Product interest |
| Viewed contact page | +5 | Pre-conversion |
| Time on site 2+ minutes | +3 | Engaged visitor |
| Time on site 5+ minutes | +5 | Very engaged |
| Return visit | +3 | Per return, max +9 |

### Email Engagement

| Action | Points | Notes |
|--------|--------|-------|
| Opened email | +1 | Per email, max +10 |
| Clicked email link | +3 | Per click, max +15 |
| Replied to email | +10 | Strong engagement |
| Forwarded email | +5 | Sharing with decision-maker |
| Opened email 3+ times | +3 | Very interested in content |

### Form/Content Engagement

| Action | Points | Notes |
|--------|--------|-------|
| Downloaded pool guide | +10 | Indicated interest |
| Submitted contact form | +15 | High intent |
| Requested consultation | +25 | Ready to engage |
| Watched video content | +5 | Per video, max +15 |
| Attended webinar | +15 | Very engaged |

### Direct Engagement

| Action | Points | Notes |
|--------|--------|-------|
| Responded to phone call | +10 | Direct engagement |
| Initiated phone call | +15 | Very high intent |
| Attended consultation | +25 | Major milestone |
| Requested proposal | +20 | Pre-purchase signal |
| Viewed proposal | +10 | Active consideration |
| Viewed proposal 3+ times | +15 | Very interested |

### Referral Source

| Source | Points | Notes |
|--------|--------|-------|
| Customer referral | +20 | Highest quality source |
| Word of mouth | +15 | Trust-based source |
| Google organic | +10 | Active search |
| Google paid | +10 | Active search |
| Social media | +5 | Brand awareness |
| Home show | +10 | Active market |
| Trade publication | +5 | Research phase |

### Behavioral Score Maximum: 100+ points

---

## Decay Rules

Scores should decay over time to reflect waning interest.

| Time Without Engagement | Score Adjustment |
|------------------------|------------------|
| 14 days | -5 points |
| 30 days | -10 points |
| 60 days | -20 points |
| 90 days | -30 points |
| 180+ days | Reset to base demographic score |

---

## Score-Based Actions

### Automatic Triggers

| Score Event | Trigger | Action |
|-------------|---------|--------|
| Score reaches 30 | MQL Threshold | Move to MQL status, enter Lead Nurture |
| Score reaches 50 | SQL Threshold | Move to SQL status, alert Brandon |
| Score reaches 75 | Very Hot Lead | Immediate priority call task |
| Score drops below 30 | Cooling Lead | Return to automated nurture |
| Score increases 15+ in 24 hours | Engagement Spike | Alert: Hot activity |
| Proposal viewed 3+ times | High Interest | Priority follow-up task |

### Manual Review Triggers

| Event | Action |
|-------|--------|
| Score reaches 75+ but no consultation scheduled | Review for barriers |
| Score was 50+ but dropped below 30 | Review engagement history |
| High demographic score (60+) but low behavioral (10-) | Review outreach strategy |

---

# 4. Task Templates

## Sales Follow-Up Tasks

### Initial Contact

**Task Name:** Initial Contact - {{Lead Name}}
**Due:** 4 hours after lead creation
**Priority:** High
**Assigned To:** Brandon Calloway

**Description:**
```
New lead requires initial contact.

Lead Details:
- Name: {{Lead Name}}
- Phone: {{Phone}}
- Email: {{Email}}
- Source: {{Lead Source}}
- Interest: {{Pool Type Interest}}

Actions Required:
[ ] Review lead source and any submitted information
[ ] Call within 4 hours (goal: 5 minutes from submission)
[ ] If no answer, leave voicemail
[ ] Log call attempt in CRM
[ ] Send follow-up email if no phone connection
[ ] Update lead status based on outcome

Call Script Notes:
- Introduce yourself as the owner
- Reference how they found us
- Ask about their vision for their backyard
- Qualify: timeline, budget range, decision-makers
- Offer to schedule consultation

Outcome Options:
- Connected: Schedule consultation
- Voicemail: Set follow-up task for tomorrow
- Wrong number: Update record, mark invalid
- Not qualified: Update status, add to long-term nurture
```

### Qualification Call

**Task Name:** Qualification Call - {{Lead Name}}
**Due:** Within 24 hours of MQL status
**Priority:** High
**Assigned To:** Brandon Calloway

**Description:**
```
MQL requires qualification to determine SQL readiness.

Lead Details:
- Name: {{Lead Name}}
- Score: {{Lead Score}}
- Engagement: {{Recent Activity Summary}}
- Previous Contact: {{Last Contact Date}}

Qualification Criteria (BANT):
[ ] Budget: $40K+ (standard) or $35K+ (plunge)
[ ] Authority: Decision-maker or spouse involved
[ ] Need: Clear reason for wanting pool
[ ] Timeline: Within 12 months

Questions to Ask:
1. "What's driving your interest in a pool right now?"
2. "Have you thought about budget range for this project?"
3. "Who else will be involved in this decision?"
4. "When would you ideally want to be swimming?"
5. "Have you spoken with other pool companies?"

If Qualified:
- Schedule consultation
- Move to SQL status
- Enter consultation prep workflow

If Not Qualified:
- Add notes on barriers
- Return to MQL nurture
- Set future follow-up date if timing issue
```

### Proposal Review Call

**Task Name:** Proposal Review Call - {{Lead Name}}
**Due:** 2 days after proposal sent
**Priority:** High
**Assigned To:** Brandon Calloway

**Description:**
```
Follow up on sent proposal to discuss and close.

Proposal Details:
- Sent Date: {{Proposal Sent Date}}
- Amount: {{Quote Amount}}
- Pool Type: {{Design Style}}
- Email Opens: {{Open Count}}
- Proposal Views: {{View Count}}

Call Objectives:
[ ] Confirm they received and reviewed proposal
[ ] Answer any questions
[ ] Address any concerns or objections
[ ] Understand decision timeline
[ ] Ask for the business or schedule decision call

Common Objections & Responses:

"Price is high"
- Break down value and total cost of ownership
- Compare to concrete lifetime costs
- Discuss financing options
- Ask what budget they had in mind

"Need to think about it"
- "Absolutely, what specifically would you like to consider?"
- Identify the real concern
- Offer to address specific questions

"Talking to other companies"
- "That's smart. What questions should you ask them?"
- Provide comparison checklist
- Highlight our differentiators

"Spouse needs to review"
- Schedule time when both can meet/call
- Offer to present to both together

Outcome Tracking:
- Ready to proceed: Schedule signing
- Needs more time: Set follow-up date
- Going with competitor: Log reason, enter lost workflow
- Objection identified: Log objection, address immediately
```

---

## Consultation Preparation Tasks

### Consultation Prep

**Task Name:** Consultation Prep - {{Lead Name}}
**Due:** Day before consultation
**Priority:** Medium
**Assigned To:** Brandon Calloway

**Description:**
```
Prepare for on-site design consultation.

Consultation Details:
- Date/Time: {{Appointment Date}}
- Address: {{Property Address}}
- Lead Score: {{Lead Score}}

Pre-Consultation Research:
[ ] Review all CRM notes and email history
[ ] Check property on Google Maps/satellite
[ ] Note any visible yard features or constraints
[ ] Review any inspiration photos they've shared
[ ] Check neighborhood for completed pools (reference potential)

Materials to Bring:
[ ] iPad with design software
[ ] Portfolio book with project photos
[ ] Pool model catalogs (Latham, Leisure, Thursday)
[ ] Business cards
[ ] Measurement tools
[ ] Quote worksheet
[ ] Contract (for hot prospects)

Key Information to Capture:
- Yard dimensions and slope
- Access points for equipment
- Utility locations
- HOA restrictions (if any)
- Aesthetic preferences
- Feature priorities
- Budget confirmation
- Decision timeline
- All decision-makers present?

Questions to Ask:
1. Walk me through how you envision using this space
2. What features are must-haves vs nice-to-haves?
3. Are there any concerns about the project I should know?
4. Have you researched pool types? What appeals to you about fiberglass?
5. What timeline are you hoping for?

Post-Consultation:
[ ] Log detailed notes immediately after
[ ] Take yard photos (with permission)
[ ] Identify any red flags or special requirements
[ ] Estimate project complexity
[ ] Create preliminary design concept
```

---

## Post-Meeting Tasks

### Log Consultation Outcome

**Task Name:** Log Consultation Outcome - {{Lead Name}}
**Due:** Same day as consultation (2 hours after)
**Priority:** High
**Assigned To:** Brandon Calloway

**Description:**
```
Document consultation results for follow-up and proposal prep.

Required Information:
[ ] Meeting occurred? (Yes/No-show/Canceled)
[ ] Duration of meeting
[ ] Who was present (all decision-makers?)

Property Assessment:
[ ] Yard size and dimensions
[ ] Access for equipment
[ ] Grade/slope considerations
[ ] Utility locations confirmed
[ ] Any structural concerns
[ ] HOA restrictions identified

Customer Preferences:
[ ] Pool type discussed: {{Type}}
[ ] Size preference: {{Size}}
[ ] Features requested: {{Features}}
[ ] Design style: {{Style}}
[ ] Budget confirmed: {{Budget}}
[ ] Timeline: {{Timeline}}

Competitive Situation:
[ ] Other companies contacted?
[ ] What stage with competitors?
[ ] Key concerns or comparison points

Next Steps Agreed:
[ ] Proposal timeline committed: {{Date}}
[ ] Follow-up meeting scheduled: {{Date}}
[ ] Additional information needed: {{Info}}

Hot/Warm/Cool Assessment:
- Hot: Ready to proceed, just needs proposal
- Warm: Interested but needs convincing/time
- Cool: Early stage, shopping, or uncertain

Notes for Proposal:
[Free-form notes about special considerations,
personalization opportunities, concerns to address]
```

### Process Lost Lead

**Task Name:** Log Lost Reason - {{Lead Name}}
**Due:** Same day as lost status
**Priority:** Medium
**Assigned To:** Brandon Calloway

**Description:**
```
Document why the deal was lost for future learning.

Lost Reason Categories:
[ ] Price too high
[ ] Chose competitor - specify: {{Competitor Name}}
[ ] Timeline not right - when might reconsider: {{Date}}
[ ] Budget not approved
[ ] Decided against pool
[ ] Moving/selling home
[ ] Unresponsive
[ ] Other: {{Specify}}

Competitive Loss Details (if applicable):
- Which competitor?
- What was their offer?
- Why did they choose competitor?
- What could we have done differently?

Win-Back Potential:
[ ] High - timing issue, may return
[ ] Medium - could re-engage with different approach
[ ] Low - chose competitor or decided against pool
[ ] None - do not contact

Learning Opportunities:
- What could we have done better?
- Any gaps in our offering?
- Pricing competitiveness?
- Process issues?

Re-Engagement Plan:
- Add to 30-day re-engagement: [ ] Yes [ ] No
- Specific re-engagement trigger: {{Trigger}}
- Notes for future contact: {{Notes}}
```

---

# 5. Pipeline Reports and Dashboards

## Key Metrics to Track

### Lead Metrics

| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| **Total New Leads** | Leads entering pipeline | 40-60/month (season) | Weekly |
| **Lead Response Time** | Time from submission to first contact | < 4 hours | Daily |
| **Lead Source Mix** | Distribution by acquisition channel | Track trends | Monthly |
| **Cost Per Lead** | Total marketing spend / leads | < $50 | Monthly |
| **Lead Quality Score** | Average lead score at entry | > 25 | Weekly |

### Conversion Metrics

| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| **Lead to MQL Rate** | New Leads that become MQL | 40% | Weekly |
| **MQL to SQL Rate** | MQLs that become SQL | 50% | Weekly |
| **SQL to Consultation Rate** | SQLs that schedule consultation | 70% | Weekly |
| **Consultation Show Rate** | Scheduled that actually occur | 90% | Weekly |
| **Consultation to Proposal Rate** | Consultations that receive proposal | 80% | Weekly |
| **Proposal to Close Rate** | Proposals that convert to sale | 40% | Weekly |
| **Overall Conversion Rate** | Lead to Customer | 8-12% | Monthly |

### Pipeline Metrics

| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| **Pipeline Value** | Total value of active opportunities | Track trend | Weekly |
| **Weighted Pipeline** | Value x probability by stage | Track trend | Weekly |
| **Average Deal Size** | Mean contract value | $55,000 | Monthly |
| **Sales Cycle Length** | Days from lead to close | 45-60 days | Monthly |
| **Pipeline Velocity** | Deals x Win Rate x Value / Cycle Time | Track trend | Monthly |

### Activity Metrics

| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| **Calls Made** | Outbound call attempts | 15-20/day | Daily |
| **Emails Sent** | Personal (not automated) emails | 10/day | Daily |
| **Consultations Held** | On-site meetings | 8-12/week (season) | Weekly |
| **Proposals Sent** | Custom quotes delivered | 6-10/week (season) | Weekly |
| **Task Completion Rate** | Tasks done on time | 95% | Weekly |

### Customer Metrics

| Metric | Description | Target | Frequency |
|--------|-------------|--------|-----------|
| **Customer Satisfaction (NPS)** | Net Promoter Score | 70+ | Per project |
| **Review Rate** | Customers who leave review | 60% | Monthly |
| **Review Score** | Average rating | 4.8+ | Monthly |
| **Referral Rate** | Customers who refer | 30% | Quarterly |
| **Repeat/Maintenance Rate** | Customers using maintenance | 20% | Quarterly |

---

## Dashboard Views

### Executive Dashboard

**Purpose:** High-level business health overview
**Audience:** Owner, leadership
**Refresh:** Daily

**Widgets:**
1. **Revenue Scorecard**
   - MTD Revenue vs Target
   - YTD Revenue vs Target
   - Pipeline Value
   - Projected Close This Month

2. **Lead Funnel**
   - Visual funnel: New > MQL > SQL > Consultation > Proposal > Won
   - Conversion rates at each stage
   - Week-over-week trend

3. **Key Metrics Tiles**
   - Average Deal Size
   - Win Rate
   - Sales Cycle Length
   - Customer Satisfaction

4. **Pipeline by Stage**
   - Deals in each stage
   - Value by stage
   - Aging by stage (days in stage)

5. **Activity Summary**
   - Consultations scheduled this week
   - Proposals out
   - Deals expected to close

### Sales Pipeline Dashboard

**Purpose:** Active deal management
**Audience:** Sales (Brandon)
**Refresh:** Real-time

**Widgets:**
1. **My Active Deals**
   - Deal name, stage, value, days in stage
   - Next task/follow-up due
   - Health indicator (on-track/at-risk)

2. **Today's Tasks**
   - Calls to make
   - Emails to send
   - Consultations scheduled
   - Proposals to prepare

3. **Deals Requiring Attention**
   - Overdue tasks
   - Stale deals (no activity 7+ days)
   - High-value deals in negotiation

4. **This Week's Schedule**
   - Consultation calendar
   - Follow-up calls scheduled
   - Proposals due

5. **Win/Loss This Month**
   - Deals won with details
   - Deals lost with reasons

### Marketing Performance Dashboard

**Purpose:** Lead generation and nurture effectiveness
**Audience:** Marketing, Owner
**Refresh:** Weekly

**Widgets:**
1. **Lead Generation**
   - Leads by source (pie chart)
   - Lead volume trend (line chart)
   - Cost per lead by source

2. **Email Performance**
   - Open rates by sequence
   - Click rates by sequence
   - Best performing emails

3. **Website Analytics**
   - Sessions, unique visitors
   - Top pages by traffic
   - Conversion rate

4. **Lead Scoring Distribution**
   - Histogram of lead scores
   - Score trends over time
   - High-score leads (75+)

5. **Content Performance**
   - Guide downloads
   - Video views
   - Most requested information

### Forecasting View

**Purpose:** Revenue prediction
**Audience:** Owner
**Refresh:** Weekly

**Widgets:**
1. **30/60/90 Day Forecast**
   - Deals expected to close by period
   - Weighted by probability
   - Confidence level (committed/best case/pipeline)

2. **Seasonality Comparison**
   - This year vs last year (same period)
   - Seasonal trend analysis

3. **Capacity Planning**
   - Projected installations by month
   - Crew availability
   - Material lead times

4. **Pipeline Coverage**
   - Pipeline / Quota ratio
   - Adequacy for target

5. **Scenario Modeling**
   - Optimistic / Realistic / Conservative
   - Key assumptions

---

## Report Definitions

### Weekly Sales Report

**Sent:** Every Monday, 8 AM
**Recipients:** Brandon Calloway
**Format:** Email with PDF attachment

**Sections:**
1. **Last Week Summary**
   - New leads received
   - Consultations held
   - Proposals sent
   - Deals won/lost
   - Revenue booked

2. **This Week Priorities**
   - Consultations scheduled
   - Proposals due
   - Follow-ups needed
   - Deals expected to close

3. **Pipeline Status**
   - Total pipeline value
   - Stage-by-stage breakdown
   - Stale deal alerts

4. **Conversion Metrics**
   - Week-over-week comparison
   - Trend analysis

### Monthly Business Review

**Sent:** First Monday of month
**Recipients:** Brandon Calloway
**Format:** Comprehensive report

**Sections:**
1. **Financial Summary**
   - Revenue vs target
   - Average deal size
   - Revenue by pool type
   - Revenue by geography

2. **Funnel Analysis**
   - Full funnel metrics
   - Conversion rate by stage
   - Comparison to previous month/year

3. **Lead Source Analysis**
   - Volume and quality by source
   - Cost per lead by source
   - Best performing channels

4. **Win/Loss Analysis**
   - Wins: details, patterns, what worked
   - Losses: reasons, competitor analysis, learnings

5. **Customer Insights**
   - Reviews received
   - NPS scores
   - Referrals generated

6. **Forward Look**
   - Next month forecast
   - Pipeline health
   - Capacity planning

---

## CRM Setup Checklist

### Required Custom Properties

**Lead/Contact Properties:**
- Lead Score (number)
- Lead Source (dropdown)
- Lead Source Detail (text)
- Pool Type Interest (dropdown)
- Property Address (text)
- Property Value Estimate (currency)
- Referrer Name (text)
- Referrer ID (lookup)
- Budget Range (dropdown)
- Timeline (dropdown)
- HOA Name (text)
- HOA Restrictions (text)
- Last Contact Date (date)
- Next Follow-Up Date (date)

**Deal Properties:**
- Pool Type (dropdown)
- Pool Size (dropdown)
- Features Requested (multiselect)
- Installation Date Target (date)
- Consultation Date (date)
- Proposal Sent Date (date)
- Lost Reason (dropdown)
- Lost Reason Detail (text)
- Competitor (text)

**Company Properties:**
- Customer Since (date)
- Lifetime Value (currency)
- Projects Completed (number)
- Referrals Made (number)
- Review Status (dropdown)
- NPS Score (number)

### Automation Checklist

- [ ] New Lead Welcome sequence
- [ ] Lead Nurture (MQL) sequence
- [ ] Consultation Reminder sequence
- [ ] Post-Consultation sequence
- [ ] Proposal Follow-Up sequence
- [ ] Lost Lead Re-Engagement sequence
- [ ] Customer Onboarding sequence
- [ ] Review Request sequence
- [ ] Anniversary sequence
- [ ] Referral Tracking workflow
- [ ] Lead scoring automation
- [ ] Stage-change notifications
- [ ] Task creation rules
- [ ] Email tracking enabled
- [ ] Calendar integration
- [ ] SMS integration (optional)

---

## Implementation Notes

### Recommended CRM Platforms

**For Tri-State Aquatic Solutions, we recommend:**

1. **HubSpot CRM** (Primary Recommendation)
   - Free tier available for basics
   - Excellent automation in paid tiers
   - Easy email integration
   - Good reporting
   - Scales well

2. **Pipedrive** (Alternative)
   - Sales-focused
   - Simple and intuitive
   - Good mobile app
   - Affordable

3. **ActiveCampaign** (Email-focused)
   - Superior email automation
   - Good CRM add-on
   - Excellent sequences
   - Affordable

### Integration Requirements

- **Website forms** - Push to CRM automatically
- **Calendar** - Sync appointments
- **Email** - Track all communications
- **Phone** - Log calls (RingCentral, Aircall, or similar)
- **Proposals** - Track opens/views (PandaDoc, Proposify)
- **Reviews** - Monitor Google/Facebook
- **Accounting** - Sync won deals (QuickBooks, Xero)

---

*Last Updated: February 2026*
*Contact: info@tristateaquaticsolutions.com*
*Owner: Brandon Calloway | 610-870-3113*
