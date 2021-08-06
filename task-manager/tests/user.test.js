const request = require('supertest')
require('../src/db/mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'John',
    email: 'john@example.com',
    password: 'nhoj123$!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Nick',
        email: 'nick@example.com',
        password: 'Red123$!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: 'Mark',
        password: 'kram123%^'
    }).expect(400)
})