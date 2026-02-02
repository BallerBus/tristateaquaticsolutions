# Site Health Dashboard

## Tri-State Aquatic Solutions

**Last Updated:** February 2026

---

## Quick Status Overview

### Current Health Status

| Component | Status | Last Check |
|-----------|--------|------------|
| Website | Operational | [Auto-update] |
| Contact Form | Operational | [Auto-update] |
| Pool Calculator | Operational | [Auto-update] |
| SSL Certificate | Valid | [Expiry date] |
| Performance | Good | [Last audit] |

---

## Health Metrics to Track

### 1. Uptime & Availability

| Metric | Target | Yellow | Red |
|--------|--------|--------|-----|
| Uptime (monthly) | > 99.9% | 99.5% - 99.9% | < 99.5% |
| Response Time (avg) | < 500ms | 500ms - 1500ms | > 1500ms |
| Time to First Byte | < 200ms | 200ms - 600ms | > 600ms |
| Error Rate | < 0.1% | 0.1% - 1% | > 1% |

**Data Sources:**
- UptimeRobot / Freshping
- Vercel Analytics
- Google Analytics (Real-Time)

---

### 2. Performance (Core Web Vitals)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** (First Input Delay) | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | < 200ms | 200ms - 500ms | > 500ms |

**Data Sources:**
- Google Search Console (Core Web Vitals report)
- PageSpeed Insights
- Chrome User Experience Report

**Measurement Schedule:**
- Daily: Check Vercel Analytics
- Weekly: Run PageSpeed Insights audit
- Monthly: Review Search Console trends

---

### 3. SEO Health

| Metric | Target | Yellow | Red |
|--------|--------|--------|-----|
| Indexed Pages | 100% critical pages | 90-99% | < 90% |
| Crawl Errors | 0 | 1-5 | > 5 |
| Mobile Usability Issues | 0 | 1-3 | > 3 |
| Manual Actions | 0 | N/A | Any |
| Structured Data Errors | 0 | 1-5 | > 5 |

**Data Sources:**
- Google Search Console
- Bing Webmaster Tools
- Screaming Frog (monthly)

---

### 4. Security

| Metric | Target | Yellow | Red |
|--------|--------|--------|-----|
| SSL Certificate | Valid | < 30 days to expiry | < 14 days / Expired |
| Security Headers | A grade | B grade | C or below |
| Mixed Content | 0 issues | N/A | Any issues |
| Malware Detection | Clean | N/A | Any detection |

**Monitoring Tools:**
- SSL Labs (ssllabs.com)
- Security Headers (securityheaders.com)
- Google Safe Browsing Status

---

### 5. User Experience

| Metric | Target | Yellow | Red |
|--------|--------|--------|-----|
| Bounce Rate | < 50% | 50-70% | > 70% |
| Avg Session Duration | > 2 min | 1-2 min | < 1 min |
| Pages per Session | > 2 | 1.5-2 | < 1.5 |
| Form Completion Rate | > 30% | 15-30% | < 15% |
| Mobile Traffic Share | > 50% | 40-50% | < 40% (if unexpected) |

**Data Sources:**
- Google Analytics 4
- Hotjar / Microsoft Clarity (if installed)

---

### 6. Error Tracking

| Metric | Target | Yellow | Red |
|--------|--------|--------|-----|
| JS Errors (daily) | < 10 | 10-50 | > 50 |
| 404 Errors (daily) | < 5 | 5-20 | > 20 |
| Form Errors (daily) | 0 | 1-5 | > 5 |
| Network Errors (daily) | < 5 | 5-15 | > 15 |

**Data Sources:**
- Custom error tracking (error-tracking.js)
- GA4 error events
- Vercel logs

---

## Thresholds Summary

### Color-Coded Status Definitions

| Status | Color | Description | Action Required |
|--------|-------|-------------|-----------------|
| **Healthy** | Green | All metrics within target | Monitor normally |
| **Warning** | Yellow | Approaching threshold | Investigate within 24-48 hours |
| **Critical** | Red | Threshold exceeded | Immediate action required |
| **Unknown** | Gray | Data unavailable | Check monitoring setup |

---

## Dashboard Views

### Daily Check (5 minutes)

**Quick health pulse - check these every morning:**

