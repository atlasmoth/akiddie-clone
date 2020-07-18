const errorController = require("./error");
const Book = require("./../models/Book");
const path = require("path");
const fs = require("fs");
const setQuery = require("./../services/query");

module.exports.getBooks = errorController(async (req, res, next) => {
  const books = await setQuery(Book, req.query);

  res.json({
    success: true,
    books,
  });
});

module.exports.createBook = errorController(async (req, res, next) => {
  //  this is really stressing me out
  console.log("This is indeed running");
  console.log(req.body);
  const { title, description, price, genre } = req.body;
  if (!title || !price)
    return next({ message: "Please provide complete details." });
  const { doc, image } = req.files;
  const docName = doc[0].filename;
  const imageName = image[0].filename;

  const book = await Book.create({
    title,
    description,
    slug: docName,
    image: imageName,
    price,
    genre,
    author: req.user._id,
  });
  res.json({
    success: true,
    book,
  });
});

module.exports.getBook = errorController(async (req, res, next) => {
  const { bookid } = req.params;
  const book = await Book.findById(bookid);
  if (!book) return next({ message: "Invalid link." });
  res.send({
    success: true,
    book,
  });
});

module.exports.readBook = errorController(async (req, res, next) => {
  const { bookid } = req.params;

  const book = await Book.findById(bookid);
  if (!book) return next({ message: "Invalid link." });

  if (!fs.existsSync(path.join(process.cwd(), `/pdfs/${book.slug}`))) {
    return next({ message: "Invalid link." });
  }

  res.sendFile(path.join(process.cwd(), `/pdfs/${book.slug}`));
});
