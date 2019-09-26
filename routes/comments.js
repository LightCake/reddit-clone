const express = require("express");
const passport = require("passport");
const db = require("../db");

const router = express.Router();

// Get all comments of a post by its id
router.get("/post/:id", (request, response) => {
  db.query(
    "SELECT * FROM comments WHERE post_id = $1",
    [request.params.id],
    (err, res) => {
      if (err) throw err;

      if (res) response.send(res.rows);
    }
  );
});

// Add a new comment to a post
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { post_id, text } = request.body;
    // Check whether the post by the given id exists
    db.query(
      "SELECT EXISTS (SELECT 1 FROM posts WHERE id = $1)",
      [post_id],
      (err, res) => {
        if (err) throw err;
        // If the post exists
        if (res.rows[0].exists) {
          // Insert new comment to the database
          db.query(
            "INSERT INTO comments (user_id, post_id, text) VALUES ($1, $2, $3) RETURNING *",
            [request.user.id, post_id, text],
            (err, res) => {
              if (err) throw err;

              if (res) {
                response.send(res.rows[0]);
              }
            }
          );
        }
      }
    );
  }
);

module.exports = router;
