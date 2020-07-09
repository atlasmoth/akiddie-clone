const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please include title"],
      unique: [true, "Name must be unique"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      max: 1000,
    },
    dimensions: {
      width: {
        type: Number,
        min: 0,
      },
      height: {
        type: Number,
        min: 0,
      },
    },
    genre: {
      type: String,
      enum: ["Education", "Entertainment", "Development"],
      default: "Education",
    },
    isbn: {
      type: String,
      match: [
        /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
        "Please include valid ISBN number",
      ],
      default: "978-7-7635-9132-7",
    },
    image: {
      type: String,
    },
    slug: String,
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Book", bookSchema);
