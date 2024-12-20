require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const router = require("./routes/router");
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({ data: {} });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
