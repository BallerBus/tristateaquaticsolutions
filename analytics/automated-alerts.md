# Automated Analytics Alerts Setup Guide

## Tri-State Aquatic Solutions - Alert Configuration

---

## Overview

This document outlines the setup and configuration of automated alerts for monitoring website performance, traffic anomalies, and conversion metrics. Alerts enable proactive response to issues and opportunities.

---

## GA4 Custom Alerts Setup

### Accessing Custom Insights in GA4

1. Navigate to Google Analytics 4 property
2. Go to **Reports** → **Insights** (bottom of left sidebar)
3. Click **Create** to build custom insights
4. Configure alert conditions and notifications

### Alert Categories

| Category | Purpose | Urgency |
|----------|---------|---------|
| Traffic Alerts | Monitor traffic volume changes | Medium-High |
| Conversion Alerts | Track conversion rate changes | High |
| Error Alerts | Detect site issues | Critical |
| Goal Alerts | Monitor goal completions | Medium |
| Acquisition Alerts | Track source changes | Medium |

---

## Traffic Drop Alerts

### Alert 1: Significant Daily Traffic Drop

**Configuration:**
```yaml
Name: Daily Traffic Drop Alert
Condition: Sessions decreased by more than 30% compared to same day last week
Evaluation Frequency: Daily
Threshold: -30%
Comparison: Same day previous week

Notification:
  Email: [marketing@tristateaquaticsolutions.com]
  Frequency: Immediate
```

**Setup Steps (GA4):**
1. Go to Insights → Create
2. Select "Create custom insight"
3. Name: "Daily Traffic Drop Alert"
4. Metric: Sessions
5. Condition: "Decreases by more than"
6. Value: 30%
7. Compared to: Same day last week
8. Add email recipients

### Alert 2: Weekly Traffic Decline

**Configuration:**
```yaml
Name: Weekly Traffic Decline Alert
Condition: Sessions decreased by more than 20% compared to previous week
Evaluation Frequency: Weekly (Monday)
Threshold: -20%
Comparison: Previous 7 days

Notification:
  Email: [marketing@tristateaquaticsolutions.com]
  Frequency: Weekly summary
```

### Alert 3: Organic Traffic Drop

**Configuration:**
```yaml
Name: Organic Traffic Drop Alert
Condition: Organic sessions decreased by more than 25%
Segment: Traffic source = organic
Evaluation Frequency: Daily
Threshold: -25%
Comparison: Same day previous week

Priority: High
Notification:
  Email: [seo@tristateaquaticsolutions.com]
  Slack: #seo-alerts (if configured)
```

### Alert 4: Mobile Traffic Anomaly

**Configuration:**
```yaml
Name: Mobile Traffic Anomaly
Condition: Mobile sessions deviate by more than 40%
Segment: Device = mobile
Evaluation Frequency: Daily
Threshold: +/- 40%

Possible Causes to Check:
  - Mobile site issues
  - Core Web Vitals problems
  - Google mobile update
```

### Alert 5: Geographic Traffic Shift

**Configuration:**
```yaml
Name: Service Area Traffic Change
Condition: Sessions from target geographic areas changed by more than 35%
Segment: Geographic location = [service area]
Evaluation Frequency: Weekly
Threshold: +/- 35%
```

---

## Conversion Rate Change Alerts

### Alert 6: Conversion Rate Drop

**Configuration:**
```yaml
Name: Conversion Rate Drop Alert
Condition: Overall conversion rate decreased by more than 20%
Evaluation Frequency: Daily
Threshold: -20%
Comparison: Previous 7-day average

Priority: Critical
Notification:
  Email:
    - [marketing@tristateaquaticsolutions.com]
    - [owner@tristateaquaticsolutions.com]
  SMS: [optional - for critical alerts]
```

**Response Checklist:**
- [ ] Check website functionality
- [ ] Verify forms are working
- [ ] Check phone tracking
- [ ] Review recent site changes
- [ ] Check competitor activity

### Alert 7: Form Submission Drop

**Configuration:**
```yaml
Name: Form Submission Alert
Condition: Form submissions decreased by more than 30%
Event: form_submit
Evaluation Frequency: Daily
Threshold: -30%
Comparison: Same day last week

Priority: High
```

### Alert 8: Phone Call Volume Change

**Configuration:**
```yaml
Name: Phone Call Alert
Condition: Phone call events changed by more than 25%
Event: phone_call / click_to_call
Evaluation Frequency: Daily
Threshold: +/- 25%

Note: Also configure in CallRail if using their service
```

