
# Redirect Prevent (Chrome Extension)

**Redirect Prevent** is a Chrome extension that helps you block unwanted client-side redirects and popups on web pages. When a redirect or popup is detected, you’ll be asked to confirm before leaving the current page.

## Features
- Detects and blocks most JavaScript/HTML-based redirects and popups
- Asks for confirmation before redirecting
- Simple, user-friendly interface
- Works automatically on all websites
- Exclusion list for trusted sites

## Limitations
> **Note:** This extension only prevents client-side (JavaScript or HTML) redirects and popups. It cannot block server-side (HTTP) redirects (e.g., 301, 302, 307).

## Installation
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable “Developer mode” (top right)
4. Click “Load unpacked” and select the extension folder

## Usage
The extension works automatically after installation. When a redirect or popup is detected, you’ll see a confirmation dialog. You can allow or block the action.

To test all supported redirect types, use the [Testing Page](https://karpulix.github.io/redirect-prevent-chrome/testing.html).

## Project Structure
```
redirect-prevent-chrome/
├── manifest.json
├── content.js
├── background.js
├── popup.html
├── popup.js
├── icons/
└── ...
```

## License
MIT
