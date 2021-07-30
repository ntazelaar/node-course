const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=06906417837c985be2a41645ac368b7f&query=37.8267,-122.4233&units=m'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', () => {
    console.log('An error')
})

request.end()