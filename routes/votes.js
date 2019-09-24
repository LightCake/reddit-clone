const express = require("express");
const passport = require("passport");
const db = require("../db");

const router = express.Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    db.query(
      "SELECT * FROM post_votes WHERE user_id = $1",
      [request.user.id],
      (err, res) => {
        if (err) throw err;

        if (res) response.send(res.rows);
      }
    );
  }
);

module.exports = router;
