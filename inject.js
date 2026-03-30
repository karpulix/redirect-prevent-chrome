(function () {
  'use strict';

  let enabled = true;

  // Listen for toggle events from content.js (isolated world)
  window.addEventListener('__redirect_prevent_toggle__', (e) => {
    enabled = e.detail.enabled;
  });

  // --- Intercept location.href setter (most common redirect) ---
  const hrefDesc = Object.getOwnPropertyDescriptor(Location.prototype, 'href');
  if (hrefDesc && hrefDesc.set) {
    Object.defineProperty(Location.prototype, 'href', {
      get: hrefDesc.get,
      set: function (url) {
        if (enabled && !confirm('Redirect to:\n' + url + '\n\nAllow?')) {
          return;
        }
        hrefDesc.set.call(this, url);
      },
      enumerable: hrefDesc.enumerable,
      configurable: hrefDesc.configurable,
    });
  }

  // --- Intercept location.assign() ---
  const origAssign = Location.prototype.assign;
  Location.prototype.assign = function (url) {
    if (enabled && !confirm('Redirect to:\n' + url + '\n\nAllow?')) {
      return;
    }
    origAssign.call(this, url);
  };

  // --- Intercept location.replace() ---
  const origReplace = Location.prototype.replace;
  Location.prototype.replace = function (url) {
    if (enabled && !confirm('Redirect to:\n' + url + '\n\nAllow?')) {
      return;
    }
    origReplace.call(this, url);
  };

  // --- Intercept window.open() ---
  const origOpen = window.open;
  window.open = function (url, ...args) {
    if (enabled && url && !confirm('Open new window:\n' + url + '\n\nAllow?')) {
      return null;
    }
    return origOpen.call(this, url, ...args);
  };

  // --- Intercept links with target="_blank" (new window/tab) ---
  document.addEventListener('click', function (e) {
    if (!enabled) return;
    const link = e.target.closest('a[target="_blank"], a[target="_new"]');
    if (!link) return;
    const url = link.href;
    if (!url || url.startsWith('javascript:')) return;
    if (!confirm('Open in new tab:\n' + url + '\n\nAllow?')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // --- Block <meta http-equiv="refresh"> ---
  const observer = new MutationObserver((mutations) => {
    if (!enabled) return;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (
          node.nodeName === 'META' &&
          node.getAttribute &&
          node.getAttribute('http-equiv') &&
          node.getAttribute('http-equiv').toLowerCase() === 'refresh'
        ) {
          const content = node.getAttribute('content') || '';
          node.remove();
          console.log('[Redirect Prevent] Blocked meta refresh:', content);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
