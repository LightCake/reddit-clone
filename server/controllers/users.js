const { userServices } = require("../services");
const {
  createAccessToken,
  createRefreshToken
} = require("../utils/authentication");

const register = async (req, res) => {
  try {
    // Check whether name or email address is already taken.
    const { taken, errors } = await userServices.checkAvailability(req.body);
    if (taken) {
      return res.status(400).send(errors);
    }
    // Insert new user into the database.
    const user = await userServices.create(req.body);
    // Create a cookie containing the refresh token, which expires in 7 days.
    res.cookie("jid", createRefreshToken(user), {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.REFRESH_JWT_EXPIRATION) * 1000
      )
    });
    // Create the access token, which expires every 15 minutes.
    const accessToken = createAccessToken(user);
    // Send response with access token, user id and name.
    res
      .status(201)
      .send({ accessToken, user: { id: user.id, name: user.name } });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

const login = async (req, res) => {
  // Check whether user with given credentials exist.
  const { valid, errors, user } = await userServices.validate(req.body);
  if (!valid) {
    return res.status(401).send(errors);
  }

  // Create a cookie containing the refresh token, which expires in 7 days.
  res.cookie("jid", createRefreshToken(user), {
    httpOnly: true,
    expires: new Date(
      Date.now() + parseInt(process.env.REFRESH_JWT_EXPIRATION) * 1000
    )
  });
  // Create the access token, which expires every 15 minutes.
  const accessToken = createAccessToken(user);
  // Send response with access token, user id and name.
  res.status(201).send({ accessToken, user: { id: user.id, name: user.name } });
};

module.exports = {
  register,
  login
};
