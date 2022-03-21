const express = require('express');

const app = express(); // creating an instance of an express app

// register view engine

app.set('view engine', 'ejs');

// listen

app.listen(3000);

// renders

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi Finds Eggs', snippet: 'Lorem ipsum dolor sit amet consectetur.'},
    {title: 'Mario Finds Stars', snippet: 'Lorem ipsum dolor sit amet consectetur.'},
    {title: 'How to Defeat Bowser', snippet: 'Lorem ipsum dolor sit amet consectetur.'},
  ];
  res.render('index', { title: 'Home', blogs }); // renders index.ejs from views folder
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create New Blog' });
});

// 404

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
})