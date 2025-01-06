const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const Post = require("../models/PostSchema");
const extractToken = require("../util/extractToken");
require("dotenv").config();


const CreatePost = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = extractToken(authHeader);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { title, category, content } = req.body;

    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and content are required"
      });
    }

    // Get the uploaded image URL from Cloudinary
    const image = req.file ? req.file.path : null;

  

    const newPost = new Post({
      title,
      category,
      description: content,
      image,
      UserPost: user._id
    });

    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = CreatePost;
