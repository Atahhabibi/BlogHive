const express = require("express");
const authenticate = require("../middleware/authenticate");

const {
  registerUser,
  loginUser,
  loginThroughGoogle
} = require("../controllers/authLoginRegister");
const CreatePost = require("../controllers/CreatePost");

const router = express.Router();
const upload = require("../cloudinary/multer");
const getUsers = require("../controllers/getUsers");
const getPosts = require("../controllers/getPosts");
const getSinglePost = require("../controllers/getSinglePost");
const getUserData = require("../controllers/getUserData");
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentController");
const handleFollowerController = require("../controllers/handleFollowerController");
const deletePostController = require("../controllers/deletePostController");
const editPostController = require("../controllers/editPostController");
const deleteCommentController = require("../controllers/deleteCommentController");
const getSingleFollower = require("../controllers/followerControlller");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/createPost",authenticate, upload.single("image"), CreatePost);
router.post("/googleLogin", loginThroughGoogle);
router.get("/users", getUsers);
router.get("/posts", getPosts);
router.get("/userData", authenticate, getUserData);
router.get("/posts/:id", getSinglePost);
router.post("/handlePost", authenticate, postsController);
router.post("/handleComment", authenticate, commentsController);
router.get("/handleFollower/:id", authenticate, handleFollowerController);
router.delete("/deletePost/:id", authenticate, deletePostController);
router.put(
  "/editpost/:id",
  upload.single("image"),
  authenticate,
  editPostController
);
router.delete(
  "/posts/:postId/comment/:commentId",
  authenticate,
 deleteCommentController
);

router.get("/followers/:id",authenticate,getSingleFollower);

module.exports = router;
