/**
 * Lead Tracking Script - Tri-State Aquatic Solutions
 *
 * Handles lead source capture, UTM parameter persistence, session stitching,
 * cross-device tracking considerations, and CRM data push functions.
 *
 * @version 1.0.0
 * @author Tri-State Aquatic Solutions
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    cookiePrefix: 'tsas_',
    cookieDomain: '.tristateaquaticsolutions.com',
    cookieExpiry: {
      firstTouch: 365, // days
      lastTouch: 30,   // days
      session: 0,      // session cookie
      userId: 730      // 2 years
    },
    utmParams: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'],
    clickIds: ['gclid', 'fbclid', 'msclkid', 'li_fat_id'],
    sessionTimeout: 30, // minutes
    crmEndpoint: '/api/leads/track',
    debugMode: false
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  /**
   * Set a cookie with configurable options
   */
  function setCookie(name, value, days, sameSite = 'Lax') {
    const fullName = CONFIG.cookiePrefix + name;
    let expires = '';

    if (days > 0) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }

    const domain = CONFIG.cookieDomain ? '; domain=' + CONFIG.cookieDomain : '';
    const secure = location.protocol === 'https:' ? '; Secure' : '';

    document.cookie = fullName + '=' + encodeURIComponent(value) +
      expires + domain + '; path=/; SameSite=' + sameSite + secure;
  }

  /**
   * Get a cookie value
   */
  function getCookie(name) {
    const fullName = CONFIG.cookiePrefix + name + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(fullName) === 0) {
        return decodeURIComponent(cookie.substring(fullName.length));
      }
    }
    return null;
  }

  /**
   * Delete a cookie
   */
  function deleteCookie(name) {
    setCookie(name, '', -1);
  }

  /**
   * Get URL parameter
   */
  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  /**
   * Generate unique ID
   */
  function generateId(prefix = '') {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return prefix + timestamp + randomPart;
  }

  /**
   * Log debug messages
   */
  function debug(message, data = null) {
    if (CONFIG.debugMode) {
      console.log('[TSAS Lead Tracking]', message, data || '');
    }
  }

  // ============================================
  // LEAD SOURCE CAPTURE
  // ============================================

  const LeadSource = {
    /**
     * Get current traffic source
     */
    getSource: function() {
      // Check UTM source first
      const utmSource = getUrlParam('utm_source');
      if (utmSource) return utmSource;

      // Check click IDs
      if (getUrlParam('gclid')) return 'google';
      if (getUrlParam('fbclid')) return 'facebook';
      if (getUrlParam('msclkid')) return 'bing';
      if (getUrlParam('li_fat_id')) return 'linkedin';

      // Check referrer
      const referrer = document.referrer;
      if (!referrer) return 'direct';

      try {
        const referrerUrl = new URL(referrer);
        const hostname = referrerUrl.hostname.toLowerCase();

        // Search engines
        if (hostname.includes('google.')) return 'google';
        if (hostname.includes('bing.')) return 'bing';
        if (hostname.includes('yahoo.')) return 'yahoo';
        if (hostname.includes('duckduckgo.')) return 'duckduckgo';

        // Social media
        if (hostname.includes('facebook.') || hostname.includes('fb.')) return 'facebook';
        if (hostname.includes('instagram.')) return 'instagram';
        if (hostname.includes('twitter.') || hostname.includes('x.com')) return 'twitter';
        if (hostname.includes('linkedin.')) return 'linkedin';
        if (hostname.includes('pinterest.')) return 'pinterest';
        if (hostname.includes('youtube.')) return 'youtube';
        if (hostname.includes('tiktok.')) return 'tiktok';
        if (hostname.includes('nextdoor.')) return 'nextdoor';

        // Return referrer domain
        return hostname.replace('www.', '');
      } catch (e) {
        return 'referral';
      }
    },

    /**
     * Get current traffic medium
     */
    getMedium: function() {
      // Check UTM medium first
      const utmMedium = getUrlParam('utm_medium');
      if (utmMedium) return utmMedium;

      // Check click IDs for paid traffic
      if (getUrlParam('gclid')) return 'cpc';
      if (getUrlParam('fbclid')) return 'paid_social';
      if (getUrlParam('msclkid')) return 'cpc';
      if (getUrlParam('li_fat_id')) return 'paid_social';

      // Check referrer
      const referrer = document.referrer;
      if (!referrer) return 'none';

      try {
        const referrerUrl = new URL(referrer);
        const hostname = referrerUrl.hostname.toLowerCase();

        // Search engines
        if (/google\.|bing\.|yahoo\.|duckduckgo\./.test(hostname)) {
          return 'organic';
        }

        // Social media
        if (/facebook\.|fb\.|instagram\.|twitter\.|x\.com|linkedin\.|pinterest\.|youtube\.|tiktok\.|nextdoor\./.test(hostname)) {
          return 'social';
        }

        // Email clients
        if (/mail\.|email\.|outlook\.|gmail\./.test(hostname)) {
          return 'email';
        }

        return 'referral';
      } catch (e) {
        return 'referral';
      }
    },

    /**
     * Get all current UTM parameters
     */
    getUtmParams: function() {
      const params = {};
      CONFIG.utmParams.forEach(function(param) {
        const value = getUrlParam(param);
        if (value) params[param] = value;
      });
      return params;
    },

    /**
     * Get all click IDs
     */
    getClickIds: function() {
      const ids = {};
      CONFIG.clickIds.forEach(function(param) {
        const value = getUrlParam(param);
        if (value) ids[param] = value;
      });
      return ids;
    },

    /**
     * Build complete source data object
     */
    buildSourceData: function() {
      return {
        source: this.getSource(),
        medium: this.getMedium(),
        campaign: getUrlParam('utm_campaign') || null,
        term: getUrlParam('utm_term') || null,
        content: getUrlParam('utm_content') || null,
        referrer: document.referrer || null,
        landing_page: window.location.pathname,
        landing_page_full: window.location.href,
        timestamp: new Date().toISOString(),
        click_ids: this.getClickIds()
      };
    }
  };

  // ============================================
  // UTM PARAMETER PERSISTENCE
  // ============================================

  const UTMPersistence = {
    /**
     * Store first touch data (only if not already set)
     */
    storeFirstTouch: function() {
      if (!getCookie('first_touch_source')) {
        const sourceData = LeadSource.buildSourceData();

        setCookie('first_touch_source', sourceData.source, CONFIG.cookieExpiry.firstTouch);
        setCookie('first_touch_medium', sourceData.medium, CONFIG.cookieExpiry.firstTouch);
        setCookie('first_touch_campaign', sourceData.campaign || '', CONFIG.cookieExpiry.firstTouch);
        setCookie('first_touch_term', sourceData.term || '', CONFIG.cookieExpiry.firstTouch);
        setCookie('first_touch_content', sourceData.content || '', CONFIG.cookieExpiry.firstTouch);
        setCookie('first_touch_landing', sourceData.landing_page, CONFIG.cookieExpiry.firstTouch);
        setCookie('first_touch_date', sourceData.timestamp, CONFIG.cookieExpiry.firstTouch);

        // Store click IDs
        Object.keys(sourceData.click_ids).forEach(function(key) {
          setCookie('first_touch_' + key, sourceData.click_ids[key], CONFIG.cookieExpiry.firstTouch);
        });

        debug('First touch stored', sourceData);
      }
    },

    /**
     * Store/update last touch data
     */
    storeLastTouch: function() {
      const sourceData = LeadSource.buildSourceData();

      // Only update if there's meaningful source data (not direct return)
      if (sourceData.source !== 'direct' || !getCookie('last_touch_source')) {
        setCookie('last_touch_source', sourceData.source, CONFIG.cookieExpiry.lastTouch);
        setCookie('last_touch_medium', sourceData.medium, CONFIG.cookieExpiry.lastTouch);
        setCookie('last_touch_campaign', sourceData.campaign || '', CONFIG.cookieExpiry.lastTouch);
        setCookie('last_touch_term', sourceData.term || '', CONFIG.cookieExpiry.lastTouch);
        setCookie('last_touch_content', sourceData.content || '', CONFIG.cookieExpiry.lastTouch);
        setCookie('last_touch_landing', sourceData.landing_page, CONFIG.cookieExpiry.lastTouch);
        setCookie('last_touch_date', sourceData.timestamp, CONFIG.cookieExpiry.lastTouch);

        // Store click IDs
        Object.keys(sourceData.click_ids).forEach(function(key) {
          setCookie('last_touch_' + key, sourceData.click_ids[key], CONFIG.cookieExpiry.lastTouch);
        });

        debug('Last touch stored', sourceData);
      }
    },

    /**
     * Get first touch data
     */
    getFirstTouch: function() {
      return {
        source: getCookie('first_touch_source'),
        medium: getCookie('first_touch_medium'),
        campaign: getCookie('first_touch_campaign'),
        term: getCookie('first_touch_term'),
        content: getCookie('first_touch_content'),
        landing_page: getCookie('first_touch_landing'),
        date: getCookie('first_touch_date'),
        gclid: getCookie('first_touch_gclid'),
        fbclid: getCookie('first_touch_fbclid'),
        msclkid: getCookie('first_touch_msclkid')
      };
    },

    /**
     * Get last touch data
     */
    getLastTouch: function() {
      return {
        source: getCookie('last_touch_source'),
        medium: getCookie('last_touch_medium'),
        campaign: getCookie('last_touch_campaign'),
        term: getCookie('last_touch_term'),
        content: getCookie('last_touch_content'),
        landing_page: getCookie('last_touch_landing'),
        date: getCookie('last_touch_date'),
        gclid: getCookie('last_touch_gclid'),
        fbclid: getCookie('last_touch_fbclid'),
        msclkid: getCookie('last_touch_msclkid')
      };
    },

    /**
     * Get all attribution data
     */
    getAllAttribution: function() {
      return {
        first_touch: this.getFirstTouch(),
        last_touch: this.getLastTouch(),
        current: LeadSource.buildSourceData()
      };
    }
  };

  // ============================================
  // SESSION STITCHING
  // ============================================

  const SessionManager = {
    /**
     * Initialize or get user ID
     */
    getUserId: function() {
      let userId = getCookie('user_id');

      if (!userId) {
        userId = generateId('user_');
        setCookie('user_id', userId, CONFIG.cookieExpiry.userId);
        debug('New user ID created', userId);
      }

      return userId;
    },

    /**
     * Initialize or get session ID
     */
    getSessionId: function() {
      let sessionId = getCookie('session_id');
      const lastActivity = getCookie('last_activity');
      const now = Date.now();

      // Check if session has expired
      if (sessionId && lastActivity) {
        const timeSinceActivity = (now - parseInt(lastActivity)) / 1000 / 60; // minutes

        if (timeSinceActivity > CONFIG.sessionTimeout) {
          // Session expired, create new one
          sessionId = null;
          debug('Session expired, creating new session');
        }
      }

      if (!sessionId) {
        sessionId = generateId('sess_');
        setCookie('session_id', sessionId, 0); // Session cookie
        this.incrementSessionCount();
        debug('New session ID created', sessionId);
      }

      // Update last activity
      setCookie('last_activity', now.toString(), 0);

      return sessionId;
    },

    /**
     * Get session count for this user
     */
    getSessionCount: function() {
      return parseInt(getCookie('session_count') || '0');
    },

    /**
     * Increment session count
     */
    incrementSessionCount: function() {
      const count = this.getSessionCount() + 1;
      setCookie('session_count', count.toString(), CONFIG.cookieExpiry.userId);
      return count;
    },

    /**
     * Track page view within session
     */
    trackPageView: function() {
      // Get current page views in session
      let pageViews = JSON.parse(getCookie('session_pages') || '[]');

      pageViews.push({
        path: window.location.pathname,
        title: document.title,
        timestamp: Date.now()
      });

      // Keep only last 50 pages
      if (pageViews.length > 50) {
        pageViews = pageViews.slice(-50);
      }

      setCookie('session_pages', JSON.stringify(pageViews), 0);

      return pageViews;
    },

    /**
     * Get session data
     */
    getSessionData: function() {
      return {
        user_id: this.getUserId(),
        session_id: this.getSessionId(),
        session_number: this.getSessionCount(),
        pages_viewed: JSON.parse(getCookie('session_pages') || '[]'),
        session_start: getCookie('session_start'),
        last_activity: getCookie('last_activity')
      };
    },

    /**
     * Store touchpoint in journey
     */
    storeTouchpoint: function(touchpointData) {
      let touchpoints = JSON.parse(getCookie('touchpoints') || '[]');

      touchpoints.push({
        ...touchpointData,
        timestamp: new Date().toISOString(),
        session_id: this.getSessionId()
      });

      // Keep last 100 touchpoints
      if (touchpoints.length > 100) {
        touchpoints = touchpoints.slice(-100);
      }

      setCookie('touchpoints', JSON.stringify(touchpoints), CONFIG.cookieExpiry.userId);

      return touchpoints;
    },

    /**
     * Get all touchpoints
     */
    getAllTouchpoints: function() {
      return JSON.parse(getCookie('touchpoints') || '[]');
    }
  };

  // ============================================
  // CROSS-DEVICE TRACKING CONSIDERATIONS
  // ============================================

  const CrossDevice = {
    /**
     * Get device fingerprint (basic)
     */
    getDeviceInfo: function() {
      return {
        user_agent: navigator.userAgent,
        screen_resolution: window.screen.width + 'x' + window.screen.height,
        device_pixel_ratio: window.devicePixelRatio || 1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        touch_support: 'ontouchstart' in window,
        device_type: this.getDeviceType()
      };
    },

    /**
     * Determine device type
     */
    getDeviceType: function() {
      const ua = navigator.userAgent.toLowerCase();

      if (/mobile|android|iphone|ipod|blackberry|windows phone/.test(ua)) {
        return 'mobile';
      }
      if (/tablet|ipad/.test(ua)) {
        return 'tablet';
      }
      return 'desktop';
    },

    /**
     * Store identity for cross-device linking
     * Call when user provides email or phone
     */
    linkIdentity: function(identifier, type = 'email') {
      // Hash the identifier for privacy
      const hashedId = this.simpleHash(identifier.toLowerCase().trim());

      setCookie('identity_hash', hashedId, CONFIG.cookieExpiry.userId);
      setCookie('identity_type', type, CONFIG.cookieExpiry.userId);

      debug('Identity linked', { type: type, hash: hashedId });

      return hashedId;
    },

    /**
     * Simple hash function for client-side use
     */
    simpleHash: function(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return 'id_' + Math.abs(hash).toString(36);
    },

    /**
     * Get cross-device data for server-side matching
     */
    getCrossDeviceData: function() {
      return {
        user_id: SessionManager.getUserId(),
        identity_hash: getCookie('identity_hash'),
        identity_type: getCookie('identity_type'),
        device_info: this.getDeviceInfo()
      };
    }
  };

  // ============================================
  // CRM DATA PUSH FUNCTIONS
  // ============================================

  const CRMIntegration = {
    /**
     * Push lead data to CRM
     */
    pushLead: function(leadData, callback) {
      const payload = {
        ...leadData,
        attribution: UTMPersistence.getAllAttribution(),
        session: SessionManager.getSessionData(),
        cross_device: CrossDevice.getCrossDeviceData(),
        touchpoints: SessionManager.getAllTouchpoints(),
        timestamp: new Date().toISOString()
      };

      debug('Pushing lead to CRM', payload);

      // Use Beacon API for reliability (doesn't block page unload)
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        const success = navigator.sendBeacon(CONFIG.crmEndpoint, blob);

        if (callback) callback(success);
        return success;
      }

      // Fallback to fetch
      fetch(CONFIG.crmEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        keepalive: true
      })
      .then(function(response) {
        if (callback) callback(response.ok);
      })
      .catch(function(error) {
        debug('CRM push error', error);
        if (callback) callback(false);
      });
    },

    /**
     * Track conversion event
     */
    trackConversion: function(conversionType, conversionData, callback) {
      const payload = {
        type: 'conversion',
        conversion_type: conversionType,
        conversion_data: conversionData,
        user_id: SessionManager.getUserId(),
        session_id: SessionManager.getSessionId(),
        attribution: UTMPersistence.getAllAttribution(),
        timestamp: new Date().toISOString()
      };

      debug('Tracking conversion', payload);

      fetch(CONFIG.crmEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(function(response) {
        if (callback) callback(response.ok);
      })
      .catch(function(error) {
        debug('Conversion tracking error', error);
        if (callback) callback(false);
      });
    },

    /**
     * Populate hidden form fields with attribution data
     */
    populateFormFields: function(formElement) {
      if (!formElement) return;

      const attribution = UTMPersistence.getAllAttribution();
      const session = SessionManager.getSessionData();

      const fieldMappings = {
        // First touch fields
        'first_touch_source': attribution.first_touch.source,
        'first_touch_medium': attribution.first_touch.medium,
        'first_touch_campaign': attribution.first_touch.campaign,
        'first_touch_date': attribution.first_touch.date,
        'first_touch_gclid': attribution.first_touch.gclid,
        'first_touch_fbclid': attribution.first_touch.fbclid,

        // Last touch fields
        'last_touch_source': attribution.last_touch.source,
        'last_touch_medium': attribution.last_touch.medium,
        'last_touch_campaign': attribution.last_touch.campaign,
        'last_touch_date': attribution.last_touch.date,
        'last_touch_gclid': attribution.last_touch.gclid,
        'last_touch_fbclid': attribution.last_touch.fbclid,

        // Current session fields
        'current_source': attribution.current.source,
        'current_medium': attribution.current.medium,
        'current_campaign': attribution.current.campaign,
        'gclid': attribution.current.click_ids.gclid,
        'fbclid': attribution.current.click_ids.fbclid,

        // Session fields
        'user_id': session.user_id,
        'session_id': session.session_id,
        'session_number': session.session_number,
        'landing_page': attribution.current.landing_page
      };

      Object.keys(fieldMappings).forEach(function(fieldName) {
        const field = formElement.querySelector('[name="' + fieldName + '"]');
        if (field && fieldMappings[fieldName]) {
          field.value = fieldMappings[fieldName];
        }
      });

      debug('Form fields populated');
    },

    /**
     * Auto-populate all forms on page
     */
    autoPopulateForms: function() {
      const forms = document.querySelectorAll('form');
      const self = this;

      forms.forEach(function(form) {
        self.populateFormFields(form);

        // Re-populate on form reset
        form.addEventListener('reset', function() {
          setTimeout(function() {
            self.populateFormFields(form);
          }, 0);
        });
      });
    }
  };

  // ============================================
  // EVENT TRACKING
  // ============================================

  const EventTracking = {
    /**
     * Track custom event
     */
    track: function(eventName, eventData) {
      const payload = {
        event: eventName,
        data: eventData,
        user_id: SessionManager.getUserId(),
        session_id: SessionManager.getSessionId(),
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      };

      // Store as touchpoint
      SessionManager.storeTouchpoint({
        type: 'event',
        event_name: eventName,
        event_data: eventData,
        page: window.location.pathname
      });

      // Push to dataLayer for GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'tsas_' + eventName,
          ...payload
        });
      }

      debug('Event tracked', payload);
    },

    /**
     * Track calculator usage
     */
    trackCalculator: function(calculatorType, stepName, stepData) {
      this.track('calculator_' + stepName, {
        calculator_type: calculatorType,
        step: stepName,
        ...stepData
      });
    },

    /**
     * Track form interaction
     */
    trackFormInteraction: function(formName, action, fieldName) {
      this.track('form_' + action, {
        form_name: formName,
        field_name: fieldName
      });
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth: function(percentages) {
      const self = this;
      let tracked = {};

      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        percentages.forEach(function(threshold) {
          if (scrollPercent >= threshold && !tracked[threshold]) {
            tracked[threshold] = true;
            self.track('scroll_depth', { percent: threshold });
          }
        });
      });
    },

    /**
     * Track time on page
     */
    trackTimeOnPage: function(intervals) {
      const self = this;

      intervals.forEach(function(seconds) {
        setTimeout(function() {
          self.track('time_on_page', { seconds: seconds });
        }, seconds * 1000);
      });
    }
  };

  // ============================================
  // LEAD SCORING (CLIENT-SIDE COMPONENT)
  // ============================================

  const LeadScoring = {
    /**
     * Get current behavioral score
     */
    getBehavioralScore: function() {
      const session = SessionManager.getSessionData();
      const touchpoints = SessionManager.getAllTouchpoints();
      let score = 0;

      // Session count scoring
      if (session.session_number >= 3) score += 5;
      else if (session.session_number >= 2) score += 3;

      // Page views scoring (simplified client-side)
      const pagesViewed = session.pages_viewed.length;
      if (pagesViewed >= 5) score += 5;
      else if (pagesViewed >= 3) score += 3;

      // Check for high-value page visits
      const pages = session.pages_viewed.map(function(p) { return p.path; });

      if (pages.some(function(p) { return p.includes('/contact'); })) score += 4;
      if (pages.some(function(p) { return p.includes('/quote'); })) score += 5;
      if (pages.some(function(p) { return p.includes('/pricing'); })) score += 5;
      if (pages.some(function(p) { return p.includes('/calculator'); })) score += 5;
      if (pages.some(function(p) { return p.includes('/services'); })) score += 3;
      if (pages.some(function(p) { return p.includes('/gallery'); })) score += 2;

      // Check touchpoints for events
      touchpoints.forEach(function(tp) {
        if (tp.event_name === 'calculator_complete') score += 6;
        if (tp.event_name === 'video_complete') score += 3;
      });

      // Cap at 40 (behavioral max)
      return Math.min(score, 40);
    },

    /**
     * Get engagement score
     */
    getEngagementScore: function() {
      const touchpoints = SessionManager.getAllTouchpoints();
      let score = 0;

      touchpoints.forEach(function(tp) {
        if (tp.type === 'form_submit') score += 7;
        if (tp.event_name === 'chat_start') score += 6;
        if (tp.event_name === 'phone_click') score += 8;
      });

      // Return visits
      const sessionCount = SessionManager.getSessionCount();
      if (sessionCount >= 3) score += 5;
      else if (sessionCount >= 2) score += 3;

      // Cap at 30 (engagement max)
      return Math.min(score, 30);
    },

    /**
     * Get current total score (partial - full scoring done server-side)
     */
    getCurrentScore: function() {
      return {
        behavioral: this.getBehavioralScore(),
        engagement: this.getEngagementScore(),
        // demographic scoring done server-side with more data
        partial_total: this.getBehavioralScore() + this.getEngagementScore()
      };
    },

    /**
     * Store score update
     */
    updateScore: function() {
      const score = this.getCurrentScore();
      setCookie('lead_score', JSON.stringify(score), CONFIG.cookieExpiry.lastTouch);

      // Push to dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'lead_score_update',
          'lead_score': score.partial_total,
          'behavioral_score': score.behavioral,
          'engagement_score': score.engagement
        });
      }

      debug('Lead score updated', score);
      return score;
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================

  const LeadTracking = {
    /**
     * Initialize all tracking
     */
    init: function(options) {
      // Merge options
      if (options) {
        Object.assign(CONFIG, options);
      }

      debug('Initializing lead tracking');

      // Initialize user and session
      SessionManager.getUserId();
      SessionManager.getSessionId();

      // Store attribution
      UTMPersistence.storeFirstTouch();
      UTMPersistence.storeLastTouch();

      // Track page view
      SessionManager.trackPageView();

      // Store touchpoint for this visit
      SessionManager.storeTouchpoint({
        type: 'page_view',
        page: window.location.pathname,
        source: LeadSource.getSource(),
        medium: LeadSource.getMedium(),
        campaign: getUrlParam('utm_campaign')
      });

      // Auto-populate forms when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          CRMIntegration.autoPopulateForms();
        });
      } else {
        CRMIntegration.autoPopulateForms();
      }

      // Track scroll depth
      EventTracking.trackScrollDepth([25, 50, 75, 90]);

      // Track time on page
      EventTracking.trackTimeOnPage([30, 60, 120, 300]);

      // Update lead score
      LeadScoring.updateScore();

      // Link identity if email in URL (for email clicks)
      const emailParam = getUrlParam('email');
      if (emailParam) {
        CrossDevice.linkIdentity(emailParam, 'email');
      }

      debug('Lead tracking initialized');
    },

    // Expose modules for external use
    source: LeadSource,
    utm: UTMPersistence,
    session: SessionManager,
    crossDevice: CrossDevice,
    crm: CRMIntegration,
    events: EventTracking,
    scoring: LeadScoring,

    // Expose utilities
    utils: {
      setCookie: setCookie,
      getCookie: getCookie,
      deleteCookie: deleteCookie,
      getUrlParam: getUrlParam,
      generateId: generateId
    }
  };

  // Auto-initialize if not in module context
  if (typeof module === 'undefined') {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        LeadTracking.init();
      });
    } else {
      LeadTracking.init();
    }
  }

  // Expose globally
  window.TSASLeadTracking = LeadTracking;

  // Module export for bundlers
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeadTracking;
  }

})();

