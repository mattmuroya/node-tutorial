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

app.use(morgan('dev')); // third party middleware

// mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res) => { // post a new blog to the DB
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });

//   (async () => {
//     try {
//       const result = await blog.save(); // saves to the database
//       res.send(result); // send it to the browser (just to review it);
//       console.log('blog saved');
//     } catch (err) {
//       console.log(err);
//     }
//   })();
// });

// app.get('/all-blogs', (req, res) => {
//   (async () =>  {
//     try {
//       const result = await Blog.find(); // find all blogs
//       res.send(result);
//     } catch (err) {
//       console.log(err);
//     }
//   })();
// });

// app.get('/single-blog', (req, res) => {
//   (async () =>  {
//     try {
//       const result = await Blog.findById('62381606118e20fd9de2db4f'); // find a single blog (mongoose handles conversion to/from string)
//       res.send(result);
//     } catch (err) {
//       console.log(err);
//     }
//   })();
// });

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

// 404

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});