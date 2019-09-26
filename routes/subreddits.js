const express = require("express");
const passport = require("passport");
const db = require("../db");

const router = express.Router();

router.get("/all/:search*?", (request, response) => {
  const search =
    (request.params.search !== undefined ? request.params.search : "") + "%";

  db.query(
    "SELECT * FROM subreddits WHERE name ILIKE $1 ORDER BY name",
    [search],
    (err, res) => {
      if (err) throw err;

      if (res) {
        response.send(res.rows);
      }
    }
  );
});

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { name } = request.body;

    db.query(
      "SELECT EXISTS (SELECT 1 FROM subreddits WHERE name = $1)",
      [name],
      (err, res) => {
        if (err) throw err;

        if (!res.rows[0].exists) {
          db.query(
            "INSERT INTO subreddits (user_id, name) VALUES ($1, $2) RETURNING *",
            [request.user.id, name],
            (err, res) => {
              if (err) throw err;

              if (res) response.send(res.rows[0]);
            }
          );
        } else {
          // TODO: Subreddit with the same name already exists
        }
      }
    );
  }
);

module.exports = router;
