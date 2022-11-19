import { ME, ALL_BOOKS_BY_GENRE } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const Recommendations = (props) => {
  const user = useQuery(ME)
  //Wait for genre to wait untill query books, using skip parameter
  const genre = user?.data?.me?.favouriteGenre
  console.log(genre)

  const books = useQuery(ALL_BOOKS_BY_GENRE, {
    skip: !genre,
    variables: { genre },
  })

  //const [booksRecommended, setBooksRecommended] = useState([])
  if (!props.show) {
    return null
  }

  if (user.loading || books.loading) {
    return <div> Loading Info</div>
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>Books in your favourite genre <span>pattern</span>: {genre} </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>Generes</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.reduce((prev, curr) => prev + ', ' + curr)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
