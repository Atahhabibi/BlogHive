import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth,googleAuthProvider } from "../util/configFirebase";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log("Google User Info:", result.user);
    } catch (error) {
      console.error(
        "Google Login Error:",
        error.code,
        error.message,
        error.stack
      );
    }
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLogin;
