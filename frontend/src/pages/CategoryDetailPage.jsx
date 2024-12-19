import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Breadcrumbs,
  Link,
  Select,
  MenuItem
} from "@mui/material";
import { posts } from "../util/data"; // Mock posts data
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";


const CategoryDetailPage = ({ category="Technology" }) => {
    const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("recent");

  // Filter posts by category
  const filteredPosts = posts.filter(
    (post) => post.category?.toLowerCase() === category?.toLowerCase()
  );


  console.log(filteredPosts);
  // Sort logic
  const sortedPosts =
    sortBy === "recent"
      ? [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
      : [...filteredPosts].sort((a, b) => b.views - a.views);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526374870839-e155464bb9d7')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          {category} Articles
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link href="/" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="/categories" underline="hover" color="inherit">
            Categories
          </Link>
          <Typography color="text.primary">{category}</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" className="font-bold text-white">
            Latest in {category}
          </Typography>
          {/* Sort Dropdown */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.3)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1E88E5"
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1E88E5"
              }
            }}
          >
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="popular">Most Popular</MenuItem>
          </Select>
        </Box>

        {/* Posts Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
          gap={4}
          mt={4}
        >
          {sortedPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:shadow-lg transition-all flex flex-col justify-center"
              sx={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <LazyLoadImage
                src={post.image}
                alt={post.title}
                effect="blur"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" className="font-bold text-white">
                  {post.title}
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  {post.description}
                </Typography>
                <Button
                  size="small"
                  sx={{
                    color: "#1E88E5",
                    textTransform: "none",
                    mt: 2
                  }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* No Posts Found */}
        {sortedPosts.length === 0 && (
          <Typography variant="h6" className="text-gray-400 text-center mt-6">
            No articles available in {category}.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default CategoryDetailPage;
