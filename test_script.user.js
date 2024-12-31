// ==UserScript==
// @name         Add Delete Chat Button on ChatGPT
// @namespace    https://chatgpt.com
// @version      0.11
// @description  Adds a Delete Chat button on top of ChatGPT page
// @author       You
// @match        https://chatgpt.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @grant        GM.setValue
// @grant        GM.getValue
// @updateURL    https://raw.githubusercontent.com/boruchzidell/tamperMonkeyTest/refs/heads/master/test_script.user.js
// @downloadURL  https://raw.githubusercontent.com/boruchzidell/tamperMonkeyTest/refs/heads/master/test_script.user.js

// ==/UserScript==

(function() {
    'use strict';


    // Wait until the page content is fully loaded
    window.addEventListener('load', function() {
        console.log("TamperMonkey script loaded");


        unsafeWindow.GM_setValue = GM.setValue;
        unsafeWindow.GM_getValue = GM.getValue;



        // Create a button element
        const button = document.createElement('button');
        button.innerText = '11 Delete Chat';
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

        var token;

        async function getToken() {
            return await GM.getValue('token');
        }

        // Function to delete the current chat
        async function deleteChat(chatId) {

            var token = await getToken();

            GM_xmlhttpRequest({
                method: 'PATCH',
                url: `https://chatgpt.com/backend-api/conversation/${chatId}`, // Adjust URL to the correct API endpoint
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: JSON.stringify({ is_archived: true }), // Body to hide the chat
                onload: function(response) {
                    if (response.status === 200) {
                        console.log("Chat deleted successfully.");
                        // alert("Chat deleted successfully.");
                        // window.location.reload(); // Reload page after deletion
                        window.location.href = 'https://chatgpt.com'
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
})();