1. **Uptime Status** - All monitors green?
2. **Error Count** - Any new errors overnight?
3. **Form Submissions** - Forms working?
4. **Traffic** - Normal traffic patterns?

**Quick Check Locations:**
- UptimeRobot Dashboard
- Vercel Analytics
- GA4 Real-Time Report

---

### Weekly Review (30 minutes)

**Deeper dive into performance and trends:**

| Check | What to Look For | Tool |
|-------|------------------|------|
| Performance Trend | Any degradation? | PageSpeed Insights |
| Error Patterns | Recurring issues? | Error Tracking |
| SEO Health | New crawl errors? | Search Console |
| User Behavior | Engagement changes? | GA4 |
| Form Performance | Completion rates? | GA4 + Form service |

**Weekly Report Template:**

```
Week of: [Date Range]

UPTIME
- Availability: [%]
- Incidents: [count]
- Total Downtime: [minutes]

PERFORMANCE
- Avg Response Time: [ms]
- LCP: [seconds]
- CLS: [score]

ENGAGEMENT
- Sessions: [number] ([%] vs last week)
- Bounce Rate: [%]
- Form Submissions: [number]

ISSUES
- New Errors: [count]
- 404s: [count]
- Action Items: [list]
```

---

### Monthly Review (2 hours)

**Comprehensive health audit:**

1. **Full Performance Audit**
   - Run Lighthouse on all key pages
   - Compare to previous month
   - Identify optimization opportunities

2. **SEO Audit**
   - Check all Search Console reports
   - Review keyword rankings
   - Scan for broken links

3. **Security Review**
   - SSL certificate status
   - Security headers check
   - Review access logs for anomalies

4. **Content Audit**
   - Identify underperforming pages
   - Check for outdated content
   - Review user feedback

5. **Technical Debt**
   - Review error backlog
   - Prioritize fixes
   - Plan improvements

---

## Escalation Procedures

### Escalation Matrix

| Severity | Condition | Response Time | Escalate To |
|----------|-----------|---------------|-------------|
| **Critical** | Site down, security breach | 15 minutes | Owner + Technical Lead |
| **High** | Major feature broken | 2 hours | Owner |
| **Medium** | Minor feature issue | 24 hours | Technical Lead |
| **Low** | Non-critical bug | 1 week | Backlog |

### Escalation Workflow

```
1. Issue Detected
   |
   v
2. Severity Assessment
   |
   +-- Critical? --> Immediate escalation + incident response
   |
   +-- High? --> Escalate within 2 hours if not resolved
   |
   +-- Medium/Low? --> Log and prioritize for regular sprint
```

### Contact Escalation Path

**Level 1: On-Call Owner**
- Receives all critical alerts
- 15-minute response expected
- Can implement quick fixes

**Level 2: Technical Support**
- Escalate if Level 1 unavailable
- For complex technical issues
- 30-minute response expected

**Level 3: External Support**
- Hosting provider (Vercel)
- Domain registrar
- Third-party service providers

---

## Recovery Playbooks

### Playbook 1: Website Down

**Symptoms:**
- All uptime monitors alerting
- Users report site unreachable

**Diagnosis Steps:**
```
1. Check Vercel status: vercel-status.com
2. Check DNS: dig tristateaquaticsolutions.com
3. Check from different network/location
4. Review recent deployments
5. Check domain registrar status
```

**Recovery Steps:**
```
1. If Vercel issue: Wait for their fix, monitor status
2. If DNS issue: Check domain settings, contact registrar
3. If deployment issue: Roll back to last good deployment
   - vercel rollback [deployment-url]
4. If unclear: Contact Vercel support
```

**Post-Recovery:**
- Verify all pages load
- Test critical functionality
- Update status page
- Document incident

---

### Playbook 2: Form Not Submitting

**Symptoms:**
- Form submissions not received
- Users reporting errors
- Conversion rate dropped

**Diagnosis Steps:**
```
1. Test form submission manually
2. Check browser console for errors
3. Check network tab for failed requests
4. Check Formspree/service dashboard
5. Check email spam folder
```

**Recovery Steps:**
```
1. If JS error: Fix and deploy
2. If service down: Wait or switch to backup
3. If email issue: Check SPF/DKIM, contact email provider
4. If rate limited: Contact service provider
```

**Temporary Workaround:**
- Display phone number prominently
- Enable backup form method
- Add chat widget if available

---

