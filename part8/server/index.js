const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid} = require('uuid')

const Book= require('./models/book')
const Author= require('./models/author')
const mongoose= require('mongoose')
const book = require('./models/book')


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
			/* console.log('author asked')
			const authorsInDb= await Author.find({})
			console.log('in db', authorsInDb)
			console.log(' root', root.author.toString())
			const author = authorsInDb.find((a) => a._id.toString(0) === root.author.toString())
			console.log(author)
			return author */			
			return Author.findOne({id: root.author})
		},
	},

	Author: {
		bookCount: async (root) => {			
			const booksCount = await Book.find({author: {$in: [root._id]}})			
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
		
    addBook: async (root,args) =>{  
			const newBook= new Book({  
				title: args.title,
				published:args.published,				
				genres: args.genres
			})

      const authorExist = await Author.findOne({name: args.author})
			

			let newAuthor
      if(!authorExist){
				try{
					newAuthor= new Author({name: args.author})
					await newAuthor.save()
				}catch(error){
					throw new UserInputError(error.message,{
						invalidArgs: args
					})
				}
				
      }

			authorExist ? newBook.author= authorExist._id : newBook.author= newAuthor._id
			
			try {
				await newBook.save()	
			} catch (error) {
				throw new UserInputError(error.message, {invalidArgs: args})
			}
      
      return newBook      
    },
    editAuthor: async (root,args) => {
      const authorFinded = await Author.findOne({name: args.name})
			
      if(!authorFinded){
        return null
      }
      authorFinded.born= args.setBornTo
			await authorFinded.save()
      return authorFinded
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
