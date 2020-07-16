const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  verifyRegistration,
  getUser,
  login,
  auth,
  verify,
} = require("./../controllers/users");

router.route("/").get(auth, getUsers).post(createUser);
router.route("/verify").get(auth, verify);
router.route("/auth/verify/:userid/:authid").get(verifyRegistration);
router.route("/:userid").get(getUser);
router.route("/login").post(login);

module.exports = router;
