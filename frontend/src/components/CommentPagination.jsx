import React, { useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommentPagination = ({ comments, postId, handleDeleteComment }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const commentsPerPage = 2; // Number of comments to display per page

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Get the comments to display on the current page
  const paginatedComments = comments.slice(
    currentPage * commentsPerPage,
    currentPage * commentsPerPage + commentsPerPage
  );

  return (
    <Box>
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
      {paginatedComments.map((comment) => (
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
            src="https://i.pravatar.cc/150?u=random"
            alt="User Avatar"
            sx={{ width: 40, height: 40 }}
          />
          {/* Comment Details */}
          <Box flexGrow={1}>
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
          {/* Delete Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF4D4F",
              color: "white",
              textTransform: "capitalize",
              fontSize: "0.75rem",
              "&:hover": {
                backgroundColor: "#D9363E"
              }
            }}
            onClick={() => handleDeleteComment(postId, comment._id)}
          >
            Delete
          </Button>
        </Box>
      ))}
      {/* Pagination Controls */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Button
          disabled={currentPage === 0}
          onClick={handlePreviousPage}
          sx={{
            backgroundColor: "#1976D2",
            color: "white",
            textTransform: "capitalize",
            "&:disabled": {
              backgroundColor: "rgba(255, 255, 255, 0.2)"
            }
          }}
        >
          Previous
        </Button>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          Page {currentPage + 1} of {totalPages}
        </Typography>
        <Button
          disabled={currentPage === totalPages - 1}
          onClick={handleNextPage}
          sx={{
            backgroundColor: "#1976D2",
            color: "white",
            textTransform: "capitalize",
            "&:disabled": {
              backgroundColor: "rgba(255, 255, 255, 0.2)"
            }
          }}
        >
          Next
        </Button>
      </Box>
      {/* View Other Comments Button */}
      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          sx={{
            borderColor: "rgba(255, 255, 255, 0.5)",
            color: "rgba(255, 255, 255, 0.8)",
            textTransform: "capitalize",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.8)",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }
          }}
          onClick={() => navigate(`/post/${postId}`)}
        >
          View Other Comments
        </Button>
      </Box>
    </Box>
  );
};

export default CommentPagination;
