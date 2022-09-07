const express = require("express") ;
const path = require("path") ;
const app = express() ;
const server = require("http").createServer(app) ;
const io = require("socket.io")(server) ;

app.use(express.static(path.join(__dirname+"/public")));
io.on("connection" , (socket)=>{
    socket.on("newUser" ,(userName)=>{
        socket.broadcast.emit("update" , userName + " joined the conversation") ;
    });
    socket.on("exitUser" ,(userName)=>{
        socket.broadcast.emit("update" , userName + " left the conversation") ;
    });
    socket.on("chat" ,(message)=>{
        socket.broadcast.emit("chat" , message)
    });
})


server.listen(1000 , ()=>{
    console.log("Your server is running on the port")
})