const bcrypt = require("bcryptjs");
const createToken = require("../util/createToken");
const User = require("../models/UserSchema");
const verifyGoogleToken = require("../util/verifyGoogleToken");
const cloudinary = require("../cloudinary/config");

// Register Controller
const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;

  console.log("Register Request Data:", { email, password, userName });

  try {
    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      userName,
      email,
      password: hashPassword
    });

    await user.save();

    // Generate JWT token
    const payload = { email, userName };
    const token = createToken(payload);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error: register error"
    });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login Request Data:", { email, password });

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const payload = { email, userName: user.userName };
    const token = createToken(payload);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error: login error"
    });
  }
};

const loginThroughGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    const userData = await verifyGoogleToken(idToken);

    let user = await User.findOne({ googleId: userData.googleId });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(userData.googleId, salt);

      const cloudinaryResponse = await cloudinary.uploader.upload(
        userData.picture,
        {
          folder: "user_profiles", // Cloudinary folder
          public_id: `google_${userData.googleId}`, // Optional unique ID
          transformation: {
            width: 200,
            height: 200,
            crop: "thumb",
            gravity: "face"
          } // Resize and crop
        }
      );

      user = await User.create({
        userName: userData.name,
        email: userData.email,
        googleId: userData.googleId,
        image:  cloudinaryResponse.secure_url,
        password: hashPassword
      });
    }

    const token = createToken({
      userId: user._id,
      source: "google"
    });

    // Send response with token and user data
    res.status(200).json({
      success: true,
      message: "Logged in successfully through Google",
      token,
      user: {
        userName: user.userName,
        email: user.email,
        image: user.image
      }
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while logging in through Google"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginThroughGoogle
};
