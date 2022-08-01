const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    response.status(400).send({ error: 'No title or url' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  })

  const blogSaved = await blog.save()

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
