const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 5,
      required: [true, "Please include username"],
      unique: [true, "Username already taken"],
    },
    password: {
      type: String,
      required: [true, "Please include password"],
      min: [8, "Password must contain at least 8 characters"],
    },
    email: {
      type: String,
      unique: [true, "Email already registered"],
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide valid email",
      ],
    },
    country: String,
    role: {
      type: String,
      enum: ["user", "author", "admin"],
      default: "user",
    },
    location: {
      type: {
        type: String,
        enum: ["Point", "LineString", "Polygon"],
        default: "Point",
      },
      coordinates: [Number],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
userSchema.index({ location: "2dsphere" });
userSchema.pre("save", function (doc) {
  this.password = bcrypt.hashSync(this.password, 10);
});
userSchema.methods.checkPassword = function (string, hash) {
  return bcrypt.compare(string, hash);
};
module.exports = mongoose.model("user", userSchema);
