document.addEventListener('DOMContentLoaded', function() {
    const chatLog = document.getElementById('chat-log');
    const messageInput = document.getElementById('chat-message-input');
    const sendButton = document.getElementById('chat-message-submit');

    const chatSocket = new WebSocket(
        'ws://' + window.location.host + '/ws/customer_service/'
    );

    chatSocket.onopen = function(e) {
        console.log('Conexión WebSocket establecida');
    };

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        const messageElement = document.createElement('p');
        messageElement.textContent = `${data.sender}: ${data.message}`;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    chatSocket.onclose = function(e) {
        console.error('Conexión WebSocket cerrada inesperadamente');
    };

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            chatSocket.send(JSON.stringify({
                'message': message,
                'sender': 'Agente'
            }));
            messageInput.value = '';
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});