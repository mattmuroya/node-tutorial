const express = require('express');

const app = express(); // creating an instance of an express app

app.listen(3000); // listens for requests on localhost by default

app.get('/', (req, res) => { // listens for GET requests
  // res.send('<p>home page</p>'); // express automatically infers header info and status codes
  res.sendFile('./views/index.html', { root: __dirname }); // second argument object defines the root for the relative path
});

app.get('/about', (req, res) => {
  // res.send('<p>about</p>');
  res.sendFile('./views/about.html', { root: __dirname });
});

// redirects

app.get('/about-us', (req, res) => {
  res.redirect('/about'); // sets redirect code automatically
})

// 404

app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname }); // node will run through file top to bottom until some response gets sent to the brower; if nothing executes to this point then it will get caught by this 'use' call
  //must chain the .status(404) in this case because node does not know this is a 404 response
})