const express=require('express');
const app=express();

const http=require('http');
const { Server }=require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app)

const io = new Server(server , {
    cors : {
        origin : "http://localhost:3000" , 
        methods:["GET" , "POST"],
    }

});

io.on("connection" , (socket) => {
    socket.on("message_sent" , (data)=>{
        
        socket.broadcast.emit("message_received" , data);
    });
});

server.listen( 3001 ,() => {
    console.log("server is running");
})
