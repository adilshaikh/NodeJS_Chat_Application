
var socket = io()

function scrollToBottom(){
    //selectors
    var messages = jQuery('#messages')
    var newMessage = messages.children('ol:last-child')
    //Heights 
    var scrollHeight = messages.prop('scrollHeight')
    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }

}
socket.on('connect',function() {
    console.log('Connected to Server.')
})
socket.on('disconnect', function () {
    console.log('Server Disconnected')
})

socket.on('newMessage', function(message) {
     var formattedTime = moment(message.createdAt).format('HH:mm A')
    // console.log('New Message', message)
    // var li = jQuery('<ol></ol>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li)
    var template = jQuery('#message-template').html()
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom();
})
socket.on('newLocMessage', function(message){
    var formattedTime = moment(message.createdAt).format('HH:mm A')
var template = jQuery('#location-template').html()
var html = Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formattedTime
})
jQuery("#messages").append(html)
scrollToBottom();
 })


jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]')
    
    socket.emit('createMessage', {
        from: 'Dranzer',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('')
    })
})

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('GeoLocation is not supported by the browser')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...')
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('createLocation', {
            latitude : position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, 
    function(){
        alert('Unable to fetch the geocode Location').text('Send Location')
        locationButton.removeAttr('disabled')
    })
})



