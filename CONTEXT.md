# TriState Aquatic Solutions — Living Context

**Last Updated:** 2026-02-17
**Owner:** Cash (Stripe + deposits) + Marlo (marketing + SEO)
**Priority:** Engine #1 (highest revenue priority)
**Live Status:** See `STATE.yaml` for current task status

## What This Is
Pool installation and aquatic solutions business serving the tri-state area. Website is fully live with Stripe integration. Blocked on Meta Business Manager for ads.

## Current State
- Website FULLY LIVE with spring landing page + 4 ad landing pages
- **Stripe integration FULLY LIVE** — deposit page, success/cancel pages, webhook handler, API routes all built and connected. Stripe account active with API keys in Vercel env.
- **PostHog analytics FULLY OPERATIONAL** — fixed broken snippet on 268 pages, added analytics.js with comprehensive event tracking (CTA clicks, form submissions, scroll depth, engaged time, outbound links, gallery/service/blog tracking). Dashboard created (ID: 1284392). Data accumulating now.
- **Image audit COMPLETE** — replaced all tropical/foreign stock photos across galleries, portfolios, and case studies with DE/PA appropriate imagery
- **PA HIC registration** — application printed, ready to mail with $50 check
- **BLOCKED: Meta Business Manager** — need FB Page, Instagram, Ad Account, Pixel before ads can launch
- GBP listing draft ready (deferred to next week per Brandon)
- 5 SEO blog posts drafted and ready for publishing.
- Spring opening flyer copy + design brief completed (ready for designer/printer)
- 3 social media posts drafted + brand voice guide created (ready for approval)
- Step-by-step guide for setting up Meta Business Manager created to unblock ad launch.
- Branding guide, marketing strategy, deposit plans all done

## Key Files
- `BRANDING_GUIDE.md` — Brand identity and guidelines
- `MARKETING_STRATEGY_2026.md` — Full year marketing plan
- `REVISED-30-DAY-DEPOSIT-PLAN.md` — Latest deposit campaign plan
- `15-DAY-DEPOSIT-PLAN.md` — Shorter sprint version
- `ABOUT_US_COPY.md`, `INSTALLATION_SERVICES_COPY.md` — Website copy
- `MANUFACTURER_REFERENCES_EXPLANATION_FOR_BRYCE.md` — For Bryce
- `content/`, `marketing/`, `blog/` — Content directories

## What Needs to Happen Next
- [x] ~~**Brandon:** Set up Stripe account, add API keys to Vercel env vars~~ ✅ DONE
- [ ] **Brandon:** Get Certificate of Insurance (COI) listing "TriState Aquatic Solutions" — must cover pool building/installation
- [ ] **Brandon:** Mail PA HIC application with $50 check
- [ ] **Brandon:** Set up Meta Business Manager (FB Page, Instagram, Ad Account, Pixel)
- [ ] **Brandon:** Take photos from GBP shot list (truck, team, equipment minimum)
- [ ] **Brandon:** Review & approve brand voice guide
- [ ] **Brandon:** Review spring flyer design brief and select format
- [ ] **Brandon:** Source designer for spring flyer (or approve DIY Canva)
- [x] ~~**Marlo:** Write first blog post (Post #1: When to Open Pool in PA)~~ DONE
- [x] ~~**Marlo:** Get spring flyer designed and printed (500-1000 units)~~ Brief ready, waiting on Brandon
- [x] ~~**Marlo:** Finalize social posts after brand voice approval~~ Guide ready, waiting on Brandon
- [ ] Launch Meta ads (blocked on Meta BM setup)

## Recent Changes
- 2026-02-17: PostHog analytics fully set up — fixed 268 broken snippets, added analytics.js (10 tracking modules) to all 301 pages, created business dashboard with 14 insights
- 2026-02-17: Image audit complete — replaced tropical/foreign stock photos across galleries (removed 3 bad before-after pairs), portfolios (10 images replaced), and verified 7 orphaned location images safe to ignore
- 2026-02-16: Updated CONTEXT.md with STATE.yaml cross-reference, Stripe completion, PA HIC status
- 2026-02-15: Stripe integration completed (Cash), PA HIC application prepared (Elon)
- 2026-02-15: Fixed 3 landing page issues:
  1. Layout: nested `<a>` tag broke 2-column card grid → changed to `<span>`
  2. Email popup: added SendGrid email delivery to lead capture API (was only saving to GHL)
  3. Banner: fixed nav overlap, added dismiss button, adjusted hero padding
- 2026-02-15: Added SENDGRID_API_KEY to Vercel env (mail.send scope)
- 2026-02-11: Created living context file

## Decisions Log
- **2026-02-15:** Deferred GBP listing setup to next week per Brandon — photo shoot needed first
- **2026-02-15:** Stripe integration architecture: API routes at /api/checkout + /api/webhook, deposit page at /deposit, success/cancel redirect pages. Built for Stripe Checkout Sessions.
- **2026-02-14:** PA HIC registration prioritized as critical — can't legally advertise pool services in PA without it
- **2026-02-14:** Meta ads launch blocked until Meta Business Manager fully set up — no workaround, must have FB Page + Instagram + Ad Account + Pixel
