async function sendMessage(): Promise<void> {
    const userInput = (document.getElementById('user-input') as HTMLInputElement).value;
    const messagesContainer = document.getElementById('messages') as HTMLDivElement;

    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerText = userInput;
    messagesContainer.appendChild(userMessage);

    const response = await fetch('/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerText = data.reply;
    messagesContainer.appendChild(botMessage);
}

document.getElementById('send-button')?.addEventListener('click', sendMessage);

