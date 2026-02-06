# PRD-01: Local SEO Domination
## Tri-State Aquatic Solutions - Conversion Optimization

**Version:** 1.0
**Priority:** P1 (Critical)
**Status:** Ready for Implementation
**Est. Impact:** 200%+ organic traffic increase, Local Pack dominance

---

## 1. Executive Summary

Dominate local search results across the Main Line PA and Northern Delaware markets by enhancing existing location pages, adding township permit guides, and implementing comprehensive local schema markup. With 27 location pages already built, this PRD focuses on optimization and expansion to capture "pool builder near me" and city-specific searches.

### Success Metrics
| Metric | Current | 90-Day Target | 6-Month Target |
|--------|---------|---------------|----------------|
| Location pages ranking page 1 | TBD | 8+ | 20+ |
| "Near me" Local Pack appearances | TBD | 50% | 80% |
| Organic traffic from local searches | TBD | +100% | +200% |
| Google Business Profile views | TBD | 1,000/mo | 3,000/mo |

---

## 2. Current State Analysis

### What Exists (27 Location Pages)
Location pages already built covering:
- **PA Markets:** Gladwyne, Villanova, Bryn Mawr, Wayne, Malvern, West Chester, Haverford, Radnor, Newtown Square, Media, Chadds Ford, Chester County, Berwyn, Narberth, Swarthmore, Willistown
- **DE Markets:** Hockessin, Greenville, Wilmington, Pike Creek, Newark, North Wilmington
- **Neighborhoods:** Alapocas, Rosemont, Ithan, Chateau Country, Strafford, Daylesford, Rockland, Fairfax

### Gaps Identified
1. **No permit guides** - Township-specific permit content is a major opportunity
2. **Schema markup incomplete** - LocalBusiness schema needs enhancement
3. **Content depth varies** - Some pages thin on local-specific content
4. **Internal linking weak** - Location pages not well interconnected
5. **Review mentions missing** - No localized testimonial content

---

## 3. Requirements & Specifications

### 3.1 Township Permit Guide Pages (NEW CONTENT)

Create 10 priority permit guides:

| Township | Priority | Content Focus |
|----------|----------|---------------|
| Lower Merion Township (PA) | P1 | Gladwyne, Bryn Mawr, Haverford |
| Radnor Township (PA) | P1 | Wayne, Villanova, Radnor |
| Easttown Township (PA) | P1 | Berwyn, Devon |
| Tredyffrin Township (PA) | P1 | Paoli, Chesterbrook |
| West Chester Borough (PA) | P1 | West Chester |
| New Castle County (DE) | P1 | Hockessin, Greenville, Wilmington |
| Willistown Township (PA) | P2 | Malvern area |
| Newtown Township (PA) | P2 | Newtown Square |
| Thornbury Township (PA) | P2 | Chadds Ford, Glen Mills |
| Birmingham Township (PA) | P2 | Chadds Ford area |

**Each Permit Guide Must Include:**
- Application process overview
- Required documents checklist
- Fee structure (ranges)
- Setback requirements
- Fence/barrier requirements
- Typical approval timeline
- Contact information for township
- Link to official township permit page
- CTA: "We handle permits for you"

### 3.2 Location Page Enhancements

**Add to Each Existing Location Page:**

```html
<!-- LocalBusiness Schema Enhancement -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://tristateaquaticsolutions.com/#localbusiness",
  "name": "Tri-State Aquatic Solutions - [City] Pool Builder",
  "image": "[project-photo-url]",
  "url": "https://tristateaquaticsolutions.com/locations/[city]",
  "telephone": "610-870-3113",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "[PA/DE]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat]",
    "longitude": "[long]"
  },
  "areaServed": {
    "@type": "City",
    "name": "[City], [State]"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "[lat]",
      "longitude": "[long]"
    },
    "geoRadius": "15 mi"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pool Installation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fiberglass Pool Installation"
        }
      }
    ]
  }
}
</script>
```

**Content Additions Per Page:**
1. **Local testimonial section** - Real reviews mentioning the city
2. **Nearby project gallery** - 3-4 projects from within 10 miles
3. **Local permit info snippet** - Link to full permit guide
4. **Neighborhood-specific FAQ** - 5 questions with FAQ schema
5. **"Pools near [City]" section** - Links to nearby location pages

