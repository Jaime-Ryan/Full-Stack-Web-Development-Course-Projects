import express from "express";

const app = express();
const port = 3000;

// Custom logger middleware
function logger(req, res, next) {
  console.log(`Request Method: ${req.method} | Request URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next(); // Call next() to pass control to the next middleware
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
