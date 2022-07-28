const logger= require('./utils/logger')
const config= require('./utils/config')
const middleware= require('./utils/middleware')
const blogRouter=require('./controller/blog')

const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')


const app= express()




logger.info('connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(()=>logger.info('Conectado a la DB'))
    .catch(error=> logger.error('error connecting to DB: ',error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports= app

