const logger= require('./logger')

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
  }
  next(err)
}

module.exports = { errorHandler, requestLogger, unknownEndpoint }
