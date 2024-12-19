import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Link,
  Divider,
  Card,
  CardContent,
  IconButton,
  TextField,
  Avatar,
  Grid
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { posts } from "../util/data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TodayIcon from "@mui/icons-material/Today";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts?.find((p) => p.id === parseInt(id));
  const relatedPosts = posts?.filter(
    (p) => p?.category === post?.category && p.id !== post?.id
  );

  const [likes, setLikes] = useState(post?.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([
    { name: "John Doe", comment: "Great article, very informative!" },
    { name: "Jane Smith", comment: "Loved the details and visuals." }
  ]);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return (
      <Container>
        <Typography variant="h4" className="text-gray-400 mt-8 text-center">
          Post not found!
        </Typography>
      </Container>
    );
  }

  const handleLike = () => setLikes((prevLikes) => prevLikes + 1);
  const toggleBookmark = () => setIsBookmarked((prev) => !prev);
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { name: "Anonymous", comment: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Breadcrumb Navigation */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link href="/" underline="hover" color="inherit">
            Home
          </Link>
          <Link href="/categories" underline="hover" color="inherit">
            Categories
          </Link>
          <Typography color="text.primary">{post.title}</Typography>
        </Breadcrumbs>

        {/* Post Title and Actions */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" className="font-bold text-white mb-4">
            {post.title}
          </Typography>
          <Box display="flex" gap={2}>
            <IconButton color="primary" onClick={() => alert("Post shared!")}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={toggleBookmark} color="primary">
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Post Image */}
        <Box mb={4}>
          <LazyLoadImage
            src={post.image}
            alt={post.title}
            effect="blur"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "12px"
            }}
          />
        </Box>

        {/* Post Details */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2} alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <TodayIcon fontSize="small" />
              <Typography variant="body2" className="text-gray-400">
                {new Date(post.date).toDateString()}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <VisibilityIcon fontSize="small" />
              <Typography variant="body2" className="text-gray-400">
                {post.views} Views
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={handleLike} color="error">
              <FavoriteIcon />
            </IconButton>
            <Typography variant="body2" className="text-gray-400">
              {likes} Likes
            </Typography>
          </Box>
        </Box>

        {/* Post Content */}
        <Typography
          variant="body1"
          className="text-gray-300 mb-8 leading-7"
          sx={{ lineHeight: 1.8 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          libero. Sed cursus ante dapibus diam. Duis sagittis ipsum. Curabitur
          sodales ligula in libero.
        </Typography>

        <Divider sx={{ my: 4, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Comments Section */}
        <Box mb={8}>
          <Typography variant="h5" className="font-bold text-white mb-4">
            <CommentIcon /> Comments
          </Typography>
          {/* Add Comment */}
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Avatar src="https://i.pravatar.cc/150" />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              InputProps={{
                style: { color: "white", borderColor: "#1E88E5" }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                  "&:hover fieldset": { borderColor: "#1E88E5" },
                  "&.Mui-focused fieldset": { borderColor: "#1E88E5" }
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
            >
              Post
            </Button>
          </Box>
          {/* Display Comments */}
          {comments.map((comment, index) => (
            <Box key={index} mb={2}>
              <Typography variant="body2" className="text-gray-400">
                <strong>{comment.name}:</strong> {comment.comment}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Related Posts */}
        <Box mb={8}>
          <Typography variant="h5" className="font-bold text-white mb-4">
            Related Posts
          </Typography>
          <Grid container spacing={2}>
            {relatedPosts.map((related) => (
              <Grid item xs={12} sm={6} key={related.id}>
                <Card
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 transition-all flex flex-col justify-center"
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/post/${related.id}`)}
                >
                  <LazyLoadImage
                    src={related.image}
                    alt={related.title}
                    effect="blur"
                    style={{
                      width: "100%",
                      height:"224px",
                      objectFit: "cover"
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      className="font-bold text-white"
                    >
                      {related.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      {related.description?.slice(0, 60)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Navigation Buttons */}
        <Box display="flex" justifyContent="space-between" mt={6}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              color: "#1E88E5",
              borderColor: "#1E88E5",
              ":hover": { backgroundColor: "#1E88E5", color: "white" }
            }}
          >
            Back to {post.category}
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/categories")}
            sx={{
              backgroundColor: "#1E88E5",
              ":hover": { backgroundColor: "#1565C0" }
            }}
          >
            Explore Categories
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PostDetailPage;
