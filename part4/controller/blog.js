const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User= require('../models/user')
const jwt= require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {

  const blogFound= await Blog.findById(request.params.id)
  if(blogFound){
    return response.json(blogFound)
  }

  response.statusMessage('ID no encontrado')
  response.status(404).end()
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const decodedToken= jwt.decode(request.token,process.env.SECRET)

  if(!decodedToken.id){
    return response.status(400).send({ error: 'Token missing or invalid' })
  }

  if (!title || !url) {
    response.status(400).send({ error: 'No title or url' })
  }

  const user= await User.findById(decodedToken.id)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id
  })

  const blogSaved = await blog.save()
  user.blogs= user.blogs.concat(blogSaved._id)
  await user.save()
  response.status(201).json(blogSaved)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blogPost = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const blogSaved= await Blog.findByIdAndUpdate(request.params.id,blogPost,{
    new:true,
    runValidators:true,
    context:'query'
  })

  response.json(blogSaved)
})

module.exports = blogRouter
