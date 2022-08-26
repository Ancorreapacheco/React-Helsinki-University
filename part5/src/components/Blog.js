import { useState } from "react"

const Blog = ({blog}) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const handleBlogVisible= () =>{
    setBlogVisible(!blogVisible)
  }

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
                    <p>{blog.likes} <button > Like </button> </p>
                    <p>{blog.author} </p>
                  </div>   
                : <div style={blogStyle}>
                    {blog.title}  <button onClick={handleBlogVisible}> {buttonName} </button>
                  </div>
  )

}


export default Blog