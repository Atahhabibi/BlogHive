import React from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Box from "@mui/material/Box";
import { auth } from "../util/configFirebase";


const SocialLogin = () => {
  // Google Login Handler
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User Info:", user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  // Facebook Login Handler
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Facebook User Info:", user);
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto"
      }}
    >
      {/* Google Login Button */}
      <Button
        fullWidth
        variant="outlined"
        onClick={handleGoogleLogin}
        startIcon={<GoogleIcon />}
      >
        Sign up with Google
      </Button>

      {/* Facebook Login Button */}
      <Button
        fullWidth
        variant="outlined"
        onClick={handleFacebookLogin}
        startIcon={<FacebookIcon />}
        sx={{
          color: "#4267B2",
          borderColor: "#4267B2",
          "&:hover": {
            backgroundColor: "rgba(66, 103, 178, 0.1)",
            borderColor: "#365899"
          }
        }}
      >
        Sign up with Facebook
      </Button>
    </Box>
  );
};

export default SocialLogin;
