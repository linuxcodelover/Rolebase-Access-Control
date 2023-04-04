const { Schema, model } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      /*  validator(value) {
        if (!isEmail(value)) {
          throw new Error("Invalid email");
        }
      }, */
    },
    role: {
      type: String,
      require: true,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = User;