/**
 * USAGE EXAMPLES
 * ================
 *
 * 1. Initialize with custom options:
 *    TSASLeadTracking.init({
 *      debugMode: true,
 *      crmEndpoint: 'https://api.example.com/leads'
 *    });
 *
 * 2. Get attribution data:
 *    const attribution = TSASLeadTracking.utm.getAllAttribution();
 *
 * 3. Track custom event:
 *    TSASLeadTracking.events.track('video_play', { video_id: 'abc123' });
 *
 * 4. Track calculator usage:
 *    TSASLeadTracking.events.trackCalculator('pool_cost', 'complete', { result: 45000 });
 *
 * 5. Push lead to CRM:
 *    TSASLeadTracking.crm.pushLead({
 *      name: 'John Smith',
 *      email: 'john@example.com',
 *      phone: '302-870-3113'
 *    }, function(success) {
 *      console.log('Lead pushed:', success);
 *    });
 *
 * 6. Link user identity (on form submission):
 *    TSASLeadTracking.crossDevice.linkIdentity('john@example.com', 'email');
 *
 * 7. Get current lead score:
 *    const score = TSASLeadTracking.scoring.getCurrentScore();
 *
 * 8. Manually populate form fields:
 *    TSASLeadTracking.crm.populateFormFields(document.querySelector('#myForm'));
 *
 * 9. Get session data:
 *    const session = TSASLeadTracking.session.getSessionData();
 *
 * 10. Track conversion:
 *     TSASLeadTracking.crm.trackConversion('quote_request', {
 *       form_name: 'homepage_quote',
 *       estimated_value: 50000
 *     });
 */
