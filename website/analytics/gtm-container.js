/**
 * Google Tag Manager Implementation
 * Tri-State Aquatic Solutions
 *
 * GTM Container ID: GTM-XXXXXXX (replace with actual ID)
 *
 * This file contains:
 * 1. GTM container code snippets for head and body
 * 2. Data layer initialization
 * 3. Data layer push functions for tracking key events
 */

// ============================================================================
// GTM CONTAINER CODE SNIPPETS
// ============================================================================

/**
 * GTM Head Snippet
 * Place this code as high in the <head> of the page as possible
 */
const GTM_HEAD_SNIPPET = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
`;

/**
 * GTM Body Snippet (noscript fallback)
 * Place this code immediately after the opening <body> tag
 */
const GTM_BODY_SNIPPET = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`;

// ============================================================================
// DATA LAYER INITIALIZATION
// ============================================================================

/**
 * Initialize the data layer with default values
 * Call this before the GTM head snippet loads
 */
function initializeDataLayer() {
  window.dataLayer = window.dataLayer || [];

  // Push initial page data
  window.dataLayer.push({
    'event': 'dataLayerReady',
    'pageType': getPageType(),
    'pagePath': window.location.pathname,
    'pageTitle': document.title,
    'pageURL': window.location.href,
    'referrer': document.referrer,
    'userAgent': navigator.userAgent,
    'screenResolution': `${window.screen.width}x${window.screen.height}`,
    'viewportSize': `${window.innerWidth}x${window.innerHeight}`,
    'language': navigator.language,
    'timestamp': new Date().toISOString(),

    // Business-specific dimensions
    'businessName': 'Tri-State Aquatic Solutions',
    'serviceArea': 'Delaware, Pennsylvania, New Jersey',
    'industry': 'Pool Installation & Services'
  });
}

/**
 * Determine the page type based on URL
 */
function getPageType() {
  const path = window.location.pathname.toLowerCase();

  if (path === '/' || path === '/index.html') return 'homepage';
  if (path.includes('/services')) return 'services';
  if (path.includes('/pools')) return 'product';
  if (path.includes('/gallery') || path.includes('/portfolio')) return 'gallery';
  if (path.includes('/about')) return 'about';
  if (path.includes('/contact')) return 'contact';
  if (path.includes('/blog')) return 'blog';
  if (path.includes('/faq')) return 'faq';
  if (path.includes('/financing')) return 'financing';
  if (path.includes('/reviews') || path.includes('/testimonials')) return 'reviews';
  if (path.includes('/tools')) return 'tools';
  if (path.includes('/compare')) return 'comparison';
  if (path.includes('/locations') || path.includes('/neighborhoods')) return 'location';
  if (path.includes('/landing')) return 'landing';
  if (path.includes('/resources')) return 'resources';
  if (path.includes('/privacy') || path.includes('/terms')) return 'legal';

  return 'other';
}

// ============================================================================
// DATA LAYER PUSH FUNCTIONS - FORM EVENTS
// ============================================================================

/**
 * Track form submission start
 * @param {string} formName - Name/ID of the form
 * @param {string} formLocation - Where on the page the form is located
 */
function trackFormStart(formName, formLocation = 'unknown') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'formStart',
    'formName': formName,
    'formLocation': formLocation,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track successful form submission
 * @param {string} formName - Name/ID of the form
 * @param {string} formType - Type of form (contact, quote, newsletter, etc.)
 * @param {object} additionalData - Any additional data to track
 */
function trackFormSubmission(formName, formType = 'contact', additionalData = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'formSubmission',
    'formName': formName,
    'formType': formType,
    'conversionType': 'lead',
    'timestamp': new Date().toISOString(),
    ...additionalData
  });
}

/**
 * Track quote request specifically (high-value conversion)
 * @param {string} poolType - Type of pool being quoted
 * @param {string} serviceType - Type of service requested
 */
function trackQuoteRequest(poolType = 'unknown', serviceType = 'installation') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'quoteRequest',
    'conversionType': 'quote',
    'poolType': poolType,
    'serviceType': serviceType,
    'conversionValue': 1,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track form field interaction
 * @param {string} formName - Name of the form
 * @param {string} fieldName - Name of the field interacted with
 */
function trackFormFieldInteraction(formName, fieldName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'formFieldInteraction',
    'formName': formName,
    'fieldName': fieldName,
    'timestamp': new Date().toISOString()
  });
}

// ============================================================================
// DATA LAYER PUSH FUNCTIONS - CLICK EVENTS
// ============================================================================

/**
 * Track CTA button clicks
 * @param {string} buttonText - Text on the button
 * @param {string} buttonLocation - Where on the page the button is
 * @param {string} destinationURL - Where the button leads
 */
function trackCTAClick(buttonText, buttonLocation, destinationURL = '') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'ctaClick',
    'buttonText': buttonText,
    'buttonLocation': buttonLocation,
    'destinationURL': destinationURL,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track phone number clicks
 * @param {string} phoneNumber - The phone number clicked
 * @param {string} clickLocation - Where on the page the click occurred
 */
