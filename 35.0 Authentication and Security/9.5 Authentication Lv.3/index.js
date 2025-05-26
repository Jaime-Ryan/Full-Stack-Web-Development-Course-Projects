import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import GoogleStrategy from "passport-google-oauth2";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

// Debug: Log environment variables (without sensitive data)
console.log("Environment check:");
console.log("SESSION_SECRET exists:", !!process.env.SESSION_SECRET);
console.log("PG_USER:", process.env.PG_USER);
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_DATABASE:", process.env.PG_DATABASE);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "TOPSECRETWORD",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevents XSS attacks
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Debug database connection
db.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch(err => console.error("❌ Database connection failed:", err));

app.get("/", (req, res) => {
  console.log("GET / - Session ID:", req.sessionID);
  console.log("GET / - Authenticated:", req.isAuthenticated());
  console.log("GET / - User:", req.user);
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  console.log("GET /login - Session ID:", req.sessionID);
  console.log("GET /login - Authenticated:", req.isAuthenticated());
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/secrets", (req, res) => {
  console.log("GET /secrets - Session ID:", req.sessionID);
  console.log("GET /secrets - Authenticated:", req.isAuthenticated());
  console.log("GET /secrets - User:", req.user);
  
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/secrets", passport.authenticate("google", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.error("Error logging in user after registration:", err);
              return res.redirect("/login");
            }
            console.log("User registered and logged in successfully");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.error("Registration error:", err);
    res.redirect("/register");
  }
});

passport.use("local",
  new Strategy(async function verify(username, password, cb) {
    console.log("Local strategy - attempting login for:", username);
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        console.log("Local strategy - user found:", user.email);
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              console.log("Local strategy - password valid, login successful");
              return cb(null, user);
            } else {
              console.log("Local strategy - password invalid");
              return cb(null, false);
            }
          }
        });
      } else {
        console.log("Local strategy - user not found");
        return cb(null, false);
      }
    } catch (err) {
      console.error("Local strategy error:", err);
      return cb(err);
    }
  })
);

passport.use("google", new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      console.log("Google strategy - profile received");
      console.log("Profile structure:", JSON.stringify(profile, null, 2));
      
      // Try different ways to get email
      let email;
      if (profile.email) {
        email = profile.email;
      } else if (profile.emails && profile.emails[0]) {
        email = profile.emails[0].value;
      } else if (profile._json && profile._json.email) {
        email = profile._json.email;
      }
      
      console.log("Google strategy - extracted email:", email);
      
      if (!email) {
        console.error("Google strategy - no email found in profile");
        return cb(new Error("No email found in Google profile"));
      }
      
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      
      if (result.rows.length === 0) {
        console.log("Google strategy - creating new user");
        const newUser = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [email, "google"]
        );
        console.log("Google strategy - new user created:", newUser.rows[0]);
        return cb(null, newUser.rows[0]);
      } else {
        console.log("Google strategy - existing user found:", result.rows[0]);
        return cb(null, result.rows[0]);
      }
    } catch (err) {
      console.error("Google strategy error:", err);
      return cb(err);
    }
  }
));

passport.serializeUser((user, cb) => {
  console.log("🔄 SerializeUser - storing user ID:", user.id);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  console.log("🔄 DeserializeUser - retrieving user with ID:", id);
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      console.log("🔄 DeserializeUser - user found:", result.rows[0].email);
      cb(null, result.rows[0]);
    } else {
      console.error("🔄 DeserializeUser - user not found with ID:", id);
      cb(new Error("User not found"));
    }
  } catch (err) {
    console.error("🔄 DeserializeUser - database error:", err);
    cb(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
