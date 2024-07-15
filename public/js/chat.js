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
var _a;
function sendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const userInput = document.getElementById('user-input').value;
        const messagesContainer = document.getElementById('messages');
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerText = userInput;
        messagesContainer.appendChild(userMessage);
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
    });
}
(_a = document.getElementById('send-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', sendMessage);
