// ==UserScript==
// @name         Gmail Inbox Email Extractor
// @namespace    https://github.com/FireXCore
// @version      1.1.0
// @description  Automatically extracts unique email addresses from multiple Gmail inbox pages with robust navigation and persistence.
// @author       FireXCore
// @match        https://mail.google.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_download
// @run-at       document-end
// ==/UserScript==

(async function () {
    'use strict';

    const CONFIG = {
        STORAGE_KEY: 'gmail_extracted_emails',
        MAX_PAGES: 100,                    // Safety limit
        WAIT_FOR_CONTENT_MS: 800,
        NAVIGATION_DELAY_MS: 1500,
        MAX_WAIT_ATTEMPTS: 25
    };

    const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;

    // Persistent storage using Set for deduplication
    let allEmails = new Set(GM_getValue(CONFIG.STORAGE_KEY, []));

    function log(message, type = 'info') {
        const styles = {
            info: 'color: #00aaff',
            success: 'color: #00cc66',
            warning: 'color: #ffaa00',
            error: 'color: #ff4444'
        };
        console.log(`%c[Gmail Extractor] ${message}`, styles[type] || '');
    }

    function extractEmailsFromPage() {
        try {
            const bodyText = document.body.innerText || '';
            const matches = bodyText.match(emailRegex) || [];
            return matches;
        } catch (error) {
            log(`Extraction error: ${error.message}`, 'error');
            return [];
        }
    }

    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function waitForContent() {
        log('Waiting for page content to load...');
        
        for (let i = 0; i < CONFIG.MAX_WAIT_ATTEMPTS; i++) {
            const mainContent = document.querySelector('[role="main"]');
            const textLength = document.body.innerText.length;

            if (mainContent || textLength > 800) {
                await delay(CONFIG.WAIT_FOR_CONTENT_MS);
                log('Page content loaded successfully', 'success');
                return true;
            }

            await delay(400);
        }
        
        log('Warning: Content wait timeout reached', 'warning');
        return false;
    }

    function getCurrentPageNumber() {
        const match = window.location.href.match(/\/p(\d+)/);
        return match ? parseInt(match[1], 10) : 1;
    }

    async function goToPage(pageNumber) {
        const url = `https://mail.google.com/mail/u/2/#section_query/in%3Ainbox/p${pageNumber}`;
        log(`Navigating to page ${pageNumber}...`);
        window.location.href = url;
    }

    async function processCurrentPage(currentPage) {
        log(`Processing page ${currentPage}`, 'info');

        await waitForContent();

        const newEmails = extractEmailsFromPage();
        let addedCount = 0;

        for (const email of newEmails) {
            if (!allEmails.has(email)) {
                allEmails.add(email);
                addedCount++;
            }
        }

        log(`Added ${addedCount} new emails | Total unique: ${allEmails.size}`, 'success');

        // Save progress
        GM_setValue(CONFIG.STORAGE_KEY, Array.from(allEmails));

        // Stopping conditions
        if (currentPage >= CONFIG.MAX_PAGES) {
            log(`Reached maximum page limit (${CONFIG.MAX_PAGES})`, 'warning');
            saveAndFinish();
            return;
        }

        if (newEmails.length === 0) {
            log('No emails found on this page. Finishing extraction.', 'success');
            saveAndFinish();
            return;
        }

        // Continue to next page
        setTimeout(() => {
            goToPage(currentPage + 1);
        }, CONFIG.NAVIGATION_DELAY_MS);
    }

    function saveAndFinish() {
        const emailsArray = Array.from(allEmails).sort();
        
        const jsonContent = JSON.stringify(emailsArray, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const timestamp = new Date().toISOString().slice(0, 10);

        GM_download({
            url: URL.createObjectURL(blob),
            name: `gmail_emails_${timestamp}.json`,
            saveAs: true
        });

        log(`✅ Extraction completed! Saved ${emailsArray.length} unique emails.`, 'success');
        
        // Optional: Clear storage after successful download
        // GM_setValue(CONFIG.STORAGE_KEY, []);
    }

    // ====================== MAIN EXECUTION ======================
    function main() {
        if (!window.location.href.includes('mail.google.com')) {
            log('Please run this script on Gmail.', 'warning');
            return;
        }

        const currentPage = getCurrentPageNumber();

        log(`🚀 Gmail Email Extractor started - Page ${currentPage}`, 'success');

        // Reset storage only on first page
        if (currentPage === 1) {
            allEmails.clear();
            GM_setValue(CONFIG.STORAGE_KEY, []);
            log('Starting fresh extraction from page 1');
        }

        processCurrentPage(currentPage);
    }

    // Start the script
    main();

})();