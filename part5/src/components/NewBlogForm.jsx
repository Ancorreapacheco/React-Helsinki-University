import { useState } from 'react'

const NewBlogForm= ({ addBlog }) => {

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
    const blogObject= { title,url,author }
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2> New Entry</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitle}/>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" value={author} onChange={handleAuthor}/>
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input type="text" id="url" value={url} onChange={handleUrl}/>
        </div>
        <button id='btn-save'> Create</button>


      </form>
    </>
  )
}

export default NewBlogForm