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

    db.collection('users').insertOne({
        _id: id,
        name: 'Nick',
        age: 37
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result)
    })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Tim',
    //         age: 35
    //     },
    //     {
    //         name: 'Samantha',
    //         age: 30
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Task One',
    //         completed: false
    //     },
    //     {
    //         description: 'Task Two',
    //         completed: true
    //     },
    //     {
    //         description: 'Task Three',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result)
    // })
})