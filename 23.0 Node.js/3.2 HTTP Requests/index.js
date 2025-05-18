import express from 'express';
const app = express();
const port = 3000;  

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is John Doe</p>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact</h1><p>My phone number is 111-222-3333</p>");
});


app.listen(3000, () => {
  console.log(`Server has started on port ${port}`);
});
