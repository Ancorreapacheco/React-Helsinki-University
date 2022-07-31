const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const helper = require('./blog_api_helper');

const api = supertest(app);

//Inicializo la base de datos

beforeEach(async () => {
  await Blog.deleteMany({});
  const arrayBlogs = helper.initialBlogs.map((blog) => new Blog(blog));
  const arrayPromises = arrayBlogs.map((blog) => blog.save());
  await Promise.all(arrayPromises);
});

//Test 1
test('blog list application returns the correct amount of blog posts in the JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  /* const blogsAtEnd= await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) */
}, 100000);

test('unique identifier is named id', async () => {
  const blogs = await helper.blogsInDB();
  const blogToCompare = blogs[0];
  expect(blogToCompare.id).toBeDefined();
});

test('create new blog post', async () => {
  const newBlog = {
    title: 'New blog post',
    author: 'Andres Correa',
    url: 'https://reactpatterns.com/',
    likes: 50,
    __v: 0,
  };
  await api.
    post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd= await helper.blogsInDB();
  const contents= blogsAtEnd.map(ele => ele.title);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain('New blog post');
});

test('like property is missing and is equal to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Andres Correa',
    url: 'https://reactpatterns.com/',
    __v: 0,
  };

  const blogSaved= await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd= await helper.blogsInDB();
  const contents= blogsAtEnd.map((ele) => ele.title);
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1);
  expect(contents).toContain('Blog without likes');
  expect(blogSaved.body.likes).toEqual(0);

});

test('No title or Url', async () => {
  const newBlogNoTitle = {
    url: 'https://notitle.com/',
    likes: 50,
    __v: 0,
  };

  const newBlogNoURL = {
    title: 'No tengo url',
    likes: 50,
    __v: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400);

  await api
    .post('/api/blogs')
    .send(newBlogNoURL)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
