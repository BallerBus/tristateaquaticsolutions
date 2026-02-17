/**
 * Tristate Aquatic Solutions — PostHog Analytics Enhancement
 * Auto-tracks business-critical events beyond basic pageviews.
 * Loaded after PostHog init snippet on every page.
 */
(function() {
  'use strict';

  // Wait for PostHog to be ready
  function whenReady(fn) {
    if (typeof posthog !== 'undefined' && posthog.capture) {
      fn();
    } else {
      setTimeout(function() { whenReady(fn); }, 200);
    }
  }

  whenReady(function() {

    // ===== 1. PAGE CLASSIFICATION =====
    var path = window.location.pathname;
    var pageType = 'other';
    if (path === '/' || path === '/index.html') pageType = 'homepage';
    else if (path.indexOf('/blog/') === 0) pageType = 'blog';
    else if (path.indexOf('/portfolio/') === 0) pageType = 'portfolio';
    else if (path.indexOf('/gallery/') === 0) pageType = 'gallery';
    else if (path.indexOf('/locations/') === 0 || path.indexOf('/neighborhoods/') === 0) pageType = 'location';
    else if (path.indexOf('/services/') === 0 || path.indexOf('/pool-maintenance/') === 0) pageType = 'service';
    else if (path.indexOf('/pools/fiberglass/') === 0 && path.split('/').length > 4) pageType = 'location'; // geo landing pages
    else if (path.indexOf('/pools/') === 0) pageType = 'pools';
    else if (path.indexOf('/design-your-pool/') === 0) pageType = 'configurator';
    else if (path.indexOf('/contact/') === 0) pageType = 'contact';
    else if (path.indexOf('/financing/') === 0) pageType = 'financing';
    else if (path.indexOf('/compare/') === 0) pageType = 'comparison';
    else if (path.indexOf('/tools/') === 0) pageType = 'tool';
    else if (path.indexOf('/resources/') === 0) pageType = 'resource';
    else if (path.indexOf('/reviews/') === 0 || path.indexOf('/testimonials/') === 0) pageType = 'reviews';
    else if (path.indexOf('/landing/') === 0) pageType = 'landing';
    else if (path.indexOf('/faq') === 0) pageType = 'faq';
    else if (path.indexOf('/permits/') === 0) pageType = 'permits';

    // Register page type as super property (sent with every event)
    posthog.register({ page_type: pageType });

    // Extract location from geo pages
    var locationMatch = path.match(/\/(locations|neighborhoods|fiberglass)\/([^\/]+)/);
    if (locationMatch) {
      posthog.register({ page_location: locationMatch[2].replace(/-/g, ' ') });
    }

    // ===== 2. CTA CLICK TRACKING =====
    document.addEventListener('click', function(e) {
      var el = e.target.closest('a, button');
      if (!el) return;

      var text = (el.textContent || '').trim().toLowerCase();
      var href = el.getAttribute('href') || '';
      var classList = el.className || '';

      // Phone clicks
      if (href.indexOf('tel:') === 0) {
        posthog.capture('phone_click', {
          phone_number: href.replace('tel:', ''),
          click_location: pageType,
          click_text: el.textContent.trim()
        });
        return;
      }

      // Email clicks
      if (href.indexOf('mailto:') === 0) {
        posthog.capture('email_click', {
          email: href.replace('mailto:', ''),
          click_location: pageType
        });
        return;
      }

      // Get Quote / Free Quote CTAs
      if (text.indexOf('quote') > -1 || text.indexOf('free estimate') > -1 || text.indexOf('get started') > -1) {
        posthog.capture('cta_quote_click', {
          click_text: el.textContent.trim(),
          click_location: pageType,
          source_page: path
        });
        return;
      }

      // Design Your Pool / Configurator CTAs
      if (text.indexOf('design your pool') > -1 || text.indexOf('design my pool') > -1 || text.indexOf('pool configurator') > -1 || text.indexOf('start designing') > -1) {
        posthog.capture('cta_configurator_click', {
          click_text: el.textContent.trim(),
          click_location: pageType,
          source_page: path
        });
        return;
      }

      // Call Now CTAs
      if (text.indexOf('call now') > -1 || text.indexOf('call us') > -1 || text.indexOf('call today') > -1) {
        posthog.capture('cta_call_click', {
          click_text: el.textContent.trim(),
          click_location: pageType
        });
        return;
      }

      // Schedule / Book CTAs
      if (text.indexOf('schedule') > -1 || text.indexOf('book') > -1 || text.indexOf('consultation') > -1) {
        posthog.capture('cta_schedule_click', {
          click_text: el.textContent.trim(),
          click_location: pageType,
          source_page: path
        });
        return;
      }

      // View Portfolio / Case Study links
      if (text.indexOf('case study') > -1 || text.indexOf('view project') > -1 || (href.indexOf('/portfolio/') > -1 && href !== '/portfolio/')) {
        posthog.capture('portfolio_click', {
          project: href,
          click_location: pageType
        });
        return;
      }

      // Nav link clicks (for understanding navigation patterns)
      if (el.closest('nav, .nav, .navbar, .mega-menu')) {
        posthog.capture('nav_click', {
          click_text: el.textContent.trim().substring(0, 50),
          destination: href,
          click_location: pageType
        });
      }
    });

    // ===== 3. FORM SUBMISSION TRACKING =====
    document.addEventListener('submit', function(e) {
      var form = e.target;
      var formId = form.id || form.getAttribute('name') || 'unnamed';
      var action = form.getAttribute('action') || '';

      posthog.capture('form_submit', {
        form_id: formId,
        form_action: action,
        page_type: pageType,
        source_page: path
      });
    });

    // ===== 4. SCROLL DEPTH TRACKING =====
    // Only on content pages (blog, portfolio, resources, service)
    if (['blog', 'portfolio', 'resource', 'service', 'comparison', 'landing'].indexOf(pageType) > -1) {
      var scrollMarkers = { 25: false, 50: false, 75: false, 100: false };

      function getScrollPercent() {
        var h = document.documentElement;
        var b = document.body;
        var st = h.scrollTop || b.scrollTop;
        var sh = (h.scrollHeight || b.scrollHeight) - h.clientHeight;
        return sh > 0 ? Math.round((st / sh) * 100) : 0;
      }

      var scrollTimer;
      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
          var pct = getScrollPercent();
          [25, 50, 75, 100].forEach(function(mark) {
            if (pct >= mark && !scrollMarkers[mark]) {
              scrollMarkers[mark] = true;
              posthog.capture('scroll_depth', {
                depth: mark,
                page_type: pageType,
                page_path: path
              });
            }
          });
        }, 150);
      });
    }

    // ===== 5. TIME ON PAGE TRACKING =====
    var pageStart = Date.now();
    var engagedTime = 0;
    var isVisible = true;

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        engagedTime += Date.now() - pageStart;
        isVisible = false;
      } else {
        pageStart = Date.now();
        isVisible = true;
      }
    });

    window.addEventListener('beforeunload', function() {
      if (isVisible) {
        engagedTime += Date.now() - pageStart;
      }
      var seconds = Math.round(engagedTime / 1000);
      if (seconds >= 10) { // Only track meaningful engagement
        posthog.capture('engaged_time', {
          seconds: seconds,
          page_type: pageType,
          page_path: path
        });
      }
    });

    // ===== 6. OUTBOUND LINK TRACKING =====
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (href && href.indexOf('http') === 0 && href.indexOf(window.location.hostname) === -1) {
        posthog.capture('outbound_click', {
          url: href,
          text: (link.textContent || '').trim().substring(0, 80),
          source_page: path
        });
      }
    });

    // ===== 7. GALLERY INTERACTION =====
    if (pageType === 'gallery') {
      // Track which gallery type was viewed
      var galleryType = 'unknown';
      if (path.indexOf('before-after') > -1) galleryType = 'before-after';
      else if (path.indexOf('night') > -1) galleryType = 'night';
      else if (path.indexOf('outdoor') > -1) galleryType = 'outdoor-living';
      else if (path.indexOf('drone') > -1) galleryType = 'drone';
      else if (path.indexOf('design') > -1) galleryType = 'design-inspiration';
      else if (path.indexOf('/gallery/index') > -1 || path === '/gallery/') galleryType = 'gallery-index';

      posthog.capture('gallery_view', { gallery_type: galleryType });
    }

    // ===== 8. SERVICE INTEREST TRACKING =====
    if (pageType === 'service') {
      var serviceType = path.replace('/services/', '').replace('/index.html', '').replace('/', '');
      posthog.capture('service_view', {
        service: serviceType.replace(/-/g, ' ')
      });
    }

    // ===== 9. TOOL/CALCULATOR USAGE =====
    if (pageType === 'tool') {
      var toolName = path.replace('/tools/', '').replace('/index.html', '').replace('/', '');
      posthog.capture('tool_view', {
        tool: toolName.replace(/-/g, ' ')
      });
    }

    // ===== 10. BLOG ENGAGEMENT =====
    if (pageType === 'blog' && path !== '/blog/' && path !== '/blog/index.html') {
      var blogSlug = path.replace('/blog/', '').replace('.html', '');
      posthog.capture('blog_read', {
        article: blogSlug.replace(/-/g, ' '),
        slug: blogSlug
      });
    }
  });
})();
