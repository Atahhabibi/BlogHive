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
