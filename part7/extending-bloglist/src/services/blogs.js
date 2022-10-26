import axios from 'axios'
const baseUrl = 'api/blogs'
let token= null

const setToken= newToken => {
	token= `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async newBlog => {
	const configuration= {
		headers: { Authorization: token }
	}
	try {
		const response= await axios.post(baseUrl,newBlog,configuration)
		return response.data
	} catch (error) {
		console.log(error.message)
	}
}

const update = async (id, blogToUpdate) => {

	try {
		const response= await axios.put(`${baseUrl}/${id}`,blogToUpdate)
		return response.data
	} catch (error) {
		console.log(error.message)
	}
}

const remove = async id => {
	const configuration = {
		headers:{
			Authorization: token
		}
	}

	try {
		const response= await axios.delete(`${baseUrl}/${id}`,configuration)
		return response.data
	} catch (error) {
		console.log(error.message)
	}
}

export default { getAll, setToken, create, update, remove }