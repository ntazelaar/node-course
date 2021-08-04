const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

const doStuff = async () => {
    if (!address) {
        console.log(chalk.red('Please provide an address'))
    } else {
        try {
            const { latitude, longitude, location } = await geocode(address)
            const forecastResult = await forecast(latitude, longitude)
            console.log(location)
            console.log(forecastResult)
        } catch (error) {
            console.log(error)
        }
    }
}

doStuff()