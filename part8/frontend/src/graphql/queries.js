import { gql } from '@apollo/client'


//-----------------FRAGMENTS------------------------

const BOOKS_DETAILS = gql`
  fragment BooksDetails on Book {
      title
			published
			genres
			author {
				name
			}
			id
  }
`
//------------------------QUERIES----------------------------
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
			...BooksDetails
		}
	}
  ${BOOKS_DETAILS}
`
/* export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			genres
			author {
				name
			}
			id
		}
	}
` */

export const ALL_BOOKS_BY_GENRE = gql`
	query AllBooksByGenre($genre: String) {
		allBooks(genre: $genre) {
			...BooksDetails
		}
	}
  ${BOOKS_DETAILS}
`

//----------------------------------MUTATIONS-------------------------
export const ADD_BOOK = gql`
	mutation addBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
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

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const ME = gql`
	query {
		me {
			favouriteGenre
		}
	}
`

//---------------SUBSCRIPTIONS--------------------
export const BOOK_ADDED = gql`
  subscription{
    bookAdded{
      ...BooksDetails
    }
  }
  ${BOOKS_DETAILS}
`