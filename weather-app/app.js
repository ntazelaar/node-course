const request = require('postman-request')
const chalk = require('chalk')

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

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/fsegseg.json?access_token=pk.eyJ1Ijoibmlja3Q4NCIsImEiOiJja3JxYXd0cnAybzY1Mm9wZTVweGppbHFpIn0.Oye2WExk2a2DXLCIr7ENDw&limit=1'

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log(chalk.red('Unable to connect to location service!'))
    } else if (response.body.features.length === 0) {
        console.log(chalk.red('Unable to find location!'))
    } else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude);
    }
})