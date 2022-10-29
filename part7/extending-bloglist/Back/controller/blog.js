const blogRouter = require('express').Router()
const Blog = require('../models/blog')
//const User= require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blogFound = await Blog.findById(request.params.id)
  if (blogFound) {
    return response.json(blogFound)
  }

  response.statusMessage('ID no encontrado')
  response.status(404).end()
})

//Add new blog
blogRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(400).send({ error: 'Token missing or invalid' })
  }

  if (!title || !url) {
    response.status(400).send({ error: 'No title or url' })
  }

  //const user= await User.findById(decodedToken.id)
  const user = request.user

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id,
  })

  const blogSaved = await blog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()
  response.status(201).json(blogSaved)
})

//Add comments
blogRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id

  const { comment } = request.body
  const blog = await Blog.findById(id)
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user,
    comments: blog.comments.concat(comment)
  }
  //console.log(newBlog)
  const blogSaved = await Blog.findByIdAndUpdate(id, newBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  response.json(blogSaved)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    response.status(400).send({ error: 'Token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).send({ error: 'This blog id does not exist' })
  }
  //const user= await User.findById(decodedToken.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter((ele) => ele.id !== blog.id.toString())
    await user.save()
    return response.status(204).end()
  }
  response
    .status(400)
    .send({ error: 'User Token id is not the same as blog user ID' })
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body
  const blogPost = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user,
  }

  const blogSaved = await Blog.findByIdAndUpdate(request.params.id, blogPost, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  blogSaved
    ?  response.json(blogSaved)
    : response.status(404).end()
})

module.exports = blogRouter
