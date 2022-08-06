//Helpers
const cors= require('cors')
require('express-async-errors')//Para no tener que escribir try catch para async await
const config= require('./utils/config')

//Routers
const blogRouter=require('./controller/blog')
const userRouter= require('./controller/user')
const loginRouter= require('./controller/login')


//Utils
const middleware= require('./utils/middleware')
const logger= require('./utils/logger')


//CoreApp
const express= require('express')
const mongoose= require('mongoose')


const app= express()




logger.info('connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Conectado a la DB'))
  .catch(error => logger.error('error connecting to DB: ',error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login',loginRouter)
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports= app

