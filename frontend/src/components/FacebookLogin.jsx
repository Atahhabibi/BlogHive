import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FacebookLogin = () => {
  const handleLogin = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User Info:", user);
      // You can now send the user data or token to your backend for further processing
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  return <button style={{
    backgroundColor: "#4267B2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
  onClick={handleLogin}>Login with Facebook</button>;
};

export default FacebookLogin;
