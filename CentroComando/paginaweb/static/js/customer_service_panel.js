let chatSocket = null;
let activeChats = {};
let currentChatId = null;

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function initializeWebSocket() {
    let chatId = generateUniqueId();
    chatSocket = new WebSocket(
        'ws://' + window.location.host + '/ws/customer_chat/' + chatId + '/'
    );

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        if (data.chatId && data.message && data.sender) {
            if (!activeChats[data.chatId]) {
                addNewChat(data.chatId, data.sender);
            }
            activeChats[data.chatId].messages.push(data);
            if (data.chatId === currentChatId) {
                updateChatLog(data);
            }
        }
    };

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
}

function addNewChat(chatId, customerName) {
    const chatList = document.getElementById('active-chats');
    const chatItem = document.createElement('li');
    chatItem.textContent = customerName;
    chatItem.onclick = () => switchToChat(chatId);
    chatList.appendChild(chatItem);

    activeChats[chatId] = {
        customerName: customerName,
        messages: []
    };
}

function switchToChat(chatId) {
    currentChatId = chatId;
    const currentChat = activeChats[chatId];
    document.getElementById('current-customer').textContent = currentChat.customerName;
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML = '';
    currentChat.messages.forEach(msg => {
        updateChatLog(msg);
    });
}

function updateChatLog(data) {
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<p><strong>${data.sender}:</strong> ${data.message}</p>`;
    chatLog.scrollTop = chatLog.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('chat-message-input');
    const message = messageInput.value.trim();
    if (message && chatSocket && currentChatId) {
        chatSocket.send(JSON.stringify({
            'chatId': currentChatId,
            'message': message,
            'sender': 'Agente'
        }));
        messageInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeWebSocket();
    document.getElementById('chat-message-submit').onclick = sendMessage;
    document.getElementById('chat-message-input').onkeyup = function(e) {
        if (e.keyCode === 13) {  // 13 es el código de tecla para Enter
            sendMessage();
        }
    };
});