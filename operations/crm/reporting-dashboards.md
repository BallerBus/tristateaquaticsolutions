# Reporting & Dashboards - Tri-State Aquatic Solutions

## Overview

This document defines the key metrics, dashboards, and reporting cadence for CRM analytics.

---

## Sales Dashboard

### Dashboard Name: Sales Performance

**Audience:** Sales Team, Sales Manager, Leadership

**Refresh Frequency:** Real-time

### Metric Cards (Top Row)

| Metric | Definition | Target | Warning Threshold |
|--------|------------|--------|-------------------|
| Deals in Pipeline | Count of open deals | - | < 10 deals |
| Pipeline Value | Sum of open deal amounts | - | < $500K |
| Deals Won (MTD) | Closed Won this month | 5/month | < 2 at mid-month |
| Revenue Won (MTD) | Sum of won deal amounts | $250K/month | < $100K at mid-month |
| Win Rate | Won / (Won + Lost) | 25% | < 15% |
| Avg Deal Size | Revenue / Won Deals | $50K | < $35K |

### Pipeline Funnel Chart

**Visualization:** Horizontal funnel

| Stage | Target Conversion |
|-------|-------------------|
| New Lead | 100% (starting) |
| Contacted | 70% |
| Consultation Scheduled | 50% |
| Consultation Complete | 45% |
| Quote Sent | 40% |
| Quote Follow-Up | 35% |
| Negotiation | 25% |
| Contract Sent | 20% |
| Closed Won | 15% |

### Pipeline by Stage

**Visualization:** Bar chart or table

| Column | Description |
|--------|-------------|
| Stage | Pipeline stage name |
| Deal Count | Number of deals |
| Value | Sum of deal amounts |
| Weighted Value | Amount x Probability |
| Avg Days in Stage | Average time |

### Activity Metrics

**Visualization:** Table with sparklines

| Metric | Today | This Week | This Month | Trend |
|--------|-------|-----------|------------|-------|
| Calls Made | # | # | # | ↑↓ |
| Emails Sent | # | # | # | ↑↓ |
| Meetings Booked | # | # | # | ↑↓ |
| Consultations Completed | # | # | # | ↑↓ |
| Quotes Sent | # | # | # | ↑↓ |

### Sales Rep Leaderboard

**Visualization:** Table sorted by performance

| Rep | Deals Won | Revenue | Pipeline Value | Win Rate |
|-----|-----------|---------|----------------|----------|
| Rep A | # | $ | $ | % |
| Rep B | # | $ | $ | % |
| Rep C | # | $ | $ | % |

### Lead Response Time

**Visualization:** Gauge or single metric

| Metric | Target | Actual |
|--------|--------|--------|
| Avg First Response Time | < 4 hours | X hours |
| % Contacted < 24 hours | 90% | X% |
| % Contacted < 1 hour | 50% | X% |

---

## Marketing Dashboard

### Dashboard Name: Marketing Performance

**Audience:** Marketing Team, Leadership

**Refresh Frequency:** Daily

### Lead Generation Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| Leads Created (MTD) | New contacts this month | 100/month |
| MQLs Created (MTD) | Marketing Qualified Leads | 50/month |
| Lead to MQL Rate | MQL / Total Leads | 50% |
| Cost per Lead | Ad Spend / Leads | < $50 |
| Cost per MQL | Ad Spend / MQLs | < $100 |

### Lead Source Analysis

**Visualization:** Pie chart + table

| Source | Leads | MQLs | Customers | Revenue | ROI |
|--------|-------|------|-----------|---------|-----|
| Organic Search | # | # | # | $ | %|
| Google Ads | # | # | # | $ | % |
| Facebook Ads | # | # | # | $ | % |
| Referrals | # | # | # | $ | % |
| Direct | # | # | # | $ | % |
| Other | # | # | # | $ | % |

### Website Performance

| Metric | This Month | Last Month | YoY |
|--------|------------|------------|-----|
| Website Visits | # | # | % |
| Form Submissions | # | # | % |
| Form Conversion Rate | % | % | pp |
| Landing Page Views | # | # | % |

### Email Performance

| Metric | This Month | Benchmark |
|--------|------------|-----------|
| Emails Sent | # | - |
| Open Rate | % | 20% |
| Click Rate | % | 3% |
| Unsubscribe Rate | % | < 0.5% |

### Campaign Performance Table

