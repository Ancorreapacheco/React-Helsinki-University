import axios from 'axios'
const baseUrl = 'api/blogs'
let token= null

const setToken= newToken =>{
  token= `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const configuration= {
    headers: {Authorization: token} 
  }
  try {    
    const response= await axios.post(baseUrl,newBlog,configuration)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export default { getAll, setToken, create }