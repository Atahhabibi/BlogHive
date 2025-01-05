const User = require("../models/UserSchema");

const handleFollowerController = async (req, res) => {
  const userId = req.user.userId; 
  const followerId = req.params.id;

  try {
   
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

   
    const isAlreadyFollowing = user.followers.some(
      (follower) => follower._id.toString() === followerId
    );

    if (isAlreadyFollowing) {
      return res
        .status(400)
        .json({ success: false, message: "Already following this user." });
    }

   
    user.followers.push({ _id: followerId });

    
    await user.save();

    res.status(200).json({ success: true, message: "Followed successfully!" });
  } catch (error) {
    console.error("Error handling follow request:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = handleFollowerController;
