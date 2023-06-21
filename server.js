const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); 
var add={};
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    if(add[data]){
       socket.to(data).emit("receive_message", add[data]);
    }
    //get(data.room);
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    //eval(data.room+"i"+"="+"'"+data.message+"'");
    //set(data.room,data.message);
    add[data.room]=data.message;
    socket.to(data.room).emit("receive_message", data);
  });
});
server.listen(80, () => {
  
});
