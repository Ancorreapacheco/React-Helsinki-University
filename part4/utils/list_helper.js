const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (arrayBlogs) => {
  return arrayBlogs.reduce((acc, actual) => acc + actual.likes, 0);
};

const favoriteBlog = (arrayBlogs) => {
  return arrayBlogs.reduce(
    (acc, actual) => (acc.likes > actual.likes ? acc : actual),
    0
  );
};

const mostBlogs = (arrayBlogs) => {
  const data = _.countBy(arrayBlogs, (blog) => blog.author);
  let blogs = 0;
  let authorMost = "";
  for (let author in data) {
    authorMost = data[author] > blogs ? author : authorMost;
  }
  return { author: authorMost, blogs: Number(data[authorMost]) };
};

const authorMostLikes = (arrayBlogs) => {
  /* const data= arrayBlogs.reduce((acc,cur) => ({
    ...acc,
    [cur.author]: (acc[cur.author] || 0) + cur.likes,
  }), {}) */
  //Esto es lo mismo que el código comentado arriba

  const data = arrayBlogs.reduce((acc, cur) => { // Sumo por autor los likes
    return {
      ...acc,
      [cur.author]: (acc[cur.author] || 0) + cur.likes,
    };
  }, {});

  const result = Object.keys(data).map((ele) => {
    return {
      author: ele,
      likes: Number(data[ele]),
    };
  });
  const mayor = _.maxBy(result, "likes");
  return mayor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  authorMostLikes,
};
