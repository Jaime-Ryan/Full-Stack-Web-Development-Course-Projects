import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

//const express = require("express");

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  const today = new Date();
  const day = today.getDay(); // 0 (Sun) - 6 (Sat)
  let advice, emoji;

  if (day === 0 || day === 6) {
    advice = "Hey! It's the weekend, it's time to have fun!";
    emoji = "🎉";
  } else {
    advice = "Hey! It's a weekday, it's time to work hard!";
    emoji = "💼";
  }

  res.render("advice.ejs", { advice, emoji });
});

