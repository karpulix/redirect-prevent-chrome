let enabled = false;
let exceptions = [];

function onBeforeUnload(e) {
  e.preventDefault();
  e.returnValue = '';
}

function isExcluded() {
  const host = location.hostname;
  const hostPath = host + location.pathname;

  return exceptions.some((pattern) => {
    const escaped = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');

    // Match against hostname or hostname+path, allow trailing path
    const exact = new RegExp('^' + escaped + '(/.*)?$', 'i');
    if (exact.test(host) || exact.test(hostPath)) return true;

    // Auto-subdomain: "example.com" also matches "sub.example.com"
    if (!pattern.startsWith('*')) {
      const sub = new RegExp('(^|\\.)' + escaped + '(/.*)?$', 'i');
      if (sub.test(host) || sub.test(hostPath)) return true;
    }
    return false;
  });
}

function updateProtection(on) {
  enabled = on && !isExcluded();
  if (enabled) {
    window.addEventListener('beforeunload', onBeforeUnload);
  } else {
    window.removeEventListener('beforeunload', onBeforeUnload);
  }
  window.dispatchEvent(
    new CustomEvent('__redirect_prevent_toggle__', { detail: { enabled } })
  );
}

chrome.storage.local.get({ enabled: true, exceptions: [] }, (data) => {
  exceptions = data.exceptions;
  updateProtection(data.enabled);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.exceptions) {
    exceptions = changes.exceptions.newValue || [];
  }
  chrome.storage.local.get({ enabled: true }, (data) => {
    updateProtection(changes.enabled ? changes.enabled.newValue : data.enabled);
  });
}); 