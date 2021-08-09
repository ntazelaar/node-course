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

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})