const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  verifyRegistration,
} = require("./../controllers/users");

router.route("/").get(getUsers).post(createUser);
router.route("/auth/verify/:userid/:authid").get(verifyRegistration);

module.exports = router;
