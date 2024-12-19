import React, { useState } from "react";
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
import { CreatePostSection } from "../components";
import LeftSidebar from "../components/LeftSidebar";
import { mockNotifications } from "../util/data";


const NotificationPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedComments, setSelectedComments] = useState([]);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const handleLike = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, likes: notification.likes + 1 }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleViewComments = (comments) => {
    setSelectedComments(comments);
    setCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setSelectedComments([]);
  };

  const handleAddComment = (id, comment) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? {
            ...notification,
            comments: [
              ...notification.comments,
              {
                id: notification.comments.length + 1,
                username: "You",
                text: comment
              }
            ]
          }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Box sx={{ paddingTop: "40px" }}>
        <Container maxWidth="lg">
          {/* Create Post Section */}
          <CreatePostSection />

          {/* Main Content */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
            gap={4}
          >
            <Box>
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="bg-gray-800 text-gray-200 mb-4 shadow-lg"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "550px" // Set a fixed height for all cards
                  }}
                >
                  <CardHeader
                    avatar={<Avatar src={notification.avatar} />}
                    title={
                      <Typography className="font-bold text-white">
                        {notification.username}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" className="text-gray-400">
                        {notification.time}
                      </Typography>
                    }
                  />
                  <CardMedia
                    component="img"
                    image={notification.image}
                    alt="Post Image"
                    sx={{
                      height: "300px", // Ensure consistent image height
                      objectFit: "cover",
                      borderTop: "1px solid rgba(255,255,255,0.1)"
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>{notification.content}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => handleLike(notification.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FavoriteIcon />
                      <Typography className="ml-1">
                        {notification.likes}
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
                    <IconButton className="text-gray-400 hover:text-green-500">
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
                            notification.id,
                            e.target.value.trim()
                          );
                          e.target.value = "";
                        }
                      }}
                    />
                  </Box>
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
              <LeftSidebar />
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
              <ListItem key={comment.id}>
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
