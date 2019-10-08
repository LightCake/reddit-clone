const { verify } = require("jsonwebtoken");
const User = require("../models/users");

// Protect routes from non-authenticated users.
const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).end();
  }
  let payload;
  try {
    const token = authorization;
    payload = await verify(token, process.env.ACCESS_JWT_SECRET);
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
  const user = await User.findBy("id", payload.userId);

  if (!user) return res.status(401).end();

  req.user = user;
  next();
};

module.exports = {
  protect
};
