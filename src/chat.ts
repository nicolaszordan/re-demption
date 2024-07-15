async function sendMessage(): Promise<void> {
    const userInputElement = document.getElementById('user-input') as HTMLInputElement;
    const userInput = userInputElement.value;
    const messagesContainer = document.getElementById('messages') as HTMLDivElement;
    const loader = document.getElementById('loader') as HTMLDivElement;

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
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message bot-message';
        errorMessage.innerText = 'Error: Could not get a response from the server.';
        messagesContainer.appendChild(errorMessage);
    } finally {
        // Hide the loader
        loader.style.display = 'none';
        userInputElement.value = ''; // Clear the input field
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        userInputElement.disabled = false;
    }
}

document.getElementById('send-button')?.addEventListener('click', sendMessage);
document.getElementById('user-input')?.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

const botMessage = document.createElement('div');
botMessage.className = 'message bot-message';
botMessage.innerText = 'Welcome, my name is Steve and I am here to help you in your spritual journey. How can I help you ?';
(document.getElementById('messages') as HTMLDivElement).appendChild(botMessage);
