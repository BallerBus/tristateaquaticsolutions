# Performance Optimization Guide

## Tri-State Aquatic Solutions Website

This guide provides actionable optimization strategies for improving Core Web Vitals and overall website performance.

---

## Core Web Vitals Targets

### Google's Official Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | <= 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** (First Input Delay) | <= 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | <= 0.1 | 0.1 - 0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | <= 200ms | 200ms - 500ms | > 500ms |
| **TTFB** (Time to First Byte) | <= 800ms | 800ms - 1800ms | > 1800ms |

### Our Performance Targets

For Tri-State Aquatic Solutions, we aim for:

- **LCP**: < 2.0 seconds
- **FID**: < 50ms
- **CLS**: < 0.05
- **INP**: < 150ms
- **TTFB**: < 500ms

---

## LCP Optimization Checklist

LCP measures loading performance. The largest element on the page (usually a hero image or heading) should render quickly.

### Image Optimization

- [ ] **Use modern formats**: Convert images to WebP or AVIF format
- [ ] **Responsive images**: Use `srcset` and `sizes` attributes
- [ ] **Preload hero images**: Add `<link rel="preload">` for LCP images
- [ ] **Lazy load below-fold images**: Use `loading="lazy"` attribute
- [ ] **Optimize dimensions**: Serve images at exact display size
- [ ] **Use CDN**: Serve images from edge locations

```html
<!-- Preload LCP image -->
<link rel="preload" as="image" href="/images/hero-pool.webp" type="image/webp">

<!-- Responsive image with WebP -->
<picture>
  <source srcset="/images/hero-pool-400.webp 400w,
                  /images/hero-pool-800.webp 800w,
                  /images/hero-pool-1200.webp 1200w"
          sizes="(max-width: 400px) 400px,
                 (max-width: 800px) 800px,
                 1200px"
          type="image/webp">
  <img src="/images/hero-pool-800.jpg"
       alt="Professional pool installation"
       width="1200"
       height="600"
       fetchpriority="high">
</picture>
```

### Server Response Time

- [ ] **Enable caching**: Set proper cache headers
- [ ] **Use HTTP/2 or HTTP/3**: Enable on server
- [ ] **Compress responses**: Enable Gzip/Brotli compression
- [ ] **Minimize redirects**: Each redirect adds latency
- [ ] **Optimize database queries**: Index frequently accessed data
- [ ] **Use CDN**: Cache static assets globally

### Render-Blocking Resources

- [ ] **Inline critical CSS**: Embed above-fold styles in `<head>`
- [ ] **Defer non-critical CSS**: Load stylesheets asynchronously
- [ ] **Defer JavaScript**: Use `defer` or `async` attributes
- [ ] **Minimize third-party scripts**: Audit and remove unnecessary scripts

```html
<!-- Critical CSS inline -->
<style>
  /* Critical above-fold styles */
</style>

<!-- Non-critical CSS deferred -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- JavaScript deferred -->
<script src="main.js" defer></script>
```

---

## CLS Optimization Checklist

CLS measures visual stability. Elements shouldn't shift unexpectedly during page load.

### Reserve Space for Dynamic Content

- [ ] **Set image dimensions**: Always include `width` and `height` attributes
- [ ] **Use aspect-ratio CSS**: For responsive containers
- [ ] **Reserve ad space**: Set fixed dimensions for ad slots
- [ ] **Reserve embed space**: Set dimensions for videos, maps, iframes

```html
<!-- Images with explicit dimensions -->
<img src="pool.jpg" width="800" height="600" alt="Swimming pool">

<!-- CSS aspect-ratio for responsive -->
<style>
.image-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}
</style>
```

### Fonts

- [ ] **Use font-display: swap**: Show fallback font immediately
- [ ] **Preload critical fonts**: Load fonts early
- [ ] **Match fallback metrics**: Use `size-adjust` for similar fallback
- [ ] **Self-host fonts**: Avoid Google Fonts latency when possible

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
}
```

### Animations

- [ ] **Use transform for animations**: Avoid animating layout properties
- [ ] **Prefer CSS over JavaScript**: CSS animations are more performant
- [ ] **Use will-change sparingly**: Only when needed

```css
/* Good - transform doesn't cause layout shift */
.animate {
  transform: translateX(100px);
  transition: transform 0.3s ease;
}

