// Example: deleteAccountController.js
const User = require("../models/UserSchema");

const deleteAccountController = async (req, res) => {

  try {
    const user = await User.findOneAndDelete({email:req.user.email});
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { deleteAccountController };
