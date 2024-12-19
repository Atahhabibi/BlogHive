import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  About,
  Categories,
  CategoryDetailPage,
  CreatePostPage,
  EditProfilePage,
  Home,
  Landing,
  LoginPage,
  NotificationPage,
  PostDetailPage,
  ProfilePage,
  RegisterPage,
  SearchPage
} from "./pages";
import AppTheme from "../src/components/Theme/AppTheme";
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional blur effect
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AppTheme>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Landing />}>
              <Route index element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/createpost" element={<CreatePostPage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/editProfile" element={<EditProfilePage />} />
              <Route
                path="/categories/:category"
                element={<CategoryDetailPage />}
              />
              <Route path="/post/:id" element={<PostDetailPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </AppTheme>
  );
};

export default App;
