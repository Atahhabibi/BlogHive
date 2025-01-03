const Post = require("../models/PostSchema");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "UserPost",
        select: "userName image email"
      })
      .populate({
        path: "comments.user",
        select: "userName image "
      });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error in getPosts:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal error: GetPosts" });
  }
};

module.exports = getPosts;
