const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config.js"); // Import cloudinary.js

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bloghive", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed file types
  },
});

const upload = multer({ storage });

module.exports = upload;
