import React from "react";
import { CardMedia } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional for adding a blur effect

const LazyCardMedia = ({ image, alt }) => {
  return (
    <LazyLoadImage
      src={image}
      alt={alt}
      effect="blur" // Optional: adds a blur effect while the image is loading
      style={{
        height: "300px", // Ensure consistent image height
        objectFit: "cover",
        width: "100%", // Ensure it spans the width of its container
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    />
  );
};

export default LazyCardMedia;
