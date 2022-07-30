require('dotenv').config()

const PORT = process.env.PORT // Para despliegue a Heroku
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports= { PORT,MONGODB_URI }