### Playbook 3: Slow Performance

**Symptoms:**
- Response time > 2 seconds
- High bounce rate
- User complaints

**Diagnosis Steps:**
```
1. Run PageSpeed Insights
2. Check Vercel analytics for slow functions
3. Identify largest resources
4. Check for third-party script issues
5. Review recent code changes
```

**Recovery Steps:**
```
1. If image issue: Optimize images, add lazy loading
2. If script issue: Defer non-critical scripts
3. If server issue: Check Vercel, consider upgrade
4. If third-party: Remove or replace slow scripts
```

**Quick Wins:**
```html
<!-- Defer non-critical scripts -->
<script defer src="non-critical.js"></script>

<!-- Lazy load images -->
<img loading="lazy" src="image.jpg" alt="...">

<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
```

---

### Playbook 4: SSL Certificate Issue

**Symptoms:**
- "Not Secure" warning
- Certificate error messages
- HTTPS not working

**Diagnosis Steps:**
```
1. Check SSL Labs: ssllabs.com/ssltest
2. Check certificate expiry
3. Verify domain matches certificate
4. Check for mixed content
```

**Recovery Steps:**
```
1. If expired: Vercel auto-renews, force refresh
2. If domain mismatch: Check DNS, redeploy
3. If mixed content: Fix HTTP resources to HTTPS
4. If Vercel issue: Contact support
```

**Vercel SSL Refresh:**
```bash
# Trigger SSL regeneration
vercel certs issue tristateaquaticsolutions.com
```

---

### Playbook 5: High Error Rate

**Symptoms:**
- Error tracking showing spike
- Multiple user complaints
- Broken functionality

**Diagnosis Steps:**
```
1. Review error tracking dashboard
2. Identify common error patterns
3. Check if related to specific page/feature
4. Review recent deployments
5. Test affected functionality
```

**Recovery Steps:**
```
1. Identify root cause from error logs
2. If deployment caused: Roll back
3. If data issue: Fix data or add validation
4. If external service: Check status, implement fallback
```

**Rollback Command:**
```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## Monitoring Setup Checklist

### Initial Setup

- [ ] UptimeRobot account created
- [ ] Homepage monitor configured
- [ ] Contact page monitor configured
- [ ] SSL monitor configured
- [ ] Alert contacts added
- [ ] Status page created

### Ongoing Maintenance

- [ ] Weekly: Review all monitor statuses
- [ ] Monthly: Review and update thresholds
- [ ] Quarterly: Audit monitoring coverage
- [ ] Annually: Review and update playbooks

---

## Dashboard Tools & Access

### Primary Tools

| Tool | Purpose | URL | Access |
|------|---------|-----|--------|
| UptimeRobot | Uptime monitoring | uptimerobot.com | [credentials] |
| Vercel | Hosting dashboard | vercel.com | [credentials] |
| Google Analytics | User analytics | analytics.google.com | [credentials] |
| Search Console | SEO health | search.google.com/search-console | [credentials] |
| PageSpeed Insights | Performance | pagespeed.web.dev | Public |

### Bookmarks for Quick Access

```
Dashboard Bookmarks:
- UptimeRobot: https://uptimerobot.com/dashboard
- Vercel: https://vercel.com/[team]/tristateaquaticsolutions
- GA4: https://analytics.google.com/analytics/web/#/p[PROPERTY_ID]/realtime
- Search Console: https://search.google.com/search-console?resource_id=https://tristateaquaticsolutions.com
- PageSpeed: https://pagespeed.web.dev/analysis?url=https://tristateaquaticsolutions.com
```

---

## Appendix: Metric Definitions

### Uptime Metrics

- **Uptime Percentage**: (Total time - Downtime) / Total time * 100
- **Response Time**: Time from request sent to first byte received
- **TTFB**: Time To First Byte - server response time
- **Error Rate**: Failed requests / Total requests * 100

### Performance Metrics

- **LCP**: Time until largest content element is visible
- **FID**: Delay between user interaction and browser response
- **CLS**: Visual stability score (lower is better)
- **INP**: Responsiveness to all user interactions

### Engagement Metrics

- **Bounce Rate**: Single-page sessions / Total sessions * 100
- **Session Duration**: Average time users spend on site
- **Pages/Session**: Average pages viewed per session
- **Conversion Rate**: Goal completions / Sessions * 100
