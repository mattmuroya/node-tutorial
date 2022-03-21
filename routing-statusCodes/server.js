const http = require('http'); // import http module
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => { // creates instance of server in server variable; req object contains info about the request; res object used to send response to the user
  // console.log(req.url, req.method) // this callback runs every time a request is made to this server

  //lodash
  const num = _.random(0,20); // get random number between 20 and 20
  console.log(num);

  const greet = _.once(() => {
    console.log('once');
  });

  greet();
  greet(); // only gets logged once (per server start)

  //

  res.setHeader('Content-Type', 'text/html'); // set header content type for content being sent back to browser

  let path = './views/'; // get the URL from the request
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200; // setting the status code to send back; 200 = everything is ok
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.setHeader('Location', '/about'); // redirect
      res.statusCode = 301; // 'resource has been permanently moved'
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404; // resource doesn't exist
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data); // if writing multiple things, use res.write(data1); res.write(data2); etc etc and then res.end();
    }
  });
});

server.listen(3000, 'localhost', () => { // server must listen for incoming requests; takes in port number to listen to; 'localhost' name is default but can be specified
  console.log('now listening for requests on port 3000') // callback fires when the server starts listening.
});