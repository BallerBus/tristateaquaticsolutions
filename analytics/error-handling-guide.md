# Error Handling Guide

## Tri-State Aquatic Solutions Website

**Last Updated:** February 2026

---

## Table of Contents

1. [Common Website Errors](#common-website-errors)
2. [Debugging Process](#debugging-process)
3. [Error Prioritization](#error-prioritization)
4. [Fix Verification](#fix-verification)
5. [User Communication](#user-communication)
6. [Error Prevention](#error-prevention)

---

## Common Website Errors

### 1. HTTP Status Errors

#### 404 - Page Not Found

**Symptoms:**
- User sees "Page not found" message
- Broken links reported
- Google Search Console shows crawl errors

**Common Causes:**
- Deleted or moved page
- Typo in URL
- Incorrect internal links
- Removed content without redirect

**Resolution:**
```
1. Identify the broken URL
2. Determine if content exists elsewhere
3. Create 301 redirect to correct page OR
4. Create proper 404 page with helpful navigation
5. Fix any internal links pointing to old URL
6. Submit updated sitemap to Google
```

**Vercel Redirect Example (vercel.json):**
```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

---

#### 500 - Internal Server Error

**Symptoms:**
- White screen or generic error message
- Site completely unusable
- Multiple users affected

**Common Causes:**
- Deployment failure
- Server-side code error
- Configuration issue
- Resource exhaustion

**Resolution:**
```
1. Check Vercel deployment logs
2. Review recent code changes
3. Roll back to last working deployment if critical
4. Fix code and redeploy
5. Verify fix across multiple pages
```

**Vercel Rollback:**
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

#### 503 - Service Unavailable

**Symptoms:**
- Site temporarily down
- "Try again later" message
- Intermittent availability

**Common Causes:**
- Server overload
- Maintenance mode
- Rate limiting
- DDoS protection triggered

**Resolution:**
```
1. Check Vercel status page
2. Review traffic analytics for spikes
3. Check if rate limits were exceeded
4. Wait for auto-recovery or contact support
```

---

### 2. JavaScript Errors

#### Console Errors

**Common Errors:**

| Error | Cause | Fix |
|-------|-------|-----|
| `Uncaught TypeError: Cannot read property 'x' of undefined` | Accessing property on null/undefined | Add null checks |
| `Uncaught ReferenceError: x is not defined` | Using undefined variable | Check variable scope/spelling |
| `SyntaxError: Unexpected token` | Invalid JavaScript syntax | Fix syntax, check for typos |
| `ChunkLoadError` | Failed to load JS chunk | Clear cache, check CDN |

**Debugging Steps:**
```
1. Open browser DevTools (F12)
2. Go to Console tab
3. Reproduce the error
4. Note the error message and file:line
5. Click the error to see stack trace
6. Fix the code at the source
```

---

#### Form Submission Errors

**Symptoms:**
- Form doesn't submit
- No confirmation message
- Data not received

**Common Causes:**
- JavaScript validation failing
- Network error
- Form action URL incorrect
- CORS issues
- Third-party service down (Formspree, etc.)

**Resolution:**
```
1. Check browser console for errors
2. Verify form action URL is correct
3. Test submission with DevTools Network tab open
4. Check third-party service status
5. Verify CORS headers if using API
```

**Form Debug Code:**
```javascript
// Add to form for debugging
document.querySelector('form').addEventListener('submit', function(e) {
  console.log('Form submitted');
  console.log('Form data:', new FormData(this));
});
```

---

### 3. Performance Errors

#### Slow Page Load

**Symptoms:**
- Page takes > 3 seconds to load
- Users abandoning site
- Poor Core Web Vitals scores

**Common Causes:**
- Large unoptimized images
- Too many HTTP requests
- Render-blocking JavaScript
- No caching configured
- Large third-party scripts

**Resolution:**
```
1. Run Lighthouse audit (DevTools > Lighthouse)
2. Identify largest resources
3. Optimize images (WebP, lazy loading)
4. Defer non-critical JavaScript
5. Enable caching headers
6. Minimize third-party scripts
```

**Image Optimization:**
```html
<!-- Lazy loading -->
<img src="pool.jpg" loading="lazy" alt="Pool installation">

<!-- Responsive images -->
<img srcset="pool-400.jpg 400w, pool-800.jpg 800w"
     sizes="(max-width: 400px) 400px, 800px"
     src="pool-800.jpg" alt="Pool">
```

---

#### Layout Shift (CLS Issues)

**Symptoms:**
- Content jumping around while loading
- Buttons moving unexpectedly
- Poor user experience

**Common Causes:**
- Images without dimensions
- Dynamically injected content
- Web fonts causing text shift
- Ads loading late

**Resolution:**
```
1. Always set width/height on images
2. Reserve space for dynamic content
3. Use font-display: swap for fonts
4. Preload critical resources
```

---

### 4. SSL/Security Errors

#### SSL Certificate Errors

**Symptoms:**
- "Not Secure" warning in browser
- Connection refused
- Certificate expired warnings

**Common Causes:**
- Certificate expired
- Misconfigured SSL
- Mixed content (HTTP on HTTPS page)
- Domain mismatch

**Resolution:**
```
1. Check certificate expiry date
2. Renew certificate if expired (Vercel auto-renews)
3. Fix mixed content issues
4. Verify domain matches certificate
```

**Check Certificate:**
```bash
# Command line
openssl s_client -connect tristateaquaticsolutions.com:443 -servername tristateaquaticsolutions.com | openssl x509 -noout -dates

# Or use online tool
# https://www.sslshopper.com/ssl-checker.html
```

---

### 5. Third-Party Integration Errors

#### Google Analytics Not Tracking

**Symptoms:**
- No data in GA4
- Missing pageviews
- Conversions not recording

**Debugging:**
```
1. Install GA Debugger extension
2. Check for gtag in page source
3. Verify Measurement ID is correct
4. Check for ad blockers
5. Review Real-Time report in GA4
```

---

#### Contact Form Emails Not Received

**Symptoms:**
- Form submits successfully but no email
- Intermittent email delivery

**Debugging:**
```
1. Check spam/junk folder
2. Verify email address in form settings
3. Check Formspree/service dashboard for submissions
4. Test with different email provider
5. Check SPF/DKIM records if using custom domain
```

---

## Debugging Process

### Step-by-Step Debug Workflow

```
1. REPRODUCE THE ISSUE
   - Get exact steps to recreate
   - Note: browser, device, time
   - Screenshot/record the error
   |
   v
2. GATHER INFORMATION
   - Check browser console (F12)
   - Check Network tab for failed requests
   - Review server logs (Vercel)
   - Check error tracking dashboard
   |
   v
3. ISOLATE THE CAUSE
   - Does it happen on all browsers?
   - Does it happen for all users?
   - Did it work before? What changed?
   - Can you reproduce locally?
   |
   v
4. RESEARCH SOLUTIONS
   - Search error message
   - Check documentation
   - Review similar issues (Stack Overflow)
   |
   v
5. IMPLEMENT FIX
   - Make minimal necessary changes
   - Test locally first
   - Create branch for fix
   |
   v
6. VERIFY & DEPLOY
   - Test fix thoroughly
   - Deploy to preview/staging
   - Deploy to production
   - Monitor for recurrence
```

### Browser DevTools Quick Reference

| Tab | Use For |
|-----|---------|
| **Console** | JavaScript errors, log messages |
| **Network** | Failed requests, slow resources, response codes |
| **Elements** | HTML/CSS issues, DOM inspection |
| **Sources** | JavaScript debugging, breakpoints |
| **Lighthouse** | Performance audits, accessibility |
| **Application** | Storage, service workers, cache |

### Useful Debug Commands

```javascript
// Log all errors
window.onerror = function(msg, url, line) {
  console.log('Error:', msg, 'at', url, 'line', line);
};

// Check if element exists
console.log(document.querySelector('.my-element'));

// Monitor network requests
performance.getEntriesByType('resource').forEach(r => {
  console.log(r.name, r.duration + 'ms');
});

// Check page load timing
console.log('Page load:', performance.timing.loadEventEnd - performance.timing.navigationStart + 'ms');
```

---

## Error Prioritization

### Priority Matrix

| Priority | Response Time | Examples |
|----------|---------------|----------|
| **P1 - Critical** | < 1 hour | Site completely down, forms broken, security issue |
| **P2 - High** | < 4 hours | Major feature broken, significant performance issue |
| **P3 - Medium** | < 24 hours | Minor feature broken, non-critical errors |
| **P4 - Low** | < 1 week | Cosmetic issues, minor UX improvements |

### Prioritization Criteria

**Consider these factors:**

1. **User Impact**
   - How many users affected?
   - Can they complete their goal?
   - Is there a workaround?

2. **Business Impact**
   - Does it prevent lead capture?
   - Does it affect SEO/rankings?
   - Does it damage brand reputation?

3. **Urgency**
   - Is it getting worse?
   - Time-sensitive (seasonal)?
   - Regulatory/compliance issue?

### P1 Examples (Fix Immediately)

- Homepage not loading
- Contact form completely broken
- Security vulnerability discovered
- Site showing malicious content
- SSL certificate expired

### P2 Examples (Fix Same Day)

- Pool calculator not working
- Mobile navigation broken
- Key landing page errors
- Analytics not tracking
- Slow page load (> 5 seconds)

### P3 Examples (Fix This Week)

- Minor styling issues
- Broken link to external site
- Image not loading on one page
- Spelling/grammar error
- Minor JavaScript console error

### P4 Examples (Backlog)

- Improve loading animation
- Add missing alt text
- Optimize non-critical images
- Refactor old code
- Documentation updates

---

## Fix Verification

### Pre-Deployment Checklist

- [ ] Fix tested locally
- [ ] Fix tested on preview deployment
- [ ] Cross-browser testing completed (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing completed
- [ ] No new errors introduced
- [ ] Related functionality still works

### Post-Deployment Checklist

- [ ] Verify fix on production
- [ ] Check error tracking (no new errors)
- [ ] Monitor for 30 minutes
- [ ] Test on real device (not just emulator)
- [ ] Verify related features still work
- [ ] Update documentation if needed

### Testing Matrix

| Test Type | Tools | Frequency |
|-----------|-------|-----------|
| Visual regression | Percy, Chromatic | Each deploy |
| Functional | Manual, Cypress | Each deploy |
| Performance | Lighthouse, WebPageTest | Weekly |
| Accessibility | axe, WAVE | Monthly |
| Cross-browser | BrowserStack, LambdaTest | Each major change |

### Regression Testing Checklist

**Critical User Flows:**

1. **Homepage to Contact**
   - [ ] Page loads completely
   - [ ] Navigation works
   - [ ] Contact form appears
   - [ ] Form submits successfully

2. **Pool Calculator Flow**
   - [ ] Calculator loads
   - [ ] All inputs work
   - [ ] Calculations are correct
   - [ ] Results display properly

3. **Mobile Navigation**
   - [ ] Hamburger menu works
   - [ ] All links accessible
   - [ ] Phone number clickable
   - [ ] No horizontal scroll

---

## User Communication

### When to Communicate

| Situation | Communicate? | Channel |
|-----------|--------------|---------|
| Site completely down > 5 min | Yes | Status page, social media |
| Partial outage > 30 min | Yes | Status page |
| Minor issue affecting few users | No | Fix silently |
| Scheduled maintenance | Yes (advance notice) | Email, status page |
| Security incident | Yes (after resolved) | Email, potentially public statement |

### Communication Templates

#### Status Page - Investigating

```
[Investigating] Website Performance Issues

We are currently investigating reports of slow website loading times.

Our team has been notified and is working to identify the cause.

Started: [time]
Affected: Website performance
Next Update: Within 30 minutes
```

#### Status Page - Identified

```
[Identified] Website Performance Issues - Database Optimization Needed

We have identified the cause of the slow performance as a database optimization issue.

Our team is implementing a fix now.

Started: [time]
Identified: [time]
Expected Resolution: [time]
```

#### Status Page - Resolved

```
[Resolved] Website Performance Issues

The performance issues have been resolved. The website is now operating normally.

Duration: [X minutes]
Root Cause: Database query optimization needed
Resolution: Implemented query caching and optimization

We apologize for any inconvenience. If you continue to experience issues, please contact us.
```

#### Email - Major Incident

```
Subject: [Resolved] Tri-State Aquatic Solutions Website Issue

Dear [Customer/Visitor],

We experienced a temporary issue with our website on [date] from [time] to [time].

What Happened:
[Brief non-technical explanation]

What We Did:
[Brief explanation of fix]

Your Data:
[If applicable: No customer data was affected]

We apologize for any inconvenience this may have caused. If you were trying to reach us during this time, please try again or call us directly at [phone number].

Thank you for your patience and understanding.

Best regards,
Tri-State Aquatic Solutions Team
```

### Social Media Response Templates

**Acknowledging Issue:**
```
We're aware some of you are having trouble accessing our website. Our team is working to fix this ASAP. Thanks for your patience! For immediate assistance, call us at [phone].
```

**Issue Resolved:**
```
Update: Our website is back up and running! Sorry for any inconvenience. Ready to help you with your pool project - visit us at [URL]
```

---

## Error Prevention

### Code Quality Practices

1. **Use TypeScript or JSDoc**
   - Catch type errors at build time
   - Better IDE support
   - Self-documenting code

2. **Implement Error Boundaries**
   - Graceful error handling
   - Prevent cascading failures
   - Show user-friendly messages

3. **Test Before Deploy**
   - Automated tests for critical paths
   - Manual testing on staging
   - Cross-browser testing

4. **Monitor Continuously**
   - Real-time error tracking
   - Performance monitoring
   - Uptime monitoring

### Preventive Checklist

**Before Each Deploy:**
- [ ] Code review completed
- [ ] Tests pass
- [ ] Lint errors resolved
- [ ] Preview deployment tested
- [ ] No console errors
- [ ] Mobile tested

**Weekly:**
- [ ] Check error tracking dashboard
- [ ] Review Core Web Vitals
- [ ] Check Google Search Console
- [ ] Verify SSL certificate status
- [ ] Test contact form submission

**Monthly:**
- [ ] Full site audit (Lighthouse)
- [ ] Accessibility check
- [ ] Broken link scan
- [ ] Review and close old error tickets
- [ ] Update dependencies (if safe)

### Error Handling Best Practices

```javascript
// Good: Defensive coding
function getUserEmail(user) {
  return user?.email || 'Not provided';
}

// Good: Try-catch with logging
async function submitForm(data) {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Form submission failed:', error);
    TSAS.errorTracking.trackFormError('contact', error.message);
    // Show user-friendly message
    showError('Unable to submit form. Please try again or call us.');
    throw error;
  }
}

// Good: Graceful degradation
if (typeof gtag === 'function') {
  gtag('event', 'page_view');
} else {
  console.warn('Analytics not loaded');
}
```

---

## Quick Reference

### Error Tracking Dashboard URLs

| Service | URL |
|---------|-----|
| Google Analytics 4 | https://analytics.google.com |
| Google Search Console | https://search.google.com/search-console |
| Vercel Dashboard | https://vercel.com/dashboard |
| UptimeRobot | https://uptimerobot.com/dashboard |

### Common Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | None needed |
| 301 | Permanent Redirect | Check if intentional |
| 302 | Temporary Redirect | Check if intentional |
| 400 | Bad Request | Fix client-side code |
| 401 | Unauthorized | Check authentication |
| 403 | Forbidden | Check permissions |
| 404 | Not Found | Add redirect or fix link |
| 500 | Server Error | Check server logs |
| 502 | Bad Gateway | Check upstream server |
| 503 | Service Unavailable | Wait or contact host |

### Useful Online Tools

| Tool | Purpose | URL |
|------|---------|-----|
| PageSpeed Insights | Performance testing | pagespeed.web.dev |
| GTmetrix | Performance analysis | gtmetrix.com |
| SSL Checker | Certificate verification | sslshopper.com |
| Down For Everyone | Check if site is down | downforeveryoneorjustme.com |
| Redirect Checker | Test redirects | redirect-checker.org |
| Can I Use | Browser compatibility | caniuse.com |
