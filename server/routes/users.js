const { Router } = require("express");
const { schemas, check } = require("../middlewares/validations");
const { users } = require("../controllers");

const router = Router();

router.post("/register", check(schemas.register, "body"), users.register);
router.post("/login", check(schemas.login, "body"), users.login);

module.exports = router;
