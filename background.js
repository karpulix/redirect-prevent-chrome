// Background script
chrome.runtime.onInstalled.addListener(() => {
    console.log('Redirect Prevent extension installed');
});

// Inject code when page is loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
                window.onbeforeunload = function() {
                    return 'Redirect detected. Leave page?';
                };
            }
        });
    }
});

// Also allow manual injection by clicking the extension icon
chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.startsWith('http')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                window.onbeforeunload = function() {
                    return 'Redirect detected. Leave page?';
                };
            }
        });
    }
}); 