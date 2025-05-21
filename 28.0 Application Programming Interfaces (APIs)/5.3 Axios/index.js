import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const type = req.body.type;
    const participants = req.body.participants;
    
    // Construct the URL with query parameters
    let url = "https://bored-api.appbrewery.com/filter?"
    if (type) url += `type=${type}`;
    if (type && participants) url += "&";
    if (participants) url += `participants=${participants}`;
    
    const response = await axios.get(url);
    
    if (response.data && response.data.length > 0) {
      // Pick a random activity from the filtered results
      const randomActivity = response.data[Math.floor(Math.random() * response.data.length)];
      res.render("index.ejs", { data: randomActivity });
    } else {
      res.render("index.ejs", {
        error: "No activities that match your criteria."
      });
    }
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.response?.status === 404 
        ? "No activities that match your criteria."
        : error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
