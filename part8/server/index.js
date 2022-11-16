const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid} = require('uuid')

const Book= require('./models/book')
const Author= require('./models/author')
const mongoose= require('mongoose')
const book = require('./models/book')


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

const MONGODB_URI =
	'mongodb+srv://fullstack:RQbSYMKU6KkqJRWs@cluster0.gbh8rif.mongodb.net/libraryGraphqlApp?retryWrites=true&w=majority'


const JWT_SECRET= 'ESTA ES MI CLAVE SECRETA, DEBE IR EN .ENV FILE' 

console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

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
		genres: [String!]!
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
    genres: [String!]!
    ):Book!
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
  }

`

const resolvers = {
	Book: {
		author:async (root) => {
			/* const authorsInDb= await Author.find({})
			const author = authorsInDb.find((a) => a.name === root.author)
			return author */
			return Author.findOne({name: root.author})
		},
	},

	Author: {
		bookCount: async (root) => {

			const booksCount = await Book.find({author: {$in: [root.name]}})
			return booksCount.length

			/* const booksInDb= await Book.find({})
			const count = booksInDb.reduce((prev, curr) => {
				curr.author === root.name ? (prev = prev + 1) : prev

				return prev
			}, 0)
			return count */
		},
	},

	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {			

			if (!args.author && !args.genre) {
				//return books
				return Book.find({})
			}

			const booksInDb = await Book.find({})

			if (args.author && args.genre) {
				//const filterByAuthor = books.filter(
				const filterByAuthor = booksInDb.filter(
					(book) => book.author === args.author
				)
				const filterByGenres = filterByAuthor.filter((book) => {
					return book.genres.find((genres) => genres === args.genre)
				})
				return filterByGenres
			}
			if (args.author) {
				//const filterByAuthor = books.filter(
				const filterByAuthor = booksInDb.filter(
					(book) => book.author === args.author
				)
				return filterByAuthor
			}
			if (args.genre) {
				const filterByGenres = booksInDb.filter((book) => {
					return book.genres.find((genres) => genres === args.genre)
				})
				return filterByGenres
			}
		},
		allAuthors: async () => Author.find({}),
	},

  Mutation:{
		//TODO I am here
    addBook: async (root,args) =>{      
      //const authorExist = authors.find(author => author.name === args.author)
			console.log('adding book init')
      const authorExist = await Author.findOne({name: args.author})
			console.log('exist?', authorExist)
      if(!authorExist){
        //authors.push({name: args.author, id: uuid()})
				console.log('crear nuevo author')
				const newAuthor= new Author({name: args.author})
				await newAuthor.save()
      }

			const newBook= new Book({ ...args })
			
			try {
				await newBook.save()	
			} catch (error) {
				throw new UserInputError(error.message, {invalidArgs: args})
			}
      
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
