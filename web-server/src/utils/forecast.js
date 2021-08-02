const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=06906417837c985be2a41645ac368b7f&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const current = body.current
            const data = current.weather_descriptions[0] + '. It is currently ' + current.temperature
                + ' degrees out. It feels like ' + current.feelslike + ' degrees out. The humidity is ' + current.humidity + '%.'
            callback(undefined, data)
        }
    })
}

module.exports = forecast