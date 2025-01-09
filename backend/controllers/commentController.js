const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

const commentsController = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findOne({email});
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

    console.log(user);

    // Add the comment to the post
    post.comments.push({ user: user._id, text: comment });

    // Add the post ID to the user's `commentsPosts` array
    if (!user.commentsPosts.includes(postId)) {
      user.commentsPosts.push(postId); // Ensure no duplicates
    }

    // Save both post and user documents
    await Promise.all([user.save(), post.save()]);

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
