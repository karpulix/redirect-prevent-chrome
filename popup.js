document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const status = document.getElementById('status');

  chrome.storage.local.get({ enabled: true }, (data) => {
    toggle.checked = data.enabled;
    updateStatus(data.enabled);
  });

  toggle.addEventListener('change', () => {
    const on = toggle.checked;
    chrome.storage.local.set({ enabled: on });
    updateStatus(on);
  });

  function updateStatus(on) {
    status.textContent = on ? 'Active' : 'Disabled';
    status.className = 'status ' + (on ? 'active' : 'inactive');
  }

  document.getElementById('exceptions-btn').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('exceptions.html') });
  });

//   const permissionsBtn = document.getElementById('permissions-btn');
//   if (permissionsBtn) {
//     // Check if permissions already granted
//     chrome.permissions.contains({permissions: ['tabs', 'notifications']}, (result) => {
//       if (result) {
//         permissionsBtn.style.display = 'none';
//       } else {
//         permissionsBtn.style.display = '';
//         permissionsBtn.addEventListener('click', () => {
//           chrome.permissions.request({
//             permissions: ['tabs', 'notifications']
//           }, (granted) => {
//             if (granted) {
//               permissionsBtn.style.display = 'none';
//               alert('Extra permissions granted!');
//             } else {
//               alert('Permissions were not granted.');
//             }
//           });
//         });
//       }
//     });
//   }
});