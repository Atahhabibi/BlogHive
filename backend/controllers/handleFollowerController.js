const User = require("../models/UserSchema");

const handleFollowerController = async (req, res) => {
  const userId = req.user.userId;
  const followerId = req.params.id;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Check if the follower already exists in the followers array
    const isAlreadyFollowing = user.followers.some(
      (follower) => follower._id.toString() === followerId
    );

    if (isAlreadyFollowing) {
      user.followers = user.followers.filter(
        (follower) => follower._id.toString() !== followerId
      );

      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "User unfollowed successfully." });
    }

    // Follow: Add the follower to the array
    user.followers.push({ _id: followerId });

    await user.save();

    res.status(200).json({ success: true, message: "Followed successfully!" });
  } catch (error) {
    console.error("Error handling follow/unfollow request:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = handleFollowerController;
