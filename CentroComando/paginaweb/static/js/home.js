let chatSocket = null;
let userName = '';
let chatId = null;

function generarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function initializeWebSocket() {
    chatId = generarIdUnico();
    chatSocket = new WebSocket(
        'ws://' + window.location.host + '/ws/customer_chat/' + chatId + '/'
    );

    chatSocket.onmessage = function(e) {
        const datos = JSON.parse(e.data);
        if (datos.message && datos.sender) {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML += `<p><strong>${datos.sender}:</strong> ${datos.message}</p>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    chatSocket.onclose = function(e) {
        console.error('La conexión del chat se cerró inesperadamente');
    };
}

function enviarMensaje() {
    const inputMensaje = document.getElementById('chat-message-input');
    const mensaje = inputMensaje.value.trim();
    if (mensaje && chatSocket) {
        chatSocket.send(JSON.stringify({
            'message': mensaje,
            'sender': userName,
            'chatId': chatId
        }));
        inputMensaje.value = '';
    }
}

function inicializarChat(nombre) {
    userName = nombre;
    initializeWebSocket();
    document.getElementById('chat-name-form').style.display = 'none';
    document.getElementById('chat-messages').style.display = 'block';
    document.getElementById('chat-input-area').style.display = 'flex';
    console.log(`Chat iniciado para ${userName}`);
}

document.addEventListener('DOMContentLoaded', function() {
    const botonAbrirChat = document.getElementById('open-chat-button');
    const botonCerrarChat = document.getElementById('close-chat-button');
    const chatWhatsapp = document.getElementById('whatsapp-chat');
    const botonEnviarMensaje = document.getElementById('chat-message-submit');
    const inputMensaje = document.getElementById('chat-message-input');
    const botonIniciarChat = document.getElementById('start-chat-button');
    const inputNombreUsuario = document.getElementById('user-name-input');

    botonAbrirChat.addEventListener('click', function() {
        chatWhatsapp.style.display = 'block';
        botonAbrirChat.style.display = 'none';
    });

    botonCerrarChat.addEventListener('click', function() {
        chatWhatsapp.style.display = 'none';
        botonAbrirChat.style.display = 'block';
    });

    botonEnviarMensaje.addEventListener('click', enviarMensaje);

    inputMensaje.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            enviarMensaje();
        }
    });

    botonIniciarChat.addEventListener('click', function() {
        const nombre = inputNombreUsuario.value.trim();
        if (nombre) {
            inicializarChat(nombre);
        } else {
            alert('Por favor, ingresa tu nombre para iniciar el chat.');
        }
    });
});