const express = require("express");
const {
  getBooks,
  createBook,
  getBook,
  readBook,
} = require("./../controllers/books");
const { auth, restrictUsers } = require("./../controllers/users");
const multer = require("multer");
const path = require("path");

// setting multer up to receive my docs and safely store them.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, path.join(process.cwd(), "/pdfs"));
    } else {
      cb(null, path.join(process.cwd(), "/assets"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: {
    files: 2, // allow up to 2 files per request,
    fieldSize: 2 * 1024 * 1024, // 2 MB (max file size)
  },
  fileFilter: (req, file, cb) => {
    // allow images and pdfs  only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
      return cb(new Error("Only images and pdfs are allowed."), false);
    }
    cb(null, true);
  },
});
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(getBooks)
  .post(
    auth,
    restrictUsers,
    upload.fields([
      { name: "doc", maxCount: 1 },
      { name: "image", maxCount: 1 },
    ]),
    createBook
  );
router.route("/:bookid").get(getBook);
router.route("/:bookid/read").get(auth, readBook);
module.exports = router;
