/**
 * Meta (Facebook) Pixel Implementation
 * Tri-State Aquatic Solutions
 *
 * This file contains the complete Meta Pixel setup including:
 * - Base pixel code
 * - Standard events
 * - Custom events for pool industry
 * - Advanced matching
 * - Event deduplication
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const META_PIXEL_CONFIG = {
  pixelId: 'XXXXXXXXXXXXXXXXX', // Replace with your actual Pixel ID
  debug: false, // Set to true for development
  eventIdPrefix: 'tsas_', // Prefix for event deduplication IDs
};

// =============================================================================
// META PIXEL BASE CODE
// =============================================================================

/**
 * Initialize Meta Pixel
 * Place this in the <head> of your HTML or call on app initialization
 */
function initMetaPixel() {
  // Facebook Pixel Base Code
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  // Initialize with Advanced Matching (if user data available)
  const advancedMatchingData = getAdvancedMatchingData();

  if (Object.keys(advancedMatchingData).length > 0) {
    fbq('init', META_PIXEL_CONFIG.pixelId, advancedMatchingData);
  } else {
    fbq('init', META_PIXEL_CONFIG.pixelId);
  }

  // Track PageView on initialization
  trackPageView();

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] Initialized with ID:', META_PIXEL_CONFIG.pixelId);
  }
}

// =============================================================================
// ADVANCED MATCHING
// =============================================================================

/**
 * Get user data for Advanced Matching
 * Collects hashed user data to improve attribution
 * @returns {Object} User data object for advanced matching
 */
function getAdvancedMatchingData() {
  const userData = {};

  // Try to get user data from various sources
  // These should be populated from your user database or form submissions

  // Email (most important for matching)
  const email = getUserEmail();
  if (email) {
    userData.em = email.toLowerCase().trim();
  }

  // Phone number (E.164 format preferred)
  const phone = getUserPhone();
  if (phone) {
    userData.ph = normalizePhone(phone);
  }

  // First name
  const firstName = getUserFirstName();
  if (firstName) {
    userData.fn = firstName.toLowerCase().trim();
  }

  // Last name
  const lastName = getUserLastName();
  if (lastName) {
    userData.ln = lastName.toLowerCase().trim();
  }

  // City
  const city = getUserCity();
  if (city) {
    userData.ct = city.toLowerCase().replace(/\s/g, '');
  }

  // State (2-letter code)
  const state = getUserState();
  if (state) {
    userData.st = state.toLowerCase().trim();
  }

  // Zip code (first 5 digits for US)
  const zip = getUserZip();
  if (zip) {
    userData.zp = zip.substring(0, 5);
  }

  // Country (ISO 3166-1 alpha-2)
  userData.country = 'us';

  // External ID (your customer ID)
  const customerId = getCustomerId();
  if (customerId) {
    userData.external_id = customerId;
  }

  return userData;
}

/**
 * Helper functions to retrieve user data
 * Implement these based on your data storage (localStorage, cookies, user session)
 */
function getUserEmail() {
  return localStorage.getItem('user_email') || null;
}

function getUserPhone() {
  return localStorage.getItem('user_phone') || null;
}

function getUserFirstName() {
  return localStorage.getItem('user_first_name') || null;
}

function getUserLastName() {
  return localStorage.getItem('user_last_name') || null;
}

function getUserCity() {
  return localStorage.getItem('user_city') || null;
}

function getUserState() {
  return localStorage.getItem('user_state') || null;
}

function getUserZip() {
  return localStorage.getItem('user_zip') || null;
}

function getCustomerId() {
  return localStorage.getItem('customer_id') || null;
}

/**
 * Normalize phone number to digits only
 * @param {string} phone - Raw phone number
 * @returns {string} Normalized phone number
 */
function normalizePhone(phone) {
  return phone.replace(/\D/g, '');
}

// =============================================================================
// EVENT DEDUPLICATION
// =============================================================================

/**
 * Generate unique event ID for deduplication
 * This ID should match the event_id sent via Conversions API
 * @param {string} eventName - Name of the event
 * @returns {string} Unique event ID
 */
