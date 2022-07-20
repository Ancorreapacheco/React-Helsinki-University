const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Provide Password");
  process.exit(1);
}

const password = process.argv[2];
const dbName = "phoneBook";
const url = `mongodb+srv://fullstack:${password}@cluster0.gbh8rif.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("Conectado a DB");
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then((person) => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}

if (process.argv.length === 3) {
  console.log("Phonebook");

  mongoose.connect(url);

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
