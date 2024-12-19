import React from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  Avatar
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { posts } from "../util/data";

const Home = () => {
  const featuredPosts = posts.slice(0, 3); // Display only 3 featured posts

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200">
      {/* Hero Section */}
      <div
        className="py-20 text-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <Container maxWidth="lg" className="relative z-10">
          <Typography variant="h3" className="font-bold text-white">
            Welcome to BlogHive
          </Typography>
          <Typography variant="body1" className="text-gray-300 mt-4">
            Dive into a world of knowledge, insights, and inspiration. Discover
            blogs, connect with the community, and share your own voice.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="mt-6 bg-blue-600 text-white hover:bg-blue-700"
          >
            Get Started
          </Button>
        </Container>
      </div>

      {/* Trending Topics Section */}
      <div className="py-16 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            className="font-bold text-white text-center mb-8"
          >
            Trending Topics
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="bg-gray-800 text-white p-4 text-center hover:shadow-lg">
                <Typography variant="h6">#Technology</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="bg-gray-800 text-white p-4 text-center hover:shadow-lg">
                <Typography variant="h6">#Health</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="bg-gray-800 text-white p-4 text-center hover:shadow-lg">
                <Typography variant="h6">#Travel</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="bg-gray-800 text-white p-4 text-center hover:shadow-lg">
                <Typography variant="h6">#Lifestyle</Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Featured Posts Section */}
      <div className="py-16 bg-gray-800">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            className="font-bold text-white text-center mb-8"
          >
            Featured Posts
          </Typography>

          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} md={4} key={post.id}>
                <Card
                  className="bg-gray-900 hover:bg-gray-800 text-gray-200 transition-shadow rounded-lg overflow-hidden flex flex-col"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    console.log(`Navigating to post: ${post.title}`)
                  }
                >
                  <LazyLoadImage
                    src={post.image}
                    alt={post.title}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover"
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      className="font-bold text-white mb-2"
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      {post.description?.slice(0, 80)}...
                    </Typography>
                    <Button
                      size="small"
                      className="mt-4 text-blue-400 hover:underline"
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-900">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            className="font-bold text-white text-center mb-8"
          >
            What Our Users Say
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            gap={4}
          >
            {/* First Card */}
            <Box
              flexBasis={{ xs: "100%", sm: "48%", md: "31%" }}
              className="bg-gray-800 p-6 rounded-lg text-center"
              boxShadow={3}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Avatar
                src="https://i.pravatar.cc/150?img=3"
                sx={{ width: 80, height: 80, margin: "0 auto 16px" }}
              />
              <Typography variant="body1" className="text-gray-400 mb-4">
                "BlogHive has been a game-changer for me. I can share my
                thoughts and connect with like-minded people!"
              </Typography>
              <Typography variant="subtitle2" className="text-blue-400">
                - John Doe
              </Typography>
            </Box>

            {/* Second Card */}
            <Box
              flexBasis={{ xs: "100%", sm: "48%", md: "31%" }}
              className="bg-gray-800 p-6 rounded-lg text-center"
              boxShadow={3}
            >
              <Avatar
                src="https://i.pravatar.cc/150?img=5"
                sx={{ width: 80, height: 80, margin: "0 auto 16px" }}
              />
              <Typography variant="body1" className="text-gray-400 mb-4">
                "The community here is amazing. I find inspiration every day
                reading blogs from diverse categories."
              </Typography>
              <Typography variant="subtitle2" className="text-blue-400">
                - Jane Smith
              </Typography>
            </Box>

            {/* Third Card */}
            <Box
              flexBasis={{ xs: "100%", sm: "48%", md: "31%" }}
              className="bg-gray-800 p-6 rounded-lg text-center"
              boxShadow={3}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Avatar
                src="https://i.pravatar.cc/150?img=8"
                sx={{ width: 80, height: 80, margin: "0 auto 16px" }}
              />
              <Typography variant="body1" className="text-gray-400 mb-4">
                "Writing on BlogHive has allowed me to reach new audiences and
                grow my personal brand!"
              </Typography>
              <Typography variant="subtitle2" className="text-blue-400">
                - Alex Johnson
              </Typography>
            </Box>
          </Box>
        </Container>
      </div>

      {/* Call-to-Action Section */}
      <div
        className="py-16 bg-cover bg-center text-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-blue-900 opacity-75"></div>
        <Container maxWidth="lg" className="relative z-10">
          <Typography variant="h4" className="font-bold text-white">
            Ready to Share Your Thoughts?
          </Typography>
          <Typography variant="body1" className="text-gray-300 mt-4">
            Join BlogHive and start blogging today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign Up Now
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;
