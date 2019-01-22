const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname, '../public')

// console.log(__dirname + './../public');
// console.log(publicPath)
var app = express();
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=>{    //.on('event', callbackFunction)
    console.log('New User Connected')

    socket.on('disconnect', ()=>{
        console.log('Client Disconnected')
    })

    socket.emit('newMessage', {
        from: 'Dranzer',
        text: 'Hey! I am from Server',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',function(message){
        console.log('Created Message', message)
    })

    
})

server.listen(port, ()=>{
    console.log(`Server is hosted on port ${port}`)
})