// Redirect Prevent — Testing page logic (English)
// Each button triggers a different type of redirect or popup for testing the extension

document.addEventListener('DOMContentLoaded', () => {
  // Redirect using location.href
  const go = url => () => { location.href = url; };
  // Redirect using location.assign
  const assign = url => () => { location.assign(url); };
  // Redirect using location.replace
  const replace = url => () => { location.replace(url); };
  // Open a new tab/window
  const open = url => () => { window.open(url); };
  // Trigger a meta refresh redirect
  const metaRefresh = url => () => {
    const m = document.createElement('meta');
    m.httpEquiv = 'refresh';
    m.content = '0;url=' + url;
    document.head.appendChild(m);
  };

  document.getElementById('btn-href').addEventListener('click', go('https://example.com'));
  document.getElementById('btn-assign').addEventListener('click', assign('https://example.com'));
  document.getElementById('btn-replace').addEventListener('click', replace('https://example.com'));
  document.getElementById('btn-open').addEventListener('click', open('https://example.com'));
  document.getElementById('btn-meta').addEventListener('click', metaRefresh('https://example.com'));
});
