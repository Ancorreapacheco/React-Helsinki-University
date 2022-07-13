import Note from "./components/Note";
import noteService from "./services/notes";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  //useEffect tiene 2 parametros, primero el efecto y segundo cada cuanto el efecto es ejecutado, si es un [] quiere decir
  //que solo la primera vez que renderiza el componente
  useEffect(() => {
    noteService.getAll().then((res) => setNotes(res));
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((noteCreated) => {
      setNotes(notes.concat(noteCreated));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => id === n.id);
    const changedNote = { ...note, important: !note.important };
    noteService.update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
    }).catch(error=> {
      alert(`the note ${id} was already deletd`)
      setNotes(notes.filter(note=> note.id !== id))
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>

      <h2>Notas Filtradas</h2>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "Important" : "All"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}> {note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