function generateEventId(eventName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${META_PIXEL_CONFIG.eventIdPrefix}${eventName}_${timestamp}_${random}`;
}

/**
 * Store event ID for Conversions API matching
 * @param {string} eventId - The generated event ID
 * @param {string} eventName - Name of the event
 */
function storeEventId(eventId, eventName) {
  const eventData = {
    eventId,
    eventName,
    timestamp: Date.now(),
    url: window.location.href,
  };

  // Store in sessionStorage for potential server-side pickup
  const storedEvents = JSON.parse(sessionStorage.getItem('meta_events') || '[]');
  storedEvents.push(eventData);
  sessionStorage.setItem('meta_events', JSON.stringify(storedEvents));

  // Also store last event ID for forms
  sessionStorage.setItem('last_event_id', eventId);

  return eventId;
}

// =============================================================================
// STANDARD EVENTS
// =============================================================================

/**
 * Track PageView event
 * Called automatically on pixel initialization
 */
function trackPageView() {
  const eventId = generateEventId('PageView');
  storeEventId(eventId, 'PageView');

  fbq('track', 'PageView', {}, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] PageView tracked', { eventId });
  }
}

/**
 * Track ViewContent event
 * Use when user views key content (services, pricing, etc.)
 * @param {Object} params - Event parameters
 */
function trackViewContent(params = {}) {
  const eventId = generateEventId('ViewContent');
  storeEventId(eventId, 'ViewContent');

  const defaultParams = {
    content_name: document.title,
    content_category: 'Pool Services',
    content_type: 'service',
  };

  fbq('track', 'ViewContent', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] ViewContent tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track Lead event
 * Use when user submits a form or requests a quote
 * @param {Object} params - Event parameters
 */
function trackLead(params = {}) {
  const eventId = generateEventId('Lead');
  storeEventId(eventId, 'Lead');

  const defaultParams = {
    content_name: 'Quote Request',
    content_category: 'Lead',
    currency: 'USD',
  };

  fbq('track', 'Lead', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] Lead tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track Contact event
 * Use when user initiates contact (phone click, email click)
 * @param {Object} params - Event parameters
 */
function trackContact(params = {}) {
  const eventId = generateEventId('Contact');
  storeEventId(eventId, 'Contact');

  const defaultParams = {
    content_name: 'Contact Initiated',
    content_category: 'Contact',
  };

  fbq('track', 'Contact', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] Contact tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track Schedule event
 * Use when user schedules a consultation or service
 * @param {Object} params - Event parameters
 */
function trackSchedule(params = {}) {
  const eventId = generateEventId('Schedule');
  storeEventId(eventId, 'Schedule');

  const defaultParams = {
    content_name: 'Appointment Scheduled',
    content_category: 'Schedule',
  };

  fbq('track', 'Schedule', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] Schedule tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track CompleteRegistration event
 * Use when user completes account signup
 * @param {Object} params - Event parameters
 */
function trackCompleteRegistration(params = {}) {
  const eventId = generateEventId('CompleteRegistration');
  storeEventId(eventId, 'CompleteRegistration');

  const defaultParams = {
    content_name: 'Account Registration',
    status: 'complete',
  };

  fbq('track', 'CompleteRegistration', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] CompleteRegistration tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

// =============================================================================
// CUSTOM EVENTS - POOL INDUSTRY SPECIFIC
// =============================================================================

/**
 * Track Quote Request
 * Custom event for pool service quote requests
 * @param {Object} params - Event parameters
 */
function trackQuoteRequest(params = {}) {
  const eventId = generateEventId('QuoteRequest');
  storeEventId(eventId, 'QuoteRequest');

  const defaultParams = {
    content_category: 'Quote',
    currency: 'USD',
  };

  fbq('trackCustom', 'QuoteRequest', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] QuoteRequest tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track Service Interest
 * Custom event when user shows interest in specific service
 * @param {string} serviceType - Type of pool service
 * @param {Object} additionalParams - Additional parameters
 */
function trackServiceInterest(serviceType, additionalParams = {}) {
  const eventId = generateEventId('ServiceInterest');
  storeEventId(eventId, 'ServiceInterest');

  const params = {
    service_type: serviceType,
    content_category: 'Service Interest',
    content_name: serviceType,
    ...additionalParams,
  };

  fbq('trackCustom', 'ServiceInterest', params, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] ServiceInterest tracked', { eventId, serviceType, params });
  }
}

/**
 * Service types for pool industry
 */
const POOL_SERVICE_TYPES = {
  POOL_INSTALLATION: 'Pool Installation',
  POOL_RENOVATION: 'Pool Renovation',
  POOL_MAINTENANCE: 'Pool Maintenance',
  POOL_REPAIR: 'Pool Repair',
  POOL_OPENING: 'Pool Opening',
  POOL_CLOSING: 'Pool Closing',
  SPA_HOT_TUB: 'Spa & Hot Tub',
  WATER_FEATURES: 'Water Features',
  POOL_DECK: 'Pool Deck',
  POOL_LIGHTING: 'Pool Lighting',
  POOL_HEATING: 'Pool Heating',
  POOL_AUTOMATION: 'Pool Automation',
  SAFETY_COVERS: 'Safety Covers',
  LINER_REPLACEMENT: 'Liner Replacement',
  EQUIPMENT_UPGRADE: 'Equipment Upgrade',
};

/**
 * Track Pool Type Interest
 * Custom event for specific pool type interest
 * @param {string} poolType - Type of pool
 * @param {Object} additionalParams - Additional parameters
 */
function trackPoolTypeInterest(poolType, additionalParams = {}) {
  const eventId = generateEventId('PoolTypeInterest');
  storeEventId(eventId, 'PoolTypeInterest');

  const params = {
    pool_type: poolType,
    content_category: 'Pool Type Interest',
    content_name: poolType,
    ...additionalParams,
  };

  fbq('trackCustom', 'PoolTypeInterest', params, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] PoolTypeInterest tracked', { eventId, poolType, params });
  }
}

/**
 * Pool types
 */
const POOL_TYPES = {
  INGROUND_VINYL: 'Inground Vinyl',
  INGROUND_FIBERGLASS: 'Inground Fiberglass',
  INGROUND_CONCRETE: 'Inground Concrete',
  ABOVE_GROUND: 'Above Ground',
  SEMI_INGROUND: 'Semi-Inground',
  INFINITY_EDGE: 'Infinity Edge',
  LAP_POOL: 'Lap Pool',
  PLUNGE_POOL: 'Plunge Pool',
};

/**
 * Track Financing Interest
 * Custom event when user explores financing options
 * @param {Object} params - Event parameters
 */
function trackFinancingInterest(params = {}) {
  const eventId = generateEventId('FinancingInterest');
  storeEventId(eventId, 'FinancingInterest');

  const defaultParams = {
    content_category: 'Financing',
    content_name: 'Pool Financing',
  };

  fbq('trackCustom', 'FinancingInterest', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] FinancingInterest tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track Gallery View
 * Custom event when user views project gallery
 * @param {string} galleryType - Type of gallery viewed
 * @param {Object} additionalParams - Additional parameters
 */
function trackGalleryView(galleryType, additionalParams = {}) {
  const eventId = generateEventId('GalleryView');
  storeEventId(eventId, 'GalleryView');

  const params = {
    gallery_type: galleryType,
    content_category: 'Gallery',
    content_name: galleryType,
    ...additionalParams,
  };

  fbq('trackCustom', 'GalleryView', params, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] GalleryView tracked', { eventId, galleryType, params });
  }
}

/**
 * Track Consultation Booked
 * Custom event when user books a consultation
 * @param {Object} params - Event parameters
 */
function trackConsultationBooked(params = {}) {
  const eventId = generateEventId('ConsultationBooked');
  storeEventId(eventId, 'ConsultationBooked');

  const defaultParams = {
    content_category: 'Consultation',
    content_name: 'Free Consultation',
    currency: 'USD',
    value: 0, // Free consultation
  };

  fbq('trackCustom', 'ConsultationBooked', { ...defaultParams, ...params }, { eventID: eventId });

  // Also track as standard Lead event
  trackLead({
    content_name: 'Consultation Booked',
    ...params,
  });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] ConsultationBooked tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track Service Area Check
 * Custom event when user checks if they're in service area
 * @param {string} zipCode - User's zip code
 * @param {boolean} inServiceArea - Whether they're in service area
 */
function trackServiceAreaCheck(zipCode, inServiceArea) {
  const eventId = generateEventId('ServiceAreaCheck');
  storeEventId(eventId, 'ServiceAreaCheck');

  const params = {
    zip_code: zipCode,
    in_service_area: inServiceArea,
    content_category: 'Service Area',
  };

  fbq('trackCustom', 'ServiceAreaCheck', params, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] ServiceAreaCheck tracked', { eventId, zipCode, inServiceArea });
  }
}

/**
 * Track Video Watch
 * Custom event when user watches a video
 * @param {string} videoTitle - Title of the video
 * @param {number} percentWatched - Percentage of video watched
 */
function trackVideoWatch(videoTitle, percentWatched) {
  const eventId = generateEventId('VideoWatch');
  storeEventId(eventId, 'VideoWatch');

  const params = {
    video_title: videoTitle,
    percent_watched: percentWatched,
    content_category: 'Video',
    content_name: videoTitle,
  };

  fbq('trackCustom', 'VideoWatch', params, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] VideoWatch tracked', { eventId, videoTitle, percentWatched });
  }
}

/**
 * Track Download
 * Custom event when user downloads content (brochures, guides, etc.)
 * @param {string} downloadType - Type of download
 * @param {string} downloadName - Name of the downloaded file
 */
function trackDownload(downloadType, downloadName) {
  const eventId = generateEventId('Download');
  storeEventId(eventId, 'Download');

  const params = {
    download_type: downloadType,
    download_name: downloadName,
    content_category: 'Download',
    content_name: downloadName,
  };

  fbq('trackCustom', 'Download', params, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] Download tracked', { eventId, downloadType, downloadName });
  }
}

/**
 * Track Review View
 * Custom event when user reads customer reviews
 * @param {Object} params - Event parameters
 */
function trackReviewView(params = {}) {
  const eventId = generateEventId('ReviewView');
  storeEventId(eventId, 'ReviewView');

  const defaultParams = {
    content_category: 'Reviews',
    content_name: 'Customer Reviews',
  };

  fbq('trackCustom', 'ReviewView', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] ReviewView tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

/**
 * Track Warranty Interest
 * Custom event when user views warranty information
 * @param {Object} params - Event parameters
 */
function trackWarrantyInterest(params = {}) {
  const eventId = generateEventId('WarrantyInterest');
  storeEventId(eventId, 'WarrantyInterest');

  const defaultParams = {
    content_category: 'Warranty',
    content_name: 'Warranty Information',
  };

  fbq('trackCustom', 'WarrantyInterest', { ...defaultParams, ...params }, { eventID: eventId });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] WarrantyInterest tracked', { eventId, params: { ...defaultParams, ...params } });
  }
}

// =============================================================================
// FORM TRACKING HELPERS
// =============================================================================

/**
 * Store user data from form for advanced matching
 * Call this when user fills out a form
 * @param {Object} formData - Form field values
 */
function storeUserDataFromForm(formData) {
  if (formData.email) {
    localStorage.setItem('user_email', formData.email);
  }
  if (formData.phone) {
    localStorage.setItem('user_phone', formData.phone);
  }
  if (formData.firstName || formData.first_name) {
    localStorage.setItem('user_first_name', formData.firstName || formData.first_name);
  }
  if (formData.lastName || formData.last_name) {
    localStorage.setItem('user_last_name', formData.lastName || formData.last_name);
  }
  if (formData.city) {
    localStorage.setItem('user_city', formData.city);
  }
  if (formData.state) {
    localStorage.setItem('user_state', formData.state);
  }
  if (formData.zip || formData.zipCode || formData.zip_code) {
    localStorage.setItem('user_zip', formData.zip || formData.zipCode || formData.zip_code);
  }

  // Update pixel with new user data
  const advancedMatchingData = getAdvancedMatchingData();
  if (Object.keys(advancedMatchingData).length > 0) {
    fbq('init', META_PIXEL_CONFIG.pixelId, advancedMatchingData);
  }

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] User data stored for advanced matching');
  }
}

/**
 * Get the last event ID for server-side deduplication
 * @returns {string|null} Last event ID
 */
function getLastEventId() {
  return sessionStorage.getItem('last_event_id');
}

/**
 * Get all stored events for the session
 * @returns {Array} Array of event data
 */
function getStoredEvents() {
  return JSON.parse(sessionStorage.getItem('meta_events') || '[]');
}

// =============================================================================
// CLICK TRACKING
// =============================================================================

/**
 * Track phone number click
 * @param {string} phoneNumber - The phone number clicked
 */
function trackPhoneClick(phoneNumber) {
  trackContact({
    content_name: 'Phone Click',
    contact_method: 'phone',
    phone_number: phoneNumber,
  });
}

/**
 * Track email click
 * @param {string} email - The email address clicked
 */
function trackEmailClick(email) {
  trackContact({
    content_name: 'Email Click',
    contact_method: 'email',
    email_address: email,
  });
}

/**
 * Track directions click
 * @param {string} address - The address for directions
 */
function trackDirectionsClick(address) {
  trackContact({
    content_name: 'Directions Click',
    contact_method: 'directions',
    address: address,
  });
}

// =============================================================================
// AUTO-TRACKING SETUP
// =============================================================================

/**
 * Setup automatic tracking for common elements
 * Call this after DOM is ready
 */
function setupAutoTracking() {
  // Track phone link clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      const phone = link.getAttribute('href').replace('tel:', '');
      trackPhoneClick(phone);
    });
  });

  // Track email link clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      const email = link.getAttribute('href').replace('mailto:', '').split('?')[0];
      trackEmailClick(email);
    });
  });

  // Track external links to Google Maps / directions
  document.querySelectorAll('a[href*="maps.google"], a[href*="goo.gl/maps"]').forEach(link => {
    link.addEventListener('click', () => {
      trackDirectionsClick(link.textContent || 'Address');
    });
  });

  // Track form submissions with data-track-form attribute
  document.querySelectorAll('form[data-track-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Store user data for advanced matching
      storeUserDataFromForm(data);

      // Track based on form type
      const formType = form.getAttribute('data-track-form');
      switch (formType) {
        case 'quote':
          trackQuoteRequest(data);
          break;
        case 'consultation':
          trackConsultationBooked(data);
          break;
        case 'contact':
          trackLead({
            content_name: 'Contact Form',
            ...data,
          });
          break;
        default:
          trackLead(data);
      }
    });
  });

  // Track service page views
  document.querySelectorAll('[data-service-type]').forEach(element => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const serviceType = entry.target.getAttribute('data-service-type');
          trackServiceInterest(serviceType);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(element);
  });

  if (META_PIXEL_CONFIG.debug) {
    console.log('[Meta Pixel] Auto-tracking setup complete');
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Auto-initialize on script load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMetaPixel();
    setupAutoTracking();
  });
} else {
  initMetaPixel();
  setupAutoTracking();
}

// =============================================================================
// EXPORTS
// =============================================================================

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // Configuration
    META_PIXEL_CONFIG,

    // Initialization
    initMetaPixel,
    setupAutoTracking,

    // Standard Events
    trackPageView,
    trackViewContent,
    trackLead,
    trackContact,
    trackSchedule,
    trackCompleteRegistration,

    // Custom Events - Pool Industry
    trackQuoteRequest,
    trackServiceInterest,
    trackPoolTypeInterest,
    trackFinancingInterest,
    trackGalleryView,
    trackConsultationBooked,
    trackServiceAreaCheck,
    trackVideoWatch,
    trackDownload,
    trackReviewView,
    trackWarrantyInterest,

    // Click Tracking
    trackPhoneClick,
    trackEmailClick,
    trackDirectionsClick,

    // User Data
    storeUserDataFromForm,
    getAdvancedMatchingData,

    // Deduplication
    generateEventId,
    getLastEventId,
    getStoredEvents,

    // Constants
    POOL_SERVICE_TYPES,
    POOL_TYPES,
  };
}

// Export for ES6 modules
if (typeof window !== 'undefined') {
  window.MetaPixel = {
    // Configuration
    config: META_PIXEL_CONFIG,

    // Initialization
    init: initMetaPixel,
    setupAutoTracking,

    // Standard Events
    trackPageView,
    trackViewContent,
    trackLead,
    trackContact,
    trackSchedule,
    trackCompleteRegistration,

    // Custom Events - Pool Industry
    trackQuoteRequest,
    trackServiceInterest,
    trackPoolTypeInterest,
    trackFinancingInterest,
    trackGalleryView,
    trackConsultationBooked,
    trackServiceAreaCheck,
    trackVideoWatch,
    trackDownload,
    trackReviewView,
    trackWarrantyInterest,

    // Click Tracking
    trackPhoneClick,
    trackEmailClick,
    trackDirectionsClick,

    // User Data
    storeUserDataFromForm,
    getAdvancedMatchingData,

    // Deduplication
    generateEventId,
    getLastEventId,
    getStoredEvents,

    // Constants
    POOL_SERVICE_TYPES,
    POOL_TYPES,
  };
}
