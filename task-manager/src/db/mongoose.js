const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// const me = new User({
//     name: 'Nick',
//     age: 'Mike'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    }
})

const someTask = new Task({
    description: 'Clean the house',
    completed: false
})

someTask.save().then(() => {
    console.log(someTask)
}).catch((error) => {
    console.log('Error! ', error)
})


