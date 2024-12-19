require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const createToken = require("./util/createToken");
const User = require("./models/UserSchema");
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/register", async (req, res) => {
  const { email, password, userName } = req.body;

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

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error: register error"
    });
  }
});


app.get("/", (req, res) => {
  res.status(200).json({ data: {} });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
