class Users {
    constructor() {
      this.users = [];
    }
  
    addUser(socketid, name, room,email) {
      let user = {socketid, name, room,email};
      this.users.push(user);
      return user;
    }
  
    getUserList (room) {
      let users = this.users.filter((user) => user.room === room);
      let namesArray = users.map((user) => user.name);
  
      return namesArray;
    }
  
    getUser(email) {
      return this.users.filter((user) => user.email === email)[0];
    }
  
    getUserBySocketId(socketid) {
      return this.users.filter((user) => user.socketid === socketid)[0];
    }
    removeUser(email) {
      let user = this.getUser(email);
  
      if(user){
        this.users = this.users.filter((user) => user.email !== email);
      }
  
      return user;
    }

    removeUserBySocketId(socketid) {
      let user = this.getUserBySocketId(socketid);
  
      if(user){
        this.users = this.users.filter((user) => user.socketid !== socketid);
      }
  
      return user;
    }
  
  }
  
  module.exports = {Users};