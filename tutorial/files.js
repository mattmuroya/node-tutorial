const fs = require('fs');

// READING FILES

// fs.readFile('./docs/hello.txt', (err, data) => { // path to file, function to fire when file fetch is complete
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data.toString()); // turns the 'buffer' (data packet) into a string
//   }
// });
// console.log('last line'

// WRITING FILES

// fs.writeFile('./docs/hello.txt', 'new file contents', () => { // replace file contents execute a callback on completion
//   console.log('file was written');
// });

// DIRECTORIES

if (!fs.existsSync('./assets')) { // synchronous method that blocks the execution of more code
  fs.mkdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('folder created');
  });
} else {
  fs.rmdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('folder deleted');
  });
}

// DELETING FILES
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('file deleted');
  });
}