| Campaign | Leads | MQLs | Customers | Spend | Revenue | ROI |
|----------|-------|------|-----------|-------|---------|-----|
| Spring 2024 | # | # | # | $ | $ | % |
| Google - Inground | # | # | # | $ | $ | % |
| FB - Awareness | # | # | # | $ | $ | % |

### Attribution Report

**First Touch vs Last Touch vs Multi-Touch**

| Channel | First Touch Revenue | Last Touch Revenue | Multi-Touch Credit |
|---------|---------------------|-------------------|-------------------|
| Organic | $ | $ | $ |
| Paid Search | $ | $ | $ |
| Social | $ | $ | $ |
| Referral | $ | $ | $ |
| Direct | $ | $ | $ |

---

## Service Dashboard

### Dashboard Name: Service & Installation

**Audience:** Service Team, Operations Manager

**Refresh Frequency:** Real-time

### Active Projects Overview

| Metric | Count | Value |
|--------|-------|-------|
| Projects in Pipeline | # | $ |
| In Permitting | # | - |
| Scheduled This Month | # | - |
| Active Installations | # | - |
| Awaiting Inspection | # | - |

### Project Status Tracker

**Visualization:** Kanban or table

| Project | Customer | Stage | Start Date | Days in Stage | Status |
|---------|----------|-------|------------|---------------|--------|
| Pool A | Smith | Installation | MM/DD | # | On Track |
| Pool B | Jones | Permitting | MM/DD | # | Delayed |
| Pool C | Brown | Scheduling | MM/DD | # | On Track |

### Schedule Calendar

**Visualization:** Calendar view

- Show installation start dates
- Show inspection dates
- Show delivery dates
- Color code by status (on track/delayed/complete)

### Service Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Avg Days: Sale to Install Start | 60 days | # days |
| Avg Days: Permit Approval | 21 days | # days |
| Avg Days: Installation Duration | 14 days | # days |
| On-Time Completion Rate | 90% | % |
| Customer Satisfaction (Install) | 4.5/5 | #/5 |

### Warranty & Service Calls

| Metric | This Month | YTD |
|--------|------------|-----|
| Warranty Claims | # | # |
| Service Calls | # | # |
| Avg Resolution Time | # days | # days |
| Repeat Issues | # | # |

---

## Executive Summary Dashboard

### Dashboard Name: Executive Overview

**Audience:** Business Owner, Leadership

**Refresh Frequency:** Daily

### Revenue Metrics

| Metric | MTD | Target | YTD | Annual Target |
|--------|-----|--------|-----|---------------|
| Revenue (Closed) | $ | $ | $ | $ |
| Pipeline Value | $ | - | - | - |
| Weighted Pipeline | $ | - | - | - |
| Avg Deal Size | $ | $ | $ | $ |

### Key Performance Indicators

**Visualization:** KPI cards with trend arrows

| KPI | Current | Previous Period | Trend |
|-----|---------|-----------------|-------|
| Win Rate | % | % | ↑↓ |
| Lead Conversion | % | % | ↑↓ |
| Customer Acquisition Cost | $ | $ | ↑↓ |
| Customer Lifetime Value | $ | $ | ↑↓ |

### Revenue Trend

**Visualization:** Line chart

- Monthly revenue (current year)
- Monthly revenue (previous year)
- Monthly target line
- Cumulative YTD line

### Pipeline Health

**Visualization:** Stacked bar or funnel

| Category | Value |
|----------|-------|
| Hot Deals (80%+ probability) | $ |
| Warm Deals (50-79%) | $ |
| Cool Deals (20-49%) | $ |
| Cold Deals (<20%) | $ |

### Team Performance Summary

| Team Member | Revenue Won | Win Rate | Deals | Pipeline |
|-------------|-------------|----------|-------|----------|
| Rep A | $ | % | # | $ |
| Rep B | $ | % | # | $ |
| Rep C | $ | % | # | $ |
| **Total** | $ | % | # | $ |

### Lead Source ROI

**Visualization:** Horizontal bar chart

| Source | Revenue | Spend | ROI |
|--------|---------|-------|-----|
| Referrals | $ | $ | % |
| Organic | $ | $ | % |
| Google Ads | $ | $ | % |
| Facebook | $ | $ | % |

### Customer Health

| Metric | Current | Trend |
|--------|---------|-------|
| Net Promoter Score | # | ↑↓ |
| Review Rating (Avg) | #.# | ↑↓ |
| Repeat Customer Rate | % | ↑↓ |
| Referral Rate | % | ↑↓ |

---

## Report Templates

### Weekly Sales Report

**Sent:** Every Monday 8 AM

