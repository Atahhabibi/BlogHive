import React from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional blur effect
import MissionIcon from "@mui/icons-material/Flag"; // Icon for mission
import StarIcon from "@mui/icons-material/Star"; // Icon for features
import GroupIcon from "@mui/icons-material/Group"; // Icon for community
import { Navigate, useNavigate } from "react-router-dom";

const About = () => {
  const additionalImages = [
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Teamwork"
    },
    {
      src: "https://plus.unsplash.com/premium_photo-1711174135857-168ab7b6f271?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Creativity"
    },
    {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Innovation"
    }
  ];

  const navigate=useNavigate(); 

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex items-center">
      <Container maxWidth="lg" className="py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Typography
            variant="h3"
            component="h1"
            className="font-bold text-white"
          >
            About BlogPillar
          </Typography>
          <Typography variant="body1" className="text-gray-400 mt-4">
            Welcome to BlogPillar – your go-to platform for sharing, learning,
            and connecting with a vibrant blogging community.
          </Typography>
        </div>

        {/* Cards Section */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr", // 1 column on extra-small screens
            sm: "repeat(2, 1fr)", // 2 columns on small screens
            md: "repeat(3, 1fr)" // 3 columns on medium screens
          }}
          gap={4}
        >
          {/* Card 1 */}
          <Card
            className="bg-gray-800 shadow-lg text-center flex flex-col justify-between"
            style={{ height: "100%" }}
          >
            <CardContent>
              <MissionIcon className="text-blue-500" style={{ fontSize: 50 }} />
              <Typography
                variant="h5"
                component="h2"
                className="font-semibold text-white mt-2"
              >
                Our Mission
              </Typography>
              <Typography variant="body2" className="mt-4 text-gray-400">
                At BlogHive, our mission is to provide a platform where users
                can express their thoughts, share insights, and engage in
                meaningful discussions.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card
            className="bg-gray-800 shadow-lg text-center flex flex-col justify-between"
            style={{ height: "100%" }}
          >
            <CardContent>
              <StarIcon className="text-blue-500" style={{ fontSize: 50 }} />
              <Typography
                variant="h5"
                component="h2"
                className="font-semibold text-white mt-2"
              >
                Why Choose Us
              </Typography>
              <Typography variant="body2" className="mt-4 text-gray-400">
                BlogPillar stands out with its user-friendly design,
                category-based filtering, and features like likes, comments, and
                bookmarking.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card
            className="bg-gray-800 shadow-lg text-center flex flex-col justify-between"
            style={{ height: "100%" }}
          >
            <CardContent>
              <GroupIcon className="text-blue-500" style={{ fontSize: 50 }} />
              <Typography
                variant="h5"
                component="h2"
                className="font-semibold text-white mt-2"
              >
                Our Community
              </Typography>
              <Typography variant="body2" className="mt-4 text-gray-400">
                Join a growing community of bloggers and readers who are eager
                to share knowledge and discover new ideas.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Additional Images Section */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr", // 1 column on extra-small screens
            sm: "repeat(2, 1fr)", // 2 columns on small screens
            md: "repeat(3, 1fr)" // 3 columns on medium screens
          }}
          gap={4}
          mt={4}
        >
          {additionalImages.map((image, index) => (
            <Card
              key={index}
              className="bg-gray-800 shadow-lg"
              style={{ height: "230px" }}
            >
              <LazyLoadImage
                src={image.src}
                alt={image.alt}
                effect="blur"
                className="rounded-lg object-cover"
                style={{
                  height: "100%", // Fixed height
                  width: "100%" // Full width
                }}
              />
            </Card>
          ))}
        </Box>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <Typography variant="h6" className="mb-4 text-gray-300">
            Ready to be part of something big?
          </Typography>
          <Button
            variant="contained"
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
            style={{
              color: "white"
            }}
            onClick={()=>navigate('/register')}
          >
            Join BlogPillar Today
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default About;
