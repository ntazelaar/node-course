const request = require('postman-request')

const forecast = async (latitude, longitude) => {
    const url = 'http://api.weatherstack.com/current?access_key=06906417837c985be2a41645ac368b7f&query=' + latitude + ',' + longitude + '&units=m'

    return new Promise((resolve, reject) => {
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                reject('Unable to connect to weather service!')
            } else if (body.error) {
                reject('Unable to find location!')
            } else {
                const current = body.current
                const data = current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out.'
                resolve(data)
            }
        })
    })
}

module.exports = forecast