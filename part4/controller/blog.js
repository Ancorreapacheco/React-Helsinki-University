const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title) {
    response.status(404).send({ error: "No title" });
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });

  const blogSaved = await blog.save();

  response.status(201).json(blogSaved);
});

module.exports = blogRouter;
