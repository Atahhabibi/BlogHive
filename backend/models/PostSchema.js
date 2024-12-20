const mongoose = require("mongoose");

// Define the Post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    image: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString() // Stores time in a readable format
    },
    numLikes: {
      type: Number,
      default: 0,
      min: [0, "Number of likes cannot be negative"]
    },
    numBookmarked: {
      type: Number,
      default: 0,
      min: [0, "Number of bookmarks cannot be negative"]
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: [0, "Number of comments cannot be negative"]
    },
    shareCounts: {
      type: Number,
      default: 0,
      min: [0, "Number of shares cannot be negative"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "Technology",
        "Health",
        "Travel",
        "Lifestyle",
        "Education",
        "Business",
        "Others"
      ] // Add more categories as needed
    },
    UserPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User who created the post is required"]
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        text: {
          type: String,
          required: true,
          trim: true,
          maxlength: [500, "Comment cannot exceed 500 characters"]
        },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt
  }
);

// Middleware to automatically update commentsCount
postSchema.pre("save", function (next) {
  this.commentsCount = this.comments.length;
  next();
});

// Create the Post model
const Post = mongoose.model("Post", postSchema);

// Export the Post model
module.exports = Post;
