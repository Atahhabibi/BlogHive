const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

const postsController = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const { id: postId, type } = req.body;


    const post=await Post.findById(postId); 



    if (!postId || !type) {
      return res.status(400).json({
        success: false,
        message: "Post ID and action type are required"
      });
    }

    let message = "";

    switch (type) {
      case "liked":
        if (!post) {
          message = "Post not found";
          break;
        }

        if (user.likedPosts.some((id) => id.toString() === postId)) {
          // If the user already liked the post, unlike it
          user.likedPosts = user.likedPosts.filter(
            (id) => id.toString() !== postId
          );
          await Post.updateOne({ _id: postId }, { $inc: { numLikes: -1 } });
          message = "Post unliked";
        } else {
          // If the user hasn't liked the post, like it
          user.likedPosts.push(postId);
          await Post.updateOne({ _id: postId }, { $inc: { numLikes: 1 } }); // Increase numLikes

          message = "Post liked";
        }
        break;

      case "bookmarked":
        if (user.bookmarkedPosts.some((id) => id.toString() === postId)) {
          user.bookmarkedPosts = user.bookmarkedPosts.filter(
            (id) => id.toString() !== postId
          );
          message = "Post removed from bookmarks";
        } else {
          user.bookmarkedPosts.push(postId);
          message = "Post bookmarked";
        }
        break;

      case "shared":
        if (user.sharedPosts.some((id) => id.toString() === postId)) {
          user.sharedPosts = user.sharedPosts.filter(
            (id) => id.toString() !== postId
          );
          message = "Post unshared";
        } else {
          user.sharedPosts.push(postId);
          message = "Post shared";
        }
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid action type"
        });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message
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