function trackPhoneClick(phoneNumber, clickLocation = 'unknown') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'phoneClick',
    'phoneNumber': phoneNumber,
    'clickLocation': clickLocation,
    'conversionType': 'phone_lead',
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track email link clicks
 * @param {string} emailAddress - The email address clicked
 * @param {string} clickLocation - Where on the page the click occurred
 */
function trackEmailClick(emailAddress, clickLocation = 'unknown') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'emailClick',
    'emailAddress': emailAddress,
    'clickLocation': clickLocation,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track outbound link clicks
 * @param {string} linkURL - The URL being clicked
 * @param {string} linkText - The text of the link
 */
function trackOutboundClick(linkURL, linkText = '') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'outboundClick',
    'outboundURL': linkURL,
    'linkText': linkText,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track social media icon/link clicks
 * @param {string} platform - Social media platform (facebook, instagram, etc.)
 * @param {string} clickLocation - Where on the page
 */
function trackSocialClick(platform, clickLocation = 'unknown') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'socialClick',
    'socialPlatform': platform,
    'clickLocation': clickLocation,
    'timestamp': new Date().toISOString()
  });
}

// ============================================================================
// DATA LAYER PUSH FUNCTIONS - ENGAGEMENT EVENTS
// ============================================================================

/**
 * Track scroll depth milestones
 * @param {number} percentage - Scroll depth percentage (25, 50, 75, 100)
 */
function trackScrollDepth(percentage) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'scrollDepth',
    'scrollPercentage': percentage,
    'pagePath': window.location.pathname,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track time on page milestones
 * @param {number} seconds - Time in seconds
 */
function trackTimeOnPage(seconds) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'timeOnPage',
    'timeSeconds': seconds,
    'pagePath': window.location.pathname,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track video interactions
 * @param {string} videoName - Name/title of the video
 * @param {string} action - play, pause, complete, progress
 * @param {number} percentage - Percentage watched (for progress events)
 */
function trackVideoInteraction(videoName, action, percentage = 0) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'videoInteraction',
    'videoName': videoName,
    'videoAction': action,
    'videoPercentage': percentage,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track gallery/image interactions
 * @param {string} imageName - Name/alt text of the image
 * @param {string} action - view, zoom, next, previous
 * @param {string} galleryName - Name of the gallery
 */
function trackGalleryInteraction(imageName, action, galleryName = 'main') {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'galleryInteraction',
    'imageName': imageName,
    'imageAction': action,
    'galleryName': galleryName,
    'timestamp': new Date().toISOString()
  });
}

// ============================================================================
// DATA LAYER PUSH FUNCTIONS - TOOL/CALCULATOR EVENTS
// ============================================================================

/**
 * Track calculator/tool usage
 * @param {string} toolName - Name of the tool (pool cost calculator, etc.)
 * @param {string} action - start, complete, error
 * @param {object} inputs - Tool input values (optional)
 */
function trackToolUsage(toolName, action, inputs = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'toolUsage',
    'toolName': toolName,
    'toolAction': action,
    'toolInputs': JSON.stringify(inputs),
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track pool cost calculator completion
 * @param {object} calculatorData - Data from the calculator
 */
function trackCostCalculatorComplete(calculatorData) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'costCalculatorComplete',
    'poolType': calculatorData.poolType || 'unknown',
    'poolSize': calculatorData.poolSize || 'unknown',
    'estimatedCost': calculatorData.estimatedCost || 0,
    'features': calculatorData.features || [],
    'conversionType': 'calculator_lead',
    'timestamp': new Date().toISOString()
  });
}

// ============================================================================
// DATA LAYER PUSH FUNCTIONS - ECOMMERCE-STYLE EVENTS
// ============================================================================

/**
 * Track service/product view
 * @param {string} serviceName - Name of the service or pool type
 * @param {string} serviceCategory - Category (installation, maintenance, etc.)
 * @param {number} estimatedValue - Estimated value of the service
 */
function trackServiceView(serviceName, serviceCategory, estimatedValue = 0) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'serviceView',
    'serviceName': serviceName,
    'serviceCategory': serviceCategory,
    'estimatedValue': estimatedValue,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track financing calculator interaction
 * @param {object} financingData - Financing calculation details
 */
function trackFinancingCalculation(financingData) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'financingCalculation',
    'loanAmount': financingData.loanAmount || 0,
    'loanTerm': financingData.loanTerm || 0,
    'monthlyPayment': financingData.monthlyPayment || 0,
    'timestamp': new Date().toISOString()
  });
}

// ============================================================================
// DATA LAYER PUSH FUNCTIONS - CUSTOM EVENTS
// ============================================================================

/**
 * Track custom events
 * @param {string} eventName - Name of the custom event
 * @param {object} eventData - Additional event data
 */
function trackCustomEvent(eventName, eventData = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': eventName,
    ...eventData,
    'timestamp': new Date().toISOString()
  });
}

/**
 * Track page virtual pageview (for SPA navigation)
 * @param {string} pagePath - Virtual page path
 * @param {string} pageTitle - Virtual page title
 */
