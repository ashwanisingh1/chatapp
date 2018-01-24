const path=require('path');
const publicPath=path.join(__dirname,'../public');
const express=require('express');
const port = process.env.PORT||3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
var app=express();
const socketIO=require('socket.io');
const http=require('http');
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('join',(params,callback)=>{

    if(isRealString(params.name)&&isRealString(params.room))
     {
      socket.join(params.room);
      socket.emit('newMessage',generateMessage('admin','welcome to chat app'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined`));
      callback();
     }
     else {
        callback("Name and Room Name are required");
     }
  });

  socket.on('createMessage',(message,callback)=>{
    console.log("createMessage",message);

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
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
