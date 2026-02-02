# Speed Audit Checklist

## Tri-State Aquatic Solutions Website

Monthly performance audit process to maintain optimal website speed and Core Web Vitals.

---

## Monthly Speed Audit Process

### Overview

Conduct this audit on the **first Monday of each month** to track performance trends and identify optimization opportunities.

**Time Required**: 2-3 hours
**Tools Needed**: PageSpeed Insights, Chrome DevTools, WebPageTest
**Output**: Documented metrics and action items

---

## Pre-Audit Preparation

### 1. Gather Baseline Data

Before running tests, collect the following:

- [ ] Previous month's Core Web Vitals from Search Console
- [ ] Previous month's average page load times from GA4
- [ ] List of site changes made in the past month
- [ ] Current performance budget metrics

### 2. Clear Testing Environment

- [ ] Close unnecessary browser tabs
- [ ] Disable browser extensions (or use incognito mode)
- [ ] Use wired internet connection if possible
- [ ] Note your testing location and connection speed

---

## Audit Steps

### Step 1: Google Search Console Review (15 min)

1. Navigate to **Experience > Core Web Vitals**
2. Record current status:

| Metric | Mobile | Desktop | Trend |
|--------|--------|---------|-------|
| LCP | _____ | _____ | Better/Worse/Same |
| FID | _____ | _____ | Better/Worse/Same |
| CLS | _____ | _____ | Better/Worse/Same |
| INP | _____ | _____ | Better/Worse/Same |

3. Note any URLs flagged as "Poor" or "Needs Improvement"
4. Check for new URL groups with issues

### Step 2: PageSpeed Insights Analysis (30 min)

Test each critical page on both mobile and desktop:

#### Homepage (/)

**Mobile Test**
- Performance Score: _____
- LCP: _____ seconds
- TBT: _____ ms
- CLS: _____
- Speed Index: _____ seconds

**Desktop Test**
- Performance Score: _____
- LCP: _____ seconds
- TBT: _____ ms
- CLS: _____
- Speed Index: _____ seconds

**Top 3 Opportunities Identified:**
1. _________________________________
2. _________________________________
3. _________________________________

#### Services Page (/services)

**Mobile Test**
- Performance Score: _____
- LCP: _____ seconds
- TBT: _____ ms
- CLS: _____
- Speed Index: _____ seconds

**Desktop Test**
- Performance Score: _____
- LCP: _____ seconds
- TBT: _____ ms
- CLS: _____
- Speed Index: _____ seconds

**Top 3 Opportunities Identified:**
1. _________________________________
2. _________________________________
3. _________________________________

#### Contact Page (/contact)

**Mobile Test**
- Performance Score: _____
- LCP: _____ seconds
- TBT: _____ ms
- CLS: _____
- Speed Index: _____ seconds

**Desktop Test**
- Performance Score: _____
- LCP: _____ seconds
- TBT: _____ ms
- CLS: _____
- Speed Index: _____ seconds

**Top 3 Opportunities Identified:**
1. _________________________________
2. _________________________________
3. _________________________________

### Step 3: WebPageTest Deep Dive (30 min)

