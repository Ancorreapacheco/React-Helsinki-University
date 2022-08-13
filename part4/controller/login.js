const loginRouter= require('express').Router()
const User= require('../models/user')
const bcrypt= require('bcrypt')
const jsw= require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log(username, ' ---', password)
  const user= await User.findOne({ username })
  const passwordCorrect= user === null ? false : await bcrypt.compare(password,user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(401).json({ error: 'password or username invalid' })
  }
  const userForToken= {
    username: user.username,
    id: user._id
  }

  const token= jsw.sign(userForToken,process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports= loginRouter