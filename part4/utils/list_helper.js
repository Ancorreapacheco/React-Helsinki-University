const _= require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (arrayBlogs) => {
    return arrayBlogs.reduce((acc, actual) => acc + actual.likes, 0)
}

const favoriteBlog = (arrayBlogs) => {
    return arrayBlogs.reduce((acc, actual) => acc.likes > actual.likes ? acc : actual , 0)
}

const mostBlogs = (arrayBlogs) => {
    const data= _.countBy(arrayBlogs, (blog) => blog.author)  
    let blogs= 0
    let authorMost = ""
    for(let author in data){
        authorMost = data[author] > blogs ? author : authorMost 
    }    
    return {author: authorMost, blogs: Number(data[authorMost])}
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
};