Run detailed tests at [webpagetest.org](https://www.webpagetest.org):

**Test Configuration:**
- Location: Dulles, VA (or closest to target audience)
- Browser: Chrome
- Connection: 4G Mobile / Cable
- Number of runs: 3

Record for each critical page:

| Metric | First View | Repeat View |
|--------|------------|-------------|
| Load Time | _____ | _____ |
| Start Render | _____ | _____ |
| Largest Contentful Paint | _____ | _____ |
| Cumulative Layout Shift | _____ | _____ |
| Total Blocking Time | _____ | _____ |
| Fully Loaded | _____ | _____ |
| Requests | _____ | _____ |
| Bytes In | _____ | _____ |

**Waterfall Analysis:**
- [ ] Check for render-blocking resources
- [ ] Identify slow server responses
- [ ] Note large resources that could be optimized
- [ ] Check third-party script impact

### Step 4: Chrome DevTools Analysis (30 min)

Open Chrome DevTools and perform the following:

#### Performance Panel Recording

1. Open DevTools > Performance
2. Enable CPU throttling (4x slowdown)
3. Enable Network throttling (Fast 3G)
4. Record page load
5. Note:
   - Main thread blocking tasks: _____
   - Long tasks (>50ms): _____
   - Time to Interactive: _____

#### Network Panel Analysis

1. Open DevTools > Network
2. Disable cache, reload page
3. Record:
   - Total requests: _____
   - Total transferred: _____
   - Total resources: _____
   - DOMContentLoaded: _____
   - Load: _____

**Large Resources (>100KB):**
| Resource | Size | Type | Optimizable? |
|----------|------|------|--------------|
| _________ | _____ | _____ | Yes/No |
| _________ | _____ | _____ | Yes/No |
| _________ | _____ | _____ | Yes/No |

#### Lighthouse Audit

1. Open DevTools > Lighthouse
2. Select: Performance, Accessibility, Best Practices, SEO
3. Run audit for Mobile
4. Screenshot and save report
5. Note scores:
   - Performance: _____
   - Accessibility: _____
   - Best Practices: _____
   - SEO: _____

### Step 5: Third-Party Script Audit (15 min)

List all third-party scripts and their impact:

| Script | Purpose | Size | Load Time | Essential? |
|--------|---------|------|-----------|------------|
| Google Analytics | Analytics | _____ | _____ | Yes |
| _____________ | _________ | _____ | _____ | _____ |
| _____________ | _________ | _____ | _____ | _____ |
| _____________ | _________ | _____ | _____ | _____ |

**Questions to ask:**
- [ ] Is each script still being used?
- [ ] Can any be loaded async/deferred?
- [ ] Can any be removed entirely?
- [ ] Are there lighter alternatives?

### Step 6: Image Audit (15 min)

Check image optimization status:

- [ ] All images using WebP or AVIF format?
- [ ] Responsive images implemented with srcset?
- [ ] Images lazy-loaded below the fold?
- [ ] LCP image preloaded?
- [ ] Image dimensions specified in HTML?

**Oversized Images Found:**
| Image | Current Size | Optimal Size | Action |
|-------|--------------|--------------|--------|
| ______ | _____ KB | _____ KB | Compress/Resize |
| ______ | _____ KB | _____ KB | Compress/Resize |
| ______ | _____ KB | _____ KB | Compress/Resize |

### Step 7: Caching Audit (10 min)

Check cache headers using DevTools Network panel:

| Resource Type | Cache-Control | Correct? |
|---------------|---------------|----------|
| HTML | no-cache | [ ] Yes [ ] No |
| CSS | max-age=31536000 | [ ] Yes [ ] No |
| JavaScript | max-age=31536000 | [ ] Yes [ ] No |
| Images | max-age=31536000 | [ ] Yes [ ] No |
| Fonts | max-age=31536000 | [ ] Yes [ ] No |

---

## Tool Recommendations

### Free Tools

| Tool | Purpose | URL |
|------|---------|-----|
| PageSpeed Insights | Quick performance check | pagespeed.web.dev |
| WebPageTest | Detailed waterfall analysis | webpagetest.org |
| Chrome DevTools | In-browser debugging | Built into Chrome |
| Lighthouse | Comprehensive audit | Chrome DevTools |
| GTmetrix | Performance grades | gtmetrix.com |
| Pingdom | Uptime and speed | tools.pingdom.com |

### Paid Tools (Optional)

| Tool | Purpose | Starting Price |
|------|---------|----------------|
| SpeedCurve | Continuous monitoring | $20/month |
| Calibre | Performance tracking | $29/month |
| DebugBear | Lab + RUM monitoring | $39/month |
| Catchpoint | Enterprise monitoring | Contact sales |

### Command Line Tools

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://tristateaquaticsolutions.com --output html --output-path ./report.html

# WebPageTest CLI
npm install -g webpagetest
webpagetest test https://tristateaquaticsolutions.com -k YOUR_API_KEY

# sitespeed.io (comprehensive)
npm install -g sitespeed.io
sitespeed.io https://tristateaquaticsolutions.com
```

### Browser Extensions

- [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma) - Real-time CWV
- [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) - In-browser audits
- [WAVE](https://wave.webaim.org/extension/) - Accessibility
- [WhatRuns](https://www.whatruns.com/) - Technology detection

---

## Benchmark Tracking

### Monthly Metrics Spreadsheet

Track these metrics every month:

```
| Date       | Page | Mobile Score | Desktop Score | LCP  | CLS  | TBT   | Size  |
|------------|------|--------------|---------------|------|------|-------|-------|
| 2024-01-01 | /    | 85           | 92            | 2.1s | 0.05 | 150ms | 1.2MB |
| 2024-02-01 | /    | 87           | 94            | 1.9s | 0.04 | 120ms | 1.1MB |
| 2024-03-01 | /    | _____        | _____         | ____ | ____ | _____ | _____ |
```

### Trend Analysis Questions

After 3+ months of data, ask:

1. Are scores trending up, down, or stable?
2. What changes correlate with performance changes?
3. Are we meeting our performance budget?
4. What's the biggest improvement opportunity?

### Setting Goals

Based on current metrics, set quarterly goals:

| Metric | Current | Q1 Goal | Q2 Goal | Year-End Goal |
|--------|---------|---------|---------|---------------|
| Mobile Score | _____ | _____ | _____ | 90+ |
| LCP | _____ | _____ | _____ | <2.0s |
| CLS | _____ | _____ | _____ | <0.05 |
| TBT | _____ | _____ | _____ | <100ms |

---

## Improvement Prioritization

### Priority Matrix

Score each issue on Impact (1-5) and Effort (1-5):

| Issue | Impact | Effort | Score | Priority |
|-------|--------|--------|-------|----------|
| _________________________ | _____ | _____ | _____ | _____ |
| _________________________ | _____ | _____ | _____ | _____ |
| _________________________ | _____ | _____ | _____ | _____ |
| _________________________ | _____ | _____ | _____ | _____ |

**Priority Score = Impact / Effort**
- Score > 2: High priority (do first)
- Score 1-2: Medium priority
- Score < 1: Low priority (do later)

### Quick Wins (High Impact, Low Effort)

Common quick wins to check:
- [ ] Enable compression (Gzip/Brotli)
- [ ] Add image dimensions
- [ ] Defer non-critical JavaScript
- [ ] Preload LCP image
- [ ] Enable browser caching
- [ ] Remove unused CSS/JS
- [ ] Optimize images (WebP conversion)

### Medium-Term Improvements

- [ ] Implement responsive images
- [ ] Set up CDN
- [ ] Optimize web fonts
- [ ] Implement code splitting
- [ ] Add service worker

### Long-Term Projects

- [ ] Migrate to modern JavaScript framework
- [ ] Implement server-side rendering
- [ ] Set up edge caching
- [ ] Redesign with performance in mind

---

## Post-Audit Actions

### 1. Create Action Items

For each issue found, create a specific action item:

```
Issue: LCP image not optimized
Impact: High (affects largest element)
Action: Convert hero-pool.jpg to WebP, add preload hint
Owner: [Developer name]
Due Date: [Date]
```

### 2. Document Changes

After implementing fixes, document:
- What was changed
- Before/after metrics
- Date of change

### 3. Schedule Follow-Up

- [ ] Test affected pages after fixes
- [ ] Verify improvements in next month's audit
- [ ] Update performance budget if needed

### 4. Communicate Results

Share audit summary with stakeholders:
- Executive summary (1 paragraph)
- Key metrics vs. previous month
- Top 3 improvements made
- Top 3 planned improvements

---

## Audit Report Template

```markdown
# Monthly Performance Audit Report

**Date**: [Month Year]
**Auditor**: [Name]
**Website**: tristateaquaticsolutions.com

## Executive Summary

[1-2 sentence summary of overall performance status and key changes]

## Core Web Vitals Status

| Metric | Last Month | This Month | Change | Status |
|--------|------------|------------|--------|--------|
| LCP    | _____      | _____      | _____  | Good/Needs Work/Poor |
| FID    | _____      | _____      | _____  | Good/Needs Work/Poor |
| CLS    | _____      | _____      | _____  | Good/Needs Work/Poor |
| INP    | _____      | _____      | _____  | Good/Needs Work/Poor |

## Key Findings

1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

## Actions Taken This Month

- [x] [Completed action 1]
- [x] [Completed action 2]

## Planned Improvements

- [ ] [Planned action 1] - Due: [Date]
- [ ] [Planned action 2] - Due: [Date]
- [ ] [Planned action 3] - Due: [Date]

## Detailed Metrics

[Attach full metrics tables from audit]

## Recommendations

[Prioritized list of recommendations]
```

---

## Appendix: Quick Reference

### Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | <=2.5s | 2.5s-4.0s | >4.0s |
| FID | <=100ms | 100ms-300ms | >300ms |
| CLS | <=0.1 | 0.1-0.25 | >0.25 |
| INP | <=200ms | 200ms-500ms | >500ms |

### Lighthouse Score Interpretation

| Score | Rating | Action |
|-------|--------|--------|
| 90-100 | Good | Maintain |
| 50-89 | Needs Improvement | Optimize |
| 0-49 | Poor | Urgent attention |

### Common Performance Issues

| Issue | Impact | Solution |
|-------|--------|----------|
| Unoptimized images | LCP | WebP, lazy load, srcset |
| Render-blocking CSS/JS | FCP, LCP | Inline critical, defer |
| No caching | All | Set Cache-Control headers |
| Large JavaScript | TBT, INP | Code split, tree shake |
| Layout shifts | CLS | Set dimensions, font-display |
| Slow server | TTFB | CDN, optimize backend |
