const errorController = require("./error");
const Book = require("./../models/Book");
const path = require("path");
const fs = require("fs");

module.exports.getBooks = errorController(async (req, res, next) => {
  const books = await Book.find({});
  res.json({
    success: true,
    books,
  });
});

module.exports.createBook = errorController(async (req, res, next) => {
  //  this is really stressing me out
  const { title, description } = req.body;
  if (!title) return next({ message: "Please provide title" });
  const { doc, image } = req.files;
  const docName = doc[0].filename;
  const imageName = image[0].filename;

  const book = await Book.create({
    title,
    description,
    slug: docName,
    image: imageName,
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

  res.sendFile(path.join(process.cwd(), `/pdfs/${book.slug}`));
});
