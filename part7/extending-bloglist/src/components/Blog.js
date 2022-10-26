import { useState } from 'react'
import PropTypes from 'prop-types'
import { addLikeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
	setNotificationFail,
	setNotificationSuccess,
} from '../reducers/messageReducer'

const Blog = ({ blog }) => {
	const [blogVisible, setBlogVisible] = useState(false)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)


	const handleBlogVisible = () => {
		setBlogVisible(!blogVisible)
	}

	const updatingBlog = async () => {
		try {
			const blogTochange = { ...blog, likes: blog.likes + 1 }
			dispatch(addLikeBlog(blogTochange.id, blogTochange))
			dispatch(
				setNotificationSuccess(`Plus Like to ${blogTochange.title}`)
			)
		} catch (error) {
			dispatch(setNotificationFail('Operation Unsuccessfull'))
		}
	}

	const removingBlog = () => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
			try {
				dispatch(removeBlog(blog.id))
				dispatch(setNotificationSuccess(`Deleted: ${blog.title}`))
			} catch (error) {
				dispatch(setNotificationFail('Operation Unsuccessfull'))
			}
		}
		return
	}

	//Style
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const buttonName = blogVisible ? 'Hide' : 'View'

	return blogVisible ? (
		<div style={blogStyle} className='blog'>
			<p>
				{blog.title}
				<button onClick={handleBlogVisible} id='btn-visible'>
					{buttonName}
				</button>
			</p>
			<p>{blog.url}</p>
			<p id='cantLikes'>
				{blog.likes}
				<button onClick={updatingBlog} className='btnLike'>
					likes
				</button>
			</p>
			<p>{blog.author} </p>
			{user.userID === blog.user ? (
				<button onClick={removingBlog} className='btn-remove'>
					Remove
				</button>
			) : (
				''
			)}
		</div>
	) : (
		<div style={blogStyle}>
			{blog.title} by {blog.author}
			<button onClick={handleBlogVisible} className='btnView'>
				{buttonName}
			</button>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
}

export default Blog
