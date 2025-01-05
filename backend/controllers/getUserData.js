const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

const getUserData = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Fetch user data with populated fields
    const user = await User.findById(userId)
      .populate("posts")
      .populate("savedPosts")
      .populate("commentsPosts")
      .populate("bookmarkedPosts")
      .populate("sharedPosts")
      .populate("likedPosts")
      .populate({
        path: "followers",
        populate: { path: "_id", model: "User",select:"-password" } 
      })
      .select("-password");

    // If no user is found, return an appropriate response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Extract specific fields
    const {
      posts,
      savedPosts,
      likedPosts,
      bookmarkedPosts,
      sharedPosts,
      commentsPosts
    } = user;

    // Send the response
    res.status(200).json({
      user,
      success: true,
      data: {
        allPosts: posts,
        savedPosts,
        likedPosts,
        bookmarkedPosts,
        sharedPosts,
        commentsPosts
      }
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error: Unable to fetch user data"
    });
  }
};

module.exports = getUserData;
