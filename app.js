const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express(); // creating an instance of an express app

// mongoDB connection string

dotenv.config();

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6ewiu.mongodb.net/node-tutorial?retryWrites=true&w=majority`;

(async () => {
  try {
      await mongoose.connect(dbURI);
      console.log('MongoDB connected');
      app.listen(3000); // lisen after connecting to DB
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
})();

// register view engine

app.set('view engine', 'ejs'); 

// middleware & static files

app.use((req, res, next) => {
  console.log('---new request made---');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method:', req.method);
  next(); // need to explicitly tell express to move onto the next middleware block;
})

app.use(express.static('public')); // anything inside 'public' folder will be accessible by the browser
app.use(express.urlencoded({ extended: true })); // allows us to get form data from client
app.use(morgan('dev')); // third party middleware

// routes/renders

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create New Blog' });
});

app.get('/blogs', (req, res) => {
  (async () => {
    try {
      const result = await Blog.find().sort({ createdAt: -1 });
      res.render('index', { title: 'All Blogs', blogs: result }); // renders index.ejs from views folder
    } catch (err) {
      console.log(err);
    }
  })();
});

app.post('/blogs', (req, res) => { // create new blogs
  const blog = new Blog(req.body);
  (async () => {
    try {
      const result = await blog.save();
      res.redirect('./blogs');
    } catch (err) {
      console.log(err);
    }
  })();
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  (async () => {
    try {
      const result = await Blog.findById(id);
      res.render('details', { title: 'Blog Details', blog: result }); // renders details.ejs from views folder
    } catch (err) {
      console.log(err);
    }
  })();
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  (async () => {
    try {
      const result = await Blog.findByIdAndDelete(id);
      res.json({ redirect: '/blogs' })
    } catch (err) {
      console.log(err);
    }
  })();
});

// 404

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});