// Use request library to make the HTTP request:
const request = require("request");

// Use Node's file system module to write the file:
const fs = require("fs");

// Takes in two command line arguments.
let userInput = process.argv.slice(2);
// console.log(userInput);

request(userInput[0], (error, response) => {
  // console.log("This is the response.body: ", response.body);
  if (error) {
    console.log(error);
    return;
  }
  // console.log("Reponse is: ", response && response.statusCode);
  // console.log("Body: ", body);

  // let content = response.body; // Redundant. 
  fs.writeFile(userInput[1], response.body, (err) => {
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
      console.log(response.body.length); // or content.length // body.length
      console.log(`Downloaded and saved ${fileSize} bytes to ${userInput[1]}`);
      // Alternative: console.log(`Downloaded and saved ${body.length} bytes to ${userInput[1]}`);
    })
  });
});

/* Error first principle
General rule to follow ES6
Callback functions first parameter should always be an error.
Know the status of the callback.
Helps to know or anticipate what hte function give back to us.

process.stdin.on() === > waits for user's input
What is your name?
Wait for response from user. Then you use the proces.stdin.on()

Environment variables

Array helper methods that use callbackfunctions, 
Native JS data types or native JS functions do not follow above principle.


Sync functions have NO callbacks.
Async functions ALWAYS have CALLBACKS. That's how you can tell them apart from sync functions.
Unless developer didn't write it properly.
Check DOCUMENTATION to check if a function is async or not.

*/
/*
Take command line arguments:
1. URL
2. local file path

Make a request URL's server.
Wait for response --> use nested callback
Then take data received, write it to file (index.js)
 */