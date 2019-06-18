const http = require('http');
const path = require('path');
// socket.io has been a third party library for the correct mag
const socketio = require('socket.io');
// Third party library express, to create the server
const express = require('express');
// Namespaces
const namespaces = require('./data/namespaces');


//Application
const app = express();

const httpServer = http.createServer(app);

const io= socketio(httpServer,{
    path:'/socket10',
    serveClient: true
});

io.on('connection', socket => {
    console.log('A client has been connect!');
    let nsData = namespaces.map(ns => ({
        endpoint: ns.endpoint, img: ns.img
    }))

    socket.emit('nsList', nsData);
    console.log(nsData)
});

namespaces.forEach(Ns => {
    // console.log(Ns)
    io.of(Ns.endpoint).on("connection", nsSocket => {
        console.log(`${nsSocket.id} has join to ${Ns.endpoint}`)
        // a socket has connected to one of our chatgroup namespaces.
        // send that ns group info back

        nsSocket.emit('nsRoomLoad',  namespaces.find(ns => ns.endpoint === Ns.endpoint).rooms)
        nsSocket.on('joinRoom', (roomName, numberOfUserCallback) => {
            // Deal with the history... once that have it
            nsSocket.join(roomName);
            io.of(Ns.endpoint).in( roomName).clients((err, clients) =>{
                console.log('clients', clients)
                numberOfUserCallback(clients.length)
            })
            console.log('Server - join room', roomName)
        })
        nsSocket.on('newMessageToServer', (msg) => {
            console.log('message', msg)
            // Send this message to ALL Sockets that are in the room that THIS socket is in.
            // how can we find out what
            console.log(nsSocket.rooms)
            // The user will be
        })
    })
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res ) => {
    res.sendFile(path.resolve(__dirname,'public/chat.html'));
})
httpServer.on('listening', () => {
    console.log('The server is running!');
})

httpServer.listen(9000);

