const express = require("express");
const path = require("path");
// ROUTER IMPORTS
const users = require("./routes/users");
const communities = require("./routes/communities");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const votes = require("./routes/votes");

require("dotenv").config();

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API
app.use("/api/users", users);
app.use("/api/communities", communities);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

// Load the static build folder in production mode.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
