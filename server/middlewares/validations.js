const validator = require("validator");

// Returns true, if the value is a non-empty string.
const validateString = value => {
  return typeof value === "string" && value.trim().length > 0;
};

// Returns true, if the name contains only alphanumeric (numbers, alphabet) characters, hyphens and underscores.
const validateName = name => {
  const regexp = /^[a-zA-Z0-9-_]+$/;
  return regexp.test(name);
};

const validateRegister = data => {
  const errors = {};
  // Check whether the object values are valid strings.
  const obj = ["name", "email", "password", "confirmPassword"].reduce(
    (acc, curr) => {
      acc[curr] = validateString(data[curr]) ? data[curr] : "";
      return acc;
    },
    {}
  );

  if (!validateName(obj.name)) {
    errors.name =
      "Letters, numbers, dashes, and underscores only. Please try again without symbols.";
  }
  if (!validator.isLength(obj.name, { min: 3, max: 20 })) {
    errors.name = "Username must be between 3 and 20 characters";
  }
  if (validator.isEmpty(obj.name)) {
    errors.name = "Username is required";
  }
  if (!validator.isEmail(obj.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(obj.email)) {
    errors.email = "Email is required";
  }
  if (!validator.isLength(obj.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (validator.isEmpty(obj.password)) {
    errors.password = "Password is required";
  }
  if (!validator.equals(obj.password, obj.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  if (validator.isEmpty(obj.confirmPassword)) {
    errors.confirmPassword = "Confirm Password is required";
  }

  return errors;
};

const validateLogin = data => {
  const errors = {};

  // Check whether the object values are valid strings.
  const obj = ["name", "password"].reduce((acc, curr) => {
    acc[curr] = validateString(data[curr]) ? data[curr] : "";
    return acc;
  }, {});

  if (!validator.isLength(obj.name, { min: 3, max: 20 })) {
    errors.name = "Username must be between 3 and 20 characters";
  }
  if (validator.isEmpty(obj.name)) {
    errors.name = "Username is required";
  }
  if (validator.isEmpty(obj.password)) {
    errors.password = "Password is required";
  }
  return errors;
};

const validatePost = data => {
  const errors = {};

  // Check whether the object values are valid strings.
  const obj = ["title", "text", "community_id"].reduce((acc, curr) => {
    acc[curr] = validateString(data[curr]) ? data[curr] : "";
    return acc;
  }, {});

  if (!validator.isLength(obj.title, { min: 1, max: 300 })) {
    errors.title = "Title must be between 1 and 300 characters";
  }
  if (validator.isEmpty(obj.title)) {
    errors.title = "Title is required";
  }
  if (!validator.isLength(obj.text, { max: 40000 })) {
    errors.text = "Text must be equal or less than 40000 characters";
  }

  if (validator.isEmpty(obj.community_id)) {
    errors.community_id = "Community ID is required";
  }

  return errors;
};

const validateCommunity = community => {
  const errors = {};

  community.name = validateString(community.name) ? community.name : "";

  if (!validator.isLength(community.name, { min: 1, max: 20 })) {
    errors.name = "Community name must be between 1 and 20 characters";
  }

  return errors;
};

const validateComment = comment => {
  const errors = {};

  comment.text = validateString(comment.text) ? comment.text : "";

  if (!validator.isLength(comment.text, { min: 1, max: 10000 })) {
    errors.text = "Text must be between 1 and 10.000 characters";
  }
  return errors;
};

// Contains all schemas for validations.
const schemas = {
  register: validateRegister,
  login: validateLogin,
  post: validatePost,
  community: validateCommunity,
  comment: validateComment
};

// Validation middleware
const check = (validate, property) => (req, res, next) => {
  const errors = validate(req[property]);
  // If no errors occured, the inputs are valid.
  const valid = Object.keys(errors).length === 0;
  // If the input is valid, go to the next middleware.
  if (valid) {
    next();
  } else {
    // If any errors occured, send the error messages to the client.
    res.status(400).send(errors);
  }
};

module.exports = {
  schemas,
  check
};
