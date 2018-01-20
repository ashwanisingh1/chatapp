var socket= io();
socket.on('connect',()=>{
  console.log('connected new user');
});
socket.on('newMessage',(message)=>{
  console.log("new message",message);
  var li=jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});
socket.on('disconnect',()=>{
  console.log('disconnected new user');
});

socket.on('newLocationMessage',(message)=>{
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank"> My Current Location </a>');
  li.text(`${message.from} : `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit',(e)=>{
  e.preventDefault();
  socket.emit('createMessage',{
    from:'user',
    text:messageTextbox.val()
  },()=>{
    messageTextbox.val('');
  });
});

var locationButton=jQuery('#send-location');

locationButton.on('click',()=>{
  if(!navigator.geolocation)
   {
    return alert('Geolocation not supported please upgrade your browser');
   }
  locationButton.attr('disabled','disabled').text('Sending location...');
   navigator.geolocation.getCurrentPosition((position)=>{
       locationButton.removeAttr('disabled').text('Send location');
     socket.emit('createLocationMessage',{
       latitude : position.coords.latitude,
       longitude : position.coords.longitude
     });
   },()=>{
     locationButton.removeAttr('disabled').text('Send location');
     alert('Unable to fetch location');
   });
});
