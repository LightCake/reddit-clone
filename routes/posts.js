const express = require("express");
const passport = require("passport");
const db = require("../db");

const router = express.Router();

router.get("/all", (request, response) => {
  db.query("SELECT * FROM posts", (err, res) => {
    if (err) throw err;

    if (res) response.send(res.rows);
  });
});

router.get("/subreddit/:name", (request, response) => {
  db.query(
    "SELECT p.id, p.user_id, p.subreddit_id, s.name, p.title, p.text, p.created FROM posts p LEFT OUTER JOIN subreddits s ON (p.subreddit_id = s.id) WHERE s.name = $1",
    [request.params.name],
    (err, res) => {
      if (err) throw err;

      if (res) response.send(res.rows);
    }
  );
});

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { post, subreddit } = request.body;
    // Check whether the subreddit exists and get its ID
    db.query(
      "SELECT id FROM subreddits WHERE name = $1",
      [subreddit],
      (err, res) => {
        if (err) throw err;
        // If the subreddit exists, insert the new post into the database
        if (res.rows[0]) {
          db.query(
            "INSERT INTO posts (user_id, subreddit_id, title, text) VALUES ($1, $2, $3, $4)",
            [request.user.id, res.rows[0].id, post.title, post.text],
            (err, res) => {
              if (err) throw err;

              if (res) response.json({ msg: "success" });
            }
          );
        } else {
          // If the subreddit does not exist send an error response
        }
      }
    );
  }
);

module.exports = router;
