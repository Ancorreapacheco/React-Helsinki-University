const blogRouter = require("express").Router();
const Blog= require('../models/blog')

blogRouter.get("/", (request, response,next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  })
  .catch(error => next(error));
});

blogRouter.post("/", (request, response, next) => {
  
  const { title, author, url, likes }= request.body
  
  if(!title){
    response.status(404).send({error:'No title'})
  }

  const blog = new Blog({
    title: title,
    author:author,
    url:url,
    likes:likes
  });

  blog.save().then((result) => {
    response.status(201).json(result);
  })
  .catch(error => next(error));
});


module.exports= blogRouter