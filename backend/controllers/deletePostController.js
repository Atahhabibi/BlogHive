const Post = require("../models/PostSchema");

const deletePostController = async (req, res) => {
  const { id } = req.params; // Extract the id from req.params

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePostController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = deletePostController;
