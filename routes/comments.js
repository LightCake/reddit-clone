const express = require("express");
const db = require("../db");

const router = express.Router();

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

module.exports = router;
