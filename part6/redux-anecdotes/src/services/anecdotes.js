import axios from 'axios'


const baseUrl= 'http://localhost:3001/anecdotes'

const getAll= async () =>{
  const response= await axios.get(baseUrl)
  return response.data
}

const createNew= async (content) => {
  const newNote = {
    content,
    votes:0
  }
  const response = await axios.post(baseUrl,newNote)
  return response.data
}

const update = async (id, anecdoteToUpdate) => {
  const response = await axios.put(`${baseUrl}/${id}`,anecdoteToUpdate)
  return response.data
}

export default { getAll, createNew, update }