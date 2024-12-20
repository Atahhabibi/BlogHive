const User = require("../models/UserSchema");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal error: Getusers" });
  }
};

module.exports = getUsers;