### Alert 9: Quote Request Anomaly

**Configuration:**
```yaml
Name: Quote Request Alert
Condition: Quote form submissions changed significantly
Event: quote_request
Evaluation Frequency: Daily
Threshold: +/- 30%
Comparison: Previous 7-day average

Priority: High
```

### Alert 10: Conversion Rate by Source

**Configuration:**
```yaml
Name: Organic Conversion Rate Alert
Condition: Organic conversion rate decreased by more than 15%
Segment: Session source = organic
Evaluation Frequency: Weekly
Threshold: -15%

Additional Alerts:
  - Paid conversion rate change (threshold: +/- 20%)
  - Direct conversion rate change (threshold: +/- 25%)
```

---

## Error Spike Alerts

### Alert 11: 404 Error Spike

**Configuration:**
```yaml
Name: 404 Error Alert
Condition: Page not found errors increased significantly
Event: page_view with page_title containing "404"
Evaluation Frequency: Daily
Threshold: More than 50 daily occurrences or 100% increase

Priority: High

Response Actions:
  1. Identify broken URLs
  2. Set up redirects
  3. Fix internal links
  4. Submit updated sitemap
```

### Alert 12: JavaScript Error Spike

**Configuration:**
```yaml
Name: JavaScript Error Alert
Condition: JS errors increased significantly
Event: exception (if tracked)
Evaluation Frequency: Daily
Threshold: 100% increase or more than 100 daily

Priority: Critical

Response Actions:
  1. Check browser console
  2. Review recent code deployments
  3. Test across browsers
  4. Check third-party scripts
```

### Alert 13: Server Response Time

**Configuration:**
```yaml
Name: Slow Server Response Alert
Condition: Server response time exceeds threshold
Metric: Average server response time
Evaluation Frequency: Hourly (if available)
Threshold: > 2 seconds

Priority: High

Note: May need server-side monitoring tool (Pingdom, UptimeRobot)
```

### Alert 14: Page Load Time Degradation

**Configuration:**
```yaml
Name: Page Speed Alert
Condition: Average page load time increased significantly
Metric: Page load time
Evaluation Frequency: Daily
Threshold: > 4 seconds or 50% increase

Sources:
  - GA4 site speed metrics
  - Google PageSpeed Insights API
  - Lighthouse monitoring
```

### Alert 15: Bounce Rate Spike

**Configuration:**
```yaml
Name: Bounce Rate Alert
Condition: Bounce rate increased significantly
Metric: Bounce rate
Evaluation Frequency: Daily
Threshold: +15% from baseline

Segment Variants:
  - Overall bounce rate
  - Mobile bounce rate
  - Landing page specific
  - Source specific
```

---

## Goal Completion Alerts

### Alert 16: Daily Goal Achievement

**Configuration:**
```yaml
Name: Daily Lead Goal Alert
Condition: Daily leads fall below target
Metric: Total conversions
Evaluation Frequency: Daily (end of day)
Threshold: Less than [daily goal number]

Example:
  Daily Lead Goal: 5 leads
  Alert if: Less than 3 leads by 6 PM
```

### Alert 17: Goal Completion Celebration

**Configuration:**
```yaml
Name: Goal Achievement Alert
Condition: Daily/Weekly goal exceeded
Metric: Total conversions
Evaluation Frequency: Daily
Threshold: More than [150% of goal]

Purpose: Positive reinforcement and trend identification
```

### Alert 18: No Conversions Alert

**Configuration:**
```yaml
Name: Zero Conversions Alert
Condition: No conversions recorded in time period
Metric: Total conversions
Evaluation Frequency: Every 12 hours
Threshold: 0 conversions

Priority: Critical

Possible Causes:
  - Form broken
  - Phone tracking issue
  - Website down
  - Tracking code removed
```

### Alert 19: Conversion Milestone

**Configuration:**
```yaml
Name: Monthly Goal Progress Alert
Condition: Percentage of monthly goal reached
Metric: Cumulative monthly conversions
Evaluation Frequency: Weekly
Thresholds:
  - 25% at week 1 (on track)
  - 50% at week 2 (on track)
  - 75% at week 3 (on track)
  - 100% at month end (achieved)
```

### Alert 20: High-Value Conversion Alert

