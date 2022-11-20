const {  UserInputError, AuthenticationError } = require('apollo-server')

const Book = require('./models/book')
const Author = require('./models/author')
const User= require('./models/user')

const jwt= require('jsonwebtoken')
const JWT_SECRET = 'ESTA ES MI CLAVE SECRETA, DEBE IR EN .ENV FILE'

//For subcription
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

let booksInDb
const resolvers = {
  Book: {
    author: async (root) => {
      /* console.log('author asked')
			const authorsInDb= await Author.find({})
			console.log('in db', authorsInDb)
			console.log(' root', root.author.toString())
			const author = authorsInDb.find((a) => a._id.toString(0) === root.author.toString())
			console.log(author)
			return author */
      return Author.findById(root.author)
      //return Author.findOne({ id: root.author })
    },
  },

  Author: {
    bookCount: async (root) => {

      return booksInDb.filter(book => String(book.author) === String(root._id)).length

      //The below part cause a n+1 error
      /* const booksCount = await Book.find({ author: { $in: [root._id] } })

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

      booksInDb = await Book.find({})

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
    allAuthors: async () => {
      booksInDb = await Book.find({})
      return Author.find({})},
    me: (root,args,context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser){
        throw new AuthenticationError('Not Authenticated')
      }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
      })

      const authorExist = await Author.findOne({ name: args.author })

      let newAuthor
      if (!authorExist) {
        try {
          newAuthor = new Author({ name: args.author })
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError('user error')
        }
      }

      authorExist
        ? (newBook.author = authorExist._id)
        : (newBook.author = newAuthor._id)

      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      //Suscription
      pubsub.publish('BOOK_ADDED', { bookAdded : newBook })

      return newBook
    },
    editAuthor: async (root, args, { currentUser }) => {

      if(!currentUser){
        throw new AuthenticationError('Not Authenticated')
      }

      const authorFinded = await Author.findOne({ name: args.name })

      if (!authorFinded) {
        return null
      }
      authorFinded.born = args.setBornTo
      await authorFinded.save()
      return authorFinded
    },

    createUser: async (root,args) => {
      const newUser= new User({ ...args })

      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message,{
          invalidArgs: args
        })
      }

      return newUser
    },

    login: async (root,args) => {
      const userFound= await User.findOne({ username: args.username })
      if(!userFound || args.password !== 'secret'){
        throw new UserInputError('Wrong Credentials')
      }

      const userForToken= {
        username: userFound.username,
        id: userFound._id
      }
      const token= {
        value: jwt.sign(userForToken,JWT_SECRET)
      }
      return token

    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  }
}

module.exports= resolvers