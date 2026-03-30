document.addEventListener('DOMContentLoaded', () => {
  const go = url => () => { location.href = url; };
  const assign = url => () => { location.assign(url); };
  const replace = url => () => { location.replace(url); };
  const open = url => () => { window.open(url); };
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
