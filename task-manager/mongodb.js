// CRUD create read update v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()
console.log(id.toHexString())
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectId("61091421370bf9e08923b3ef") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 37 }).toArray((error, users) => {
    //     console.log(users)
    // })

    db.collection('tasks').findOne({ _id: new ObjectId('61090e8c3b1b2a1c1995a931') }, (error, task) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(tasks)
    })

})