const { hash, genSalt } = require("bcryptjs");
const User = require("../models/UserSchema");

const editAccountController = async (req, res) => {
    
  const { userName, location, jobDescription, jobTitle, password, email } =
    req.body;

  try {
    const image = req.file ? req.file.path : null;

    let hashPassword = "";

    if (password) {
      const salt = await genSalt(10);
      hashPassword = await hash(password, salt);
    }

    // Prepare the payload
    const payload = {
      ...(userName && { userName }),
      ...(location && { location }),
      ...(jobDescription && { jobDescription }),
      ...(jobTitle && { jobTitle }),
      ...(image && { image }),
      ...(password && { password: hashPassword }),
      ...(email && { email })
    };

    const updatedUser = await User.findOneAndUpdate({ email }, payload, {
      new: true,
      runValidators: true
    });

    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating account:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  editAccountController
};