function trackVirtualPageview(pagePath, pageTitle) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'virtualPageview',
    'virtualPagePath': pagePath,
    'virtualPageTitle': pageTitle,
    'timestamp': new Date().toISOString()
  });
}

// ============================================================================
// AUTO-TRACKING SETUP
// ============================================================================

/**
 * Set up automatic scroll depth tracking
 */
function setupScrollTracking() {
  const thresholds = [25, 50, 75, 100];
  const tracked = new Set();

  function checkScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  }

  window.addEventListener('scroll', debounce(checkScrollDepth, 100));
}

/**
 * Set up automatic time on page tracking
 */
function setupTimeTracking() {
  const milestones = [30, 60, 120, 180, 300]; // seconds
  const tracked = new Set();
  let startTime = Date.now();

  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    milestones.forEach(milestone => {
      if (elapsed >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone);
        trackTimeOnPage(milestone);
      }
    });
  }, 1000);
}

/**
 * Set up automatic click tracking for phone and email links
 */
function setupLinkTracking() {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';

    // Track phone clicks
    if (href.startsWith('tel:')) {
      const phoneNumber = href.replace('tel:', '');
      const location = getElementLocation(link);
      trackPhoneClick(phoneNumber, location);
    }

    // Track email clicks
    if (href.startsWith('mailto:')) {
      const email = href.replace('mailto:', '').split('?')[0];
      const location = getElementLocation(link);
      trackEmailClick(email, location);
    }

    // Track outbound clicks
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      trackOutboundClick(href, link.textContent.trim());
    }

    // Track social clicks
    const socialPlatforms = ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'pinterest'];
    socialPlatforms.forEach(platform => {
      if (href.toLowerCase().includes(platform)) {
        trackSocialClick(platform, getElementLocation(link));
      }
    });
  });
}

/**
 * Set up automatic form tracking
 */
function setupFormTracking() {
  // Track form field focus
  document.addEventListener('focus', function(e) {
    if (e.target.matches('input, textarea, select')) {
      const form = e.target.closest('form');
      if (form) {
        const formName = form.getAttribute('name') || form.getAttribute('id') || 'unnamed_form';
        const fieldName = e.target.getAttribute('name') || e.target.getAttribute('id') || 'unnamed_field';
        trackFormFieldInteraction(formName, fieldName);
      }
    }
  }, true);

  // Track form submissions
  document.addEventListener('submit', function(e) {
    const form = e.target;
    const formName = form.getAttribute('name') || form.getAttribute('id') || 'unnamed_form';
    const formAction = form.getAttribute('action') || '';

    // Determine form type
    let formType = 'contact';
    if (formAction.includes('quote') || formName.includes('quote')) {
      formType = 'quote';
    } else if (formAction.includes('newsletter') || formName.includes('newsletter')) {
      formType = 'newsletter';
    }

    trackFormSubmission(formName, formType);
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function for scroll tracking
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get the location of an element on the page
 */
function getElementLocation(element) {
  // Check for common location indicators
  if (element.closest('header') || element.closest('nav')) return 'header';
  if (element.closest('footer')) return 'footer';
  if (element.closest('.hero') || element.closest('#hero')) return 'hero';
  if (element.closest('.sidebar') || element.closest('aside')) return 'sidebar';
  if (element.closest('.cta') || element.closest('.call-to-action')) return 'cta_section';

  // Check for section IDs
  const section = element.closest('section');
  if (section && section.id) return section.id;

  return 'content';
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all tracking when DOM is ready
 */
function initializeTracking() {
  initializeDataLayer();
  setupScrollTracking();
  setupTimeTracking();
  setupLinkTracking();
  setupFormTracking();

  console.log('[GTM] Tri-State Aquatic Solutions tracking initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTracking);
} else {
  initializeTracking();
}

// ============================================================================
// EXPORTS (for module usage)
// ============================================================================

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GTM_HEAD_SNIPPET,
    GTM_BODY_SNIPPET,
    initializeDataLayer,
    trackFormStart,
    trackFormSubmission,
    trackQuoteRequest,
    trackFormFieldInteraction,
    trackCTAClick,
    trackPhoneClick,
    trackEmailClick,
    trackOutboundClick,
    trackSocialClick,
    trackScrollDepth,
    trackTimeOnPage,
    trackVideoInteraction,
    trackGalleryInteraction,
    trackToolUsage,
    trackCostCalculatorComplete,
    trackServiceView,
    trackFinancingCalculation,
    trackCustomEvent,
    trackVirtualPageview,
    initializeTracking
  };
}

// Make functions globally available
window.TSAS = window.TSAS || {};
window.TSAS.tracking = {
  trackFormStart,
  trackFormSubmission,
  trackQuoteRequest,
  trackFormFieldInteraction,
  trackCTAClick,
  trackPhoneClick,
  trackEmailClick,
  trackOutboundClick,
  trackSocialClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackVideoInteraction,
  trackGalleryInteraction,
  trackToolUsage,
  trackCostCalculatorComplete,
  trackServiceView,
  trackFinancingCalculation,
  trackCustomEvent,
  trackVirtualPageview
};
