const request = require('postman-request')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// const url = 'http://api.weatherstack.com/current?access_key=06906417837c985be2a41645ac368b7f&query=37.8267,-122.4233&units=m'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log(chalk.red('Unable to connect to weather service!'))
//     } else if (response.body.error) {
//         console.log('Unable to find location!')
//     } else {
//         const current = response.body.current
//         console.log(current.weather_descriptions[0] + ' .It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out.')
//     }
// })

const address = process.argv[2]

geocode(address, (error, data) => {
    if (error) {
        return console.log(error)
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

        console.log(data.location)
        console.log(forecastData)
    })
})

