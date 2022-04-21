// Use request library to make the HTTP request:
const request = require("request");

// Use Node's file system module to write to the file:
const fs = require("fs");

// Takes in two command line arguments.
let userInput = process.argv.slice(2);

request(userInput[0], (error, response, body) => {
  // console.log("This is the response.body: ", response.body);
  // Can also change and set second parameter as: response.body
  if (error) {
    console.log(error);
    return;
  }

  fs.writeFile(userInput[1], response.body, (err) => {
    if (err) {
      console.log("Failed to write to file ", err);
      return;
    }
    // One way to retrieve file size:
    fs.stat(userInput[1], (err, stats) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      let fileSize = stats.size;
      // The other way to retrieve file size:
      // body.length --> applying length property on the body. OR
      // response.body.length
      console.log(response.body.length); // or content.length // body.length
      console.log(`Downloaded and saved ${fileSize} bytes to ${userInput[1]}`);
      // Alternative: console.log(`Downloaded and saved ${body.length} bytes to ${userInput[1]}`);
    })
  });
});

/* Notes from session with mentor Patrick Ocheja
Error first principle: Callback functions' first parameter should always
be an error. A general rule to follow introduced in ES6.
Following this principle lets you know the status of the callback.
Helps to know or anticipate what the function will give back to us.

Difference in usage between process.stdin.on() and processargv:
1. process.stdin.on() ===> waits for user's input
  E.g. What is your name? runs on Terminal
  Then it waits for response from user.
  Use this approach when you want to run the program first, then wait for an
  input from the user. Accepts multiple inputs one after another.
  E.g. Question then answer. Another question then answer.

2. processargv ===> Run the program AND accept user input all in the same line.
  E.g. Input on Terminal: node fetcher.js http://www.example.edu/ ./index.html
  You're running fetcher.js and at the same time feeding in two inputs - URL
  and the file to write to (in this case).

Another approach is to use: ENVIRONMENT VARIABLES
This is an advanced topic. Have a file with the environment variables
Then you run your program and it pulls from the file containing environment variables.
Useful for when you have dozens if not more inputs. With processargv, you're only
taking in two inputs and we're running a small program.

How do you know if a piece of code or function has async behaviour? How do you
discern async vs sync JS?
-Sync functions have NO callbacks
-ASYNC functions ALWAYS have CALLBACKS
-There are some exceptions: Array helper methods that use callback functions;
Native JS data types or native JS functions. These do not follow the above mentioned
sync vs ASYNC rule.
-Check DOCUMENTATION to check if a function is async or not.

Async functions always have callbacks and therefore, will have async behaviour.
The only time an async code will not behave appropriately is if the developer
doesn't write the code properly. E.g. There is code that blocks the async
behaviour from running. The code will get stuck until it finishes running.
Analogy: one-lane highway. If a car breaks down, don't want it stopping in the
middle of the road blocking the traffic. You want it to pull over, go to the nearest
gas station then jump back onto the highway once it's fixed.
*/
