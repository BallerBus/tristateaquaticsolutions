# SEO Redirect Map & Migration Guide

**Migration Date:** January 31, 2026
**Old Platform:** Booth Launchpad
**New Platform:** Static HTML (Vercel)
**Domain:** tristateaquaticsolutions.com

---

## URL Mapping (Old → New)

Both sites use identical URL structures. All existing URLs will continue to work:

| Old URL (Booth Launchpad) | New URL (Vercel) | Status |
|---------------------------|------------------|--------|
| `/` | `/` | ✅ Same |
| `/about/` | `/about/` | ✅ Same |
| `/services/` | `/services/` | ✅ Same |
| `/contact/` | `/contact/` | ✅ Same |
| `/gallery/` | `/gallery/` | ✅ Same |
| `/testimonials/` | `/testimonials/` | ✅ Same |
| `/faq/` | `/faq/` | ✅ Same |
| `/financing/` | `/financing/` | ✅ Same |
| `/pools/` | `/pools/` | ✅ Same |
| `/pools/fiberglass/` | `/pools/fiberglass/` | ✅ Same |
| `/pools/concrete/` | `/pools/concrete/` | ✅ Same |
| `/pools/plunge/` | `/pools/plunge/` | ✅ Same |
| `/pool-maintenance/` | `/pool-maintenance/` | ✅ Same |
| `/services/pool-opening/` | `/services/pool-opening/` | ✅ Same |
| `/services/pool-closing/` | `/services/pool-closing/` | ✅ Same |
| `/services/weekly-maintenance/` | `/services/weekly-maintenance/` | ✅ Same |
| `/services/equipment-repair/` | `/services/equipment-repair/` | ✅ Same |
| `/services/water-testing/` | `/services/water-testing/` | ✅ Same |
| `/blog/` | `/blog/` | ✅ Same |
| `/tools/` | `/tools/` | ✅ Same |
| `/resources/` | `/resources/` | ✅ Same |

### Location Pages - Pennsylvania
| Old URL | New URL | Status |
|---------|---------|--------|
| `/locations/pennsylvania/` | `/locations/pennsylvania/` | ✅ Same |
| `/locations/chester-county-pa/` | `/locations/chester-county-pa/` | ✅ Same |
| `/locations/delaware-county-pa/` | `/locations/delaware-county-pa/` | ✅ Same |
| `/locations/montgomery-county-pa/` | `/locations/montgomery-county-pa/` | ✅ Same |
| `/locations/gladwyne-pa/` | `/locations/gladwyne-pa/` | ✅ Same |
| `/locations/villanova-pa/` | `/locations/villanova-pa/` | ✅ Same |
| `/locations/bryn-mawr-pa/` | `/locations/bryn-mawr-pa/` | ✅ Same |
| `/locations/haverford-pa/` | `/locations/haverford-pa/` | ✅ Same |
| `/locations/radnor-pa/` | `/locations/radnor-pa/` | ✅ Same |
| `/locations/wayne-pa/` | `/locations/wayne-pa/` | ✅ Same |
| `/locations/malvern-pa/` | `/locations/malvern-pa/` | ✅ Same |
| `/locations/west-chester-pa/` | `/locations/west-chester-pa/` | ✅ Same |
| `/locations/newtown-square-pa/` | `/locations/newtown-square-pa/` | ✅ Same |
| `/locations/media-pa/` | `/locations/media-pa/` | ✅ Same |
| `/locations/ardmore-pa/` | `/locations/ardmore-pa/` | ✅ Same |
| `/locations/berwyn-pa/` | `/locations/berwyn-pa/` | ✅ Same |

### Location Pages - Delaware
| Old URL | New URL | Status |
|---------|---------|--------|
| `/locations/delaware/` | `/locations/delaware/` | ✅ Same |
| `/locations/new-castle-county-de/` | `/locations/new-castle-county-de/` | ✅ Same |
| `/locations/hockessin-de/` | `/locations/hockessin-de/` | ✅ Same |
| `/locations/greenville-de/` | `/locations/greenville-de/` | ✅ Same |
| `/locations/wilmington-de/` | `/locations/wilmington-de/` | ✅ Same |
| `/locations/centreville-de/` | `/locations/centreville-de/` | ✅ Same |
| `/locations/pike-creek-de/` | `/locations/pike-creek-de/` | ✅ Same |
| `/locations/newark-de/` | `/locations/newark-de/` | ✅ Same |
| `/locations/yorklyn-de/` | `/locations/yorklyn-de/` | ✅ Same |
| `/locations/montchanin-de/` | `/locations/montchanin-de/` | ✅ Same |

---

## SEO Preservation Checklist

### ✅ Before Migration
- [x] Archive all content from old site
- [x] Document all URLs
- [x] Document meta titles and descriptions
- [x] Save structured data (JSON-LD schemas)
- [ ] Export Google Search Console data
- [ ] Note current rankings for key terms

### ✅ During Migration
- [ ] Keep same domain (tristateaquaticsolutions.com)
- [ ] Maintain identical URL structure
- [ ] Keep same meta titles and descriptions
- [ ] Keep same H1 tags and content structure
- [ ] Preserve all structured data markup
- [ ] Set up proper canonical URLs

### ✅ After Migration
- [ ] Verify all pages return 200 status
- [ ] Submit new sitemap to Google Search Console
- [ ] Request indexing of key pages
- [ ] Monitor Search Console for crawl errors
- [ ] Set up 404 page with helpful navigation

---

## Key SEO Elements to Preserve

### Meta Titles (Keep Exact)
```
Homepage: Tri-State Aquatic Solutions | Premium Pool Installation | Main Line PA & Delaware
Fiberglass: Fiberglass Pool Installation | Main Line PA & Delaware | Tri-State Aquatic Solutions
Concrete: Concrete Pool Installation | Main Line PA & Delaware | Tri-State Aquatic Solutions
Contact: Contact Us | Tri-State Aquatic Solutions | Pool Installation Quote
```

### Schema Markup Types (Keep All)
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList
- AggregateRating (5.0/5, 47 reviews)
- Review
- Article
- WebApplication

### Internal Link Structure
Maintain the same internal linking patterns:
- Homepage → Pool types → Specific pools
- Homepage → Services → Specific services
- Location pages cross-link to relevant service pages
- Blog articles link to relevant service pages

---

## Domain DNS Migration Steps

1. **Point domain to Vercel:**
   - Add CNAME record: `tristateaquaticsolutions.com` → `cname.vercel-dns.com`
   - Or A record to Vercel IP addresses

2. **SSL Certificate:**
   - Vercel auto-provisions SSL
   - Ensure HTTPS redirects are enabled

3. **Remove Booth Launchpad:**
   - Only after confirming new site is live
   - No redirects needed since same domain

---

## Monitoring

### Track These Metrics (Weekly for 3 Months)
- Organic traffic (Google Analytics)
- Indexed pages (Search Console)
- Average position for key terms
- Crawl errors (Search Console)
- Page experience metrics (Core Web Vitals)

### Key Search Terms to Monitor
- "pool installation main line pa"
- "fiberglass pool delaware"
- "pool builders chester county"
- "pool installation hockessin"
- "plunge pool installation pa"
- "pool cost pennsylvania"

---

*Archive created: January 31, 2026*
