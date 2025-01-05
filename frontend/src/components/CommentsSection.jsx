import React from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";

const CommentsSection = ({ commentsPosts = [] }) => {
  return (
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
                    xs: "1fr", // Single column for smaller screens
                    sm: "1fr 1fr" // Two columns for medium to large screens
                  }}
                  gap={4}
                  justifyContent="center"
                  alignItems="center"
                >
                  {commentsPosts.map((post) => (
                    <Box
                      key={post._id}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        padding: 4,
                        borderRadius: "15px",
                        color: "white",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)"
                        }
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
                            maxWidth: "300px",
                            borderRadius: "10px",
                            marginBottom: "1rem"
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
  
                      {/* Comments */}
                      <Box mt={2}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500,
                            marginBottom: "1rem",
                            color: "rgba(255, 255, 255, 0.8)"
                          }}
                        >
                          Comments:
                        </Typography>
                        {post.comments.length > 0 ? (
                          post.comments.map((comment) => (
                            <Box
                              key={comment._id}
                              sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                padding: 2,
                                borderRadius: "10px",
                                marginBottom: "1rem",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2
                              }}
                            >
                              {/* Placeholder Avatar */}
                              <Avatar
                                src={user?.image}
                                alt="User Avatar"
                                sx={{ width: 40, height: 40 }}
                              />
                              {/* Comment Details */}
                              <Box>
                                <Typography
                                  variant="body2"
                                  className="text-white"
                                  sx={{
                                    fontFamily: "'Roboto', sans-serif",
                                    fontWeight: 500
                                  }}
                                >
                                  {comment.text}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  className="text-gray-400"
                                  sx={{ fontSize: "0.75rem" }}
                                >
                                  {new Date(comment.createdAt).toLocaleString()}
                                </Typography>
                              </Box>
                            </Box>
                          ))
                        ) : (
                          <Typography
                            variant="body2"
                            className="text-gray-400"
                            sx={{
                              fontFamily: "'Roboto', sans-serif",
                              fontStyle: "italic"
                            }}
                          >
                            No comments yet.
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
  );
};

export default CommentsSection;
