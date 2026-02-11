/**
 * Tri-State Aquatic Solutions - Exit Intent Popup
 * Captures emails from visitors about to leave without converting.
 *
 * Desktop: detects mouse leaving viewport top
 * Mobile: detects fast scroll-up or 30s idle timer
 *
 * Shows once per session. Skips high-intent pages.
 * Fires GA4 events: exit_intent_shown, exit_intent_converted
 */

(function () {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================

  var EXCLUDED_PATHS = [
    '/design-your-pool/thank-you',
    '/contact/'
  ];

  var API_ENDPOINT = '/api/leads/capture';
  var SESSION_KEY = 'tsas_exit_intent_shown';
  var MOBILE_IDLE_MS = 30000; // 30 seconds
  var SCROLL_THRESHOLD = -80; // px per frame, negative = scrolling up

  // ============================================
  // GUARD: skip excluded paths + already shown
  // ============================================

  var path = window.location.pathname;
  for (var i = 0; i < EXCLUDED_PATHS.length; i++) {
    if (path.indexOf(EXCLUDED_PATHS[i]) === 0) return;
  }

  if (sessionStorage.getItem(SESSION_KEY)) return;

  // ============================================
  // STYLES (injected once)
  // ============================================

  var css = [
    // Overlay
    '.ei-overlay{position:fixed;inset:0;z-index:99999;background:rgba(14,31,52,0.7);display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;padding:1rem;}',
    '.ei-overlay.ei-visible{opacity:1;visibility:visible;}',

    // Modal
    '.ei-modal{background:#fff;max-width:480px;width:100%;border-radius:24px;padding:2.5rem;position:relative;transform:scale(0.95);transition:transform .3s ease;box-shadow:0 25px 60px rgba(0,0,0,0.3);}',
    '.ei-overlay.ei-visible .ei-modal{transform:scale(1);}',

    // Close button
    '.ei-close{position:absolute;top:1rem;right:1rem;width:32px;height:32px;border-radius:50%;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease;padding:0;line-height:1;}',
    '.ei-close:hover{background:#F3F4F6;}',
    '.ei-close svg{width:18px;height:18px;stroke:#6B7280;stroke-width:2;fill:none;}',

    // Typography
    ".ei-headline{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.75rem;color:#0E1F34;margin:0 0 0.5rem;line-height:1.2;font-weight:600;}",
    ".ei-subhead{font-family:'Outfit',system-ui,sans-serif;font-size:1rem;color:#6B7280;margin:0 0 1.5rem;line-height:1.5;}",

    // Form
    '.ei-form{display:flex;flex-direction:column;gap:0.75rem;}',
    ".ei-input{width:100%;height:48px;border-radius:8px;border:1px solid #E8ECF1;padding:0 1rem;font-family:'Outfit',system-ui,sans-serif;font-size:1rem;color:#0E1F34;outline:none;transition:border-color .2s ease;box-sizing:border-box;}",
    '.ei-input:focus{border-color:#C9A962;}',
    ".ei-btn{width:100%;height:48px;border-radius:8px;background:#C9A962;color:#0E1F34;font-family:'Outfit',system-ui,sans-serif;font-size:1rem;font-weight:600;border:none;cursor:pointer;transition:opacity .2s ease;line-height:48px;text-align:center;}",
    '.ei-btn:hover{opacity:0.9;}',
    '.ei-btn:disabled{opacity:0.6;cursor:not-allowed;}',

    // Fine print
    ".ei-fine{font-family:'Outfit',system-ui,sans-serif;font-size:0.8rem;color:#9CA3AF;text-align:center;margin:0.75rem 0 0;}",

    // Success state
    ".ei-success{text-align:center;padding:1rem 0;}",
    ".ei-success-icon{width:56px;height:56px;border-radius:50%;background:rgba(201,169,98,0.12);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;}",
    ".ei-success-icon svg{width:28px;height:28px;stroke:#C9A962;stroke-width:2;fill:none;}",
    ".ei-success h3{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;color:#0E1F34;margin:0 0 0.5rem;}",
    ".ei-success p{font-family:'Outfit',system-ui,sans-serif;font-size:0.95rem;color:#6B7280;margin:0;line-height:1.5;}",

    // Error
    ".ei-error{font-family:'Outfit',system-ui,sans-serif;font-size:0.85rem;color:#EF4444;margin:0;text-align:center;}",

    // Mobile adjustments
    '@media (max-width:600px){',
    '  .ei-modal{padding:1.75rem 1.5rem;border-radius:20px;margin:0.5rem;}',
    '  .ei-headline{font-size:1.5rem;}',
    '  .ei-subhead{font-size:0.95rem;}',
    '}'
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ============================================
  // BUILD POPUP HTML
  // ============================================

  var overlay = document.createElement('div');
  overlay.className = 'ei-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Free pool guide offer');

  overlay.innerHTML = [
    '<div class="ei-modal">',
    '  <button class="ei-close" aria-label="Close popup">',
    '    <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    '  </button>',
    '  <div class="ei-content">',
    '    <h2 class="ei-headline">Before You Go\u2026</h2>',
    '    <p class="ei-subhead">Get our free guide: <strong>5 Things Every Homeowner Should Know Before Building a Pool</strong></p>',
    '    <form class="ei-form" id="eiForm">',
    '      <input type="email" class="ei-input" id="eiEmail" placeholder="Your email address" required autocomplete="email">',
    '      <button type="submit" class="ei-btn" id="eiSubmit">Send Me the Guide</button>',
    '      <p class="ei-error" id="eiError" style="display:none;"></p>',
    '    </form>',
    '    <p class="ei-fine">No spam. Unsubscribe anytime.</p>',
    '  </div>',
    '  <div class="ei-success" id="eiSuccess" style="display:none;">',
    '    <div class="ei-success-icon">',
    '      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    '    </div>',
    '    <h3>Check your inbox!</h3>',
    '    <p>Your guide is on the way.</p>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.appendChild(overlay);

  // ============================================
  // POPUP CONTROL
  // ============================================

  var hasTriggered = false;

  function showPopup() {
    if (hasTriggered) return;
    hasTriggered = true;
    sessionStorage.setItem(SESSION_KEY, '1');
    overlay.classList.add('ei-visible');

    // GA4 event
    if (typeof gtag === 'function') {
      gtag('event', 'exit_intent_shown', {
        event_category: 'lead_capture',
        page_path: path
      });
    }

    // PostHog
    if (typeof posthog !== 'undefined' && posthog.capture) {
      posthog.capture('exit_intent_shown', { page_path: path });
    }
  }

  function hidePopup() {
    overlay.classList.remove('ei-visible');
  }

  // Close on X button
  overlay.querySelector('.ei-close').addEventListener('click', hidePopup);

  // Close on overlay background click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) hidePopup();
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hidePopup();
  });

  // ============================================
  // FORM SUBMISSION
  // ============================================

  var form = document.getElementById('eiForm');
  var emailInput = document.getElementById('eiEmail');
  var submitBtn = document.getElementById('eiSubmit');
  var errorEl = document.getElementById('eiError');
  var successEl = document.getElementById('eiSuccess');
  var contentEl = overlay.querySelector('.ei-content');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();
    if (!email) return;

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.style.display = 'block';
      return;
    }

    errorEl.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending\u2026';

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        source: 'exit_intent_popup',
        page: path
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(function () {
        // Show success state
        contentEl.style.display = 'none';
        overlay.querySelector('.ei-fine').style.display = 'none';
        successEl.style.display = 'block';

        // GA4 conversion event
        if (typeof gtag === 'function') {
          gtag('event', 'exit_intent_converted', {
            event_category: 'lead_capture',
            page_path: path
          });
        }

        // PostHog
        if (typeof posthog !== 'undefined' && posthog.capture) {
          posthog.capture('exit_intent_converted', { page_path: path, email: email });
        }

        // Auto-close after 3 seconds
        setTimeout(hidePopup, 3000);
      })
      .catch(function () {
        errorEl.textContent = 'Something went wrong. Please try again.';
        errorEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Me the Guide';
      });
  });

  // ============================================
  // EXIT INTENT DETECTION - DESKTOP
  // ============================================

  var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    ('ontouchstart' in window && window.innerWidth < 1024);

  if (!isMobile) {
    document.addEventListener('mouseout', function (e) {
      // Only trigger when mouse leaves through the top of viewport
      if (e.clientY <= 0 && e.relatedTarget === null) {
        showPopup();
      }
    });
  }

  // ============================================
  // EXIT INTENT DETECTION - MOBILE
  // ============================================

  if (isMobile) {
    // Strategy 1: Fast scroll-up detection
    var lastScrollY = window.scrollY;
    var lastScrollTime = Date.now();
    var scrollCheckInterval = null;

    function checkScroll() {
      var currentY = window.scrollY;
      var currentTime = Date.now();
      var deltaY = currentY - lastScrollY;
      var deltaTime = currentTime - lastScrollTime;

      // Only consider if enough time has passed (debounce) and user has scrolled down first
      if (deltaTime > 50 && lastScrollY > 300) {
        var velocity = (deltaY / deltaTime) * 1000; // px per second
        if (velocity < SCROLL_THRESHOLD * 10) {
          // Fast upward scroll detected
          showPopup();
        }
      }

      lastScrollY = currentY;
      lastScrollTime = currentTime;
    }

    window.addEventListener('scroll', function () {
      if (!hasTriggered) {
        clearTimeout(scrollCheckInterval);
        scrollCheckInterval = setTimeout(checkScroll, 100);
      }
    }, { passive: true });

    // Strategy 2: Idle timer (30 seconds on page)
    setTimeout(function () {
      if (!hasTriggered && document.visibilityState !== 'hidden') {
        showPopup();
      }
    }, MOBILE_IDLE_MS);
  }

})();
