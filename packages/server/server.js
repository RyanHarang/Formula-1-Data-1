require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/favorites", favoriteRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

startServer();
