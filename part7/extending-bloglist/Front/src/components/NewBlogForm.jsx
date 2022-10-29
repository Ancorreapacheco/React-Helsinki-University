import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificationFail, setNotificationSuccess } from '../reducers/messageReducer'
import { Button } from 'react-bootstrap'




const NewBlogForm= ({ toggleVisibility }) => {

	const dispatch= useDispatch()
	const [author, setAuthor]= useState('')
	const [title, setTitle] = useState('')
	const [url, setUrl]= useState('')

	const handleTitle= e => {
		setTitle(e.target.value)
	}

	const handleAuthor = e => {
		setAuthor(e.target.value)
	}

	const handleUrl= e => {
		setUrl(e.target.value)
	}

	const handleNewBlog= async e => {
		e.preventDefault()

		try {
			const blogObject= { title,url,author }
			dispatch(createBlog(blogObject))
			setTitle('')
			setAuthor('')
			setUrl('')
			dispatch(setNotificationSuccess(`New Blog Created: ${blogObject.title}`))
			toggleVisibility()
		} catch (error) {
			dispatch(setNotificationFail('Operation Unsuccessfull'))
		}
	}

	return (
		<>
			<h2> New Entry</h2>
			<form onSubmit={handleNewBlog} className='mb-3' >
				<div>
					<label htmlFor="title">Title:</label>
					<input className='form-control' type="text" id="title" value={title} onChange={handleTitle}/>
				</div>
				<div>
					<label htmlFor="author">Author:</label>
					<input className='form-control' type="text" id="author" value={author} onChange={handleAuthor}/>
				</div>
				<div>
					<label htmlFor="url">URL:</label>
					<input className='form-control' type="text" id="url" value={url} onChange={handleUrl}/>
				</div>
				<Button variant='primary' id='btn-save' type='submit'> Create</Button>


			</form>
		</>
	)
}

export default NewBlogForm