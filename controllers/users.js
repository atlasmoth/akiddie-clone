const errorController = require("./error");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const util = require("util");
const transport = require("./../services/mailer")(
  process.env.EMAIL_USERNAME,
  process.env.EMAIL_PASSWORD
);

module.exports.getUsers = errorController(async (req, res, next) => {
  const message = {
    from: "ebuka422@gmail.com",
    to: "to@email.com",
    subject: "Testing dummy function",
    text: "Hey fam, check me out bruh",
  };
  const users = await User.find({});
  transport.sendMail(message, (err, data) => {
    if (err) console.log(err);
    console.log(data);
  });
  res.send({
    sucess: true,
    users,
  });
});

module.exports.createUser = errorController(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return next({ code: 400, message: "Incomplete credentials" });
  }

  const user = await User.create({ username, email, password, role });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({
    sucess: true,
    token,
  });
});
