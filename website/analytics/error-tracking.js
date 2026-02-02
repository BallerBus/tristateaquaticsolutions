/**
 * Error Tracking & Monitoring
 * Tri-State Aquatic Solutions
 *
 * Comprehensive client-side error tracking including:
 * - JavaScript errors
 * - Console error capture
 * - Network/fetch errors
 * - Form submission errors
 * - Resource loading errors
 * - Custom error tracking
 *
 * Integrates with GA4/GTM data layer and can send to external services
 */

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURATION
  // ============================================================================

  const CONFIG = {
    // Enable/disable error tracking features
    enabled: true,
    trackJSErrors: true,
    trackConsoleErrors: true,
    trackNetworkErrors: true,
    trackFormErrors: true,
    trackResourceErrors: true,
    trackPromiseRejections: true,

    // Sampling rate (1.0 = 100%, 0.1 = 10%)
    samplingRate: 1.0,

    // Maximum errors to track per session (prevent spam)
    maxErrorsPerSession: 50,

    // Error debounce (prevent duplicate errors in ms)
    debounceMs: 1000,

    // Endpoints for error reporting
    endpoints: {
      // GA4 Measurement Protocol (optional - for server-side tracking)
      ga4MeasurementProtocol: null,
      // Custom error endpoint (optional)
      customEndpoint: null
    },

    // Ignored error patterns (regex patterns)
    ignoredPatterns: [
      /ResizeObserver loop/i,
      /Script error\.?$/i,
      /Loading chunk \d+ failed/i,
      /NetworkError/i,
      /AbortError/i,
      /cancelled/i,
      /extension/i,
      /chrome-extension/i,
      /moz-extension/i
    ],

    // Ignored URLs (don't track errors from these)
    ignoredUrls: [
      /google-analytics\.com/i,
      /googletagmanager\.com/i,
      /doubleclick\.net/i,
      /facebook\.net/i,
      /twitter\.com/i
    ]
  };

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const state = {
    errorCount: 0,
    recentErrors: new Map(), // For debouncing
    sessionId: generateSessionId(),
    pageLoadTime: Date.now()
  };

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  function generateSessionId() {
    return 'err_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
  }

  function shouldSample() {
    return Math.random() < CONFIG.samplingRate;
  }

  function shouldIgnore(errorMessage, errorUrl) {
    // Check message patterns
    if (errorMessage) {
      for (const pattern of CONFIG.ignoredPatterns) {
        if (pattern.test(errorMessage)) {
          return true;
        }
      }
    }

    // Check URL patterns
    if (errorUrl) {
      for (const pattern of CONFIG.ignoredUrls) {
        if (pattern.test(errorUrl)) {
          return true;
        }
      }
    }

    return false;
  }

  function debounce(errorKey) {
    const now = Date.now();
    const lastTime = state.recentErrors.get(errorKey);

    if (lastTime && (now - lastTime) < CONFIG.debounceMs) {
      return true; // Skip - too recent
    }

    state.recentErrors.set(errorKey, now);

    // Clean up old entries periodically
    if (state.recentErrors.size > 100) {
      for (const [key, time] of state.recentErrors) {
        if (now - time > CONFIG.debounceMs * 10) {
          state.recentErrors.delete(key);
        }
      }
    }

    return false;
  }

  function truncate(str, maxLength = 500) {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  }

  function getStackTrace(error) {
    if (!error || !error.stack) return '';

    // Clean and truncate stack trace
    const lines = error.stack.split('\n').slice(0, 10);
    return truncate(lines.join('\n'), 1000);
  }

  function getPageContext() {
    return {
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString(),
      sessionId: state.sessionId,
      pageLoadTime: Date.now() - state.pageLoadTime
    };
  }

  // ============================================================================
  // ERROR REPORTING
  // ============================================================================

  function reportError(errorData) {
    // Check limits
    if (!CONFIG.enabled) return;
    if (state.errorCount >= CONFIG.maxErrorsPerSession) return;
    if (!shouldSample()) return;

    // Check ignored patterns
    if (shouldIgnore(errorData.message, errorData.url)) return;

    // Debounce duplicate errors
    const errorKey = `${errorData.type}_${errorData.message}_${errorData.url}`;
    if (debounce(errorKey)) return;

    state.errorCount++;

    // Add page context
    const fullErrorData = {
      ...errorData,
      context: getPageContext(),
      errorIndex: state.errorCount
    };

    // Send to data layer (GA4/GTM)
    sendToDataLayer(fullErrorData);

    // Send to custom endpoint if configured
    if (CONFIG.endpoints.customEndpoint) {
      sendToCustomEndpoint(fullErrorData);
    }

    // Log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.group('[Error Tracking] Captured Error');
      console.log('Type:', fullErrorData.type);
      console.log('Message:', fullErrorData.message);
      console.log('Details:', fullErrorData);
      console.groupEnd();
    }
  }

  function sendToDataLayer(errorData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'error_tracked',
      'error_type': errorData.type,
      'error_message': truncate(errorData.message, 200),
      'error_url': truncate(errorData.url, 200),
      'error_line': errorData.line,
      'error_column': errorData.column,
      'error_severity': errorData.severity || 'error',
      'error_category': errorData.category,
      'page_path': errorData.context.path,
      'session_id': errorData.context.sessionId,
      'timestamp': errorData.context.timestamp
    });
  }

  function sendToCustomEndpoint(errorData) {
    // Use sendBeacon for reliability (won't block page unload)
    if (navigator.sendBeacon) {
      try {
        navigator.sendBeacon(
          CONFIG.endpoints.customEndpoint,
          JSON.stringify(errorData)
        );
      } catch (e) {
        // Fallback to fetch
        fetch(CONFIG.endpoints.customEndpoint, {
          method: 'POST',
          body: JSON.stringify(errorData),
          headers: { 'Content-Type': 'application/json' },
          keepalive: true
        }).catch(() => {});
      }
    }
  }

  // ============================================================================
  // JAVASCRIPT ERROR TRACKING
  // ============================================================================

  function setupJSErrorTracking() {
    if (!CONFIG.trackJSErrors) return;

    window.addEventListener('error', function(event) {
      // Handle image/script/resource loading errors separately
      if (event.target && event.target !== window) {
        handleResourceError(event);
        return;
      }

      reportError({
        type: 'javascript_error',
        category: 'js',
        severity: 'error',
        message: event.message || 'Unknown error',
        url: event.filename || window.location.href,
        line: event.lineno,
        column: event.colno,
        stack: event.error ? getStackTrace(event.error) : null
      });
    }, true);
  }

  // ============================================================================
  // UNHANDLED PROMISE REJECTION TRACKING
  // ============================================================================

  function setupPromiseRejectionTracking() {
    if (!CONFIG.trackPromiseRejections) return;

    window.addEventListener('unhandledrejection', function(event) {
      const reason = event.reason;
      let message = 'Unhandled Promise Rejection';
      let stack = null;

      if (reason) {
        if (typeof reason === 'string') {
          message = reason;
        } else if (reason.message) {
          message = reason.message;
          stack = getStackTrace(reason);
        } else {
          try {
            message = JSON.stringify(reason);
          } catch (e) {
            message = 'Unhandled Promise Rejection (non-serializable)';
          }
        }
      }

      reportError({
        type: 'promise_rejection',
        category: 'js',
        severity: 'error',
        message: truncate(message),
        stack: stack,
        url: window.location.href
      });
    });
  }

  // ============================================================================
  // CONSOLE ERROR CAPTURE
  // ============================================================================

  function setupConsoleErrorCapture() {
    if (!CONFIG.trackConsoleErrors) return;

    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = function(...args) {
      // Call original
      originalConsoleError.apply(console, args);

      // Track the error
      const message = args.map(arg => {
        if (typeof arg === 'string') return arg;
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }).join(' ');

      reportError({
        type: 'console_error',
        category: 'console',
        severity: 'error',
        message: truncate(message),
        url: window.location.href
      });
    };

    // Optionally track console.warn as well (lower severity)
    console.warn = function(...args) {
      originalConsoleWarn.apply(console, args);

      const message = args.map(arg => {
        if (typeof arg === 'string') return arg;
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return String(arg);
        }
      }).join(' ');

      reportError({
        type: 'console_warning',
        category: 'console',
        severity: 'warning',
        message: truncate(message),
        url: window.location.href
      });
    };
  }

  // ============================================================================
  // NETWORK ERROR TRACKING
  // ============================================================================

  function setupNetworkErrorTracking() {
    if (!CONFIG.trackNetworkErrors) return;

    // Track fetch errors
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
      const requestUrl = typeof url === 'string' ? url : url.url;
      const startTime = Date.now();

      return originalFetch.apply(this, arguments)
        .then(response => {
          // Track HTTP errors (4xx, 5xx)
          if (!response.ok) {
            reportError({
              type: 'http_error',
              category: 'network',
              severity: response.status >= 500 ? 'error' : 'warning',
              message: `HTTP ${response.status}: ${response.statusText}`,
              url: truncate(requestUrl),
              httpStatus: response.status,
              requestDuration: Date.now() - startTime
            });
          }
          return response;
        })
        .catch(error => {
          // Track network failures
          reportError({
            type: 'network_error',
            category: 'network',
            severity: 'error',
            message: error.message || 'Network request failed',
            url: truncate(requestUrl),
            requestDuration: Date.now() - startTime
          });
          throw error;
        });
    };

    // Track XMLHttpRequest errors
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url) {
      this._errorTrackingUrl = url;
      this._errorTrackingMethod = method;
      return originalXHROpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function() {
      const xhr = this;
      const startTime = Date.now();

      xhr.addEventListener('error', function() {
        reportError({
          type: 'xhr_error',
          category: 'network',
          severity: 'error',
          message: 'XMLHttpRequest failed',
          url: truncate(xhr._errorTrackingUrl),
          method: xhr._errorTrackingMethod,
          requestDuration: Date.now() - startTime
        });
      });

      xhr.addEventListener('load', function() {
        if (xhr.status >= 400) {
          reportError({
            type: 'xhr_http_error',
            category: 'network',
            severity: xhr.status >= 500 ? 'error' : 'warning',
            message: `HTTP ${xhr.status}`,
            url: truncate(xhr._errorTrackingUrl),
            method: xhr._errorTrackingMethod,
            httpStatus: xhr.status,
            requestDuration: Date.now() - startTime
          });
        }
      });

      return originalXHRSend.apply(this, arguments);
    };
  }

  // ============================================================================
  // RESOURCE ERROR TRACKING
  // ============================================================================

  function handleResourceError(event) {
    if (!CONFIG.trackResourceErrors) return;

    const target = event.target;
    let resourceType = 'unknown';
    let resourceUrl = '';

    if (target.tagName === 'IMG') {
      resourceType = 'image';
      resourceUrl = target.src;
    } else if (target.tagName === 'SCRIPT') {
      resourceType = 'script';
      resourceUrl = target.src;
    } else if (target.tagName === 'LINK') {
      resourceType = 'stylesheet';
      resourceUrl = target.href;
    } else if (target.tagName === 'VIDEO' || target.tagName === 'AUDIO') {
      resourceType = target.tagName.toLowerCase();
      resourceUrl = target.src || target.currentSrc;
    }

    if (resourceUrl) {
      reportError({
        type: 'resource_error',
        category: 'resource',
        severity: 'warning',
        message: `Failed to load ${resourceType}`,
        url: truncate(resourceUrl),
        resourceType: resourceType
      });
    }
  }

  function setupResourceErrorTracking() {
    if (!CONFIG.trackResourceErrors) return;

    // Already handled in window error listener with capture phase
    // This is for additional resource monitoring if needed

    // Monitor performance entries for failed resources
    if (window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver(function(list) {
          for (const entry of list.getEntries()) {
            // Check for failed resources (duration but no response)
            if (entry.transferSize === 0 && entry.decodedBodySize === 0) {
              // Could be from cache or could be failed
              // Only report if definitely an error
            }
          }
        });

        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // PerformanceObserver not fully supported
      }
    }
  }

  // ============================================================================
  // FORM ERROR TRACKING
  // ============================================================================

  function setupFormErrorTracking() {
    if (!CONFIG.trackFormErrors) return;

    // Track form validation errors
    document.addEventListener('invalid', function(event) {
      const target = event.target;
      const form = target.closest('form');
      const formName = form ? (form.name || form.id || 'unnamed_form') : 'unknown';
      const fieldName = target.name || target.id || 'unknown_field';

      reportError({
        type: 'form_validation_error',
        category: 'form',
        severity: 'info',
        message: target.validationMessage || 'Validation failed',
        formName: formName,
        fieldName: fieldName,
        fieldType: target.type,
        url: window.location.href
      });
    }, true);

    // Track form submission errors (custom)
    document.addEventListener('submit', function(event) {
      const form = event.target;
      const formName = form.name || form.id || 'unnamed_form';

      // Set up error handler for form submission
      form._errorTrackingOriginalSubmit = form.submit;
    });
  }

  // ============================================================================
  // CUSTOM ERROR TRACKING API
  // ============================================================================

  /**
   * Track a custom error manually
   * @param {string} message - Error message
   * @param {object} details - Additional error details
   */
  function trackError(message, details = {}) {
    reportError({
      type: details.type || 'custom_error',
      category: details.category || 'custom',
      severity: details.severity || 'error',
      message: message,
      url: details.url || window.location.href,
      ...details
    });
  }

  /**
   * Track a form submission error
   * @param {string} formName - Name of the form
   * @param {string} errorMessage - Error message
   * @param {object} details - Additional details
   */
  function trackFormError(formName, errorMessage, details = {}) {
    reportError({
      type: 'form_submission_error',
      category: 'form',
      severity: 'error',
      message: errorMessage,
      formName: formName,
      url: window.location.href,
      ...details
    });
  }

  /**
   * Track an API/network error
   * @param {string} endpoint - API endpoint
   * @param {number} status - HTTP status code
   * @param {string} message - Error message
   */
  function trackAPIError(endpoint, status, message) {
    reportError({
      type: 'api_error',
      category: 'network',
      severity: status >= 500 ? 'error' : 'warning',
      message: message || `API Error: HTTP ${status}`,
      url: endpoint,
      httpStatus: status
    });
  }

  /**
   * Track a business logic error
   * @param {string} operation - What operation failed
   * @param {string} message - Error message
   * @param {object} context - Additional context
   */
  function trackBusinessError(operation, message, context = {}) {
    reportError({
      type: 'business_error',
      category: 'business',
      severity: 'warning',
      message: message,
      operation: operation,
      url: window.location.href,
      ...context
    });
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function initialize() {
    if (!CONFIG.enabled) {
      console.log('[Error Tracking] Disabled');
      return;
    }

    setupJSErrorTracking();
    setupPromiseRejectionTracking();
    setupConsoleErrorCapture();
    setupNetworkErrorTracking();
    setupResourceErrorTracking();
    setupFormErrorTracking();

    // Push initialization event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'error_tracking_initialized',
      'session_id': state.sessionId,
      'timestamp': new Date().toISOString()
    });

    console.log('[Error Tracking] Initialized - Session:', state.sessionId);
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.TSAS = window.TSAS || {};
  window.TSAS.errorTracking = {
    // Configuration
    configure: function(options) {
      Object.assign(CONFIG, options);
    },

    // Manual tracking methods
    trackError: trackError,
    trackFormError: trackFormError,
    trackAPIError: trackAPIError,
    trackBusinessError: trackBusinessError,

    // State access
    getErrorCount: function() {
      return state.errorCount;
    },
    getSessionId: function() {
      return state.sessionId;
    },

    // Control methods
    enable: function() {
      CONFIG.enabled = true;
    },
    disable: function() {
      CONFIG.enabled = false;
    },

    // Testing/debugging
    test: function() {
      console.log('[Error Tracking] Running test error...');
      trackError('Test error from TSAS.errorTracking.test()', {
        type: 'test_error',
        category: 'test'
      });
    }
  };

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
