const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (userData, role, res) => {
  try {
    const isUser = await User.findOne({ username: userData.username });
    const isemail = await User.findOne({ username: userData.email });

    if (isUser) {
      res.status(400).json({
        msg: "username alrsady exists",
      });
    }
    if (isemail) {
      res.status(400).json({ msg: "email already exists" });
    }

    const hashpassword = await bcrypt.hash(userData.password, 12);

    const newUser = new User({
      ...userData,
      password: hashpassword,
      role: role,
    });

    await newUser.save();

    res.status(200).json({ msg: `the new ${role} is created` });
  } catch (error) {
    res.status(401).send(error);
  }
};

const userLogin = async (userData, role, res) => {
  // const { password, Email } = userData;

  const user = await User.findOne({ email: userData.email });

  if (!user) {
    res.status(401).json({ msg: "user mail Not Found", success: "false" });
  }
  if (user.role !== role) {
    res.status(500).json({
      msg: "you are not aothorize person to login",
    });
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (isMatch) {
    // if match  than sign in the token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        Email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7 days" }
    );
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    /*   res.cookie(
      "jwt",
      token,
      (expires = new Date(Date.now(), 900000)),
      (httpOnly = true)
    );
  */

    res
      .status(200)
      .cookie(
        "jwt",
        token,
        ((expires = new Date(Date.now(), 60 * 15 * 1000)), (httpOnly = true))
      )
      .json({
        ...result,
        msg: "hurray i got logged in",
        success: "true",
      });
  } else {
    res.status(403).json({
      msg: "inccorect password",
      success: "false",
    });
  }
};

module.exports = { userRegister, userLogin };
