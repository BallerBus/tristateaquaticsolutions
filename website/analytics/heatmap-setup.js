/**
 * Heatmap & Session Recording Setup
 * Tri-State Aquatic Solutions
 *
 * This file contains implementation code for Microsoft Clarity and Hotjar
 * Configure privacy-compliant tracking with session recording filters
 */

// ============================================================================
// MICROSOFT CLARITY IMPLEMENTATION
// ============================================================================

/**
 * Microsoft Clarity Setup
 *
 * 1. Create account at https://clarity.microsoft.com
 * 2. Add your site and get your Project ID
 * 3. Replace 'YOUR_CLARITY_PROJECT_ID' below
 */
const CLARITY_PROJECT_ID = 'YOUR_CLARITY_PROJECT_ID'; // e.g., 'abc123xyz'

function initMicrosoftClarity() {
  // Clarity tracking script
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
}

/**
 * Clarity Custom Tags for User Segments
 * Call these functions to tag sessions for analysis
 */
const ClarityTags = {
  // Page type identification
  setPageType: function(pageType) {
    if (typeof clarity !== 'undefined') {
      clarity('set', 'page_type', pageType);
    }
  },

  // User intent signals
  setUserIntent: function(intent) {
    // intent: 'browsing', 'researching', 'ready_to_buy', 'returning'
    if (typeof clarity !== 'undefined') {
      clarity('set', 'user_intent', intent);
    }
  },

  // Service interest tracking
  setServiceInterest: function(service) {
    // service: 'fiberglass', 'vinyl', 'concrete', 'hot_tub', 'renovation'
    if (typeof clarity !== 'undefined') {
      clarity('set', 'service_interest', service);
    }
  },

  // Lead quality indicators
  setLeadScore: function(score) {
    // score: 'hot', 'warm', 'cold'
    if (typeof clarity !== 'undefined') {
      clarity('set', 'lead_score', score);
    }
  },

  // Geographic segment
  setServiceArea: function(area) {
    // area: 'delaware', 'chester_county', 'new_castle', 'montgomery_county'
    if (typeof clarity !== 'undefined') {
      clarity('set', 'service_area', area);
    }
  },

  // Calculator usage
  trackCalculatorUse: function(calculatorType) {
    if (typeof clarity !== 'undefined') {
      clarity('set', 'calculator_used', calculatorType);
    }
  },

  // Form engagement level
  setFormEngagement: function(level) {
    // level: 'viewed', 'started', 'completed', 'abandoned'
    if (typeof clarity !== 'undefined') {
      clarity('set', 'form_engagement', level);
    }
  },

  // Device/traffic source
  setTrafficSource: function(source) {
    if (typeof clarity !== 'undefined') {
      clarity('set', 'traffic_source', source);
    }
  },

  // Custom event tracking
  trackEvent: function(eventName, eventValue) {
    if (typeof clarity !== 'undefined') {
      clarity('set', eventName, eventValue);
    }
  }
};

/**
 * Clarity Privacy Configuration
 * Mask sensitive data from session recordings
 */
function configureClarityPrivacy() {
  if (typeof clarity !== 'undefined') {
    // Upgrade session to force recording for important interactions
    clarity('upgrade', 'key_interaction');
  }
}

// CSS class for masking (add to sensitive elements in HTML)
// Use: class="clarity-mask" on elements containing sensitive data
const CLARITY_MASK_STYLES = `
  /* Add to your CSS - Clarity will automatically mask these elements */
  .clarity-mask {
    /* Clarity masks content with this class */
  }

  /* Alternative: Use data attribute */
  /* data-clarity-mask="true" */

  /* Mask all form inputs by default */
  input[type="email"],
  input[type="tel"],
  input[type="password"],
  textarea {
    /* Add data-clarity-mask="true" to these elements */
  }
`;


// ============================================================================
// HOTJAR IMPLEMENTATION (ALTERNATIVE)
// ============================================================================

/**
 * Hotjar Setup
 *
 * 1. Create account at https://hotjar.com
 * 2. Add your site and get your Site ID
 * 3. Replace 'YOUR_HOTJAR_SITE_ID' below
 */
const HOTJAR_SITE_ID = 'YOUR_HOTJAR_SITE_ID'; // e.g., 1234567
const HOTJAR_VERSION = 6;

function initHotjar() {
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:HOTJAR_SITE_ID,hjsv:HOTJAR_VERSION};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}

/**
 * Hotjar Custom Tags for User Segments
 */
const HotjarTags = {
  // Identify user (for returning visitors, CRM integration)
  identifyUser: function(userId, attributes) {
    if (typeof hj !== 'undefined') {
      hj('identify', userId, attributes);
    }
  },

  // Tag recording with custom attributes
  tagRecording: function(tags) {
    if (typeof hj !== 'undefined') {
      hj('tagRecording', tags);
    }
  },

  // Trigger events
  triggerEvent: function(eventName) {
    if (typeof hj !== 'undefined') {
      hj('event', eventName);
    }
  },

  // State change (for SPAs)
  stateChange: function(url) {
    if (typeof hj !== 'undefined') {
      hj('stateChange', url);
    }
  },

  // Trigger feedback poll
  triggerPoll: function(pollId) {
    if (typeof hj !== 'undefined') {
      hj('trigger', pollId);
    }
  }
};

/**
 * Hotjar Privacy Configuration
 */
