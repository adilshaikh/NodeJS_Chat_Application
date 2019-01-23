var socket = io()
socket.on('connect',function() {
    console.log('Connected to Server.')
})
socket.on('disconnect', function () {
    console.log('Server Disconnected')
})

socket.on('newMessage', function(message) {
    console.log('New Message', message)
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
//     from: 'Pikachu',
//     text: 'Hey this is from Pikachu-Client'
// }, function(data) {
//     console.log('Got It', data)
// })

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'Dranzer',
        text: jQuery('[name=message]').val()
    }, function(){

    })
})



