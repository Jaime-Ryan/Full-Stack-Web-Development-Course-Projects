import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});

const app = express();
const port = 3000;

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to database and load quiz data
db.connect()
  .then(() => {
    console.log("Connected to database");
    return db.query("SELECT * FROM flags");
  })
  .then((res) => {
    quiz = res.rows;
    console.log(`Loaded ${quiz.length} flags from database`);
    if (quiz.length > 0) {
      console.log("Sample flag:", quiz[0]); // Debug: see what the data looks like
    }
    
    // Start server only after data is loaded
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database error:", err);
    db.end();
  });

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  if (quiz.length === 0) {
    return res.send("Database not ready yet, please refresh in a moment.");
  }
  nextQuestion();
  console.log("Current question:", currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  
  console.log("User answer:", answer);
  console.log("Current question:", currentQuestion);
  
  if (currentQuestion && currentQuestion.name && currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;
    console.log("✅ CORRECT! Total score:", totalCorrect);
    console.log("Correct answer details:", currentQuestion);
  } else {
    console.log("❌ Incorrect answer");
  }

  nextQuestion();
  console.log("Next question:", currentQuestion);
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  if (quiz.length > 0) {
    const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
    currentQuestion = randomCountry;
  } else {
    console.error("Quiz array is empty!");
    currentQuestion = { name: "Unknown", flag: "?" };
  }
}
