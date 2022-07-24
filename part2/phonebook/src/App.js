import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Notification from "./components/Notification";
import phonebookService from "./services/phonebook";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [valueFilter, setValueFilter] = useState("");
  const [message, setMessage] = useState({ content: null, isSuccess: true });

  useEffect(() => {
    phonebookService
      .getAll()
      .then((phonesReceived) => setPersons(phonesReceived));
  }, []);

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
    if (
      persons.findIndex(
        (person) =>
          newPerson.name.toLocaleLowerCase() === person.name.toLocaleLowerCase()
      ) !== -1
    ) {
      const personToUpdate = persons.find(
        (person) =>
          newPerson.name.toLocaleLowerCase() === person.name.toLocaleLowerCase()
      );
      if (
        window.confirm(
          `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personChanged = { ...personToUpdate, number: newNumber };
        phonebookService
          .update(personChanged.id, personChanged)
          .then((personUpdated) => {
            setMessage({
              content: `${personUpdated.name} phone updated`,
              isSuccess: true,
            });
            setInterval(() => {
              setMessage({
                content: null,
                isSuccess: true,
              });
            }, 5000);
            setPersons(
              persons.map((person) =>
                person.id === personUpdated.id ? personUpdated : person
              )
            );
          });
        return;
      } else {
        return;
      }
    }
    phonebookService.create(newPerson).then((personAdded) => {
      setMessage({
        content: `Added ${personAdded.name}`,
        isSuccess: true,
      });
      setInterval(() => {
        setMessage({
          content: null,
          isSuccess: true,
        });
      }, 5000);
      setPersons(persons.concat(personAdded));
    }).catch(error=>{
      setMessage({
        content:error.response.data.error,
        isSuccess:false,
      });
      setInterval(() => {
        setMessage({
          content:null,
          isSuccess:false
        })
      }, 10000);
      
    });
  };

  const deletePerson = (id, person) => {
    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        phonebookService
          .deletePerson(id)
          /* .then(deletedPerson=> console.log(deletedPerson)) */
          .then((deletedPerson) => {
            setMessage({
              content: `Information of ${person.name} removed`,
              isSuccess: true,
            });
            setInterval(() => {
              setMessage({ content: null, isSuccess: true });
            }, 5000);
            setPersons(persons.filter((person) => person.id !== id));
          })
          .catch((err) => {
            setMessage({
              content: `Information of ${person.name} has already removed`,
              isSuccess: false,
            });
            setInterval(() => {
              setMessage({ content: null, isSuccess: false });
            }, 5000);
            setPersons(persons.filter((person) => person.id !== id));
          });
      }
    };
  };

  const personsToShow =
    valueFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(valueFilter.toLowerCase())
        );

  return (
    <div>
      <Notification message={message} />
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
