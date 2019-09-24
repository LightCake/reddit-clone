const express = require("express");
const passport = require("passport");
const db = require("../db");

const router = express.Router();

// Get all posts
router.get("/all/:subreddit?", (request, response) => {
  const option = request.params.subreddit ? request.params.subreddit : null;
  console.log(option);
  db.query(
    "SELECT p.id, p.user_id, p.subreddit_id, p.title, p.text, p.created, sr.name as subreddit, u.name as username, SUM(pv.vote) as votes, COUNT(c.id) as comments FROM posts p LEFT OUTER JOIN post_votes pv ON (p.id = pv.post_id) LEFT OUTER JOIN subreddits sr ON (sr.id = p.subreddit_id) LEFT OUTER JOIN users u ON (u.id = p.user_id) LEFT OUTER JOIN comments c ON (c.post_id = p.id) WHERE ($1 = sr.name or $1 is null) GROUP BY p.id, sr.name, u.name",
    [option],
    (err, res) => {
      if (err) throw err;

      if (res) response.send(res.rows);
    }
  );
});

// Add a new post
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

// Upvote a post
router.post(
  "/upvote/:post_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // Check whether the post with the given id exists
    db.query(
      "SELECT EXISTS (SELECT 1 FROM posts WHERE id = $1)",
      [request.params.post_id],
      (err, res) => {
        if (err) throw err;

        if (res.rows[0].exists) {
          db.query(
            "SELECT * FROM post_votes WHERE post_id = $1 AND user_id = $2",
            [request.params.post_id, request.user.id],
            (err, res) => {
              if (err) throw err;
              // If the user already voted for the post
              if (res.rows.length > 0) {
                const vote = res.rows[0];
                // If the user already upvoted the post, set the vote to 0
                if (vote.vote === 1) {
                  db.query(
                    "UPDATE post_votes set vote = 0 WHERE id = $1 RETURNING *",
                    [vote.id],
                    (err, res) => {
                      if (err) throw err;

                      if (res) response.send(res.rows);
                    }
                  );
                } else {
                  // If the user already downvoted the post, upvote the post
                  db.query(
                    "UPDATE post_votes set vote = 1 WHERE id = $1 RETURNING *",
                    [vote.id],
                    (err, res) => {
                      if (err) throw err;

                      if (res) response.send(res.rows);
                    }
                  );
                }
              } else {
                // If the user never voted the post, insert new vote into the database
                db.query(
                  "INSERT INTO post_votes (user_id, post_id, vote) VALUES ($1, $2, $3) RETURNING *",
                  [request.user.id, request.params.post_id, 1],
                  (err, res) => {
                    if (err) throw err;

                    if (res) response.send(res.rows);
                  }
                );
              }
            }
          );
        } else {
          // If the post does not exist return error response
          return response.status(400).json({ post: "Post not found" });
        }
      }
    );
  }
);

// Downvote a post
router.post(
  "/downvote/:post_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // Check whether the post with the given id exists
    db.query(
      "SELECT EXISTS (SELECT 1 FROM posts WHERE id = $1)",
      [request.params.post_id],
      (err, res) => {
        if (err) throw err;
        // If the post exists
        if (res.rows[0].exists) {
          // look for the user's vote of the post
          db.query(
            "SELECT * FROM post_votes WHERE post_id = $1 AND user_id = $2",
            [request.params.post_id, request.user.id],
            (err, res) => {
              if (err) throw err;
              // If the user already voted for the post
              if (res.rows.length > 0) {
                const vote = res.rows[0];
                // If the user already upvoted the post, change it to a downvote
                if (vote.vote === 1) {
                  db.query(
                    "UPDATE post_votes set vote = -1 WHERE id = $1",
                    [vote.id],
                    (err, res) => {
                      if (err) throw err;

                      if (res) response.json({ msg: "success" });
                    }
                  );
                } else {
                  // If the user already downvoted the post, delete it
                  db.query(
                    "DELETE FROM post_votes WHERE post_id = $1 AND user_id = $2",
                    [request.params.post_id, request.user.id],
                    (err, res) => {
                      if (err) throw err;

                      if (res) response.json({ msg: "success" });
                    }
                  );
                }
              } else {
                // If the user never voted the post, insert new downvote into the database
                db.query(
                  "INSERT INTO post_votes (user_id, post_id, vote) VALUES ($1, $2, $3)",
                  [request.user.id, request.params.post_id, -1],
                  (err, res) => {
                    if (err) throw err;

                    if (res) response.json({ msg: "success" });
                  }
                );
              }
            }
          );
        } else {
          // If the post with the id does not exist return error response
          return response.status(400).json({ post: "Post not found" });
        }
      }
    );
  }
);

module.exports = router;
