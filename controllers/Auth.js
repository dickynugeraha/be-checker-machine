const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username: username, role: role });

    if (!user) {
      return res.status(401).json({
        error: "User not found!",
      });
    }

    const doMatchPassword = await bcrypt.compare(password, user.password);

    if (!doMatchPassword) {
      return res.status(401).json({
        error: "Incorrect Password!",
      });
    }

    const token = jwt.sign(
      { username: user.phone, userId: user._id },
      "tokensupersecret",
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Successfully login!",
      token: token,
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
      error: "Unauthorization, something wrong!",
    });
  }
};

exports.register = async (req, res) => {
  const { username, name, role } = req.body;

  let password = req.body.password;

  if (role === "operator") {
    password = "operator";
  }

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      return res.status(401).json({
        error: "Username has been used!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = User.create({
      username: username,
      name: name,
      password: hashedPassword,
      role: role,
    });

    const token = jwt.sign(
      { username: newUser.phone, userId: newUser._id },
      "tokensupersecret",
      { expiresIn: "3h" }
    );

    res.status(201).json({
      message: "successfully created user",
      token: token,
      user: {
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
      error: "Unauthorization, something wrong!",
    });
  }
};
