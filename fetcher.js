// Use request library to make the HTTP request:
const request = require("request");

// Use Node's file system module to write to the file:
const fs = require("fs");

// Takes in two command line arguments.
let userInput = process.argv.slice(2);

request(userInput[0], (error, response, body) => {
  if (error) {
    console.log("Error: ", error);
    return;
  }

  fs.writeFile(userInput[1], response.body, (err) => {
    if (err) {
      console.log("Failed to write to file ", err);
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${userInput[1]}`);
  });
});