/* Bad - left causes layout shift */
.animate-bad {
  left: 100px;
  transition: left 0.3s ease;
}
```

### Dynamic Content

- [ ] **Insert content above existing**: Push content down, not up
- [ ] **Avoid inserting above viewport**: Content above fold causes shifts
- [ ] **Use skeleton screens**: Show placeholder structure during load

---

## FID/INP Optimization Checklist

FID and INP measure interactivity. The page should respond quickly to user input.

### JavaScript Optimization

- [ ] **Break up long tasks**: Split JavaScript into chunks < 50ms
- [ ] **Use web workers**: Offload heavy computation
- [ ] **Defer non-critical JavaScript**: Load after interaction
- [ ] **Remove unused JavaScript**: Audit and tree-shake
- [ ] **Minimize main thread work**: Reduce JavaScript execution time

```javascript
// Break long task into smaller chunks
function processLargeArray(items) {
  const CHUNK_SIZE = 100;
  let index = 0;

  function processChunk() {
    const chunk = items.slice(index, index + CHUNK_SIZE);
    chunk.forEach(processItem);
    index += CHUNK_SIZE;

    if (index < items.length) {
      requestIdleCallback(processChunk);
    }
  }

  requestIdleCallback(processChunk);
}
```

### Event Handlers

- [ ] **Debounce scroll/resize handlers**: Limit execution frequency
- [ ] **Use passive event listeners**: For touch and wheel events
- [ ] **Remove unnecessary handlers**: Audit event listeners

```javascript
// Passive event listener
document.addEventListener('scroll', handleScroll, { passive: true });

// Debounced handler
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

### Third-Party Scripts

- [ ] **Load third-party async**: Use `async` attribute
- [ ] **Delay non-essential scripts**: Load after page interaction
- [ ] **Use facade pattern**: Load heavy widgets on interaction
- [ ] **Self-host when possible**: Avoid external requests

```html
<!-- Delayed loading of non-essential script -->
<script>
document.addEventListener('scroll', function loadAnalytics() {
  const script = document.createElement('script');
  script.src = 'analytics.js';
  document.body.appendChild(script);
  document.removeEventListener('scroll', loadAnalytics);
}, { once: true, passive: true });
</script>
```

---

## Image Optimization Guidelines

### Format Selection

| Format | Use Case | Browser Support |
|--------|----------|-----------------|
| **WebP** | General images, photos | All modern browsers |
| **AVIF** | Photos with high compression | Chrome, Firefox |
| **SVG** | Icons, logos, illustrations | All browsers |
| **PNG** | Images requiring transparency | All browsers |
| **JPEG** | Photos (fallback) | All browsers |

### Compression Settings

- **JPEG/WebP Quality**: 75-85 for photos
- **PNG**: Use pngquant for lossy compression
- **AVIF Quality**: 50-70 (more efficient)

### Image Sizing Guidelines

| Viewport | Max Image Width | Max Hero Width |
|----------|-----------------|----------------|
| Mobile | 400px | 800px |
| Tablet | 800px | 1200px |
| Desktop | 1200px | 1920px |

### Implementation Example

```html
<picture>
  <!-- AVIF for supported browsers -->
  <source type="image/avif"
          srcset="pool-400.avif 400w,
                  pool-800.avif 800w,
                  pool-1200.avif 1200w"
          sizes="(max-width: 400px) 400px,
                 (max-width: 800px) 800px,
                 1200px">
  <!-- WebP fallback -->
  <source type="image/webp"
          srcset="pool-400.webp 400w,
                  pool-800.webp 800w,
                  pool-1200.webp 1200w"
          sizes="(max-width: 400px) 400px,
                 (max-width: 800px) 800px,
                 1200px">
  <!-- JPEG fallback -->
  <img src="pool-800.jpg"
       srcset="pool-400.jpg 400w,
               pool-800.jpg 800w,
               pool-1200.jpg 1200w"
       sizes="(max-width: 400px) 400px,
              (max-width: 800px) 800px,
              1200px"
       alt="Professional pool installation"
       width="1200"
       height="600"
       loading="lazy"
       decoding="async">
</picture>
```

---

## JavaScript Optimization

### Code Splitting

Split JavaScript into smaller bundles loaded on demand:

```javascript
// Dynamic import for route-based splitting
const ContactForm = () => import('./components/ContactForm.js');

// Load component when needed
button.addEventListener('click', async () => {
  const { default: Form } = await ContactForm();
  Form.render('#form-container');
});
```

