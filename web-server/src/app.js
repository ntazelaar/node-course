const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

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
        message: 'How can I help?',
        name: 'Nick Tazelaar'
    })
})

app.get('/weather', (request, response) => {
    if (!request.query.address) {
        return response.send({
            error: 'You must provide an address'
        })
    }

    geocode(request.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return response.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return response.send({ error })

            response.send({
                location,
                forecast: forecastData,
                address: request.query.address
            })
        })
    })
})

app.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(request.query.search)
    response.send({
        products: []
    })
})

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Nick Tazelaar',
        errorText: 'Help article not found!'
    })
})

app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Nick Tazelaar',
        errorText: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000.')
})