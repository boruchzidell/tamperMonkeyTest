    window.addEventListener('load', function() {
        console.log("TamperMonkey script loaded");

        // Create a button element
        const button = document.createElement('button');
        button.innerText = 'Delete Chat';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '180px';
        button.style.zIndex = '1000';
        button.style.padding = '5px 15px';
        button.style.fontSize = '16px';
        button.style.fontWeight = '600';
        button.style.backgroundColor = '#ffd1d9';
        button.style.color = 'red';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '20px';

        document.body.appendChild(button);

    // Function to get the chat ID from the URL
    function getChatIdFromUrl() {
        const urlParts = window.location.pathname.split('/');
        return urlParts[urlParts.length - 1]; // Assuming chat ID is the last part of the URL
    }


    // Function to delete the current chat
    function deleteChat(chatId) {
        GM_xmlhttpRequest({
            method: 'PATCH',
            url: `https://chatgpt.com/backend-api/conversation/${chatId}`, // Adjust URL to the correct API endpoint
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJwd2RfYXV0aF90aW1lIjoxNzM0MzY2NTM4Nzg1LCJzZXNzaW9uX2lkIjoiTE1zbWZ5bk5mQTl5UnJmaVA2ZG5RVm9kQlRLMDQ0dlEiLCJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJiZGFrdGVyK2NoYXRncHRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsicG9pZCI6Im9yZy1hZEZLNnR0b0NIdVpiVUJLZ2l2WThIMVQiLCJ1c2VyX2lkIjoidXNlci1KbkJRWFYyZ01zQ0FJMEt1eWhCdWwwdE0ifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6ImF1dGgwfDY0ZmUzY2VjMzkzZmQyZDNhNWY1NGM2MCIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MzQzNjY1MzksImV4cCI6MTczNTIzMDUzOSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb3JnYW5pemF0aW9uLndyaXRlIG9mZmxpbmVfYWNjZXNzIiwiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEcifQ.zIBXtfgBGb6I4_yOig-WtlLpPHxy1xmZnY67NOZcXsAmewR2y7vHtkc814MytHT2RTtOWVk9x_BULhbB5CtWfzOLoxro687v9SP0wAOsQdFT86nAcWGdAQ9_FwxsKYzLXR3zgsxzVAPG1gKIWoQ15GrDIgARekv9wpee99jrh2UO1HfFWTi6_WhdEFD7Vgocj96gSlWkALP_ykr9owI4zpl49XDmHad03yqFWnVbfudl0IPg6C1KiVEcfmjWe57ne3x4prfINR9j81C-cjxed2adSOAuVitAzStHWhIG07aIYP2fa0r-_V6k7TT3TDVfk6e4LrMOLIBS4oRvBZVCNA'
            },
            data: JSON.stringify({ is_visible: false }), // Body to hide the chat
            onload: function(response) {
                if (response.status === 200) {
                    console.log("Chat deleted successfully.");
                    // alert("Chat deleted successfully.");
                     window.location.reload(); // Reload page after deletion
                } else {
                    console.error("Error deleting chat:", response.responseText);
                    alert("Failed to delete the chat.");
                }
            },
            onerror: function(error) {
                console.error("Error sending request:", error);
                alert("Failed to send delete request.");
            }
        });
    }

    // Button click event
    button.addEventListener('click', function() {
        const chatId = getChatIdFromUrl();
        if (chatId) {
            console.log("Chat ID found:", chatId);
            deleteChat(chatId);
        } else {
            console.error("Chat ID not found.");
            alert("Could not retrieve Chat ID.");
        }
    });
    });
