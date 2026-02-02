/**
 * Tri-State Aquatic Solutions A/B Testing Framework
 * Simple vanilla JS implementation with GA4 integration
 *
 * Usage:
 * 1. Define experiments in the EXPERIMENTS object
 * 2. Call ABTest.init() on page load
 * 3. Use ABTest.getVariant('experiment-name') to get assigned variant
 * 4. Track conversions with ABTest.trackConversion('experiment-name', 'event-name')
 */

const ABTest = (function() {
  'use strict';

  // ============================================
  // EXPERIMENT CONFIGURATION
  // ============================================
  const EXPERIMENTS = {
    // Example experiment structure:
    // 'experiment-id': {
    //   name: 'Human readable name',
    //   variants: ['control', 'variant-a', 'variant-b'],
    //   weights: [50, 25, 25], // Optional: default is equal distribution
    //   targetPages: ['/'], // Optional: pages where experiment runs
    //   startDate: '2024-01-01', // Optional: experiment start date
    //   endDate: '2024-02-01', // Optional: experiment end date
    //   active: true
    // }

    'hero-headline': {
      name: 'Hero Section Headline Test',
      variants: ['control', 'urgency', 'value-prop'],
      weights: [34, 33, 33],
      targetPages: ['/'],
      active: true
    },

    'cta-button-text': {
      name: 'CTA Button Text Test',
      variants: ['control', 'action-oriented', 'benefit-focused'],
      weights: [34, 33, 33],
      targetPages: ['/'],
      active: true
    },

    'form-layout': {
      name: 'Contact Form Layout Test',
      variants: ['control', 'single-column', 'progressive'],
      weights: [34, 33, 33],
      targetPages: ['/', '/contact'],
      active: true
    },

    'pricing-display': {
      name: 'Pricing Display Format Test',
      variants: ['control', 'range-display', 'starting-at'],
      weights: [50, 50],
      targetPages: ['/services', '/fiberglass-pools'],
      active: true
    },

    'social-proof-position': {
      name: 'Social Proof Placement Test',
      variants: ['control', 'above-fold', 'near-cta'],
      weights: [34, 33, 33],
      targetPages: ['/'],
      active: true
    }
  };

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    storagePrefix: 'tsas_ab_',
    cookieExpiry: 30, // days
    debug: false, // Set to true for console logging
    ga4Enabled: true
  };

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
    let visitorId = localStorage.getItem(CONFIG.storagePrefix + 'visitor_id');
    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem(CONFIG.storagePrefix + 'visitor_id', visitorId);
    }
    return visitorId;
  }

  /**
   * Simple hash function for consistent variant assignment
   */
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Select variant based on weights
   */
  function selectVariant(experimentId, variants, weights) {
    const visitorId = getVisitorId();
    const hash = hashString(visitorId + experimentId);
    const normalizedHash = (hash % 100) + 1; // 1-100

    // If no weights provided, use equal distribution
    if (!weights || weights.length !== variants.length) {
      weights = variants.map(() => Math.floor(100 / variants.length));
    }

    let cumulative = 0;
    for (let i = 0; i < variants.length; i++) {
      cumulative += weights[i];
      if (normalizedHash <= cumulative) {
        return variants[i];
      }
    }

    return variants[variants.length - 1];
  }

  /**
   * Check if current page matches target pages
   */
  function isTargetPage(targetPages) {
    if (!targetPages || targetPages.length === 0) {
      return true; // No restriction, run on all pages
    }

    const currentPath = window.location.pathname;
    return targetPages.some(page => {
      if (page.endsWith('*')) {
        return currentPath.startsWith(page.slice(0, -1));
      }
      return currentPath === page || currentPath === page + '/';
    });
  }

  /**
   * Check if experiment is within date range
   */
  function isWithinDateRange(startDate, endDate) {
    const now = new Date();
    if (startDate && new Date(startDate) > now) {
      return false;
    }
    if (endDate && new Date(endDate) < now) {
      return false;
    }
    return true;
  }

  /**
   * Log debug messages
   */
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[ABTest]', ...args);
    }
  }

  // ============================================
  // STORAGE FUNCTIONS
  // ============================================

  /**
   * Get assigned variant from storage
   */
  function getStoredVariant(experimentId) {
    const stored = localStorage.getItem(CONFIG.storagePrefix + experimentId);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return data.variant;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Store variant assignment
   */
  function storeVariant(experimentId, variant) {
    const data = {
      variant: variant,
      assignedAt: new Date().toISOString(),
      visitorId: getVisitorId()
    };
    localStorage.setItem(CONFIG.storagePrefix + experimentId, JSON.stringify(data));
  }

  // ============================================
  // GA4 INTEGRATION
  // ============================================

  /**
   * Send experiment data to GA4
   */
  function sendToGA4(eventName, experimentId, variant, additionalParams = {}) {
    if (!CONFIG.ga4Enabled) return;

    // Check if gtag is available
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        experiment_id: experimentId,
        experiment_variant: variant,
        ...additionalParams
      });
      log('GA4 event sent:', eventName, experimentId, variant);
    } else {
      log('GA4 not available');
    }
  }

  /**
   * Send experiment exposure to GA4
   */
  function trackExposure(experimentId, variant) {
    sendToGA4('experiment_exposure', experimentId, variant);
  }

  /**
   * Send conversion to GA4
   */
  function trackConversionToGA4(experimentId, variant, conversionEvent, value = null) {
    const params = { conversion_event: conversionEvent };
    if (value !== null) {
      params.conversion_value = value;
    }
    sendToGA4('experiment_conversion', experimentId, variant, params);
  }

  // ============================================
  // PUBLIC API
  // ============================================

  const assignedVariants = {};

  return {
    /**
     * Initialize the A/B testing framework
     * Call this on page load
     */
    init: function() {
      log('Initializing A/B Testing Framework');

      Object.keys(EXPERIMENTS).forEach(experimentId => {
        const experiment = EXPERIMENTS[experimentId];

        // Check if experiment is active
        if (!experiment.active) {
          log('Experiment inactive:', experimentId);
          return;
        }

        // Check date range
        if (!isWithinDateRange(experiment.startDate, experiment.endDate)) {
          log('Experiment outside date range:', experimentId);
          return;
        }

        // Check target pages
        if (!isTargetPage(experiment.targetPages)) {
          log('Not on target page for:', experimentId);
          return;
        }

        // Get or assign variant
        let variant = getStoredVariant(experimentId);
        if (!variant) {
          variant = selectVariant(experimentId, experiment.variants, experiment.weights);
          storeVariant(experimentId, variant);
          log('New variant assigned:', experimentId, variant);
        } else {
          log('Existing variant:', experimentId, variant);
        }

        assignedVariants[experimentId] = variant;

        // Track exposure
        trackExposure(experimentId, variant);

        // Add variant class to body for CSS targeting
        document.body.classList.add(`ab-${experimentId}-${variant}`);

        // Set data attribute on body
        document.body.setAttribute(`data-ab-${experimentId}`, variant);
      });

      log('Active experiments:', assignedVariants);

      // Dispatch event for other scripts
      window.dispatchEvent(new CustomEvent('abtesting:ready', {
        detail: { variants: assignedVariants }
      }));

      return assignedVariants;
    },

    /**
     * Get the assigned variant for an experiment
     * @param {string} experimentId - The experiment ID
     * @returns {string|null} - The variant name or null if not assigned
     */
    getVariant: function(experimentId) {
      return assignedVariants[experimentId] || getStoredVariant(experimentId) || null;
    },

    /**
     * Check if user is in a specific variant
     * @param {string} experimentId - The experiment ID
     * @param {string} variantName - The variant to check
     * @returns {boolean}
     */
    isVariant: function(experimentId, variantName) {
      return this.getVariant(experimentId) === variantName;
    },

    /**
     * Track a conversion event
     * @param {string} experimentId - The experiment ID
     * @param {string} conversionEvent - Name of the conversion event
     * @param {number} [value] - Optional conversion value
     */
    trackConversion: function(experimentId, conversionEvent, value = null) {
      const variant = this.getVariant(experimentId);
      if (variant) {
        trackConversionToGA4(experimentId, variant, conversionEvent, value);
        log('Conversion tracked:', experimentId, conversionEvent, value);

        // Store conversion locally for debugging
        const conversions = JSON.parse(localStorage.getItem(CONFIG.storagePrefix + 'conversions') || '[]');
        conversions.push({
          experimentId,
          variant,
          event: conversionEvent,
          value,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem(CONFIG.storagePrefix + 'conversions', JSON.stringify(conversions.slice(-100)));
      }
    },

    /**
     * Get all assigned variants
     * @returns {Object} - Map of experiment IDs to variants
     */
    getAllVariants: function() {
      return { ...assignedVariants };
    },

    /**
     * Force a specific variant (for testing/preview)
     * @param {string} experimentId - The experiment ID
     * @param {string} variant - The variant to force
     */
    forceVariant: function(experimentId, variant) {
      storeVariant(experimentId, variant);
      assignedVariants[experimentId] = variant;
      document.body.classList.add(`ab-${experimentId}-${variant}`);
      document.body.setAttribute(`data-ab-${experimentId}`, variant);
      log('Variant forced:', experimentId, variant);
    },

    /**
     * Reset a specific experiment (for testing)
     * @param {string} experimentId - The experiment ID
     */
    resetExperiment: function(experimentId) {
      localStorage.removeItem(CONFIG.storagePrefix + experimentId);
      delete assignedVariants[experimentId];
      log('Experiment reset:', experimentId);
    },

    /**
     * Reset all experiments (for testing)
     */
    resetAll: function() {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CONFIG.storagePrefix)) {
          localStorage.removeItem(key);
        }
      });
      Object.keys(assignedVariants).forEach(key => delete assignedVariants[key]);
      log('All experiments reset');
    },

    /**
     * Enable debug mode
     */
    enableDebug: function() {
      CONFIG.debug = true;
      log('Debug mode enabled');
    },

    /**
     * Get experiment configuration
     * @param {string} experimentId - The experiment ID
     * @returns {Object|null}
     */
    getExperiment: function(experimentId) {
      return EXPERIMENTS[experimentId] || null;
    },

    /**
     * Get all experiments
     * @returns {Object}
     */
    getAllExperiments: function() {
      return { ...EXPERIMENTS };
    },

    /**
     * Add a new experiment dynamically
     * @param {string} experimentId - Unique experiment ID
     * @param {Object} config - Experiment configuration
     */
    addExperiment: function(experimentId, config) {
      if (EXPERIMENTS[experimentId]) {
        log('Experiment already exists:', experimentId);
        return false;
      }
      EXPERIMENTS[experimentId] = {
        active: true,
        ...config
      };
      log('Experiment added:', experimentId);
      return true;
    },

    /**
     * Deactivate an experiment
     * @param {string} experimentId - The experiment ID
     */
    deactivateExperiment: function(experimentId) {
      if (EXPERIMENTS[experimentId]) {
        EXPERIMENTS[experimentId].active = false;
        log('Experiment deactivated:', experimentId);
      }
    }
  };
})();

