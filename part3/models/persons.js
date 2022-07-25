require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Failed to connect DB', err.message);
  });

//Definiendo Schema

const regNumber = (value) => {
  const regExpress = /\d{2,3}-\d{4,}/y;
  return regExpress.test(value);
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: { type: String, minLength: 8,
    validate:{
      validator: regNumber,
      message:'Malformatted number'
    } },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
