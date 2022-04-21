// Use request library to make the HTTP request:
const request = require("request");

// Use Node's file system module to write the file:
const fs = require("fs");

// Takes in two command line arguments.
let userInput = process.argv.slice(2);
// console.log(userInput);

request(userInput[0], (error, response, body) => {
  if (error) {
    console.log(error);
    return;
  }
  // console.log("Reponse is: ", response && response.statusCode);
  // console.log("Body: ", body);

  let content = body;
  fs.writeFile(userInput[1], content, err => {
    if (err) {
      console.log("Failed to write to file ", err);
      return;
    }
    fs.stat(userInput[1], (err, stats) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      let fileSize = stats.size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${userInput[1]}`);
    })
  });
});


/*
Take command line arguments:
1. URL
2. local file path

Make a request URL's server.
Wait for response --> use nested callback
Then take data received, write it to file (index.js)
 */