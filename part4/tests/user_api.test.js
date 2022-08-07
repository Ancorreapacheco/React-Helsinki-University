const app= require('../app')
const supertest= require('supertest')
const User= require('../models/user')
const helper=require('./api_helper')
const mongoose= require('mongoose')

const api= supertest(app)

beforeEach( async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('Username is not given or is not at least 3 ch long', async () => {

  const userAtStart= await helper.usersInDb()
  const userNoUsername= {
    'name': 'andres',
    'password': 'andres'
  }

  const userShortUserName ={
    'username': 'an',
    'name': 'andres',
    'password': 'andres'

  }
  await api
    .post('/api/users')
    .send(userNoUsername)
    .expect(400)

  await api
    .post('/api/users')
    .send(userShortUserName)
    .expect(400)

  const usersAtEnd= await helper.usersInDb()

  expect(usersAtEnd).toHaveLength(userAtStart.length)
})

test('Password is not given or is not at least 3 ch long', async () => {

  const userAtStart= await helper.usersInDb()
  const userNoPassword= {
    'name': 'andres',
    'username': 'andres'
  }

  const userShortPassword ={
    'username': 'andres',
    'name': 'andres',
    'password': 'an'

  }
  await api
    .post('/api/users')
    .send(userNoPassword)
    .expect(400)

  await api
    .post('/api/users')
    .send(userShortPassword)
    .expect(400)

  const usersAtEnd= await helper.usersInDb()

  expect(usersAtEnd).toHaveLength(userAtStart.length)
})


afterAll( () => {
  mongoose.connection.close()
})