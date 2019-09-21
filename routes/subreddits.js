const express = require("express");
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

module.exports = router;
