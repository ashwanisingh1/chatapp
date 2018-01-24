const path=require('path');
const publicPath=path.join(__dirname,'../public');
const express=require('express');
const port = process.env.PORT||3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var app=express();
const socketIO=require('socket.io');
const http=require('http');
var server = http.createServer(app);
var io = socketIO(server);
var users=new Users();
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('join',(params,callback)=>{

    if(isRealString(params.name)&&isRealString(params.room))
     {
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);
      io.to(params.room).emit('updateUserList',users.getUserList(params.room));
      socket.emit('newMessage',generateMessage('Admin','welcome to chat app'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
      callback();
     }
     else {
        return callback("Name and Room Name are required");
     }
  });

  socket.on('createMessage',(message,callback)=>{
    console.log("createMessage",message);

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });
  socket.on('createLocationMessage',(coords)=>{
     io.emit('newLocationMessage',generateLocationMessage('Admin',coords));
  });
  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);

    io.to(user.room).emit('updateUserList',users.getUserList(user.room));
    io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
     
      console.log(user);
  });
});

server.listen(port,()=>{
  console.log(`server running at port ${port}`);
});
