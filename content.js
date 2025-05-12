// Inject the redirect prevention code
window.onbeforeunload = function() {
    return 'Redirect detected. Leave page?';
}; 