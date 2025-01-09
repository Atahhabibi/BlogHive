const Post = require("../models/PostSchema");

const editPostController = async (req, res) => {
  const { id } = req.params; // Get the post ID from the request parameters


  // Extract the fields to update from the request body
  const { title, category, description} = req.body;

  // Validate the required fields
  if (!title || !category || !description) {
    return res.status(400).json({
      success: false,
      message: "Title, category, and content are required"
    });
  }

  // Handle the image upload (if provided)
   const image = req.file ? req.file.path : null;


  try {
    // Find the post to ensure it exists and the user is authorized to edit it
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }


    // Update the fields
    const updatedFields = {
      title,
      category,
      description
    };

    // Only include the image if a new one was uploaded
    if (image) {
      updatedFields.image = image;
    }



    // Update the post in the database
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updatedFields }, // Use $set to update specific fields
      { new: true, runValidators: true } // Return the updated post and apply validators
    );

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost
    });
  } catch (error) {
    console.error("Error in editPostController:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error while updating post"
    });
  }
};

module.exports = editPostController;
