import React from 'react'

//React Hooks
import {  useRef } from 'react'

//Components
import LoginForm from './LogInForm'
import NewBlogForm from './NewBlogForm'
import Toggleable from './Toggleable'

//Redux App

import {  useSelector } from 'react-redux'

//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup'

//Router
import { Link } from 'react-router-dom'



export default function Home() {
	const blogFormRef = useRef()

	//Using Redux

	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)

	//----- Handling Options and buttons ---------------



	const toggleVisibility = () => {
		blogFormRef.current.changeVisible()
	}

	//-----------------Render -------------------

	if (user === null) {
		return (
			<>
				<LoginForm />
			</>
		)
	}
	return (
		<div>

			<h2>Blogs</h2>
			<ListGroup>
				{blogs.map((blog) => (
					<ListGroup.Item action key={blog.id}>
						<Link to={`/blogs/${blog.id}`} > {blog.title}</Link>
					</ListGroup.Item>
				))}
			</ListGroup>

			<Toggleable buttonLabel='New Blog Entry' ref={blogFormRef}>
				<NewBlogForm toggleVisibility={toggleVisibility} />
			</Toggleable>
		</div>
	)
}
