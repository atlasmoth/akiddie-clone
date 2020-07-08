const express = require("express");
const { getBooks, createBook } = require("./../controllers/books");
const { auth } = require("./../controllers/users");

const router = express.Router({ mergeParams: true });
router.route("/").get(getBooks).post(auth, createBook);

module.exports = router;
