let allEmails = [];

function extractEmailsFromCurrentPage() {
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
        const bodyText = document.body.innerText || '';
        const emails = bodyText.match(emailRegex);
        return emails ? [...new Set(emails)] : [];
    } catch (error) {
        console.error('Error extracting emails from page:', error);
        return [];
    }
}

function goToNextPageAndExtractEmails(currentPage) {
    try {
        const nextPage = currentPage + 1;
        const newUrl = `https://mail.google.com/mail/u/2/#section_query/in%3Ainbox/p${nextPage}`;
        window.location.href = newUrl;

        // Use MutationObserver to detect when the page content has loaded
        const observer = new MutationObserver((mutations, obs) => {
            if (document.body.innerText) {
                try {
                    const emails = extractEmailsFromCurrentPage();
                    
                    if (emails.length === 0) {
                        console.log('No emails found. Process stopped.');
                        saveEmails();
                        obs.disconnect();
                        return;
                    }

                    allEmails = allEmails.concat(emails);
                    console.log(`Emails from page ${nextPage}:`, emails);
                    
                    // Continue to the next page
                    goToNextPageAndExtractEmails(nextPage);
                    obs.disconnect();
                } catch (error) {
                    console.error('Error processing page:', error);
                    saveEmails();
                    obs.disconnect();
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

    } catch (error) {
        console.error('Error navigating to next page:', error);
        saveEmails();
    }
}

function saveEmails() {
    try {
        const jsonEmails = JSON.stringify(allEmails, null, 2);
        const blob = new Blob([jsonEmails], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'emails.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error saving emails:', error);
    }
}

// Start from the first page (p1)
try {
    goToNextPageAndExtractEmails(1);
} catch (error) {
    console.error('Error starting email extraction:', error);
    saveEmails();
}
