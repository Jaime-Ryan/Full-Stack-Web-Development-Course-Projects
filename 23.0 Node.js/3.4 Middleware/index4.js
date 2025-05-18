import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

function bandNameLogger(req, res, next) {
  if (req.method === "POST" && req.path === "/submit") {
    console.log(`Street submitted: ${req.body.street}`);
    console.log(`Pet submitted: ${req.body.pet}`);
  }
  next();
}

// Serve the form HTML
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bandNameLogger);

// Handle form submission
app.post("/submit", (req, res) => {
  const { street, pet } = req.body;
  const bandName = `${street} ${pet}`;
  res.send(`
    <h1>Your band name is:</h1>
    <h2>🎸🎶 ${bandName} 🎵🥁</h2>
  `);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
