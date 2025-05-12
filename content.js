// Prevent redirects
window.onbeforeunload = function() {
    return 'Redirect detected. Leave page?';
};

// Also prevent programmatic redirects
const originalLocation = window.location;
Object.defineProperty(window, 'location', {
    get: function() {
        return originalLocation;
    },
    set: function(url) {
        if (confirm('Redirect detected. Leave page?')) {
            originalLocation.href = url;
        }
    }
}); 