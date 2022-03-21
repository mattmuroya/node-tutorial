const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

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

// routes/renders

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes); // prepended url, imported file

// 404

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});