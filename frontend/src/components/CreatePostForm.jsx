import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  TextareaAutosize
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import TitleIcon from "@mui/icons-material/Title";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";

const categories = ["Technology", "Health", "Travel", "Food", "Business"];

const CreatePostForm = ({
  title,
  setTitle,
  category,
  setCategory,
  content,
  setContent,
  handleImageUpload,
  image,
  handleSubmit
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* Title and Category Fields (Side by Side for Large Screens) */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        {/* Title Field */}
        <Box flex={1}>
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
        <Box flex={1}>
          <Typography
            variant="h6"
            className="text-white mb-2 flex items-center"
          >
            <CategoryIcon className="mr-2 text-blue-400" /> Category
          </Typography>
          <FormControl fullWidth>
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
              <MenuItem value="" disabled>
                Select a category
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Content Field */}
      <Box>
        <Typography variant="h6" className="text-white mb-2 flex items-center">
          <DescriptionIcon className="mr-2 text-blue-400" /> Content
        </Typography>
        <TextareaAutosize
          minRows={6}
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            fontFamily: "Roboto, sans-serif"
          }}
        />
      </Box>

      {/* Image Upload */}
      <Box>
        <Typography variant="h6" className="text-white mb-2 flex items-center">
          <AddPhotoAlternateIcon className="mr-2 text-blue-400" /> Upload Image
          (Optional)
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

      {/* Submit Button */}
      <Button
        variant="contained"
        size="large"
        className="bg-blue-600 hover:bg-blue-700"
        onClick={handleSubmit}
        fullWidth
      >
        Submit Post
      </Button>
    </Box>
  );
};

export default CreatePostForm;
