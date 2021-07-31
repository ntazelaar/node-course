const express = require('express')
const path = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (request, response) => {
    response.send({
        location: "Den Haag",
        forecast: "Sunny"
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000.')
})