import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Error = ({ message = "An error occurred.", onRetry }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
    >
      <Typography variant="h6" color="error" mb={2}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
};

export default Error;
