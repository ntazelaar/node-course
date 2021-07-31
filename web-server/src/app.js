const express = require('express')
const path = require('path')

const app = express()

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Nick Tazelaar'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Nick Tazelaar'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        message: 'How can I help?'
    })
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