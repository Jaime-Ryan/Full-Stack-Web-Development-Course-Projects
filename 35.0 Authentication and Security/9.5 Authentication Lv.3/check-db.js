import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

async function checkDatabase() {
  try {
    await db.connect();
    console.log("✅ Connected to database");
    
    // Check if users table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    console.log("Users table exists:", tableCheck.rows[0].exists);
    
    if (tableCheck.rows[0].exists) {
      // Get table structure
      const structure = await db.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        ORDER BY ordinal_position;
      `);
      
      console.log("\nTable structure:");
      structure.rows.forEach(row => {
        console.log(`  ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
      });
      
      // Get all users
      const users = await db.query("SELECT id, email, password FROM users");
      console.log(`\nTotal users: ${users.rows.length}`);
      
      if (users.rows.length > 0) {
        console.log("Users in database:");
        users.rows.forEach((user, index) => {
          console.log(`  ${index + 1}. ID: ${user.id}, Email: ${user.email}, Password: ${user.password.substring(0, 20)}...`);
        });
      } else {
        console.log("No users found in database");
      }
    } else {
      console.log("❌ Users table does not exist!");
      console.log("Creating users table...");
      
      await db.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `);
      
      console.log("✅ Users table created");
    }
    
  } catch (error) {
    console.error("❌ Database error:", error);
  } finally {
    await db.end();
  }
}

checkDatabase(); 