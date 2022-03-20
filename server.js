const http = require('http'); // import http module

const server = http.createServer((req, res) => { // creates instance of server in server variable; req object contains info about the request; res object used to send response to the user
  console.log('request received') // this callback runs every time a request is made to this server
});

server.listen(3000, 'localhost', () => { // server must listen for incoming requests; takes in port number to listen to; 'localhost' name is default but can be specified
  console.log('now listening for requests on port 3000') // callback fires when the server starts listening.
});