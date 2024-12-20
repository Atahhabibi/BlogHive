const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must not exceed 50 characters"]
    },
    googleId: {
      type: String,
      default: null
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address"
      ]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [128, "Password cannot exceed 128 characters"]
    },
    jobTitle: {
      type: String,
      trim: true,
      maxlength: [50, "Job title cannot exceed 50 characters"]
    },
    jobDescription: {
      type: String,
      trim: true,
      default: "Enter your job description",
      maxlength: [500, "Job description cannot exceed 500 characters"]
    },
    location: {
      type: String,
      trim: true,
      default: "Enter your location",
      maxlength: [100, "Location cannot exceed 100 characters"]
    },
    image: {
      type: String,
      validate: {
        validator: function (value) {
          // Allow dynamic URLs without file extensions
          return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(value);
        },
        message: "Image URL must be a valid URL"
      }
    },
    // References to other schemas
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }
    ],
    commentsPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }
    ],
    bookmarkedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }
    ],
    sharedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }
    ],
    followers: [
      {
        followerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        followedAt: { type: Date, default: Date.now }
      }
    ],
    CalcNums: {
      totalPosts: {
        type: Number,
        default: 0,
        min: [0, "Total posts cannot be negative"]
      },
      totalComments: {
        type: Number,
        default: 0,
        min: [0, "Total comments cannot be negative"]
      },
      totalLikes: {
        type: Number,
        default: 0,
        min: [0, "Total likes cannot be negative"]
      },
      totalBookmarks: {
        type: Number,
        default: 0,
        min: [0, "Total bookmarks cannot be negative"]
      }
    }
  },
  {
    timestamps: true
  }
);

// Middleware to update CalcNums before saving
userSchema.pre("save", function (next) {
  this.CalcNums.totalPosts = this.posts.length;
  this.CalcNums.totalComments = this.commentsPosts.length;
  this.CalcNums.totalLikes = this.likedPosts.length;
  this.CalcNums.totalBookmarks = this.bookmarkedPosts.length;
  next();
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