**Recipients:** Sales Team, Sales Manager

**Contents:**
1. Last week summary
   - Deals won/lost
   - Revenue
   - Activities completed
2. Pipeline changes
   - New deals added
   - Deals advanced
   - Deals stalled
3. This week priorities
   - Deals to close
   - Follow-ups due
   - Consultations scheduled
4. Rep performance comparison

---

### Monthly Business Review

**Sent:** First Monday of month

**Recipients:** Leadership Team

**Contents:**
1. Executive summary
2. Revenue vs target
3. Lead generation performance
4. Sales team performance
5. Pipeline analysis
6. Service/installation status
7. Customer satisfaction
8. Recommendations

---

### Quarterly Pipeline Review

**Sent:** After quarter end

**Recipients:** All Team Members

**Contents:**
1. Quarterly results vs goals
2. Win/loss analysis
3. Lead source effectiveness
4. Seasonal trends
5. Competitive analysis
6. Process improvements
7. Next quarter goals

---

## Report Scheduling

### Daily Reports

| Report | Time | Recipients |
|--------|------|------------|
| New Leads Summary | 8 AM | Sales Team |
| Pipeline Snapshot | 8 AM | Sales Manager |
| Overdue Tasks | 8 AM | All Users |

### Weekly Reports

| Report | Day/Time | Recipients |
|--------|----------|------------|
| Sales Activity Report | Mon 8 AM | Sales Team |
| Marketing Performance | Mon 9 AM | Marketing |
| Pipeline Review | Mon 8 AM | Leadership |

### Monthly Reports

| Report | Day | Recipients |
|--------|-----|------------|
| Monthly Business Review | 1st Mon | Leadership |
| Lead Source Analysis | 1st Mon | Marketing |
| Customer Satisfaction | 1st Mon | All |
| Revenue Report | 1st Mon | Leadership |

### Quarterly Reports

| Report | When | Recipients |
|--------|------|------------|
| Quarterly Business Review | After Q end | All |
| ROI Analysis | After Q end | Leadership |
| Goal Review | After Q end | All |

---

## Custom Report Builder

### Report Types Available

1. **Contact Reports**
   - Contacts by lifecycle stage
   - Contacts by lead source
   - Contacts by owner
   - Contacts created over time

2. **Deal Reports**
   - Deals by stage
   - Deals by owner
   - Deals by close date
   - Won/lost analysis
   - Revenue reports

3. **Activity Reports**
   - Calls logged
   - Emails sent
   - Meetings scheduled
   - Tasks completed

4. **Campaign Reports**
   - Email performance
   - Form submissions
   - Campaign conversions

### Building Custom Reports

**Steps:**
1. Navigate to Reports > Create Report
2. Select data source (Contacts, Deals, Activities)
3. Add filters
4. Select visualization type
5. Add to dashboard or schedule

**Best Practices:**
- Keep reports focused on single metrics
- Use clear naming conventions
- Add descriptions for future reference
- Set appropriate access permissions

---

## Data Visualization Best Practices

### Chart Type Selection

| Data Type | Recommended Chart |
|-----------|-------------------|
| Trends over time | Line chart |
| Part of whole | Pie/donut chart |
| Comparison | Bar chart |
| Relationship | Scatter plot |
| Distribution | Histogram |
| Progress | Gauge |
| Single KPI | Number card |
| Ranking | Horizontal bar |
| Pipeline | Funnel |

### Color Coding

| Status | Color |
|--------|-------|
| Positive/Good | Green |
| Warning/Caution | Yellow/Orange |
| Negative/Bad | Red |
| Neutral | Blue/Gray |

### Dashboard Layout

**Principles:**
- Most important metrics at top
- Related metrics grouped together
- Consistent sizing and spacing
- Clear labels and titles
- Mobile-responsive design

---

## Data Quality Metrics

### Monitor These Metrics

| Metric | Target | Action if Below |
|--------|--------|-----------------|
| Contacts with Email | 95% | Review intake process |
| Contacts with Phone | 85% | Require at form |
| Deals with Amount | 100% | Make required field |
| Deals with Close Date | 100% | Make required field |
| Contacts with Source | 95% | Check form integration |

### Data Audit Dashboard

| Metric | Current | Action Needed |
|--------|---------|---------------|
| Duplicate Contacts | # | Weekly cleanup |
| Missing Required Fields | # | Contact owners |
| Stale Deals (60+ days) | # | Review and update |
| Contacts without Owner | # | Assign |
