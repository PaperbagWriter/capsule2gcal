chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse){
            if (request.action == "getDOM")
                sendResponse({dom: $("body")});
              else
                sendResponse({});

        });