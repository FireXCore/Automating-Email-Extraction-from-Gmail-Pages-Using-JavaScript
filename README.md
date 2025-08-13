# Extract Emails from Gmail Pages with JavaScript

## Overview

This repository contains an enhanced JavaScript script designed to automate the extraction of email addresses from multiple Gmail inbox pages. Ideal for data analysis or contact list creation, this tool efficiently gathers emails and saves them into a JSON file, with improved reliability and validation.

## How It Works

- **Email Extraction**: The script scans each Gmail inbox page, extracting valid email addresses using a robust regular expression, ensuring duplicates are removed.
- **Automatic Page Navigation**: It seamlessly navigates through Gmail inbox pages, continuing until no more emails are found.
- **Error Handling**: Comprehensive error handling ensures the process is robust, saving collected emails even if an error occurs.
- **Download Results**: Extracted emails are compiled into a downloadable JSON file for easy use.

## Key Features

1. **Automated Extraction**:
   - Automatically scans and collects emails starting from the first inbox page, continuing through all available pages until no emails remain.

2. **Improved Email Validation**:
   - Uses an advanced regular expression (`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`) to ensure only valid email addresses are extracted, filtering out invalid formats.

3. **Dynamic Page Navigation**:
   - Employs `MutationObserver` to detect when page content is fully loaded, eliminating fixed delays and improving efficiency.

4. **Robust Error Handling**:
   - Incorporates `try-catch` blocks to handle errors during extraction, navigation, and saving, ensuring data is preserved even in case of failures.

5. **JSON Export**:
   - Compiles all extracted emails into a JSON file, automatically downloaded for further analysis.

## Full Tutorial

For a **step-by-step guide** on how to use this script, including detailed explanations and code breakdowns, please visit [[https://firexcore.com/blog/extracting-email-gmail-javascript/](https://firexcore.com/blog/extracting-email-gmail-javascript/](https://firexcore.com/blog/extracting-emails-from-gmail-javascript/)). You'll learn how to:

- Set up the script in your browser's developer console
- Understand the key functions and their improvements
- Run the extraction process efficiently
- Handle and utilize the resulting JSON file

---

### Example Use Case

Use this script to collect email addresses from your Gmail inbox for personal or business purposes, such as contact management or data analysis. Always ensure compliance with privacy laws (e.g., GDPR) and Gmail's terms of service when extracting data.

### Important Notes

- **Execution**: Run the script in the browser's developer console while logged into Gmail.
- **Testing**: Test in a controlled environment (e.g., a non-sensitive Gmail account) to verify functionality.
- **Legal Compliance**: Ensure you have permission to extract and use email addresses, adhering to applicable privacy regulations.
