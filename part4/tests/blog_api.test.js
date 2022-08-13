const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User= require('../models/user')
const mongoose = require('mongoose')
const helper = require('./api_helper')

const api = supertest(app)

//Inicializo la base de datos

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  const users= await User.find({})
  const blogs= helper.initialBlogs.map((blog) => ({ ...blog,user: users[0].id }))
  await Blog.insertMany(blogs)
  const blogsSaved= await Blog.find({})
  blogsSaved.forEach((blog) => {
    users[0].blogs= users[0].blogs.concat(blog.id)
  })
  await users[0].save()
  /* const arrayBlogs = helper.initialBlogs.map((blog) => new Blog(blog))
  const arrayPromises = arrayBlogs.map((blog) => blog.save())
  await Promise.all(arrayPromises) */
})


test('delete a single blog post', async () => {
  const blogsAtStart= await helper.blogsInDB()
  const blogToDelete= blogsAtStart[0]
  const userWhoDelete= await User.findById(blogToDelete.user.toString())
  const userCredentials= helper.initialUsers.find(user => user.username === userWhoDelete.username)
  const credentials= {
    username: userCredentials.username,
    password: userCredentials.passwordHash
  }
  console.log(credentials)
  const token= await api
    .post('/api/login')
    .send(credentials)
  console.log(token)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd= await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

/* test('updating info of a single blog post', async () => {
  const blogsAtStart= await helper.blogsInDB()
  const blogPostToUpdate = { ...blogsAtStart[0], likes: 100 }

  await api
    .put(`/api/blogs/${blogPostToUpdate.id}`)
    .send(blogPostToUpdate)
    .expect(200)

  const blogsAtEnd= await helper.blogsInDB()
  const postUpdated= blogsAtEnd.find((blog) => blog.id === blogPostToUpdate.id)
  expect(postUpdated.title).toEqual(blogPostToUpdate.title)
  expect(postUpdated.likes).toEqual(blogPostToUpdate.likes)
}) */

test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  /* const blogsAtEnd= await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) */
}, 100000)

/* test('unique identifier is named id', async () => {
  const blogs = await helper.blogsInDB()
  const blogToCompare = blogs[0]
  expect(blogToCompare.id).toBeDefined()
}) */

/* test('create new blog post', async () => {
  const newBlog = {
    title: 'New blog post',
    author: 'Andres Correa',
    url: 'https://reactpatterns.com/',
    likes: 50,
    __v: 0,
  }
  await api.
    post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd= await helper.blogsInDB()
  const contents= blogsAtEnd.map(ele => ele.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('New blog post')
}) */

/* test('like property is missing and is equal to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Andres Correa',
    url: 'https://reactpatterns.com/',
    __v: 0,
  }

  const blogSaved= await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd= await helper.blogsInDB()
  const contents= blogsAtEnd.map((ele) => ele.title)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  expect(contents).toContain('Blog without likes')
  expect(blogSaved.body.likes).toEqual(0)

}) */

/* test('No title or Url', async () => {
  const newBlogNoTitle = {
    url: 'https://notitle.com/',
    likes: 50,
    __v: 0,
  }

  const newBlogNoURL = {
    title: 'No tengo url',
    likes: 50,
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogNoURL)
    .expect(400)
}) */


afterAll(() => {
  mongoose.connection.close()
})
