# Uptime Monitoring Setup Guide

## Tri-State Aquatic Solutions Website Monitoring

**Last Updated:** February 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Recommended Monitoring Tools](#recommended-monitoring-tools)
3. [Endpoints to Monitor](#endpoints-to-monitor)
4. [Alert Configuration](#alert-configuration)
5. [Status Page Setup](#status-page-setup)
6. [Incident Response Process](#incident-response-process)
7. [Maintenance Windows](#maintenance-windows)

---

## Overview

Uptime monitoring ensures the Tri-State Aquatic Solutions website remains available and performant. This guide covers setup, configuration, and incident response procedures.

### Key Metrics to Monitor

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Uptime | 99.9% | < 99.5% |
| Response Time | < 500ms | > 2000ms |
| SSL Certificate | Valid | < 14 days to expiry |
| DNS Resolution | < 50ms | > 500ms |

---

## Recommended Monitoring Tools

### Primary: UptimeRobot (Free Tier)

**Best for:** Small business websites with basic monitoring needs

**Features:**
- 50 monitors free
- 5-minute check intervals
- Email/SMS alerts
- Public status page
- SSL monitoring

**Setup:**
1. Create account at [uptimerobot.com](https://uptimerobot.com)
2. Add monitors for key endpoints (see below)
3. Configure alert contacts
4. Create public status page

### Alternative: Freshping (Free)

**Best for:** Teams wanting integrations with Freshdesk/Freshworks

**Features:**
- 50 monitors free
- 1-minute check intervals
- Multi-location checks
- Slack/Teams integration
- Public status page

**Setup:**
1. Create account at [freshping.io](https://freshping.io)
2. Add team members
3. Configure monitors and alerts

### Alternative: Uptime.com (Paid - More Features)

**Best for:** Growing businesses needing detailed analytics

**Features:**
- Real User Monitoring (RUM)
- API monitoring
- Transaction monitoring
- Detailed reporting
- SLA tracking

**Pricing:** Starting at $20/month

### Alternative: Better Uptime (Paid with Free Tier)

**Best for:** Teams wanting on-call scheduling

**Features:**
- Incident management
- On-call scheduling
- Status pages
- Integrations (PagerDuty, Slack, etc.)

**Pricing:** Free tier available, paid starts at $20/month

### DIY Option: Self-Hosted Monitoring

**Tools:**
- **Uptime Kuma** - Self-hosted, open source
- **Statping** - Self-hosted with status page
- **Prometheus + Grafana** - For advanced needs

---

## Endpoints to Monitor

### Critical Endpoints (Monitor Every 1-5 Minutes)

| Endpoint | Type | Check | Alert Threshold |
|----------|------|-------|-----------------|
| `https://tristateaquaticsolutions.com` | HTTP(S) | Keyword: "Tri-State" | Immediate |
| `https://tristateaquaticsolutions.com/contact` | HTTP(S) | Status 200 | 2 failures |
| `https://tristateaquaticsolutions.com/pools` | HTTP(S) | Status 200 | 2 failures |
| `tristateaquaticsolutions.com` | SSL | Certificate validity | 14 days |
| `tristateaquaticsolutions.com` | DNS | Resolution check | Immediate |

### Important Endpoints (Monitor Every 5-15 Minutes)

| Endpoint | Type | Check |
|----------|------|-------|
| `/tools/pool-calculator` | HTTP(S) | Status 200 |
| `/tools/financing-calculator` | HTTP(S) | Status 200 |
| `/blog` | HTTP(S) | Status 200 |
| `/faq` | HTTP(S) | Status 200 |
| `/services/weekly-maintenance` | HTTP(S) | Status 200 |
| `/services/pool-opening` | HTTP(S) | Status 200 |
| `/locations/delaware` | HTTP(S) | Status 200 |
| `/locations/pennsylvania` | HTTP(S) | Status 200 |

### SEO/Performance Endpoints (Monitor Daily)

| Endpoint | Type | Check |
|----------|------|-------|
| `/sitemap.xml` | HTTP(S) | Status 200, Valid XML |
| `/robots.txt` | HTTP(S) | Status 200 |
| `/.well-known/` | HTTP(S) | Accessible |

### Monitor Configuration Example (UptimeRobot)

```
Monitor 1: Homepage
  URL: https://tristateaquaticsolutions.com
  Type: HTTP(s)
  Interval: 5 minutes
  Timeout: 30 seconds
  Keyword: "Tri-State Aquatic"
  Keyword Type: Exists

Monitor 2: Contact Form
  URL: https://tristateaquaticsolutions.com/contact
  Type: HTTP(s)
  Interval: 5 minutes
  HTTP Method: GET
  Expected Status: 200

Monitor 3: SSL Certificate
  URL: https://tristateaquaticsolutions.com
  Type: SSL
  Interval: 1 day
  Alert: 14 days before expiry
```

---

## Alert Configuration

### Alert Contacts Priority

| Priority | Contact Method | Recipient | When |
|----------|----------------|-----------|------|
| P1 (Critical) | SMS + Email | Primary Owner | Immediate |
| P1 (Critical) | Push Notification | Primary Owner | Immediate |
| P2 (High) | Email | Primary Owner | 5 min delay |
| P3 (Medium) | Email | Team Distribution | 15 min delay |

### Alert Rules

**Homepage Down:**
```
Trigger: Homepage returns non-200 OR keyword missing
Wait: 1 check (confirm not transient)
Alert: P1 - SMS + Email immediately
Escalate: If not acknowledged in 15 min, call phone
```

**Contact Page Down:**
```
Trigger: Contact page returns non-200
Wait: 2 checks (10 minutes)
Alert: P1 - SMS + Email
Reason: Lost leads = lost revenue
```

**SSL Certificate Expiring:**
```
Trigger: SSL expires in < 14 days
Alert: P2 - Email
Action: Renew certificate immediately
```

**Response Time Degradation:**
```
Trigger: Response time > 2000ms for 3 checks
Alert: P2 - Email
Action: Investigate performance issues
```

### Alert Message Templates

**SMS Alert:**
```
[TSAS ALERT] Website DOWN
tristateaquaticsolutions.com
Time: {timestamp}
Check: {monitor_name}
Reply STOP to unsubscribe
```

**Email Alert:**
```
Subject: [URGENT] Tri-State Aquatic Solutions Website Alert - {monitor_name}

Status: {status}
URL: {url}
Time: {timestamp}
Duration: {downtime_duration}

Error Details:
{error_details}

Check the status page: {status_page_url}

---
This is an automated message from UptimeRobot.
```

---

## Status Page Setup

### Public Status Page Configuration

**URL:** `status.tristateaquaticsolutions.com` (or use hosted URL)

**Components to Display:**

1. **Website**
   - Homepage
   - Contact Form
   - Pool Calculator
   - Blog

2. **Services**
   - Form Submissions
   - Email System

3. **Infrastructure**
   - DNS
   - SSL Certificate

### Status Levels

| Status | Color | Description |
|--------|-------|-------------|
| Operational | Green | All systems functioning normally |
| Degraded Performance | Yellow | Slow response times but functional |
| Partial Outage | Orange | Some features unavailable |
| Major Outage | Red | Site completely unavailable |
| Under Maintenance | Blue | Planned maintenance window |

### Status Page Content Templates

**Incident (Initial):**
```
Title: Website Performance Issues
Status: Investigating
Time: {timestamp}

We are currently investigating reports of slow website performance.
Our team has been alerted and is working to identify the cause.

Updates will be posted here.
```

**Incident (Identified):**
```
Title: Website Performance Issues
Status: Identified
Time: {timestamp}

The issue has been identified as {root_cause}.
Our team is implementing a fix.

Estimated resolution: {ETA}
```

**Incident (Resolved):**
```
Title: Website Performance Issues
Status: Resolved
Time: {timestamp}

The issue has been resolved. Website performance has returned to normal.

Root Cause: {root_cause}
Resolution: {resolution}

We apologize for any inconvenience.
```

---

## Incident Response Process

### Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| SEV-1 | Complete outage | < 15 min | Homepage down, forms broken |
| SEV-2 | Partial outage | < 1 hour | Calculator not working |
| SEV-3 | Degraded service | < 4 hours | Slow load times |
| SEV-4 | Minor issue | Next business day | Typos, minor bugs |

### Response Workflow

```
1. ALERT RECEIVED
   |
   v
2. ACKNOWLEDGE (within 5 min)
   - Confirm receipt
   - Initial assessment
   |
   v
3. INVESTIGATE (within 15 min)
   - Check Vercel dashboard
   - Check DNS settings
   - Check recent deployments
   - Review error logs
   |
   v
4. IDENTIFY ROOT CAUSE
   - Document findings
   - Update status page
   |
   v
5. IMPLEMENT FIX
   - Apply resolution
   - Test functionality
   |
   v
6. VERIFY & MONITOR
   - Confirm all monitors green
   - Watch for 30 minutes
   |
   v
7. POST-INCIDENT
   - Update status page (resolved)
   - Document in incident log
   - Schedule post-mortem if needed
```

### Quick Diagnosis Checklist

**Website Completely Down:**
- [ ] Check Vercel status: https://www.vercel-status.com/
- [ ] Check domain DNS: `dig tristateaquaticsolutions.com`
- [ ] Check SSL: `curl -I https://tristateaquaticsolutions.com`
- [ ] Check from multiple locations (use downfor.io)
- [ ] Review recent deployments in Vercel

**Slow Performance:**
- [ ] Check Vercel analytics
- [ ] Test from Google PageSpeed Insights
- [ ] Check for large images/assets
- [ ] Review any recent code changes
- [ ] Check third-party script performance

**Forms Not Working:**
- [ ] Test form submission manually
- [ ] Check form endpoint (Formspree, etc.)
- [ ] Review browser console for errors
- [ ] Check email delivery

### Escalation Path

```
Level 1 (0-15 min): Primary site owner
  |
  v (no response)
Level 2 (15-30 min): Secondary contact
  |
  v (issue persists)
Level 3 (30-60 min): Hosting provider support
  |
  v (critical business impact)
Level 4 (1+ hour): External consultant/agency
```

---

## Maintenance Windows

### Scheduled Maintenance

**Preferred Times:**
- Tuesday - Thursday
- 2:00 AM - 5:00 AM ET
- Avoid: Weekends, holidays, peak hours (9 AM - 9 PM)

**Maintenance Notification Template:**
```
Subject: Scheduled Maintenance - tristateaquaticsolutions.com

We will be performing scheduled maintenance on our website.

Date: {date}
Time: {start_time} - {end_time} ET
Expected Duration: {duration}

What to expect:
- Brief periods of unavailability (< 5 minutes)
- No data will be lost

Questions? Contact us at {email}
```

### Pre-Maintenance Checklist

- [ ] Announce maintenance 24-48 hours in advance
- [ ] Update status page to "Scheduled Maintenance"
- [ ] Pause alerting for affected monitors
- [ ] Backup current deployment
- [ ] Have rollback plan ready

### Post-Maintenance Checklist

- [ ] Verify all monitors are green
- [ ] Test critical functionality manually
- [ ] Resume alerting
- [ ] Update status page to "Operational"
- [ ] Send completion notification

---

## Monitoring Dashboard Setup

### Key Metrics Dashboard (Google Data Studio / Looker)

**Data Sources:**
- UptimeRobot API
- Google Analytics
- Google Search Console
- Vercel Analytics

**Widgets:**
1. Uptime percentage (30 days)
2. Average response time trend
3. Incidents this month
4. Current status of all monitors
5. Performance scores (Core Web Vitals)

### Weekly Report Template

```
Tri-State Aquatic Solutions - Weekly Uptime Report
Week of: {date_range}

SUMMARY
-------
Uptime: {percentage}%
Average Response Time: {avg_response}ms
Incidents: {incident_count}
Total Downtime: {downtime_minutes} minutes

INCIDENTS
---------
{for each incident}
- {date}: {description} ({duration})
{end for}

RECOMMENDATIONS
---------------
{based on data}

---
Generated by Uptime Monitoring System
```

---

## Quick Reference

### Important URLs

| Resource | URL |
|----------|-----|
| Website | https://tristateaquaticsolutions.com |
| Status Page | https://status.tristateaquaticsolutions.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| UptimeRobot | https://uptimerobot.com/dashboard |
| Domain Registrar | [Your registrar] |

### Emergency Contacts

| Role | Name | Phone | Email |
|------|------|-------|-------|
| Primary Owner | [Name] | [Phone] | [Email] |
| Technical Contact | [Name] | [Phone] | [Email] |
| Hosting (Vercel) | Support | N/A | support@vercel.com |

### Quick Commands

```bash
# Check if site is up
curl -I https://tristateaquaticsolutions.com

# Check DNS
dig tristateaquaticsolutions.com

# Check SSL certificate
openssl s_client -connect tristateaquaticsolutions.com:443 -servername tristateaquaticsolutions.com

# Check from command line
wget --spider https://tristateaquaticsolutions.com
```
