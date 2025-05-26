import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("Register - Email:", username);
  console.log("Register - Password:", password);
  
  try {
    const result = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [username, password]
    );
    console.log("User registered successfully");
    res.redirect("/login");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  console.log("Login - Email:", username);
  console.log("Login - Password:", password);
  
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [username, password]
    );
    
    if (result.rows.length > 0) {
      console.log("Login successful");
      res.render("secrets.ejs");
    } else {
      console.log("Invalid credentials");
      res.redirect("/login");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Error during login");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
