import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import TitleIcon from "@mui/icons-material/Title";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const categories = ["Technology", "Health", "Travel", "Food", "Business"];

const CreatePostSection = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!title || !category || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    const postData = {
      title,
      category,
      content,
      image
    };

    console.log("Post Submitted:", postData);
    alert("Post created successfully!");
    handleClose();
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setImage(null);
  };

  return (
    <Box
      className="bg-gray-800 text-gray-200 p-4 rounded-lg shadow-md mb-6"
      display="flex"
      flexDirection="column"
    >
      {/* Input Section */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          src="https://i.pravatar.cc/150?img=10"
          alt="User Avatar"
          className="mr-4"
        />
        <Button
          variant="outlined"
          fullWidth
          onClick={handleOpen}
          sx={{
            textAlign: "left",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            ":hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" }
          }}
        >
          What's on your mind?
        </Button>
      </Box>

      {/* Dialog Box for Creating a Post */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Title Field */}
            <Box>
              <Typography
                variant="h6"
                className="text-white mb-2 flex items-center"
              >
                <TitleIcon className="mr-2 text-blue-400" /> Title
              </Typography>
              <TextField
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  input: { color: "white" }
                }}
              />
            </Box>

            {/* Category Selection */}
            <Box>
              <Typography
                variant="h6"
                className="text-white mb-2 flex items-center"
              >
                <CategoryIcon className="mr-2 text-blue-400" /> Category
              </Typography>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>
                  Select a category
                </InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white"
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Content Field */}
            <Box>
              <Typography
                variant="h6"
                className="text-white mb-2 flex items-center"
              >
                <DescriptionIcon className="mr-2 text-blue-400" /> Content
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="outlined"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  input: { color: "white" }
                }}
              />
            </Box>

            {/* Image Upload */}
            <Box>
              <Typography
                variant="h6"
                className="text-white mb-2 flex items-center"
              >
                <AddPhotoAlternateIcon className="mr-2 text-blue-400" /> Upload
                Image (Optional)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                className="text-blue-400 hover:text-white"
              >
                Choose Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {image && (
                <Typography className="mt-2 text-gray-300">
                  Selected: {image.name}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreatePostSection;
