const { Duplex } = require('stream');
const fs = require('fs');

/* 
In a Duplex stream, the control over reading data is already present, but you can't directly control the chunk size as you would with a Readable stream's highWaterMark option. 
Writing the logic we can chunk the data inside the read function.

When a Duplex stream is created without implementing the _read method:

If you start piping data into the stream, it will be buffered internally, and there's no control over how much data is buffered.
The consuming side (e.g., when piping to a Writable stream or attaching a 'data' event handler) will read as much data as it needs from the buffer.
The default behavior can lead to buffering all incoming data in memory, which might not be efficient for large datasets.
*/

function createFileDuplexStream(inputFile, outputFile) {
  return new Duplex({
    read(size) {
      // Read data from the input file and push it into the stream
      fs.readFile(inputFile, (err, data) => {
        if (err) {
          this.emit('error', err);
          return;
        }
        this.push(data);
        this.push(null); // End of file
      });
    },
    write(chunk, encoding, callback) {
      // Write data to the output file
      fs.appendFile(outputFile, chunk, (err) => {
        if (err) {
          this.emit('error', err);
          return;
        }
        console.log('write chunk');
        callback();
      });
    },
  });
}

// Usage example:
const inputFile = './data/input.txt';
const outputFile = './data/output.txt';

const fileDuplexStream = createFileDuplexStream(inputFile, outputFile);

// Read data from the Duplex stream and write to output.txt
fileDuplexStream.pipe(process.stdout); // Output to console
fileDuplexStream.pipe(fs.createWriteStream(outputFile)); // Output to file

// Handle errors
fileDuplexStream.on('error', (err) => {
  console.error('Error:', err);
});
