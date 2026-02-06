================================================================================
                    TRI-STATE AQUATIC SOLUTIONS
                    SEO / STRUCTURED DATA GUIDE
================================================================================

This folder contains all SEO-related files for the Tri-State Aquatic Solutions
website. Use these files to implement proper structured data and meta tags.

================================================================================
                              FILE OVERVIEW
================================================================================

ROBOTS & SITEMAPS (in /website/ root)
--------------------------------------
robots.txt              - Crawler instructions, blocks AI bots, references sitemaps
sitemap.xml             - Main sitemap with all pages, priorities, lastmod dates
                          Also includes image sitemap data inline
sitemap-images.xml      - Dedicated image sitemap for Google Image Search

STRUCTURED DATA SCHEMAS (this folder)
--------------------------------------
schema-local-business.json    - Complete LocalBusiness schema with reviews
schema-organization.json      - Organization schema with brand info
schema-services.json          - All service schemas (fiberglass, concrete, plunge, maintenance)
schema-breadcrumbs.json       - Breadcrumb schemas for all page types
schema-website.json           - WebSite schema for search actions
schema-homepage-combined.json - Complete combined schema for homepage (recommended)

META TAGS REFERENCE
--------------------------------------
meta-tags-reference.html      - Visual guide with optimal meta tags for each page type
                                Open in browser for formatted reference

================================================================================
                         HOW TO USE THESE FILES
================================================================================

1. HOMEPAGE IMPLEMENTATION
   -----------------------
   Copy the contents of schema-homepage-combined.json into a <script> tag:

   <script type="application/ld+json">
   [paste contents of schema-homepage-combined.json here]
   </script>

2. SERVICE PAGES (Fiberglass, Concrete, Plunge)
   --------------------------------------------
   Copy the relevant service schema from schema-services.json
   Add a BreadcrumbList from schema-breadcrumbs.json

   Example for fiberglass page - add both schemas:

   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "name": "Fiberglass Pool Installation",
     ... [copy from schema-services.json]
   }
   </script>

   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "BreadcrumbList",
     ... [copy from schema-breadcrumbs.json]
   }
   </script>

3. LOCATION PAGES
   ---------------
   Use LocalBusiness schema with modified areaServed
   Add appropriate BreadcrumbList from schema-breadcrumbs.json

4. BLOG ARTICLES
   --------------
   Use Article or BlogPosting schema (not in this package - create per article)
   Include: headline, datePublished, dateModified, author, image, articleBody
   Add BreadcrumbList from schema-breadcrumbs.json

5. META TAGS
   ----------
   Open meta-tags-reference.html in a browser
   Copy the appropriate meta tags for each page type
   Customize: [PAGE TITLE], [DESCRIPTION], [URL], [IMAGE URL]

================================================================================
                         VALIDATION & TESTING
================================================================================

Before deploying, validate your structured data:

1. Google Rich Results Test
   https://search.google.com/test/rich-results

2. Schema.org Validator
   https://validator.schema.org/

3. Facebook Sharing Debugger (for Open Graph)
   https://developers.facebook.com/tools/debug/

4. Twitter Card Validator
   https://cards-dev.twitter.com/validator

================================================================================
                         MAINTENANCE NOTES
================================================================================

UPDATE FREQUENCY:
- sitemap.xml: Update lastmod dates when pages change
- Reviews in LocalBusiness: Add aggregateRating ONLY when real Google reviews exist
- Price ranges: Update annually or when pricing changes
- Blog sitemap entries: Add new articles as published

IMPORTANT REMINDERS:
- All URLs should use https://tristateaquaticsolutions.com (not .net or other)
- Phone number placeholder: +13028703113 (update with real number)
- Address: Hockessin, DE 19707 (no specific street address)
- Social media URLs are placeholders (update with real profiles)
- Google Business Profile CID needs to be added

================================================================================
                         CONTACT INFORMATION
================================================================================

Website: https://tristateaquaticsolutions.com
Email: info@tristateaquaticsolutions.com

Last Updated: February 2026

================================================================================
