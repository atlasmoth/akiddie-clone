const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/.env") });
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

const cors = require("cors");

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
    server.get("/stuff", (req, res, next) => {
      res.send("Welcome to the real deal");
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    server.get("/stuff", (req, res, next) => {
      console.log("Request received");
      res.send("Welcome to the real deal");
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
