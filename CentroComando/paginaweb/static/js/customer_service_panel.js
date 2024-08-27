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

    // Modificar la función de recepción de mensajes
    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        if (data.chatId && data.message && data.sender) {
            if (!activeChats[data.chatId]) {
                addNewChat(data.chatId, data.sender);
            }
            activeChats[data.chatId].messages.push(data);
            if (data.chatId === currentChatId) {
                const chatLog = document.getElementById('chat-log');
                chatLog.innerHTML += `<p><strong>${data.sender}:</strong> ${data.message}</p>`;
                chatLog.scrollTop = chatLog.scrollHeight;
            }
        }
    };
    
    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
}

function addNewChat(chatId, customerName) {
    const chatsList = document.getElementById('active-chats-list');
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.innerHTML = `
        <span>${customerName}</span>
        <span class="chat-id">${chatId}</span>
    `;
    chatItem.onclick = () => switchToChat(chatId);
    chatsList.appendChild(chatItem);

    activeChats[chatId] = { customerName, messages: [] };
}

function updateChatsList() {
    const chatsList = document.getElementById('active-chats-list');
    chatsList.innerHTML = '';
    Object.keys(activeChats).forEach(chatId => {
        addNewChat(chatId, activeChats[chatId].customerName);
    });
}

function handleNewMessage(data) {
    if (!activeChats[data.chatId]) {
        addNewChat(data.chatId, data.sender);
    }
    activeChats[data.chatId].messages.push(data);
    updateChatsList();
}

function switchToChat(chatId) {
    const currentChat = activeChats[chatId];
    document.getElementById('current-customer').textContent = currentChat.customerName;
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML = '';
    currentChat.messages.forEach(msg => {
        chatLog.innerHTML += `<p><strong>${msg.sender}:</strong> ${msg.message}</p>`;
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