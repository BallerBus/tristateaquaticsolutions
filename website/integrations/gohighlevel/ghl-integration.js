/**
 * GoHighLevel CRM Integration for Tri-State Aquatic Solutions
 * Location ID: A0e67CElQk4EoVK0XY2K
 *
 * This script handles:
 * - UTM parameter capture and storage
 * - Lead tracking and session management
 * - Form submission to GHL via API
 * - Custom field population
 */

(function() {
  'use strict';

  // Configuration
  const GHL_CONFIG = {
    locationId: 'A0e67CElQk4EoVK0XY2K',
    // Forms in GHL
    forms: {
      basic: 'RuQ3jUXPZ8wpCywCNTp0',
      tristate: 'mwzpnfe1nSwGVlSGI8hm'
    },
    // Custom field IDs (created in previous session)
    customFields: {
      budgetRange: 'JNuCCv9A7P3lDwPyTHJQ',
      projectTimeline: 'sHZPxSX8v3AxT7VlPMNU',
      poolTypeInterest: '6rUIe2iyKFOQH5LQoKCN',
      leadSource: 'UJMHkM8jJQZXKWcRwT4v',
      leadScore: 'NjVEV6p5lJxiIEKPKhIk',
      propertyType: 'QMCtIhvB1wJFFZo9p57T',
      estimatedProjectValue: 'g8K6n1GQFXTR4AKHpIR9',
      financingInterest: 'pBwNIFFsNPa7d5WwKTfX',
      utmSource: 'dYINQnIPCcl8LdCBGJnr',
      utmMedium: 'aKlNHbgbJH5zIRdGMT2i',
      utmCampaign: 'QdV5Pu8xScZLwFXCbJpk'
    },
    // Tags (created in previous session)
    tags: {
      hotLead: 'Hot Lead',
      warmLead: 'Warm Lead',
      poolInstallation: 'Pool Installation Interest',
      fiberglass: 'Fiberglass Pool',
      websiteLead: 'Website Lead',
      consultation: 'Consultation Scheduled',
      quoteSent: 'Quote Sent',
      mainLinePA: 'Main Line PA',
      northernDE: 'Northern Delaware',
      referral: 'Referral',
      activeCustomer: 'Customer - Active',
      vip: 'VIP Customer'
    },
    // Calendar for consultations
    calendar: {
      poolConsultation: 'bv7cBA8pwgKIFg0dJ7du'
    },
    // Pipelines
    pipelines: {
      activeDeals: 'LGgQEViEFr1pAKKzvMtJ',
      outboundProspecting: 'CuYXKTlImuCBVU121aP1'
    }
  };

  // UTM Parameter Capture
  const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

  function captureUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {};

    UTM_PARAMS.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utmData[param] = value;
      }
    });

    // Store in localStorage for persistence across pages
    if (Object.keys(utmData).length > 0) {
      const existing = JSON.parse(localStorage.getItem('ghl_utm_data') || '{}');
      // First touch attribution - don't overwrite existing values
      const merged = { ...utmData, ...existing };
      localStorage.setItem('ghl_utm_data', JSON.stringify(merged));

      // Also store last touch for comparison
      localStorage.setItem('ghl_utm_last_touch', JSON.stringify(utmData));
    }

    return utmData;
  }

  function getStoredUTMData() {
    return JSON.parse(localStorage.getItem('ghl_utm_data') || '{}');
  }

  // Session tracking
  function initSession() {
    let sessionId = sessionStorage.getItem('ghl_session_id');

    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('ghl_session_id', sessionId);
      sessionStorage.setItem('ghl_session_start', new Date().toISOString());
    }

    // Track page views in session
    const pageViews = JSON.parse(sessionStorage.getItem('ghl_page_views') || '[]');
    pageViews.push({
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString()
    });
    sessionStorage.setItem('ghl_page_views', JSON.stringify(pageViews));

    return sessionId;
  }

  // Lead scoring based on behavior
  function calculateLeadScore() {
    let score = 0;
    const pageViews = JSON.parse(sessionStorage.getItem('ghl_page_views') || '[]');

    // Points for page views
    score += Math.min(pageViews.length * 2, 20); // Max 20 points for browsing

    // Points for specific page types
    pageViews.forEach(pv => {
      const url = pv.url.toLowerCase();

      // High-intent pages
      if (url.includes('/contact') || url.includes('/quote')) score += 15;
      if (url.includes('/financing')) score += 10;
      if (url.includes('/schedule')) score += 15;

      // Product interest pages
      if (url.includes('/pools/') || url.includes('/fiberglass')) score += 5;
      if (url.includes('/portfolio') || url.includes('/gallery')) score += 5;
      if (url.includes('/calculator')) score += 10;

      // Location pages
      if (url.includes('/locations/') || url.includes('/service-areas/')) score += 3;

      // Comparison/research pages
      if (url.includes('/compare') || url.includes('/vs-')) score += 7;
    });

    // Points for UTM source quality
    const utmData = getStoredUTMData();
    if (utmData.utm_source === 'google' && utmData.utm_medium === 'cpc') score += 15;
    if (utmData.gclid) score += 10;
    if (utmData.utm_source === 'referral') score += 20;
    if (utmData.utm_source === 'facebook') score += 5;

    // Time on site bonus
    const sessionStart = sessionStorage.getItem('ghl_session_start');
    if (sessionStart) {
      const duration = (new Date() - new Date(sessionStart)) / 1000 / 60; // minutes
      if (duration > 2) score += 5;
      if (duration > 5) score += 10;
      if (duration > 10) score += 15;
    }

    return Math.min(score, 100); // Cap at 100
  }

  // Determine lead temperature
  function getLeadTemperature(score) {
    if (score >= 60) return 'hot';
    if (score >= 30) return 'warm';
    return 'cold';
  }

  // Determine location tag based on address/zip
  function getLocationTag(zip, state) {
    const mainLineZips = ['19003', '19004', '19010', '19035', '19041', '19066', '19072', '19083', '19085', '19087', '19096', '19301', '19312', '19333', '19355'];
    const northernDEZips = ['19701', '19702', '19703', '19706', '19707', '19708', '19709', '19710', '19711', '19713', '19714', '19715', '19716', '19717', '19718', '19720', '19801', '19802', '19803', '19804', '19805', '19806', '19807', '19808', '19809', '19810'];

    if (state === 'PA' || mainLineZips.includes(zip)) {
      return GHL_CONFIG.tags.mainLinePA;
    }
    if (state === 'DE' || northernDEZips.includes(zip)) {
      return GHL_CONFIG.tags.northernDE;
    }
    return null;
  }

  // Format phone number
  function formatPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return '+1' + digits;
    }
    if (digits.length === 11 && digits.startsWith('1')) {
      return '+' + digits;
    }
    return phone;
  }

  // Create contact payload for GHL API
  function buildContactPayload(formData) {
    const utmData = getStoredUTMData();
    const leadScore = calculateLeadScore();
    const temperature = getLeadTemperature(leadScore);

    // Determine tags
    const tags = [GHL_CONFIG.tags.websiteLead, GHL_CONFIG.tags.poolInstallation];

    if (temperature === 'hot') tags.push(GHL_CONFIG.tags.hotLead);
    else if (temperature === 'warm') tags.push(GHL_CONFIG.tags.warmLead);

    const locationTag = getLocationTag(formData.postalCode, formData.state);
    if (locationTag) tags.push(locationTag);

    if (formData.poolType && formData.poolType.toLowerCase().includes('fiberglass')) {
      tags.push(GHL_CONFIG.tags.fiberglass);
    }

    if (formData.source && formData.source.toLowerCase().includes('referral')) {
      tags.push(GHL_CONFIG.tags.referral);
    }

    // Build custom fields
    const customFields = [];

    if (formData.budget) {
      customFields.push({ id: GHL_CONFIG.customFields.budgetRange, value: formData.budget });
    }
    if (formData.timeline) {
      customFields.push({ id: GHL_CONFIG.customFields.projectTimeline, value: formData.timeline });
    }
    if (formData.poolType) {
      customFields.push({ id: GHL_CONFIG.customFields.poolTypeInterest, value: formData.poolType });
    }
    if (formData.propertyType) {
      customFields.push({ id: GHL_CONFIG.customFields.propertyType, value: formData.propertyType });
    }
    if (formData.financing) {
      customFields.push({ id: GHL_CONFIG.customFields.financingInterest, value: formData.financing });
    }

    // Lead tracking fields
    customFields.push({ id: GHL_CONFIG.customFields.leadScore, value: leadScore.toString() });
    customFields.push({ id: GHL_CONFIG.customFields.leadSource, value: formData.source || 'Website Form' });

    // UTM fields
    if (utmData.utm_source) {
      customFields.push({ id: GHL_CONFIG.customFields.utmSource, value: utmData.utm_source });
    }
    if (utmData.utm_medium) {
      customFields.push({ id: GHL_CONFIG.customFields.utmMedium, value: utmData.utm_medium });
    }
    if (utmData.utm_campaign) {
      customFields.push({ id: GHL_CONFIG.customFields.utmCampaign, value: utmData.utm_campaign });
    }

    return {
      locationId: GHL_CONFIG.locationId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone ? formatPhone(formData.phone) : undefined,
      address1: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      source: 'Website',
      tags: tags,
      customFields: customFields
    };
  }

  // Form submission handler
  function handleFormSubmission(formElement, successCallback, errorCallback) {
    const formData = new FormData(formElement);
    const data = {};

    // Map form fields to our data structure
    const fieldMappings = {
      'first_name': 'firstName',
      'firstName': 'firstName',
      'first-name': 'firstName',
      'last_name': 'lastName',
      'lastName': 'lastName',
      'last-name': 'lastName',
      'email': 'email',
      'phone': 'phone',
      'telephone': 'phone',
      'address': 'address',
      'street': 'address',
      'city': 'city',
      'state': 'state',
      'zip': 'postalCode',
      'postal_code': 'postalCode',
      'postalCode': 'postalCode',
      'zipcode': 'postalCode',
      'budget': 'budget',
      'budget_range': 'budget',
      'timeline': 'timeline',
      'project_timeline': 'timeline',
      'pool_type': 'poolType',
      'poolType': 'poolType',
      'property_type': 'propertyType',
      'propertyType': 'propertyType',
      'financing': 'financing',
      'financing_interest': 'financing',
      'source': 'source',
      'how_heard': 'source',
      'message': 'notes',
      'comments': 'notes'
    };

    formData.forEach((value, key) => {
      const mappedKey = fieldMappings[key] || key;
      data[mappedKey] = value;
    });

    const payload = buildContactPayload(data);

    // For debugging/development
    console.log('GHL Contact Payload:', payload);

    // Track form submission event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'ghl_form_submit',
        form_data: {
          lead_score: calculateLeadScore(),
          temperature: getLeadTemperature(calculateLeadScore()),
          source: payload.source
        }
      });
    }

    // Return payload for external handling (API calls should be server-side)
    if (successCallback) {
      successCallback(payload);
    }

    return payload;
  }

  // Auto-attach to forms with data-ghl attribute
  function initFormTracking() {
    document.querySelectorAll('form[data-ghl]').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const onSuccess = (payload) => {
          // Post to your server endpoint which will call GHL API
          fetch('/api/ghl/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          .then(response => response.json())
          .then(data => {
            // Redirect to thank you page or show success message
            const redirectUrl = form.dataset.ghlRedirect || '/thank-you';
            window.location.href = redirectUrl;
          })
          .catch(error => {
            console.error('Form submission error:', error);
            alert('There was an error submitting your form. Please call us at (484) 843-9765.');
          });
        };

        handleFormSubmission(form, onSuccess);
      });
    });
  }

  // Tracking pixel for GHL
  function fireGHLPixel(eventName, eventData = {}) {
    // This would typically ping a GHL tracking endpoint
    // For now, we'll use GTM dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'ghl_' + eventName,
        ghl_location_id: GHL_CONFIG.locationId,
        ...eventData
      });
    }
  }

  // Phone call tracking
  function initPhoneTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', function() {
        fireGHLPixel('phone_click', {
          phone_number: this.href.replace('tel:', '')
        });
      });
    });
  }

  // Initialize on DOM ready
  function init() {
    captureUTMParams();
    initSession();
    initFormTracking();
    initPhoneTracking();

    // Expose to global scope for manual use
    window.GHLIntegration = {
      config: GHL_CONFIG,
      captureUTMParams: captureUTMParams,
      getStoredUTMData: getStoredUTMData,
      calculateLeadScore: calculateLeadScore,
      getLeadTemperature: getLeadTemperature,
      buildContactPayload: buildContactPayload,
      handleFormSubmission: handleFormSubmission,
      fireGHLPixel: fireGHLPixel
    };

    console.log('GHL Integration initialized for Tri-State Aquatic Solutions');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
