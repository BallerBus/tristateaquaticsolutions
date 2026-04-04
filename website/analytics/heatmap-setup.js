/**
 * Heatmap & Session Recording Setup
 * Tri-State Aquatic Solutions
 *
 * This file contains implementation code for PostHog
 * Configure privacy-compliant tracking with session recording filters
 *
 * PostHog is the ONLY heatmap/session recording platform used.
 */

// ============================================================================
// POSTHOG IMPLEMENTATION
// ============================================================================

/**
 * PostHog Setup
 *
 * 1. Create account at https://posthog.com
 * 2. Add your site and get your API Key
 * 3. Replace 'YOUR_POSTHOG_API_KEY' below
 */
const POSTHOG_API_KEY = 'YOUR_POSTHOG_API_KEY'; // e.g., 'phc_abc123xyz'
const POSTHOG_HOST = 'https://app.posthog.com';

function initPostHog() {
  // PostHog tracking script
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    enable_heatmaps: true,
    enable_recording_console_log: false,
    mask_all_text: false,
    mask_all_element_attributes: false
  });
}

/**
 * PostHog Custom Properties for User Segments
 * Call these functions to tag sessions for analysis
 */
const PostHogTags = {
  // Page type identification
  setPageType: function(pageType) {
    if (typeof posthog !== 'undefined') {
      posthog.people.set({ page_type: pageType });
      posthog.capture('page_type_set', { page_type: pageType });
    }
  },

  // User intent signals
  setUserIntent: function(intent) {
    // intent: 'browsing', 'researching', 'ready_to_buy', 'returning'
    if (typeof posthog !== 'undefined') {
      posthog.people.set({ user_intent: intent });
    }
  },

  // Service interest tracking
  setServiceInterest: function(service) {
    // service: 'fiberglass', 'vinyl', 'concrete', 'hot_tub', 'renovation'
    if (typeof posthog !== 'undefined') {
      posthog.people.set({ service_interest: service });
    }
  },

  // Lead quality indicators
  setLeadScore: function(score) {
    // score: 'hot', 'warm', 'cold'
    if (typeof posthog !== 'undefined') {
      posthog.people.set({ lead_score: score });
    }
  },

  // Geographic segment
  setServiceArea: function(area) {
    // area: 'delaware', 'chester_county', 'new_castle', 'montgomery_county'
    if (typeof posthog !== 'undefined') {
      posthog.people.set({ service_area: area });
    }
  },

  // Calculator usage
  trackCalculatorUse: function(calculatorType) {
    if (typeof posthog !== 'undefined') {
      posthog.capture('calculator_used', { calculator_type: calculatorType });
    }
  },

  // Form engagement level
  setFormEngagement: function(level) {
    // level: 'viewed', 'started', 'completed', 'abandoned'
    if (typeof posthog !== 'undefined') {
      posthog.capture('form_engagement', { form_engagement: level });
    }
  },

  // Device/traffic source
  setTrafficSource: function(source) {
    if (typeof posthog !== 'undefined') {
      posthog.people.set({ traffic_source: source });
    }
  },

  // Custom event tracking
  trackEvent: function(eventName, eventValue) {
    if (typeof posthog !== 'undefined') {
      posthog.capture(eventName, { value: eventValue });
    }
  }
};

/**
 * PostHog Privacy Configuration
 * Mask sensitive data from session recordings
 */
function configurePostHogPrivacy() {
  if (typeof posthog !== 'undefined') {
    // PostHog uses CSS class 'ph-no-capture' to mask elements
    // and data attribute 'data-ph-capture-attribute-*' to capture specific attributes
  }
}

// CSS class for masking (add to sensitive elements in HTML)
// Use: class="ph-no-capture" on elements containing sensitive data
const POSTHOG_MASK_STYLES = `
  /* Add to your CSS - PostHog will automatically mask these elements */
  .ph-no-capture {
    /* PostHog masks content with this class in session recordings */
  }

  /* Mask all form inputs by default */
  input[type="email"],
  input[type="tel"],
  input[type="password"],
  textarea {
    /* Add class="ph-no-capture" to these elements */
  }
`;


// ============================================================================
// PRIVACY-COMPLIANT CONFIGURATION
// ============================================================================

/**
 * Privacy compliance checklist and configuration
 */
