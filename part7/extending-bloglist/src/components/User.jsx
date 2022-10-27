import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

export default function User({ user }) {

	if(!user){
		return null
	}

	return (
		<>
			<h2>{user.name}</h2>
			<h3>Added Blogs</h3>

			<ListGroup>
				{user.blogs.map((blog) => <ListGroup.Item key={blog.id}> <Link to={`/blogs/${blog.id}`} > {blog.title}</Link> </ListGroup.Item>)}
			</ListGroup>


		</>
	)
}
