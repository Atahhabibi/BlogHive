const Post = require("../models/PostSchema");


const getPosts=async(req,res)=>{
  try {
    const posts=await Post.find(); 
      res.status(200).json({ success: true, posts });
  } catch (error) {
      res.status(500).json({ success: false, message:"Internal error: GetPosts"});
  }
}



module.exports=getPosts; 