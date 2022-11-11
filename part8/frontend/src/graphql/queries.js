import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
			id
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			author {
				name
			}
			id
		}
	}
`

//----------------------------------MUTATIONS-------------------------
export const ADD_BOOK = gql`
	mutation addBook ($title: String!, $author: String!, $published: Int!) {
		addBook(title: $title, author: $author, published: $published) {
			title
			published
			author {
				name
			}
		}
	}
`

export const EDIT_AUTHOR_BORN = gql`
mutation editAuthorYearBorn($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
  name  
  }
}
`
