require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('6109490451ecd23813cd084f').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})