const { Router } = require("express");
const { schemas, check } = require("../middlewares/validations");
const { protect } = require("../middlewares/authentication");
const { communities } = require("../controllers");

const router = Router();

router.post("/", protect, check(schemas.community, "body"), communities.create);

router.get("/:name?", communities.search);

module.exports = router;