const PrivacyConfig = {
  // Elements to always mask (add these classes/attributes to your HTML)
  sensitiveSelectors: [
    'input[type="email"]',
    'input[type="tel"]',
    'input[type="password"]',
    'input[name*="phone"]',
    'input[name*="address"]',
    'input[name*="name"]',
    'textarea[name*="message"]',
    '.customer-info',
    '.contact-details',
    '.quote-details',
    '#contact-form input',
    '#quote-form input'
  ],

  // Auto-mask sensitive elements on page load
  autoMaskSensitiveElements: function() {
    this.sensitiveSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // PostHog masking
        el.classList.add('ph-no-capture');
      });
    });
  },

  // Cookie consent integration
  initWithConsent: function(hasConsent) {
    if (hasConsent) {
      // Initialize tracking only with consent
      initPostHog();

      // Auto-mask sensitive elements
      this.autoMaskSensitiveElements();
    }
  },

  // Disable recording on certain pages
  excludedPages: [
    '/admin',
    '/account',
    '/checkout',
    '/payment'
  ],

  shouldTrack: function() {
    const currentPath = window.location.pathname;
    return !this.excludedPages.some(page => currentPath.startsWith(page));
  }
};


// ============================================================================
// SESSION RECORDING FILTERS
// ============================================================================

/**
 * Session recording filters to focus on valuable sessions
 */
const RecordingFilters = {
  // Track high-value user behaviors
  behaviors: {
    contactFormStart: false,
    contactFormComplete: false,
    calculatorUsed: false,
    multiplePageViews: false,
    servicePageViewed: false,
    pricingViewed: false,
    scrolledToBottom: false,
    timeOnSite: 0
  },

  // Update behavior flags
  trackBehavior: function(behavior, value = true) {
    this.behaviors[behavior] = value;

    // Tag session in PostHog
    PostHogTags.trackEvent(behavior, value.toString());
  },

  // Calculate session value score
  getSessionScore: function() {
    let score = 0;
    if (this.behaviors.contactFormStart) score += 30;
    if (this.behaviors.contactFormComplete) score += 50;
    if (this.behaviors.calculatorUsed) score += 20;
    if (this.behaviors.servicePageViewed) score += 15;
    if (this.behaviors.pricingViewed) score += 15;
    if (this.behaviors.scrolledToBottom) score += 10;
    if (this.behaviors.timeOnSite > 120) score += 10; // 2+ minutes
    if (this.behaviors.timeOnSite > 300) score += 10; // 5+ minutes

    return score;
  },

  // Label session quality
  labelSession: function() {
    const score = this.getSessionScore();
    let label;

    if (score >= 80) {
      label = 'hot_lead';
    } else if (score >= 50) {
      label = 'warm_lead';
    } else if (score >= 20) {
      label = 'engaged_visitor';
    } else {
      label = 'browser';
    }

    PostHogTags.setLeadScore(label);

    return label;
  }
};


// ============================================================================
// CUSTOM TAGS FOR USER SEGMENTS
// ============================================================================

/**
 * User segmentation based on behavior and context
 */
