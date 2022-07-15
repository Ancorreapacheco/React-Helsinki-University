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

  export default PersonForm