### Tree Shaking

Ensure unused code is removed:

```javascript
// Bad - imports entire library
import _ from 'lodash';

// Good - imports only needed functions
import debounce from 'lodash/debounce';
```

### Minification and Compression

- Use Terser for JavaScript minification
- Enable Brotli compression on server
- Remove source maps in production

### Bundle Analysis

Regularly analyze bundle size:

```bash
# Using webpack-bundle-analyzer
npx webpack-bundle-analyzer stats.json
```

---

## CSS Optimization

### Critical CSS

Extract and inline critical above-fold CSS:

```html
<head>
  <style>
    /* Critical CSS - above the fold styles */
    body { margin: 0; font-family: sans-serif; }
    .header { background: #0066cc; color: white; }
    .hero { height: 60vh; }
  </style>
  <link rel="preload" href="full.css" as="style" onload="this.rel='stylesheet'">
</head>
```

### Remove Unused CSS

Use PurgeCSS or similar tools:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js'],
      safelist: ['dynamic-class']
    })
  ]
};
```

### Minimize CSS

- Remove comments and whitespace
- Combine duplicate rules
- Use shorthand properties

### CSS Loading Strategies

```html
<!-- Preload critical stylesheet -->
<link rel="preload" href="critical.css" as="style">
<link rel="stylesheet" href="critical.css">

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="non-critical.css" as="style" onload="this.rel='stylesheet'">
```

---

## Font Loading Optimization

### Font Display Strategies

```css
/* Swap - show fallback immediately, swap when loaded */
@font-face {
  font-family: 'CustomFont';
  src: url('custom.woff2') format('woff2');
  font-display: swap;
}

/* Optional - use custom font only if already cached */
@font-face {
  font-family: 'OptionalFont';
  src: url('optional.woff2') format('woff2');
  font-display: optional;
}
```

### Preload Critical Fonts

```html
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

### Subset Fonts

Only include characters you need:

```bash
# Using pyftsubset
pyftsubset font.ttf --text="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
```

### Variable Fonts

Use variable fonts to reduce file count:

```css
@font-face {
  font-family: 'Variable';
  src: url('variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
}
```

---

## Caching Strategies

### Cache-Control Headers

```apache
# Apache .htaccess
<IfModule mod_expires.c>
  # HTML - no cache
  <FilesMatch "\.(html)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>

  # CSS/JS - cache with revalidation
  <FilesMatch "\.(css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Images - long cache
  <FilesMatch "\.(jpg|jpeg|png|gif|webp|avif|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Fonts - long cache
  <FilesMatch "\.(woff|woff2|ttf|eot)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
```

### Service Worker Caching

```javascript
// sw.js
const CACHE_NAME = 'tsas-v1';
const STATIC_ASSETS = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Stale-While-Revalidate

```javascript
// Network first with cache fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => cache.match(event.request));
    })
  );
});
```

---

## Quick Wins Checklist

### Immediate Impact (Do These First)

1. [ ] Enable Gzip/Brotli compression
2. [ ] Add explicit width/height to images
3. [ ] Preload LCP image
4. [ ] Convert images to WebP
5. [ ] Add `loading="lazy"` to below-fold images
6. [ ] Set cache headers for static assets
7. [ ] Defer non-critical JavaScript
8. [ ] Inline critical CSS

### Medium-Term Improvements

1. [ ] Implement responsive images with srcset
2. [ ] Set up a CDN
3. [ ] Optimize web fonts
4. [ ] Remove unused CSS/JavaScript
5. [ ] Implement code splitting
6. [ ] Add service worker for caching

### Long-Term Optimizations

1. [ ] Implement HTTP/3
2. [ ] Use image CDN with automatic optimization
3. [ ] Implement edge rendering
4. [ ] Set up automated performance monitoring
5. [ ] Create performance budgets

---

## Tools and Resources

### Testing Tools

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools Performance Panel](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

### Image Optimization

- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)
- [Sharp](https://sharp.pixelplumbing.com/)

### Code Analysis

- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [source-map-explorer](https://github.com/danvk/source-map-explorer)
- [PurgeCSS](https://purgecss.com/)

### Monitoring

- [Google Search Console](https://search.google.com/search-console/)
- [Chrome UX Report](https://developer.chrome.com/docs/crux/)
- [SpeedCurve](https://speedcurve.com/)
- [Calibre](https://calibreapp.com/)
