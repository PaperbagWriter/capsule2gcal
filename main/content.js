chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method && (request.method === "getDOM")) {
        var html = $('body');
        sendResponse({ "htmlContent": html.html() });
    }
});