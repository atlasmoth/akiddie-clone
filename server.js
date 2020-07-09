const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/.env") });
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/users");
const bookRouter = require("./routers/books");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(express.static("assets"));

    server.use("/users", userRouter);
    server.use("/books", bookRouter);
    server.use((error, req, res, next) => {
      res.status(400).json({
        success: false,
        message: error.message || "please verify credentials",
      });
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    mongoose
      .connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        server.listen(3000, (err) => {
          if (err) throw err;
          console.log("Ready on http://localhost:3000");
        });
      })
      .catch((e) => {
        if (e) throw e;
      });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
