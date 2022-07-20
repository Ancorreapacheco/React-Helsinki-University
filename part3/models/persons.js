require("dotenv").config();

const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect DB", err.message);
  });

//Definiendo Schema

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person= mongoose.model('Person', personSchema)

module.exports= Person