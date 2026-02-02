/**
 * =====================================================
 * GA4 Configuration - Tri-State Aquatic Solutions
 * =====================================================
 *
 * Complete Google Analytics 4 implementation including:
 * - Base initialization
 * - Custom event tracking
 * - Lead value tracking (e-commerce style)
 * - Scroll depth tracking
 * - Video engagement tracking
 * - Form interaction tracking
 * - CTA click tracking
 * - Time on page tracking
 *
 * IMPORTANT: Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
 *
 * @version 1.0.0
 * @author Tri-State Aquatic Solutions
 */

(function() {
  'use strict';

  // =====================================================
  // CONFIGURATION
  // =====================================================

  const GA4_CONFIG = {
    measurementId: 'G-XXXXXXXXXX', // Replace with actual Measurement ID
    debug: false, // Set to true for development

    // Scroll tracking thresholds
    scrollThresholds: [25, 50, 75, 90, 100],

    // Time tracking intervals (seconds)
    timeIntervals: [30, 60, 120, 180, 300, 600],

    // Lead value estimates by type
    leadValues: {
      contact_form: 150,
      quote_request: 300,
      calculator_completion: 250,
      phone_call: 200,
      email_click: 50,
      financing_inquiry: 350,
      consultation_booking: 500
    },

    // Service area mapping
    serviceAreas: {
      'nj': 'new_jersey',
      'ny': 'new_york',
      'pa': 'pennsylvania',
      'ct': 'connecticut'
    }
  };

  // =====================================================
  // GA4 INITIALIZATION
  // =====================================================

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());

  // Main configuration
  gtag('config', GA4_CONFIG.measurementId, {
    send_page_view: true,
    page_location: window.location.href,
    page_title: document.title,
    cookie_domain: 'auto',
    cookie_expires: 63072000,
    cookie_prefix: 'tsas',
    cookie_update: true,
    debug_mode: GA4_CONFIG.debug,

    // Custom parameters for all events
    custom_map: {
      'dimension1': 'lead_source',
      'dimension2': 'pool_type_interest',
      'dimension3': 'service_area',
      'dimension4': 'budget_range',
      'dimension5': 'project_timeline',
      'dimension6': 'form_name',
      'dimension7': 'cta_location',
      'dimension8': 'calculator_step',
      'dimension9': 'pool_size_category'
    }
  });

  // =====================================================
  // TSAS ANALYTICS NAMESPACE
  // =====================================================

  window.TSASAnalytics = {

    // -------------------------------------------------
    // USER PROPERTIES
    // -------------------------------------------------

    /**
     * Initialize user properties on first visit
     */
    initUser: function() {
      if (!localStorage.getItem('tsas_user_initialized')) {
        const firstTouchSource = this.getFirstTouchSource();

        gtag('set', 'user_properties', {
          customer_stage: 'visitor',
          first_touch_source: firstTouchSource,
          first_visit_date: new Date().toISOString().split('T')[0],
          primary_interest: 'unknown'
        });

        localStorage.setItem('tsas_user_initialized', 'true');
        localStorage.setItem('tsas_first_touch', firstTouchSource);
      }
    },

    /**
     * Get the first touch attribution source
     */
    getFirstTouchSource: function() {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');

      if (utmSource) {
        return utmSource + '/' + (utmMedium || 'none');
      }

      const referrer = document.referrer;
      if (!referrer) return 'direct';

      try {
        const referrerDomain = new URL(referrer).hostname;
        if (referrerDomain.includes('google')) return 'google/organic';
        if (referrerDomain.includes('bing')) return 'bing/organic';
        if (referrerDomain.includes('facebook')) return 'facebook/social';
        if (referrerDomain.includes('instagram')) return 'instagram/social';
        if (referrerDomain.includes('youtube')) return 'youtube/video';
        if (referrerDomain.includes('nextdoor')) return 'nextdoor/social';
        if (referrerDomain.includes('houzz')) return 'houzz/referral';
        return 'referral/' + referrerDomain;
      } catch (e) {
        return 'referral/unknown';
      }
    },

    /**
     * Update customer stage in funnel
     */
    updateCustomerStage: function(stage, primaryInterest) {
      gtag('set', 'user_properties', {
        customer_stage: stage,
        primary_interest: primaryInterest || undefined
      });

      gtag('event', 'customer_stage_change', {
        new_stage: stage,
        primary_interest: primaryInterest
      });

      localStorage.setItem('tsas_customer_stage', stage);
    },

    // -------------------------------------------------
    // LEAD TRACKING (E-COMMERCE STYLE)
    // -------------------------------------------------

    /**
     * Track a lead generation event with monetary value
     */
    trackLead: function(leadData) {
      const eventData = {
        event_category: 'Lead Generation',
        lead_source: leadData.source || this.getFirstTouchSource(),
        pool_type_interest: leadData.poolType || 'not_specified',
        service_area: leadData.serviceArea || 'not_specified',
        budget_range: leadData.budgetRange || 'not_specified',
        project_timeline: leadData.timeline || 'not_specified',
        form_name: leadData.formName || 'unknown',
        value: leadData.value || GA4_CONFIG.leadValues[leadData.type] || 100,
        currency: 'USD'
      };

      // Track as generate_lead (recommended event)
      gtag('event', 'generate_lead', eventData);

      // Also track as conversion for Google Ads
      gtag('event', 'conversion', {
        send_to: GA4_CONFIG.measurementId,
        value: eventData.value,
        currency: 'USD'
      });

      // Update customer stage
      this.updateCustomerStage('lead', leadData.poolType);

      if (GA4_CONFIG.debug) {
        console.log('[TSAS Analytics] Lead tracked:', eventData);
      }
    },

    /**
     * Track quote request (higher value lead)
     */
    trackQuoteRequest: function(quoteData) {
      this.trackLead({
        type: 'quote_request',
        source: quoteData.source,
        poolType: quoteData.poolType,
        serviceArea: quoteData.serviceArea,
        budgetRange: quoteData.budget,
        timeline: quoteData.timeline,
        formName: 'quote_request_form',
        value: GA4_CONFIG.leadValues.quote_request
      });

      // Additional event for funnel tracking
      gtag('event', 'quote_requested', {
        pool_type: quoteData.poolType,
        estimated_budget: quoteData.budget,
        timeline: quoteData.timeline
      });
    },

    /**
     * Track consultation booking (highest value)
     */
    trackConsultationBooking: function(bookingData) {
      this.trackLead({
        type: 'consultation_booking',
        source: bookingData.source,
        poolType: bookingData.poolType,
        serviceArea: bookingData.serviceArea,
        formName: 'consultation_booking',
        value: GA4_CONFIG.leadValues.consultation_booking
      });

      gtag('event', 'book_consultation', {
        appointment_date: bookingData.date,
        consultation_type: bookingData.type,
        pool_type: bookingData.poolType
      });

      this.updateCustomerStage('qualified_lead', bookingData.poolType);
    },

    // -------------------------------------------------
    // FORM INTERACTION TRACKING
    // -------------------------------------------------

    /**
     * Track form start (when user begins filling out a form)
     */
    trackFormStart: function(formName) {
      gtag('event', 'form_start', {
        form_name: formName,
        page_location: window.location.href
      });
    },

    /**
     * Track form field interactions
     */
    trackFormFieldInteraction: function(formName, fieldName, fieldValue) {
      gtag('event', 'form_field_interaction', {
        form_name: formName,
        field_name: fieldName,
        field_value: fieldValue ? 'filled' : 'cleared'
      });
    },

    /**
     * Track form submission
     */
    trackFormSubmission: function(formName, formData) {
      gtag('event', 'form_submit', {
        form_name: formName,
        form_destination: formData.destination || 'crm',
        success: formData.success !== false
      });

      if (formData.success !== false) {
        this.trackLead({
          type: 'contact_form',
          formName: formName,
          poolType: formData.poolType,
          serviceArea: formData.serviceArea,
          timeline: formData.timeline
        });
      }
    },

    /**
     * Track form abandonment
     */
    trackFormAbandonment: function(formName, lastField, percentComplete) {
      gtag('event', 'form_abandonment', {
        form_name: formName,
        last_field_interacted: lastField,
        percent_complete: percentComplete
      });
    },

    // -------------------------------------------------
    // CALCULATOR TRACKING
    // -------------------------------------------------

    /**
     * Track calculator step progression
     */
    trackCalculatorStep: function(stepNumber, stepName, selections) {
      gtag('event', 'calculator_step', {
        calculator_step: stepNumber,
        step_name: stepName,
        selections: JSON.stringify(selections)
      });
    },

    /**
     * Track calculator completion
     */
    trackCalculatorCompletion: function(calculatorData) {
      gtag('event', 'calculator_complete', {
        pool_type: calculatorData.poolType,
        pool_size: calculatorData.poolSize,
        pool_size_category: this.getPoolSizeCategory(calculatorData.poolSize),
        features_selected: calculatorData.features ? calculatorData.features.join(',') : 'none',
        estimated_cost_low: calculatorData.costLow,
        estimated_cost_high: calculatorData.costHigh,
        budget_range: this.getBudgetRange(calculatorData.costLow, calculatorData.costHigh)
      });

      // Track as lead with value
      this.trackLead({
        type: 'calculator_completion',
        poolType: calculatorData.poolType,
        budgetRange: this.getBudgetRange(calculatorData.costLow, calculatorData.costHigh),
        value: GA4_CONFIG.leadValues.calculator_completion
      });
    },

    /**
     * Get pool size category from dimensions
     */
    getPoolSizeCategory: function(size) {
      const sqft = parseInt(size);
      if (sqft < 300) return 'small';
      if (sqft < 500) return 'medium';
      if (sqft < 800) return 'large';
      return 'extra_large';
    },

    /**
     * Get budget range label
     */
    getBudgetRange: function(low, high) {
      const avg = (parseInt(low) + parseInt(high)) / 2;
      if (avg < 50000) return 'under_50k';
      if (avg < 75000) return '50k_75k';
      if (avg < 100000) return '75k_100k';
      if (avg < 150000) return '100k_150k';
      return 'over_150k';
    },

    // -------------------------------------------------
    // CTA CLICK TRACKING
    // -------------------------------------------------

    /**
     * Track CTA button clicks
     */
    trackCTAClick: function(ctaData) {
      gtag('event', 'cta_click', {
        cta_text: ctaData.text,
        cta_location: ctaData.location,
        cta_destination: ctaData.destination,
        cta_type: ctaData.type || 'button',
        page_section: ctaData.section
      });
    },

    /**
     * Track phone number clicks
     */
    trackPhoneClick: function(phoneNumber, location) {
      gtag('event', 'click_to_call', {
        phone_number: phoneNumber,
        cta_location: location,
        value: GA4_CONFIG.leadValues.phone_call,
        currency: 'USD'
      });

      this.trackLead({
        type: 'phone_call',
        formName: 'click_to_call',
        value: GA4_CONFIG.leadValues.phone_call
      });
    },

    /**
     * Track email clicks
     */
    trackEmailClick: function(email, location) {
      gtag('event', 'click_to_email', {
        email_address: email,
        cta_location: location,
        value: GA4_CONFIG.leadValues.email_click,
        currency: 'USD'
      });
    },

    // -------------------------------------------------
    // SCROLL DEPTH TRACKING
    // -------------------------------------------------

    scrollTracked: {},

    /**
     * Initialize scroll depth tracking
     */
    initScrollTracking: function() {
      const self = this;
      let ticking = false;

      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            self.checkScrollDepth();
            ticking = false;
          });
          ticking = true;
        }
      });
    },

    /**
     * Check and track scroll depth milestones
     */
    checkScrollDepth: function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      GA4_CONFIG.scrollThresholds.forEach(function(threshold) {
        if (scrollPercent >= threshold && !this.scrollTracked[threshold]) {
          this.scrollTracked[threshold] = true;

          gtag('event', 'scroll_depth', {
            percent_scrolled: threshold,
            page_location: window.location.href,
            page_title: document.title
          });

          if (GA4_CONFIG.debug) {
            console.log('[TSAS Analytics] Scroll depth:', threshold + '%');
          }
        }
      }, this);
    },

    // -------------------------------------------------
    // TIME ON PAGE TRACKING
    // -------------------------------------------------

    timeTracked: {},
    pageLoadTime: null,

    /**
     * Initialize time on page tracking
     */
    initTimeTracking: function() {
      const self = this;
      this.pageLoadTime = Date.now();

      GA4_CONFIG.timeIntervals.forEach(function(seconds) {
        setTimeout(function() {
          if (!document.hidden) {
            self.trackTimeOnPage(seconds);
          }
        }, seconds * 1000);
      });

      // Track when user leaves
      window.addEventListener('beforeunload', function() {
        const totalTime = Math.round((Date.now() - self.pageLoadTime) / 1000);
        self.trackTimeOnPage(totalTime, true);
      });
    },

    /**
     * Track time milestone reached
     */
    trackTimeOnPage: function(seconds, isFinal) {
      if (!this.timeTracked[seconds] || isFinal) {
        this.timeTracked[seconds] = true;

        gtag('event', 'time_on_page', {
          seconds_on_page: seconds,
          time_bucket: this.getTimeBucket(seconds),
          is_final: isFinal || false,
          page_location: window.location.href
        });

        if (GA4_CONFIG.debug) {
          console.log('[TSAS Analytics] Time on page:', seconds + 's');
        }
      }
    },

    /**
     * Get time bucket label
     */
    getTimeBucket: function(seconds) {
      if (seconds < 30) return '0-30s';
      if (seconds < 60) return '30s-1m';
      if (seconds < 180) return '1-3m';
      if (seconds < 300) return '3-5m';
      if (seconds < 600) return '5-10m';
      return '10m+';
    },

    // -------------------------------------------------
    // VIDEO ENGAGEMENT TRACKING
    // -------------------------------------------------

    videoTracked: {},

    /**
     * Track video play
     */
    trackVideoPlay: function(videoData) {
      const videoId = videoData.id || videoData.title;

      if (!this.videoTracked[videoId]) {
        this.videoTracked[videoId] = { started: true, progress: [] };
      }

      gtag('event', 'video_start', {
        video_title: videoData.title,
        video_provider: videoData.provider || 'html5',
        video_url: videoData.url,
        page_location: window.location.href
      });
    },

    /**
     * Track video progress
     */
    trackVideoProgress: function(videoData, percentComplete) {
      const videoId = videoData.id || videoData.title;
      const milestones = [25, 50, 75, 100];

      milestones.forEach(function(milestone) {
        if (percentComplete >= milestone) {
          if (!this.videoTracked[videoId] ||
              !this.videoTracked[videoId].progress.includes(milestone)) {

            if (!this.videoTracked[videoId]) {
              this.videoTracked[videoId] = { started: true, progress: [] };
            }
            this.videoTracked[videoId].progress.push(milestone);

            gtag('event', 'video_progress', {
              video_title: videoData.title,
              video_provider: videoData.provider || 'html5',
              percent_watched: milestone
            });
          }
        }
      }, this);
    },

    /**
     * Track video complete
     */
    trackVideoComplete: function(videoData) {
      gtag('event', 'video_complete', {
        video_title: videoData.title,
        video_provider: videoData.provider || 'html5',
        video_duration: videoData.duration
      });
    },

    // -------------------------------------------------
    // PAGE-SPECIFIC TRACKING
    // -------------------------------------------------

    /**
     * Track service page views with interest
     */
    trackServicePageView: function(serviceType) {
      gtag('event', 'view_service', {
        service_type: serviceType,
        pool_type_interest: serviceType
      });

      // Update user interest
      gtag('set', 'user_properties', {
        primary_interest: serviceType
      });
    },

    /**
     * Track gallery interactions
     */
    trackGalleryInteraction: function(action, imageData) {
      gtag('event', 'gallery_interaction', {
        action: action, // view, zoom, next, previous
        image_category: imageData.category,
        image_title: imageData.title,
        pool_type: imageData.poolType
      });
    },

    /**
     * Track financing interest
     */
    trackFinancingInterest: function(action) {
      gtag('event', 'financing_interest', {
        action: action, // view_options, calculate, apply
        value: GA4_CONFIG.leadValues.financing_inquiry,
        currency: 'USD'
      });
    },

    // -------------------------------------------------
    // SEARCH TRACKING
    // -------------------------------------------------

    /**
     * Track site search
     */
    trackSiteSearch: function(searchTerm, resultsCount) {
      gtag('event', 'search', {
        search_term: searchTerm,
        results_count: resultsCount
      });
    },

    // -------------------------------------------------
    // ERROR TRACKING
    // -------------------------------------------------

    /**
     * Track JavaScript errors
     */
    trackError: function(errorMessage, errorSource) {
      gtag('event', 'exception', {
        description: errorMessage,
        fatal: false,
        error_source: errorSource
      });
    },

    // -------------------------------------------------
    // UTILITY FUNCTIONS
    // -------------------------------------------------

    /**
     * Auto-setup common tracking
     */
    autoSetup: function() {
      const self = this;

      // Initialize user
      this.initUser();

      // Initialize scroll tracking
      this.initScrollTracking();

      // Initialize time tracking
      this.initTimeTracking();

      // Auto-track phone clicks
      document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function() {
          const phone = this.getAttribute('href').replace('tel:', '');
          const location = this.closest('header') ? 'header' :
                          this.closest('footer') ? 'footer' : 'body';
          self.trackPhoneClick(phone, location);
        });
      });

      // Auto-track email clicks
      document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function() {
          const email = this.getAttribute('href').replace('mailto:', '').split('?')[0];
          const location = this.closest('header') ? 'header' :
                          this.closest('footer') ? 'footer' : 'body';
          self.trackEmailClick(email, location);
        });
      });

      // Auto-track CTA buttons
      document.querySelectorAll('[data-track-cta]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          self.trackCTAClick({
            text: this.textContent.trim(),
            location: this.dataset.trackCta || 'unknown',
            destination: this.getAttribute('href') || 'none',
            section: this.closest('section')?.id || 'unknown'
          });
        });
      });

      // Auto-track forms
      document.querySelectorAll('form[data-track-form]').forEach(function(form) {
        const formName = form.dataset.trackForm;
        let formStarted = false;

        form.addEventListener('focusin', function() {
          if (!formStarted) {
            formStarted = true;
            self.trackFormStart(formName);
          }
        });

        form.addEventListener('submit', function() {
          self.trackFormSubmission(formName, {
            success: true
          });
        });
      });

      // Track JavaScript errors
      window.addEventListener('error', function(e) {
        self.trackError(e.message, e.filename + ':' + e.lineno);
      });

      if (GA4_CONFIG.debug) {
        console.log('[TSAS Analytics] Auto-setup complete');
      }
    }
  };

  // =====================================================
  // AUTO-INITIALIZE ON DOM READY
  // =====================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.TSASAnalytics.autoSetup();
    });
  } else {
    window.TSASAnalytics.autoSetup();
  }

})();
