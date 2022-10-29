import PropTypes from 'prop-types'

//Redux
import { addLikeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
	setNotificationFail,
	setNotificationSuccess,
} from '../reducers/messageReducer'

//Bootstrap
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
//import { ListGroup } from 'react-bootstrap'

//Router
import { useNavigate } from 'react-router-dom'

//Curton Hooks
import { useField } from '../hooks'

const Blog = ({ blog }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const addCommentField= useField('text','newComment')

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

	const handleAddComment = e => {
		e.preventDefault()
		dispatch(addComment(blog.id, addCommentField.value ))
	}

	if (!blog) {
		return null
	}

	return (
		<>
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
							<Button variant='danger' onClick={removingBlog}>
								Remove
							</Button>
						</Card.Footer>
					) : (
						''
					)}
				</Card>
			</div>
			<div>
				<h3>Comments</h3>
				<form onSubmit={handleAddComment}>
					<label htmlFor="">Add a coment</label>
					<input { ...addCommentField } className='form-control'  />
					<Button variant='primary' type='submit'> Add Comment </Button>
				</form>
				{blog.comments.length <= 0 ? (
					<p>No comments so far</p>
				) : (
					<ul>
						{blog.comments.map((comment, ind) => (<li key={ind}> {comment} </li>))}
					</ul>
				)}
			</div>
		</>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Blog
