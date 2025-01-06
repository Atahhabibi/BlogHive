const User = require("../models/UserSchema"); 

const getSingleFollower = async (req, res) => {
  const { id } = req.params; 
  try {

    const follower = await User.findById(id).populate("posts"); 

    if (!follower) {
      return res.status(404).json({
        status: false,
        message: "Follower not found"
      });
    }

    res.status(200).json({
      status: true,
      follower
    });
  } catch (error) {
    console.error("Error fetching single follower:", error.message);
    res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
};

module.exports = getSingleFollower;
