var i;

class Users {
  constructor(){
    this.users = [{id:'dummy',name:'dummy',room:'dummy'}];
  }
  addUser(id,name,room){
    var user= {id,name,room};
    this.users.push(user);
    //return user;
  }
  removeUser(id){
    var userstemp=[];
    var user=[];
    for(i=0;i<this.users.length;i++)
     {
      if(this.users[i].id!=id)
       {
         userstemp.push(this.users[i]);
       }
       else {
          user.push(this.users[i]);
       }
     }
     this.users=userstemp;
     return user;
  }
  getUser(id){
    for(i=0;i<this.users.length;i++)
     {
      if(this.users[i].id==id)
       {
         return this.users[i];
       }
     }
  }
  getUserList(room){
   var userstemp=[];
    for(i=0;i<this.users.length;i++)
     {
      if(this.users[i].room==room)
       {
         userstemp.push(this.users[i].name);
       }
     }
     return userstemp;
  }
}

module.exports={Users};
