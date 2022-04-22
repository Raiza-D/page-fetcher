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
    if (userInput[1]) {
      process.stdout.write(`The file ${userInput[1]} already exists. Do you want to overwrite it - Y/N? `);
      if (process.stdin.on("Y")) {
        console.log("Existing file overwritten..");
        console.log(`Downloaded and saved ${body.length} bytes to ${userInput[1]}`);
      } else if (process.stdin.on("N")) {
        process.exit();
      } else if (!process.stdin.on("Y") || process.stdin.on("N")) {
        console.log("Invalid entry. Enter either Y or N");
      }
    } 
  });
});