import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3001;

// Simple in-memory user store for testing
const users = [
  { id: 1, username: "test", password: "test" }
];

// Session configuration
app.use(session({
  secret: "test-secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Simple local strategy
passport.use(new Strategy((username, password, done) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
}));

// Serialize/deserialize - testing both approaches
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id); // Store only ID
});

passport.deserializeUser((id, done) => {
  console.log("Deserializing user ID:", id);
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Routes
app.get("/", (req, res) => {
  res.send(`
    <h1>Session Test</h1>
    <p>Authenticated: ${req.isAuthenticated()}</p>
    <p>User: ${req.user ? JSON.stringify(req.user) : 'None'}</p>
    <p>Session ID: ${req.sessionID}</p>
    <a href="/login">Login</a> | <a href="/logout">Logout</a> | <a href="/protected">Protected</a>
  `);
});

app.get("/login", (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username (test)" required>
      <input type="password" name="password" placeholder="Password (test)" required>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect("/");
  });
});

app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Protected Content</h1><p>Welcome ${req.user.username}!</p><a href="/">Home</a>`);
  } else {
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Test server running on http://localhost:${port}`);
}); 