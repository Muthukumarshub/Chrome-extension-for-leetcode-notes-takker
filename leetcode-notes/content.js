(function() {
    function getProblemTitle() {
        // Try to get the problem title using a specific selector
        let titleElement = document.querySelector("h1[class*='title']"); // Adjust the selector as per the title element
        return titleElement ? titleElement.innerText.trim() : null;
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "getProblemTitle") {
            sendResponse({ title: getProblemTitle() }); // Send only the title
        }
    });
})();
