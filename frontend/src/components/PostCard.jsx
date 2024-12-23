import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Avatar,
  Box,
  Button
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import ShareDialog from "./SharedDialog";

const PostCard = ({ post, onEdit, onDelete, user }) => {
  const navigate = useNavigate(); // Hook for navigation
  const formattedDate = new Date(post.date).toLocaleDateString();
  const formattedTime = new Date(post.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const postUrl = `https://yourwebsite.com/post/${post._id}`;
  const postTitle = post.title;
  // Truncate content to a maximum of 50 words
  const truncatedContent =
    post?.description?.split(" ").slice(0, 50).join(" ") +
    (post?.description?.split(" ").length > 50 ? "..." : "");

  return (
    <Card
      className="bg-gray-800 text-gray-200 shadow-lg"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <CardHeader
        avatar={<Avatar src={user?.image} />}
        title={
          <Typography className="font-bold text-white">{post.title}</Typography>
        }
        subheader={
          <Box>
            <Typography variant="body2" className="text-gray-400">
              {post.category}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-400 mt-1"
              sx={{ fontSize: "0.8rem" }}
            >
              {formattedDate} | {formattedTime}
            </Typography>
          </Box>
        }
      />
      {post.image && (
        <LazyLoadImage
          src={post.image}
          alt="Post Image"
          effect="blur"
          style={{
            height: "200px",
            width: "100%",
            objectFit: "cover",
            borderTop: "1px solid rgba(255,255,255,0.1)"
          }}
        />
      )}
      <CardContent className="min-h-32">
        <Typography>{truncatedContent}</Typography>
      </CardContent>

      <Box display="flex" justifyContent="space-between" mt={2}>
        {/* Share Dialog */}
        <ShareDialog postUrl={postUrl} postTitle={postTitle} />
      </Box>

      <CardActions className="flex justify-between px-4 pb-4">
        <Button
          variant="contained"
          size="small"
          className="bg-blue-800 hover:bg-blue-600 text-white transition-all"
          onClick={() => navigate(`/post/${post._id}`)} // Navigate to post detail page
        >
          Explore
        </Button>
        <Box>
          <Button
            variant="contained"
            size="small"
            className="bg-blue-500 hover:bg-blue-600 text-white transition-all"
            onClick={() => onEdit(post._id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            className="bg-red-500 hover:bg-red-600 text-white transition-all ml-2"
            onClick={() => onDelete(post._id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
