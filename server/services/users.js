const bcrypt = require("bcrypt");
const { Users } = require("../models");

// Check whether username or email address is already taken.
const checkAvailability = async data => {
  const { name, email } = data;
  const errors = {};

  if (await Users.exists("name", name)) {
    errors.name = "Username is already taken";
  }
  if (await Users.exists("email", email)) {
    errors.email = "Email address is already in use";
  }

  return { taken: Object.keys(errors).length > 0, errors };
};

// Insert new user into the database with the password encrypted.
const create = async data => {
  const { name, email, password } = data;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create(name, email, hashedPassword);
    return user;
  } catch (e) {
    console.error(e);
  }
};

// Check whether the combination of name and password matches any user in our database.
const validate = async data => {
  const { name, password } = data;
  const errors = {};
  let valid = false;
  try {
    // Look for a user with the given name.
    const user = await Users.findBy("name", name);
    // If no user was found, return false.
    if (!user) {
      errors.name = "Invalid Name";
      return { valid, errors };
    }
    // Otherwise, check whether the passwords match.
    const match = await bcrypt.compare(password, user.password);
    // If the passwords match, return true.
    if (match) {
      valid = true;
      return { valid, errors, user };
    }
    // Otherwise, return false.
    errors.password = "Incorrect Password";
    return { valid, errors };
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  checkAvailability,
  create,
  validate
};
