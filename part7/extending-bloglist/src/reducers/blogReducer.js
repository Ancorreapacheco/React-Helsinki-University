import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const sortHighToLow = arrayBlogs => {
	return arrayBlogs.sort((a,b) => b.likes - a.likes)
}


const blogSlice= createSlice({
	name:'blogs',
	initialState:[],
	reducers:{
		appendBlog(state,action) {
			state.push(action.payload)
		},
		setBlogs(state,action){
			return sortHighToLow(action.payload)
		},
		plusLikeBlog(state,action){
			const id= action.payload
			const blogToChange= state.find(blog => blog.id === id)
			const changedBlog= { ...blogToChange, likes: blogToChange.likes +1 }
			return sortHighToLow(state.map((blog) => blog.id=== id? changedBlog : blog))
		},
		deleteBlog(state,action){
			const id= action.payload
			console.log(id)
			console.log(state.filter((blog) => blog.id !== id))
			return state.filter((blog) => blog.id !== id)
		}
	}

})

export const { appendBlog, setBlogs, plusLikeBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs= () => {
	return async dispatch => {
		const blogs= await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog= (blog) => {
	return async dispatch => {
		const newBlog= await blogService.create(blog)
		dispatch(appendBlog(newBlog))
	}
}

export const addLikeBlog = (id,blogToUpdate) => {

	return async dispatch => {
		const blogChanged= await blogService.update(id,blogToUpdate)
		dispatch(plusLikeBlog(blogChanged.id))
	}
}

export const removeBlog= (id) => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch(deleteBlog(id))
	}
}


export default blogSlice.reducer