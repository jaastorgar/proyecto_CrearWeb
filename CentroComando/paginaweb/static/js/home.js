document.addEventListener('DOMContentLoaded', function() {
    const messageLog = document.getElementById('message-log');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message');
    const userTypeSelect = document.getElementById('user-type-select');

    const socket = new WebSocket('ws://' + window.location.host + '/ws/chat/');

    socket.onopen = function(e) {
        console.log('Conexión WebSocket establecida');
    };

    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        const message = data.message;
        const userType = data.user_type;
        
        const messageElement = document.createElement('p');
        messageElement.textContent = `${userType === 'staff' ? 'Personal: ' : 'Cliente: '}${message}`;
        messageElement.classList.add(userType === 'staff' ? 'staff-message' : 'client-message');
        messageLog.appendChild(messageElement);
        messageLog.scrollTop = messageLog.scrollHeight;
    };

    socket.onclose = function(e) {
        console.error('Conexión WebSocket cerrada inesperadamente');
    };

    function sendMessage() {
        const message = messageInput.value;
        const userType = userTypeSelect.value;
        if (message) {
            socket.send(JSON.stringify({
                'message': message,
                'user_type': userType
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