### 3.3 Internal Linking Structure

**Implement Hub-and-Spoke Model:**
```
/locations/ (Hub)
├── /locations/gladwyne-pa/ → links to Villanova, Bryn Mawr, Haverford
├── /locations/villanova-pa/ → links to Gladwyne, Radnor, Bryn Mawr
├── /locations/hockessin-de/ → links to Greenville, Wilmington, Pike Creek
└── (etc.)

/permits/ (New Hub)
├── /permits/lower-merion-township/
├── /permits/radnor-township/
├── /permits/new-castle-county-de/
└── (etc.)
```

**Cross-Linking Requirements:**
- Each location page links to 3-4 nearby locations
- Each location page links to relevant permit guide
- Permit guides link back to served locations
- Blog posts link to relevant location pages

### 3.4 Google Business Profile Optimization

**Weekly GBP Tasks:**
- [ ] Post 1-2 Google Posts (project photos, tips, offers)
- [ ] Upload 2-3 new project photos with geo-tags
- [ ] Respond to all reviews within 24 hours
- [ ] Answer Q&A questions (pre-populate 15 common Qs)

**Monthly GBP Tasks:**
- [ ] Update business description with seasonal keywords
- [ ] Add new services as they launch
- [ ] Review and update service area
- [ ] Check for and report fake competitor reviews

**Photo Upload Checklist (Target: 50+ photos):**
- [ ] Before/after transformations (10+)
- [ ] Installation process shots (10+)
- [ ] Completed projects by city (15+)
- [ ] Team at work photos (5+)
- [ ] Equipment and materials (5+)
- [ ] Customer handoff moments (5+)

### 3.5 Review Generation with Location Tags

**Goal:** 20+ reviews mentioning specific cities

**Review Request Script (Post-Project):**
> "Hi [Name], we're so glad you love your new pool! If you have a moment, would you mind sharing your experience on Google? Mentioning that you're in [City] helps other [City] homeowners find us. [Review Link]"

**Target Reviews by Location:**
| Location | Current | Target (90 days) |
|----------|---------|------------------|
| Gladwyne | 0 | 3+ |
| Villanova | 0 | 3+ |
| Hockessin | 0 | 3+ |
| West Chester | 0 | 3+ |
| Wayne | 0 | 2+ |
| Other locations | 0 | 6+ |

---

## 4. Technical Implementation

### 4.1 Page Template Updates

**Location Page Template Changes:**
```html
<!-- Add to <head> -->
<link rel="canonical" href="https://tristateaquaticsolutions.com/locations/[city]-[state]/" />
<meta name="geo.region" content="US-[STATE]" />
<meta name="geo.placename" content="[City]" />
<meta name="geo.position" content="[lat];[long]" />
<meta name="ICBM" content="[lat], [long]" />

<!-- Title tag format -->
<title>Pool Builder in [City], [State] | Fiberglass Pool Installation | Tri-State Aquatic</title>

<!-- Meta description format (150-160 chars) -->
<meta name="description" content="Premier fiberglass pool installation in [City], [State]. 2-4 week install, lifetime warranty. Serving [City] homeowners since 2024. Free consultation!" />
```

### 4.2 Sitemap Enhancements

**Add Location Sitemap Section:**
```xml
<!-- sitemap-locations.xml -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tristateaquaticsolutions.com/locations/gladwyne-pa/</loc>
    <lastmod>2026-02-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Repeat for all 27+ locations -->
</urlset>
```

### 4.3 NAP Consistency Audit

**Verify NAP (Name, Address, Phone) across all platforms:**
- [ ] Google Business Profile
- [ ] Website footer
- [ ] All location pages
- [ ] Yelp
- [ ] BBB
- [ ] Apple Maps
- [ ] Bing Places
- [ ] Facebook
- [ ] Instagram
- [ ] All directory listings

**Standard NAP Format:**
```
Tri-State Aquatic Solutions
[Service Address if applicable]
Phone: (610) 870-3113
tristateaquaticsolutions.com
```

---

## 5. Implementation Checklist

### Phase 1: Foundation (Week 1-2)
- [ ] Audit all 27 existing location pages for content gaps
- [ ] Add LocalBusiness schema to all location pages
- [ ] Add geo meta tags to all location pages
- [ ] Update title tags and meta descriptions
- [ ] Create internal linking between nearby locations
- [ ] Verify NAP consistency across web

