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
                // If the user already upvoted the post, delete it from the database
                if (vote.vote === 1) {
                  db.query(
                    "DELETE FROM post_votes WHERE post_id = $1 AND user_id = $2",
                    [request.params.post_id, request.user.id],
                    (err, res) => {
                      if (err) throw err;

                      if (res) response.json({ msg: "success" });
                    }
                  );
                } else {
                  // If the user already downvoted the post, upvote the post
                  db.query(
                    "UPDATE post_votes set vote = 1 WHERE id = $1",
                    [vote.id],
                    (err, res) => {
                      if (err) throw err;

                      if (res) response.json({ msg: "success" });
                    }
                  );
                }
              } else {
                // If the user never voted the post, insert new vote into the database
                db.query(
                  "INSERT INTO post_votes (user_id, post_id, vote) VALUES ($1, $2, $3)",
                  [request.user.id, request.params.post_id, 1],
                  (err, res) => {
                    if (err) throw err;

                    if (res) response.json({ msg: "success" });
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
