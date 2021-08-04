require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('610a5d4f45477e0d8efeee17', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})