### Phase 2: Permit Guides (Week 3-4)
- [ ] Create `/permits/` hub page
- [ ] Write Lower Merion Township permit guide
- [ ] Write Radnor Township permit guide
- [ ] Write New Castle County permit guide
- [ ] Write West Chester Borough permit guide
- [ ] Write Easttown Township permit guide
- [ ] Link permit guides from relevant location pages

### Phase 3: Content Enhancement (Week 5-6)
- [ ] Add local testimonial sections to top 10 location pages
- [ ] Add nearby project galleries to all location pages
- [ ] Create FAQ schema for each location page
- [ ] Add "Pools near [City]" cross-linking sections
- [ ] Optimize images with city-specific alt tags

### Phase 4: GBP Optimization (Week 7-8)
- [ ] Upload 30+ new photos to GBP (geo-tagged)
- [ ] Pre-populate 15 Q&A answers
- [ ] Create weekly GBP posting schedule
- [ ] Set up review request automation
- [ ] Launch location-specific review campaign

### Phase 5: Remaining Permit Guides (Week 9-12)
- [ ] Write Willistown Township permit guide
- [ ] Write Newtown Township permit guide
- [ ] Write Thornbury Township permit guide
- [ ] Write Birmingham Township permit guide
- [ ] Write Tredyffrin Township permit guide

---

## 6. Content Templates

### Permit Guide Template
```markdown
# Pool Building Permits in [Township Name]

## Overview
[2-3 sentences about pool permitting in this township]

## Application Requirements
- Application form (link)
- Site plan showing pool location
- Property survey
- Contractor information
- Proof of insurance
- [Township-specific items]

## Fee Structure
| Permit Type | Fee Range |
|-------------|-----------|
| Inground pool permit | $X - $X |
| Electrical permit | $X - $X |
| Fence permit (if required) | $X - $X |

## Setback Requirements
- Front yard: X feet minimum
- Side yard: X feet minimum
- Rear yard: X feet minimum
- From septic: X feet minimum

## Fence/Barrier Requirements
[Township-specific fencing requirements]

## Typical Timeline
- Application review: X-X weeks
- Inspection scheduling: X days after approval
- Total process: X-X weeks

## Contact Information
[Township] Building Department
Address: [Address]
Phone: [Phone]
Hours: [Hours]
Website: [Link]

## We Handle Permits For You
At Tri-State Aquatic Solutions, we manage the entire permit process so you don't have to. Our team knows [Township] requirements inside and out.

[CTA: Schedule Your Free Consultation]
```

---

## 7. Success Metrics & Tracking

### Weekly Tracking
| Metric | Tool | Target |
|--------|------|--------|
| GBP profile views | GBP Insights | +10% WoW |
| GBP direction requests | GBP Insights | +5% WoW |
| Local keyword rankings | Search Console | Track top 20 |

### Monthly Tracking
| Metric | Tool | Target |
|--------|------|--------|
| Organic traffic (location pages) | GA4 | +20% MoM |
| Local Pack appearances | Manual check | 10+ cities |
| New reviews with city mentions | GBP | 5+/month |
| Permit guide page views | GA4 | 200+/month |

### Quarterly Review
- Rank position for all "[city] pool builder" keywords
- Compare traffic YoY for location pages
- Assess permit guide link acquisition
- Review competitor Local Pack presence

---

## 8. Dependencies & Risks

### Dependencies
- Access to Google Business Profile
- Google Search Console verification
- Accurate township permit information (may require calls)
- Project photos with location data

### Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Permit info changes | Low | Add "verify with township" disclaimer |
| Competitor copies strategy | Medium | Move fast, build authority first |
| Google algorithm change | Medium | Focus on user value, not just SEO |
| Thin content penalty | High | Ensure 800+ words per page |

---

## 9. Resources

### Reference Documents
- `/marketing/MASTER-MARKETING-PLAYBOOK.md`
- `/research/seo-council-evaluation.md`
- `/marketing/directory-submission-guide.md`

### External Resources
- [Google Business Profile Help](https://support.google.com/business)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- Lower Merion Township Building Dept
- Radnor Township Permits Office
- New Castle County Land Use

---

*Last Updated: February 2026*
*Owner: Marketing Team*
*Next Review: March 2026*
