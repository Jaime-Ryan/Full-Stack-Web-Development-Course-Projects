import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database connection setup
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Helper function to get visited countries
async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  // Query the database to get all visited countries
  const countries = await checkVisited();
  
  // Log the results for debugging
  console.log("Visited countries:", countries);
  
  // Render the index.ejs template with countries data
  res.render("index.ejs", { 
    countries: countries, 
    total: countries.length 
  });
});

// Handle form submission to add new countries
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    // Try multiple fuzzy matching strategies for better typo tolerance
    let result;
    
    // Strategy 1: Exact match (case-insensitive)
    result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) = LOWER($1)",
      [input]
    );
    
    // Strategy 2: Contains the input (original fuzzy match)
    if (result.rows.length === 0) {
      result = await db.query(
        "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE LOWER($1)",
        [`%${input}%`]
      );
    }
    
    // Strategy 3: Input contains parts of country name (reverse fuzzy)
    if (result.rows.length === 0) {
      result = await db.query(
        "SELECT country_code FROM countries WHERE LOWER($1) LIKE LOWER(CONCAT('%', country_name, '%'))",
        [input]
      );
    }
    
    // Strategy 4: Similarity matching for typos (using first few characters)
    if (result.rows.length === 0 && input.length >= 4) {
      const prefix = input.substring(0, Math.min(4, input.length));
      result = await db.query(
        "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE LOWER($1)",
        [`${prefix}%`]
      );
    }

    if (result.rows.length === 0) {
      throw new Error("No country found");
    }

    const data = result.rows[0];
    const countryCode = data.country_code;
    
    try {
      // Insert the country code into visited_countries table
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      // Handle duplicate country error
      console.log(err);
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    // Handle invalid country name error
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
