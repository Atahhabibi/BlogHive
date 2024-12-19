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


const PostCard = ({ post, onEdit, onDelete }) => {
  const formattedDate = new Date(post.date).toLocaleDateString();
  const formattedTime = new Date(post.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  // Truncate content to a maximum of 50 words
  const truncatedContent =
    post.content?.split(" ").slice(0, 50).join(" ") +
    (post.content?.split(" ").length > 50 ? "..." : "");

  return (
    <Card
      className="bg-gray-800 text-gray-200 shadow-lg"
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <CardHeader
        avatar={<Avatar src="https://i.pravatar.cc/150?img=10" />}
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
      <CardContent>
        <Typography>{truncatedContent}</Typography>
      </CardContent>
      <CardActions className="flex justify-end px-4 pb-4">
        <Button
          variant="contained"
          size="small"
          className="bg-blue-500 hover:bg-blue-600 text-white transition-all"
          onClick={() => onEdit(post.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          size="small"
          className="bg-red-500 hover:bg-red-600 text-white transition-all ml-2"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
