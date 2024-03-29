import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  ADD_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,

} from '../graphql/queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
      'AllBooksByGenre'
    ],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, author, published, genres } })

    /* etTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('') */
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <div>
        <form onSubmit={submit}>
          <div>
						title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
						author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
						published
            <input
              type='number'
              value={published}
              onChange={({ target }) => setPublished(Number(target.value))}
            />
          </div>
          <div>
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type='button'>
							add genre
            </button>
          </div>
          <div>genres: {genres.join(' ')}</div>
          <button type='submit'>create book</button>
        </form>
      </div>
    </div>
  )
}

export default NewBook
