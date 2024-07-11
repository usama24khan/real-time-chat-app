const socket = io();
const recievemsg = new Audio('messageMp3.mp3')
const sendmsg= new Audio('sendmsg.wav')
const leavemsg = new Audio('leavemsg.wav')
const userjoin = new Audio('userjoin.wav')
const form = document.getElementById('form');
const input = document.querySelector('input[type="text"]');
const chatBox = document.querySelector('.chat-box');
console.log('hello bro')
const newUser = prompt("Enter Your Name Please");
socket.emit('new-user-joined', newUser);


const sendMessage= (message,position,name,audio)=>{
    audio.play()
    console.log('send message generated')
    messageEl= document.createElement('div')
    messageEl.classList.add('message',position)
    messageEl.innerHTML = `<h4>${name}</h4> <p>${message}</p>`
    chatBox.appendChild(messageEl)

}
socket.on('user-joined',newUser=>{
    sendMessage('has joined the chat','left',newUser,userjoin)
   
})

form.addEventListener('submit',(e)=>{
   e.preventDefault()
let    message= input.value
let position = 'right'
completeMsg = {
    msg:message,
    name:newUser
}
let name = completeMsg.name
sendMessage(message,position,name,sendmsg)
input.value= ''

socket.emit('send-message',completeMsg)
})
socket.on('recieve',(completeMsg)=>{
    recievemsg.play()
    console.log(completeMsg)
    let position = "left"
     let msg =completeMsg.msg
     let name = completeMsg.name
    sendMessage(msg,position,name,recievemsg)

})
socket.on('new-user-joined',newUser=>{
    
   sendMessage('new user joined:',"right",newUser,userjoin)
})
socket.on('left',(leftMsg)=>{
    sendMessage(leftMsg,'left',newUser,leavemsg)
})