import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../graphql/queries'
import { useState } from 'react'

const Books = (props) => {

  const [genreFilter, setGenreFilter] = useState('all genres')

  const books= useQuery(ALL_BOOKS)

  const booksFiltered= useQuery(ALL_BOOKS_BY_GENRE,{
    variables: { genre:genreFilter }
  })

  const booksToShow= genreFilter === 'all genres' ? books : booksFiltered

  if (!props.show) {
    return null
  }

  if(booksToShow.loading){
    return(<div> Loading Content</div>)
  }

  const genresList = books.data.allBooks.reduce((prev,curr) => {
    curr.genres.map(genre => prev.includes(genre) ? null : prev.push(genre) )
    return prev
  },['all genres'])



  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>Generes</th>
          </tr>
          {booksToShow.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.reduce((prev,curr) => prev + ', ' + curr )}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Filter Your Books</h2>
      {genresList.map(genre => <button key={genre} onClick={() => setGenreFilter(genre)}> {genre} </button>)}
    </div>
  )
}

export default Books
