const request = require('supertest')
require('../src/db/mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Nick',
        email: 'nick@example.com',
        password: 'Red123$!'
    }).expect(201)

    // Assert that the database was chagned correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Nick',
            email: 'nick@example.com',
            age: 0
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Red123$!')
})

test('Should not sign up a new user with invalid name', async () => {
    const newUser = {
        email: 'rick@example.com',
        password: 'kcir123$!'
    }

    await request(app).post('/users').send(newUser).expect(400)

    const user = await User.findOne({ email: newUser.email })
    expect(user).toBeNull()
})

test('Should not sign up a new user with invalid password', async () => {
    const newUser = {
        name: 'Rick',
        email: 'rick@example.com',
        password: '43$!'
    }

    await request(app).post('/users').send(newUser).expect(400)

    const user = await User.findOne({ email: newUser.email })
    expect(user).toBeNull()
})

test('Should not sign up a new user with invalid email', async () => {
    const newUser = {
        name: 'Rick',
        email: 'rick@fear',
        password: 'kcir32343$!'
    }

    await request(app).post('/users').send(newUser).expect(400)

    const user = await User.findOne({ email: newUser.email })
    expect(user).toBeNull()
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // Fetch the user from database
    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: 'Mark',
        password: 'kram123%^'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Mark'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Mark')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'New York'
        })
        .expect(400)
})