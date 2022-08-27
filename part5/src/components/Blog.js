import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const handleBlogVisible= () =>{
    setBlogVisible(!blogVisible)
  }

  const updatingBlog = () =>{
    const blogToUpdate = { ...blog, likes: blog.likes + 1}
    updateBlog(blogToUpdate.id,blogToUpdate)
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
    blogVisible ? <div style={blogStyle}>
                    <p>{blog.title}  <button onClick={handleBlogVisible}> {buttonName} </button> </p>
                    <p>{blog.url}</p>
                    <p>{blog.likes} <button onClick={updatingBlog}  > Like </button> </p>
                    <p>{blog.author} </p>
                  </div>   
                : <div style={blogStyle}>
                    {blog.title}  <button onClick={handleBlogVisible}> {buttonName} </button>
                  </div>
  )

}


export default Blog