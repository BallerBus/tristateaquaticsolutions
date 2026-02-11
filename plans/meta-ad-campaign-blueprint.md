# Meta (Facebook/Instagram) Ad Campaign Blueprint
## Tri-State Aquatic Solutions — Spring 2026 Pool Installation

**Objective:** Drive $2,500 design deposits and qualified consultations for spring/summer 2026 pool installations.

**Platforms:** Facebook + Instagram (combined via Meta Ads Manager)

**Service Area:** Main Line PA (Chester County, Delaware County, Montgomery County) + Northern Delaware (Hockessin, Greenville, Wilmington)

**Conversion Actions:**
1. Primary: $2,500 design deposit via Stripe Checkout
2. Secondary: Lead form submission (free consultation request)

---

## Campaign Architecture Overview

```
META_Conv_FamilyPool_MainLinePA_Spring2026
  ├── Ad Set 1: Aspirational Families — Core Main Line
  ├── Ad Set 2: Aspirational Families — Chester County Broader
  └── Ad Set 3: Aspirational Families — Lookalike (after data)

META_Conv_PoolReplacement_MainLinePA_Spring2026
  ├── Ad Set 1: Empty Nesters — Gladwyne/Bryn Mawr/Villanova
  ├── Ad Set 2: Empty Nesters — Broader Main Line
  └── Ad Set 3: Pool Owners 55+ — Delaware

META_Conv_WellnessPool_MainLinePA_Spring2026
  ├── Ad Set 1: Wellness/Fitness Enthusiasts — Main Line
  ├── Ad Set 2: High-Income Professionals — Wayne/Devon/Berwyn
  └── Ad Set 3: Cold Plunge Interest — Broader Region

META_Conv_LuxuryPools_MainLinePA_Spring2026
  ├── Ad Set 1: Ultra-Affluent — Gladwyne/Villanova
  ├── Ad Set 2: Luxury Homeowners — Broader Main Line
  └── Ad Set 3: Luxury Home Improvement Interest

META_Retargeting_AllPersonas_Spring2026
  ├── Ad Set 1: Website Visitors (7 days)
  ├── Ad Set 2: Website Visitors (8-30 days)
  ├── Ad Set 3: Configurator Started But Not Deposited
  └── Ad Set 4: Lead Form Submitted But Not Deposited
```

---

## Campaign 1: First Family Pool

**Campaign Name:** `META_Conv_FamilyPool_MainLinePA_Spring2026`
**Objective:** Conversions (Optimize for Lead or Purchase)
**Landing Page:** `tristateaquaticsolutions.com/landing/family-pool/`
**Budget:** 35% of total ad spend (largest audience)

### Ad Set 1: Aspirational Families — Core Main Line

