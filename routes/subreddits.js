const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/all", (request, response) => {
  db.query("SELECT * FROM subreddits", (err, res) => {
    if (err) throw err;

    if (res) {
      response.send(res.rows);
    }
  });
});

module.exports = router;
