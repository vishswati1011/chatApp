const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
var server = require("http").createServer(app);
app.use(express.json());
app.use(cors());

var allRoutes = require('./Routes/routes');
app.use('/api', allRoutes);



const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

global.onlineUsers=new Map();

let user = 0;
io.on("connection", (socket) => {


    global.chatSocket = socket;
    socket.on("add-user",(userid) => {
      console.log(userid);
      onlineUsers.set(userid,socket.id)
    });

    socket.on("send-msg",(data) => {
      console.log("send-msg",data)
      const sendUsersSocket = onlineUsers.get(data.to);
      console.log("sendUsersSocket",sendUsersSocket)
      if(sendUsersSocket) {
        socket.to(sendUsersSocket).emit("msg-recieve",data.message);
      }
    })
    
    
  });



// Connect Database
// mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_PORT}/${process.env.DATABASE}`).then(con=> {
mongoose.connect(`mongodb://localhost:27017/chatDB`).then(con=> {
    console.log("connected DB");
}).catch(err=>{
    console.log('error', err);
});

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8081;

server.listen(port, () => console.log(`Server running on port ${port}`));