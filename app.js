const fs = require('fs')

fs.writeFileSync('notes.txt', 'My name is Nick.')

fs.appendFileSync('notes.txt', ' I live in The Hague.')