const fs = require('fs');

// Creating a writable stream to a file
const filePath = './data/output.txt';
const writableStream = fs.createWriteStream(filePath);

// Writing data to the writable stream
writableStream.write('Hello, world!\n');
writableStream.write('This is a test.\n');
writableStream.write('Goodbye!\n');

// Ending the writable stream
writableStream.end();

// Handling 'finish' event to indicate the end of writing
writableStream.on('finish', () => {
  console.log('Data has been written to output.txt');
});

// Handling 'error' event to handle any errors that occur during writing
writableStream.on('error', (err) => {
  console.error('Error writing data:', err);
});
