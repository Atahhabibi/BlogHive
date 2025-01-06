import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PostIcon from "@mui/icons-material/Article"; // Icon for My Posts
import PeopleIcon from "@mui/icons-material/People"; // Icon for Followers
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard"; // Post card for posts
import useUserData from "../customHooks/useUserData";
import { Loading, Error } from "../components";
import { CommentPagination } from "../components";
import useDeleteCommentMutation from "../customHooks/useDeleteCommentMutation";

const ProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const { data, isLoading, error } = useUserData();
  const posts = data?.data || [];
  const user = data?.user || {};

  const allPosts = posts.allPosts || [];
  const likedPosts = posts.likedPosts || [];
  const bookmarkedPosts = posts.bookmarkedPosts || [];
  const savedPosts = posts.savedPosts || [];
  const sharedPosts = posts.sharedPosts || [];
  const commentsPosts = posts?.commentsPosts || [];
  const followers = user?.followers || [];

  const deleteCommmentMutation = useDeleteCommentMutation();

  const handleDeleteComment = ({ postId, commentId }) => {
    deleteCommmentMutation.mutate({ postId, commentId });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

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
            src={user.image}
            alt="profile-img"
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h4" className="font-bold text-white">
            {user.userName}
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            {user.jobDescription || "No job description provided"}
          </Typography>
          <Typography variant="body2" className="text-gray-500 mt-1">
            {user.location || "No location provided"}
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
            <Tab label="Followers" icon={<PeopleIcon />} />
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
                {allPosts.map((post) => (
                  <Grid item xs={12} md={6} key={post._id}>
                    <PostCard post={post} user={user} tabName={"myPost"} />
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
                {bookmarkedPosts.map((post) => (
                  <Grid item xs={12} md={6} key={post._id}>
                    <PostCard post={post} tabName={"bookmark"} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Comments */}

          {/* Comments */}
          {tabValue === 2 && (
            <>
              <Typography
                variant="h4"
                className="font-bold text-white mb-6 text-center"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  fontWeight: 600
                }}
              >
                Comments
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns={{
                  xs: "1fr",
                  sm: "1fr 1fr"
                }}
                gap={4}
                justifyContent="center"
                alignItems="center"
              >
                {commentsPosts
                  .filter((post) => post.comments && post.comments.length > 0)
                  .map((post) => (
                    <Box
                      key={post._id}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        padding: 4,
                        borderRadius: "15px",
                        color: "white",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        height: "750px"
                      }}
                    >
                      {/* Post Title and Image */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        textAlign="center"
                        mb={3}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{
                            width: "100%",
                            height: "200px",
                            maxWidth: "300px",
                            borderRadius: "10px",
                            marginBottom: "1rem",
                            objectFit: "cover"
                          }}
                        />
                        <Typography
                          variant="h6"
                          className="font-bold text-white"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.5px"
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-gray-400"
                          sx={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "0.875rem",
                            marginTop: "0.5rem"
                          }}
                        >
                          {post.description}
                        </Typography>
                      </Box>

                      {/* Comments Pagination */}
                      <CommentPagination
                        comments={post.comments}
                        postId={post._id}
                        handleDeleteComment={handleDeleteComment}
                        user={user}
                      />
                    </Box>
                  ))}
              </Box>
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
                {likedPosts.map((post) => (
                  <Grid item xs={12} md={6} key={post._id}>
                    <PostCard post={post} tabName={"like"} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* Followers */}
          {tabValue === 4 && (
            <>
              <Typography
                variant="h4"
                className="font-bold text-white mb-6 text-center"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  fontWeight: 600
                }}
              >
                Followers
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns={{
                  xs: "1fr", // Single column for smaller screens
                  sm: "1fr 1fr" // Two columns for medium to large screens
                }}
                gap={4}
                justifyContent="center"
                alignItems="center"
              >
                {followers.map((follower) => (
                  <Box
                    key={follower._id._id}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      padding: 4,
                      borderRadius: "15px",
                      textAlign: "center",
                      color: "white",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)"
                      }
                    }}
                  >
                    {/* Follower Avatar */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap={1}
                    >
                      <Avatar
                        src={follower._id.image}
                        alt={follower._id.userName}
                        sx={{
                          width: 90,
                          height: 90,
                          mb: 2,
                          border: "3px solid rgba(255, 255, 255, 0.3)",
                          transition: "box-shadow 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 8px 16px rgba(255, 255, 255, 0.3)"
                          }
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          letterSpacing: "0.5px"
                        }}
                      >
                        {follower._id.userName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: "0.9rem",
                          color: "rgba(255, 255, 255, 0.7)"
                        }}
                      >
                        {follower._id.jobDescription ||
                          "No job description provided"}
                      </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={3}
                    >
                      <Button
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        sx={{
                          px: 3,
                          py: 1,
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          borderRadius: 3,
                          textTransform: "capitalize",
                          fontFamily: "'Roboto', sans-serif",
                          "&:hover": {
                            boxShadow: "0 4px 10px rgba(0, 0, 255, 0.4)"
                          }
                        }}
                        onClick={() =>
                          navigate(`/followers/${follower._id._id}`)
                        }
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#FF4D4F",
                          color: "white",
                          px: 3,
                          py: 1,
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          borderRadius: 3,
                          textTransform: "capitalize",
                          fontFamily: "'Roboto', sans-serif",
                          "&:hover": {
                            backgroundColor: "#D9363E",
                            boxShadow: "0 4px 10px rgba(255, 0, 0, 0.4)"
                          }
                        }}
                        onClick={() => handleUnfollow(follower._id._id)}
                      >
                        Unfollow
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ProfilePage;
