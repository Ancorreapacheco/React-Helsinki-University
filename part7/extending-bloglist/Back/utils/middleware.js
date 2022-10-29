const logger= require('./logger')
const jwt=require('jsonwebtoken')
const User= require('../models/user')

//Creando Middleware
//Middleware para hacer log a las peticiones
const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('path:', req.path)
  logger.info('Body:', req.body)
  logger.info('-------------')
  next()
}

//Para responder a direcciones no creadas
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow EndPoint' })
}

//Para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.log('el error: ', err.name)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'id no valido' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }else if(err.name=== 'JsonWebTokenError'){
    return res.status(401).json({ error: 'invalid token' })
  }
  next(err)
}

//Para extraer el token y ponerlo en el request
const tokenExtractor = (req, res, next) => {
  const authorization= req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    req.token= authorization.substring(7)
    return next()
  }
  req.token= null
  next()
}

//Especificar el usuario en el request

const userExtractor = async (req, res, next) => {
  const decodedToken= jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(400).send({ error: 'Token missing or invalid' })
  }
  const user= await User.findById(decodedToken.id)
  req.user= user
  next()
}

module.exports = { errorHandler, requestLogger, unknownEndpoint, tokenExtractor, userExtractor }
