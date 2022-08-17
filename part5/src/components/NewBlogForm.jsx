const NewBlogForm= ({props}) =>{

  const { handleNewBlog, title, handleTitle, author, handleAuthor, url, handleUrl} = props

  return (
    <>
    <h2> New Entry</h2>
    <form onSubmit={handleNewBlog}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="text" value={title} onChange={handleTitle}/>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={handleAuthor}/>
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input type="text" id="url" value={url} onChange={handleUrl}/>
      </div>
      <button> Create</button>


    </form>
    </>
  )
}

export default NewBlogForm