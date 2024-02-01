const socket = io();
socket.on('connect', (skt) => {
    console.log('connected');
});

socket.on('PATCH', (msg) => {
    console.log('message:', msg);
});
