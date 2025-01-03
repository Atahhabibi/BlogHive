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

const NotificationPage = () => {
  const { data } = useAppData();
  const { data: userData, isLoading, error } = useUserData();
  const posts = data?.posts?.posts || [];
  const user = userData?.user || {};
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handlePostMuatation = useHandlePostMutation();
  const commentMutation = useCommentMutation();

  const [notifications, setNotifications] = useState(posts);
  const [selectedComments, setSelectedComments] = useState([]);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [currentSharePost, setCurrentSharePost] = useState({});
  

  console.log(user.image);

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
                    height: "550px" // Set a fixed height for all cards
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
                  <LazyCardMedia image={notification.image} alt="Post Image" />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>{notification.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() =>
                        handlePostAction(
                          { id: notification._id, type: "liked" },
                          handlePostMuatation
                        )
                      }
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FavoriteIcon />
                      <Typography className="ml-1">
                        {notification.numLikes}
                      </Typography>
                    </IconButton>
                    <IconButton
                      className="text-gray-400 hover:text-blue-500"
                      onClick={() => handleViewComments(notification.comments)}
                    >
                      <CommentIcon />
                      <Typography className="ml-1">
                        {notification.comments.length}
                      </Typography>
                    </IconButton>
                    <IconButton
                      className="text-gray-400 hover:text-green-500"
                      onClick={() => {
                        handleShareClick(notification);
                      }}
                    >
                      <ShareIcon />
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
              <LeftSidebar user={user} />
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
