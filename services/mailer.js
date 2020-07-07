const nodemailer = require("nodemailer");

module.exports = function mailSetup(username, password) {
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: username,
      pass: password,
    },
  });
};
