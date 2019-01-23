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



jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'Dranzer',
        text: jQuery('[name=message]').val()
    }, function(){

    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('GeoLocation is not supported by the browser')
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocation', {
            latitude : position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, 
    function(){
        alert('Unable to fetch the geocode Location')
    })
})

socket.on('newLocMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li)
})

