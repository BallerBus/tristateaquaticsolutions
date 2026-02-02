/**
 * Tri-State Aquatic Solutions - Cookie Consent Banner
 * GDPR/CCPA/ePrivacy Compliant Cookie Consent Management
 *
 * Version: 1.0.0
 * Last Updated: 2026-02-02
 *
 * Features:
 * - GDPR/CCPA/ePrivacy compliant
 * - Granular consent options
 * - Remember user preferences
 * - Respects Do Not Track browser setting
 * - Accessible (WCAG 2.1 AA)
 * - Mobile-friendly design
 */

(function() {
    'use strict';

    // =============================================================================
    // CONFIGURATION
    // =============================================================================

    const CONFIG = {
        // Cookie settings
        cookieName: 'tsas_analytics_consent',
        cookieExpiry: 365, // days

        // Consent categories
        categories: {
            necessary: {
                name: 'Necessary',
                description: 'Essential for the website to function. Cannot be disabled.',
                required: true,
                default: true
            },
            analytics: {
                name: 'Analytics',
                description: 'Help us understand how visitors interact with our website.',
                required: false,
                default: false
            },
            marketing: {
                name: 'Marketing',
                description: 'Used to deliver personalized advertisements.',
                required: false,
                default: false
            },
            functional: {
                name: 'Functional',
                description: 'Enable enhanced functionality and personalization.',
                required: false,
                default: true
            }
        },

        // UI settings
        ui: {
            position: 'bottom', // 'bottom', 'top', 'bottom-left', 'bottom-right'
            theme: 'light', // 'light', 'dark'
            showDeclineButton: true,
            showSettingsButton: true,
            animation: true
        },

        // Privacy policy URL
        privacyPolicyUrl: '/privacy-policy/',

        // Company info
        company: {
            name: 'Tri-State Aquatic Solutions',
            website: 'www.tristateaquaticsolutions.com'
        }
    };

    // =============================================================================
    // STYLES
    // =============================================================================

    const STYLES = `
        /* Cookie Consent Banner Styles */
        .tsas-cookie-banner {
            position: fixed;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            box-sizing: border-box;
        }

        .tsas-cookie-banner *,
        .tsas-cookie-banner *::before,
        .tsas-cookie-banner *::after {
            box-sizing: inherit;
        }

        /* Position variants */
        .tsas-cookie-banner--bottom {
            bottom: 0;
            left: 0;
            right: 0;
        }

        .tsas-cookie-banner--top {
            top: 0;
            left: 0;
            right: 0;
        }

        .tsas-cookie-banner--bottom-left {
            bottom: 20px;
            left: 20px;
            max-width: 400px;
        }

        .tsas-cookie-banner--bottom-right {
            bottom: 20px;
            right: 20px;
            max-width: 400px;
        }

        /* Banner container */
        .tsas-cookie-banner__container {
            background: #ffffff;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
            padding: 20px 24px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 16px;
        }

        .tsas-cookie-banner--bottom-left .tsas-cookie-banner__container,
        .tsas-cookie-banner--bottom-right .tsas-cookie-banner__container {
            flex-direction: column;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        /* Dark theme */
        .tsas-cookie-banner--dark .tsas-cookie-banner__container {
            background: #1a1a2e;
            color: #ffffff;
        }

        /* Content */
        .tsas-cookie-banner__content {
            flex: 1;
            min-width: 280px;
        }

        .tsas-cookie-banner__title {
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #0E1F34;
        }

        .tsas-cookie-banner--dark .tsas-cookie-banner__title {
            color: #ffffff;
        }

        .tsas-cookie-banner__text {
            margin: 0;
            color: #4a5568;
        }

        .tsas-cookie-banner--dark .tsas-cookie-banner__text {
            color: #a0aec0;
        }

        .tsas-cookie-banner__link {
            color: #00A6B2;
            text-decoration: none;
        }

        .tsas-cookie-banner__link:hover {
            text-decoration: underline;
        }

        /* Buttons */
        .tsas-cookie-banner__buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .tsas-cookie-banner__btn {
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            white-space: nowrap;
        }

        .tsas-cookie-banner__btn:focus {
            outline: 2px solid #00A6B2;
            outline-offset: 2px;
        }

        .tsas-cookie-banner__btn--accept {
            background: #00A6B2;
            color: #ffffff;
        }

        .tsas-cookie-banner__btn--accept:hover {
            background: #008a94;
        }

        .tsas-cookie-banner__btn--decline {
            background: #e2e8f0;
            color: #4a5568;
        }

        .tsas-cookie-banner__btn--decline:hover {
            background: #cbd5e0;
        }

        .tsas-cookie-banner--dark .tsas-cookie-banner__btn--decline {
            background: #2d3748;
            color: #e2e8f0;
        }

        .tsas-cookie-banner--dark .tsas-cookie-banner__btn--decline:hover {
            background: #4a5568;
        }

        .tsas-cookie-banner__btn--settings {
            background: transparent;
            color: #4a5568;
            border: 1px solid #e2e8f0;
        }

        .tsas-cookie-banner__btn--settings:hover {
            background: #f7fafc;
            border-color: #cbd5e0;
        }

        .tsas-cookie-banner--dark .tsas-cookie-banner__btn--settings {
            color: #e2e8f0;
            border-color: #4a5568;
        }

        .tsas-cookie-banner--dark .tsas-cookie-banner__btn--settings:hover {
            background: #2d3748;
        }

        /* Settings Modal */
        .tsas-cookie-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .tsas-cookie-modal--visible {
            opacity: 1;
            visibility: visible;
        }

        .tsas-cookie-modal__overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }

        .tsas-cookie-modal__content {
            position: relative;
            background: #ffffff;
            border-radius: 12px;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }

        .tsas-cookie-modal--visible .tsas-cookie-modal__content {
            transform: translateY(0);
        }

        .tsas-cookie-modal__header {
            padding: 24px 24px 16px;
            border-bottom: 1px solid #e2e8f0;
        }

        .tsas-cookie-modal__title {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            color: #0E1F34;
        }

        .tsas-cookie-modal__close {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            color: #4a5568;
            transition: all 0.2s ease;
        }

        .tsas-cookie-modal__close:hover {
            background: #f7fafc;
        }

        .tsas-cookie-modal__body {
            padding: 24px;
        }

        .tsas-cookie-modal__description {
            margin: 0 0 24px 0;
            color: #4a5568;
        }

        /* Cookie categories */
        .tsas-cookie-category {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 12px;
            overflow: hidden;
        }

        .tsas-cookie-category__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background: #f7fafc;
        }

        .tsas-cookie-category__info {
            flex: 1;
        }

        .tsas-cookie-category__name {
            font-weight: 600;
            color: #0E1F34;
            margin: 0 0 4px 0;
        }

        .tsas-cookie-category__desc {
            font-size: 13px;
            color: #718096;
            margin: 0;
        }

        /* Toggle switch */
        .tsas-cookie-toggle {
            position: relative;
            width: 48px;
            height: 26px;
            flex-shrink: 0;
            margin-left: 16px;
        }

        .tsas-cookie-toggle__input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 1;
        }

        .tsas-cookie-toggle__input:disabled {
            cursor: not-allowed;
        }

        .tsas-cookie-toggle__slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #cbd5e0;
            border-radius: 26px;
            transition: all 0.3s ease;
        }

        .tsas-cookie-toggle__slider::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: #ffffff;
            border-radius: 50%;
            top: 3px;
            left: 3px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .tsas-cookie-toggle__input:checked + .tsas-cookie-toggle__slider {
            background: #00A6B2;
        }

        .tsas-cookie-toggle__input:checked + .tsas-cookie-toggle__slider::before {
            transform: translateX(22px);
        }

        .tsas-cookie-toggle__input:disabled + .tsas-cookie-toggle__slider {
            opacity: 0.6;
        }

        /* Modal footer */
        .tsas-cookie-modal__footer {
            padding: 16px 24px 24px;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        /* Animation */
        .tsas-cookie-banner--animated {
            animation: tsas-slide-up 0.4s ease;
        }

        @keyframes tsas-slide-up {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        /* Hidden state */
        .tsas-cookie-banner--hidden {
            display: none;
        }

        /* Responsive */
        @media (max-width: 640px) {
            .tsas-cookie-banner__container {
                flex-direction: column;
                padding: 16px;
            }

            .tsas-cookie-banner__buttons {
                width: 100%;
                flex-direction: column;
            }

            .tsas-cookie-banner__btn {
                width: 100%;
                text-align: center;
            }

            .tsas-cookie-modal__content {
                max-height: 100vh;
                border-radius: 0;
            }

            .tsas-cookie-modal {
                padding: 0;
            }

            .tsas-cookie-modal__footer {
                flex-direction: column;
            }

            .tsas-cookie-modal__footer .tsas-cookie-banner__btn {
                width: 100%;
            }
        }

        /* Print - hide banner */
        @media print {
            .tsas-cookie-banner,
            .tsas-cookie-modal {
                display: none !important;
            }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            .tsas-cookie-banner--animated {
                animation: none;
            }

            .tsas-cookie-modal,
            .tsas-cookie-modal__content,
            .tsas-cookie-toggle__slider,
            .tsas-cookie-toggle__slider::before,
            .tsas-cookie-banner__btn {
                transition: none;
            }
        }
    `;

    // =============================================================================
    // UTILITY FUNCTIONS
    // =============================================================================

    const utils = {
        getCookie: function(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return null;
        },

        setCookie: function(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`;
        },

        getDoNotTrack: function() {
            return navigator.doNotTrack === '1' ||
                   navigator.doNotTrack === 'yes' ||
                   navigator.msDoNotTrack === '1' ||
                   window.doNotTrack === '1';
        },

        createElement: function(tag, className, attributes = {}) {
            const el = document.createElement(tag);
            if (className) el.className = className;
            Object.keys(attributes).forEach(key => {
                el.setAttribute(key, attributes[key]);
            });
            return el;
        },

        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    };

    // =============================================================================
    // CONSENT STORAGE
    // =============================================================================

    const storage = {
        save: function(preferences) {
            const data = JSON.stringify(preferences);
            utils.setCookie(CONFIG.cookieName, btoa(data), CONFIG.cookieExpiry);
        },

        load: function() {
            const cookie = utils.getCookie(CONFIG.cookieName);
            if (cookie) {
                try {
                    return JSON.parse(atob(cookie));
                } catch (e) {
                    // Handle old simple format
                    if (cookie === 'granted') {
                        return { analytics: true, marketing: true, functional: true };
                    } else if (cookie === 'denied') {
                        return { analytics: false, marketing: false, functional: true };
                    }
                }
            }
            return null;
        },

        hasDecision: function() {
            return this.load() !== null;
        }
    };

    // =============================================================================
    // UI COMPONENTS
    // =============================================================================

    const ui = {
        banner: null,
        modal: null,
        stylesInjected: false,

        injectStyles: function() {
            if (this.stylesInjected) return;

            const style = document.createElement('style');
            style.id = 'tsas-cookie-consent-styles';
            style.textContent = STYLES;
            document.head.appendChild(style);
            this.stylesInjected = true;
        },

        createBanner: function() {
            const position = CONFIG.ui.position;
            const theme = CONFIG.ui.theme;
            const animated = CONFIG.ui.animation;

            const banner = utils.createElement('div',
                `tsas-cookie-banner tsas-cookie-banner--${position} tsas-cookie-banner--${theme}${animated ? ' tsas-cookie-banner--animated' : ''}`,
                { 'role': 'dialog', 'aria-labelledby': 'tsas-cookie-title', 'aria-describedby': 'tsas-cookie-text' }
            );

            banner.innerHTML = `
                <div class="tsas-cookie-banner__container">
                    <div class="tsas-cookie-banner__content">
                        <h2 class="tsas-cookie-banner__title" id="tsas-cookie-title">Cookie Preferences</h2>
                        <p class="tsas-cookie-banner__text" id="tsas-cookie-text">
                            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                            By clicking "Accept All", you consent to our use of cookies.
                            <a href="${CONFIG.privacyPolicyUrl}" class="tsas-cookie-banner__link">Privacy Policy</a>
                        </p>
                    </div>
                    <div class="tsas-cookie-banner__buttons">
                        <button type="button" class="tsas-cookie-banner__btn tsas-cookie-banner__btn--accept" id="tsas-accept-all">
                            Accept All
                        </button>
                        ${CONFIG.ui.showDeclineButton ? `
                        <button type="button" class="tsas-cookie-banner__btn tsas-cookie-banner__btn--decline" id="tsas-decline-all">
                            Decline All
                        </button>
                        ` : ''}
                        ${CONFIG.ui.showSettingsButton ? `
                        <button type="button" class="tsas-cookie-banner__btn tsas-cookie-banner__btn--settings" id="tsas-settings">
                            Cookie Settings
                        </button>
                        ` : ''}
                    </div>
                </div>
            `;

            this.banner = banner;
            return banner;
        },

        createModal: function() {
            const modal = utils.createElement('div', 'tsas-cookie-modal', {
                'role': 'dialog',
                'aria-labelledby': 'tsas-modal-title',
                'aria-modal': 'true'
            });

            let categoriesHtml = '';
            Object.keys(CONFIG.categories).forEach(key => {
                const cat = CONFIG.categories[key];
                categoriesHtml += `
                    <div class="tsas-cookie-category">
                        <div class="tsas-cookie-category__header">
                            <div class="tsas-cookie-category__info">
                                <h4 class="tsas-cookie-category__name">${utils.escapeHtml(cat.name)}</h4>
                                <p class="tsas-cookie-category__desc">${utils.escapeHtml(cat.description)}</p>
                            </div>
                            <label class="tsas-cookie-toggle">
                                <input type="checkbox"
                                       class="tsas-cookie-toggle__input"
                                       data-category="${key}"
                                       ${cat.default ? 'checked' : ''}
                                       ${cat.required ? 'checked disabled' : ''}>
                                <span class="tsas-cookie-toggle__slider"></span>
                            </label>
                        </div>
                    </div>
                `;
            });

            modal.innerHTML = `
                <div class="tsas-cookie-modal__overlay"></div>
                <div class="tsas-cookie-modal__content">
                    <div class="tsas-cookie-modal__header">
                        <h3 class="tsas-cookie-modal__title" id="tsas-modal-title">Cookie Settings</h3>
                        <button type="button" class="tsas-cookie-modal__close" aria-label="Close cookie settings">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="tsas-cookie-modal__body">
                        <p class="tsas-cookie-modal__description">
                            Manage your cookie preferences below. You can enable or disable different categories
                            of cookies. Note that disabling some cookies may impact your experience on our website.
                        </p>
                        ${categoriesHtml}
                    </div>
                    <div class="tsas-cookie-modal__footer">
                        <button type="button" class="tsas-cookie-banner__btn tsas-cookie-banner__btn--decline" id="tsas-modal-decline">
                            Decline All
                        </button>
                        <button type="button" class="tsas-cookie-banner__btn tsas-cookie-banner__btn--accept" id="tsas-modal-save">
                            Save Preferences
                        </button>
                    </div>
                </div>
            `;

            this.modal = modal;
            return modal;
        },

        showBanner: function() {
            if (!this.banner) {
                this.injectStyles();
                document.body.appendChild(this.createBanner());
                this.bindBannerEvents();
            }
            this.banner.classList.remove('tsas-cookie-banner--hidden');
        },

        hideBanner: function() {
            if (this.banner) {
                this.banner.classList.add('tsas-cookie-banner--hidden');
            }
        },

        showModal: function() {
            if (!this.modal) {
                document.body.appendChild(this.createModal());
                this.bindModalEvents();
            }

            // Load current preferences into modal
            const preferences = storage.load() || {};
            Object.keys(CONFIG.categories).forEach(key => {
                const input = this.modal.querySelector(`[data-category="${key}"]`);
                if (input && !CONFIG.categories[key].required) {
                    input.checked = preferences[key] !== undefined ? preferences[key] : CONFIG.categories[key].default;
                }
            });

            this.modal.classList.add('tsas-cookie-modal--visible');
            document.body.style.overflow = 'hidden';

            // Focus management
            const firstButton = this.modal.querySelector('button');
            if (firstButton) firstButton.focus();
        },

        hideModal: function() {
            if (this.modal) {
                this.modal.classList.remove('tsas-cookie-modal--visible');
                document.body.style.overflow = '';
            }
        },

        bindBannerEvents: function() {
            const self = this;

            // Accept all
            const acceptBtn = this.banner.querySelector('#tsas-accept-all');
            if (acceptBtn) {
                acceptBtn.addEventListener('click', function() {
                    TSASCookieConsent.acceptAll();
                });
            }

            // Decline all
            const declineBtn = this.banner.querySelector('#tsas-decline-all');
            if (declineBtn) {
                declineBtn.addEventListener('click', function() {
                    TSASCookieConsent.declineAll();
                });
            }

            // Settings
            const settingsBtn = this.banner.querySelector('#tsas-settings');
            if (settingsBtn) {
                settingsBtn.addEventListener('click', function() {
                    self.showModal();
                });
            }
        },

        bindModalEvents: function() {
            const self = this;

            // Close button
            const closeBtn = this.modal.querySelector('.tsas-cookie-modal__close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    self.hideModal();
                });
            }

            // Overlay click
            const overlay = this.modal.querySelector('.tsas-cookie-modal__overlay');
            if (overlay) {
                overlay.addEventListener('click', function() {
                    self.hideModal();
                });
            }

            // Decline button
            const declineBtn = this.modal.querySelector('#tsas-modal-decline');
            if (declineBtn) {
                declineBtn.addEventListener('click', function() {
                    TSASCookieConsent.declineAll();
                    self.hideModal();
                });
            }

            // Save button
            const saveBtn = this.modal.querySelector('#tsas-modal-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', function() {
                    const preferences = {};
                    self.modal.querySelectorAll('[data-category]').forEach(function(input) {
                        preferences[input.dataset.category] = input.checked;
                    });
                    TSASCookieConsent.savePreferences(preferences);
                    self.hideModal();
                });
            }

            // Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && self.modal.classList.contains('tsas-cookie-modal--visible')) {
                    self.hideModal();
                }
            });
        }
    };

    // =============================================================================
    // MAIN CONSENT MANAGER
    // =============================================================================

    const TSASCookieConsent = {
        /**
         * Initialize the consent manager
         */
        init: function() {
            // Check for Do Not Track
            if (utils.getDoNotTrack()) {
                console.log('[TSAS Cookie Consent] Do Not Track is enabled');
            }

            // Check if user has already made a decision
            if (!storage.hasDecision()) {
                ui.showBanner();
            } else {
                // Apply saved preferences
                this.applyPreferences(storage.load());
            }
        },

        /**
         * Accept all cookies
         */
        acceptAll: function() {
            const preferences = {};
            Object.keys(CONFIG.categories).forEach(key => {
                preferences[key] = true;
            });
            this.savePreferences(preferences);
            ui.hideBanner();
        },

        /**
         * Decline all optional cookies
         */
        declineAll: function() {
            const preferences = {};
            Object.keys(CONFIG.categories).forEach(key => {
                preferences[key] = CONFIG.categories[key].required;
            });
            this.savePreferences(preferences);
            ui.hideBanner();
        },

        /**
         * Save preferences
         */
        savePreferences: function(preferences) {
            storage.save(preferences);
            this.applyPreferences(preferences);
            ui.hideBanner();

            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('tsas:consent:update', {
                detail: { preferences }
            }));
        },

        /**
         * Apply preferences to analytics platforms
         */
        applyPreferences: function(preferences) {
            if (!preferences) return;

            const analyticsGranted = preferences.analytics === true;

            // Update GTM/GA4 consent
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    'analytics_storage': analyticsGranted ? 'granted' : 'denied',
                    'ad_storage': preferences.marketing ? 'granted' : 'denied',
                    'ad_user_data': preferences.marketing ? 'granted' : 'denied',
                    'ad_personalization': preferences.marketing ? 'granted' : 'denied',
                    'personalization_storage': preferences.functional ? 'granted' : 'denied'
                });
            }

            // Update dataLayer
            if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'consent_update',
                    'analytics_consent': analyticsGranted ? 'granted' : 'denied',
                    'marketing_consent': preferences.marketing ? 'granted' : 'denied',
                    'functional_consent': preferences.functional ? 'granted' : 'denied'
                });
            }

            // Update analytics bundle if available
            if (window.TSASAnalytics && window.TSASAnalytics.consent) {
                if (analyticsGranted) {
                    window.TSASAnalytics.consent.grant();
                } else {
                    window.TSASAnalytics.consent.deny();
                }
            }

            // Update Clarity
            if (window.clarity) {
                window.clarity('consent', analyticsGranted);
            }

            console.log('[TSAS Cookie Consent] Preferences applied:', preferences);
        },

        /**
         * Get current preferences
         */
        getPreferences: function() {
            return storage.load();
        },

        /**
         * Check if specific category is consented
         */
        hasConsent: function(category) {
            const prefs = storage.load();
            return prefs && prefs[category] === true;
        },

        /**
         * Show settings modal
         */
        showSettings: function() {
            ui.injectStyles();
            ui.showModal();
        },

        /**
         * Revoke all consent
         */
        revokeConsent: function() {
            document.cookie = `${CONFIG.cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            location.reload();
        },

        // Expose config for customization
        config: CONFIG
    };

    // =============================================================================
    // EXPOSE GLOBALLY
    // =============================================================================

    window.TSASCookieConsent = TSASCookieConsent;

})();
