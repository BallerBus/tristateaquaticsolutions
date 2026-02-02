# Chatbot Conversation Flows

## Tri-State Aquatic Solutions

**Purpose:** Automated chatbot scripts for website visitors
**Platforms:** Website chat widget (Drift, Intercom, HubSpot, etc.)
**Last Updated:** February 2026

---

## Table of Contents
1. [Welcome/Greeting Flow](#1-welcomegreeting-flow)
2. [Service Inquiry Flow](#2-service-inquiry-flow)
3. [Pricing Inquiry Flow](#3-pricing-inquiry-flow)
4. [Scheduling Consultation Flow](#4-scheduling-consultation-flow)
5. [FAQ Responses](#5-faq-responses)
6. [Lead Qualification Flow](#6-lead-qualification-flow)
7. [After-Hours Flow](#7-after-hours-flow)
8. [Handoff to Human Flow](#8-handoff-to-human-flow)

---

# 1. Welcome/Greeting Flow

## 1.1 First-Time Visitor Welcome

**Trigger:** First page visit, 5-second delay
**Goal:** Engage without being intrusive

```
Bot: Hi there! Welcome to Tri-State Aquatic Solutions.

I'm here to help with any pool questions. Are you:

[ Dreaming about a new pool ]
[ Getting quotes and comparing options ]
[ Looking for specific information ]
[ Just browsing - I'll be here if you need me ]
```

### Response: "Dreaming about a new pool"
```
Bot: That's exciting! There's nothing quite like having your own backyard retreat.

A few quick questions will help me point you in the right direction:

What kind of pool are you considering?

[ Fiberglass pool (2-4 week install) ]
[ Plunge pool / Cocktail pool ]
[ Not sure yet - help me decide ]
```

### Response: "Getting quotes and comparing options"
```
Bot: Smart approach! You'll want to make sure you're comparing apples to apples.

Have you had a chance to download our free Pool Cost Guide? It breaks down pricing for the Main Line area and what to look for in quotes.

[ Yes, I have it ]
[ No, send it to me ]
[ I'd rather just talk to someone ]
```

### Response: "Looking for specific information"
```
Bot: Happy to help! What would you like to know about?

[ Pool types and options ]
[ Pricing and financing ]
[ Installation timeline ]
[ Your service area ]
[ Something else ]
```

### Response: "Just browsing"
```
Bot: No problem! Take your time exploring.

I'll be right here in the corner if you have any questions. You can also:

- Check out our [Project Gallery] for inspiration
- Read about [Fiberglass vs Concrete] pools
- Download our free [Pool Cost Guide]

Enjoy browsing!
```

---

## 1.2 Returning Visitor Welcome

**Trigger:** Cookie identifies returning visitor
**Goal:** Re-engage based on previous behavior

```
Bot: Welcome back! Good to see you again.

Last time you were checking out our [fiberglass pools/gallery/pricing].
Ready to take the next step?

[ Schedule a free consultation ]
[ I have some questions first ]
[ Still in research mode ]
```

---

## 1.3 Time-Based Greeting (Peak Season)

**Trigger:** March-June visits
**Goal:** Create urgency for peak season

```
Bot: Hi! Spring is our busiest season - everyone wants to be swimming by summer!

Good news: We still have installation slots available for [Month].
Would you like to check availability for your project?

[ Yes, check availability ]
[ Tell me more about the process ]
[ What does a pool cost? ]
```

---

## 1.4 Geographic Welcome

**Trigger:** IP detected in service area
**Goal:** Establish local connection

### Main Line PA Visitor
```
Bot: Hi neighbor! We've installed dozens of pools across the Main Line -
from Wayne to Villanova to Bryn Mawr.

Thinking about adding a pool to your backyard?

[ Yes, I'm interested ]
[ I have questions ]
[ Show me local projects ]
```

### Delaware Visitor
```
Bot: Hello! Are you in the Hockessin, Wilmington, or Northern Delaware area?

We're based right here and specialize in fiberglass pool installations
throughout New Castle County.

[ Yes, that's me! ]
[ I'm in a different area ]
[ Show me your work ]
```

---

# 2. Service Inquiry Flow

## 2.1 Pool Type Selection

**Trigger:** User asks about pools or selects "Pool types and options"

```
Bot: Great question! We specialize in two types of pools that deliver
premium results in less time than traditional construction:

**Fiberglass Pools**
- Installed in 2-4 weeks (not months!)
- 50% lower lifetime maintenance
- Built-in features included
- Perfect for most residential properties

**Plunge Pools**
- Compact luxury for smaller spaces
- Great for entertaining and relaxation
- Cold plunge wellness options available
- Year-round enjoyment with heating

Which interests you more?

[ Fiberglass - tell me more ]
[ Plunge pools - tell me more ]
[ What's the difference from concrete? ]
[ I'm not sure which is right for me ]
```

### Response: "Fiberglass - tell me more"
```
Bot: Fiberglass pools have come a long way! Today's technology delivers:

- **Smooth, non-porous surface** - feels great and resists algae
- **Faster installation** - your pool is pre-built and delivered ready
- **Lower chemical costs** - requires fewer chemicals than concrete
- **Built-in features** - tanning ledges, seating, steps included
- **Lifetime durability** - no resurfacing needed

Popular sizes range from 12x24 to 16x40 feet.

Would you like to:

[ See fiberglass pool options ]
[ Get a price estimate ]
[ Schedule a consultation ]
[ Learn how installation works ]
```

### Response: "Plunge pools - tell me more"
```
Bot: Plunge pools are perfect for homeowners who want maximum luxury
in a thoughtfully-sized space.

**Why homeowners love them:**
- Ideal for lots under 1/4 acre
- Lower installation cost
- Easier to heat for year-round use
- Perfect for entertaining 4-8 people
- Cold plunge options for wellness benefits

Typical sizes: 10x15 to 12x20 feet

Would you like to:

[ See plunge pool designs ]
[ Get a price estimate ]
[ Schedule a consultation ]
[ Talk to someone about my space ]
```

### Response: "What's the difference from concrete?"
```
Bot: Great question! Here's the honest comparison:

**Fiberglass Advantages:**
- 2-4 week installation (concrete: 3-6 months)
- Lower lifetime maintenance
- No resurfacing needed
- Smoother surface feel
- Lower heating costs

**Concrete Advantages:**
- Unlimited custom shapes
- Better for very large pools
- Certain aesthetic preferences

For most Main Line homeowners, fiberglass delivers luxury results
more efficiently. The technology has really advanced.

Would you like to:

[ See our detailed comparison guide ]
[ Get a price comparison ]
[ Talk to Brandon about your situation ]
```

### Response: "I'm not sure which is right for me"
```
Bot: No worries - that's what we're here for!

A few questions will help:

**How big is your backyard?**

[ Under 1/4 acre ]
[ 1/4 to 1/2 acre ]
[ Over 1/2 acre ]
[ Not sure ]
```

*Continue qualification flow based on response*

---

## 2.2 Installation Process Inquiry

**Trigger:** User asks about process, timeline, or "how it works"

```
Bot: Our installation process is refreshingly simple:

**Step 1: Design Consultation** (Free!)
Brandon visits your property, discusses your vision, takes measurements.

**Step 2: Custom Design**
We create a 3D rendering of your dream pool in your actual backyard.

**Step 3: Permits**
We handle all paperwork with your municipality (typically 2-4 weeks).

**Step 4: Installation**
Your fiberglass pool is installed in just 2-4 weeks.

**Step 5: Final Walkthrough**
We show you everything and hand over the keys to your new oasis!

Total timeline: 6-10 weeks from signing to swimming.

What would you like to know more about?

[ Scheduling a consultation ]
[ What happens during installation? ]
[ Do you handle permits? ]
[ What's included in the price? ]
```

---

## 2.3 Service Area Inquiry

**Trigger:** User asks about locations served

```
Bot: We serve homeowners throughout the tri-state area:

**Pennsylvania:**
- Main Line (Wayne, Villanova, Bryn Mawr, Haverford, Radnor)
- Chester County (West Chester, Malvern, Exton, Downingtown)
- Delaware County

**Delaware:**
- Hockessin (our home base!)
- Wilmington
- Greenville
- Northern New Castle County

**Surrounding Areas:**
- Parts of South Jersey (case by case)

Where are you located?

[ Main Line PA ]
[ Chester County PA ]
[ Delaware ]
[ Other - let me specify ]
```

---

# 3. Pricing Inquiry Flow

## 3.1 General Pricing Question

**Trigger:** User asks "how much," "cost," "price," "budget"

```
Bot: I appreciate you asking directly! Pool pricing depends on several factors,
but I can give you a realistic picture.

**Fiberglass Pool Ranges (Main Line/Delaware):**
- Small (12x24): $45,000 - $55,000
- Medium (14x30): $55,000 - $70,000
- Large (16x36): $70,000 - $90,000

**Plunge Pools:**
- Standard: $35,000 - $50,000

These include installation, basic landscaping restoration, and standard features.

*Factors that affect price: site conditions, access, features, finishes*

Would you like:

[ A more specific estimate for my situation ]
[ Download the full pricing guide ]
[ Schedule a consultation for exact pricing ]
[ Information about financing ]
```

### Response: "A more specific estimate for my situation"
```
Bot: Happy to help narrow it down!

**What size pool are you considering?**

[ Small - just for our family ]
[ Medium - room for entertaining ]
[ Large - space for swimming laps ]
[ Not sure yet ]
```

*Continue with size, features, location questions*

### Response: "Download the full pricing guide"
```
Bot: Great choice! Our 2026 Pool Cost Guide includes:

- Detailed pricing by pool type and size
- What's typically included vs. add-ons
- Cost comparison: fiberglass vs. concrete
- Financing options breakdown
- Questions to ask any pool builder

Where should I send it?

[Email Input Field]

[ Send My Guide ]
```

### Response: "Information about financing"
```
Bot: We want to make your dream pool accessible!
Here are the options most clients use:

**Pool Financing (through our partners):**
- Terms from 5-15 years
- Rates starting around 7-9% APR
- Quick approval process
- Finance up to 100% of project

**Home Equity Options:**
- Often lowest rates
- May be tax-deductible (consult your advisor)
- Your bank or credit union

**Example monthly payment:**
$60,000 pool at 8% over 12 years = ~$650/month

Would you like:

[ Connect with a financing partner ]
[ Get a custom quote to know the amount ]
[ Download financing information ]
```

---

## 3.2 Price Comparison Inquiry

**Trigger:** User mentions competitors, "shopping around," or comparing

```
Bot: Shopping around is smart! Here are the key things to compare:

**Questions to ask every pool builder:**

1. What's included in the quoted price?
2. Is excavation included? Electrical? Fencing?
3. What's the warranty coverage?
4. How long will installation take?
5. Can I see recent local projects?
6. What happens if there are surprises during digging?

**Why clients choose us:**
- No hidden fees - our quote is comprehensive
- Owner-involved from start to finish
- 2-4 week installation
- 5-year workmanship warranty

Would you like to:

[ Download our comparison checklist ]
[ Get an honest quote to compare ]
[ Talk to Brandon directly ]
```

---

# 4. Scheduling Consultation Flow

## 4.1 Consultation Request

**Trigger:** User wants to schedule or talks to someone

```
Bot: Excellent! A free design consultation is the best next step.

Here's what to expect:
- Brandon (the owner) visits your property
- ~45-60 minutes
- Discuss your vision and preferences
- Review site conditions
- Answer all your questions
- No pressure or obligation

When would work best for you?

[ This week ]
[ Next week ]
[ 2+ weeks out ]
[ Just show me available times ]
```

### Response: Any time selection
```
Bot: Perfect! Let me collect a few details to book your appointment.

**Your Name:**
[Input Field]

**Best Phone Number:**
[Input Field]

**Email Address:**
[Input Field]

**Property Address:**
[Input Field]

[ Continue to select time ]
```

### After contact info collected
```
Bot: Thanks [Name]! Here are available consultation times:

[Calendar Widget with available slots]

Select a time that works for you, or:

[ Call me to schedule: 610-870-3113 ]
[ I need a time not shown ]
```

### After time selected
```
Bot: You're all set!

**Consultation Confirmed:**
- Date: [Date]
- Time: [Time]
- Location: [Address]
- With: Brandon Calloway (Owner)

You'll receive a confirmation email shortly with:
- Calendar invite
- What to prepare
- Brandon's contact info

Before your consultation, you might want to:
- Gather any inspiration photos
- Think about must-have features
- Note any questions you have

Looking forward to meeting you!

[ Add to my calendar ]
[ I have a question ]
```

---

## 4.2 Consultation Objection Handling

### "I'm not ready to commit yet"
```
Bot: No commitment required! The consultation is simply:

- A chance to get expert advice on your specific property
- See what's possible for your backyard
- Get realistic pricing (no guessing)
- Ask all your questions

There's no obligation to proceed. Many homeowners use our consultation
to inform their decision, even if they're 6-12 months out.

Would you like to schedule?

[ Yes, let's book it ]
[ I have more questions first ]
[ Let me think about it ]
```

### "I'm still early in the process"
```
Bot: That's actually the perfect time to talk!

Early consultations help you:
- Understand realistic costs for planning
- Learn what your property can accommodate
- Get timeline guidance (seasonal factors matter!)
- Avoid surprises later

Plus, if you're planning for summer, slots fill up fast in spring.

Would you like to get on the calendar?

[ Yes, schedule me ]
[ When should I start the process? ]
```

### "I want to do more research first"
```
Bot: Research is important! Here are some resources:

**From Us:**
- [Pool Cost Guide] - comprehensive pricing
- [Fiberglass vs Concrete Guide] - honest comparison
- [Project Gallery] - see our work

**Third-Party Resources:**
- Pool & Hot Tub Alliance (PHTA) for industry info
- Houzz for design inspiration
- HomeAdvisor for general contractor guidance

When you're ready, scheduling a consultation is easy -
just come back to the website or call 610-870-3113.

[ Download the Cost Guide ]
[ Browse the Gallery ]
[ Actually, let's schedule now ]
```

---

# 5. FAQ Responses

## General FAQs

### FAQ 1: "How long does installation take?"
```
Bot: Great question! Here's the typical timeline:

**Fiberglass Pools:**
- Permit approval: 2-4 weeks
- Installation: 2-4 weeks
- Total: 6-10 weeks from contract to swimming

**Compare to Concrete:**
- Concrete pools typically take 3-6 months

We can often work around your schedule and preferences.
Want to discuss timing for your project?

[ Schedule a consultation ]
[ When's the best time to start? ]
```

### FAQ 2: "What's included in the price?"
```
Bot: Our quotes are comprehensive - no surprises! Here's what's typically included:

**Included:**
- Pool shell and delivery
- Professional installation
- Basic excavation
- Plumbing and filtration system
- Standard coping and patio (varies)
- Backfill and compaction
- Start-up chemicals
- Pool school training
- Permits (we handle the paperwork)

**Often Separate:**
- Fencing (required by code)
- Electrical connection to panel
- Extensive landscaping
- Premium features (heaters, lights, automation)

Every property is different, so a consultation gives you exact numbers.

[ Get a custom quote ]
[ What premium features are available? ]
```

### FAQ 3: "Do you handle permits?"
```
Bot: Yes! We handle all the permit paperwork for you.

**Our permit process:**
1. We prepare all required documentation
2. Submit to your municipality
3. Coordinate any required inspections
4. Handle all follow-up communications

**Typical permit timeline:**
- Chester County: 2-3 weeks
- Delaware: 2-4 weeks
- Main Line municipalities: Varies (we know each one!)

You don't have to visit town hall or figure out requirements -
that's on us.

[ Any other questions? ]
[ Schedule a consultation ]
```

### FAQ 4: "What about HOA approval?"
```
Bot: Many of our clients are in HOA communities. We can help!

**Our HOA experience:**
- We've worked with dozens of Main Line HOAs
- We know common requirements and restrictions
- We can provide documentation HOAs typically request
- We design pools that meet most HOA guidelines

**Tips for HOA approval:**
1. Review your covenants first
2. Check setback requirements
3. Note any material/design restrictions
4. Apply before signing a contract

We can provide professional drawings and specs for your HOA submission.

[ I have specific HOA questions ]
[ Schedule a consultation ]
```

### FAQ 5: "What's your warranty?"
```
Bot: We stand behind our work with comprehensive warranties:

**Workmanship Warranty:**
- 5 years on installation

**Pool Shell Warranty (from manufacturer):**
- Structural: Lifetime (varies by manufacturer)
- Surface: 10-15 years

**Equipment Warranty:**
- Pump, filter, heater: Manufacturer warranties (typically 1-3 years)

We also offer ongoing maintenance services if you want help
keeping everything in perfect condition.

[ Learn about maintenance services ]
[ What's covered specifically? ]
```

### FAQ 6: "Can I see examples of your work?"
```
Bot: Absolutely! We love showing off our projects.

**Options to see our work:**

1. **Online Gallery** - Browse completed projects
   [View Gallery]

2. **Before/After Photos** - See transformations
   [View Transformations]

3. **In-Person Tours** - With permission from past clients,
   we can sometimes arrange visits to completed pools

4. **Virtual Walkthrough** - Video tours of recent projects

Which would you prefer?

[ View online gallery ]
[ Request in-person tour ]
[ Watch video tours ]
```

### FAQ 7: "Why fiberglass instead of concrete?"
```
Bot: Both have their place, but here's why most of our clients choose fiberglass:

**Fiberglass Advantages:**

| Factor | Fiberglass | Concrete |
|--------|------------|----------|
| Installation | 2-4 weeks | 3-6 months |
| Maintenance | 50% less | Higher ongoing |
| Surface | Smooth, algae-resistant | Rough, needs resurfacing |
| Chemicals | Fewer needed | More required |
| Lifetime cost | Lower | Higher |

**When concrete might be better:**
- Truly custom shapes
- Very large pools
- Specific aesthetic preference

For most residential pools, fiberglass delivers luxury results
more efficiently.

[ See the detailed comparison ]
[ Get a quote for my project ]
```

### FAQ 8: "Do you offer financing?"
```
Bot: Yes! We want to make your dream pool accessible.

**Financing Options:**

1. **Pool Financing** (through our partners)
   - 5-15 year terms
   - Rates from ~7-9% APR
   - Quick approval
   - Finance up to 100%

2. **Home Equity Loans/Lines**
   - Often lower rates
   - Potentially tax-deductible
   - Through your bank

**Example Payment:**
$60,000 pool, 8% APR, 12 years = ~$650/month

Would you like more details?

[ Connect with financing partner ]
[ Get a quote first ]
[ Download financing guide ]
```

### FAQ 9: "What size pool do I need?"
```
Bot: Pool size depends on how you'll use it and your yard space.

**Size Guidelines:**

**Small (12x24)** - $45K-55K
- Great for: Families, relaxation, cooling off
- Fits: Smaller yards

**Medium (14x30 to 16x32)** - $55K-70K
- Great for: Entertaining, family activities
- Fits: Average suburban yards

**Large (16x36 to 18x40)** - $70K-90K
- Great for: Lap swimming, larger gatherings
- Fits: Larger properties

**Plunge Pools (10x15 to 12x20)** - $35K-50K
- Great for: Compact spaces, modern look, wellness

A consultation helps us recommend the perfect size for your space and goals.

[ Schedule consultation ]
[ What fits my yard? ]
```

### FAQ 10: "When is the best time to install?"
```
Bot: Great timing question!

**Best Installation Seasons:**

**Winter/Early Spring (Jan-Mar):**
- Schedule now for summer swimming
- Best slot availability
- Beat the spring rush

**Spring (Apr-May):**
- Most popular time to start
- Swimming by mid-summer
- Book early - fills fast!

**Summer (Jun-Aug):**
- Swimming by fall
- Good weather for installation
- Still some availability

**Fall (Sep-Nov):**
- Off-season pricing sometimes available
- Perfect for spring swimming
- Less demand = more flexibility

**Key insight:** Start 3-4 months before you want to swim.

When are you hoping to be in the water?

[ This summer ]
[ Next spring ]
[ Flexible timing ]
```

### FAQ 11: "What maintenance is required?"
```
Bot: One of the best things about fiberglass pools - less maintenance!

**Weekly Tasks (15-20 minutes):**
- Test and balance water chemistry
- Empty skimmer basket
- Check pump operation

**Monthly Tasks:**
- Brush walls (quick with fiberglass!)
- Clean filter (backwash or cartridge clean)

**Seasonal Tasks:**
- Opening in spring
- Closing in fall (if you don't heat)

**What you avoid with fiberglass:**
- Acid washing
- Resurfacing
- Fighting algae constantly

We offer maintenance services if you'd rather have us handle it!

[ Learn about maintenance services ]
[ What chemicals are needed? ]
```

### FAQ 12: "Are you licensed and insured?"
```
Bot: Absolutely. We maintain all required credentials:

**Licensing:**
- Pennsylvania Home Improvement Contractor
- Delaware contractor registration
- Municipal licenses as required

**Insurance:**
- General liability insurance
- Workers' compensation
- Completed operations coverage

**Additional:**
- Manufacturer certified installer
- PHTA member (Pool & Hot Tub Alliance)

We're happy to provide documentation for your records or HOA.

[ Request insurance certificate ]
[ Any other questions? ]
```

### FAQ 13: "Can I customize my pool?"
```
Bot: Yes! While fiberglass pools use pre-designed shells,
there's plenty of customization available:

**Shell Options:**
- Multiple shapes (rectangle, freeform, Roman, kidney)
- Various sizes
- Different color finishes
- Built-in features (tanning ledges, benches, steps)

**Custom Additions:**
- Deck/patio design and materials
- Lighting (LED, color-changing)
- Water features (bubblers, waterfalls)
- Heating systems
- Automation and smart controls
- Surrounding landscaping

A consultation helps us understand your vision and show you options.

[ See customization options ]
[ Schedule consultation ]
```

### FAQ 14: "What about safety features?"
```
Bot: Safety is a priority, especially with families!

**Required by Code:**
- Fencing (typically 4-5 ft with self-closing gates)
- Alarms on house doors leading to pool (varies by municipality)

**Optional Safety Features:**
- Pool covers (manual or automatic)
- Pool alarms
- Safety ledges and benches
- Slip-resistant coping
- Shallow entry designs

**Our Safety Commitment:**
- We ensure code compliance
- We discuss all safety options
- Family-friendly designs available

Want to discuss safety for your situation?

[ Schedule consultation ]
[ What does my municipality require? ]
```

### FAQ 15: "Do you remove old pools?"
```
Bot: Good question! Here's how we handle existing pools:

**Existing In-Ground Pool:**
- We can coordinate removal and replacement
- Typically work with specialized demolition partners
- Fiberglass can be installed in existing space (usually)

**Existing Above-Ground Pool:**
- Removal is simpler
- Often included in project scope

**Cost Considerations:**
- Removal adds to project cost
- May simplify permitting (pool already exists)
- Underground utilities already routed

If you have an existing pool, mention it when scheduling your consultation
so we can assess properly.

[ Schedule consultation ]
[ Get removal cost estimate ]
```

### FAQ 16: "What's the first step?"
```
Bot: The first step is simple - a free design consultation!

**Here's how it works:**

1. **Schedule** - Pick a time that works for you
2. **We Visit** - Brandon comes to your property (~45-60 min)
3. **We Discuss** - Your vision, preferences, questions
4. **We Assess** - Site conditions, access, utilities
5. **You Receive** - A custom proposal within a week

**No pressure, no obligation.** Many homeowners use our consultation
to inform their decision, even if they're not ready to commit.

Ready to get started?

[ Schedule my consultation ]
[ I have more questions first ]
```

### FAQ 17: "Who will be at the consultation?"
```
Bot: You'll meet Brandon Calloway, the owner!

**About Brandon:**
- Hands-on owner (not a salesperson)
- Deep local expertise
- Involved from consultation through completion
- Licensed and experienced

**Why this matters:**
- Your questions get expert answers
- No handoff to different teams
- Direct communication throughout
- Accountability from day one

Most of our clients appreciate working directly with the owner.
It's part of our boutique, personal approach.

[ Schedule with Brandon ]
[ Learn more about the company ]
```

### FAQ 18: "What happens if you find problems during excavation?"
```
Bot: Great question - this is where experience matters!

**Common Excavation Discoveries:**
- Rock/ledge
- High water table
- Underground utilities
- Old foundations or debris

**Our Approach:**
1. Thorough site assessment during consultation
2. Transparent discussion of potential issues
3. If surprises occur:
   - Immediate communication
   - Options presented
   - Additional costs discussed before proceeding

**Our Commitment:**
We don't hide behind fine print. If something unexpected happens,
we work through it together with honest pricing.

[ What's included in the consultation assessment? ]
[ Schedule consultation ]
```

### FAQ 19: "Can I DIY any part of it?"
```
Bot: Some homeowners like to handle certain parts themselves!

**What Homeowners Sometimes DIY:**
- Landscaping around the pool
- Fencing installation
- Deck/patio work
- Equipment shed

**What We Strongly Recommend Professionals For:**
- Pool installation (obviously!)
- Plumbing connections
- Electrical work
- Structural elements

If you have skills and want to save on certain aspects,
we can discuss what makes sense during the consultation.

[ Discuss options in consultation ]
[ What's the minimum scope you handle? ]
```

### FAQ 20: "How do I prepare for the consultation?"
```
Bot: Great planning! Here's how to make the most of your consultation:

**Before Brandon Arrives:**

1. **Gather Inspiration**
   - Pinterest boards
   - Photos of pools you like
   - Magazine clippings

2. **Know Your Priorities**
   - Must-have features
   - How you'll use the pool
   - Aesthetic preferences

3. **Consider Logistics**
   - Approximate budget range
   - Ideal timeline
   - Decision-makers who should attend

4. **Note Your Questions**
   - Write them down!
   - No question is too small

5. **Property Access**
   - Make sure backyard is accessible
   - Note any access restrictions

Don't stress too much - Brandon will guide the conversation!

[ Schedule my consultation ]
[ Send me a preparation checklist ]
```

---

# 6. Lead Qualification Flow

## 6.1 Full Qualification Sequence

**Trigger:** User engages but hasn't scheduled consultation
**Goal:** Capture lead information and qualify

### Step 1: Initial Interest
```
Bot: I'd love to help you get started! A few quick questions
will help me point you to the right resources.

First, what's your primary interest?

[ New pool installation ]
[ Pool renovation/replacement ]
[ Just exploring options ]
```

### Step 2: Location Qualification
```
Bot: Where is your property located?

[ Main Line PA (Wayne, Villanova, Bryn Mawr area) ]
[ Chester County PA (West Chester, Malvern area) ]
[ Delaware (Hockessin, Wilmington area) ]
[ Somewhere else ]
```

#### If "Somewhere else":
```
Bot: Can you share your zip code? We'll see if you're in our service area.

[Zip Code Input Field]
```

#### If outside service area:
```
Bot: Thanks for your interest! Unfortunately, [location] is outside
our primary service area.

We focus on the Main Line PA, Chester County, and Northern Delaware
to ensure the best service for our clients.

For your area, I'd recommend:
- Pool & Hot Tub Alliance directory: phta.org
- HomeAdvisor for local contractors

Sorry we can't help directly!
```

### Step 3: Property Status
```
Bot: Great - we serve [location]!

Do you currently own the property where you'd like the pool?

[ Yes, I own the home ]
[ Buying/building soon ]
[ Renting (exploring for future) ]
```

### Step 4: Timeline
```
Bot: Perfect! When would you ideally like to be swimming?

[ This summer (ASAP) ]
[ Fall or next spring ]
[ Next year sometime ]
[ No specific timeline - just researching ]
```

### Step 5: Budget Range
```
Bot: Helpful to know! To make sure we're a good fit,
what budget range are you considering for your pool project?

(This stays confidential - just helps us customize our recommendations)

[ Under $40,000 ]
[ $40,000 - $60,000 ]
[ $60,000 - $80,000 ]
[ $80,000+ ]
[ Not sure yet ]
```

#### If "Under $40,000":
```
Bot: Thanks for being upfront!

For budgets under $40,000, options are more limited, but not impossible:
- Plunge pools can start around $35,000
- Smaller fiberglass pools may fit with basic features

Would you like to:
[ Explore plunge pool options ]
[ Learn about financing to expand budget ]
[ Download our cost guide for planning ]
```

### Step 6: Contact Capture
```
Bot: Based on what you've shared, I think a free consultation
would be really valuable for you.

Where should I send some information, and how can we reach you?

**Your Name:**
[Input Field]

**Email:**
[Input Field]

**Phone (optional but recommended):**
[Input Field]

[ Send me information ]
[ Schedule my consultation ]
```

### Step 7: Thank You + Next Step
```
Bot: Thanks [Name]!

I'm sending over:
- Our Pool Cost Guide for [location]
- Information about fiberglass pools
- What to expect in a consultation

You can expect to hear from Brandon within 24 hours, or feel free to call
directly at 610-870-3113.

Is there anything else I can help with right now?

[ I have a question ]
[ Schedule my consultation now ]
[ That's all for now - thanks! ]
```

---

# 7. After-Hours Flow

## 7.1 Outside Business Hours

**Trigger:** Conversation outside 8am-8pm ET
**Goal:** Capture lead, set expectations

```
Bot: Hi! Thanks for visiting Tri-State Aquatic Solutions.

It looks like you're browsing outside our regular hours
(Mon-Sat, 8am-8pm ET).

I can still help with:
- Answering common questions
- Sending you information
- Getting you on our callback list

What would be most helpful?

[ I have a quick question ]
[ Send me the cost guide ]
[ Have someone call me tomorrow ]
[ I'll come back during business hours ]
```

### Response: "Have someone call me tomorrow"
```
Bot: Absolutely! Brandon will give you a call first thing.

**Your Name:**
[Input Field]

**Phone Number:**
[Input Field]

**Best time to reach you:**
[ Morning (8am-12pm) ]
[ Afternoon (12pm-5pm) ]
[ Evening (5pm-8pm) ]
[ Anytime ]

**Brief note about your interest (optional):**
[Text Input]

[ Request callback ]
```

### After callback scheduled:
```
Bot: Got it! Brandon will call you [time preference] tomorrow.

In the meantime, feel free to:
- Browse our [Project Gallery]
- Download our [Pool Cost Guide]
- Check out our [FAQ page]

Have a great night!
```

---

## 7.2 Weekend/Holiday Message

**Trigger:** Weekend or holiday visit

```
Bot: Happy [day]! Thanks for stopping by Tri-State Aquatic Solutions.

We're closed today but will be back [next business day].
I can still help you:

[ Answer questions ]
[ Download guides and info ]
[ Schedule a consultation for next week ]
[ Request a callback on [next business day] ]
```

---

# 8. Handoff to Human Flow

## 8.1 Proactive Handoff Offer

**Trigger:** Complex question, pricing negotiation, frustration detected
**Goal:** Smooth transition to Brandon

```
Bot: This is a great question that deserves a personal response!

Would you like me to connect you with Brandon directly? He's the owner
and can give you the best answer.

[ Yes, call me now ] (if during business hours)
[ Yes, I'll call him: 610-870-3113 ]
[ Have him call me ]
[ Have him email me ]
[ I'll continue with the bot for now ]
```

### Response: "Yes, call me now"
```
Bot: Perfect! What's the best number to reach you?

**Phone Number:**
[Input Field]

Brandon will call you within the next 5-10 minutes.

While you wait, is there anything else I can help with?
```

### Response: "Have him call me"
```
Bot: Got it! Brandon will reach out shortly.

**Your Name:**
[Input Field]

**Phone Number:**
[Input Field]

**Best time today:**
[ Now/ASAP ]
[ Within an hour ]
[ This afternoon ]
[ Tomorrow morning ]

**What's on your mind?** (helps Brandon prepare)
[Text Input]

[ Submit ]
```

---

## 8.2 User-Requested Handoff

**Trigger:** User types "talk to human," "real person," "representative"

```
Bot: Of course! Let me connect you with our team.

**During Business Hours (Mon-Sat, 8am-8pm ET):**

Call Brandon directly: 610-870-3113

Or I can have him call you - what's your number?

[Phone Input Field]

[ Have Brandon call me ]
[ I'll call him ]
[ Actually, my question is... ]
```

---

## 8.3 Escalation Due to Frustration

**Trigger:** Multiple misunderstood queries, frustrated language, repetition

```
Bot: I apologize - I want to make sure you get the help you need.

Let me connect you with Brandon. He can answer your question directly
and help however you need.

**Fastest options:**

1. **Call now:** 610-870-3113
2. **Email:** brandon@tristateaquaticsolutions.com
3. **Have us call you:** Just share your number below

[Phone Input Field]

[ Request call ]
```

---

## 8.4 Complex Technical Question

**Trigger:** Technical questions about site conditions, engineering, specific scenarios

```
Bot: That's a really specific question - I want to make sure
you get accurate information.

Brandon (our owner) has dealt with situations just like yours
and can give you a proper answer.

Would you like to:

[ Schedule a consultation (he can assess in person) ]
[ Have Brandon call you to discuss ]
[ Send him an email with details ]
```

---

## 8.5 Handoff Success Confirmation

**After any handoff is initiated:**

```
Bot: I've notified Brandon about your request.

**What happens next:**
- You'll hear from him [within 5 min / within 24 hours / at scheduled time]
- He'll have your information and question ready
- Feel free to call 610-870-3113 if you need immediate help

Is there anything else I can help you with while you wait?

[ I have another question ]
[ That's all - thanks! ]
```

---

## Chatbot Personality Guidelines

### Tone
- Friendly but professional
- Knowledgeable but not condescending
- Helpful without being pushy
- Local and personal (mention specific areas)

### Language
- Use "we" and "our" to represent the company
- Use "Brandon" by name (makes it personal)
- Avoid jargon unless explaining it
- Keep messages scannable (bullets, short paragraphs)

### Pacing
- Don't overwhelm with options
- 3-4 buttons maximum per message
- Break complex information into multiple messages
- Include typing indicators for natural feel

### Brand Alignment
- Emphasize local expertise
- Highlight fiberglass benefits
- Reinforce premium-but-approachable positioning
- Always offer human connection option

---

*Last Updated: February 2026*
*Tri-State Aquatic Solutions | 610-870-3113 | tristateaquaticsolutions.com*
