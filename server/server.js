const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {messageGenerator} = require('./utils/message');
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

    socket.emit('newMessage',messageGenerator('Admin', 'Welocome to the Chat APP'))

    socket.broadcast.emit('newMessage',messageGenerator('Admin', 'New User joined the chat APP'))

   

    socket.on('createMessage',function(message, callback){
        console.log('Message Created', message)
        io.emit('newMessage',messageGenerator( message.from, message.text))
        callback('This is an acknowledgement');
    })

    
})

server.listen(port, ()=>{
    console.log(`Server is hosted on port ${port}`)
})