// Import the express library, which helps us create a web server
import express from "express";

// Import body-parser, which helps us read data sent from forms
import bodyParser from "body-parser";

// Import dirname from path, which helps us work with file and folder paths
import { dirname } from "path";

// Import fileURLToPath from url, which helps us get the path of the current file
import { fileURLToPath } from "url";

// Create an instance of the express application
const app = express();

// Set the port number where our server will listen for requests
const port = 3000;

// Get the directory name of the current file so we can use it to find other files
const __dirname = dirname(fileURLToPath(import.meta.url));

// Use body-parser middleware to parse form data (so we can read what the user types in forms)
app.use(bodyParser.urlencoded({ extended: true }));

// When someone visits the homepage ("/"), send them the index.html file from the public folder
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// When someone submits the form to "/check" using POST (like pressing the submit button),
// this function will run to check the password
app.post("/check", (req, res) => {
  // Get the password the user entered from the form
  const { password } = req.body;

  // This is the secret password that will let the user see the secret page
  const secretPassword = "ILoveProgramming";

  // If the password the user entered matches the secret password...
  if (password === secretPassword) {
    // ...send them the secret.html page from the public folder
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // ...otherwise, tell them access is denied and the password is incorrect
    res.send("<h1>Access Denied</h1><p>Incorrect password.</p>");
  }
});

// Start the server and listen for requests on the port we chose (3000)
// When the server starts, print a message to the console
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});