import { gql } from '@apollo/client'

//------------------------QUERIES
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
			genres
			author {
				name
			}
			id
		}
	}
`

export const ALL_BOOKS_BY_GENRE = gql`
	query AllBooksByGenre($genre: String) {
		allBooks(genre: $genre) {
			title
			published
			genres
			author {
				name
			}
			id
		}
	}
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
