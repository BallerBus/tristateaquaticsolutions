/**
 * Tri-State Aquatic Solutions - Conversion Tracking Implementation
 *
 * Comprehensive tracking for all conversion events across the website.
 * Integrates with GA4, Google Ads, Facebook CAPI, and LinkedIn Insight Tag.
 *
 * @version 1.0.0
 * @author Tri-State Aquatic Solutions
 */

(function() {
    'use strict';

    // ============================================================
    // CONFIGURATION
    // ============================================================

    const CONFIG = {
        // Debug mode - set to false in production
        debug: false,

        // GA4 Measurement ID
        ga4MeasurementId: 'G-JQEE2JQN7W', // Replace with actual ID

        // Google Ads Conversion IDs
        googleAds: {
            conversionId: 'AW-XXXXXXXXX', // Replace with actual ID
            conversionLabels: {
                contactForm: 'XXXXXXXX',
                phoneCall: 'YYYYYYYY',
                consultation: 'ZZZZZZZZ',
                calculator: 'AAAAAAAA',
                leadMagnet: 'BBBBBBBB'
            }
        },

        // Facebook Pixel ID
        facebookPixelId: 'XXXXXXXXXXXXXXX', // Replace with actual ID

        // LinkedIn Partner ID
        linkedInPartnerId: 'XXXXXXX', // Replace with actual ID

        // Estimated lead values (in USD)
        leadValues: {
            contactForm: 500,
            phoneCall: 750,
            consultation: 1000,
            calculatorComplete: 300,
            leadMagnetDownload: 150,
            quizComplete: 200,
            videoComplete: 100,
            chatEngagement: 250
        },

        // Phone numbers to track
        trackablePhones: [
            '3028703113',
            '3028703113',
            '+16105550100',
            '+13025550100'
        ],

        // Form selectors
        formSelectors: {
            contact: '[data-form="contact"], #contact-form, .contact-form',
            calculator: '[data-form="calculator"], #pool-calculator, .calculator-form',
            quiz: '[data-form="quiz"], #pool-quiz, .quiz-form',
            download: '[data-form="download"], .lead-magnet-form, .download-form',
            consultation: '[data-form="consultation"], #consultation-form, .booking-form'
        }
    };

    // ============================================================
    // UTILITY FUNCTIONS
    // ============================================================

    /**
     * Log debug messages when debug mode is enabled
     */
    function debugLog(message, data = null) {
        if (CONFIG.debug) {
            console.log(`[TSAS Tracking] ${message}`, data || '');
        }
    }

    /**
     * Generate unique event ID for deduplication
     */
    function generateEventId() {
        return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get user data for enhanced conversions (hashed)
     */
    function getUserData() {
        // Check for stored user data (from form submissions)
        const storedData = localStorage.getItem('tsas_user_data');
        if (storedData) {
            try {
                return JSON.parse(storedData);
            } catch (e) {
                return {};
            }
        }
        return {};
    }

    /**
     * Hash email for enhanced conversions
     */
    async function hashEmail(email) {
        if (!email) return null;
        const encoder = new TextEncoder();
        const data = encoder.encode(email.toLowerCase().trim());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Get page context for events
     */
    function getPageContext() {
        return {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_referrer: document.referrer,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Get UTM parameters from URL
     */
    function getUtmParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term: params.get('utm_term') || '',
            utm_content: params.get('utm_content') || ''
        };
    }

    // ============================================================
    // GA4 TRACKING
    // ============================================================

    const GA4Tracker = {
        /**
         * Send event to GA4
         */
        track: function(eventName, params = {}) {
            if (typeof gtag !== 'function') {
                debugLog('gtag not available, skipping GA4 tracking');
                return;
            }

            const eventParams = {
                ...params,
                ...getPageContext(),
                ...getUtmParams(),
                event_id: generateEventId()
            };

            gtag('event', eventName, eventParams);
            debugLog(`GA4 Event: ${eventName}`, eventParams);
        },

        /**
         * Track conversion with value
         */
        trackConversion: function(eventName, value, currency = 'USD', params = {}) {
            this.track(eventName, {
                ...params,
                value: value,
                currency: currency,
                conversion: true
            });
        }
    };

    // ============================================================
    // GOOGLE ADS TRACKING
    // ============================================================

    const GoogleAdsTracker = {
        /**
         * Send conversion to Google Ads
         */
        trackConversion: function(conversionLabel, value = null, transactionId = null) {
            if (typeof gtag !== 'function') {
                debugLog('gtag not available, skipping Google Ads tracking');
                return;
            }

            const conversionParams = {
                send_to: `${CONFIG.googleAds.conversionId}/${conversionLabel}`
            };

            if (value) {
                conversionParams.value = value;
                conversionParams.currency = 'USD';
            }

            if (transactionId) {
                conversionParams.transaction_id = transactionId;
            }

            gtag('event', 'conversion', conversionParams);
            debugLog(`Google Ads Conversion: ${conversionLabel}`, conversionParams);
        }
    };

    // ============================================================
    // FACEBOOK PIXEL TRACKING
    // ============================================================

    const FacebookTracker = {
        /**
         * Send event to Facebook Pixel
         */
        track: function(eventName, params = {}) {
            if (typeof fbq !== 'function') {
                debugLog('fbq not available, skipping Facebook tracking');
                return;
            }

            const eventId = generateEventId();

            fbq('track', eventName, {
                ...params,
                event_id: eventId
            });

            debugLog(`Facebook Event: ${eventName}`, params);

            // Return event_id for server-side deduplication
            return eventId;
        },

        /**
         * Track custom event
         */
        trackCustom: function(eventName, params = {}) {
            if (typeof fbq !== 'function') {
                debugLog('fbq not available, skipping Facebook tracking');
                return;
            }

            const eventId = generateEventId();

            fbq('trackCustom', eventName, {
                ...params,
                event_id: eventId
            });

            debugLog(`Facebook Custom Event: ${eventName}`, params);
            return eventId;
        }
    };

    // ============================================================
    // LINKEDIN TRACKING
    // ============================================================

    const LinkedInTracker = {
        /**
         * Send conversion to LinkedIn
         */
        track: function(conversionId) {
            if (typeof window.lintrk !== 'function') {
                debugLog('lintrk not available, skipping LinkedIn tracking');
                return;
            }

            window.lintrk('track', { conversion_id: conversionId });
            debugLog(`LinkedIn Conversion: ${conversionId}`);
        }
    };

    // ============================================================
    // FORM SUBMISSION TRACKING
    // ============================================================

    const FormTracker = {
        /**
         * Initialize form tracking
         */
        init: function() {
            this.trackContactForms();
            this.trackCalculatorForms();
            this.trackQuizForms();
            this.trackDownloadForms();
            this.trackConsultationForms();
            debugLog('Form tracking initialized');
        },

        /**
         * Track contact form submissions
         */
        trackContactForms: function() {
            const forms = document.querySelectorAll(CONFIG.formSelectors.contact);

            forms.forEach(form => {
                if (form.dataset.trackingInit) return;
                form.dataset.trackingInit = 'true';

                form.addEventListener('submit', function(e) {
                    const formData = new FormData(form);
                    const eventId = generateEventId();

                    // Extract form data
                    const params = {
                        form_name: form.name || form.id || 'contact_form',
                        form_type: 'contact',
                        event_id: eventId,
                        service_interest: formData.get('service') || formData.get('interest') || '',
                        location: formData.get('location') || formData.get('city') || ''
                    };

                    // GA4
                    GA4Tracker.trackConversion('generate_lead', CONFIG.leadValues.contactForm, 'USD', params);
                    GA4Tracker.track('form_submit', params);

                    // Google Ads
                    GoogleAdsTracker.trackConversion(
                        CONFIG.googleAds.conversionLabels.contactForm,
                        CONFIG.leadValues.contactForm,
                        eventId
                    );

                    // Facebook
                    FacebookTracker.track('Lead', {
                        content_name: 'Contact Form',
                        content_category: 'form_submission',
                        value: CONFIG.leadValues.contactForm,
                        currency: 'USD'
                    });

                    // LinkedIn
                    LinkedInTracker.track('contact_form_submit');

                    debugLog('Contact form submission tracked', params);
                });
            });
        },

        /**
         * Track pool calculator form submissions
         */
        trackCalculatorForms: function() {
            const forms = document.querySelectorAll(CONFIG.formSelectors.calculator);

            forms.forEach(form => {
                if (form.dataset.trackingInit) return;
                form.dataset.trackingInit = 'true';

                form.addEventListener('submit', function(e) {
                    const formData = new FormData(form);
                    const eventId = generateEventId();

                    const params = {
                        form_name: 'pool_calculator',
                        form_type: 'calculator',
                        event_id: eventId,
                        pool_type: formData.get('pool_type') || '',
                        pool_size: formData.get('pool_size') || '',
                        estimated_budget: formData.get('budget') || ''
                    };

                    // GA4
                    GA4Tracker.trackConversion('calculator_complete', CONFIG.leadValues.calculatorComplete, 'USD', params);
                    GA4Tracker.track('form_submit', params);

                    // Google Ads
                    GoogleAdsTracker.trackConversion(
                        CONFIG.googleAds.conversionLabels.calculator,
                        CONFIG.leadValues.calculatorComplete,
                        eventId
                    );

                    // Facebook
                    FacebookTracker.track('Lead', {
                        content_name: 'Pool Calculator',
                        content_category: 'calculator_submission',
                        value: CONFIG.leadValues.calculatorComplete,
                        currency: 'USD'
                    });

                    debugLog('Calculator form submission tracked', params);
                });
            });
        },

        /**
         * Track quiz form submissions
         */
        trackQuizForms: function() {
            const forms = document.querySelectorAll(CONFIG.formSelectors.quiz);

            forms.forEach(form => {
                if (form.dataset.trackingInit) return;
                form.dataset.trackingInit = 'true';

                form.addEventListener('submit', function(e) {
                    const formData = new FormData(form);
                    const eventId = generateEventId();

                    const params = {
                        form_name: 'pool_quiz',
                        form_type: 'quiz',
                        event_id: eventId,
                        quiz_result: formData.get('result') || '',
                        recommended_pool: formData.get('recommended') || ''
                    };

                    // GA4
                    GA4Tracker.trackConversion('quiz_complete', CONFIG.leadValues.quizComplete, 'USD', params);
                    GA4Tracker.track('form_submit', params);

                    // Facebook
                    FacebookTracker.track('CompleteRegistration', {
                        content_name: 'Pool Style Quiz',
                        value: CONFIG.leadValues.quizComplete,
                        currency: 'USD'
                    });

                    debugLog('Quiz form submission tracked', params);
                });
            });
        },

        /**
         * Track lead magnet download forms
         */
        trackDownloadForms: function() {
            const forms = document.querySelectorAll(CONFIG.formSelectors.download);

            forms.forEach(form => {
                if (form.dataset.trackingInit) return;
                form.dataset.trackingInit = 'true';

                form.addEventListener('submit', function(e) {
                    const formData = new FormData(form);
                    const eventId = generateEventId();

                    // Determine which lead magnet
                    const leadMagnet = form.dataset.leadMagnet ||
                                       formData.get('lead_magnet') ||
                                       'unknown';

                    const params = {
                        form_name: 'lead_magnet_download',
                        form_type: 'download',
                        event_id: eventId,
                        lead_magnet_name: leadMagnet,
                        lead_magnet_type: form.dataset.leadMagnetType || 'guide'
                    };

                    // GA4
                    GA4Tracker.trackConversion('lead_magnet_download', CONFIG.leadValues.leadMagnetDownload, 'USD', params);
                    GA4Tracker.track('form_submit', params);

                    // Google Ads
                    GoogleAdsTracker.trackConversion(
                        CONFIG.googleAds.conversionLabels.leadMagnet,
                        CONFIG.leadValues.leadMagnetDownload,
                        eventId
                    );

                    // Facebook
                    FacebookTracker.track('Lead', {
                        content_name: leadMagnet,
                        content_category: 'lead_magnet',
                        value: CONFIG.leadValues.leadMagnetDownload,
                        currency: 'USD'
                    });

                    debugLog('Lead magnet download tracked', params);
                });
            });
        },

        /**
         * Track consultation booking forms
         */
        trackConsultationForms: function() {
            const forms = document.querySelectorAll(CONFIG.formSelectors.consultation);

            forms.forEach(form => {
                if (form.dataset.trackingInit) return;
                form.dataset.trackingInit = 'true';

                form.addEventListener('submit', function(e) {
                    const formData = new FormData(form);
                    const eventId = generateEventId();

                    const params = {
                        form_name: 'consultation_booking',
                        form_type: 'consultation',
                        event_id: eventId,
                        consultation_type: formData.get('consultation_type') || 'general',
                        preferred_date: formData.get('date') || '',
                        preferred_time: formData.get('time') || ''
                    };

                    // GA4
                    GA4Tracker.trackConversion('consultation_booked', CONFIG.leadValues.consultation, 'USD', params);
                    GA4Tracker.track('form_submit', params);
                    GA4Tracker.track('schedule_appointment', params);

                    // Google Ads
                    GoogleAdsTracker.trackConversion(
                        CONFIG.googleAds.conversionLabels.consultation,
                        CONFIG.leadValues.consultation,
                        eventId
                    );

                    // Facebook
                    FacebookTracker.track('Schedule', {
                        content_name: 'Consultation Booking',
                        value: CONFIG.leadValues.consultation,
                        currency: 'USD'
                    });

                    debugLog('Consultation booking tracked', params);
                });
            });
        }
    };

    // ============================================================
    // PHONE CALL TRACKING
    // ============================================================

    const PhoneTracker = {
        /**
         * Initialize phone call tracking
         */
        init: function() {
            this.trackPhoneClicks();
            debugLog('Phone call tracking initialized');
        },

        /**
         * Track click-to-call phone links
         */
        trackPhoneClicks: function() {
            // Select all phone links
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

            phoneLinks.forEach(link => {
                if (link.dataset.trackingInit) return;
                link.dataset.trackingInit = 'true';

                link.addEventListener('click', function(e) {
                    const phoneNumber = link.href.replace('tel:', '');
                    const eventId = generateEventId();

                    const params = {
                        phone_number: phoneNumber,
                        event_id: eventId,
                        link_text: link.textContent.trim(),
                        link_location: link.closest('section')?.id || 'unknown'
                    };

                    // GA4
                    GA4Tracker.trackConversion('phone_call_click', CONFIG.leadValues.phoneCall, 'USD', params);
                    GA4Tracker.track('click_to_call', params);

                    // Google Ads
                    GoogleAdsTracker.trackConversion(
                        CONFIG.googleAds.conversionLabels.phoneCall,
                        CONFIG.leadValues.phoneCall,
                        eventId
                    );

                    // Facebook
                    FacebookTracker.track('Contact', {
                        content_name: 'Phone Call',
                        content_category: 'click_to_call',
                        value: CONFIG.leadValues.phoneCall,
                        currency: 'USD'
                    });

                    // LinkedIn
                    LinkedInTracker.track('phone_call_click');

                    debugLog('Phone call click tracked', params);
                });
            });
        }
    };

    // ============================================================
    // EMAIL CLICK TRACKING
    // ============================================================

    const EmailTracker = {
        /**
         * Initialize email click tracking
         */
        init: function() {
            this.trackEmailClicks();
            debugLog('Email click tracking initialized');
        },

        /**
         * Track mailto link clicks
         */
        trackEmailClicks: function() {
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

            emailLinks.forEach(link => {
                if (link.dataset.trackingInit) return;
                link.dataset.trackingInit = 'true';

                link.addEventListener('click', function(e) {
                    const email = link.href.replace('mailto:', '').split('?')[0];
                    const eventId = generateEventId();

                    const params = {
                        email_address: email,
                        event_id: eventId,
                        link_text: link.textContent.trim(),
                        link_location: link.closest('section')?.id || 'unknown'
                    };

                    // GA4
                    GA4Tracker.track('email_click', params);

                    // Facebook
                    FacebookTracker.trackCustom('EmailClick', {
                        content_name: 'Email Link',
                        content_category: 'email_click'
                    });

                    debugLog('Email click tracked', params);
                });
            });
        }
    };

    // ============================================================
    // CHAT WIDGET TRACKING
    // ============================================================

    const ChatTracker = {
        /**
         * Initialize chat widget tracking
         */
        init: function() {
            this.observeChatWidget();
            debugLog('Chat widget tracking initialized');
        },

        /**
         * Observe chat widget interactions
         */
        observeChatWidget: function() {
            // Common chat widget selectors
            const chatSelectors = [
                '#drift-widget',
                '#intercom-container',
                '.crisp-client',
                '#tidio-chat',
                '#hubspot-messages-iframe-container',
                '[data-chat-widget]'
            ];

            // Track chat widget open
            chatSelectors.forEach(selector => {
                const chatWidget = document.querySelector(selector);
                if (chatWidget) {
                    this.trackChatOpen(chatWidget);
                }
            });

            // Also observe for dynamically loaded chat widgets
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            chatSelectors.forEach(selector => {
                                if (node.matches && node.matches(selector)) {
                                    this.trackChatOpen(node);
                                }
                            });
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        },

        /**
         * Track when chat widget is opened
         */
        trackChatOpen: function(widget) {
            // Track clicks on common chat buttons
            const chatButtons = widget.querySelectorAll('button, [role="button"]');

            chatButtons.forEach(button => {
                if (button.dataset.trackingInit) return;
                button.dataset.trackingInit = 'true';

                button.addEventListener('click', () => {
                    this.fireChatOpenEvent();
                });
            });

            // Also listen for custom chat events if available
            window.addEventListener('chat:opened', () => this.fireChatOpenEvent());
            window.addEventListener('chatOpened', () => this.fireChatOpenEvent());
        },

        /**
         * Fire chat open event
         */
        fireChatOpenEvent: function() {
            // Prevent duplicate tracking within 5 seconds
            const now = Date.now();
            if (this._lastChatOpen && now - this._lastChatOpen < 5000) return;
            this._lastChatOpen = now;

            const eventId = generateEventId();
            const params = {
                event_id: eventId,
                widget_type: 'chat'
            };

            // GA4
            GA4Tracker.track('chat_widget_open', params);

            // Facebook
            FacebookTracker.trackCustom('ChatOpen', {
                content_name: 'Chat Widget',
                content_category: 'engagement'
            });

            debugLog('Chat widget open tracked', params);
        },

        /**
         * Track chat message sent (call this from your chat widget's callback)
         */
        trackMessageSent: function(messageData = {}) {
            const eventId = generateEventId();
            const params = {
                event_id: eventId,
                message_type: messageData.type || 'user_message',
                conversation_id: messageData.conversationId || ''
            };

            // GA4
            GA4Tracker.trackConversion('chat_engagement', CONFIG.leadValues.chatEngagement, 'USD', params);
            GA4Tracker.track('chat_message_sent', params);

            // Facebook
            FacebookTracker.track('Contact', {
                content_name: 'Chat Message',
                content_category: 'chat_engagement',
                value: CONFIG.leadValues.chatEngagement,
                currency: 'USD'
            });

            debugLog('Chat message tracked', params);
        }
    };

    // ============================================================
    // CALCULATOR COMPLETION TRACKING
    // ============================================================

    const CalculatorTracker = {
        /**
         * Initialize calculator tracking
         */
        init: function() {
            this.trackCalculatorSteps();
            debugLog('Calculator tracking initialized');
        },

        /**
         * Track calculator step progression
         */
        trackCalculatorSteps: function() {
            // Track step changes in multi-step calculators
            const calculators = document.querySelectorAll('[data-calculator], .pool-calculator, #pool-calculator');

            calculators.forEach(calc => {
                const steps = calc.querySelectorAll('[data-step], .calculator-step, .step');

                steps.forEach((step, index) => {
                    // Track when step becomes visible
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !step.dataset.tracked) {
                                step.dataset.tracked = 'true';
                                this.trackStepView(index + 1, steps.length);
                            }
                        });
                    });

                    observer.observe(step);
                });
            });
        },

        /**
         * Track individual step view
         */
        trackStepView: function(stepNumber, totalSteps) {
            const params = {
                step_number: stepNumber,
                total_steps: totalSteps,
                progress_percentage: Math.round((stepNumber / totalSteps) * 100)
            };

            GA4Tracker.track('calculator_step_view', params);
            debugLog('Calculator step tracked', params);
        },

        /**
         * Track calculator completion (call when results are shown)
         */
        trackCompletion: function(results = {}) {
            const eventId = generateEventId();
            const params = {
                event_id: eventId,
                estimated_cost: results.estimatedCost || '',
                pool_type: results.poolType || '',
                pool_size: results.poolSize || '',
                features_selected: results.features || []
            };

            // GA4
            GA4Tracker.trackConversion('calculator_complete', CONFIG.leadValues.calculatorComplete, 'USD', params);

            // Facebook
            FacebookTracker.trackCustom('CalculatorComplete', {
                content_name: 'Pool Cost Calculator',
                value: CONFIG.leadValues.calculatorComplete,
                currency: 'USD',
                ...params
            });

            debugLog('Calculator completion tracked', params);
        }
    };

    // ============================================================
    // LEAD MAGNET DOWNLOAD TRACKING
    // ============================================================

    const LeadMagnetTracker = {
        /**
         * Initialize lead magnet tracking
         */
        init: function() {
            this.trackDownloadLinks();
            debugLog('Lead magnet tracking initialized');
        },

        /**
         * Track direct download links (without form)
         */
        trackDownloadLinks: function() {
            // Track PDF and other document downloads
            const downloadLinks = document.querySelectorAll(
                'a[href$=".pdf"], a[href$=".zip"], a[download], [data-download]'
            );

            downloadLinks.forEach(link => {
                if (link.dataset.trackingInit) return;
                link.dataset.trackingInit = 'true';

                link.addEventListener('click', function(e) {
                    const fileName = link.href.split('/').pop() || link.dataset.download || 'unknown';
                    const eventId = generateEventId();

                    const params = {
                        file_name: fileName,
                        file_extension: fileName.split('.').pop(),
                        event_id: eventId,
                        download_category: link.dataset.category || 'resource'
                    };

                    // GA4
                    GA4Tracker.track('file_download', params);

                    // If it's a gated resource (after form), track as lead
                    if (link.closest('.gated-content') || link.dataset.gated) {
                        GA4Tracker.trackConversion('lead_magnet_download', CONFIG.leadValues.leadMagnetDownload, 'USD', params);
                    }

                    debugLog('Download tracked', params);
                });
            });
        },

        /**
         * Track lead magnet download (call after form submission)
         */
        trackDownload: function(leadMagnetName, additionalParams = {}) {
            const eventId = generateEventId();
            const params = {
                event_id: eventId,
                lead_magnet_name: leadMagnetName,
                ...additionalParams
            };

            // GA4
            GA4Tracker.trackConversion('lead_magnet_download', CONFIG.leadValues.leadMagnetDownload, 'USD', params);

            // Google Ads
            GoogleAdsTracker.trackConversion(
                CONFIG.googleAds.conversionLabels.leadMagnet,
                CONFIG.leadValues.leadMagnetDownload,
                eventId
            );

            // Facebook
            FacebookTracker.track('Lead', {
                content_name: leadMagnetName,
                content_category: 'lead_magnet',
                value: CONFIG.leadValues.leadMagnetDownload,
                currency: 'USD'
            });

            debugLog('Lead magnet download tracked', params);
        }
    };

    // ============================================================
    // VIDEO TRACKING
    // ============================================================

    const VideoTracker = {
        trackedVideos: new Map(),

        /**
         * Initialize video tracking
         */
        init: function() {
            this.trackYouTubeVideos();
            this.trackVimeoVideos();
            this.trackHTML5Videos();
            debugLog('Video tracking initialized');
        },

        /**
         * Track YouTube embedded videos
         */
        trackYouTubeVideos: function() {
            // Wait for YouTube API to load
            if (typeof YT === 'undefined') {
                window.onYouTubeIframeAPIReady = () => this.initYouTubeTracking();
            } else {
                this.initYouTubeTracking();
            }
        },

        /**
         * Initialize YouTube tracking after API is ready
         */
        initYouTubeTracking: function() {
            const iframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');

            iframes.forEach(iframe => {
                if (iframe.dataset.trackingInit) return;
                iframe.dataset.trackingInit = 'true';

                // Ensure iframe has enablejsapi parameter
                if (!iframe.src.includes('enablejsapi')) {
                    iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'enablejsapi=1';
                }

                try {
                    const player = new YT.Player(iframe, {
                        events: {
                            onStateChange: (event) => this.onYouTubeStateChange(event, iframe)
                        }
                    });
                } catch (e) {
                    debugLog('YouTube player init failed', e);
                }
            });
        },

        /**
         * Handle YouTube state changes
         */
        onYouTubeStateChange: function(event, iframe) {
            const videoId = this.getYouTubeVideoId(iframe.src);
            const videoTitle = iframe.title || videoId;

            switch (event.data) {
                case YT.PlayerState.PLAYING:
                    if (!this.trackedVideos.get(videoId + '_start')) {
                        this.trackedVideos.set(videoId + '_start', true);
                        this.trackVideoEvent('video_start', videoTitle, videoId);
                    }
                    break;
                case YT.PlayerState.ENDED:
                    if (!this.trackedVideos.get(videoId + '_complete')) {
                        this.trackedVideos.set(videoId + '_complete', true);
                        this.trackVideoComplete(videoTitle, videoId);
                    }
                    break;
            }
        },

        /**
         * Extract YouTube video ID from URL
         */
        getYouTubeVideoId: function(url) {
            const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([^?&]+)/);
            return match ? match[1] : 'unknown';
        },

        /**
         * Track Vimeo embedded videos
         */
        trackVimeoVideos: function() {
            const iframes = document.querySelectorAll('iframe[src*="vimeo.com"]');

            iframes.forEach(iframe => {
                if (iframe.dataset.trackingInit) return;
                iframe.dataset.trackingInit = 'true';

                try {
                    const player = new Vimeo.Player(iframe);
                    const videoId = iframe.src.match(/vimeo\.com\/(\d+)/)?.[1] || 'unknown';

                    player.on('play', () => {
                        if (!this.trackedVideos.get(videoId + '_start')) {
                            this.trackedVideos.set(videoId + '_start', true);
                            player.getVideoTitle().then(title => {
                                this.trackVideoEvent('video_start', title, videoId);
                            });
                        }
                    });

                    player.on('ended', () => {
                        if (!this.trackedVideos.get(videoId + '_complete')) {
                            this.trackedVideos.set(videoId + '_complete', true);
                            player.getVideoTitle().then(title => {
                                this.trackVideoComplete(title, videoId);
                            });
                        }
                    });
                } catch (e) {
                    debugLog('Vimeo player init failed', e);
                }
            });
        },

        /**
         * Track HTML5 video elements
         */
        trackHTML5Videos: function() {
            const videos = document.querySelectorAll('video');

            videos.forEach(video => {
                if (video.dataset.trackingInit) return;
                video.dataset.trackingInit = 'true';

                const videoId = video.id || video.src.split('/').pop() || 'html5_video';
                const videoTitle = video.title || video.dataset.title || videoId;

                video.addEventListener('play', () => {
                    if (!this.trackedVideos.get(videoId + '_start')) {
                        this.trackedVideos.set(videoId + '_start', true);
                        this.trackVideoEvent('video_start', videoTitle, videoId);
                    }
                });

                video.addEventListener('ended', () => {
                    if (!this.trackedVideos.get(videoId + '_complete')) {
                        this.trackedVideos.set(videoId + '_complete', true);
                        this.trackVideoComplete(videoTitle, videoId);
                    }
                });

                // Track progress milestones
                let tracked25 = false, tracked50 = false, tracked75 = false;

                video.addEventListener('timeupdate', () => {
                    const progress = (video.currentTime / video.duration) * 100;

                    if (progress >= 25 && !tracked25) {
                        tracked25 = true;
                        this.trackVideoEvent('video_progress', videoTitle, videoId, { percent: 25 });
                    }
                    if (progress >= 50 && !tracked50) {
                        tracked50 = true;
                        this.trackVideoEvent('video_progress', videoTitle, videoId, { percent: 50 });
                    }
                    if (progress >= 75 && !tracked75) {
                        tracked75 = true;
                        this.trackVideoEvent('video_progress', videoTitle, videoId, { percent: 75 });
                    }
                });
            });
        },

        /**
         * Track video event
         */
        trackVideoEvent: function(eventName, videoTitle, videoId, additionalParams = {}) {
            const params = {
                video_title: videoTitle,
                video_id: videoId,
                video_provider: this.getVideoProvider(videoId),
                ...additionalParams
            };

            GA4Tracker.track(eventName, params);
            debugLog(`Video event: ${eventName}`, params);
        },

        /**
         * Track video completion
         */
        trackVideoComplete: function(videoTitle, videoId) {
            const eventId = generateEventId();
            const params = {
                video_title: videoTitle,
                video_id: videoId,
                video_provider: this.getVideoProvider(videoId),
                event_id: eventId
            };

            // GA4
            GA4Tracker.trackConversion('video_complete', CONFIG.leadValues.videoComplete, 'USD', params);
            GA4Tracker.track('video_complete', params);

            // Facebook
            FacebookTracker.trackCustom('VideoComplete', {
                content_name: videoTitle,
                value: CONFIG.leadValues.videoComplete,
                currency: 'USD'
            });

            debugLog('Video completion tracked', params);
        },

        /**
         * Determine video provider
         */
        getVideoProvider: function(videoId) {
            if (videoId.match(/^[a-zA-Z0-9_-]{11}$/)) return 'youtube';
            if (videoId.match(/^\d+$/)) return 'vimeo';
            return 'html5';
        }
    };

    // ============================================================
    // CONSULTATION BOOKING TRACKING
    // ============================================================

    const ConsultationTracker = {
        /**
         * Initialize consultation tracking
         */
        init: function() {
            this.observeCalendarWidgets();
            debugLog('Consultation booking tracking initialized');
        },

        /**
         * Observe calendar booking widgets
         */
        observeCalendarWidgets: function() {
            // Common calendar widget selectors
            const calendarSelectors = [
                '[data-calendly-url]',
                '.calendly-inline-widget',
                '#hubspot-meetings-iframe',
                '.acuity-embed',
                '[data-booking-widget]'
            ];

            calendarSelectors.forEach(selector => {
                const widget = document.querySelector(selector);
                if (widget) {
                    this.setupCalendarTracking(widget);
                }
            });

            // Listen for Calendly events if Calendly is present
            if (typeof Calendly !== 'undefined' || document.querySelector('[data-calendly-url]')) {
                this.setupCalendlyTracking();
            }
        },

        /**
         * Setup Calendly event tracking
         */
        setupCalendlyTracking: function() {
            window.addEventListener('message', (event) => {
                if (event.data.event && event.data.event.indexOf('calendly') === 0) {
                    switch (event.data.event) {
                        case 'calendly.event_type_viewed':
                            this.trackBookingStep('calendar_viewed');
                            break;
                        case 'calendly.date_and_time_selected':
                            this.trackBookingStep('time_selected');
                            break;
                        case 'calendly.event_scheduled':
                            this.trackBookingComplete(event.data.payload);
                            break;
                    }
                }
            });
        },

        /**
         * Setup generic calendar widget tracking
         */
        setupCalendarTracking: function(widget) {
            const iframe = widget.querySelector('iframe') || widget;

            // Track when the widget becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !widget.dataset.tracked) {
                        widget.dataset.tracked = 'true';
                        this.trackBookingStep('calendar_viewed');
                    }
                });
            });

            observer.observe(widget);
        },

        /**
         * Track booking step
         */
        trackBookingStep: function(stepName) {
            const params = {
                booking_step: stepName,
                timestamp: new Date().toISOString()
            };

            GA4Tracker.track('consultation_booking_step', params);
            debugLog('Booking step tracked', params);
        },

        /**
         * Track completed booking
         */
        trackBookingComplete: function(bookingData = {}) {
            const eventId = generateEventId();
            const params = {
                event_id: eventId,
                booking_type: bookingData.event?.name || 'consultation',
                booking_date: bookingData.event?.start_time || '',
                invitee_email: bookingData.invitee?.email || ''
            };

            // GA4
            GA4Tracker.trackConversion('consultation_booked', CONFIG.leadValues.consultation, 'USD', params);
            GA4Tracker.track('schedule_appointment', params);

            // Google Ads
            GoogleAdsTracker.trackConversion(
                CONFIG.googleAds.conversionLabels.consultation,
                CONFIG.leadValues.consultation,
                eventId
            );

            // Facebook
            FacebookTracker.track('Schedule', {
                content_name: params.booking_type,
                value: CONFIG.leadValues.consultation,
                currency: 'USD'
            });

            // LinkedIn
            LinkedInTracker.track('consultation_booked');

            debugLog('Consultation booking tracked', params);
        }
    };

    // ============================================================
    // SCROLL DEPTH TRACKING
    // ============================================================

    const ScrollTracker = {
        trackedDepths: new Set(),
        milestones: [25, 50, 75, 90, 100],

        /**
         * Initialize scroll depth tracking
         */
        init: function() {
            window.addEventListener('scroll', this.throttle(() => {
                this.checkScrollDepth();
            }, 100));
            debugLog('Scroll depth tracking initialized');
        },

        /**
         * Check current scroll depth
         */
        checkScrollDepth: function() {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

            this.milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !this.trackedDepths.has(milestone)) {
                    this.trackedDepths.add(milestone);
                    this.trackDepth(milestone);
                }
            });
        },

        /**
         * Track scroll depth milestone
         */
        trackDepth: function(depth) {
            const params = {
                scroll_depth: depth,
                page_height: document.documentElement.scrollHeight
            };

            GA4Tracker.track('scroll_depth', params);
            debugLog(`Scroll depth ${depth}% tracked`);
        },

        /**
         * Throttle function
         */
        throttle: function(func, limit) {
            let lastFunc;
            let lastRan;
            return function() {
                const context = this;
                const args = arguments;
                if (!lastRan) {
                    func.apply(context, args);
                    lastRan = Date.now();
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(function() {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            };
        }
    };

    // ============================================================
    // CTA BUTTON TRACKING
    // ============================================================

    const CTATracker = {
        /**
         * Initialize CTA tracking
         */
        init: function() {
            this.trackCTAClicks();
            debugLog('CTA tracking initialized');
        },

        /**
         * Track CTA button clicks
         */
        trackCTAClicks: function() {
            const ctaSelectors = [
                '.cta-button',
                '.btn-primary',
                '.btn-cta',
                '[data-cta]',
                'a.cta',
                'button.cta'
            ];

            const ctas = document.querySelectorAll(ctaSelectors.join(', '));

            ctas.forEach(cta => {
                if (cta.dataset.trackingInit) return;
                cta.dataset.trackingInit = 'true';

                cta.addEventListener('click', function(e) {
                    const params = {
                        cta_text: cta.textContent.trim().substring(0, 100),
                        cta_url: cta.href || '',
                        cta_location: cta.closest('section')?.id || 'unknown',
                        cta_type: cta.dataset.cta || 'primary'
                    };

                    GA4Tracker.track('cta_click', params);
                    debugLog('CTA click tracked', params);
                });
            });
        }
    };

    // ============================================================
    // INITIALIZATION
    // ============================================================

    /**
     * Initialize all tracking modules
     */
    function initializeTracking() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initModules);
        } else {
            initModules();
        }
    }

    function initModules() {
        try {
            FormTracker.init();
            PhoneTracker.init();
            EmailTracker.init();
            ChatTracker.init();
            CalculatorTracker.init();
            LeadMagnetTracker.init();
            VideoTracker.init();
            ConsultationTracker.init();
            ScrollTracker.init();
            CTATracker.init();

            debugLog('All tracking modules initialized successfully');
        } catch (error) {
            console.error('[TSAS Tracking] Initialization error:', error);
        }
    }

    // ============================================================
    // PUBLIC API
    // ============================================================

    /**
     * Expose tracking functions for manual calls
     */
    window.TSASTracking = {
        // Configuration
        config: CONFIG,

        // Manual tracking methods
        trackFormSubmission: function(formType, formData) {
            GA4Tracker.track('form_submit', { form_type: formType, ...formData });
        },

        trackPhoneCall: function(phoneNumber) {
            PhoneTracker.trackPhoneClicks();
        },

        trackChatMessage: function(messageData) {
            ChatTracker.trackMessageSent(messageData);
        },

        trackCalculatorComplete: function(results) {
            CalculatorTracker.trackCompletion(results);
        },

        trackLeadMagnetDownload: function(leadMagnetName, params) {
            LeadMagnetTracker.trackDownload(leadMagnetName, params);
        },

        trackVideoComplete: function(videoTitle, videoId) {
            VideoTracker.trackVideoComplete(videoTitle, videoId);
        },

        trackConsultationBooked: function(bookingData) {
            ConsultationTracker.trackBookingComplete(bookingData);
        },

        // Utility methods
        trackCustomEvent: function(eventName, params) {
            GA4Tracker.track(eventName, params);
        },

        trackConversion: function(eventName, value, params) {
            GA4Tracker.trackConversion(eventName, value, 'USD', params);
        },

        // Enable/disable debug mode
        setDebug: function(enabled) {
            CONFIG.debug = enabled;
        },

        // Re-initialize tracking (useful after dynamic content loads)
        reinitialize: function() {
            initModules();
        }
    };

    // Initialize tracking
    initializeTracking();

})();
