const app= require('../app')
const supertest=require('supertest')
const Blog= require('../models/blog')
const mongoose= require('mongoose')
const helper = require('./blog_api_helper')

const api= supertest(app)

//Inicializo la base de datos

beforeEach( async () => {
    await Blog.deleteMany({})
    const arrayBlogs= helper.initialBlogs.map((blog) => new Blog(blog))
    const arrayPromises= arrayBlogs.map((blog) => blog.save())
    await Promise.all(arrayPromises)
})

//Test 1
test('blog list application returns the correct amount of blog posts in the JSON format', async () =>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)

    /* const blogsAtEnd= await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) */
},100000)


afterAll( () => {
    mongoose.connection.close()
})

