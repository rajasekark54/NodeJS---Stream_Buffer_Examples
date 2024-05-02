const fs = require('fs');
// Creating a readable stream from a file
// highWaterMark -> default chuck is 16KB. It will vary system to sytem
// highWaterMark -> We can overwrite it by passing this.

const filePath = './data/input.txt';
const readableStream = fs.createReadStream(filePath, {
  // highWaterMark: 1024,
  encoding: 'utf-8',
});

// Handling 'data' event to read data from the stream
readableStream.on('data', (chunk) => {
  console.log('Received chunk of data:', chunk.length);
  // console.log(chunk);
});

// Handling 'end' event to indicate end of data stream
readableStream.on('end', () => {
  console.log('End of stream');
});

// Handling 'error' event to handle any errors that occur during reading
readableStream.on('error', (err) => {
  console.error('Error reading data:', err);
});
