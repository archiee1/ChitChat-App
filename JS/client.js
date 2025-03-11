const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageImp');
const messageContainer = document.querySelector(".container");

// var audio = new Audio('');

// Function to add messages to the chat window
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
};

// Ask the user for their name and emit event
const userName = prompt("Enter your name to join");
socket.emit('new-user-joined', userName);

// ✅ Fix: Correctly receive and display the joined user's name
socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'right'); 
});

// ✅ Fix: Ensure received messages are correctly displayed
socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');  // Fix `data.user` to `data.message`
});

// ✅ Fix: Send messages correctly
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});
