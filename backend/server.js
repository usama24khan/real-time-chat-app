const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require("socket.io")(http)
app.use(express.static("../public"))
let leftMsg = "has left the chat"
// ----------------socket---------------------------
io.on('connection',socket=>{
  socket.on('new-user-joined',newUser=>{
    console.log('user has joined the chat')
    socket.broadcast.emit('user-joined',newUser)
  })
  
  socket.on('send-message',(completeMsg)=>{
    console.log('msg has been send')
    socket.broadcast.emit('recieve',(completeMsg))
  })
  socket.on('disconnect',newUser=>{
    socket.broadcast.emit('left',leftMsg)
    
  })

})

// ---------------------server listening----------------------------
const PORT = 3000;
http.listen(PORT,()=>{
  console.log(`port is running at http://localhost:${PORT}`)
})