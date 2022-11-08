const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid} = require('uuid')

let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963,
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821,
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
	},
]

/*
  * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro
 en lugar del nombre del autor. Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design', 'refactoring'],
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns'],
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design'],
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime'],
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution'],
	},
]

//Defining Schema

const typeDefs = gql`
	type Author {
		name: String
		id: ID!
		born: Int
		bookCount: Int
	}

	type Book {
		title: String
		published: Int!
		author: Author!
		id: ID
		genres: [String]!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author:String, genre:String): [Book]!
		allAuthors: [Author]
	}

  type Mutation{
    addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String]
    ):Book
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
  }

`

const resolvers = {
	Book: {
		author: (root) => {
			const author = authors.find((a) => a.name === root.author)
			return author
		},
	},

	Author: {
		bookCount: (root) => {
			const count = books.reduce((prev, curr) => {
				curr.author === root.name ? (prev = prev + 1) : prev

				return prev
			}, 0)
			return count
		},
	},

	Query: {
		bookCount: () => books.length,
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			console.log(args.author, '$$', args.genre)

			if (!args.author && !args.genre) {
				return books
			}
			if (args.author && args.genre) {
				const filterByAuthor = books.filter(
					(book) => book.author === args.author
				)
				const filterByGenres = filterByAuthor.filter((book) => {
					return book.genres.find((genres) => genres === args.genre)
				})
				return filterByGenres
			}
			if (args.author) {
				const filterByAuthor = books.filter(
					(book) => book.author === args.author
				)
				return filterByAuthor
			}
			if (args.genre) {
				const filterByGenres = books.filter((book) => {
					return book.genres.find((genres) => genres === args.genre)
				})
				return filterByGenres
			}
		},
		allAuthors: () => authors,
	},

  Mutation:{
    addBook:(root,args) =>{      
      const authorExist = authors.find(author => author.name === args.author)
      if(!authorExist){
        authors.push({name: args.author, id: uuid()})
      }

      const newBook= {...args, id:uuid()}
      books= books.concat(newBook)
      return newBook      
    },
    editAuthor:(root,args) => {
      const authorFinded = authors.find(author => author.name === args.name)
      if(!authorFinded){
        return null
      }
      const authorModified = {...authorFinded, born: args.setBornTo}
      authors= authors.map((author) => author.name === args.name ? authorModified : author )
      return authorModified
    }
  }
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
