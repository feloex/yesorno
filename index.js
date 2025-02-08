const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); 

var yes = 0
var no = 0

io.on('connection', (socket) => {
    socket.emit("noscnt", `no: ${no}`);
    socket.emit("yescnt", `yes: ${yes}`);

    socket.on('yesclicked', () => {
        console.log('yes');
        yes++
        io.emit("yescnt", `yes: ${yes}`);
    });

    socket.on('noclicked', () => {
        console.log('no');
        no++
        io.emit("noscnt", `no: ${no}`);
    });


    socket.on('disconnect', () => {
        console.log('somebody logged out');
    });
    
});

server.listen(3000, () => {
    console.log('server running http://localhost:3000');
});
