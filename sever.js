const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const https = require('https');

app.post('/serverip', (req, res) => {
    https.get('https://api.render.com/network/ip', (response) => {
        response.on('data', (data) => {
            let serverIp = JSON.parse(data).ip;
            res.json({ip: serverIp});
        });
    }).on('error', (err) => {
        res.json({error: err.message});
    });
});

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

server.listen(port, ()=>{
    console.log(`Listen to the port ${port})`);
});
