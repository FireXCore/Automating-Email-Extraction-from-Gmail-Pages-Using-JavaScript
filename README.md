# Extract Emails from Gmail Inbox Pages

[![GitHub stars](https://img.shields.io/github/stars/FireXCore/Automating-Email-Extraction-from-Gmail-Pages-Using-JavaScript)](https://github.com/FireXCore/Automating-Email-Extraction-from-Gmail-Pages-Using-JavaScript/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust JavaScript userscript to automatically extract email addresses from multiple pages of your Gmail inbox.

---

## Overview

This tool automates the extraction of email addresses from Gmail inbox pages by navigating through paginated results, collecting unique emails, and exporting them as a clean JSON file.

**Important**: This is a client-side browser script intended for personal use. Always respect Gmail's Terms of Service and applicable privacy laws (GDPR, CCPA, etc.).

---

## Key Features

- **Smart Page Navigation** – Automatically moves between Gmail pages (`/p1`, `/p2`, ...)
- **Deduplication** – Uses a `Set` to ensure only unique emails are kept
- **Improved Email Regex** – More reliable pattern with word boundaries
- **Persistent State** – Uses Tampermonkey `GM_*` storage (recommended) or fallback
- **Robust Waiting Logic** – Intelligent polling instead of fragile MutationObserver
- **Clean Export** – Sorted JSON file with timestamp
- **Comprehensive Logging** – Clear console output with progress indicators
- **Safety Limits** – Configurable max pages to prevent infinite loops

---

## Installation & Usage

### Recommended: Tampermonkey (Best Experience)

1. Install [Tampermonkey](https://www.tampermonkey.net/) extension
2. Create a new script and paste the content of `script.js`
3. Save and enable the script
4. Go to your Gmail inbox (`https://mail.google.com`)
5. The script will start automatically

### Alternative: Browser Console

1. Open Gmail
2. Press `F12` → Console tab
3. Paste the script and press Enter

---

## How It Works

1. Extracts emails from the current page using an optimized regex
2. Saves progress using persistent storage
3. Navigates to the next page (`/pN`)
4. Repeats until no more emails are found or max pages reached
5. Downloads the final result as `gmail_emails_YYYY-MM-DD.json`

---

## Project Structure
