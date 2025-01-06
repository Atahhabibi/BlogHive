const Post = require("../models/PostSchema");

const deleteCommentController = async (req, res) => {
  const { postId, commentId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  post.comments = post.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );
  await post.save();
  res
    .status(200)
    .json({ success: true, message: "Comment deleted successfully" });
};


module.exports=deleteCommentController; 