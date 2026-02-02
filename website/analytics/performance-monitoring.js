/**
 * Tri-State Aquatic Solutions - Performance Monitoring System
 *
 * Core Web Vitals and Performance Metrics Collection
 * Sends data to Google Analytics 4
 *
 * @version 1.0.0
 * @license MIT
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Enable/disable specific features
    enableWebVitals: true,
    enableResourceTiming: true,
    enableErrorTracking: true,
    enableLongTasks: true,
    enableNavigationTiming: true,

    // Sampling rate (0-1, 1 = 100% of sessions)
    samplingRate: 1.0,

    // Debug mode - logs metrics to console
    debug: false,

    // Batch sending configuration
    batchSize: 10,
    batchTimeout: 5000, // 5 seconds

    // Thresholds for Core Web Vitals (Google's recommendations)
    thresholds: {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      INP: { good: 200, poor: 500 },
      TTFB: { good: 800, poor: 1800 }
    }
  };

  // Metrics buffer for batching
  let metricsBuffer = [];
  let batchTimer = null;

  /**
   * Check if the current session should be sampled
   */
  function shouldSample() {
    return Math.random() < CONFIG.samplingRate;
  }

  /**
   * Log debug messages when debug mode is enabled
   */
  function debugLog(message, data) {
    if (CONFIG.debug) {
      console.log(`[Performance Monitor] ${message}`, data || '');
    }
  }

  /**
   * Get rating based on threshold values
   */
  function getRating(metricName, value) {
    const threshold = CONFIG.thresholds[metricName];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Send metric to Google Analytics 4
   */
  function sendToGA4(metric) {
    if (typeof gtag !== 'function') {
      debugLog('gtag not available, queuing metric', metric);
      return;
    }

    const eventParams = {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      non_interaction: true
    };

    // Add navigation type if available
    if (metric.navigationType) {
      eventParams.navigation_type = metric.navigationType;
    }

    // Add attribution data if available
    if (metric.attribution) {
      eventParams.attribution = JSON.stringify(metric.attribution);
    }

    gtag('event', metric.name, eventParams);
    debugLog(`Sent ${metric.name} to GA4`, eventParams);
  }

  /**
   * Add metric to buffer and process batch if needed
   */
  function bufferMetric(metric) {
    metricsBuffer.push(metric);

    if (metricsBuffer.length >= CONFIG.batchSize) {
      flushMetrics();
    } else if (!batchTimer) {
      batchTimer = setTimeout(flushMetrics, CONFIG.batchTimeout);
    }
  }

  /**
   * Flush all buffered metrics
   */
  function flushMetrics() {
    if (batchTimer) {
      clearTimeout(batchTimer);
      batchTimer = null;
    }

    if (metricsBuffer.length === 0) return;

    metricsBuffer.forEach(sendToGA4);
    debugLog(`Flushed ${metricsBuffer.length} metrics`);
    metricsBuffer = [];
  }

  /**
   * Generate unique ID for metric attribution
   */
  function generateUniqueId() {
    return `v1-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }

  /**
   * Get navigation type
   */
  function getNavigationType() {
    if (typeof performance !== 'undefined' && performance.getEntriesByType) {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        return navEntries[0].type;
      }
    }
    return 'unknown';
  }

  // ============================================
  // CORE WEB VITALS TRACKING
  // ============================================

  /**
   * Track Largest Contentful Paint (LCP)
   * Measures loading performance - time until the largest content element is visible
   */
  function trackLCP() {
    if (!CONFIG.enableWebVitals) return;
    if (!('PerformanceObserver' in window)) return;

    let lcpValue = 0;
    let lcpElement = null;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        lcpValue = lastEntry.startTime;
        lcpElement = lastEntry.element;

        debugLog('LCP candidate', { value: lcpValue, element: lcpElement });
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });

      // Report LCP when page is hidden or unloading
      const reportLCP = () => {
        observer.disconnect();

        if (lcpValue > 0) {
          const metric = {
            name: 'LCP',
            id: generateUniqueId(),
            value: lcpValue,
            delta: lcpValue,
            rating: getRating('LCP', lcpValue),
            navigationType: getNavigationType(),
            attribution: {
              element: lcpElement ? lcpElement.tagName : 'unknown',
              url: lcpElement && lcpElement.src ? lcpElement.src : null
            }
          };

          bufferMetric(metric);
        }
      };

      // Listen for page visibility changes and beforeunload
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportLCP();
          flushMetrics();
        }
      }, { once: true });

      window.addEventListener('pagehide', reportLCP, { once: true });

    } catch (e) {
      debugLog('LCP tracking error', e);
    }
  }

  /**
   * Track First Input Delay (FID)
   * Measures interactivity - time from first user interaction to browser response
   */
  function trackFID() {
    if (!CONFIG.enableWebVitals) return;
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstEntry = entries[0];

        const metric = {
          name: 'FID',
          id: generateUniqueId(),
          value: firstEntry.processingStart - firstEntry.startTime,
          delta: firstEntry.processingStart - firstEntry.startTime,
          rating: getRating('FID', firstEntry.processingStart - firstEntry.startTime),
          navigationType: getNavigationType(),
          attribution: {
            eventType: firstEntry.name,
            eventTarget: firstEntry.target ? firstEntry.target.tagName : 'unknown'
          }
        };

        bufferMetric(metric);
        observer.disconnect();
      });

      observer.observe({ type: 'first-input', buffered: true });

    } catch (e) {
      debugLog('FID tracking error', e);
    }
  }

  /**
   * Track Cumulative Layout Shift (CLS)
   * Measures visual stability - sum of all unexpected layout shifts
   */
  function trackCLS() {
    if (!CONFIG.enableWebVitals) return;
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    let clsEntries = [];
    let sessionValue = 0;
    let sessionEntries = [];

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();

        entries.forEach((entry) => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            // If the entry occurred less than 1 second after the previous entry
            // and less than 5 seconds after the first entry in the session
            if (sessionValue &&
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            // Keep the largest session
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              clsEntries = [...sessionEntries];
            }
          }
        });

        debugLog('CLS update', { value: clsValue });
      });

      observer.observe({ type: 'layout-shift', buffered: true });

      // Report CLS when page is hidden
      const reportCLS = () => {
        observer.disconnect();

        const metric = {
          name: 'CLS',
          id: generateUniqueId(),
          value: clsValue,
          delta: clsValue,
          rating: getRating('CLS', clsValue),
          navigationType: getNavigationType(),
          attribution: {
            largestShiftTarget: clsEntries.length > 0 && clsEntries[0].sources
              ? clsEntries[0].sources[0]?.node?.tagName
              : 'unknown',
            shiftCount: clsEntries.length
          }
        };

        bufferMetric(metric);
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportCLS();
          flushMetrics();
        }
      }, { once: true });

      window.addEventListener('pagehide', reportCLS, { once: true });

    } catch (e) {
      debugLog('CLS tracking error', e);
    }
  }

  /**
   * Track Interaction to Next Paint (INP)
   * Measures responsiveness - time from user interaction to visual feedback
   */
  function trackINP() {
    if (!CONFIG.enableWebVitals) return;
    if (!('PerformanceObserver' in window)) return;

    const interactions = [];
    let maxINP = 0;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();

        entries.forEach((entry) => {
          if (entry.interactionId) {
            const duration = entry.duration;
            interactions.push({
              duration,
              interactionId: entry.interactionId,
              name: entry.name,
              target: entry.target ? entry.target.tagName : 'unknown'
            });

            if (duration > maxINP) {
              maxINP = duration;
            }
          }
        });

        debugLog('INP update', { maxINP, interactionCount: interactions.length });
      });

      observer.observe({ type: 'event', buffered: true, durationThreshold: 16 });

      // Report INP when page is hidden
      const reportINP = () => {
        observer.disconnect();

        if (interactions.length > 0) {
          // Get the 98th percentile (or worst) interaction
          interactions.sort((a, b) => b.duration - a.duration);
          const p98Index = Math.min(
            interactions.length - 1,
            Math.floor(interactions.length * 0.02)
          );
          const inpValue = interactions[p98Index].duration;

          const metric = {
            name: 'INP',
            id: generateUniqueId(),
            value: inpValue,
            delta: inpValue,
            rating: getRating('INP', inpValue),
            navigationType: getNavigationType(),
            attribution: {
              interactionCount: interactions.length,
              worstInteraction: interactions[0]
            }
          };

          bufferMetric(metric);
        }
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportINP();
          flushMetrics();
        }
      }, { once: true });

      window.addEventListener('pagehide', reportINP, { once: true });

    } catch (e) {
      debugLog('INP tracking error', e);
    }
  }

  /**
   * Track Time to First Byte (TTFB)
   * Measures server response time
   */
  function trackTTFB() {
    if (!CONFIG.enableWebVitals) return;

    try {
      const navEntry = performance.getEntriesByType('navigation')[0];

      if (navEntry) {
        const ttfb = navEntry.responseStart - navEntry.requestStart;

        const metric = {
          name: 'TTFB',
          id: generateUniqueId(),
          value: ttfb,
          delta: ttfb,
          rating: getRating('TTFB', ttfb),
          navigationType: navEntry.type,
          attribution: {
            waitingTime: navEntry.responseStart - navEntry.requestStart,
            dnsTime: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            connectionTime: navEntry.connectEnd - navEntry.connectStart,
            requestTime: navEntry.responseStart - navEntry.requestStart
          }
        };

        bufferMetric(metric);
        debugLog('TTFB recorded', metric);
      }
    } catch (e) {
      debugLog('TTFB tracking error', e);
    }
  }

  // ============================================
  // RESOURCE TIMING
  // ============================================

  /**
   * Track resource loading performance
   */
  function trackResourceTiming() {
    if (!CONFIG.enableResourceTiming) return;
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();

        entries.forEach((entry) => {
          // Only track slow resources (> 1000ms)
          if (entry.duration > 1000) {
            const resourceMetric = {
              name: 'slow_resource',
              id: generateUniqueId(),
              value: entry.duration,
              delta: entry.duration,
              rating: entry.duration > 3000 ? 'poor' : 'needs-improvement',
              attribution: {
                resourceType: entry.initiatorType,
                resourceUrl: entry.name.substring(0, 200), // Truncate long URLs
                transferSize: entry.transferSize,
                encodedBodySize: entry.encodedBodySize,
                decodedBodySize: entry.decodedBodySize
              }
            };

            bufferMetric(resourceMetric);
            debugLog('Slow resource detected', resourceMetric);
          }
        });
      });

      observer.observe({ type: 'resource', buffered: true });

    } catch (e) {
      debugLog('Resource timing error', e);
    }
  }

  // ============================================
  // ERROR TRACKING
  // ============================================

  /**
   * Track JavaScript errors
   */
  function trackErrors() {
    if (!CONFIG.enableErrorTracking) return;

    // Global error handler
    window.addEventListener('error', (event) => {
      const errorMetric = {
        name: 'js_error',
        id: generateUniqueId(),
        value: 1,
        delta: 1,
        rating: 'poor',
        attribution: {
          message: event.message ? event.message.substring(0, 500) : 'Unknown error',
          filename: event.filename ? event.filename.substring(0, 200) : 'unknown',
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error && event.error.stack
            ? event.error.stack.substring(0, 1000)
            : null
        }
      };

      bufferMetric(errorMetric);
      debugLog('JS error tracked', errorMetric);
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      const errorMetric = {
        name: 'promise_rejection',
        id: generateUniqueId(),
        value: 1,
        delta: 1,
        rating: 'poor',
        attribution: {
          reason: event.reason ? String(event.reason).substring(0, 500) : 'Unknown reason'
        }
      };

      bufferMetric(errorMetric);
      debugLog('Promise rejection tracked', errorMetric);
    });

    debugLog('Error tracking initialized');
  }

  // ============================================
  // LONG TASKS TRACKING
  // ============================================

  /**
   * Track long tasks (> 50ms) that block the main thread
   */
  function trackLongTasks() {
    if (!CONFIG.enableLongTasks) return;
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();

        entries.forEach((entry) => {
          // Only track very long tasks (> 100ms)
          if (entry.duration > 100) {
            const taskMetric = {
              name: 'long_task',
              id: generateUniqueId(),
              value: entry.duration,
              delta: entry.duration,
              rating: entry.duration > 250 ? 'poor' : 'needs-improvement',
              attribution: {
                startTime: entry.startTime,
                duration: entry.duration,
                containerType: entry.attribution?.[0]?.containerType || 'unknown',
                containerName: entry.attribution?.[0]?.containerName || 'unknown'
              }
            };

            bufferMetric(taskMetric);
            debugLog('Long task detected', taskMetric);
          }
        });
      });

      observer.observe({ type: 'longtask', buffered: true });

    } catch (e) {
      debugLog('Long task tracking error', e);
    }
  }

  // ============================================
  // NAVIGATION TIMING
  // ============================================

  /**
   * Track detailed navigation timing metrics
   */
  function trackNavigationTiming() {
    if (!CONFIG.enableNavigationTiming) return;

    // Wait for page load to complete
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          const navEntry = performance.getEntriesByType('navigation')[0];

          if (navEntry) {
            const timings = {
              // DNS lookup time
              dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
              // TCP connection time
              tcp: navEntry.connectEnd - navEntry.connectStart,
              // TLS negotiation time
              tls: navEntry.secureConnectionStart > 0
                ? navEntry.connectEnd - navEntry.secureConnectionStart
                : 0,
              // Time to first byte
              ttfb: navEntry.responseStart - navEntry.requestStart,
              // Response download time
              download: navEntry.responseEnd - navEntry.responseStart,
              // DOM parsing time
              domParse: navEntry.domInteractive - navEntry.responseEnd,
              // DOM content loaded
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              // Full page load time
              pageLoad: navEntry.loadEventEnd - navEntry.loadEventStart,
              // Total page load time
              total: navEntry.loadEventEnd - navEntry.startTime
            };

            const navMetric = {
              name: 'navigation_timing',
              id: generateUniqueId(),
              value: timings.total,
              delta: timings.total,
              rating: timings.total > 5000 ? 'poor' : (timings.total > 3000 ? 'needs-improvement' : 'good'),
              navigationType: navEntry.type,
              attribution: timings
            };

            bufferMetric(navMetric);
            debugLog('Navigation timing recorded', navMetric);
          }
        } catch (e) {
          debugLog('Navigation timing error', e);
        }
      }, 0);
    });
  }

  // ============================================
  // FIRST CONTENTFUL PAINT (FCP)
  // ============================================

  /**
   * Track First Contentful Paint
   */
  function trackFCP() {
    if (!CONFIG.enableWebVitals) return;
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');

        if (fcpEntry) {
          const metric = {
            name: 'FCP',
            id: generateUniqueId(),
            value: fcpEntry.startTime,
            delta: fcpEntry.startTime,
            rating: fcpEntry.startTime <= 1800 ? 'good' : (fcpEntry.startTime <= 3000 ? 'needs-improvement' : 'poor'),
            navigationType: getNavigationType()
          };

          bufferMetric(metric);
          debugLog('FCP recorded', metric);
          observer.disconnect();
        }
      });

      observer.observe({ type: 'paint', buffered: true });

    } catch (e) {
      debugLog('FCP tracking error', e);
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  /**
   * Initialize all performance monitoring
   */
  function init() {
    // Check if we should sample this session
    if (!shouldSample()) {
      debugLog('Session not sampled, skipping initialization');
      return;
    }

    debugLog('Initializing performance monitoring');

    // Core Web Vitals
    trackLCP();
    trackFID();
    trackCLS();
    trackINP();
    trackTTFB();
    trackFCP();

    // Additional metrics
    trackResourceTiming();
    trackErrors();
    trackLongTasks();
    trackNavigationTiming();

    // Ensure metrics are sent before page unload
    window.addEventListener('beforeunload', flushMetrics);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flushMetrics();
      }
    });

    debugLog('Performance monitoring initialized');
  }

  // ============================================
  // PUBLIC API
  // ============================================

  window.TriStatePerformance = {
    init: init,
    flush: flushMetrics,
    setDebug: (enabled) => { CONFIG.debug = enabled; },
    setSamplingRate: (rate) => { CONFIG.samplingRate = Math.max(0, Math.min(1, rate)); },
    getConfig: () => ({ ...CONFIG }),

    // Manual metric reporting
    trackCustomMetric: (name, value, attributes = {}) => {
      const metric = {
        name: `custom_${name}`,
        id: generateUniqueId(),
        value: value,
        delta: value,
        rating: 'custom',
        attribution: attributes
      };
      bufferMetric(metric);
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
