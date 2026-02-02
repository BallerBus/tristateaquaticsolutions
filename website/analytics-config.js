/**
 * Tri-State Aquatic Solutions - Analytics Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create GTM account → https://tagmanager.google.com
 *    - Create container for "Web"
 *    - Replace GTM_CONTAINER_ID below
 * 
 * 2. Create GA4 property → https://analytics.google.com
 *    - Link to GTM container
 *    - Replace GA4_MEASUREMENT_ID below
 * 
 * 3. Create Hotjar account → https://hotjar.com
 *    - Add site: tristateaquaticsolutions.com
 *    - Replace HOTJAR_SITE_ID below
 * 
 * 4. Add tracking tags to pages using:
 *    - website/integrations/gtm-head.html (in <head>)
 *    - website/integrations/gtm-noscript.html (in <body>)
 *    - website/integrations/hotjar.html (in <head>)
 */

const ANALYTICS_CONFIG = {
  // Google Tag Manager
  gtm: {
    containerId: 'GTM-KXFWZNHH', // TODO: Replace with your GTM container ID
    enabled: false, // Set to true after creating GTM container
    debugMode: true // Set to false in production
  },
  
  // Google Analytics 4
  ga4: {
    measurementId: 'G-XXXXXXXXXX', // TODO: Replace with your GA4 measurement ID
    enabled: false, // Set to true after creating GA4 property
    debugMode: true, // Set to false in production
    
    // Events to track as conversions
    conversions: [
      'generate_lead',     // Form submissions
      'phone_click',       // Click-to-call
      'directions_click',  // Get directions
      'quote_request',     // Quote form
      'gallery_view',      // Gallery views
      'page_view'          // All page views
    ]
  },
  
  // Hotjar Heatmaps & Recordings
  hotjar: {
    siteId: 'XXXXXXX', // TODO: Replace with your Hotjar Site ID
    version: 6,
    enabled: false, // Set to true after creating Hotjar account
    
    // Features to enable
    heatmaps: {
      click: true,
      scroll: true,
      move: false // Disable to reduce data
    },
    
    recordings: {
      enabled: true,
      samplingRate: 0.2 // 20% of visitors
    },
    
    forms: {
      enabled: true,
      captureInputs: false // Privacy: don't capture sensitive input
    }
  },
  
  // Vercel Analytics
  vercel: {
    enabled: true, // Vercel automatically injects this
    debugMode: false
  },
  
  // Tracking Configuration
  tracking: {
    // Exclude internal IPs (add your office IP)
    excludedIpPatterns: [],
    
    // Cookie consent (enable when ready for GDPR compliance)
    consentRequired: false,
    consentCategories: {
      analytics: true,
      marketing: false,
      functionality: true
    }
  },
  
  // Event Tracking
  events: {
    // Button clicks to track
    trackedButtons: [
      { selector: '.phone-button', name: 'phone_click', category: 'Engagement' },
      { selector: '.contact-form', name: 'form_submit', category: 'Conversion' },
      { selector: '.quote-button', name: 'quote_request', category: 'Conversion' },
      { selector: '.gallery-link', name: 'gallery_view', category: 'Engagement' },
      { selector: '[href^="tel:"]', name: 'phone_click', category: 'Engagement' }
    ],
    
    // Pages with special tracking
    pageTracking: {
      // Pool type pages
      '/pools/fiberglass/': { poolType: 'fiberglass' },
      '/pools/concrete/': { poolType: 'concrete' },
      '/pools/plunge/': { poolType: 'plunge' },
      
      // Location pages
      '/locations/': { trackingType: 'location' },
      
      // Service pages
      '/services/': { trackingType: 'service' }
    }
  },
  
  // Conversion Funnels
  funnels: {
    leadFunnel: [
      { step: 1, event: 'page_view', name: 'Home' },
      { step: 2, event: 'page_view', name: 'Pool Type' },
      { step: 3, event: 'page_view', name: 'Gallery' },
      { step: 4, event: 'generate_lead', name: 'Contact Form' },
      { step: 5, event: 'quote_request', name: 'Quote Request' }
    ],
    
    phoneFunnel: [
      { step: 1, event: 'page_view', name: 'Any Page' },
      { step: 2, event: 'phone_click', name: 'Phone Click' }
    ]
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ANALYTICS_CONFIG;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
  window.ANALYTICS_CONFIG = ANALYTICS_CONFIG;
}

