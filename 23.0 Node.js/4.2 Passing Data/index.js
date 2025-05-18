import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const fName = req.body["fName"];
  const lName = req.body["lName"];
  if (!fName && !lName) {
    res.render("index.ejs", { error: "Please enter your first and last name." });
    return;
  }
  const numLetters = (fName ? fName.length : 0) + (lName ? lName.length : 0);
  res.render("index.ejs", { numberOfLetters: numLetters });
  console.log(req.body, "numberOfLetters: ", numLetters);

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
