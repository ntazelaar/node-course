const express = require('express')

const app = express()

app.get('', (request, response) => {
    response.send('<h1>Weather</h1>')
})

app.get('/help', (request, response) => {
    response.send({
        name: 'Nick',
        age: 37
    })
})

app.get('/about', (request, response) => {
    response.send('<h1>About</h1>')
})

app.get('/weather', (request, response) => {
    response.send({
        location: "Den Haag",
        forecast: "Sunny"
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000.')
})