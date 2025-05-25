import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist", // You may need to change this to your database name
  password: "123456", // You may need to change this to your password
  port: 5432,
});

// Connect to database
db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => console.error("Database connection error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Get all items from database
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: [],
    });
  }
});

// Add new item to database
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  
  if (item && item.trim() !== "") {
    try {
      await db.query("INSERT INTO items (title) VALUES ($1)", [item.trim()]);
      console.log("Item added successfully");
    } catch (err) {
      console.error("Error adding item:", err);
    }
  }
  
  res.redirect("/");
});

// Edit/update item in database
app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId;
  const updatedTitle = req.body.updatedItemTitle;
  
  if (itemId && updatedTitle && updatedTitle.trim() !== "") {
    try {
      await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedTitle.trim(), itemId]);
      console.log("Item updated successfully");
    } catch (err) {
      console.error("Error updating item:", err);
    }
  }
  
  res.redirect("/");
});

// Delete item from database
app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;
  
  if (itemId) {
    try {
      await db.query("DELETE FROM items WHERE id = $1", [itemId]);
      console.log("Item deleted successfully");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  }
  
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
