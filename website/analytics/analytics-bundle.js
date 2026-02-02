/**
 * Tri-State Aquatic Solutions - Analytics Bundle
 * Combined analytics initialization for GA4 + GTM + Clarity + Performance Monitoring
 *
 * Version: 1.0.0
 * Last Updated: 2026-02-02
 *
 * Usage: Include this file on all pages AFTER analytics-body.html snippet
 * Note: This bundle is cookie consent aware - analytics only fire after consent
 */

(function() {
    'use strict';

    // =============================================================================
    // CONFIGURATION
    // =============================================================================

    const CONFIG = {
        // Google Analytics 4
        ga4: {
            measurementId: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
            enabled: true
        },

        // Google Tag Manager
        gtm: {
            containerId: 'GTM-XXXXXXX', // Replace with actual GTM Container ID
            enabled: true
        },

        // Microsoft Clarity
        clarity: {
            projectId: 'XXXXXXXXXX', // Replace with actual Clarity Project ID
            enabled: true
        },

        // Debug mode - set to true during development
        debug: false,

        // Cookie consent settings
        consent: {
            cookieName: 'tsas_analytics_consent',
            cookieExpiry: 365, // days
            defaultConsent: 'denied' // 'granted' or 'denied'
        },

        // Performance monitoring thresholds
        performance: {
            enabled: true,
            sampleRate: 1.0, // 1.0 = 100% of users
            thresholds: {
                lcp: 2500,  // Largest Contentful Paint (ms)
                fid: 100,   // First Input Delay (ms)
                cls: 0.1,   // Cumulative Layout Shift
                ttfb: 600   // Time to First Byte (ms)
            }
        }
    };

    // =============================================================================
    // UTILITY FUNCTIONS
    // =============================================================================

    const utils = {
        /**
         * Debug logger - only logs when debug mode is enabled
         */
        log: function(...args) {
            if (CONFIG.debug) {
                console.log('[TSAS Analytics]', ...args);
            }
        },

        /**
         * Error logger - always logs errors
         */
        error: function(...args) {
            console.error('[TSAS Analytics Error]', ...args);
        },

        /**
         * Get cookie value by name
         */
        getCookie: function(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return null;
        },

        /**
         * Set cookie with expiry
         */
        setCookie: function(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`;
        },

        /**
         * Generate a unique session ID
         */
        generateSessionId: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        /**
         * Check if user has given consent
         */
        hasConsent: function() {
            const consent = this.getCookie(CONFIG.consent.cookieName);
            return consent === 'granted';
        },

        /**
         * Check if consent decision has been made
         */
        hasConsentDecision: function() {
            const consent = this.getCookie(CONFIG.consent.cookieName);
            return consent === 'granted' || consent === 'denied';
        }
    };

    // =============================================================================
    // GOOGLE ANALYTICS 4
    // =============================================================================

    const ga4 = {
        initialized: false,

        init: function() {
            if (!CONFIG.ga4.enabled || this.initialized) return;

            utils.log('Initializing GA4...');

            // Load gtag.js
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4.measurementId}`;
            document.head.appendChild(script);

            // Initialize gtag
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
                window.dataLayer.push(arguments);
            };

            window.gtag('js', new Date());

            // Configure with consent mode
            window.gtag('consent', 'default', {
                'analytics_storage': CONFIG.consent.defaultConsent,
                'ad_storage': CONFIG.consent.defaultConsent,
                'functionality_storage': 'granted',
                'personalization_storage': CONFIG.consent.defaultConsent,
                'security_storage': 'granted'
            });

            // Configure GA4
            window.gtag('config', CONFIG.ga4.measurementId, {
                'send_page_view': true,
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false
            });

            this.initialized = true;
            utils.log('GA4 initialized');
        },

        updateConsent: function(granted) {
            if (!window.gtag) return;

            const consentState = granted ? 'granted' : 'denied';
            window.gtag('consent', 'update', {
                'analytics_storage': consentState,
                'ad_storage': consentState,
                'personalization_storage': consentState
            });

            utils.log('GA4 consent updated:', consentState);
        },

        trackEvent: function(eventName, params = {}) {
            if (!window.gtag || !utils.hasConsent()) return;

            window.gtag('event', eventName, params);
            utils.log('GA4 event tracked:', eventName, params);
        },

        trackPageView: function(pagePath, pageTitle) {
            if (!window.gtag || !utils.hasConsent()) return;

            window.gtag('config', CONFIG.ga4.measurementId, {
                'page_path': pagePath || window.location.pathname,
                'page_title': pageTitle || document.title
            });
            utils.log('GA4 pageview tracked:', pagePath || window.location.pathname);
        }
    };

    // =============================================================================
    // GOOGLE TAG MANAGER
    // =============================================================================

    const gtm = {
        initialized: false,

        init: function() {
            if (!CONFIG.gtm.enabled || this.initialized) return;

            utils.log('Initializing GTM...');

            // GTM is loaded via head snippet, just ensure dataLayer exists
            window.dataLayer = window.dataLayer || [];

            // Push initial consent state
            window.dataLayer.push({
                'event': 'consent_default',
                'analytics_consent': CONFIG.consent.defaultConsent,
                'marketing_consent': CONFIG.consent.defaultConsent
            });

            this.initialized = true;
            utils.log('GTM initialized');
        },

        updateConsent: function(granted) {
            if (!window.dataLayer) return;

            window.dataLayer.push({
                'event': 'consent_update',
                'analytics_consent': granted ? 'granted' : 'denied',
                'marketing_consent': granted ? 'granted' : 'denied'
            });

            utils.log('GTM consent updated:', granted ? 'granted' : 'denied');
        },

        pushEvent: function(eventName, data = {}) {
            if (!window.dataLayer) return;

            window.dataLayer.push({
                'event': eventName,
                ...data
            });
            utils.log('GTM event pushed:', eventName, data);
        }
    };

    // =============================================================================
    // MICROSOFT CLARITY
    // =============================================================================

    const clarity = {
        initialized: false,

        init: function() {
            if (!CONFIG.clarity.enabled || this.initialized) return;

            utils.log('Initializing Clarity...');

            // Clarity initialization
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", CONFIG.clarity.projectId);

            this.initialized = true;
            utils.log('Clarity initialized');
        },

        identify: function(userId, customData = {}) {
            if (!window.clarity) return;

            window.clarity('identify', userId, customData);
            utils.log('Clarity user identified:', userId);
        },

        tag: function(key, value) {
            if (!window.clarity) return;

            window.clarity('set', key, value);
            utils.log('Clarity tag set:', key, value);
        },

        consent: function(granted) {
            if (!window.clarity) return;

            window.clarity('consent', granted);
            utils.log('Clarity consent:', granted);
        }
    };

    // =============================================================================
    // PERFORMANCE MONITORING
    // =============================================================================

    const performance = {
        initialized: false,
        metrics: {},

        init: function() {
            if (!CONFIG.performance.enabled || this.initialized) return;

            // Sample rate check
            if (Math.random() > CONFIG.performance.sampleRate) {
                utils.log('Performance monitoring skipped (sample rate)');
                return;
            }

            utils.log('Initializing Performance Monitoring...');

            // Observe Web Vitals using Performance Observer API
            this.observeWebVitals();

            // Track page load metrics
            this.trackPageLoad();

            this.initialized = true;
            utils.log('Performance Monitoring initialized');
        },

        observeWebVitals: function() {
            const self = this;

            // Largest Contentful Paint
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((entryList) => {
                        const entries = entryList.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        self.metrics.lcp = lastEntry.startTime;
                        self.checkThreshold('lcp', self.metrics.lcp);
                    });
                    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

                    // First Input Delay
                    const fidObserver = new PerformanceObserver((entryList) => {
                        const entries = entryList.getEntries();
                        entries.forEach((entry) => {
                            self.metrics.fid = entry.processingStart - entry.startTime;
                            self.checkThreshold('fid', self.metrics.fid);
                        });
                    });
                    fidObserver.observe({ type: 'first-input', buffered: true });

                    // Cumulative Layout Shift
                    let clsValue = 0;
                    const clsObserver = new PerformanceObserver((entryList) => {
                        for (const entry of entryList.getEntries()) {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        }
                        self.metrics.cls = clsValue;
                        self.checkThreshold('cls', self.metrics.cls);
                    });
                    clsObserver.observe({ type: 'layout-shift', buffered: true });

                } catch (e) {
                    utils.error('Performance Observer error:', e);
                }
            }
        },

        trackPageLoad: function() {
            const self = this;

            window.addEventListener('load', function() {
                setTimeout(function() {
                    if (window.performance && window.performance.timing) {
                        const timing = window.performance.timing;

                        self.metrics.ttfb = timing.responseStart - timing.navigationStart;
                        self.metrics.domLoad = timing.domContentLoadedEventEnd - timing.navigationStart;
                        self.metrics.fullLoad = timing.loadEventEnd - timing.navigationStart;

                        self.checkThreshold('ttfb', self.metrics.ttfb);

                        utils.log('Page Load Metrics:', self.metrics);

                        // Send to analytics if consent given
                        if (utils.hasConsent()) {
                            self.sendMetrics();
                        }
                    }
                }, 0);
            });
        },

        checkThreshold: function(metric, value) {
            const threshold = CONFIG.performance.thresholds[metric];
            if (threshold && value > threshold) {
                utils.log(`Performance warning: ${metric} (${value}) exceeds threshold (${threshold})`);
            }
        },

        sendMetrics: function() {
            if (!utils.hasConsent()) return;

            // Send to GA4
            if (window.gtag && Object.keys(this.metrics).length > 0) {
                window.gtag('event', 'web_vitals', {
                    'lcp': Math.round(this.metrics.lcp || 0),
                    'fid': Math.round(this.metrics.fid || 0),
                    'cls': Math.round((this.metrics.cls || 0) * 1000) / 1000,
                    'ttfb': Math.round(this.metrics.ttfb || 0),
                    'dom_load': Math.round(this.metrics.domLoad || 0),
                    'full_load': Math.round(this.metrics.fullLoad || 0)
                });
            }

            // Send to GTM
            if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'web_vitals',
                    'web_vitals': this.metrics
                });
            }

            utils.log('Performance metrics sent');
        },

        getMetrics: function() {
            return this.metrics;
        }
    };

    // =============================================================================
    // CONSENT MANAGEMENT
    // =============================================================================

    const consent = {
        /**
         * Grant analytics consent
         */
        grant: function() {
            utils.setCookie(CONFIG.consent.cookieName, 'granted', CONFIG.consent.cookieExpiry);
            this.updateAllPlatforms(true);
            utils.log('Consent granted');
        },

        /**
         * Deny analytics consent
         */
        deny: function() {
            utils.setCookie(CONFIG.consent.cookieName, 'denied', CONFIG.consent.cookieExpiry);
            this.updateAllPlatforms(false);
            utils.log('Consent denied');
        },

        /**
         * Revoke previously granted consent
         */
        revoke: function() {
            this.deny();
            // Clear existing analytics cookies
            this.clearAnalyticsCookies();
        },

        /**
         * Update consent state across all platforms
         */
        updateAllPlatforms: function(granted) {
            ga4.updateConsent(granted);
            gtm.updateConsent(granted);
            clarity.consent(granted);

            if (granted) {
                performance.sendMetrics();
            }
        },

        /**
         * Clear analytics-related cookies
         */
        clearAnalyticsCookies: function() {
            const cookiesToClear = [
                '_ga', '_gid', '_gat', '_gcl_au',
                '_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM'
            ];

            cookiesToClear.forEach(function(name) {
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
            });

            utils.log('Analytics cookies cleared');
        },

        /**
         * Check current consent status
         */
        getStatus: function() {
            const consentValue = utils.getCookie(CONFIG.consent.cookieName);
            return {
                decided: consentValue === 'granted' || consentValue === 'denied',
                granted: consentValue === 'granted'
            };
        }
    };

    // =============================================================================
    // CUSTOM EVENT TRACKING
    // =============================================================================

    const events = {
        /**
         * Track form submission
         */
        formSubmit: function(formName, formData = {}) {
            ga4.trackEvent('form_submit', {
                'form_name': formName,
                ...formData
            });
            gtm.pushEvent('form_submit', {
                'form_name': formName,
                ...formData
            });
        },

        /**
         * Track CTA click
         */
        ctaClick: function(ctaName, ctaLocation) {
            ga4.trackEvent('cta_click', {
                'cta_name': ctaName,
                'cta_location': ctaLocation
            });
            gtm.pushEvent('cta_click', {
                'cta_name': ctaName,
                'cta_location': ctaLocation
            });
        },

        /**
         * Track phone call
         */
        phoneCall: function(phoneNumber) {
            ga4.trackEvent('phone_call', {
                'phone_number': phoneNumber
            });
            gtm.pushEvent('phone_call', {
                'phone_number': phoneNumber
            });
        },

        /**
         * Track scroll depth
         */
        scrollDepth: function(percentage) {
            ga4.trackEvent('scroll_depth', {
                'depth_percentage': percentage
            });
            gtm.pushEvent('scroll_depth', {
                'depth_percentage': percentage
            });
        },

        /**
         * Track video interaction
         */
        videoInteraction: function(action, videoTitle, videoProgress = null) {
            const params = {
                'video_title': videoTitle,
                'video_action': action
            };
            if (videoProgress !== null) {
                params.video_progress = videoProgress;
            }
            ga4.trackEvent('video_interaction', params);
            gtm.pushEvent('video_interaction', params);
        },

        /**
         * Track calculator usage
         */
        calculatorUsage: function(calculatorType, inputValues, result) {
            ga4.trackEvent('calculator_usage', {
                'calculator_type': calculatorType,
                'input_values': JSON.stringify(inputValues),
                'result': result
            });
            gtm.pushEvent('calculator_usage', {
                'calculator_type': calculatorType,
                'input_values': inputValues,
                'result': result
            });
        },

        /**
         * Track quiz completion
         */
        quizComplete: function(quizName, answers, result) {
            ga4.trackEvent('quiz_complete', {
                'quiz_name': quizName,
                'quiz_answers': JSON.stringify(answers),
                'quiz_result': result
            });
            gtm.pushEvent('quiz_complete', {
                'quiz_name': quizName,
                'quiz_answers': answers,
                'quiz_result': result
            });
        },

        /**
         * Track download
         */
        download: function(fileName, fileType) {
            ga4.trackEvent('file_download', {
                'file_name': fileName,
                'file_type': fileType
            });
            gtm.pushEvent('file_download', {
                'file_name': fileName,
                'file_type': fileType
            });
        },

        /**
         * Track outbound link
         */
        outboundLink: function(url, linkText) {
            ga4.trackEvent('outbound_link', {
                'link_url': url,
                'link_text': linkText
            });
            gtm.pushEvent('outbound_link', {
                'link_url': url,
                'link_text': linkText
            });
        },

        /**
         * Track lead generation
         */
        leadGenerated: function(source, leadData = {}) {
            ga4.trackEvent('generate_lead', {
                'lead_source': source,
                ...leadData
            });
            gtm.pushEvent('generate_lead', {
                'lead_source': source,
                ...leadData
            });
        },

        /**
         * Custom event
         */
        custom: function(eventName, params = {}) {
            ga4.trackEvent(eventName, params);
            gtm.pushEvent(eventName, params);
        }
    };

    // =============================================================================
    // AUTOMATIC TRACKING
    // =============================================================================

    const autoTracking = {
        init: function() {
            this.trackPhoneClicks();
            this.trackOutboundLinks();
            this.trackScrollDepth();
            this.trackCTAClicks();
            this.trackFormSubmissions();
        },

        trackPhoneClicks: function() {
            document.addEventListener('click', function(e) {
                const link = e.target.closest('a[href^="tel:"]');
                if (link) {
                    const phoneNumber = link.getAttribute('href').replace('tel:', '');
                    events.phoneCall(phoneNumber);
                }
            });
        },

        trackOutboundLinks: function() {
            document.addEventListener('click', function(e) {
                const link = e.target.closest('a[href]');
                if (link) {
                    const url = link.getAttribute('href');
                    const currentHost = window.location.hostname;

                    try {
                        const linkUrl = new URL(url, window.location.origin);
                        if (linkUrl.hostname !== currentHost && !url.startsWith('tel:') && !url.startsWith('mailto:')) {
                            events.outboundLink(url, link.textContent.trim());
                        }
                    } catch (e) {
                        // Invalid URL, ignore
                    }
                }
            });
        },

        trackScrollDepth: function() {
            const trackedDepths = [];
            const depthMarks = [25, 50, 75, 90, 100];

            window.addEventListener('scroll', throttle(function() {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

                depthMarks.forEach(function(mark) {
                    if (scrollPercent >= mark && !trackedDepths.includes(mark)) {
                        trackedDepths.push(mark);
                        events.scrollDepth(mark);
                    }
                });
            }, 250));

            function throttle(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(function() { inThrottle = false; }, limit);
                    }
                };
            }
        },

        trackCTAClicks: function() {
            document.addEventListener('click', function(e) {
                const cta = e.target.closest('[data-analytics-cta]');
                if (cta) {
                    const ctaName = cta.getAttribute('data-analytics-cta');
                    const ctaLocation = cta.getAttribute('data-analytics-location') || 'unknown';
                    events.ctaClick(ctaName, ctaLocation);
                }
            });
        },

        trackFormSubmissions: function() {
            document.addEventListener('submit', function(e) {
                const form = e.target;
                const formName = form.getAttribute('data-analytics-form') || form.getAttribute('id') || form.getAttribute('name') || 'unknown';
                events.formSubmit(formName);
            });
        }
    };

    // =============================================================================
    // MAIN INITIALIZATION
    // =============================================================================

    const TSASAnalytics = {
        config: CONFIG,
        utils: utils,

        // Platform modules
        ga4: ga4,
        gtm: gtm,
        clarity: clarity,
        performance: performance,

        // Consent management
        consent: consent,

        // Event tracking
        events: events,

        /**
         * Initialize all analytics platforms
         */
        init: function() {
            utils.log('Initializing TSAS Analytics Bundle...');

            // Initialize platforms
            ga4.init();
            gtm.init();

            // Only initialize Clarity if consent given (session recording requires explicit consent)
            if (utils.hasConsent()) {
                clarity.init();
            }

            performance.init();

            // Setup automatic tracking
            autoTracking.init();

            // Load GoHighLevel integration for CRM tracking
            this.loadGHLIntegration();

            // Expose globally for consent banner
            window.TSASAnalytics = this;

            utils.log('TSAS Analytics Bundle initialized');
        },

        /**
         * Load GoHighLevel CRM integration
         */
        loadGHLIntegration: function() {
            // Check if already loaded
            if (window.GHLIntegration) {
                utils.log('GHL Integration already loaded');
                return;
            }

            // Dynamically load the GHL integration script
            const script = document.createElement('script');
            script.src = '/integrations/gohighlevel/ghl-integration.js';
            script.async = true;
            script.onload = function() {
                utils.log('GHL Integration loaded successfully');
            };
            script.onerror = function() {
                utils.log('GHL Integration failed to load (non-critical)');
            };
            document.head.appendChild(script);
        },

        /**
         * Enable debug mode
         */
        enableDebug: function() {
            CONFIG.debug = true;
            utils.log('Debug mode enabled');
        },

        /**
         * Disable debug mode
         */
        disableDebug: function() {
            CONFIG.debug = false;
        },

        /**
         * Check if analytics is loaded and ready
         */
        isReady: function() {
            return ga4.initialized || gtm.initialized;
        },

        /**
         * Get version info
         */
        version: '1.0.0'
    };

    // =============================================================================
    // AUTO-INITIALIZE
    // =============================================================================

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            TSASAnalytics.init();
        });
    } else {
        TSASAnalytics.init();
    }

    // Expose globally
    window.TSASAnalytics = TSASAnalytics;

})();
