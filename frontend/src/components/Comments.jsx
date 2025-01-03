import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const CommentsSection = ({ comments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // Get comments for the current page
  const currentComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Display Comments */}
      {currentComments.map((comment) => (
        <Box
          key={comment._id}
          mb={2}
          p={2}
          border="1px solid rgba(255, 255, 255, 0.1)"
          borderRadius="8px"
          display="flex"
          alignItems="flex-start"
          gap={2}
        >
          {/* User Image */}
          {comment?.user?.image ? (
            <img
              src={comment.user.image}
              alt={comment.user?.userName?.charAt(0) || "U"}
              onError={(e) => {
                e.target.src =
                  "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-avatar-placeholder-abstract-white-blue-green-png-image_3918476.jpg";
              }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          ) : (
            <Box
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography variant="caption" style={{ color: "#fff" }}>
                {comment.user?.userName?.charAt(0) || "U"}
              </Typography>
            </Box>
          )}

          {/* Comment Content */}
          <Box>
            <Typography
              variant="body1"
              style={{
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "5px"
              }}
            >
              {comment.user?.userName || "Anonymous"}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#ddd", marginBottom: "5px" }}
            >
              {comment.text}
            </Typography>
            <Typography
              variant="caption"
              style={{ color: "#888", fontSize: "0.8rem" }}
            >
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={4} gap={2}>
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant={index + 1 === currentPage ? "contained" : "outlined"}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default CommentsSection;
