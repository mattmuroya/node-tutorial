const fs = require('fs');

// fs.readFile('./docs/bigboi.txt', (err, data) => {
//   if (err)  {
//     console.log(err);
//   }
//   console.log(data.toString());
// })

// READ/WRITE STREAMS

const readStream = fs.createReadStream('./docs/bigboi.txt', { encoding: 'utf-8' }); // automatically encodes as utf-8 as the chunks come in
const writeStream = fs.createWriteStream('./docs/file4.txt');

// readStream.on('data', (chunk) => { // on is an event listener; here we are listening for a 'data' event
//   console.log('----- NEW CHUNK -----')
//   console.log(chunk)// 'data' events are when we get a chunk of data which we then use to fire the callback
//   writeStream.write('\nNEW CHUNK\n')
//   writeStream.write(chunk);
// });

// PIPING

readStream.pipe(writeStream) // "pipes" content read from readStream into the writeStream