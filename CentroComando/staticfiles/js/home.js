document.addEventListener('DOMContentLoaded', function() {
    const openChatButton = document.getElementById('open-chat-button');
    const closeChatButton = document.getElementById('close-chat-button');
    const chatWidget = document.getElementById('customer-chat');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('customer-message-input');
    const sendButton = document.getElementById('customer-send-message');

    let chatSocket = null;

    function openChat() {
        chatWidget.style.display = 'block';
        if (!chatSocket) {
            connectWebSocket();
        }
    }

    function closeChat() {
        chatWidget.style.display = 'none';
        if (chatSocket) {
            chatSocket.close();
            chatSocket = null;
        }
    }

    function connectWebSocket() {
        chatSocket = new WebSocket('ws://' + window.location.host + '/ws/customer_chat/');

        chatSocket.onopen = function(e) {
            console.log('Conexión establecida con el servicio al cliente');
        };

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            const messageElement = document.createElement('p');
            messageElement.textContent = `${data.sender}: ${data.message}`;
            messageElement.classList.add(data.sender === 'Cliente' ? 'customer-message' : 'staff-message');
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        chatSocket.onclose = function(e) {
            console.error('La conexión con el servicio al cliente se ha cerrado inesperadamente');
        };
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message && chatSocket) {
            chatSocket.send(JSON.stringify({
                'message': message,
                'sender': 'Cliente'
            }));
            messageInput.value = '';
        }
    }

    openChatButton.addEventListener('click', openChat);
    closeChatButton.addEventListener('click', closeChat);
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});