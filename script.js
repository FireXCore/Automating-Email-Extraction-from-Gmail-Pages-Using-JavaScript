// Variable to store found emails
let allEmails = [];

// Function to extract emails from the current page
function extractEmailsFromCurrentPage() {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = document.body.innerText;
    const emails = bodyText.match(emailRegex);
    return emails ? [...new Set(emails)] : [];
}

// Function to change URL to the next page and extract emails
function goToNextPageAndExtractEmails(currentPage) {
    const nextPage = currentPage + 1;
    const newUrl = `https://mail.google.com/mail/u/2/#section_query/in%3Ainbox/p${nextPage}`;

    // Change URL to the next page
    window.location.href = newUrl;

    // Wait for the new page to load and extract emails
    setTimeout(() => {
        const emails = extractEmailsFromCurrentPage();
        
        if (emails.length === 0) {
            // If no emails are found, the process stops
            console.log('No emails found. Process stopped.');
            saveEmails();
            return;
        }
        
        // Add the new emails to the list
        allEmails = allEmails.concat(emails);
        console.log(`Emails from page ${nextPage}:`, emails);

        // Continue to the next page
        goToNextPageAndExtractEmails(nextPage);
    }, 5000);  // 5-second delay to allow the new page to load
}

// Function to save emails
function saveEmails() {
    // Convert the email list to JSON format and save it as a file
    const jsonEmails = JSON.stringify(allEmails, null, 2);
    const blob = new Blob([jsonEmails], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emails.json';
    document.body.appendChild(a);
    a.click();
    
    // Remove the download link from the DOM
    document.body.removeChild(a);
}

// Start from the first page (p1)
goToNextPageAndExtractEmails(1);
