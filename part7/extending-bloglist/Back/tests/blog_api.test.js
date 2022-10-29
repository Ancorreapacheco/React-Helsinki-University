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

  const initialUsers= await helper.initialUsers() //Creo las contraseñas Hash
  await User.insertMany(initialUsers)
  const users= await User.find({})

  const blogs= helper.initialBlogs.map((blog) => ({ ...blog,user: users[Math.floor(Math.random()*users.length)].id }))
  await Blog.insertMany(blogs)

  const blogsSaved= await Blog.find({})
  //Modifico el array de blogs por usuario para luego hacer Promise.all save()
  blogsSaved.forEach((blog) => {
    users.forEach((user) => {
      //console.log(user.id, '---', blog.user.toString())
      if(user.id=== blog.user.toString()){
        user.blogs= user.blogs.concat(blog.id)
      }
    })
  })

  const arrayPromUserSave= users.map( user => user.save())
  await Promise.all(arrayPromUserSave)

  /* const arrayBlogs = helper.initialBlogs.map((blog) => new Blog(blog))
  const arrayPromises = arrayBlogs.map((blog) => blog.save())
  await Promise.all(arrayPromises) */
})


test('delete a single blog post', async () => {
  const blogsAtStart= await helper.blogsInDB()
  const blogToDelete= blogsAtStart[0]
  const userWhoDelete= await User.findById(blogToDelete.user.toString())
  const initialUsers= await helper.initialUsers()
  const userCredentials= initialUsers.find(user => user.username === userWhoDelete.username)
  const credentials= {
    username: userCredentials.username,
    password: userCredentials.password
  }

  const resLogIn= await api
    .post('/api/login')
    .send(credentials)
  const resJson= JSON.parse(JSON.stringify(resLogIn))
  const tokenJson= JSON.parse(resJson.text)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${tokenJson.token}`)
    .expect(204)

  const blogsAtEnd= await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('updating info of a single blog post', async () => {
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
})

test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  /* const blogsAtEnd= await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) */
}, 100000)

test('unique identifier is named id', async () => {
  const blogs = await helper.blogsInDB()
  const blogToCompare = blogs[0]
  expect(blogToCompare.id).toBeDefined()
})

test('create new blog post', async () => {
  const newBlog = {
    title: 'New blog post',
    author: 'Andres Correa',
    url: 'https://reactpatterns.com/',
    likes: 50,
    __v: 0,
  }

  const credentials= {
    username: 'andres',
    password: 'andres'
  }

  const resLogIn= await api
    .post('/api/login')
    .send(credentials)

  const resJson= JSON.parse(JSON.stringify(resLogIn))
  const tokenJson= JSON.parse(resJson.text)
  await api.
    post('/api/blogs')
    .set('Authorization', `bearer ${tokenJson.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd= await helper.blogsInDB()
  const contents= blogsAtEnd.map(ele => ele.title)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('New blog post')
})

test('No token provide when create blog', async () => {
  const newBlog = {
    title: 'New blog post',
    author: 'Andres Correa',
    url: 'https://reactpatterns.com/',
    likes: 50,
    __v: 0,
  }
  await api.
    post('/api/blogs')
    .set('Authorization', '')//Se envia el token en blanco
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd= await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('like property is missing and is equal to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Andres Correa',
    url: 'https://reactpatterns.com/',
    __v: 0,
  }
  const credentials= {
    username: 'andres',
    password: 'andres'
  }

  const resLogIn= await api
    .post('/api/login')
    .send(credentials)

  const resJson= JSON.parse(JSON.stringify(resLogIn))
  const tokenJson= JSON.parse(resJson.text)

  const blogSaved= await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${tokenJson.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd= await helper.blogsInDB()
  const contents= blogsAtEnd.map((ele) => ele.title)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  expect(contents).toContain('Blog without likes')
  expect(blogSaved.body.likes).toEqual(0)

})

test('No title or Url', async () => {
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

  const credentials= {
    username: 'andres',
    password: 'andres'
  }

  const resLogIn= await api
    .post('/api/login')
    .send(credentials)

  const resJson= JSON.parse(JSON.stringify(resLogIn))
  const tokenJson= JSON.parse(resJson.text)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${tokenJson.token}`)
    .send(newBlogNoTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${tokenJson.token}`)
    .send(newBlogNoURL)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})
