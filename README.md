# LeetCode Notes Taker Chrome Extension

A Chrome extension designed for LeetCode users to easily take and store notes for each problem they solve. The extension automatically links notes to individual problems and displays them whenever the problem is revisited, making it easier to keep track of solutions, optimizations, and approaches.

## Features

- **Problem-Specific Notes**: Each LeetCode problem has its own unique note that is saved and displayed when revisiting the problem.
- **Easy Note Editing**: Add, edit, or delete notes directly through the extension's interface.
- **Persistent Storage**: Notes are stored locally and persist even after browser restarts or page refreshes.
- **User-Friendly Interface**: A simple and intuitive UI to view and manage your notes.

## Installation

### From the Chrome Web Store
1. Search for "LeetCode Notes Taker" on the [Chrome Web Store](link-to-extension).
2. Click **Add to Chrome** and follow the prompts to install.

### Manual Installation
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/muthukumarshub/leetcode-notes-taker.git
    ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click on **Load unpacked** and select the folder where the extension files are located.

## Usage

1. Open any LeetCode problem.
2. Click on the extension icon in the Chrome toolbar.
3. A text box will appear where you can add or view your notes.
4. Your notes are automatically saved and displayed whenever you visit the same problem again.

## Code

### `manifest.json`

This file contains the basic metadata and permissions needed for the extension.

```json
{
  "manifest_version": 3,
  "name": "LeetCode Notes Taker",
  "description": "Take and store notes for each LeetCode problem.",
  "version": "1.0",
  "permissions": ["storage", "activeTab"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["https://leetcode.com/problems/*"],
      "js": ["content.js"]
    }
  ]
}
