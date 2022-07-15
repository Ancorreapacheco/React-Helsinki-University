const Person = ({ person,deletePerson }) => {
    return (
      <li key={person.id}>
        {person.name} {person.number} 
        <button onClick={deletePerson(person.id,person)}> Delete</button>
      </li>
    );
  };
  
  const Persons = ({ personsToShow, deletePerson }) => {
    return (
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    );
  };

  export default Persons