import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PostIcon from "@mui/icons-material/Article"; // Icon for My Posts
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard"; // Post card for posts

// Mock User Data
const mockUser = {
  avatar: "https://i.pravatar.cc/150?img=7",
  name: "Jane Doe",
  bio: "Full Stack Developer | Tech Enthusiast | Blogger",
  location: "San Francisco, CA",
  posts: [
    {
      id: 1,
      title: "Exploring React 18 Features",
      category: "Technology",
      date: new Date(),
      image:
        "https://images.pexels.com/photos/27303505/pexels-photo-27303505.jpeg"
    },
    {
      id: 2,
      title: "Top 10 Places to Visit in 2024",
      category: "Travel",
      date: new Date(),
      image:
        "https://images.pexels.com/photos/3713501/pexels-photo-3713501.jpeg"
    }
  ],
  bookmarks: [],
  comments: [
    {
      id: 1,
      comment: "Great explanation of React Hooks!",
      post: {
        id: 1,
        title: "Exploring React 18 Features",
        category: "Technology",
        date: new Date(),
        image:
          "https://images.pexels.com/photos/27303505/pexels-photo-27303505.jpeg"
      }
    },
    {
      id: 2,
      comment: "This travel guide was super helpful!",
      post: {
        id: 2,
        title: "Top 10 Places to Visit in 2024",
        category: "Travel",
        date: new Date(),
        image:
          "https://images.pexels.com/photos/3713501/pexels-photo-3713501.jpeg"
      }
    }
  ],
  likedPosts: [
    {
      id: 4,
      title: "State Management with Redux Toolkit",
      category: "Programming",
      date: new Date(),
      image:
        "https://images.pexels.com/photos/3182775/pexels-photo-3182775.jpeg"
    }
  ]
};

const ProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 py-8">
      <Container maxWidth="lg">
        {/* User Info Section */}
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          mb={4}
          mt={5}
        >
          <Avatar
            src={mockUser.avatar}
            alt={mockUser.name}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h4" className="font-bold text-white">
            {mockUser.name}
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            {mockUser.bio}
          </Typography>
          <Typography variant="body2" className="text-gray-500 mt-1">
            {mockUser.location}
          </Typography>
        </Box>

        {/* Actions Section */}
        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/editProfile")}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            className="text-gray-400 border-gray-500 hover:border-gray-300"
            onClick={() => alert("Logged out successfully!")}
          >
            Logout
          </Button>
        </Box>

        {/* Tabs Section */}
        <Box>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            centered
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="My Posts" icon={<PostIcon />} />
            <Tab label="Bookmarks" icon={<BookmarkIcon />} />
            <Tab label="Comments" icon={<CommentIcon />} />
            <Tab label="Liked Posts" icon={<FavoriteIcon />} />
          </Tabs>
        </Box>

        {/* Content Based on Tab */}
        <Box mt={4}>
          {/* My Posts */}
          {tabValue === 0 && (
            <>
              <Typography
                variant="h5"
                className="font-bold text-white mb-4 text-center"
              >
                My Posts
              </Typography>
              <Grid container spacing={4}>
                {mockUser.posts.map((post) => (
                  <Grid item xs={12} md={6} key={post.id}>
                    <PostCard post={post} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Bookmarks */}
          {tabValue === 1 && (
            <>
              <Typography
                variant="h5"
                className="font-bold text-white mb-4 text-center"
              >
                Bookmarked Posts
              </Typography>
              <Grid container spacing={4}>
                {mockUser.bookmarks.map((post) => (
                  <Grid item xs={12} md={6} key={post.id}>
                    <PostCard post={post} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Comments */}
          {tabValue === 2 && (
            <>
              <Typography
                variant="h5"
                className="font-bold text-white mb-4 text-center"
              >
                Comments
              </Typography>
              {mockUser.comments.map((comment) => (
                <Box key={comment.id} mb={4}>
                  <Typography variant="body1" className="text-gray-400 mb-2">
                    "{comment.comment}"
                  </Typography>
                  <PostCard post={comment.post} />
                </Box>
              ))}
            </>
          )}

          {/* Liked Posts */}
          {tabValue === 3 && (
            <>
              <Typography
                variant="h5"
                className="font-bold text-white mb-4 text-center"
              >
                Liked Posts
              </Typography>
              <Grid container spacing={4}>
                {mockUser.likedPosts.map((post) => (
                  <Grid item xs={12} md={6} key={post.id}>
                    <PostCard post={post} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ProfilePage;
