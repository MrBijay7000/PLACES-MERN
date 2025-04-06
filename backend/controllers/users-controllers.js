/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "BIJAY",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { username, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, Email already exits", 422);
  }

  const createdUser = {
    username,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser, message: "User Created" });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged In" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
