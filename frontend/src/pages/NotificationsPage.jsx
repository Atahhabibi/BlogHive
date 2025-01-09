import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Box,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  CardMedia
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { CreatePostSection, Error, Loading } from "../components";
import LeftSidebar from "../components/LeftSidebar";
import { mockNotifications } from "../util/data";
import useAppData from "../customHooks/useAppData";
import useUserData from "../customHooks/useUserData";
import LoadingIndicator from "../components/Loading";
import { useHandlePostMutation } from "../customHooks/useHandlePostMutation ";
import { handlePostAction } from "../util/resusbaleFuncitons";
import useCommentMutation from "../customHooks/useCommentMutation";
import { ShareDialog } from "../components";
import LazyCardMedia from "../components/LazyCardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const { data } = useAppData();
  const { data: userData, isLoading, error } = useUserData();
  const posts = data?.posts?.posts || [];
  const user = userData?.user || {};
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handlePostMuatation = useHandlePostMutation();
  const commentMutation = useCommentMutation();

  const users = data?.users?.users || [];

  const sharedPosts = user?.sharedPosts || [];
  const bookmarkedPosts = user?.bookmarkedPosts || [];
  const likedPosts = user?.likedPosts || [];

  const LikesPostIds = likedPosts.map((item) => item._id);
  const SharedPostIds = sharedPosts.map((item) => item._id);
  const BookmarkedPostIds = bookmarkedPosts.map((item) => item._id);

  const [notifications, setNotifications] = useState(posts);
  const [selectedComments, setSelectedComments] = useState([]);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentSharePost, setCurrentSharePost] = useState({});

  useEffect(() => {
    setNotifications(posts);
  }, [posts]);

  const handleViewComments = (comments) => {
    setSelectedComments(comments);
    setCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setSelectedComments([]);
  };

  const handleShareDialogClose = () => {
    setShareDialogOpen(false);
    setCurrentSharePost({});
  };

  const handleShareClick = (post) => {
    setCurrentSharePost(post);
    setShareDialogOpen(true);
  };

  const handleAddComment = (id, comment) => {
    commentMutation.mutate({ comment, postId: id });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Box sx={{ paddingTop: "40px" }}>
        <Container maxWidth="lg">
          {/* Create Post Section */}
          <CreatePostSection user={user} />

          {/* Main Content */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
            gap={4}
          >
            <Box>
              {notifications.map((notification) => (
                <Card
                  key={notification._id}
                  className="bg-gray-800 text-gray-200 mb-4 shadow-lg"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "550px", // Set a fixed height for all cards
                    cursor: "pointer"
                  }}
                >
                  <CardHeader
                    avatar={<Avatar src={notification.UserPost?.image} />}
                    title={
                      <Typography className="font-bold text-white">
                        {notification.UserPost?.userName || "anynonomus"}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" className="text-gray-400">
                        {notification.time}
                      </Typography>
                    }
                  />

                  <div
                    onClick={() => navigate(`/post/${notification._id}`)}
                    style={{
                      cursor: "pointer", // Makes the entire container clickable
                      width: "100%", // Ensures it spans the full width
                      display: "block" // Allows it to behave as a block element
                    }}
                  >
                    <img
                      src={notification.image}
                      alt="Post Image"
                      style={{
                        width: "100%", // Makes the image span the full width
                        height: "300px", // You can adjust this as needed
                        borderRadius: "8px",
                        overflow: "hidden", // Ensures content fits nicely within the border radius
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        objectFit: "cover"
                      }}
                    />
                  </div>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>{notification.description}</Typography>
                  </CardContent>

                  <CardActions>
                    {/* Like Button */}
                    <IconButton
                      onClick={() =>
                        handlePostAction(
                          { id: notification._id, type: "liked" },
                          handlePostMuatation,
                          navigate
                        )
                      }
                      className={`${
                        LikesPostIds.includes(notification._id)
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      {LikesPostIds.includes(notification._id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                      <Typography className="ml-1">
                        {notification.numLikes}
                      </Typography>
                    </IconButton>

                    {/* Comment Button */}
                    <IconButton
                      className="text-gray-400 hover:text-blue-500"
                      onClick={() => handleViewComments(notification.comments)}
                    >
                      <CommentIcon />
                      <Typography className="ml-1">
                        {notification.comments.length}
                      </Typography>
                    </IconButton>

                    {/* Share Button */}
                    <IconButton
                      className="text-gray-400 hover:text-green-500"
                      onClick={() => {
                        handleShareClick(notification);
                      }}
                    >
                      <ShareIcon />
                    </IconButton>

                    {/* Bookmark Button */}
                    <IconButton
                      onClick={() =>
                        handlePostAction(
                          { id: notification._id, type: "bookmarked" },
                          handlePostMuatation,
                          navigate
                        )
                      }
                      className={`${
                        BookmarkedPostIds.includes(notification._id)
                          ? "text-yellow-500"
                          : "text-gray-400 hover:text-yellow-500"
                      }`}
                    >
                      {BookmarkedPostIds.includes(notification._id) ? (
                        <BookmarkIcon />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </IconButton>
                  </CardActions>

                  <Box display="flex" alignItems="center" m={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Write a comment..."
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        input: { color: "white" }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          handleAddComment(
                            notification._id,
                            e.target.value.trim()
                          );
                          e.target.value = "";
                        }
                      }}
                    />
                  </Box>

                  <ShareDialog
                    open={shareDialogOpen}
                    onClose={handleShareDialogClose}
                    postUrl={`https://yourwebsite.com/post/${notification._id}`}
                    postTitle={notification.title}
                  />
                </Card>
              ))}
            </Box>

            {/* Right Sidebar */}
            <Box
              sx={{
                position: "sticky",
                top: "80px",
                height: "calc(100vh - 80px)",
                overflowY: "auto"
              }}
            >
              <LeftSidebar user={user} users={users} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Dialog for Comments */}
      <Dialog
        open={commentDialogOpen}
        onClose={handleCloseCommentDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <List>
            {selectedComments.map((comment) => (
              <ListItem key={comment._id}>
                <Box>
                  <Typography className="font-bold text-white">
                    {comment.username}
                  </Typography>
                  <Typography className="text-gray-400">
                    {comment.text}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationPage;
