const express = require("express");
const passport = require("passport");
const path = require("path");
const users = require("./routes/users");
const subreddits = require("./routes/subreddits");
const posts = require("./routes/posts");
const votes = require("./routes/votes");
const comments = require("./routes/comments");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/subreddits", subreddits);
app.use("/api/posts", posts);
app.use("/api/votes", votes);
app.use("/api/comments", comments);

// Load the static build folder in production mode.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
