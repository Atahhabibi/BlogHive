import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../util/CustomFetch";
import { Button } from "@mui/material";

const GoogleLoginPage = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const resp = await customFetch.post("/googleLogin", {
        idToken,
        loginSource: "google"
      });

      console.log(resp.data);
      localStorage.setItem("authToken", resp.data.token);
      navigate("/notifications");
    } catch (error) {
      console.error(
        "Google login failed:",
        error.response?.data || error.message
      );
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <Button
      fullWidth
      sx={{ display: "flex", justifyContent: "center", alignItems: "center",background:"white" }}
    >
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </Button>
  );
};

export default GoogleLoginPage;
