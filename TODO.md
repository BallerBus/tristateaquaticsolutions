# TriState Aquatic Solutions - TODO List

## Website/Landing Page Issues

### 1. Landing Page Design - Layout Confusion
- [x] **FIXED 2/15:** Nested `<a>` tag (financing link) inside card `<a>` broke HTML — browser auto-closed outer anchor, spilling grid items. Changed to `<span>` with onclick. Cards now side by side on desktop.

### 2. Email Capture Popup - Not Working
- [x] **FIXED 2/15:** API endpoint saved to GHL but never sent email. Added SendGrid integration to `api/leads/capture.js`. Created SendGrid API key (mail.send scope) and added to Vercel env. Sends branded HTML pool guide email automatically. Also manually sent guide to mcrbrandon@gmail.com.

### 3. Blue Banner Blocking Information
- [x] **FIXED 2/15:** Banner and nav both `position:fixed; top:0`. Added `.urgency-banner + nav { top: 48px }` in shared.css. Increased hero padding (160→200px desktop, 140→180px mobile). Added dismiss X button.

### 4. Google Business Profile - Pushed to Next Week
- [ ] **DEFERRED:** GBP creation pushed to next week per Brandon
- Draft still ready at marketing/gbp-listing-draft.md

## Other Active Tasks

See STATE.yaml for full project status and additional tasks.
