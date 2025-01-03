import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography
} from "@mui/material";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from "react-share";

const ShareDialog = ({ postUrl, postTitle, open = false, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "15px",
          padding: "20px",
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)"
        }
      }}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.05)" } // Subtle dark overlay
      }}
    >
      {/* Replace DialogTitle with Typography */}
      <Box
        component="div"
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
        }}
      >
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          Share This Post
        </Typography>
      </Box>
      <DialogContent>
        <Typography
          variant="body1"
          style={{ marginBottom: "20px", color: "#666" }}
        >
          Spread the word about this post on your favorite platforms!
        </Typography>
        <Box display="flex" justifyContent="center" gap={3}>
          <FacebookShareButton url={postUrl} quote={postTitle}>
            <FacebookIcon size={50} round />
          </FacebookShareButton>
          <TwitterShareButton url={postUrl} title={postTitle}>
            <TwitterIcon size={50} round />
          </TwitterShareButton>
          <LinkedinShareButton url={postUrl} title={postTitle}>
            <LinkedinIcon size={50} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={postUrl} title={postTitle}>
            <WhatsappIcon size={50} round />
          </WhatsappShareButton>
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", marginTop: "15px" }}>
        <Button
          onClick={onClose}
          variant="contained"
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            textTransform: "none",
            padding: "8px 20px",
            borderRadius: "20px"
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
