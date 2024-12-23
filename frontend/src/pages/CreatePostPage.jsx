import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  TextField,
  Button
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { samplePosts } from "../util/data"; // Temp data for UI
import { CreatePostForm, Loading, Error } from "../components";
import { PostCard } from "../components";
import Pagination from "../components/Pagination";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";
import useUserData from "../customHooks/useUserData";

const POSTS_PER_PAGE = 4; // Number of posts per page
const token = localStorage.getItem("authToken");

const CreatePostPage = () => {
  const { data, isLoading, error } = useUserData();
  console.log(data);
  const posts = data?.data || [];
  const user = data?.user || {};
  const allPosts = posts.allPosts || [];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ name: "", date: "" });

  const createPostMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await customFetch.post("/createPost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" // Important for FormData
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Post created successfully");
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);

      // Add the new post to the UI (use data from mutation)
      const newPost = {
        ...data.post,
        id: posts.length + 1 // Temporary ID for UI consistency
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.error(error);
    }
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the file object in the state
    }
  };

  console.log(createPostMutation.isLoading);

  const handleSubmit = () => {
    if (!title || !content || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    // Trigger the mutation
    createPostMutation.mutate(formData);
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
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const filteredPosts = allPosts.filter((post) => {
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
            createPostMutation={createPostMutation}
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
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              input: { color: "white" }
            }}
          />
          <Button
            variant="contained"
            onClick={clearFilters}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            sx={{ padding: "15px 10px", fontWeight: "bold", width: "20rem" }}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Posts Section */}
        <Box display="flex" flexWrap="wrap" gap={4}>
          {getPaginatedPosts().map((post) => (
            <Box key={post._id} flex="1 1 calc(50% - 1rem)">
              <PostCard post={post} user={user} />
            </Box>
          ))}
        </Box>

        {/* Pagination Section */}
        <Pagination
          totalPages={Math.ceil(allPosts.length / POSTS_PER_PAGE)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </div>
  );
};

export default CreatePostPage;
