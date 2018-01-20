var socket= io();
socket.on('connect',()=>{
  console.log('connected new user');
});

function scrollToBottom(){
  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();
  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
   {
     messages.scrollTop(scrollHeight);
   }
}

socket.on('newMessage',(message)=>{
  var formattedTime=moment().format('hh:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
scrollToBottom();
});
socket.on('disconnect',()=>{
  console.log('disconnected new user');
});

socket.on('newLocationMessage',(message)=>{
  var formattedTime=moment().format('hh:mm a');

  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template,{
    url:message.url,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
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
