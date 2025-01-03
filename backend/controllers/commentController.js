const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

const commentsController = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { comment, postId } = req.body;
    if (!comment || !postId) {
      return res
        .status(400)
        .json({ success: false, message: "Comment and Post ID are required" });
    }

    let post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    post.comments.push({ user: userId, text: comment });
    await post.save();

    const updatedPost = await Post.findById(postId).populate("comments.user");

    const comments = updatedPost.comments;

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comments
    });
  } catch (error) {
    console.error("Error in commentsController:", error);
    res
      .status(500)
      .json({ success: false, message: "Error commenting on the post" });
  }
};

module.exports = commentsController;