const UserSegmentation = {
  // Detect and tag traffic source
  detectTrafficSource: function() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;

    let source = 'direct';

    if (urlParams.get('utm_source')) {
      source = urlParams.get('utm_source');
    } else if (urlParams.get('gclid')) {
      source = 'google_ads';
    } else if (urlParams.get('fbclid')) {
      source = 'facebook_ads';
    } else if (referrer.includes('google.com')) {
      source = 'google_organic';
    } else if (referrer.includes('facebook.com')) {
      source = 'facebook_organic';
    } else if (referrer.includes('bing.com')) {
      source = 'bing_organic';
    } else if (referrer) {
      source = 'referral';
    }

    PostHogTags.setTrafficSource(source);

    return source;
  },

  // Detect page type and tag
  detectPageType: function() {
    const path = window.location.pathname;
    let pageType = 'other';

    if (path === '/' || path === '/index.html') {
      pageType = 'homepage';
    } else if (path.includes('/services')) {
      pageType = 'services';
    } else if (path.includes('/contact')) {
      pageType = 'contact';
    } else if (path.includes('/tools') || path.includes('/calculator')) {
      pageType = 'calculator';
    } else if (path.includes('/gallery') || path.includes('/portfolio')) {
      pageType = 'gallery';
    } else if (path.includes('/blog')) {
      pageType = 'blog';
    } else if (path.includes('/faq')) {
      pageType = 'faq';
    } else if (path.includes('/locations') || path.includes('/neighborhoods')) {
      pageType = 'location';
    } else if (path.includes('/financing')) {
      pageType = 'financing';
    } else if (path.includes('/reviews') || path.includes('/testimonials')) {
      pageType = 'social_proof';
    }

    PostHogTags.setPageType(pageType);

    return pageType;
  },

  // Detect service interest from page content
  detectServiceInterest: function() {
    const path = window.location.pathname;
    const content = document.body.innerText.toLowerCase();
    let service = 'general';

    if (path.includes('fiberglass') || content.includes('fiberglass pool')) {
      service = 'fiberglass';
    } else if (path.includes('vinyl') || content.includes('vinyl liner')) {
      service = 'vinyl';
    } else if (path.includes('concrete') || content.includes('gunite') || content.includes('concrete pool')) {
      service = 'concrete';
    } else if (path.includes('hot-tub') || path.includes('spa') || content.includes('hot tub')) {
      service = 'hot_tub';
    } else if (path.includes('renovation') || content.includes('renovation')) {
      service = 'renovation';
    }

    PostHogTags.setServiceInterest(service);

    return service;
  },

  // Detect geographic interest
  detectLocation: function() {
    const path = window.location.pathname;
    let area = 'tri_state';

    if (path.includes('delaware') || path.includes('wilmington') || path.includes('hockessin')) {
      area = 'delaware';
    } else if (path.includes('chester-county') || path.includes('west-chester')) {
      area = 'chester_county';
    } else if (path.includes('montgomery-county') || path.includes('gladwyne')) {
      area = 'montgomery_county';
    } else if (path.includes('new-castle')) {
      area = 'new_castle';
    }

    PostHogTags.setServiceArea(area);

    return area;
  },

  // Run all segmentation
  segmentUser: function() {
    return {
      source: this.detectTrafficSource(),
      pageType: this.detectPageType(),
      service: this.detectServiceInterest(),
      location: this.detectLocation()
    };
  }
};


// ============================================================================
// EVENT TRACKING FOR UX ANALYSIS
// ============================================================================

/**
 * Track specific user interactions for heatmap and session analysis
 */
const UXEventTracking = {
  // Track scroll depth
  initScrollTracking: function() {
    const depths = [25, 50, 75, 90, 100];
    const tracked = new Set();

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );

      depths.forEach(depth => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          tracked.add(depth);
          PostHogTags.trackEvent('scroll_depth', depth.toString());

          if (depth === 90) {
            RecordingFilters.trackBehavior('scrolledToBottom');
          }
        }
      });
    });
  },

  // Track time on site
  initTimeTracking: function() {
    const startTime = Date.now();

    setInterval(() => {
      const timeOnSite = Math.round((Date.now() - startTime) / 1000);
      RecordingFilters.behaviors.timeOnSite = timeOnSite;

      // Tag milestones
      if (timeOnSite === 30) {
        PostHogTags.trackEvent('time_on_site', '30s');
      } else if (timeOnSite === 60) {
        PostHogTags.trackEvent('time_on_site', '1m');
      } else if (timeOnSite === 180) {
        PostHogTags.trackEvent('time_on_site', '3m');
      } else if (timeOnSite === 300) {
        PostHogTags.trackEvent('time_on_site', '5m');
      }
    }, 10000); // Check every 10 seconds
  },

  // Track form interactions
  initFormTracking: function() {
    // Contact form
    const contactForm = document.querySelector('#contact-form, [data-form="contact"]');
    if (contactForm) {
      contactForm.addEventListener('focus', () => {
        RecordingFilters.trackBehavior('contactFormStart');
        PostHogTags.setFormEngagement('started');
      }, { once: true, capture: true });

      contactForm.addEventListener('submit', () => {
        RecordingFilters.trackBehavior('contactFormComplete');
        PostHogTags.setFormEngagement('completed');
      });
    }

    // Quote form
    const quoteForm = document.querySelector('#quote-form, [data-form="quote"]');
    if (quoteForm) {
      quoteForm.addEventListener('focus', () => {
        PostHogTags.trackEvent('quote_form', 'started');
      }, { once: true, capture: true });

      quoteForm.addEventListener('submit', () => {
        PostHogTags.trackEvent('quote_form', 'completed');
      });
    }
  },

  // Track CTA clicks
  initCTATracking: function() {
    document.querySelectorAll('[data-cta], .cta-button, .btn-primary').forEach(cta => {
      cta.addEventListener('click', () => {
        const ctaName = cta.dataset.cta || cta.innerText.trim().substring(0, 30);
        PostHogTags.trackEvent('cta_click', ctaName);
      });
    });
  },

  // Track calculator usage
  initCalculatorTracking: function() {
    const calculators = document.querySelectorAll('[data-calculator], .calculator-widget');
    calculators.forEach(calc => {
      calc.addEventListener('input', () => {
        const calcType = calc.dataset.calculator || 'pool_cost';
        if (!RecordingFilters.behaviors.calculatorUsed) {
          RecordingFilters.trackBehavior('calculatorUsed');
          PostHogTags.trackCalculatorUse(calcType);
        }
      }, { once: true });
    });
  },

  // Track rage clicks (rapid repeated clicks)
  initRageClickDetection: function() {
    let clickCount = 0;
    let lastClickTime = 0;
    let lastClickTarget = null;

    document.addEventListener('click', (e) => {
      const now = Date.now();
      const target = e.target;

      if (target === lastClickTarget && now - lastClickTime < 500) {
        clickCount++;
        if (clickCount >= 3) {
          PostHogTags.trackEvent('rage_click', target.tagName + '.' + target.className);
          clickCount = 0;
        }
      } else {
        clickCount = 1;
      }

      lastClickTime = now;
      lastClickTarget = target;
    });
  },

  // Initialize all tracking
  init: function() {
    this.initScrollTracking();
    this.initTimeTracking();
    this.initFormTracking();
    this.initCTATracking();
    this.initCalculatorTracking();
    this.initRageClickDetection();
  }
};


// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize heatmap and session recording
 * Call this function when the page loads (with cookie consent)
 */
function initHeatmapTracking(options = {}) {
  const {
    hasConsent = true,
    autoSegment = true,
    autoTrackEvents = true
  } = options;

  // Check if tracking should be enabled
  if (!hasConsent || !PrivacyConfig.shouldTrack()) {
    console.log('Heatmap tracking disabled (no consent or excluded page)');
    return;
  }

  // Initialize PostHog
  initPostHog();
  console.log('PostHog initialized');

  // Auto-mask sensitive elements
  PrivacyConfig.autoMaskSensitiveElements();

  // Auto-segment user
  if (autoSegment) {
    UserSegmentation.segmentUser();
  }

  // Initialize event tracking
  if (autoTrackEvents) {
    UXEventTracking.init();
  }

  // Label session on page unload
  window.addEventListener('beforeunload', () => {
    RecordingFilters.labelSession();
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initHeatmapTracking,
    initPostHog,
    PostHogTags,
    PrivacyConfig,
    RecordingFilters,
    UserSegmentation,
    UXEventTracking
  };
}

// Auto-initialize on DOM ready (comment out if using manual initialization)
// document.addEventListener('DOMContentLoaded', () => {
//   initHeatmapTracking();
// });


// ============================================================================
// HTML IMPLEMENTATION EXAMPLES
// ============================================================================

/**
 * Example HTML snippets for implementation
 *
 * 1. Add tracking script to <head>:
 *
 * <script src="/analytics/heatmap-setup.js"></script>
 * <script>
 *   // Initialize with cookie consent check
 *   if (hasUserConsent()) {
 *     initHeatmapTracking();
 *   }
 * </script>
 *
 * 2. Mask sensitive form fields:
 *
 * <input type="email" name="email" class="ph-no-capture">
 * <input type="tel" name="phone" class="ph-no-capture">
 * <textarea name="message" class="ph-no-capture"></textarea>
 *
 * 3. Track CTA buttons:
 *
 * <button data-cta="get-free-quote" class="cta-button">Get Free Quote</button>
 * <a href="/contact" data-cta="schedule-consultation">Schedule Consultation</a>
 *
 * 4. Track calculators:
 *
 * <div data-calculator="pool-cost" class="calculator-widget">
 *   <!-- Calculator content -->
 * </div>
 *
 * 5. Mark contact form:
 *
 * <form id="contact-form" data-form="contact">
 *   <!-- Form fields -->
 * </form>
 */
