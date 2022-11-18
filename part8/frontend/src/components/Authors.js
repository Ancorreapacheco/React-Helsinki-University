import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from '../graphql/queries'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [authorName, setAuthorName] = useState('')
  const [authorBorn, setAuthorBorn] = useState('')

  const handleDropDownAuthor = (e) => {
    setAuthorName(e.value)
    setAuthorBorn(Number(e.born))
  }

  const handleChangeAuthorBorn = (e) => {
    e.preventDefault()
    editAuthor({
      variables: {
        name: authorName,
        setBornTo: authorBorn,
      },
    })
    setAuthorBorn('')
    setAuthorName('')
  }

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div> Loading content</div>
  }

  const authorsOptions = authors.data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
    born: author.born,
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td >{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Set birth of year</h2>
        <form onSubmit={handleChangeAuthorBorn}>
          <div>
            <Select onChange={handleDropDownAuthor} options={authorsOptions} />
          </div>
          <div>
            <label htmlFor='authorBirth'>Author Birth</label>
            <input
              type='Number'
              id='authorBirth'
              value={authorBorn}
              onChange={({ target }) => setAuthorBorn(Number(target.value))}
            />
          </div>

          <button type='submit'>Set Birth</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
