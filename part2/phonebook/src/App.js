import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from './components/personForm'
import Persons from './components/persons'
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [valueFilter, setValueFilter] = useState("");

  useEffect(()=>{
    phonebookService.getAll()
    .then(phonesReceived=> setPersons(phonesReceived))
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
    };
    /* if (persons.some((person) => newPerson.name === person.name)) { */
    if(persons.findIndex(person=> newPerson.name.toLocaleLowerCase() === person.name.toLocaleLowerCase() ) !== -1){
      const personToUpdate= persons.find(person=>newPerson.name.toLocaleLowerCase() === person.name.toLocaleLowerCase())
      if(window.confirm(`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`)){
        const personChanged= {...personToUpdate,number: newNumber}
        
        phonebookService.update(personChanged.id,personChanged)
        .then(personUpdated=>setPersons(persons.map(person=>person.id===personUpdated.id ? personUpdated: person)))
        return 
      }else{
        return
      }
    }
    phonebookService.create(newPerson).then(personAdded=> setPersons(persons.concat(personAdded)))
  };

  const deletePerson=(id, person)=>{
    return ()=>{
      if(window.confirm(`Delete ${person.name}?`)){
        phonebookService.deletePerson(id)
        /* .then(deletedPerson=> console.log(deletedPerson)) */
        .then(deletedPerson=>setPersons(persons.filter(person=>person.id !== id)))
      }
    }
    
  }

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

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
