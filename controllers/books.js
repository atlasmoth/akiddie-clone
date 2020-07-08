const errorController = require("./error");
const Book = require("./../models/Book");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

module.exports.getBooks = errorController(async (req, res, next) => {
  const pdfPath = path.join(process.cwd(), "/pdfs");
  const fileNames = fs
    .readdirSync(pdfPath)
    .filter((item) => item.includes(".pdf"))
    .map((file) => {
      return `${req.protocol}://${req.get("host")}/${file}`;
    });

  console.log(fileNames);
  res.send("You are in the right place bruh");
});

module.exports.createBook = errorController(async (req, res, next) => {
  //
  // const { title, description } = req.fields;
  // console.log(req.files);
  const form = formidable({
    multiples: true,
    uploadDir: path.join(process.cwd(), "/pdfs"),
  });
  const data = await form.parse(req);

  res.send("We outchea live.");
});
