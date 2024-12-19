import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrk94GKTZSmIICOEs1V2m2J1DV2hoLSvY",
  authDomain: "blog-d3103.firebaseapp.com",
  projectId: "blog-d3103",
  storageBucket: "blog-d3103.firebasestorage.app",
  messagingSenderId: "342078268641",
  appId: "1:342078268641:web:f2b6cc5ad50ae51ece03a0",
  measurementId: "G-2N5XJ98YSP"
};

// Ensure Firebase app is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Google Auth Provider
export const googleAuthProvider = new GoogleAuthProvider();

export { app, auth };
