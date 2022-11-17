const mongoose = require('mongoose')

const schema= new mongoose.Schema({
  username:{
    require: true,
    minlength: 4,
    type: String
  },
  favouriteGenre:{
    type: String
  }
})

module.exports = mongoose.model('User', schema)