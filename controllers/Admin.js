const User = require("../models/User");

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.status(200).json({
      message: "Successfully fetch single user",
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.putEditUser = async (req, res) => {
  const { username, name } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      return res.status(401).json({
        error: "Username has been used!",
      });
    }

    const userFinded = await User.findById(req.userId);

    userFinded.username = username;
    userFinded.name = name;

    userFinded.save();

    res.status(200).json({
      message: "Successfully edit user!",
      user: {
        username: userFinded.username,
        name: userFinded.name,
        role: userFinded.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllOperator = async (req, res) => {
  try {
    const operators = await User.find({ role: "operator" });

    res.status(200).json({
      message: "Successfully fetch all operators",
      operators: operators,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.postGetOperator = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    res.status(200).json({
      message: "Successfully fetch single user",
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.putEditOperator = async (req, res) => {
  const { userId, name, username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      return res.status(401).json({
        error: "Username has been used!",
      });
    }

    const userFinded = await User.findById(userId);

    userFinded.username = username;
    userFinded.name = name;

    userFinded.save();

    res.status(200).json({
      message: "Successfully edit user!",
      user: {
        username: userFinded.username,
        name: userFinded.name,
        role: userFinded.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteOperator = async (req, res) => {
  const { userId } = req.body;

  try {
    await User.deleteOne({ _id: userId });

    res.status(200).json({
      message: "Successfully delete user",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
