const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('data', (data) => {
        console.log(data);
        // Send the data to all connected clients except for the sender
        socket.broadcast.emit('data', data);
    });
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});