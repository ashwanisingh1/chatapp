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
  socket.emit('newMessage',{
    from:"ashwani",
    text:"hello",
    createdAt:"ads"
  });
  socket.on('createMessage',(message)=>{
    console.log("createMessage",message);
  });
  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });
});

server.listen(port,()=>{
  console.log(`server running at port ${port}`);
});
