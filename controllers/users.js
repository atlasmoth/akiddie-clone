const errorController = require("./error");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

module.exports.getUsers = errorController(async (req, res, next) => {
  console.log(req.query);
  console.log(req.params);
  const users = await User.find({});
  console.log(users);
  res.send("Some dummy text for testing");
});

module.exports.createUser = errorController(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return next({ code: 400, message: "Incomplete credentials" });
  }

  const user = await User.create({ username, email, password, role });
  console.log(user);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({
    sucess: true,
    token,
  });
});
