const path=require('path');
const publicPath=path.join(__dirname,'../public');
const express=require('express');
const port = process.env.PORT||3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
var app=express();
const socketIO=require('socket.io');
const http=require('http');
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');
  socket.emit('newMessage',generateMessage('admin','welcome to chat app'));
  socket.broadcast.emit('newMessage',generateMessage('admin','new user joined'));
  socket.on('createMessage',(message,callback)=>{
    console.log("createMessage",message);

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback("from server");
  });
  socket.on('createLocationMessage',(coords)=>{
     io.emit('newLocationMessage',generateLocationMessage('admin',coords));
  });
  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server running at port ${port}`);
});
