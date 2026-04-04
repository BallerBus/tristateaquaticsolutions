/**
 * Tri-State Aquatic Solutions — AI Chat Widget
 * Vanilla JS, zero dependencies.
 *
 * Floating chat bubble → opens chat window → posts to /api/chat
 * Proactive greeting after 4 seconds.
 * Listens for CustomEvent("open-chat") for CTA button integration.
 */
(function () {
  'use strict';

  // ---- Config ----
  var API_URL = '/api/chat';
  var GREETING_DELAY = 4000;   // ms before proactive greeting
  var GREETING_HIDE = 14000;   // ms total before greeting auto-hides
  var INITIAL_MESSAGE = "Hey! Spring pool openings are booking up fast. What can we help you with?";

  var GREETINGS = [
    "Spring slots are filling up. Is your pool opening scheduled yet?",
    "Pool season is almost here. Need help getting your pool ready?",
    "Hey! We're booking pool openings now. Spots go fast once it warms up."
  ];

  // ---- State ----
  var messages = [];
  var isOpen = false;
  var isSending = false;
  var greetingText = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  var greetingTimer = null;
  var greetingHideTimer = null;

  // ---- SVG Icons ----
  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
  var ICON_POOL = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64v2zM22 16.5c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64v2zM22 12c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64V6c0-1.1.9-2 2-2h2v2h-2v2h2v2h-2v2c.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64v2zM10 6V4h2v2h-2zm0 4V8h2v2h-2zm0 2c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36v-2c1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36V6c0-1.1.9-2 2-2h2v2h-2v2h2v2h-2v2z"/></svg>';

  // ---- Build DOM ----
  function buildWidget() {
    var container = document.createElement('div');
    container.className = 'tsas-chat-container';
    container.id = 'tsas-chat';

    // Greeting bubble
    var greetingEl = document.createElement('div');
    greetingEl.className = 'tsas-chat-greeting tsas-hidden';
    greetingEl.id = 'tsas-greeting';
    greetingEl.textContent = greetingText;
    greetingEl.addEventListener('click', function () {
      openChat();
    });
    container.appendChild(greetingEl);

    // Chat window
    var windowEl = document.createElement('div');
    windowEl.className = 'tsas-chat-window tsas-hidden';
    windowEl.id = 'tsas-window';
    windowEl.innerHTML = buildWindowHTML();
    container.appendChild(windowEl);

    // FAB button
    var fab = document.createElement('button');
    fab.className = 'tsas-chat-fab';
    fab.id = 'tsas-fab';
    fab.setAttribute('aria-label', 'Chat with us');
    fab.innerHTML = ICON_CHAT + '<span class="tsas-chat-fab-badge tsas-hidden" id="tsas-badge"></span>';
    fab.addEventListener('click', function () {
      if (isOpen) {
        closeChat();
      } else {
        openChat();
      }
    });
    container.appendChild(fab);

    document.body.appendChild(container);

    // Wire up events after DOM is ready
    wireEvents();
  }

  function buildWindowHTML() {
    return '' +
      '<div class="tsas-chat-header">' +
        '<div class="tsas-chat-header-icon">' + ICON_POOL + '</div>' +
        '<div class="tsas-chat-header-text">' +
          '<p class="tsas-chat-header-title">Tri-State Aquatic Solutions</p>' +
          '<p class="tsas-chat-header-subtitle">Chat with us about pool services</p>' +
        '</div>' +
        '<button class="tsas-chat-close" id="tsas-close-btn" aria-label="Close chat">' + ICON_CLOSE + '</button>' +
      '</div>' +
      '<div class="tsas-chat-messages" id="tsas-messages"></div>' +
      '<form class="tsas-chat-input-area" id="tsas-form">' +
        '<input class="tsas-chat-input" id="tsas-input" type="text" placeholder="Ask about pool services..." autocomplete="off" />' +
        '<button class="tsas-chat-send" id="tsas-send-btn" type="submit" aria-label="Send message" disabled>' + ICON_SEND + '</button>' +
      '</form>';
  }

  function wireEvents() {
    var closeBtn = document.getElementById('tsas-close-btn');
    var form = document.getElementById('tsas-form');
    var input = document.getElementById('tsas-input');
    var sendBtn = document.getElementById('tsas-send-btn');

    closeBtn.addEventListener('click', function () {
      closeChat();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sendMessage();
    });

    input.addEventListener('input', function () {
      sendBtn.disabled = !input.value.trim() || isSending;
    });
  }

  // ---- Open / Close ----
  function openChat(context) {
    isOpen = true;
    hideGreeting();

    var windowEl = document.getElementById('tsas-window');
    var fab = document.getElementById('tsas-fab');
    var badge = document.getElementById('tsas-badge');
    var input = document.getElementById('tsas-input');

    windowEl.classList.remove('tsas-hidden');
    fab.classList.add('tsas-chat-fab--active');
    fab.innerHTML = ICON_CLOSE;
    badge.classList.add('tsas-hidden');

    if (messages.length === 0) {
      if (context === 'quote') {
        addBotMessage("Let's get you a quote. What service do you need -- pool opening, weekly cleaning, or something else?");
      } else {
        addBotMessage(INITIAL_MESSAGE);
      }
    }

    setTimeout(function () {
      input.focus();
    }, 100);

    scrollToBottom();
  }

  function closeChat() {
    isOpen = false;
    var windowEl = document.getElementById('tsas-window');
    var fab = document.getElementById('tsas-fab');

    windowEl.classList.add('tsas-hidden');
    fab.classList.remove('tsas-chat-fab--active');
    fab.innerHTML = ICON_CHAT + '<span class="tsas-chat-fab-badge tsas-hidden" id="tsas-badge"></span>';
  }

  // ---- Greeting ----
  function showGreeting() {
    if (isOpen) return;
    var el = document.getElementById('tsas-greeting');
    var badge = document.getElementById('tsas-badge');
    if (el) el.classList.remove('tsas-hidden');
    if (badge) badge.classList.remove('tsas-hidden');
  }

  function hideGreeting() {
    var el = document.getElementById('tsas-greeting');
    if (el) el.classList.add('tsas-hidden');
    if (greetingTimer) clearTimeout(greetingTimer);
    if (greetingHideTimer) clearTimeout(greetingHideTimer);
  }

  // ---- Messages ----
  function addBotMessage(text) {
    messages.push({ role: 'assistant', content: text });
    renderMessage('assistant', text);
    scrollToBottom();
  }

  function addUserMessage(text) {
    messages.push({ role: 'user', content: text });
    renderMessage('user', text);
    scrollToBottom();
  }

  function renderMessage(role, text) {
    var container = document.getElementById('tsas-messages');
    var row = document.createElement('div');
    row.className = 'tsas-msg-row ' + (role === 'user' ? 'tsas-msg-user' : 'tsas-msg-bot');

    var html = '';
    if (role === 'assistant') {
      html += '<div class="tsas-msg-avatar">' + ICON_POOL + '</div>';
    }
    html += '<div class="tsas-msg-bubble">' + escapeHTML(text) + '</div>';
    row.innerHTML = html;
    container.appendChild(row);
  }

  function showTyping() {
    var container = document.getElementById('tsas-messages');
    var row = document.createElement('div');
    row.className = 'tsas-typing-row';
    row.id = 'tsas-typing';
    row.innerHTML =
      '<div class="tsas-msg-avatar">' + ICON_POOL + '</div>' +
      '<div class="tsas-typing-dots">' +
        '<span class="tsas-typing-dot"></span>' +
        '<span class="tsas-typing-dot"></span>' +
        '<span class="tsas-typing-dot"></span>' +
      '</div>';
    container.appendChild(row);
    scrollToBottom();
  }

  function hideTyping() {
    var el = document.getElementById('tsas-typing');
    if (el) el.remove();
  }

  function scrollToBottom() {
    var container = document.getElementById('tsas-messages');
    if (container) {
      setTimeout(function () {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
  }

  // ---- Send Message ----
  function sendMessage() {
    var input = document.getElementById('tsas-input');
    var sendBtn = document.getElementById('tsas-send-btn');
    var text = input.value.trim();
    if (!text || isSending) return;

    addUserMessage(text);
    input.value = '';
    sendBtn.disabled = true;
    isSending = true;

    showTyping();

    var payload = {
      messages: messages.map(function (m) {
        return { role: m.role, content: m.content };
      })
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        hideTyping();
        addBotMessage(data.message || 'Something went wrong. Call us at (302) 496-6367.');
        isSending = false;
        sendBtn.disabled = !input.value.trim();
      })
      .catch(function () {
        hideTyping();
        addBotMessage('Something went wrong on our end. Call or text us at (302) 496-6367 and we\'ll take care of you.');
        isSending = false;
        sendBtn.disabled = !input.value.trim();
      });
  }

  // ---- Utilities ----
  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---- External Event: open-chat ----
  window.addEventListener('open-chat', function (e) {
    var context = e.detail && e.detail.context;
    if (context === 'quote') {
      // Reset messages for a fresh quote conversation
      messages = [];
      var container = document.getElementById('tsas-messages');
      if (container) container.innerHTML = '';
    }
    openChat(context || null);
  });

  // ---- Init ----
  function init() {
    buildWidget();

    // Proactive greeting after delay
    greetingTimer = setTimeout(function () {
      showGreeting();
    }, GREETING_DELAY);

    greetingHideTimer = setTimeout(function () {
      hideGreeting();
    }, GREETING_HIDE);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