// ============================================
// VARIANT CONTENT HELPERS
// ============================================

/**
 * Show/hide elements based on variant
 * Usage: Add data-ab-show="experiment-id:variant" to elements
 */
function applyVariantContent() {
  // Show elements for specific variants
  document.querySelectorAll('[data-ab-show]').forEach(el => {
    const [experimentId, variant] = el.getAttribute('data-ab-show').split(':');
    if (ABTest.isVariant(experimentId, variant)) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });

  // Hide elements for specific variants
  document.querySelectorAll('[data-ab-hide]').forEach(el => {
    const [experimentId, variant] = el.getAttribute('data-ab-hide').split(':');
    if (ABTest.isVariant(experimentId, variant)) {
      el.style.display = 'none';
    }
  });

  // Replace text content based on variant
  document.querySelectorAll('[data-ab-text]').forEach(el => {
    const config = el.getAttribute('data-ab-text');
    try {
      const parsed = JSON.parse(config);
      const variant = ABTest.getVariant(parsed.experiment);
      if (variant && parsed[variant]) {
        el.textContent = parsed[variant];
      }
    } catch (e) {
      console.error('Invalid data-ab-text config:', config);
    }
  });
}

// ============================================
// AUTO-INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    ABTest.init();
    applyVariantContent();
  });
} else {
  ABTest.init();
  applyVariantContent();
}

