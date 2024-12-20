const mongoose = require("mongoose");
const Post = require("./models/PostSchema"); // Adjust the path to your Post model
const samplePosts = require("./util/samplePosts"); // Adjust the path to your sampleData file

const populatePosts = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://atahjan:Vz1XD8YFPhUsQ0WI@cluster0.6xqy6.mongodb.net/bloghive",
  
    );

    console.log("MongoDB connected");
    await Post.deleteMany({});
    console.log("Cleared existing posts");
    await Post.insertMany(samplePosts);
    console.log("Sample posts added");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    mongoose.connection.close();
  }
};

populatePosts();
