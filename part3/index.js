require("dotenv").config(); //Let uses env variables for port and Db Url

//Server for Phonebook

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//Importaciones
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/persons");

const app = express();

//Defining Middlewares
morgan.token("phoneObject", (req) => {
  const body = req.body;
  return JSON.stringify(body);
});

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

//Ordering middlewares
app.use(express.json()); //In order to access the data easily, we need the help of the express json-parser that is taken to use with command
app.use(express.static("build"));
app.use(morgan("tiny"));
app.use(
  morgan(
    `:method :url :status :res[content-length] - :response-time ms :phoneObject`
  )
);
app.use(cors());

//Constants
const baseUrl = "/api/persons";
const PORT = process.env.PORT;

/* -----------------------------ROUTES---------------------------- */

//Route for GET info
app.get("/info", (req, res,next) => {
  Person.find({})
  .then(persons => {
    const time = new Date();
    res.send(`<div>    
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time.toUTCString()} ${time
        .toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "long" })
        .slice(4)}</p>    
        </div>`)
  })
  .catch(error=> next(error))
});

//Route for GET all persons
app.get(baseUrl, (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

//Route for GET single phonebook entry
app.get(`${baseUrl}/:id`, (req, res, next) => {
  Person.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.statusMessage = "Id does not exist";
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//Route for DELETE a phonebbook entry
app.delete(`${baseUrl}/:id`, (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

//Route for create POST new phonebook entry
app.post(baseUrl, (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number missing" });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((personSaved) => {
    res.json(personSaved);
  });
});

//Route for PUT update an existing phonebook entry
app.put(`${baseUrl}/:id`, (req, res, next) => {
  const body = req.body;

  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

app.use(unknownEndPoint); // handler of requests with unknown endpoint
app.use(errorHandler); // handler of requests with result to errors

app.listen(PORT, () => {
  console.log("Servidor en servicio");
});
