const User = require("../models/UserSchema");

const postsController = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { id:postId, type } = req.body;

    console.log(postId,type);

    // Validate request data
    if (!postId || !type) {
      return res.status(400).json({
        success: false,
        message: "Post ID and action type are required"
      });
    }

    // Handle actions based on type
    if (type === "liked") {
      if (!user.likedPosts.includes(postId)) {
        user.likedPosts.push(postId);
      }
    } else if (type === "bookmarked") {
      if (!user.bookmarkedPosts.includes(postId)) {
        user.bookmarkedPosts.push(postId);
      }
    } else if (type === "shared") {
      if (!user.sharedPosts.includes(postId)) {
        user.sharedPosts.push(postId);
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action type"
      });
    }

    // Save user data
    await user.save();

    res.status(200).json({
      success: true,
      message: `Post successfully ${type}`
    });
  } catch (error) {
    console.error("Error in postsController:", error);
    res.status(500).json({
      success: false,
      message: "Internal error: postsController"
    });
  }
};

module.exports = postsController;
