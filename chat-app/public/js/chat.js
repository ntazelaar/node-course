const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

const messageForm = document.querySelector('#message-form')

messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const message = event.target.elements.message.value
    socket.emit('sendMessage', message)
})