import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { customFetch } from "../util/CustomFetch";
import { toast } from "react-toastify";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import CreatePostForm from "./../components/CreatePostForm";
import useEditMutation from "../customHooks/useEditMutation";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States for form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // Fetch the post data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Post", id],
    queryFn: async () => {
      try {
        const response = await customFetch(`/posts/${id}`);
        const data = response.data;
        setTitle(data.post.title || "");
        setCategory(data.post.category || "");
        setContent(data.post.description || "");
        return response.data;
      } catch (error) {
        return error;
      }
    }
  });


  const editPostMutation=useEditMutation(); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the image locally
    }


  };


  const handleSubmit = () => {
    const updatedPost = { title, category, description: content };
    if (image) {
      updatedPost.image = image; // Include the image if it's updated
    }
    editPostMutation.mutate({id:id,newPost:updatedPost});
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#121212"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#121212"
      >
        <Typography variant="h6" color="error">
          Error loading post data!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#121212"
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          padding: 4,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            textAlign: "center",
            color: "#fff",
            marginBottom: 3
          }}
        >
          Edit Post
        </Typography>

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
          createPostMutation={editPostMutation}
        />
      </Container>
    </Box>
  );
};

export default EditPostPage;