**Targeting:**
- **Location:** 15-mile radius around Wayne, PA (covers Berwyn, Devon, Malvern, West Chester, Newtown Square, Media, Bryn Mawr)
- **Age:** 32-48
- **Gender:** All (but creative skews toward women — primary decision driver per research)
- **Household Income:** Top 10% (Meta's income targeting in available zip codes)
- **Detailed Targeting (AND logic):**
  - Parents with children ages 6-12 OR Parents with preteens (10-12) OR Parents with early teens (13-14)
  - AND Interest in: Home improvement, Houzz, HGTV, Better Homes & Gardens, OR Outdoor recreation
- **Exclude:** People who already follow Tri-State Aquatic Solutions page
- **Placements:** Automatic (Facebook Feed, Instagram Feed, Instagram Stories, Instagram Reels, Facebook Stories)

**Ad Creative Variations (test 3-4 per ad set):**

#### Ad 1A: Carousel — "From Swim Club to Your Backyard"
- **Format:** Carousel (4-5 cards)
- Card 1: Family at crowded swim club → "Tired of packing up the car?"
- Card 2: Beautiful backyard pool with kids → "What if summer was THIS easy?"
- Card 3: Pool at sunset with adults relaxing → "Adults-only hours start at 8pm"
- Card 4: Pool options starting at $25K → "Plunge pools from $25K. Fiberglass from $55K."
- Card 5: CTA card → "Design your pool in 5 minutes →"
- **Primary Text:** "Every summer you say 'next year.' Your kids are 12, 9, and 6. They won't be this age forever. Main Line families are booking spring 2026 installations NOW — and spots are limited. Start designing your pool today."
- **Headline:** "Your Family Deserves a Pool"
- **CTA Button:** "Learn More"
- **Link:** `/landing/family-pool/?utm_source=meta&utm_medium=cpc&utm_campaign=family-pool&utm_content=carousel-swimclub`

#### Ad 1B: Single Image — "The $800/Year Upgrade"
- **Format:** Single image (lifestyle: family in backyard pool)
- **Primary Text:** "You spend $800/year on swim club. $600 on pool vacation upgrades. $200 on water parks. That's $1,600/year — and your kids still beg to go to the neighbor's pool.\n\nA backyard pool starts at $299/month financed. That's less than your car payment.\n\nAnd in 3 years, you've saved more than you've spent — while making every summer unforgettable.\n\nSpring installation spots are booking now."
- **Headline:** "Pools Starting at $299/Month"
- **Description:** "Fiberglass installed in 3 weeks. Free consultation."
- **CTA Button:** "Get Quote"
- **Link:** `/landing/family-pool/?utm_source=meta&utm_medium=cpc&utm_campaign=family-pool&utm_content=single-monthly`

#### Ad 1C: Video (Reel/Story) — "3 Weeks to Your Own Pool"
- **Format:** Vertical video (9:16), 15-25 seconds
- **Script:**
  - [0-3s] Hook: "What if you could have a pool in 3 weeks?"
  - [3-8s] Show fiberglass pool being craned into backyard
  - [8-15s] Show family jumping in, kids playing
  - [15-22s] Text overlay: "Fiberglass pools from $55K. Installed in weeks, not months."
  - [22-25s] CTA: "Design yours → tristateaquaticsolutions.com"
- **Primary Text:** "Fiberglass pool installation in as little as 3 weeks. Main Line families are booking spring 2026 now. Design yours in 5 minutes."
- **Headline:** "3 Weeks to Your Own Pool"
- **CTA Button:** "Learn More"

#### Ad 1D: Single Image — Social Proof
- **Format:** Single image (beautiful pool with quote overlay)
- **Primary Text:** "'We wish we'd done this 5 years ago. The kids basically live outside now.' — Matt & Sarah H., Berwyn\n\nEvery family we've built for says the same thing. The only regret is waiting.\n\nPlunge pools from $25K. Fiberglass from $55K. Custom concrete from $80K.\n\nFree backyard consultations — no pressure, just possibilities."
- **Headline:** "The Only Regret Is Waiting"
- **CTA Button:** "Book Now"

### Ad Set 2: Aspirational Families — Chester County Broader

**Targeting:**
- **Location:** Chester County PA (full county) + Delaware County PA
- **Age:** 30-50
- **Household Income:** Top 25%
- **Detailed Targeting:**
  - Parents with children ages 4-17
  - AND Homeowner (behavioral)
  - AND Interest in: Swimming, Outdoor living, Home renovation
- **Same creative as Ad Set 1** (test which performs better in broader geo)

### Ad Set 3: Aspirational Families — Northern Delaware

**Targeting:**
- **Location:** Hockessin, Greenville, Wilmington, Newark DE (15-mile radius around Hockessin)
- **Age:** 32-50
- **Household Income:** Top 15%
- **Detailed Targeting:** Same as Ad Set 1
- **Creative:** Same with localized copy ("Serving Hockessin, Greenville & Northern Delaware")

---

## Campaign 2: Pool Replacement

**Campaign Name:** `META_Conv_PoolReplacement_MainLinePA_Spring2026`
**Objective:** Conversions
**Landing Page:** `tristateaquaticsolutions.com/landing/pool-replacement/`
**Budget:** 25% of total ad spend (highest-value leads)

### Ad Set 1: Empty Nesters — Gladwyne/Bryn Mawr/Villanova

**Targeting:**
- **Location:** Pin-drop radius: Gladwyne (5mi), Bryn Mawr (5mi), Villanova (5mi)
- **Age:** 52-70
- **Household Income:** Top 5%
- **Detailed Targeting:**
  - Homeowner (behavioral)
  - AND (Empty nester lifestyle OR Children ages 18+ OR Grandparents)
  - AND Interest in: Home improvement, Gardening, Outdoor living, OR Real estate
- **Exclude:** Renters (behavioral)

**Ad Creative Variations:**

#### Ad 2A: Single Image — "The $400 Swim"
- **Format:** Single image (cracked, faded old pool deck — real/stock photo of aging pool)
- **Primary Text:** "Your pool cost $45,000 in 1998. Last year you swam in it 11 times. That's $400 per swim when you factor in the $4,500/year you spend keeping it alive.\n\nThe plaster is cracked. The heater died. The deck has trip hazards. And the renovation quote? $50,000 — to make a 25-year-old pool look 'decent.'\n\nHere's an idea: remove the old pool and replace it with a modern plunge pool. Half the size. A third of the maintenance. Year-round hydrotherapy jets.\n\nTotal cost? About the same as that renovation. But you get a brand new pool.\n\nWe're the Main Line's only pool downsizing specialist."
- **Headline:** "Replace Your Old Pool — Don't Renovate It"
- **CTA Button:** "Learn More"
- **Link:** `/landing/pool-replacement/?utm_source=meta&utm_medium=cpc&utm_campaign=pool-replacement&utm_content=400swim`

#### Ad 2B: Carousel — Before/After
- **Format:** Carousel (4 cards)
- Card 1: Old cracked pool → "This used to be a showpiece"
- Card 2: Pool being demolished → "Week 1: Out with the old"
- Card 3: New plunge pool installed → "Week 4: Hello, modern luxury"
- Card 4: Beautiful finished backyard → "Week 8: A backyard you'll actually use"
- **Primary Text:** "They spent $50K renovating a 30-year-old pool. We spend $55K replacing one with a brand-new plunge pool with smart controls, hydrotherapy jets, and half the maintenance cost. The Gladwyne homeowners who made the switch aren't looking back."
- **Headline:** "Old Pool → Modern Plunge Pool in 8 Weeks"
- **CTA Button:** "Get Quote"

#### Ad 2C: Video — "The Switch"
- **Format:** Square video (1:1), 20-30 seconds
- **Script:**
  - [0-3s] Drone shot of old, faded pool from above
  - [3-5s] Text: "25 years old. $4,500/year to maintain."
  - [5-8s] Show cracked deck, stained plaster close-ups
  - [8-12s] Time-lapse: demolition, excavation
  - [12-18s] New plunge pool being installed, decking going in
  - [18-25s] Finished backyard with fire pit, plunge pool, happy couple
  - [25-30s] "Pool replacement from $35K. Free assessment."
- **Headline:** "Stop Maintaining. Start Enjoying."
- **CTA Button:** "Book Now"

### Ad Set 2: Empty Nesters — Broader Main Line + West Chester

**Targeting:**
- **Location:** Lower Merion, Radnor, Tredyffrin, Easttown, West Chester (townships)
- **Age:** 50-68
- **Household Income:** Top 10%
- **Detailed Targeting:**
  - Homeowner + Interest in: Pool maintenance, Home renovation, Landscape design
- **Same creative as Ad Set 1**

### Ad Set 3: Pool Owners 55+ — Northern Delaware

**Targeting:**
- **Location:** Northern Delaware (Hockessin, Greenville, Wilmington, Chalfonte)
- **Age:** 50-68
- **Household Income:** Top 15%
- **Detailed Targeting:** Homeowner + pool/home improvement interests
- **Creative:** Localized copy ("Serving Northern Delaware homeowners")

---

## Campaign 3: Wellness Pool

**Campaign Name:** `META_Conv_WellnessPool_MainLinePA_Spring2026`
**Objective:** Conversions
**Landing Page:** `tristateaquaticsolutions.com/landing/wellness-pool/`
**Budget:** 20% of total ad spend

### Ad Set 1: Wellness/Fitness Enthusiasts — Main Line

**Targeting:**
- **Location:** 20-mile radius around Wayne, PA
- **Age:** 35-55
- **Household Income:** Top 15%
- **Detailed Targeting:**
  - Interest in: Cold plunge, Cold water therapy, Ice bath, Wim Hof, Huberman Lab, OR Biohacking
  - OR Interest in: Yoga, Peloton, CrossFit, Running, Triathlon, Wellness
  - AND Homeowner (behavioral)
- **Placements:** Instagram Feed + Instagram Stories (primary — wellness audience is Instagram-heavy)

**Ad Creative Variations:**

#### Ad 3A: Single Image — "Your Garage Plunge Tub Deserves an Upgrade"
- **Format:** Single image (stunning outdoor plunge pool, steam rising, winter morning)
- **Primary Text:** "You bought a $5,000 plastic tub from Amazon. You fill it with ice from the gas station. You cold plunge in your garage in December.\n\nYou know it works. Your body knows it works.\n\nNow imagine: a permanent 39°F plunge pool in your backyard. Built into the ground. Heated to 102°F when you want hot. Chilled to 39°F when you want cold. Year-round. Automated. Beautiful.\n\nStarting at $35,000 installed.\n\nThis is the upgrade you've been waiting for."
- **Headline:** "Permanent Cold Plunge Pools — Installed"
- **CTA Button:** "Learn More"
- **Link:** `/landing/wellness-pool/?utm_source=meta&utm_medium=cpc&utm_campaign=wellness-pool&utm_content=upgrade-tub`

#### Ad 3B: Carousel — "The Science"
- **Format:** Carousel (4 cards)
- Card 1: Norepinephrine molecule graphic → "200-300% increase in norepinephrine"
- Card 2: Person in cold water → "Reduces inflammation by up to 37%"
- Card 3: Athletic recovery → "Used by NFL, NBA, and Olympic athletes"
- Card 4: Beautiful plunge pool → "Now available for your backyard. Starting at $35K."
- **Primary Text:** "The research is clear. Cold water immersion improves recovery, mental clarity, and stress resilience. But a portable tub in your garage isn't a long-term solution.\n\nA permanent plunge pool — with chilling AND heating — is. Built into your backyard, used year-round, designed to last decades.\n\nWe install them in as little as 2 weeks."
- **Headline:** "The Science Says Cold. Your Backyard Says Yes."
- **CTA Button:** "Get Quote"

#### Ad 3C: Reel/Story — "Morning Protocol"
- **Format:** Vertical video (9:16), 15 seconds
- **Script:**
  - [0-3s] Alarm goes off at 5:30am. Person walks outside.
  - [3-7s] Steam rising from plunge pool. Person steps in.
  - [7-11s] Close-up of peaceful face in cold water. Text: "39°F"
  - [11-15s] Person emerges, towel, coffee, sunrise. Text: "Permanent plunge pools from $35K. tristateaquaticsolutions.com"
- **Headline:** "Your Morning Protocol, Upgraded"
- **CTA Button:** "Learn More"

### Ad Set 2: High-Income Professionals — Wayne/Devon/Berwyn

**Targeting:**
- **Location:** Wayne, Devon, Berwyn, Paoli, Malvern (pin drops, 5mi radius each)
- **Age:** 35-55
- **Household Income:** Top 10%
- **Detailed Targeting:**
  - Interest in: Meditation, Self-improvement, Health & wellness, Spa
  - AND Homeowner
- **Same creative as Ad Set 1**

### Ad Set 3: Cold Plunge Interest — Broader Region

**Targeting:**
- **Location:** Philadelphia suburbs (30-mile radius)
- **Age:** 30-55
- **Household Income:** Top 20%
- **Detailed Targeting:**
  - Interest in: Cold plunge, Ice bath, Sauna, Contrast therapy, Wim Hof Method
- **Creative:** Same with broader geo messaging

---

## Campaign 4: Luxury Pools

**Campaign Name:** `META_Conv_LuxuryPools_MainLinePA_Spring2026`
**Objective:** Conversions
**Landing Page:** `tristateaquaticsolutions.com/landing/luxury-pools/`
**Budget:** 15% of total ad spend (smallest audience, highest LTV)

### Ad Set 1: Ultra-Affluent — Gladwyne/Villanova

**Targeting:**
- **Location:** Gladwyne 19035 (5mi), Villanova 19085 (5mi)
- **Age:** 40-60
- **Household Income:** Top 5%
- **Detailed Targeting:**
  - Homeowner (behavioral)
  - AND Interest in: Luxury real estate, Architectural Digest, Country living, Fine dining, Private clubs, OR Luxury travel
- **Placements:** Instagram Feed (primary), Facebook Feed

**Ad Creative Variations:**

#### Ad 4A: Single Image — Portfolio Showcase
- **Format:** Single image (stunning luxury pool at dusk, landscape lighting, infinity edge)
- **Primary Text:** "Your kitchen took 6 months to perfect. Your wine cellar is curated. Your landscaping is immaculate.\n\nThe backyard is the one thing left.\n\nWe design and build pool and outdoor living environments for Main Line estates — Villanova, Gladwyne, Bryn Mawr, Devon. Custom concrete, infinity edges, built-in spas, outdoor kitchens, architectural lighting.\n\nNot a big-box builder. A design partner.\n\nNow accepting spring 2026 projects."
- **Headline:** "Custom Pools for Main Line Estates"
- **CTA Button:** "Learn More"
- **Link:** `/landing/luxury-pools/?utm_source=meta&utm_medium=cpc&utm_campaign=luxury-pools&utm_content=portfolio`

#### Ad 4B: Carousel — "The Details"
- **Format:** Carousel (5 cards)
- Card 1: Infinity edge detail → "Vanishing edge design"
- Card 2: Built-in spa glowing at night → "Heated spa, year-round"
- Card 3: Outdoor kitchen with pool → "Full outdoor entertaining"
- Card 4: Landscape lighting & fire pit → "Every angle, considered"
- Card 5: Logo + CTA → "Request a private consultation"
- **Primary Text:** "The difference between a pool and an outdoor living experience is in the details. We obsess over every one. Custom concrete pools, integrated spas, water features, landscape architecture, smart automation.\n\nProjects from $80K. Full outdoor transformations from $150K+.\n\nLimited spring 2026 availability."
- **Headline:** "Designed for Distinction"
- **CTA Button:** "Book Now"

#### Ad 4C: Video — "The Reveal"
- **Format:** Square video (1:1), 20-30 seconds
- **Script:**
  - [0-5s] Drone approaching a beautiful Main Line stone colonial
  - [5-10s] Camera sweeps over backyard — empty, standard patio
  - [10-12s] Cut to black. Text: "6 months later."
  - [12-22s] Same drone approach, now revealing: infinity pool, spa, outdoor kitchen, fire pit, landscape lighting at dusk
  - [22-25s] Family entertaining poolside, wine glasses, laughter
  - [25-30s] Logo. "Custom pools from $80K. Private consultations available."
- **Headline:** "Transform Your Property"
- **CTA Button:** "Book Now"

### Ad Set 2: Luxury Homeowners — Broader Main Line

**Targeting:**
- **Location:** Bryn Mawr, Devon, Wayne, Haverford, Narberth, Merion Station (pin drops)
- **Age:** 38-58
- **Household Income:** Top 10%
- **Detailed Targeting:**
  - Homeowner + Interest in: Interior design, Architecture, Home renovation, Houzz
- **Same creative as Ad Set 1**

### Ad Set 3: Luxury Home Improvement Interest

**Targeting:**
- **Location:** Main Line + Northern Delaware combined
- **Age:** 35-60
- **Household Income:** Top 10%
- **Detailed Targeting:**
  - Interest in: Pool & spa, Landscape architecture, Outdoor kitchen, Home theater
  - AND Homeowner
- **Creative:** Broader positioning

---

## Campaign 5: Retargeting

**Campaign Name:** `META_Retargeting_AllPersonas_Spring2026`
**Objective:** Conversions
**Budget:** 5% of total (grows as pixel data accumulates)

### Ad Set 1: Hot — Website Visitors (1-7 days)

**Audience:** Custom Audience — All website visitors in past 7 days
**Exclude:** People who completed a purchase (deposit)

**Creative:**

#### Retarget Ad A: Urgency
- **Primary Text:** "You were looking at pools on our site. Spring installation spots are filling up — we only take on a limited number of projects per season.\n\n$2,500 design deposit secures your spot and is fully applied to your project.\n\nDesign your pool in 5 minutes →"
- **Headline:** "Don't Miss Spring 2026"
- **CTA Button:** "Get Quote"
- **Link:** `/design-your-pool/?utm_source=meta&utm_medium=retargeting&utm_campaign=retarget-7day`

#### Retarget Ad B: Social Proof
- **Primary Text:** "'We looked at 4 builders. Tri-State was the only one who actually listened to what we wanted.' — The Hendersons, Berwyn\n\nFree consultations. No pressure. Just possibilities."
- **Headline:** "See Why Families Choose Tri-State"
- **CTA Button:** "Book Now"

### Ad Set 2: Warm — Website Visitors (8-30 days)

**Audience:** Custom Audience — Website visitors 8-30 days ago
**Exclude:** 1-7 day visitors + purchasers

**Creative:**

#### Retarget Ad C: Financing
- **Primary Text:** "Still thinking about that pool? Most families finance — and it's more affordable than you'd think.\n\nPlunge pools: ~$199/mo\nFiberglass pools: ~$399/mo\nCustom concrete: ~$599/mo\n\nDesign yours and see your monthly payment →"
- **Headline:** "Pools from $199/Month"
- **CTA Button:** "Learn More"

### Ad Set 3: Configurator Abandoners

**Audience:** Custom Audience — Visited /design-your-pool/ but did NOT reach /design-your-pool/thank-you/
**This requires Meta Pixel + custom event tracking**

**Creative:**

#### Retarget Ad D: Resume Design
- **Primary Text:** "Your pool design is waiting. You got to step [X] — finish in under 2 minutes and see your estimated price.\n\n$2,500 design deposit secures your spring slot. Fully refundable within 72 hours."
- **Headline:** "Finish Your Pool Design"
- **CTA Button:** "Continue"
- **Link:** `/design-your-pool/?utm_source=meta&utm_medium=retargeting&utm_campaign=retarget-configurator`

### Ad Set 4: Lead Nurture — Form Submitted, No Deposit

**Audience:** Custom Audience — Submitted lead form (via pixel Lead event) but no Purchase event
**Timeframe:** 1-30 days

**Creative:**

#### Retarget Ad E: Next Step
- **Primary Text:** "Thanks for reaching out! The next step is easy: design your pool in our online configurator and see your price range.\n\nIf you love it, a $2,500 design deposit locks in your spring installation spot.\n\nNo commitment to design — just a starting point for our conversation."
- **Headline:** "Ready to See Your Pool?"
- **CTA Button:** "Design Yours"

---

## Budget Allocation Strategy

### Phase 1: Testing (Weeks 1-3) — $50-75/day

| Campaign | Daily Budget | Goal |
|----------|-------------|------|
| Family Pool | $20-25 | Find winning creative |
| Pool Replacement | $12-18 | Test messaging |
| Wellness Pool | $10-15 | Validate audience |
| Luxury Pools | $5-10 | Test premium positioning |
| Retargeting | $3-7 | Build as pixel accumulates data |

**Testing protocol:**
- Run all 3-4 creative variations per ad set
- After 1,000 impressions per ad, evaluate CTR
- After 5-7 days, kill bottom 50% of ads by CTR
- Narrow to 1-2 winners per ad set

### Phase 2: Optimization (Weeks 4-6) — $75-125/day

- Double budget on winning ad sets
- Kill underperforming ad sets entirely
- Scale winning creative to new audiences
- Begin building retargeting audiences

### Phase 3: Scaling (Weeks 7+) — $125-250/day

- 80% budget to proven campaigns
- 20% to testing new creative/audiences
- Increase budgets 20-30% per week max (algorithm learning)
- Build Lookalike audiences from converters

### Monthly Budget Range

| Level | Monthly Budget | Expected Leads/Month | Expected CPL |
|-------|---------------|---------------------|--------------|
| Conservative | $1,500-2,250 | 15-30 | $75-$150 |
| Moderate | $2,250-3,750 | 30-60 | $60-$125 |
| Aggressive | $3,750-7,500 | 60-120 | $50-$100 |

**Note:** Pool industry CPL on Meta typically runs $50-$200 for qualified leads. Main Line targeting (affluent, specific geo) will push toward the higher end initially.

---

## Creative Production Needs

### Photography (Priority)
1. **Completed pool installations** — need 10-15 high-quality photos of actual projects
2. **Before/after sequences** — any pool replacements or renovations
3. **Family lifestyle shots** — families using pools (can be stock initially)
4. **Detail shots** — spa jets, LED lighting, smart controls, water features
5. **Seasonal shots** — pool being used in fall/winter (for wellness campaign)

### Video (Phase 2)
1. **Installation time-lapse** — crane dropping fiberglass pool (15-30 sec)
2. **Customer testimonial clips** — 30-60 seconds, authentic
3. **Before/after drone footage** — old pool → new pool
4. **Cold plunge morning routine** — for wellness campaign (15 sec)

### Graphic Design
1. **Price comparison graphics** — old pool maintenance vs new pool cost
2. **Monthly payment calculator visual** — $299/mo, $399/mo, etc.
3. **Process infographic** — 4 steps, simple
4. **Financing options graphic** — payment tiers

---

## Tracking & Measurement Setup

### Meta Pixel Events to Configure

| Event | Trigger | Page/Action |
|-------|---------|-------------|
| PageView | Automatic | All pages |
| ViewContent | Scroll 50%+ | Landing pages, product pages |
| Lead | Form submission | All lead capture forms |
| InitiateCheckout | Click deposit CTA | Configurator Step 5 |
| AddPaymentInfo | Stripe Checkout loaded | Stripe redirect |
| Purchase | Thank you page | /design-your-pool/thank-you/ |

### Custom Conversions
- `PoolConfiguratorStarted` — Visited /design-your-pool/
- `PoolConfiguratorStep2` through `Step5` — Reached each step
- `ConsultationRequested` — Lead form submission
- `DesignDepositPaid` — Stripe payment completed ($2,500)

### UTM Convention

```
utm_source=meta
utm_medium=cpc
utm_campaign={campaign-name}  // family-pool, pool-replacement, wellness-pool, luxury-pools
utm_content={ad-identifier}   // carousel-swimclub, single-monthly, video-3weeks, etc.
utm_term={ad-set}             // core-mainline, broader-chester, delaware
```

### KPIs to Track

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| CTR (link click-through rate) | >1.5% | Ad creative resonance |
| CPC (cost per click) | <$3.00 | Traffic efficiency |
| Landing page conversion rate | >5% | Page effectiveness |
| CPL (cost per lead) | <$150 | Lead generation efficiency |
| Lead-to-consultation rate | >40% | Lead quality |
| Consultation-to-deposit rate | >20% | Sales effectiveness |
| Cost per deposit | <$750 | Ultimate ROI |
| ROAS | >10:1 | $2,500 deposit on <$250 spend |

### Attribution
- **Primary:** Meta Ads Manager (7-day click, 1-day view)
- **Secondary:** GA4 (last-click)
- **Verification:** Manual — match Stripe deposits to ad source via UTM params stored in GHL CRM

---

## Landing Page URLs & UTM Links

| Campaign | Landing Page | Primary CTA Link |
|----------|-------------|------------------|
| Family Pool | `/landing/family-pool/` | `/design-your-pool/?utm_source=meta&utm_medium=cpc&utm_campaign=family-pool` |
| Pool Replacement | `/landing/pool-replacement/` | `/design-your-pool/?utm_source=meta&utm_medium=cpc&utm_campaign=pool-replacement` |
| Wellness Pool | `/landing/wellness-pool/` | `/design-your-pool/?utm_source=meta&utm_medium=cpc&utm_campaign=wellness-pool` |
| Luxury Pools | `/landing/luxury-pools/` | `/design-your-pool/?utm_source=meta&utm_medium=cpc&utm_campaign=luxury-pools` |
| Retargeting | `/design-your-pool/` | `/design-your-pool/?utm_source=meta&utm_medium=retargeting` |

---

## Pre-Launch Checklist

### Technical
- [ ] Meta Pixel installed on all pages (base code + events)
- [ ] Custom conversions configured in Meta Events Manager
- [ ] UTM parameter capture working on landing pages
- [ ] Lead form → GHL CRM flow tested end-to-end
- [ ] Stripe Checkout → thank you page → Purchase event tested
- [ ] Landing page load time <3 seconds (mobile)
- [ ] All landing pages mobile-responsive
- [ ] Phone number click-to-call working on mobile

### Business
- [ ] Meta Business Manager account set up
- [ ] Ad account created and payment method added
- [ ] Facebook Page active with profile photo, cover, about
- [ ] Instagram Business account connected
- [ ] Domain verified in Business Manager
- [ ] Creative assets (photos/video) ready for launch
- [ ] Lead response process defined (who calls, within what timeframe)
- [ ] CRM tags and pipeline stages configured for ad leads

### Creative
- [ ] 3-4 ad variations per campaign ready
- [ ] Ad copy reviewed for compliance (no misleading claims)
- [ ] Landing page copy matches ad messaging (scent match)
- [ ] All images meet Meta ad specs (1200x628 for feed, 1080x1920 for stories)
- [ ] Video ads have captions/text overlays (85% watch muted)

---

## Week 1 Launch Sequence

**Day 1:** Launch Campaign 1 (Family Pool) with all ad sets and creative variations
**Day 2:** Launch Campaign 2 (Pool Replacement)
**Day 3:** Launch Campaign 3 (Wellness Pool)
**Day 4:** Launch Campaign 4 (Luxury Pools)
**Day 5:** Set up retargeting campaign (won't activate until pixel has data)
**Day 6-7:** Monitor, check delivery, ensure pixel firing

**Stagger launches** to monitor each campaign's initial delivery and catch issues early.

---

## Ongoing Optimization Schedule

### Daily (5 min)
- Check ad delivery and spend pacing
- Respond to any ad comments/messages

### Weekly (30 min)
- Review CTR, CPC, CPL by ad set
- Kill bottom-performing ads (<1% CTR after 1K impressions)
- Check lead quality (are consultation requests qualified?)
- Update budget allocation based on performance

### Bi-Weekly (1 hour)
- Creative refresh: launch 1-2 new ad variations per campaign
- Audience refinement: narrow or expand based on data
- Landing page optimization: review heatmaps, conversion rates
- A/B test landing page elements (headline, CTA copy, form fields)

### Monthly (2 hours)
- Full performance review vs. KPIs
- Budget reallocation across campaigns
- New creative production planning
- Competitor ad monitoring (Facebook Ad Library)
- Lookalike audience creation from converters
