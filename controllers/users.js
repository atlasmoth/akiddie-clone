const errorController = require("./error");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const transport = require("./../services/mailer")(
  process.env.EMAIL_USERNAME,
  process.env.EMAIL_PASSWORD
);

module.exports.getUsers = errorController(async (req, res, next) => {
  const users = await User.find({});

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

  const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
    expiresIn: "30min",
  });
  const message = {
    from: "akidieeverywhere@akidie.com",
    to: email,
    subject: "Please Verify your email.",
    text: `${req.protocol}://${req.get("host")}/users/auth/verify/${
      user._id
    }/${token}`,
  };

  transport.sendMail(message, (err) => {
    if (err) throw err;
  });

  res.json({
    sucess: true,
    message: `Registration successful, kindly verify your email.`,
  });
});

module.exports.verifyRegistration = errorController(async (req, res, next) => {
  const { authid, userid } = req.params;
  if (!authid || !userid)
    return next({
      code: 400,
      message: "Invalid credentials please login or create account",
    });
  // verify jwt secret.
  const decoded = await jwt.verify(authid, process.env.JWT_SECRET);
  if (!decoded)
    return next({
      code: 400,
      message: "Invalid credentials please login or create account",
    });
  // verify that user exists.
  const user = await User.find({ email: decoded.id, _id: userid });
  if (!user)
    return next({
      code: 400,
      message: "Invalid credentials please login or create account",
    });
  // generate fresh token for user
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({
    sucess: true,
    token,
  });
});
