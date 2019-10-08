const express = require("express");
const db = require("../db");
const { protect } = require("../middlewares/authentication");
const { comments } = require("../controllers");

const router = express.Router();

router
  .route("/post/:id")
  .get(comments.getByPost)
  .post(protect, comments.create);

router.get("/user/:id", comments.getByUser);

module.exports = router;
