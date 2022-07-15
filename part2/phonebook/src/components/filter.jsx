const Filter = (props) => {
    const { valueFilter, handleValueFilter } = props;
  
    return (
      <div>
        Filter shown with{" "}
        <input value={valueFilter} onChange={handleValueFilter} />{" "}
      </div>
    );
  };

  export default Filter