function configureHotjarPrivacy() {
  // Add these CSS classes to mask sensitive content
  // .hj-suppress - Completely hides element content
  // .hj-exclude - Excludes element from recording

  // Suppress sensitive form fields by adding data attribute
  // data-hj-suppress="true"

  // Whitelist specific inputs (if using suppress-all mode)
  // data-hj-allow="true"
}

const HOTJAR_MASK_STYLES = `
  /* Hotjar masking classes */

  /* Suppress - replaces content with asterisks */
  .hj-suppress {
    /* Content will be masked in recordings */
  }

  /* Exclude - completely removes from recording */
  .hj-exclude {
    /* Element won't appear in recordings */
  }

  /* Form field masking */
  input[type="email"],
  input[type="tel"],
  input[type="ssn"],
  input[name="phone"],
  input[name="address"],
  textarea[name="message"] {
    /* Add data-hj-suppress to mask these */
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
        // Clarity masking
        el.setAttribute('data-clarity-mask', 'true');
        // Hotjar masking
        el.classList.add('hj-suppress');
      });
    });
  },

  // Cookie consent integration
  initWithConsent: function(hasConsent) {
    if (hasConsent) {
      // Initialize tracking only with consent
      initMicrosoftClarity();
      // OR
      // initHotjar();

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

    // Tag session in Clarity
    ClarityTags.trackEvent(behavior, value.toString());

    // Tag session in Hotjar
    HotjarTags.tagRecording([behavior]);
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

    ClarityTags.setLeadScore(label);
    HotjarTags.tagRecording([label]);

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

    ClarityTags.setTrafficSource(source);
    HotjarTags.tagRecording(['source_' + source]);

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

    ClarityTags.setPageType(pageType);
    HotjarTags.tagRecording(['page_' + pageType]);

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

    ClarityTags.setServiceInterest(service);
    HotjarTags.tagRecording(['interest_' + service]);

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

    ClarityTags.setServiceArea(area);
    HotjarTags.tagRecording(['area_' + area]);

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
          ClarityTags.trackEvent('scroll_depth', depth.toString());
          HotjarTags.triggerEvent('scroll_' + depth);

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
        ClarityTags.trackEvent('time_on_site', '30s');
      } else if (timeOnSite === 60) {
        ClarityTags.trackEvent('time_on_site', '1m');
      } else if (timeOnSite === 180) {
        ClarityTags.trackEvent('time_on_site', '3m');
      } else if (timeOnSite === 300) {
        ClarityTags.trackEvent('time_on_site', '5m');
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
        ClarityTags.setFormEngagement('started');
      }, { once: true, capture: true });

      contactForm.addEventListener('submit', () => {
        RecordingFilters.trackBehavior('contactFormComplete');
        ClarityTags.setFormEngagement('completed');
        HotjarTags.triggerEvent('form_submitted');
      });
    }

    // Quote form
    const quoteForm = document.querySelector('#quote-form, [data-form="quote"]');
    if (quoteForm) {
      quoteForm.addEventListener('focus', () => {
        ClarityTags.trackEvent('quote_form', 'started');
      }, { once: true, capture: true });

      quoteForm.addEventListener('submit', () => {
        ClarityTags.trackEvent('quote_form', 'completed');
        HotjarTags.triggerEvent('quote_requested');
      });
    }
  },

  // Track CTA clicks
  initCTATracking: function() {
    document.querySelectorAll('[data-cta], .cta-button, .btn-primary').forEach(cta => {
      cta.addEventListener('click', () => {
        const ctaName = cta.dataset.cta || cta.innerText.trim().substring(0, 30);
        ClarityTags.trackEvent('cta_click', ctaName);
        HotjarTags.triggerEvent('cta_' + ctaName.replace(/\s+/g, '_').toLowerCase());
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
          ClarityTags.trackCalculatorUse(calcType);
          HotjarTags.triggerEvent('calculator_used');
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
          ClarityTags.trackEvent('rage_click', target.tagName + '.' + target.className);
          HotjarTags.triggerEvent('rage_click');
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
    provider = 'clarity', // 'clarity' or 'hotjar'
    hasConsent = true,
    autoSegment = true,
    autoTrackEvents = true
  } = options;

  // Check if tracking should be enabled
  if (!hasConsent || !PrivacyConfig.shouldTrack()) {
    console.log('Heatmap tracking disabled (no consent or excluded page)');
    return;
  }

  // Initialize selected provider
  if (provider === 'clarity') {
    initMicrosoftClarity();
    console.log('Microsoft Clarity initialized');
  } else if (provider === 'hotjar') {
    initHotjar();
    console.log('Hotjar initialized');
  }

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
    initMicrosoftClarity,
    initHotjar,
    ClarityTags,
    HotjarTags,
    PrivacyConfig,
    RecordingFilters,
    UserSegmentation,
    UXEventTracking
  };
}

// Auto-initialize on DOM ready (comment out if using manual initialization)
// document.addEventListener('DOMContentLoaded', () => {
//   initHeatmapTracking({ provider: 'clarity' });
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
 *     initHeatmapTracking({ provider: 'clarity' });
 *   }
 * </script>
 *
 * 2. Mask sensitive form fields:
 *
 * <input type="email" name="email" data-clarity-mask="true" class="hj-suppress">
 * <input type="tel" name="phone" data-clarity-mask="true" class="hj-suppress">
 * <textarea name="message" data-clarity-mask="true" class="hj-suppress"></textarea>
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
