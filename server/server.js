const path=require('path');
const publicPath=path.join(__dirname,'../public');
const express=require('express');
const port = process.env.PORT||3000;
var app=express();
const socketIO=require('socket.io');
const http=require('http');
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('createMessage',(message)=>{
    console.log("createMessage",message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });
  });
  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server running at port ${port}`);
});
