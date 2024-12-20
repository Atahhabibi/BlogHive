const Post = require("../models/PostSchema");

const getSinglePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json({ success: true, post });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal error: GetPosts" });
  }
};

module.exports = getSinglePost;
