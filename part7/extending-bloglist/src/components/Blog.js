import PropTypes from 'prop-types'
import { addLikeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
	setNotificationFail,
	setNotificationSuccess,
} from '../reducers/messageReducer'

//Bootstrap
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

//Router
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
	const navigate= useNavigate()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	const updatingBlog = async (e) => {
		e.preventDefault()
		try {
			const blogTochange = { ...blog, likes: blog.likes + 1 }
			console.log(blogTochange)
			dispatch(addLikeBlog(blogTochange.id, blogTochange))
			dispatch(setNotificationSuccess(`Plus Like to ${blogTochange.title}`))
		} catch (error) {
			dispatch(setNotificationFail('Operation Unsuccessfull'))
		}
	}

	const removingBlog = () => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
			try {
				dispatch(removeBlog(blog.id))
				dispatch(setNotificationSuccess(`Deleted: ${blog.title}`))
				navigate('/')
			} catch (error) {
				dispatch(setNotificationFail('Operation Unsuccessfull'))
			}
		}
		return
	}

	if (!blog) {
		return null
	}

	return (
		<div>
			<Card>
				<Card.Header as='h2'>{blog.title}</Card.Header>
				<Card.Body>
					<Card.Title as='h6'>Added by {blog.author} </Card.Title>
					<Card.Text>{blog.url}</Card.Text>
					<p>
						{' '}
						Likes: <Badge> {blog.likes} </Badge>{' '}
					</p>
					<Button variant='primary' onClick={updatingBlog}>
						Add Like
					</Button>
				</Card.Body>
				{user.userID === blog.user ? (
					<Card.Footer>
						<Button variant='danger' onClick={removingBlog} >
						Remove
						</Button>

					</Card.Footer>
				) : (
					''
				)}
			</Card>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Blog
