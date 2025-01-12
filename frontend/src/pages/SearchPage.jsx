import React, { useState, useEffect, useMemo } from "react";
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
import "react-lazy-load-image-component/src/effects/blur.css";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import { Error, Loading, Pagination } from "../components";
import useAppData from "../customHooks/useAppData";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCustomFetch } from "../util/CustomFetch";
import useUserData from "../customHooks/useUserData";
import {
  checkAuth,
  handlePostAction,
  parseJwt
} from "../util/resusbaleFuncitons";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart icon
import BookmarkIcon from "@mui/icons-material/Bookmark"; // Filled bookmark icon
import { useHandlePostMutation } from "../customHooks/useHandlePostMutation ";
import { ShareDialog } from "../components";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentSharePost, setCurrentSharePost] = useState({});
  const { data, isLoading, error } = useAppData();
  const data2 = useUserData();
  const posts = data?.posts?.posts || [];
  const user = data2?.data?.user || {};

  const handlePostMutation = useHandlePostMutation();

  const sharedPosts = user?.sharedPosts || [];
  const bookmarkedPosts = user?.bookmarkedPosts || [];
  const likedPosts = user?.likedPosts || [];

  const LikesPostIds = likedPosts.map((item) => item._id);
  const SharedPostIds = sharedPosts.map((item) => item._id);
  const BookmarkedPostIds = bookmarkedPosts.map((item) => item._id);

  const navigate = useNavigate();

  const filteredResults = useMemo(() => {
    return posts.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  }, [filteredResults]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const getPaginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResults, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleShareClick = (post) => {
    checkAuth(navigate);
    setCurrentSharePost(post);
    setShareDialogOpen(true);
  };

  const handleShareDialogClose = () => {
    setShareDialogOpen(false);
    setCurrentSharePost({});
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 py-16">
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" className="font-bold text-white">
            Search BlogPillar
          </Typography>
          <Typography variant="body1" className="text-gray-400 mt-2">
            Find posts, articles, and insights that inspire you.
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={8}>
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

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={4}
        >
          {getPaginatedResults.length > 0 ? (
            getPaginatedResults.map((result) => (
              <Card
                key={result._id}
                className="bg-gray-800 hover:shadow-lg transition-shadow flex flex-col justify-between"
                style={{ height: "100%" }}
              >
                <LazyLoadImage
                  src={result.image}
                  alt={result.title}
                  effect="blur"
                  className="rounded-t-lg"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/post/${result._id}`)}
                />
                <CardContent className="flex flex-col justify-between ">
                  <Typography variant="h6" className="font-bold text-white">
                    {result.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400 mt-2">
                    {result.description}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    {/* Like Button */}
                    <IconButton
                      onClick={() =>
                        handlePostAction(
                          { id: result._id, type: "liked" },
                          handlePostMutation,
                          navigate
                        )
                      }
                      className="transition-all duration-300"
                    >
                      {LikesPostIds.includes(result._id) ? (
                        <FavoriteIcon className="text-red-500 scale-125 transition-all duration-300" />
                      ) : (
                        <FavoriteBorderIcon className="text-gray-400 hover:text-red-500 transition-all duration-300" />
                      )}
                    </IconButton>

                    {/* Bookmark Button */}
                    <IconButton
                      onClick={() =>
                        handlePostAction(
                          { id: result._id, type: "bookmarked" },
                          handlePostMutation,
                          navigate
                        )
                      }
                      className="transition-all duration-300"
                    >
                      {BookmarkedPostIds.includes(result._id) ? (
                        <BookmarkIcon className="text-blue-500 scale-125 transition-all duration-300" />
                      ) : (
                        <BookmarkBorderIcon className="text-gray-400 hover:text-blue-500 transition-all duration-300" />
                      )}
                    </IconButton>

                    {/* Share Button */}
                    <IconButton
                      onClick={() => {
                        handleShareClick(result);
                      }}
                      className="transition-all duration-300"
                    >
                      <ShareIcon />
                    </IconButton>

                    <ShareDialog
                      open={shareDialogOpen}
                      onClose={handleShareDialogClose}
                      postUrl={`https://yourwebsite.com/post/${result._id}`}
                      postTitle={result.title}
                    />
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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
