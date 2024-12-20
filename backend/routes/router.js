const express = require("express");
const authenticate=require('../middleware/authenticate')

const {
  registerUser,
  loginUser,
  loginThroughGoogle
} = require("../controllers/authcontroller");
const CreatePost = require("../controllers/CreatePost");

const router = express.Router();
const upload = require("../cloudinary/multer");
const getUsers = require("../controllers/getUsers");
const getPosts = require("../controllers/getPosts");
const getSinglePost = require("../controllers/getSinglePost");
const getUserData = require("../controllers/getUserData");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/createPost", upload.single("image"), CreatePost);
router.post("/googleLogin", loginThroughGoogle);
router.get('/users',getUsers); 
router.get('/posts',getPosts); 
router.get('/userData',authenticate,getUserData); 
router.get('/posts/:id',getSinglePost)

module.exports = router;