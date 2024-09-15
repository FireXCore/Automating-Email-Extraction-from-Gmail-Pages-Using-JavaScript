Tutorial: Step-by-Step Guide to Extract Emails from Gmail Pages with JavaScript

Introduction:

In this tutorial, we will walk through a JavaScript script designed to automatically extract email addresses from multiple Gmail pages and save them in a JSON file. This script navigates through Gmail's inbox pages, collects any email addresses found, and continues to the next page until no more emails are detected. It includes automatic page transitions and a download feature to store the collected emails locally.
Steps:
1. Understanding the Key Functions:

    extractEmailsFromCurrentPage(): This function extracts emails from the text content of the current page using a regular expression (emailRegex). The emails are stored in an array and duplicates are removed.

    goToNextPageAndExtractEmails(currentPage): This function automates the process of moving from one Gmail inbox page to the next. It changes the URL by incrementing the page number and sets a delay for page load before extracting emails from the new page.

    saveEmails(): Once all emails are collected, this function creates a JSON file with the extracted emails and triggers a download in the browser.

2. Email Extraction Process:

The script uses regular expressions to detect and collect any email addresses found in the visible text of the page (document.body.innerText). It removes duplicate email addresses by converting the result into a Set and then back into an array.
3. Navigating Through Gmail Pages:

The goToNextPageAndExtractEmails function handles the navigation to the next page by modifying the URL structure for Gmail’s inbox pages. The script uses a 5-second delay (setTimeout) to allow the next page to fully load before attempting to extract emails.
4. Saving the Emails:

After the process completes (either because no more emails were found or you reach a stopping point), the saveEmails function saves the collected email addresses as a JSON file. This function creates a Blob and uses a dynamically generated link to download the file directly to your system.
How It Works:

    Start from the first inbox page: The script begins by calling the goToNextPageAndExtractEmails(1) function, starting from page 1.
    Extract and Save: On each page, email addresses are extracted and saved into a global array (allEmails).
    Navigate Automatically: The script automatically moves to the next page and repeats the process.
    Download Results: When no more emails are found, the collected data is saved as emails.json and downloaded.

Example Use Case:

You can use this script when you need to gather email addresses from your Gmail inbox for analysis or for maintaining a contact list. However, please ensure you comply with privacy and legal guidelines when extracting and using email data.
