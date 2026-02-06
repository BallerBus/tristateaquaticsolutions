/**
 * Tri-State Aquatic Solutions - A/B Testing Utility
 * Lightweight A/B testing framework with GA4 integration
 *
 * @version 2.0.0
 * @author Tri-State Aquatic Solutions
 *
 * Usage:
 * 1. Define tests in TSAS_AB.register()
 * 2. Get variants with TSAS_AB.get('test-name')
 * 3. Track conversions with TSAS_AB.convert('test-name', 'event-name')
 */

(function() {
  'use strict';

  // Storage key prefix
  const STORAGE_PREFIX = 'tsas_ab_';
  const VISITOR_ID_KEY = STORAGE_PREFIX + 'visitor_id';
  const ASSIGNMENTS_KEY = STORAGE_PREFIX + 'assignments';

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    debug: false,
    ga4Enabled: true,
    cookieExpiry: 30, // days
    defaultWeight: 50
  };

  // Store registered tests and assignments
  const registeredTests = {};
  const assignments = loadAssignments();

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  /**
   * Generate a unique visitor ID
   */
  function generateVisitorId() {
    return 'v_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get or create visitor ID
   */
  function getVisitorId() {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = generateVisitorId();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  }

  /**
   * Hash function for deterministic variant assignment
   */
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * Load assignments from localStorage
   */
  function loadAssignments() {
    try {
      const stored = localStorage.getItem(ASSIGNMENTS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  /**
   * Save assignments to localStorage
   */
  function saveAssignments() {
    try {
      localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
    } catch (e) {
      console.warn('[TSAS_AB] Could not save assignments:', e);
    }
  }

  /**
   * Debug logger
   */
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[TSAS_AB]', ...args);
    }
  }

  /**
   * Track to GA4
   */
  function trackGA4(eventName, params) {
    if (!CONFIG.ga4Enabled) return;

    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
      log('GA4 event:', eventName, params);
    } else if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...params
      });
      log('dataLayer push:', eventName, params);
    }
  }

  /**
   * Select variant based on weights
   */
  function selectVariant(testName, variants, weights) {
    const visitorId = getVisitorId();
    const hash = hashCode(visitorId + testName);
    const bucket = (hash % 100) + 1; // 1-100

    let cumulative = 0;
    for (let i = 0; i < variants.length; i++) {
      cumulative += weights[i];
      if (bucket <= cumulative) {
        return variants[i];
      }
    }
    return variants[variants.length - 1];
  }

  // ============================================
  // MAIN A/B TESTING API
  // ============================================

  const TSAS_AB = {
    /**
     * Register a new A/B test
     * @param {string} testName - Unique test identifier
     * @param {Object} options - Test configuration
     * @param {Array<string>} options.variants - Variant names (first is control)
     * @param {Array<number>} [options.weights] - Variant weights (must sum to 100)
     * @param {string[]} [options.pages] - URL patterns to run on (optional)
     * @param {boolean} [options.active] - Whether test is active (default: true)
     * @returns {string} Assigned variant
     */
    register: function(testName, options) {
      const { variants, weights, pages, active = true } = options;

      // Validate
      if (!variants || variants.length < 2) {
        console.error('[TSAS_AB] Test must have at least 2 variants:', testName);
        return variants?.[0] || 'control';
      }

      // Calculate weights if not provided
      const finalWeights = weights || variants.map(() => Math.floor(100 / variants.length));

      // Store test config
      registeredTests[testName] = {
        variants,
        weights: finalWeights,
        pages,
        active
      };

      // Check if test should run on this page
      if (pages && pages.length > 0) {
        const currentPath = window.location.pathname;
        const shouldRun = pages.some(pattern => {
          if (pattern.endsWith('*')) {
            return currentPath.startsWith(pattern.slice(0, -1));
          }
          return currentPath === pattern || currentPath === pattern + '/';
        });
        if (!shouldRun) {
          log('Test not applicable to this page:', testName);
          return variants[0]; // Return control if not on target page
        }
      }

      // Check if active
      if (!active) {
        log('Test inactive:', testName);
        return variants[0];
      }

      // Get or assign variant
      return this.get(testName);
    },

    /**
     * Get variant for a test (assigns if not already assigned)
     * @param {string} testName - Test identifier
     * @returns {string|null} Variant name or null if test not found
     */
    get: function(testName) {
      // Return existing assignment
      if (assignments[testName]) {
        return assignments[testName].variant;
      }

      // Get test config
      const test = registeredTests[testName];
      if (!test) {
        log('Test not registered:', testName);
        return null;
      }

      // Assign variant
      const variant = selectVariant(testName, test.variants, test.weights);

      // Store assignment
      assignments[testName] = {
        variant,
        assignedAt: new Date().toISOString()
      };
      saveAssignments();

      // Track assignment to GA4
      trackGA4('experiment_assignment', {
        experiment_id: testName,
        experiment_variant: variant,
        experiment_name: testName.replace(/-/g, ' ')
      });

      // Add CSS class and data attribute
      document.body.classList.add(`ab-${testName}-${variant}`);
      document.body.setAttribute(`data-ab-${testName}`, variant);

      log('Assigned variant:', testName, '=', variant);
      return variant;
    },

    /**
     * Check if user is in a specific variant
     * @param {string} testName - Test identifier
     * @param {string} variantName - Variant to check
     * @returns {boolean}
     */
    is: function(testName, variantName) {
      return this.get(testName) === variantName;
    },

    /**
     * Track a conversion for a test
     * @param {string} testName - Test identifier
     * @param {string} conversionName - Conversion event name
     * @param {number} [value] - Optional conversion value
     */
    convert: function(testName, conversionName, value = null) {
      const variant = this.get(testName);
      if (!variant) {
        log('Cannot track conversion - test not found:', testName);
        return;
      }

      const params = {
        experiment_id: testName,
        experiment_variant: variant,
        conversion_event: conversionName
      };

      if (value !== null) {
        params.conversion_value = value;
      }

      trackGA4('experiment_conversion', params);
      log('Conversion tracked:', testName, conversionName, value);
    },

    /**
     * Force a specific variant (for testing/preview)
     * @param {string} testName - Test identifier
     * @param {string} variant - Variant to force
     */
    force: function(testName, variant) {
      assignments[testName] = {
        variant,
        assignedAt: new Date().toISOString(),
        forced: true
      };
      saveAssignments();

      document.body.classList.add(`ab-${testName}-${variant}`);
      document.body.setAttribute(`data-ab-${testName}`, variant);

      log('Forced variant:', testName, '=', variant);
    },

    /**
     * Reset a test assignment
     * @param {string} testName - Test identifier
     */
    reset: function(testName) {
      delete assignments[testName];
      saveAssignments();
      log('Reset test:', testName);
    },

    /**
     * Reset all test assignments
     */
    resetAll: function() {
      Object.keys(assignments).forEach(key => delete assignments[key]);
      saveAssignments();
      log('Reset all tests');
    },

    /**
     * Get all current assignments
     * @returns {Object} Map of test names to variants
     */
    getAll: function() {
      const result = {};
      Object.keys(assignments).forEach(key => {
        result[key] = assignments[key].variant;
      });
      return result;
    },

    /**
     * Enable debug mode
     */
    debug: function(enabled = true) {
      CONFIG.debug = enabled;
      log('Debug mode:', enabled ? 'enabled' : 'disabled');
    }
  };

  // ============================================
  // COMMON A/B TEST HELPERS
  // ============================================

  /**
   * Helper for CTA text tests
   */
  TSAS_AB.ctaText = function(testName, ctaVariants) {
    const variant = this.register(testName, {
      variants: Object.keys(ctaVariants)
    });
    return ctaVariants[variant] || ctaVariants[Object.keys(ctaVariants)[0]];
  };

  /**
   * Helper for showing/hiding form fields
   */
  TSAS_AB.formFields = function(testName, fieldConfigs) {
    const variants = Object.keys(fieldConfigs);
    const variant = this.register(testName, { variants });
    return fieldConfigs[variant] || fieldConfigs[variants[0]];
  };

  /**
   * Helper for headline tests
   */
  TSAS_AB.headline = function(testName, headlines) {
    const variant = this.register(testName, {
      variants: Object.keys(headlines)
    });
    return headlines[variant] || headlines[Object.keys(headlines)[0]];
  };

  /**
   * Helper for button color tests
   */
  TSAS_AB.buttonStyle = function(testName, styles) {
    const variant = this.register(testName, {
      variants: Object.keys(styles)
    });
    return styles[variant] || styles[Object.keys(styles)[0]];
  };

  /**
   * Apply variant content to elements with data-ab-content attribute
   * Format: data-ab-content='{"test":"test-name","control":"Control text","variant-a":"Variant text"}'
   */
  TSAS_AB.applyContent = function() {
    document.querySelectorAll('[data-ab-content]').forEach(el => {
      try {
        const config = JSON.parse(el.getAttribute('data-ab-content'));
        const variant = this.get(config.test);
        if (variant && config[variant]) {
          el.textContent = config[variant];
        }
      } catch (e) {
        console.error('[TSAS_AB] Invalid data-ab-content:', e);
      }
    });
  };

  /**
   * Show/hide elements based on variant
   * data-ab-show="test-name:variant-name"
   * data-ab-hide="test-name:variant-name"
   */
  TSAS_AB.applyVisibility = function() {
    // Show elements
    document.querySelectorAll('[data-ab-show]').forEach(el => {
      const [testName, variant] = el.getAttribute('data-ab-show').split(':');
      el.style.display = this.is(testName, variant) ? '' : 'none';
    });

    // Hide elements
    document.querySelectorAll('[data-ab-hide]').forEach(el => {
      const [testName, variant] = el.getAttribute('data-ab-hide').split(':');
      el.style.display = this.is(testName, variant) ? 'none' : '';
    });
  };

  // ============================================
  // URL PARAMETER OVERRIDE
  // ============================================

  // Allow forcing variants via URL: ?ab_test-name=variant-name
  function checkUrlOverrides() {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      if (key.startsWith('ab_')) {
        const testName = key.substring(3);
        TSAS_AB.force(testName, value);
        log('URL override:', testName, '=', value);
      }
    });
  }

  // ============================================
  // AUTO-INITIALIZATION
  // ============================================

  function init() {
    checkUrlOverrides();
    TSAS_AB.applyContent();
    TSAS_AB.applyVisibility();

    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('tsas-ab:ready', {
      detail: { assignments: TSAS_AB.getAll() }
    }));

    log('A/B Testing initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  window.TSAS_AB = TSAS_AB;

})();
