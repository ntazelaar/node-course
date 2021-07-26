const getNotes = require('./notes')
const chalk = require('chalk')

const msg = getNotes()
console.log(msg)

const greenMessage = chalk.green.inverse.bold('Success!')
console.log(greenMessage)
