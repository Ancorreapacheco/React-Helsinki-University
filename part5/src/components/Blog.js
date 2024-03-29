import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const handleBlogVisible= () => {
    setBlogVisible(!blogVisible)
  }

  const updatingBlog = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    updateBlog(blogToUpdate.id,blogToUpdate)
  }

  const removingBlog = () => {
    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)){
      removeBlog(blog.id)
    }
    return
  }

  //Style
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonName= blogVisible ? 'Hide' : 'View'

  return(
    blogVisible ? <div style={blogStyle} className='blog'>
      <p>{blog.title}  <button onClick={handleBlogVisible} id="btn-visible"> {buttonName} </button> </p>
      <p>{blog.url}</p>
      <p id='cantLikes'>{blog.likes} <button onClick={updatingBlog} className='btnLike' > Like </button> </p>
      <p>{blog.author} </p>
      {user.userID === blog.user ? <button onClick={removingBlog} className="btn-remove" > Remove </button> : ''}
    </div>
      : <div style={blogStyle}>
        {blog.title} by {blog.author}  <button onClick={handleBlogVisible} className='btnView'> {buttonName} </button>
      </div>
  )

}


Blog.propTypes ={
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired

}

export default Blog