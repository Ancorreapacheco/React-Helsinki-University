//const { response } = require("express");
const express = require("express");
const cors= require('cors')
const app = express();

//Creando Middleware

const logMiddleware=(req,res,next)=>{
  console.log('Method:', req.method);
  console.log('path:', req.path);
  console.log('Body:', req.body);
  console.log('-------------');
  next()
  
}

const unknowEndPoint=(req,res)=>{
  res.status(404).send({error:'unknow EndPoint'})
}

//In order to access the data easily, we need the help of the express json-parser that is taken to use with command
app.use(express.json());
app.use(cors())
app.use(logMiddleware)



let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
  const maxIs =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxIs + 1;
};

//Ruta generica
app.get("/", (request, response) => {
  response.send("<h1>Hello</h1>");
});


//Ruta todas las notas
app.get("/api/notes", (request, response) => {
  console.log('Ruta completa')
  response.json(notes);
});

//Ruta para consultar una nota
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.statusMessage = "Este id no existe";
    response.status(404).end();
  }
});

//Ruta para eliminar una nota
// Respondemos con codigo 204 (no content)
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

//Ruta para crear nueva nota
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note= {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes= notes.concat(note)
  response.json(note)
});

//Ruta para actualizar importancia
app.put("/api/notes/:id",(req,res)=>{
  const body = req.body
  const id= Number(req.params.id)
  notes= notes.map(note=> note.id === id ? {...note,important:!note.important} : note )
  res.json(body)
})

app.use(unknowEndPoint)

const PORT = process.env.PORT || 3001// Para despliegue a Heroku
app.listen(PORT, () => {
  console.log("Server in service");
});