// Listen for ready event to apply variant content
window.addEventListener('abtesting:ready', function() {
  applyVariantContent();
});

// ============================================
// CONVERSION TRACKING HELPERS
// ============================================

/**
 * Auto-track form submissions
 */
document.addEventListener('submit', function(e) {
  const form = e.target;
  if (form.hasAttribute('data-ab-track')) {
    const trackConfig = form.getAttribute('data-ab-track');
    try {
      const parsed = JSON.parse(trackConfig);
      ABTest.trackConversion(parsed.experiment, parsed.event, parsed.value);
    } catch (err) {
      // Simple format: just experiment ID
      ABTest.trackConversion(trackConfig, 'form_submit');
    }
  }
});

/**
 * Auto-track button clicks with data-ab-track attribute
 */
document.addEventListener('click', function(e) {
  const button = e.target.closest('[data-ab-track-click]');
  if (button) {
    const trackConfig = button.getAttribute('data-ab-track-click');
    try {
      const parsed = JSON.parse(trackConfig);
      ABTest.trackConversion(parsed.experiment, parsed.event, parsed.value);
    } catch (err) {
      // Simple format: experiment:event
      const [experimentId, event] = trackConfig.split(':');
      ABTest.trackConversion(experimentId, event || 'button_click');
    }
  }
});

// Make ABTest available globally
window.ABTest = ABTest;
