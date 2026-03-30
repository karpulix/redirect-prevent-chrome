document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('url-input');
  const addBtn = document.getElementById('add-btn');
  const list = document.getElementById('list');
  const errorEl = document.getElementById('error');

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.style.display = msg ? 'block' : 'none';
  }

  function render(exceptions) {
    list.innerHTML = '';
    if (exceptions.length === 0) {
      list.innerHTML = '<li class="empty">No exceptions added yet.</li>';
      return;
    }
    for (const url of exceptions) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.className = 'url';
      span.textContent = url;
      const btn = document.createElement('button');
      btn.className = 'remove';
      btn.textContent = '\u00D7';
      btn.addEventListener('click', () => removeException(url));
      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    }
  }

  function load() {
    chrome.storage.local.get({ exceptions: [] }, (data) => {
      render(data.exceptions);
    });
  }

  function addException() {
    let url = input.value.trim();
    if (!url) return;

    // Normalize: strip protocol and trailing slash
    url = url.replace(/^https?:\/\//, '').replace(/\/+$/, '');

    chrome.storage.local.get({ exceptions: [] }, (data) => {
      const exceptions = data.exceptions;
      if (exceptions.includes(url)) {
        showError('This pattern is already in the list.');
        return;
      }
      showError('');
      exceptions.push(url);
      chrome.storage.local.set({ exceptions }, () => {
        input.value = '';
        render(exceptions);
      });
    });
  }

  function removeException(url) {
    chrome.storage.local.get({ exceptions: [] }, (data) => {
      const exceptions = data.exceptions.filter((u) => u !== url);
      chrome.storage.local.set({ exceptions }, () => {
        render(exceptions);
      });
    });
  }

  addBtn.addEventListener('click', addException);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addException();
  });

  load();
});
