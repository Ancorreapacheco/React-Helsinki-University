import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  
  const dispatch= useDispatch()

  const handleChange = (event) => {
    const content= event.target.value.toLowerCase()
    dispatch(setFilter(content))  
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

export default Filter