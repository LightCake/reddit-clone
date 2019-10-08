const { sign } = require("jsonwebtoken");

const createAccessToken = user =>
  sign({ userId: user.id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: process.env.ACCESS_JWT_EXPIRATION
  });

const createRefreshToken = user =>
  sign(
    { userId: user.id, tokenVersion: user.token_version },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: parseInt(process.env.REFRESH_JWT_EXPIRATION)
    }
  );

module.exports = {
  createAccessToken,
  createRefreshToken
};
