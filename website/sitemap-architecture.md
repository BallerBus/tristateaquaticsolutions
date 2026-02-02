# Tri-State Aquatic Solutions - Sitemap & Site Architecture Documentation

**Last Updated:** February 2, 2026
**Domain:** https://tristateaquaticsolutions.com
**Total Pages:** 245+

---

## Table of Contents

1. [Site Architecture Overview](#1-site-architecture-overview)
2. [Page Inventory](#2-page-inventory)
3. [Content Hub Strategy](#3-content-hub-strategy)
4. [Technical SEO Checklist](#4-technical-seo-checklist)
5. [Internal Linking Map](#5-internal-linking-map)

---

## 1. Site Architecture Overview

### Complete Site Structure Tree

```
tristateaquaticsolutions.com/
│
├── CORE PAGES
│   ├── / (Homepage)
│   ├── /about/
│   │   ├── /team/
│   │   ├── /process/
│   │   ├── /certifications/
│   │   ├── /careers/
│   │   └── /community/
│   ├── /contact/
│   ├── /gallery/
│   │   ├── /before-after.html
│   │   ├── /design-inspiration.html
│   │   ├── /drone-views.html
│   │   ├── /night-gallery.html
│   │   └── /outdoor-living.html
│   ├── /testimonials/
│   ├── /reviews/
│   │   ├── /google-reviews.html
│   │   ├── /video-testimonials.html
│   │   ├── /success-stories.html
│   │   └── /awards-recognition.html
│   ├── /faq/
│   ├── /faq-comprehensive.html
│   └── /financing/
│       ├── /payment-calculator.html
│       ├── /roi-investment.html
│       ├── /home-equity.html
│       ├── /0-percent-financing.html
│       ├── /pool-loans.html
│       └── /budget-planning.html
│
├── POOLS (Product Hub)
│   ├── /pools/
│   ├── /pools/fiberglass/
│   │   └── [30+ location-specific pages]
│   ├── /pools/concrete/
│   ├── /pools/plunge/
│   ├── /pools/catalog/
│   ├── /pools/brands/
│   │   ├── /latham/
│   │   │   ├── /models.html
│   │   │   ├── /colors.html
│   │   │   └── /warranty.html
│   │   └── /thursday/
│   │       ├── /models.html
│   │       ├── /colors.html
│   │       └── /warranty.html
│   ├── /pools/shapes/
│   │   ├── /rectangular.html
│   │   ├── /kidney.html
│   │   ├── /freeform.html
│   │   ├── /roman-grecian.html
│   │   └── /plunge-pools.html
│   ├── /pools/sizes/
│   │   ├── /small.html
│   │   ├── /medium.html
│   │   └── /large.html
│   └── /pools/features/
│       ├── /tanning-ledge.html
│       ├── /beach-entry.html
│       └── /built-in-spa.html
│
├── SERVICES
│   ├── /services/
│   ├── /services/fiberglass-pool-installation.html
│   ├── /services/pool-features.html
│   ├── /services/outdoor-living.html
│   ├── /services/pool-renovation.html
│   ├── /services/maintenance-plans.html
│   ├── /services/pool-opening/
│   ├── /services/pool-closing/
│   ├── /services/weekly-maintenance/
│   ├── /services/equipment-repair/
│   ├── /services/water-testing/
│   └── /pool-maintenance/
│
├── FEATURES & ADD-ONS
│   ├── /features/
│   ├── /features/automation.html
│   ├── /features/cleaning-systems.html
│   ├── /features/covers.html
│   ├── /features/decking.html
│   ├── /features/fountains.html
│   ├── /features/handrails.html
│   ├── /features/heating.html
│   ├── /features/led-lighting.html
│   ├── /features/salt-systems.html
│   ├── /features/slides.html
│   └── /features/waterfalls.html
│
├── LOCATIONS (Geo-Targeting Hub)
│   ├── /locations/pennsylvania/
│   ├── /locations/delaware/
│   ├── Pennsylvania Counties
│   │   ├── /locations/chester-county-pa/
│   │   ├── /locations/delaware-county-pa/
│   │   └── /locations/montgomery-county-pa/
│   ├── Delaware Counties
│   │   └── /locations/new-castle-county-de/
│   ├── Pennsylvania Towns (12+)
│   │   ├── /locations/gladwyne-pa/
│   │   ├── /locations/villanova-pa/
│   │   ├── /locations/bryn-mawr-pa/
│   │   ├── /locations/wayne-pa/
│   │   ├── /locations/haverford-pa/
│   │   ├── /locations/radnor-pa/
│   │   ├── /locations/malvern-pa/
│   │   ├── /locations/west-chester-pa/
│   │   ├── /locations/newtown-square-pa/
│   │   ├── /locations/media-pa/
│   │   ├── /locations/ardmore-pa/
│   │   └── /locations/berwyn-pa/
│   └── Delaware Towns (8+)
│       ├── /locations/hockessin-de/
│       ├── /locations/greenville-de/
│       ├── /locations/wilmington-de/
│       ├── /locations/centreville-de/
│       ├── /locations/pike-creek-de/
│       ├── /locations/newark-de/
│       ├── /locations/yorklyn-de/
│       └── /locations/montchanin-de/
│
├── NEIGHBORHOODS (Hyper-Local Pages)
│   ├── /neighborhoods/
│   ├── /neighborhoods/alapocas.html
│   ├── /neighborhoods/berwyn.html
│   ├── /neighborhoods/chateau-country.html
│   ├── /neighborhoods/daylesford.html
│   ├── /neighborhoods/fairfax.html
│   ├── /neighborhoods/ithan.html
│   ├── /neighborhoods/merion-station.html
│   ├── /neighborhoods/rockland.html
│   ├── /neighborhoods/rosemont.html
│   ├── /neighborhoods/strafford.html
│   └── /neighborhoods/wynnewood.html
│
├── FIBERGLASS POOLS BY LOCATION (30+ pages)
│   ├── /pools/fiberglass/gladwyne-pa/
│   ├── /pools/fiberglass/villanova-pa/
│   ├── /pools/fiberglass/west-chester-pa/
│   ├── /pools/fiberglass/bryn-mawr-pa/
│   ├── /pools/fiberglass/wayne-pa/
│   ├── /pools/fiberglass/haverford-pa/
│   ├── /pools/fiberglass/radnor-pa/
│   ├── /pools/fiberglass/malvern-pa/
│   ├── /pools/fiberglass/media-pa/
│   ├── /pools/fiberglass/ardmore-pa/
│   ├── /pools/fiberglass/newtown-square-pa/
│   ├── /pools/fiberglass/chester-county-pa/
│   ├── /pools/fiberglass/lower-merion-pa/
│   ├── /pools/fiberglass/easttown-pa/
│   ├── /pools/fiberglass/tredyffrin-pa/
│   ├── /pools/fiberglass/chadds-ford-pa/
│   ├── /pools/fiberglass/swarthmore-pa/
│   ├── /pools/fiberglass/narberth-pa/
│   ├── /pools/fiberglass/devon-pa/
│   ├── /pools/fiberglass/paoli-pa/
│   ├── /pools/fiberglass/willistown-pa/
│   ├── /pools/fiberglass/hockessin-de/
│   ├── /pools/fiberglass/greenville-de/
│   ├── /pools/fiberglass/wilmington-de/
│   ├── /pools/fiberglass/pike-creek-de/
│   ├── /pools/fiberglass/newark-de/
│   ├── /pools/fiberglass/north-wilmington-de/
│   └── /pools/fiberglass/middletown-de/
│
├── BLOG (Content Hub)
│   ├── /blog/
│   └── [40+ blog articles - see full inventory below]
│
├── COMPARE (Decision Support)
│   ├── /compare/
│   ├── /compare/fiberglass-vs-gunite.html
│   ├── /compare/fiberglass-vs-vinyl.html
│   ├── /compare/above-ground-vs-inground.html
│   ├── /compare/saltwater-vs-chlorine.html
│   ├── /compare/diy-vs-professional.html
│   ├── /compare/local-vs-national-detailed.html
│   ├── /compare/new-pool-vs-renovation.html
│   ├── /compare/pool-vs-hot-tub.html
│   ├── /compare/investment-comparison.html
│   └── /compare/latham-vs-thursday-pools.html
│
├── TOOLS (Interactive)
│   ├── /tools/
│   ├── /tools/pool-calculator/
│   ├── /tools/pool-cost-calculator.html
│   ├── /tools/financing-calculator/
│   ├── /tools/compare-pools/
│   ├── /tools/timeline/
│   ├── /tools/pool-quiz/
│   ├── /tools/pool-quiz.html
│   ├── /tools/pool-size-guide.html
│   ├── /tools/maintenance-cost-calculator.html
│   └── /tools/roi-calculator.html
│
├── RESOURCES (Educational)
│   ├── /resources/
│   ├── /resources/pool-buyers-guide/
│   ├── /resources/pool-buying-guide.html
│   ├── /resources/pool-planning-checklist/
│   │   └── /checklist.html
│   ├── /resources/checklist-downloads.html
│   ├── /resources/glossary.html
│   ├── /resources/local-regulations.html
│   ├── /resources/maintenance-tips.html
│   ├── /resources/seasonal-care.html
│   ├── /resources/troubleshooting.html
│   ├── /resources/video-library.html
│   └── /resources/water-chemistry.html
│
├── PORTFOLIO (Case Studies)
│   ├── /portfolio/
│   ├── /portfolio/gladwyne-luxury-estate/
│   ├── /portfolio/villanova-challenging-terrain/
│   ├── /portfolio/west-chester-family-pool/
│   ├── /portfolio/bryn-mawr-plunge-pool/
│   ├── /portfolio/hockessin-modern-pool/
│   ├── /portfolio/wilmington-backyard-transformation/
│   ├── /portfolio/wayne-pool-replacement/
│   └── /portfolio/malvern-quick-install/
│
├── LANDING PAGES (Campaign-Specific)
│   ├── /landing/fiberglass-vs-concrete.html
│   ├── /landing/pool-cost-guide.html
│   ├── /landing/spring-special.html
│   └── /landing/free-consultation.html
│
├── LEGACY LOCATION PAGES
│   ├── /gladwyne-pa.html
│   ├── /villanova-pa.html
│   └── /hockessin-de.html
│
└── LEGAL & UTILITY
    ├── /privacy-policy/
    ├── /terms-of-service/
    ├── /robots.txt
    ├── /sitemap.xml
    └── /sitemap-images.xml
```

### URL Hierarchy Strategy

| Level | Pattern | Example | Purpose |
|-------|---------|---------|---------|
| L1 | /category/ | /pools/ | Main category hub |
| L2 | /category/type/ | /pools/fiberglass/ | Subcategory/type page |
| L3 | /category/type/location/ | /pools/fiberglass/gladwyne-pa/ | Geo-targeted service page |
| L1 | /blog/ | /blog/ | Blog index |
| L2 | /blog/slug.html | /blog/fiberglass-vs-concrete-pools.html | Blog article |

### Navigation Structure

**Primary Navigation:**
```
Home | Pools > | Services > | Gallery | About > | Contact

Pools Dropdown:
├── Fiberglass Pools
├── Concrete Pools
├── Plunge Pools
├── Pool Catalog
├── Compare Options
└── Pool Features

Services Dropdown:
├── Pool Installation
├── Pool Maintenance
├── Pool Opening
├── Pool Closing
├── Equipment Repair
└── Water Testing

About Dropdown:
├── About Us
├── Our Team
├── Our Process
├── Reviews & Awards
└── Careers
```

**Footer Navigation:**
```
Services | Locations | Resources | Company | Legal
```

---

## 2. Page Inventory

### Complete Page List with SEO Data

#### Core Pages

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| / | Homepage | Landing | pool installation main line pa | LocalBusiness, Service | 1.0 |
| /about/ | About Us | Info | pool company main line pa | AboutPage | 0.8 |
| /about/team/ | Our Team | Info | pool builders main line | AboutPage | 0.6 |
| /about/process/ | Our Process | Info | pool installation process | HowTo | 0.6 |
| /about/certifications/ | Certifications | Info | certified pool installers | Organization | 0.5 |
| /about/careers/ | Careers | Info | pool installer jobs pa | JobPosting | 0.4 |
| /about/community/ | Community | Info | local pool company | Organization | 0.4 |
| /contact/ | Contact Us | Conversion | pool consultation main line | ContactPage | 0.9 |
| /faq/ | FAQ | Info | pool installation faq | FAQPage | 0.8 |
| /faq-comprehensive.html | Full FAQ | Info | pool questions answered | FAQPage | 0.7 |
| /testimonials/ | Testimonials | Trust | pool reviews main line pa | Review | 0.7 |
| /gallery/ | Gallery | Showcase | pool gallery main line | ImageGallery | 0.8 |
| /gallery/before-after.html | Before & After | Showcase | pool transformation photos | ImageGallery | 0.6 |
| /gallery/design-inspiration.html | Design Inspiration | Showcase | pool design ideas | ImageGallery | 0.6 |
| /gallery/drone-views.html | Drone Views | Showcase | aerial pool photos | ImageGallery | 0.5 |
| /gallery/night-gallery.html | Night Gallery | Showcase | pool lighting photos | ImageGallery | 0.5 |
| /gallery/outdoor-living.html | Outdoor Living | Showcase | outdoor living spaces | ImageGallery | 0.5 |

#### Pool Types (High Priority Product Pages)

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /pools/ | Pool Types Overview | Hub | inground pools pa de | Product | 0.9 |
| /pools/fiberglass/ | Fiberglass Pools | Product | fiberglass pool installation pa | Product | 0.9 |
| /pools/concrete/ | Concrete Pools | Product | concrete pool builders pa | Product | 0.9 |
| /pools/plunge/ | Plunge Pools | Product | plunge pool installation pa | Product | 0.9 |
| /pools/catalog/ | Pool Catalog | Product | pool models available | ItemList | 0.7 |

#### Pool Brands

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /pools/brands/ | Pool Brands | Hub | fiberglass pool brands | ItemList | 0.7 |
| /pools/brands/latham/ | Latham Pools | Product | latham pools dealer pa | Product | 0.7 |
| /pools/brands/latham/models.html | Latham Models | Product | latham pool models | Product | 0.6 |
| /pools/brands/latham/colors.html | Latham Colors | Product | latham pool colors | Product | 0.5 |
| /pools/brands/latham/warranty.html | Latham Warranty | Info | latham pool warranty | WarrantyInfo | 0.5 |
| /pools/brands/thursday/ | Thursday Pools | Product | thursday pools dealer | Product | 0.7 |
| /pools/brands/thursday/models.html | Thursday Models | Product | thursday pool models | Product | 0.6 |
| /pools/brands/thursday/colors.html | Thursday Colors | Product | thursday pool colors | Product | 0.5 |
| /pools/brands/thursday/warranty.html | Thursday Warranty | Info | thursday pool warranty | WarrantyInfo | 0.5 |

#### Pool Shapes & Sizes

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /pools/shapes/rectangular.html | Rectangular Pools | Product | rectangular pool installation | Product | 0.6 |
| /pools/shapes/kidney.html | Kidney Pools | Product | kidney shaped pool | Product | 0.6 |
| /pools/shapes/freeform.html | Freeform Pools | Product | freeform pool designs | Product | 0.6 |
| /pools/shapes/roman-grecian.html | Roman/Grecian Pools | Product | roman grecian pool | Product | 0.6 |
| /pools/shapes/plunge-pools.html | Plunge Pool Shapes | Product | small plunge pool | Product | 0.6 |
| /pools/sizes/small.html | Small Pools | Product | small backyard pools | Product | 0.6 |
| /pools/sizes/medium.html | Medium Pools | Product | medium size pool | Product | 0.6 |
| /pools/sizes/large.html | Large Pools | Product | large family pool | Product | 0.6 |

#### Pool Features (Built-in)

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /pools/features/tanning-ledge.html | Tanning Ledge | Feature | pool tanning ledge | Product | 0.6 |
| /pools/features/beach-entry.html | Beach Entry | Feature | beach entry pool | Product | 0.6 |
| /pools/features/built-in-spa.html | Built-in Spa | Feature | pool with built-in spa | Product | 0.6 |

#### Services

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /services/ | All Services | Hub | pool services pa de | Service | 0.9 |
| /services/fiberglass-pool-installation.html | Fiberglass Installation | Service | fiberglass pool install | Service | 0.8 |
| /services/pool-features.html | Pool Features | Service | pool feature installation | Service | 0.7 |
| /services/outdoor-living.html | Outdoor Living | Service | outdoor living design | Service | 0.7 |
| /services/pool-renovation.html | Pool Renovation | Service | pool renovation pa | Service | 0.7 |
| /services/maintenance-plans.html | Maintenance Plans | Service | pool maintenance plans | Service | 0.7 |
| /services/pool-opening/ | Pool Opening | Service | pool opening service | Service | 0.7 |
| /services/pool-closing/ | Pool Closing | Service | pool winterization | Service | 0.7 |
| /services/weekly-maintenance/ | Weekly Maintenance | Service | weekly pool maintenance | Service | 0.7 |
| /services/equipment-repair/ | Equipment Repair | Service | pool equipment repair | Service | 0.6 |
| /services/water-testing/ | Water Testing | Service | pool water testing | Service | 0.6 |
| /pool-maintenance/ | Pool Maintenance | Hub | pool maintenance main line | Service | 0.8 |

#### Features & Add-ons (Equipment/Upgrades)

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /features/ | Pool Features | Hub | pool features upgrades | ItemList | 0.7 |
| /features/automation.html | Pool Automation | Feature | pool automation systems | Product | 0.6 |
| /features/cleaning-systems.html | Cleaning Systems | Feature | automatic pool cleaners | Product | 0.6 |
| /features/covers.html | Pool Covers | Feature | pool covers pa | Product | 0.6 |
| /features/decking.html | Pool Decking | Feature | pool deck installation | Product | 0.6 |
| /features/fountains.html | Fountains | Feature | pool fountains | Product | 0.6 |
| /features/handrails.html | Handrails | Feature | pool handrails | Product | 0.5 |
| /features/heating.html | Pool Heating | Feature | pool heaters pa | Product | 0.6 |
| /features/led-lighting.html | LED Lighting | Feature | pool led lights | Product | 0.6 |
| /features/salt-systems.html | Salt Systems | Feature | saltwater pool systems | Product | 0.6 |
| /features/slides.html | Pool Slides | Feature | pool slides | Product | 0.5 |
| /features/waterfalls.html | Waterfalls | Feature | pool waterfall features | Product | 0.6 |

#### Financing

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /financing/ | Pool Financing | Hub | pool financing pa | FinancialProduct | 0.7 |
| /financing/payment-calculator.html | Payment Calculator | Tool | pool payment calculator | WebApplication | 0.6 |
| /financing/roi-investment.html | ROI & Investment | Info | pool home value roi | Article | 0.6 |
| /financing/home-equity.html | Home Equity Options | Info | home equity pool financing | FinancialProduct | 0.6 |
| /financing/0-percent-financing.html | 0% Financing | Info | 0% pool financing | Offer | 0.6 |
| /financing/pool-loans.html | Pool Loans | Info | pool loans pa | FinancialProduct | 0.6 |
| /financing/budget-planning.html | Budget Planning | Info | pool budget guide | Article | 0.6 |

#### Reviews

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /reviews/ | Reviews Hub | Trust | pool reviews main line | AggregateRating | 0.7 |
| /reviews/google-reviews.html | Google Reviews | Trust | google reviews pool company | Review | 0.6 |
| /reviews/video-testimonials.html | Video Testimonials | Trust | pool customer videos | VideoObject | 0.6 |
| /reviews/success-stories.html | Success Stories | Trust | pool installation stories | Article | 0.6 |
| /reviews/awards-recognition.html | Awards | Trust | best pool company awards | Award | 0.5 |

#### Location Pages - States

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /locations/pennsylvania/ | Pennsylvania Pools | Location | pool installation pennsylvania | LocalBusiness | 0.8 |
| /locations/delaware/ | Delaware Pools | Location | pool installation delaware | LocalBusiness | 0.8 |

#### Location Pages - Counties

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /locations/chester-county-pa/ | Chester County | Location | pool builders chester county | LocalBusiness | 0.7 |
| /locations/delaware-county-pa/ | Delaware County PA | Location | pool builders delaware county pa | LocalBusiness | 0.7 |
| /locations/montgomery-county-pa/ | Montgomery County | Location | pool builders montgomery county | LocalBusiness | 0.7 |
| /locations/new-castle-county-de/ | New Castle County | Location | pool builders new castle county | LocalBusiness | 0.7 |

#### Location Pages - Pennsylvania Towns

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /locations/gladwyne-pa/ | Gladwyne PA | Location | pool builders gladwyne pa | LocalBusiness | 0.7 |
| /locations/villanova-pa/ | Villanova PA | Location | pool builders villanova pa | LocalBusiness | 0.7 |
| /locations/bryn-mawr-pa/ | Bryn Mawr PA | Location | pool builders bryn mawr | LocalBusiness | 0.7 |
| /locations/wayne-pa/ | Wayne PA | Location | pool builders wayne pa | LocalBusiness | 0.6 |
| /locations/haverford-pa/ | Haverford PA | Location | pool builders haverford | LocalBusiness | 0.6 |
| /locations/radnor-pa/ | Radnor PA | Location | pool builders radnor | LocalBusiness | 0.6 |
| /locations/malvern-pa/ | Malvern PA | Location | pool builders malvern | LocalBusiness | 0.6 |
| /locations/west-chester-pa/ | West Chester PA | Location | pool builders west chester | LocalBusiness | 0.6 |
| /locations/newtown-square-pa/ | Newtown Square PA | Location | pool builders newtown square | LocalBusiness | 0.6 |
| /locations/media-pa/ | Media PA | Location | pool builders media pa | LocalBusiness | 0.6 |
| /locations/ardmore-pa/ | Ardmore PA | Location | pool builders ardmore | LocalBusiness | 0.6 |
| /locations/berwyn-pa/ | Berwyn PA | Location | pool builders berwyn | LocalBusiness | 0.6 |

#### Location Pages - Delaware Towns

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /locations/hockessin-de/ | Hockessin DE | Location | pool builders hockessin de | LocalBusiness | 0.7 |
| /locations/greenville-de/ | Greenville DE | Location | pool builders greenville de | LocalBusiness | 0.6 |
| /locations/wilmington-de/ | Wilmington DE | Location | pool builders wilmington | LocalBusiness | 0.6 |
| /locations/centreville-de/ | Centreville DE | Location | pool builders centreville de | LocalBusiness | 0.6 |
| /locations/pike-creek-de/ | Pike Creek DE | Location | pool builders pike creek | LocalBusiness | 0.6 |
| /locations/newark-de/ | Newark DE | Location | pool builders newark de | LocalBusiness | 0.6 |
| /locations/yorklyn-de/ | Yorklyn DE | Location | pool builders yorklyn | LocalBusiness | 0.5 |
| /locations/montchanin-de/ | Montchanin DE | Location | pool builders montchanin | LocalBusiness | 0.5 |

#### Neighborhoods (Hyper-Local)

| URL | Page Title | Type | Primary Keyword | Schema Type | Priority |
|-----|------------|------|-----------------|-------------|----------|
| /neighborhoods/ | Neighborhoods Hub | Location | main line neighborhoods | Place | 0.6 |
| /neighborhoods/alapocas.html | Alapocas | Location | pool builders alapocas | LocalBusiness | 0.5 |
| /neighborhoods/berwyn.html | Berwyn | Location | pool installation berwyn | LocalBusiness | 0.5 |
| /neighborhoods/chateau-country.html | Chateau Country | Location | chateau country pools | LocalBusiness | 0.5 |
| /neighborhoods/daylesford.html | Daylesford | Location | daylesford pool builders | LocalBusiness | 0.5 |
| /neighborhoods/fairfax.html | Fairfax | Location | fairfax wilmington pools | LocalBusiness | 0.5 |
| /neighborhoods/ithan.html | Ithan | Location | ithan pool installation | LocalBusiness | 0.5 |
| /neighborhoods/merion-station.html | Merion Station | Location | merion station pools | LocalBusiness | 0.5 |
| /neighborhoods/rockland.html | Rockland | Location | rockland de pool builders | LocalBusiness | 0.5 |
| /neighborhoods/rosemont.html | Rosemont | Location | rosemont pa pools | LocalBusiness | 0.5 |
| /neighborhoods/strafford.html | Strafford | Location | strafford pool builders | LocalBusiness | 0.5 |
| /neighborhoods/wynnewood.html | Wynnewood | Location | wynnewood pool installation | LocalBusiness | 0.5 |

#### Fiberglass Pools by Location (30 pages)

| URL | Primary Keyword | Priority |
|-----|-----------------|----------|
| /pools/fiberglass/gladwyne-pa/ | fiberglass pool gladwyne pa | 0.6 |
| /pools/fiberglass/villanova-pa/ | fiberglass pool villanova | 0.6 |
| /pools/fiberglass/west-chester-pa/ | fiberglass pool west chester | 0.6 |
| /pools/fiberglass/bryn-mawr-pa/ | fiberglass pool bryn mawr | 0.6 |
| /pools/fiberglass/wayne-pa/ | fiberglass pool wayne pa | 0.6 |
| /pools/fiberglass/haverford-pa/ | fiberglass pool haverford | 0.6 |
| /pools/fiberglass/radnor-pa/ | fiberglass pool radnor | 0.6 |
| /pools/fiberglass/malvern-pa/ | fiberglass pool malvern | 0.6 |
| /pools/fiberglass/media-pa/ | fiberglass pool media pa | 0.6 |
| /pools/fiberglass/ardmore-pa/ | fiberglass pool ardmore | 0.6 |
| /pools/fiberglass/newtown-square-pa/ | fiberglass pool newtown square | 0.6 |
| /pools/fiberglass/chester-county-pa/ | fiberglass pool chester county | 0.6 |
| /pools/fiberglass/lower-merion-pa/ | fiberglass pool lower merion | 0.6 |
| /pools/fiberglass/easttown-pa/ | fiberglass pool easttown | 0.6 |
| /pools/fiberglass/tredyffrin-pa/ | fiberglass pool tredyffrin | 0.6 |
| /pools/fiberglass/chadds-ford-pa/ | fiberglass pool chadds ford | 0.6 |
| /pools/fiberglass/swarthmore-pa/ | fiberglass pool swarthmore | 0.6 |
| /pools/fiberglass/narberth-pa/ | fiberglass pool narberth | 0.5 |
| /pools/fiberglass/devon-pa/ | fiberglass pool devon pa | 0.5 |
| /pools/fiberglass/paoli-pa/ | fiberglass pool paoli | 0.5 |
| /pools/fiberglass/willistown-pa/ | fiberglass pool willistown | 0.5 |
| /pools/fiberglass/hockessin-de/ | fiberglass pool hockessin | 0.6 |
| /pools/fiberglass/greenville-de/ | fiberglass pool greenville de | 0.6 |
| /pools/fiberglass/wilmington-de/ | fiberglass pool wilmington | 0.6 |
| /pools/fiberglass/pike-creek-de/ | fiberglass pool pike creek | 0.5 |
| /pools/fiberglass/newark-de/ | fiberglass pool newark de | 0.5 |
| /pools/fiberglass/north-wilmington-de/ | fiberglass pool north wilmington | 0.5 |
| /pools/fiberglass/middletown-de/ | fiberglass pool middletown de | 0.5 |

#### Blog Posts (40+ articles)

| URL | Primary Keyword | Priority |
|-----|-----------------|----------|
| /blog/ | pool blog main line | 0.7 |
| /blog/how-much-does-pool-cost-pennsylvania.html | pool cost pennsylvania | 0.8 |
| /blog/fiberglass-vs-concrete-pools.html | fiberglass vs concrete | 0.8 |
| /blog/best-time-to-install-pool.html | best time install pool | 0.7 |
| /blog/best-time-install-pool-pennsylvania.html | when to install pool pa | 0.7 |
| /blog/pool-installation-process-what-to-expect.html | pool installation process | 0.7 |
| /blog/plunge-pools-small-backyard-solution.html | plunge pools small backyard | 0.7 |
| /blog/pool-maintenance-cost-guide.html | pool maintenance cost | 0.7 |
| /blog/pool-builders-main-line-pa-guide.html | pool builders main line | 0.7 |
| /blog/fiberglass-pool-maintenance-complete-guide.html | fiberglass pool maintenance | 0.7 |
| /blog/how-long-does-fiberglass-pool-installation-take.html | fiberglass installation time | 0.7 |
| /blog/gunite-pool-problems-switching-fiberglass.html | gunite problems fiberglass | 0.7 |
| /blog/saltwater-vs-chlorine-pools.html | saltwater vs chlorine | 0.7 |
| /blog/pool-increase-home-value-pa.html | pool home value | 0.7 |
| /blog/pool-financing-options-main-line-pa.html | pool financing main line | 0.7 |
| /blog/pool-permits-delaware-county-pa.html | pool permits delaware county | 0.6 |
| /blog/pool-fencing-requirements-pa-de.html | pool fence requirements | 0.6 |
| /blog/pool-safety-features-every-parent-should-know.html | pool safety features | 0.7 |
| /blog/pool-automation-smart-technology.html | pool automation | 0.6 |
| /blog/pool-heating-options-gas-heat-pump-solar.html | pool heating options | 0.6 |
| /blog/pool-lighting-ideas-delaware.html | pool lighting ideas | 0.6 |
| /blog/pool-water-features-waterfalls-fountains.html | pool water features | 0.6 |
| /blog/pool-deck-materials-comparison.html | pool deck materials | 0.6 |
| /blog/pool-landscaping-ideas-pennsylvania.html | pool landscaping pa | 0.6 |
| /blog/energy-efficient-pool-equipment.html | energy efficient pool | 0.6 |
| /blog/winter-pool-covers-types-costs-benefits.html | winter pool covers | 0.6 |
| /blog/how-to-prepare-yard-for-pool-installation.html | prepare yard pool | 0.6 |
| /blog/how-to-choose-pool-size-family.html | choose pool size | 0.6 |
| /blog/best-fiberglass-pool-shapes-main-line-pa.html | fiberglass pool shapes | 0.6 |
| /blog/inground-pool-ideas-sloped-backyards.html | sloped backyard pool | 0.6 |
| /blog/small-backyard-pool-ideas-wayne-bryn-mawr.html | small backyard pool | 0.6 |
| /blog/adding-spa-hot-tub-fiberglass-pool.html | pool spa combo | 0.6 |
| /blog/pool-party-ideas-entertaining.html | pool party ideas | 0.5 |
| /blog/2026-pool-design-trends-main-line-pa.html | 2026 pool trends | 0.6 |
| /blog/chester-county-pool-installation.html | chester county pool | 0.6 |
| /blog/choosing-pool-installer-delaware.html | pool installer delaware | 0.6 |
| /blog/plunge-pools-vs-traditional-pools-delaware.html | plunge vs traditional pool | 0.6 |
| /blog/local-vs-national-pool-installers.html | local vs national installers | 0.6 |
| /blog/fiberglass-specialists-vs-general-contractors.html | fiberglass specialists | 0.6 |
| /blog/tri-state-vs-anthony-sylvan-comparison.html | tri-state vs anthony sylvan | 0.6 |

#### Compare Pages (Decision Support)

| URL | Primary Keyword | Priority |
|-----|-----------------|----------|
| /compare/ | pool comparison | 0.7 |
| /compare/fiberglass-vs-gunite.html | fiberglass vs gunite | 0.7 |
| /compare/fiberglass-vs-vinyl.html | fiberglass vs vinyl | 0.7 |
| /compare/above-ground-vs-inground.html | above ground vs inground | 0.7 |
| /compare/saltwater-vs-chlorine.html | saltwater vs chlorine pool | 0.7 |
| /compare/diy-vs-professional.html | diy vs professional pool | 0.6 |
| /compare/local-vs-national-detailed.html | local vs national pool company | 0.6 |
| /compare/new-pool-vs-renovation.html | new pool vs renovation | 0.6 |
| /compare/pool-vs-hot-tub.html | pool vs hot tub | 0.6 |
| /compare/investment-comparison.html | pool investment comparison | 0.6 |
| /compare/latham-vs-thursday-pools.html | latham vs thursday pools | 0.6 |

#### Tools (Interactive)

| URL | Primary Keyword | Schema Type | Priority |
|-----|-----------------|-------------|----------|
| /tools/ | pool tools calculators | WebApplication | 0.7 |
| /tools/pool-calculator/ | pool cost calculator | WebApplication | 0.7 |
| /tools/pool-cost-calculator.html | pool cost estimator | WebApplication | 0.7 |
| /tools/financing-calculator/ | pool financing calculator | WebApplication | 0.6 |
| /tools/compare-pools/ | pool comparison tool | WebApplication | 0.6 |
| /tools/timeline/ | pool installation timeline | WebApplication | 0.6 |
| /tools/pool-quiz/ | pool style quiz | WebApplication | 0.6 |
| /tools/pool-quiz.html | find your pool quiz | WebApplication | 0.6 |
| /tools/pool-size-guide.html | pool size guide | WebApplication | 0.6 |
| /tools/maintenance-cost-calculator.html | maintenance cost calculator | WebApplication | 0.6 |
| /tools/roi-calculator.html | pool roi calculator | WebApplication | 0.6 |

#### Resources (Educational)

| URL | Primary Keyword | Priority |
|-----|-----------------|----------|
| /resources/ | pool resources | 0.6 |
| /resources/pool-buyers-guide/ | pool buyers guide | 0.6 |
| /resources/pool-buying-guide.html | buying a pool guide | 0.6 |
| /resources/pool-planning-checklist/ | pool planning checklist | 0.6 |
| /resources/pool-planning-checklist/checklist.html | pool checklist pdf | 0.5 |
| /resources/checklist-downloads.html | pool checklists download | 0.5 |
| /resources/glossary.html | pool terminology glossary | 0.5 |
| /resources/local-regulations.html | pool permit regulations | 0.6 |
| /resources/maintenance-tips.html | pool maintenance tips | 0.6 |
| /resources/seasonal-care.html | seasonal pool care | 0.5 |
| /resources/troubleshooting.html | pool troubleshooting | 0.5 |
| /resources/video-library.html | pool installation videos | 0.5 |
| /resources/water-chemistry.html | pool water chemistry | 0.5 |

#### Portfolio (Case Studies)

| URL | Primary Keyword | Priority |
|-----|-----------------|----------|
| /portfolio/ | pool projects portfolio | 0.7 |
| /portfolio/gladwyne-luxury-estate/ | gladwyne pool project | 0.6 |
| /portfolio/villanova-challenging-terrain/ | villanova pool installation | 0.6 |
| /portfolio/west-chester-family-pool/ | west chester pool | 0.6 |
| /portfolio/bryn-mawr-plunge-pool/ | bryn mawr plunge pool | 0.6 |
| /portfolio/hockessin-modern-pool/ | hockessin pool | 0.6 |
| /portfolio/wilmington-backyard-transformation/ | wilmington pool | 0.6 |
| /portfolio/wayne-pool-replacement/ | wayne pool replacement | 0.5 |
| /portfolio/malvern-quick-install/ | malvern pool installation | 0.5 |

#### Landing Pages

| URL | Primary Keyword | Priority |
|-----|-----------------|----------|
| /landing/fiberglass-vs-concrete.html | fiberglass concrete comparison | 0.6 |
| /landing/pool-cost-guide.html | pool cost guide 2026 | 0.6 |
| /landing/spring-special.html | spring pool special | 0.5 |
| /landing/free-consultation.html | free pool consultation | 0.6 |

#### Legal Pages

| URL | Priority |
|-----|----------|
| /privacy-policy/ | 0.3 |
| /terms-of-service/ | 0.3 |

---

## 3. Content Hub Strategy

### Blog Category Structure

**Recommended Categories:**

1. **Pool Types & Options**
   - Fiberglass vs Concrete
   - Plunge Pools
   - Pool Shapes & Sizes

2. **Cost & Financing**
   - Pool Cost Guides
   - Financing Options
   - ROI & Home Value

3. **Installation & Planning**
   - Installation Process
   - Best Time to Install
   - Preparing Your Yard
   - Permits & Regulations

4. **Maintenance & Care**
   - Maintenance Guides
   - Seasonal Care
   - Water Chemistry

5. **Features & Upgrades**
   - Pool Automation
   - Heating Options
   - Lighting & Water Features

6. **Design & Inspiration**
   - Design Trends
   - Landscaping Ideas
   - Small Backyard Solutions

7. **Local Guides**
   - Main Line PA
   - Delaware
   - County-Specific

### Resource Center Organization

```
/resources/
├── Getting Started
│   ├── Pool Buyers Guide
│   ├── Planning Checklist
│   └── What to Expect
├── Educational
│   ├── Glossary
│   ├── Video Library
│   └── Water Chemistry
├── Maintenance
│   ├── Maintenance Tips
│   ├── Seasonal Care
│   └── Troubleshooting
└── Local Info
    └── Regulations & Permits
```

### Service Page Hierarchy

```
/services/ (Hub - all services overview)
├── Installation Services
│   ├── Fiberglass Pool Installation
│   ├── Pool Features Installation
│   └── Outdoor Living
├── Maintenance Services
│   ├── Weekly Maintenance
│   ├── Pool Opening
│   ├── Pool Closing
│   └── Maintenance Plans
├── Repair Services
│   ├── Equipment Repair
│   └── Pool Renovation
└── Testing Services
    └── Water Testing
```

### Location Page Strategy

**Three-Tier Location Structure:**

1. **State Level** (Priority 0.8)
   - Pennsylvania overview
   - Delaware overview
   - Broad geographic targeting

2. **County Level** (Priority 0.7)
   - Chester County
   - Delaware County PA
   - Montgomery County
   - New Castle County DE

3. **Town/City Level** (Priority 0.6-0.7)
   - Individual municipalities
   - Hyper-local SEO targeting

**Service + Location Combination Pages:**
- /pools/fiberglass/[location]/ pattern
- Creates 30+ additional geo-targeted pages
- Example: /pools/fiberglass/gladwyne-pa/

**Neighborhood Pages (Priority 0.5):**
- Ultra-local targeting for affluent areas
- Main Line PA neighborhoods
- Chateau Country DE

---

## 4. Technical SEO Checklist

### Canonical URLs

**Implementation Rules:**
- All pages should have self-referencing canonical tags
- Trailing slashes: Use consistently (recommended: with trailing slash for directories)
- HTTP/HTTPS: Always canonical to HTTPS
- www/non-www: Canonical to non-www

**Example:**
```html
<link rel="canonical" href="https://tristateaquaticsolutions.com/pools/fiberglass/" />
```

**Potential Duplicate Content Issues:**
- /tools/pool-quiz/ and /tools/pool-quiz.html
- /tools/pool-calculator/ and /tools/pool-cost-calculator.html
- Legacy location pages (/gladwyne-pa.html) vs new structure (/locations/gladwyne-pa/)

**Recommendation:** Add canonical tags pointing from legacy to new URLs.

### Hreflang

**Current Status:** Not applicable - single language/region site

**If Expanding:**
```html
<link rel="alternate" hreflang="en-US" href="https://tristateaquaticsolutions.com/pools/" />
```

### Robots.txt Recommendations

Current robots.txt is well-configured. Additional recommendations:

```txt
# Add crawl budget optimization
User-agent: *
Crawl-delay: 1

# Block duplicate tool pages
Disallow: /tools/pool-quiz.html
# (canonical should be /tools/pool-quiz/)

# Block component demos
Disallow: /components/

# Block landing page variants during testing
# Disallow: /landing/test-*
```

### XML Sitemap Structure

**Recommended Multi-Sitemap Approach:**

```
sitemap-index.xml
├── sitemap-main.xml (Core pages, services, pools)
├── sitemap-locations.xml (All location pages)
├── sitemap-blog.xml (All blog posts)
├── sitemap-tools.xml (Interactive tools)
├── sitemap-images.xml (Image sitemap - already exists)
└── sitemap-portfolio.xml (Case studies)
```

**Current sitemap.xml needs updates for:**
- Missing landing pages
- Missing compare pages
- Missing features pages
- Missing portfolio pages
- Missing neighborhood pages
- Missing resource subpages
- Missing review pages

### Core Web Vitals Optimization

**Priority Improvements:**

1. **Largest Contentful Paint (LCP)**
   - Preload hero images
   - Optimize image formats (WebP)
   - Use CDN for images

2. **First Input Delay (FID)**
   - Defer non-critical JavaScript
   - Minimize main thread work

3. **Cumulative Layout Shift (CLS)**
   - Set explicit image dimensions
   - Reserve space for dynamic content
   - Avoid inserting content above existing content

**Image Optimization Checklist:**
- [ ] Convert all images to WebP with fallbacks
- [ ] Implement lazy loading for below-fold images
- [ ] Add width/height attributes to all images
- [ ] Use responsive images with srcset

**Performance Budget:**
| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | TBD |
| FID | < 100ms | TBD |
| CLS | < 0.1 | TBD |
| Total Page Weight | < 2MB | TBD |

---

## 5. Internal Linking Map

### Key Pages to Link From Everywhere

**Tier 1 - Link from every page (navigation):**
- Homepage (/)
- Contact (/contact/)
- Pools Overview (/pools/)
- Services (/services/)
- Gallery (/gallery/)

**Tier 2 - Link from related content:**
- Pool Types (/pools/fiberglass/, /pools/concrete/, /pools/plunge/)
- Pool Cost Calculator (/tools/pool-calculator/)
- Free Consultation (/landing/free-consultation.html)
- FAQ (/faq/)

**Tier 3 - Contextual links:**
- Blog posts from service pages
- Location pages from relevant content
- Portfolio from pool type pages
- Compare pages from blog posts

### Contextual Linking Opportunities

**From Blog Posts:**
| Blog Topic | Link To |
|------------|---------|
| Pool Cost articles | /tools/pool-calculator/, /financing/ |
| Fiberglass content | /pools/fiberglass/, /compare/fiberglass-vs-gunite.html |
| Maintenance articles | /services/weekly-maintenance/, /pool-maintenance/ |
| Location mentions | Relevant /locations/ pages |
| Installation process | /about/process/, /tools/timeline/ |

**From Pool Type Pages:**
| From Page | Link To |
|-----------|---------|
| /pools/fiberglass/ | Relevant blog posts, financing, location pages, brands |
| /pools/concrete/ | Compare pages, portfolio, blog posts |
| /pools/plunge/ | Small backyard blog, compare pages, features |

**From Location Pages:**
| From Page | Link To |
|-----------|---------|
| /locations/[town]/ | Portfolio in that area, local blog posts |
| /locations/[county]/ | Towns within county, local regulations |
| /pools/fiberglass/[location]/ | Main fiberglass page, gallery, testimonials |

### Breadcrumb Structure

**Implementation Pattern:**
```
Home > [Category] > [Subcategory] > [Page]
```

**Examples:**
```
Home > Pools > Fiberglass Pools
Home > Pools > Fiberglass Pools > Gladwyne PA
Home > Blog > How Much Does a Pool Cost in PA
Home > Services > Pool Opening
Home > Locations > Pennsylvania > Gladwyne PA
Home > Resources > Pool Buyers Guide
Home > Portfolio > Gladwyne Luxury Estate
```

**Schema Markup for Breadcrumbs:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://tristateaquaticsolutions.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pools",
      "item": "https://tristateaquaticsolutions.com/pools/"
    }
  ]
}
```

### Related Content Linking

**Footer Related Links Pattern:**
```html
<section class="related-content">
  <h3>Related Services</h3>
  <ul>
    <li><a href="/services/pool-opening/">Pool Opening</a></li>
    <li><a href="/services/weekly-maintenance/">Weekly Maintenance</a></li>
  </ul>

  <h3>Helpful Resources</h3>
  <ul>
    <li><a href="/blog/best-time-to-install-pool.html">Best Time to Install</a></li>
    <li><a href="/tools/pool-calculator/">Cost Calculator</a></li>
  </ul>

  <h3>Service Areas</h3>
  <ul>
    <li><a href="/locations/gladwyne-pa/">Gladwyne PA</a></li>
    <li><a href="/locations/villanova-pa/">Villanova PA</a></li>
  </ul>
</section>
```

### Link Equity Flow Strategy

**Homepage Equity Distribution:**
```
Homepage (1.0)
├── Pools Hub (0.9) → Individual pool types (0.8-0.9)
├── Services Hub (0.9) → Individual services (0.7-0.8)
├── Gallery (0.8)
├── About (0.8)
├── Locations Hub (0.8) → States (0.7) → Towns (0.6)
└── Contact (0.9)
```

**Cross-Linking Priority Matrix:**

| Page Type | Should Link To | Priority |
|-----------|---------------|----------|
| Blog Posts | Related services, tools, locations | High |
| Service Pages | Blog posts, portfolio, testimonials | High |
| Location Pages | Portfolio, local blog, services | High |
| Pool Type Pages | Features, brands, compare, locations | High |
| Compare Pages | Related blog, pool types, tools | Medium |
| Tools | Contact, blog posts, services | High |
| Portfolio | Services, pool types, gallery | Medium |

---

## Appendix: URL Standardization Rules

1. **Trailing Slashes:** Directories use trailing slash, files (.html) do not
2. **Lowercase:** All URLs lowercase
3. **Hyphens:** Use hyphens for word separation
4. **No Underscores:** Avoid underscores in URLs
5. **Keep Short:** Aim for 3-5 words in URL path
6. **Descriptive:** URLs should indicate content

**Good:** `/pools/fiberglass/gladwyne-pa/`
**Bad:** `/pools/fiberglass_pool_installation_gladwyne_pennsylvania.html`

---

*Document maintained by Marketing Team. Update quarterly or when significant site changes occur.*
