import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  TextField,
  Button
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Icon for the header
import { samplePosts } from "../util/data";
import { CreatePostForm } from "../components";
import { PostCard } from "../components";
import Pagination from "../components/Pagination";

const POSTS_PER_PAGE = 4; // Number of posts per page

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState(samplePosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ name: "", date: "" });

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!title || !content || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      category,
      image: image ? URL.createObjectURL(image) : null,
      date: new Date().toISOString()
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ name: "", date: "" });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesName = post.title
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const matchesDate = filters.date
      ? post.date.startsWith(filters.date)
      : true;
    return matchesName && matchesDate;
  });

  const getPaginatedPosts = () => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 py-16">
      <Container
        sx={{
          maxWidth: { xs: "100%", md: "900px", lg: "1200px" }
        }}
      >
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mb={2}
          >
            <AddCircleOutlineIcon sx={{ fontSize: "3rem", color: "blue" }} />
            <Typography
              variant="h2"
              className="font-bold text-white"
              sx={{ fontSize: { xs: "2rem", md: "2rem" } }}
            >
              Create a New Post
            </Typography>
          </Box>
          <Typography
            variant="body1"
            className="text-gray-400"
            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            Share your thoughts, insights, and ideas with the BlogHive
            community.
          </Typography>
        </Box>

        {/* Form Section */}
        <Card className="p-8 bg-gray-800 shadow-lg mb-8">
          <CreatePostForm
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            content={content}
            setContent={setContent}
            handleImageUpload={handleImageUpload}
            image={image}
            handleSubmit={handleSubmit}
          />
        </Card>

        {/* Filter Section */}
        <Box
          className="mb-6"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          gap={2}
        >
          <TextField
            label="Filter by Name"
            variant="outlined"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              input: { color: "white" }
            }}
          />
          <TextField
            type="date"
            variant="outlined"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              input: { color: "white" }
            }}
          />
          <Button
            variant="contained"
            onClick={clearFilters}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            sx={{ padding: "15px 10px", fontWeight: "bold",width:"20rem" }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Posts Section */}
        <Box display="flex" flexWrap="wrap" gap={4}>
          {getPaginatedPosts().map((post) => (
            <Box key={post.id} flex="1 1 calc(50% - 1rem)">
              <PostCard post={post} />
            </Box>
          ))}
        </Box>

        {/* Pagination Section */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </div>
  );
};

export default CreatePostPage;