**Configuration:**
```yaml
Name: Commercial Lead Alert
Condition: Commercial/high-value form submitted
Event: quote_request with service_type = "commercial"
Evaluation Frequency: Real-time
Threshold: Any occurrence

Priority: Immediate

Purpose: Fast follow-up on high-value opportunities
```

---

## Acquisition Alerts

### Alert 21: New Referral Source

**Configuration:**
```yaml
Name: New Referral Traffic Alert
Condition: New referral source detected with significant traffic
Dimension: Session source (referral medium only)
Evaluation Frequency: Daily
Threshold: New source with > 10 sessions

Purpose: Identify new partnership/mention opportunities
```

### Alert 22: Paid Campaign Performance

**Configuration:**
```yaml
Name: Paid Campaign Alert
Condition: CPA exceeds threshold or conversions drop
Metrics:
  - Cost per conversion > [threshold]
  - Campaign conversions < [expected]
Evaluation Frequency: Daily
Threshold: CPA > $75 or conversions drop > 40%

Priority: High
```

### Alert 23: Google Business Profile Change

**Configuration:**
```yaml
Name: GBP Traffic Alert
Condition: Google Business Profile traffic changed significantly
Dimension: Session source = "google" AND medium = "organic"
          AND landing page = specific service area pages
Evaluation Frequency: Weekly
Threshold: +/- 30%
```

---

## Email Notification Setup

### Email Configuration

#### Primary Alert Recipients

| Alert Type | Recipients | Frequency |
|------------|------------|-----------|
| Critical (Errors, Zero Conversions) | Owner, Marketing Lead | Immediate |
| High (Conversion Drops, Traffic Drops) | Marketing Team | Immediate |
| Medium (Weekly Changes, Trends) | Marketing Team | Daily Digest |
| Low (Informational, Milestones) | Marketing Team | Weekly Summary |

#### Email Template Structure

```
Subject: [ALERT TYPE] - Tri-State Aquatic Solutions - [Alert Name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ALERT: [Alert Name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY:
[Metric] changed by [X%] compared to [comparison period]

Current Value: [Current]
Previous Value: [Previous]
Change: [+/- X%]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDED ACTIONS:
1. [Action 1]
2. [Action 2]
3. [Action 3]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VIEW DETAILS:
[Link to GA4 report]
[Link to dashboard]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Alert triggered: [Timestamp]
Next check: [Next evaluation time]

This is an automated alert from Tri-State Aquatic Solutions Analytics
```

### GA4 Email Alert Setup

1. **Enable Email Notifications:**
   - GA4 → Admin → Property Settings → Data Collection → Insights
   - Enable email notifications

2. **Configure Recipients:**
   - Add email addresses for each alert
   - Set notification frequency (immediate, daily, weekly)

3. **Test Alerts:**
   - Create test conditions
   - Verify emails are received
   - Check spam folders

### Slack Integration (Optional)

```yaml
Slack Webhook Setup:
  1. Create Slack app at api.slack.com
  2. Enable Incoming Webhooks
  3. Create webhook for #marketing-alerts channel
  4. Configure GA4 or use Zapier to connect

Alert Channels:
  - #critical-alerts (immediate, errors only)
  - #marketing-alerts (all marketing alerts)
  - #seo-alerts (organic-specific alerts)
  - #leads-channel (new lead notifications)
```

---

## Third-Party Alert Tools

### Recommended Monitoring Tools

| Tool | Purpose | Cost | Setup Difficulty |
|------|---------|------|------------------|
| Google Analytics 4 | Built-in insights | Free | Easy |
| Looker Studio | Custom alerts via reports | Free | Medium |
| Databox | Dashboard alerts | $72+/mo | Easy |
| Zapier | Cross-platform automation | $20+/mo | Medium |
| UptimeRobot | Uptime monitoring | Free-$7/mo | Easy |
| Pingdom | Performance monitoring | $15+/mo | Easy |
| Screaming Frog | SEO monitoring | $209/year | Medium |
| SE Ranking | Ranking alerts | $39+/mo | Easy |

### UptimeRobot Setup

```yaml
Monitor Type: HTTP(s)
URL: https://www.tristateaquaticsolutions.com
Monitoring Interval: 5 minutes
Alert Contacts:
  - Email: [owner email]
  - SMS: [owner phone]

Alert On:
  - Site down
  - SSL certificate expiry
  - Response time > 3 seconds
```

### CallRail Alert Configuration (If Using)

