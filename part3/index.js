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
const app = express();

//In order to access the data easily, we need the help of the express json-parser that is taken to use with command
app.use(express.json())

//Constants
const baseUrl = "/api/persons";
const PORT = 3001;

//Function for creating id

const generateId=()=>{
    return Math.floor(Math.random()*500000)
}

//Route for all persons
app.get(baseUrl, (req, res) => {
  res.json(persons);
});

//Route for single phonebbok entry
app.get(`${baseUrl}/:id`,(req,res)=>{
    const id= Number(req.params.id)
    const person= persons.find(person=> person.id === id)
    if(person){
        return res.json(person)
    }
    res.status(404).end()
})

//Route for delete a phonebbook entry
app.delete(`${baseUrl}/:id`,(req,res)=>{
    const id= Number(req.params.id)
    persons = persons.filter((person)=> person.id !== id)
    res.status(204).end()
})

//Route for info
app.get("/info", (req, res) => {
  const time = new Date();
  res.send(`<div>    
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time.toUTCString()} ${time.toLocaleDateString('en-US',{day:'2-digit',timeZoneName:'long'}).slice(4)}</p>    
    </div>`);
});

//Route for create new phonebook entry

app.post(baseUrl,(req,res)=>{
    const body= req.body
    const index= persons.findIndex(person=>person.name===body.name)
    if(!body.name || !body.number){
        return res.status(400).json({error:'Name or number missing'})
    }
    if(index!==-1){
        return res.status(400).json({error:'name mustb be unique'})
    }

    const newEntry={
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons= persons.concat(newEntry)
    res.json(newEntry)
})

app.listen(PORT, () => {
  console.log("Servidor en servicio");
});
