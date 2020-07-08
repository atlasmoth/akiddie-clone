const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  verifyRegistration,
  getUser,
  login,
  auth,
} = require("./../controllers/users");

router.route("/").get(auth, getUsers).post(createUser);
router.route("/auth/verify/:userid/:authid").get(verifyRegistration);
router.route("/:userid").get(getUser);
router.route("/login").post(login);

module.exports = router;
