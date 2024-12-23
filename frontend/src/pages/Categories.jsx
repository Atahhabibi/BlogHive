import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Badge,
  TextField,
  Chip,
  CircularProgress
} from "@mui/material";
import { categories } from "../util/data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Navigate, useNavigate } from "react-router-dom";
import useAppData from "../customHooks/useAppData";
import { Error, Loading } from "../components";

const Categories = () => {
  const { data, isLoading, error } = useAppData();
  const { posts } = data?.posts || [];

  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = categories.filter((category) =>
      category.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === "All") {
      setFilteredCategories(categories);
    } else if (type === "Popular") {
      setFilteredCategories(categories.slice(0, 3)); // Example: Top 3
    } else if (type === "New") {
      setFilteredCategories(categories.slice(-3)); // Example: Last 3
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540479859555-17af45c78602')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            textAlign: "center"
          }}
        >
          Discover Topics that Inspire You
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Page Header */}
        <Typography
          variant="h4"
          className="font-bold text-white text-center mb-6"
        >
          Explore Categories
        </Typography>

        {/* Search and Filters */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          {/* Search */}
          <TextField
            placeholder="Search categories..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "#1E88E5" },
                "&.Mui-focused fieldset": { borderColor: "#1E88E5" }
              }
            }}
          />

          {/* Filter Buttons */}
          <Box display="flex" gap={2}>
            {["All", "Popular", "New"].map((type) => (
              <Chip
                key={type}
                label={type}
                color={activeFilter === type ? "primary" : "default"}
                onClick={() => handleFilter(type)}
                sx={{
                  fontWeight: "bold",
                  backgroundColor:
                    activeFilter === type
                      ? "#1E88E5"
                      : "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  cursor: "pointer"
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Loading Placeholder */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            {/* Category Stats */}
            <Typography
              variant="h6"
              className="text-gray-400 mb-4"
            >{`Showing ${filteredCategories.length} Categories`}</Typography>

            {/* Categories Grid */}
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)"
              }}
              gap={4}
            >
              {filteredCategories.map((category, index) => (
                <Card
                  key={category.title}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 hover:shadow-2xl transition-all transform hover:scale-105"
                  sx={{
                    borderRadius: "12px",
                    overflow: "hidden"
                  }}
                >
                  {/* Image with Badge */}
                  <Box position="relative">
                    <LazyLoadImage
                      src={category.image}
                      alt={category.title}
                      effect="blur"
                      style={{
                        width: "100%",

                        objectFit: "cover"
                      }}
                    />
                    <Badge
                      badgeContent={index + 1}
                      color="primary"
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        backgroundColor: "#1E88E5",
                        padding: "6px 10px",
                        fontWeight: "bold",
                        borderRadius: "8px"
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent>
                    <Typography
                      variant="h5"
                      className="font-bold text-white"
                      gutterBottom
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-400 mb-4"
                      sx={{ minHeight: "60px" }}
                    >
                      {category.description}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<ArrowForwardIosIcon />}
                      sx={{
                        color: "white",
                        borderColor: "#1E88E5",
                        ":hover": {
                          backgroundColor: "#1E88E5",
                          color: "white"
                        }
                      }}
                      onClick={() => navigate(`/categories/${category.title}`)}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        )}
      </Container>
    </div>
  );
};

export default Categories;
