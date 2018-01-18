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


jQuery('#message-form').on('submit',(e)=>{
  e.preventDefault();
  socket.emit('createMessage',{
    from:'user',
    text:jQuery('[name=message]').val()
  },()=>{
    console.log('got it');
  });
});