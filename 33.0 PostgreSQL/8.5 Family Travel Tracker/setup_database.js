import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});

async function setupDatabase() {
  try {
    await db.connect();
    console.log("Connected to database");

    // Drop existing tables if they exist
    await db.query("DROP TABLE IF EXISTS visited_countries, users;");
    console.log("Dropped existing tables");

    // Create users table
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(15) UNIQUE NOT NULL,
        color VARCHAR(15)
      );
    `);
    console.log("Created users table");

    // Create visited_countries table
    await db.query(`
      CREATE TABLE visited_countries(
        id SERIAL PRIMARY KEY,
        country_code CHAR(2) NOT NULL,
        user_id INTEGER REFERENCES users(id)
      );
    `);
    console.log("Created visited_countries table");

    // Insert initial users
    await db.query(`
      INSERT INTO users (name, color)
      VALUES ('Angela', 'teal'), ('Jack', 'powderblue');
    `);
    console.log("Inserted initial users");

    // Insert some initial visited countries
    await db.query(`
      INSERT INTO visited_countries (country_code, user_id)
      VALUES ('FR', 1), ('GB', 1), ('CA', 2), ('FR', 2);
    `);
    console.log("Inserted initial visited countries");

    console.log("Database setup completed successfully!");
    
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await db.end();
  }
}

setupDatabase(); 