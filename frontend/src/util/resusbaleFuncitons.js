import { authCustomFetch } from "./CustomFetch";
import { toast } from "react-toastify";
export const groupPostsByCategory = (posts = []) => {
  if (!Array.isArray(posts)) {
    console.error("Invalid posts input; expected an array");
    return [];
  }

  const grouped = {};

  posts.forEach((post) => {
    const category = post?.category || "Others";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(post);
  });

  // Convert grouped object into an array of objects
  return Object.keys(grouped).map((category) => ({
    category,
    posts: grouped[category]
  }));
};

export const filterPostsByCategory = (posts = [], category = "") => {
  if (!Array.isArray(posts)) {
    console.error("Invalid posts input; expected an array");
    return [];
  }

  if (!category || typeof category !== "string") {
    console.warn("Invalid or empty category input; returning an empty array");
    return [];
  }

  return posts.filter(
    (post) =>
      post?.category?.toLowerCase?.() === category.toLowerCase?.() || false
  );
};

export const parseJwt = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};

export const handlePostAction = (payload, handlePostMutation, navigate) => {
  const token = localStorage.getItem("authToken");
  const decode = parseJwt(token);

  const email = decode?.email || null;

  if (!email) {
    toast.warn("You need to sign in first");
    navigate("/login");
    return;
  }

  handlePostMutation.mutate(payload);
};

export const handlePostOperations = async ({
  id,
  handlerMutation,
  newPost = null
}) => {
  handlerMutation.mutate({ id, newPost });
};

export const checkAuth = (navigate) => {
  const token = localStorage.getItem("authToken");
  const decode = parseJwt(token);
  const email = decode?.email || null;
  if (!email) {
    toast.warn("You need to sign in first");
    navigate("/login");
    return;
  }
};
