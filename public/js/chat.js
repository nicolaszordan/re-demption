"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
function sendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const userInputElement = document.getElementById('user-input');
        const userInput = userInputElement.value;
        const messagesContainer = document.getElementById('messages');
        const loader = document.getElementById('loader');
        if (userInput.trim() === "")
            return; // Avoid sending empty messages
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerText = userInput;
        messagesContainer.appendChild(userMessage);
        // Show the loader
        loader.style.display = 'block';
        userInputElement.disabled = true;
        try {
            const response = yield fetch('/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            });
            const data = yield response.json();
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.innerText = data.reply;
            messagesContainer.appendChild(botMessage);
        }
        catch (error) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'message bot-message';
            errorMessage.innerText = 'Error: Could not get a response from the server.';
            messagesContainer.appendChild(errorMessage);
        }
        finally {
            // Hide the loader
            loader.style.display = 'none';
            userInputElement.value = ''; // Clear the input field
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
            userInputElement.disabled = false;
        }
    });
}
(_a = document.getElementById('send-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', sendMessage);
(_b = document.getElementById('user-input')) === null || _b === void 0 ? void 0 : _b.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});
const botMessage = document.createElement('div');
botMessage.className = 'message bot-message';
botMessage.innerText = 'Welcome, my name is Steve and I am here to help you in your spritual journey. How can I help you ?';
document.getElementById('messages').appendChild(botMessage);
console.log("proutout");
