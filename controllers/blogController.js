const Blog = require('../models/blog');

const blog_index = (req, res) => {
  (async () => {
    try {
      const result = await Blog.find().sort({ createdAt: -1 });
      res.render('blogs/index', { title: 'All Blogs', blogs: result }); // renders index.ejs from views folder
    } catch (err) {
      console.log(err);
    }
  })();
};

const blog_details = (req, res) => {
  const id = req.params.id;
  (async () => {
    try {
      const result = await Blog.findById(id);
      res.render('blogs/details', { title: 'Blog Details', blog: result }); // renders details.ejs from views folder
    } catch (err) {
      res.status(404).render('404', { title: 'Blog not found' });
    }
  })();
};

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create New Blog' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  (async () => {
    try {
      const result = await blog.save();
      res.redirect('./blogs');
    } catch (err) {
      console.log(err);
    }
  })();
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  (async () => {
    try {
      const result = await Blog.findByIdAndDelete(id);
      res.json({ redirect: '/blogs' })
    } catch (err) {
      console.log(err);
    }
  })();
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};