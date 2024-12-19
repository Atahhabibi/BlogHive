import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional blur effect
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import { mockResults } from "../util/data";
import { Pagination } from "../components";

const categories = [
  "All",
  "Technology",
  "Health",
  "Travel",
  "Food",
  "Business"
];

const ITEMS_PER_PAGE = 9;

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredResults, setFilteredResults] = useState(mockResults);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    filterResults(value, selectedCategory);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    filterResults(searchTerm, value);
    setCurrentPage(1);
  };

  const filterResults = (searchValue, categoryValue) => {
    const filtered = mockResults.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue);
      const matchesCategory =
        categoryValue === "All" || item.category === categoryValue;
      return matchesSearch && matchesCategory;
    });
    setFilteredResults(filtered);
  };

  const getPaginatedResults = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 py-16">
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" className="font-bold text-white">
            Search BlogHive
          </Typography>
          <Typography variant="body1" className="text-gray-400 mt-2">
            Find posts, articles, and insights that inspire you.
          </Typography>
        </Box>

        {/* Search Bar and Category Filter */}
        <Box display="flex" alignItems="center" gap={2} mb={8}>
          {/* Search Bar */}
          <IconButton>
            <SearchIcon className="text-gray-400" />
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search BlogHive..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white"
              }
            }}
          />
          {/* Category Filter */}
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: "white" }}>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white"
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Search Results */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={4}
        >
          {getPaginatedResults().length > 0 ? (
            getPaginatedResults().map((result) => (
              <Card
                key={result.id}
                className="bg-gray-800 hover:shadow-lg transition-shadow flex flex-col justify-between"
                style={{ height: "100%" }}
              >
                {/* Lazy Load Image */}
                <LazyLoadImage
                  src={result.image}
                  alt={result.title}
                  effect="blur"
                  className="rounded-t-lg"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover"
                  }}
                />
                <CardContent className="flex flex-col justify-between ">
                  <Typography variant="h6" className="font-bold text-white">
                    {result.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400 mt-2">
                    {result.description}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    {/* Action Buttons */}
                    <IconButton>
                      <FavoriteBorderIcon className="text-gray-400 hover:text-red-500" />
                    </IconButton>
                    <IconButton>
                      <BookmarkBorderIcon className="text-gray-400 hover:text-blue-500" />
                    </IconButton>
                    <IconButton>
                      <ShareIcon className="text-gray-400 hover:text-green-500" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography
              variant="h6"
              className="font-semibold text-center text-gray-400"
            >
              No results found for "{searchTerm}" in {selectedCategory}.
            </Typography>
          )}
        </Box>

      </Container>
        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default SearchPage;
