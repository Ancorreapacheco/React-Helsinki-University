import { useState, useEffect } from "react";
import axios from "axios";
const Filter = (props) => {
  const { valueFilter, handleValueFilter } = props;

  return (
    <div>
      Filter shown with{" "}
      <input value={valueFilter} onChange={handleValueFilter} />{" "}
    </div>
  );
};

const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          Add
        </button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <li key={person.id}>
      {person.name} {person.number}
    </li>
  );
};

const Persons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [valueFilter, setValueFilter] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(res=>{
      setPersons(res.data)
    })
  },[])


  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const handleValueFilter = (e) => {
    setValueFilter(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (persons.some((person) => newPerson.name === person.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newPerson));
  };

  const personsToShow =
    valueFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(valueFilter.toLowerCase())
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter valueFilter={valueFilter} handleValueFilter={handleValueFilter} />

      <h2>Add New</h2>

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
