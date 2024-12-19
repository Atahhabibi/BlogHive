import React from "react";
import { Button, Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (start > 1) range.unshift("...");
    if (end < totalPages) range.push("...");

    if (!range.includes(1)) range.unshift(1);
    if (!range.includes(totalPages)) range.push(totalPages);

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <Box
      className="flex justify-center items-center space-x-2 mt-8 bg-gray-800 p-4 rounded-lg shadow-md"
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <IconButton
        className={`${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "text-blue-400 hover:text-blue-500"
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <NavigateBeforeIcon />
      </IconButton>

      {/* Page Numbers */}
      {paginationRange.map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={page === currentPage ? "contained" : "outlined"}
            size="small"
            onClick={() => onPageChange(page)}
            className={`${
              page === currentPage
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-gray-400 border-gray-500 hover:border-gray-300 hover:bg-gray-700"
            } rounded-md`}
            style={{
              minWidth: "36px",
              height: "36px",
              fontSize: "0.875rem"
            }}
          >
            {page}
          </Button>
        ) : (
          <Typography
            key={index}
            className="text-gray-400 select-none px-2"
            variant="body2"
          >
            {page}
          </Typography>
        )
      )}

      {/* Next Button */}
      <IconButton
        className={`${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "text-blue-400 hover:text-blue-500"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
