import React from "react";
import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import { Error, Loading } from "../components";
import InsightsIcon from "@mui/icons-material/Insights";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import useFollowMutation from "../customHooks/useFollowMutation";

const FollowerPage = () => {
  const { id } = useParams(); // Get follower ID from the URL
  const navigate = useNavigate();
  const[followed,setFollowed]=useState(true);

  const handleFollowerMutation = useFollowMutation();

  // Fetch follower details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Follower", id],
    queryFn: async () => {
      const response = await authCustomFetch(`/followers/${id}`);
      return response.data;
    }
  });

    const handleFollow = (id) => {
      setFollowed(!followed)
      handleFollowerMutation.mutate({ id });
    };


  const follower = data?.follower || {};

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Box className="bg-gray-900 text-gray-200" minHeight="100vh" py={8} px={4}>
      {/* Follower Details Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={6}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 4,
          borderRadius: "15px",
          maxWidth: "800px",
          m: "2rem auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
        }}
      >
        <Avatar
          src={follower?.image}
          alt={follower?.userName}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: "3px solid rgba(255, 255, 255, 0.3)",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(255, 255, 255, 0.3)"
            }
          }}
        />
        <Typography
          variant="h4"
          className="font-bold text-white"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.5px"
          }}
        >
          {follower?.userName}
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-400"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1rem",
            marginTop: "0.5rem"
          }}
        >
          {follower.jobDescription || "No job description provided"}
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-500"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.875rem",
            marginTop: "0.5rem"
          }}
        >
          Location: {follower.location || "No location provided"}
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#45A049"
              }
            }}
            onClick={() => navigate(-1)}
          >
            Back to Followers
          </Button>
          <Button
            variant="outlined"
            sx={{
              border: followed ? "2px solid #1877F2" : "2px solid #E0E0E0", // Blue border for followed, gray border for not followed
              color: followed ? "white" : "#1877F2", // White text for followed, blue text for follow
              backgroundColor: followed ? "#1877F2" : "white", // Blue background for followed, white for not followed
              textTransform: "capitalize", // Make text title case
              borderRadius: "20px",
              fontWeight: "bold",
              padding: "8px 16px", 
              transition: "all 0.3s ease", 
              "&:hover": {
                backgroundColor: followed ? "#145DBF" : "#F0F0F0",
                borderColor: followed ? "#145DBF" : "#1877F2" 
              }
            }}
            onClick={() => handleFollow(id)}
          >
            {followed ? "Following" : "Follow"} 
          </Button>
        </Box>
      </Box>

      {/* Statistics Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
        sx={{
          maxWidth: "800px",
          margin: "2rem auto",
          gap: 2
        }}
      >
        {[
          { label: "Total Posts", value: follower.CalcNums?.totalPosts || 0 },
          {
            label: "Total Comments",
            value: follower.CalcNums?.totalComments || 0
          },
          { label: "Total Likes", value: follower.CalcNums?.totalLikes || 0 },
          {
            label: "Total Bookmarks",
            value: follower.CalcNums?.totalBookmarks || 0
          }
        ].map((stat, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: 3,
              borderRadius: "10px",
              flex: "1 1 calc(50% - 1rem)",
              minWidth: "200px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginBottom: "0.5rem"
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Recent Posts Section */}
      <Typography
        variant="h5"
        className="font-bold text-white mb-6 text-center"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.5px"
        }}
      >
        Recent Posts by {follower?.userName}
      </Typography>
      {follower?.posts && follower?.posts?.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {follower.posts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post._id}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)"
                  }
                }}
              >
                {/* Post Image */}
                {post.image && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      backgroundImage: `url(${post.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  />
                )}
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%"
                  }}
                >
                  {/* Post Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden"
                    }}
                  >
                    {post.title}
                  </Typography>
                  {/* Post Description */}
                  <Typography
                    variant="body2"
                    className="text-gray-400"
                    sx={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "0.875rem",
                      marginBottom: "1rem",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    {post.description || "No description available."}
                  </Typography>
                  {/* View Post Button */}
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      marginTop: "auto",
                      backgroundColor: "#1976D2",
                      color: "white",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#155AA8"
                      }
                    }}
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    View Post
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
          <InsertEmoticonIcon
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "4rem",
              marginRight: "1rem"
            }}
          />
          <Typography
            variant="body1"
            className="text-gray-400 text-center"
            sx={{
              fontFamily: "'Roboto', sans-serif"
            }}
          >
            No recent posts available.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FollowerPage;
