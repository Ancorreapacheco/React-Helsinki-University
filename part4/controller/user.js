const User= require('../models/user')
const userRouter= require('express').Router()
const bcrypt= require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users= await User
    .find({})
    .populate('blogs',{ title: 1, author: 1, likes: 1 } )//blogs es el nombre que le di al array en el Schema
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  const userExist= await User.findOne({ username })
  if(userExist){
    return response.status(400).send({ error: 'User is taken' })
  }
  const passwordHash= await bcrypt.hash(password,10)

  const newUser= new User({
    username,
    passwordHash,
    name
  })

  const savedUser= await newUser.save()
  response.status(201).json(savedUser)
})

module.exports= userRouter