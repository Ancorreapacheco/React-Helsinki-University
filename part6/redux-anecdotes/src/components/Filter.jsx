import { setFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {
  

  const handleChange = (event) => {
    const content= event.target.value.toLowerCase()
    props.setFilter(content)  
  }
  const style = {
    marginBottom: 10
  }

  return (
    <>
      <div style={style}>
        filter <input name="filterAnecdote" onChange={handleChange} />
      </div>
      <hr/>
    </>
  )
}

const connectedFilter= connect(null,{setFilter})(Filter)

export default connectedFilter