```yaml
Alert Types:
  1. Missed Call Alert
     - Notify when call is missed
     - Immediate email notification

  2. Call Volume Change
     - Daily call summary
     - Alert if calls drop > 30%

  3. First-Time Caller
     - New lead notification
     - Include caller details

  4. High-Value Call Keywords
     - Alert on specific keywords mentioned
     - Examples: "commercial", "large project"
```

---

## Alert Response Procedures

### Critical Alert Response (< 1 hour)

```
1. ACKNOWLEDGE
   □ Confirm alert received
   □ Assign responder

2. DIAGNOSE
   □ Check website status
   □ Verify tracking is working
   □ Review recent changes

3. RESOLVE
   □ Implement fix
   □ Test fix
   □ Document solution

4. COMMUNICATE
   □ Update stakeholders
   □ Close alert
   □ Schedule post-mortem if needed
```

### High Alert Response (< 4 hours)

```
1. REVIEW
   □ Analyze alert data
   □ Identify scope of issue

2. INVESTIGATE
   □ Review related metrics
   □ Check for patterns
   □ Identify root cause

3. ACT
   □ Implement solution
   □ Monitor for improvement

4. DOCUMENT
   □ Record findings
   □ Update procedures if needed
```

### Medium Alert Response (< 24 hours)

```
1. ANALYZE
   □ Review trend data
   □ Compare to benchmarks

2. ASSESS
   □ Determine if action needed
   □ Prioritize against other work

3. PLAN
   □ Create action plan if needed
   □ Schedule implementation
```

---

## Alert Testing & Maintenance

### Monthly Alert Audit

| Check | Action | Frequency |
|-------|--------|-----------|
| Alert accuracy | Review triggered alerts vs actual issues | Monthly |
| Threshold calibration | Adjust thresholds based on seasonality | Quarterly |
| Recipient list | Verify all recipients are current | Monthly |
| Alert coverage | Identify gaps in monitoring | Quarterly |
| False positive rate | Reduce noise from unnecessary alerts | Monthly |

### Alert Testing Procedure

```yaml
Test Steps:
  1. Create test scenario that should trigger alert
  2. Wait for evaluation period
  3. Verify alert was triggered
  4. Confirm email received
  5. Test response procedure
  6. Document results

Testing Schedule:
  - New alerts: Test immediately after creation
  - Existing alerts: Test quarterly
  - After any GA4 changes: Re-test all alerts
```

### Seasonal Threshold Adjustments

| Season | Traffic Adjustment | Conversion Adjustment | Notes |
|--------|-------------------|----------------------|-------|
| Spring (Mar-May) | Baseline | Baseline | Pool opening season |
| Summer (Jun-Aug) | +30% expected | +20% expected | Peak season |
| Fall (Sep-Nov) | -10% expected | -10% expected | Pool closing season |
| Winter (Dec-Feb) | -40% expected | -30% expected | Off season |

---

## Alert Documentation

### Alert Log Template

| Date | Alert Name | Trigger Value | Response | Resolution | Time to Resolve |
|------|------------|---------------|----------|------------|-----------------|
| [Date] | [Name] | [Value] | [Actions taken] | [Outcome] | [Duration] |

### Alert Performance Review

**Monthly Review Questions:**
1. How many alerts were triggered?
2. How many were false positives?
3. What was average response time?
4. Were any issues missed that should have triggered alerts?
5. Do any thresholds need adjustment?

---

## Quick Reference Card

### Alert Priority Matrix

| Priority | Response Time | Examples |
|----------|---------------|----------|
| Critical | < 1 hour | Site down, zero conversions, form broken |
| High | < 4 hours | Conversion drop > 30%, traffic drop > 40% |
| Medium | < 24 hours | Weekly trends, goal progress |
| Low | Next business day | Milestones, new referral sources |

### Emergency Contacts

| Role | Name | Email | Phone |
|------|------|-------|-------|
| Owner | [Name] | [Email] | [Phone] |
| Marketing Lead | [Name] | [Email] | [Phone] |
| Web Developer | [Name] | [Email] | [Phone] |
| Hosting Support | [Provider] | [Email] | [Phone] |

### Quick Diagnostic Links

- GA4 Real-time: [Direct link]
- Website Status: [UptimeRobot link]
- PageSpeed Check: https://pagespeed.web.dev/
- Site Crawl: [Screaming Frog or similar]
- Hosting Status: [Hosting provider status page]

---

*Document Last Updated: [Date]*
*Next Review: [Date]*
*Owner: [Name/Role]*
