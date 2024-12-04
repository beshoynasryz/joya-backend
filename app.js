require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');

// const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());  // Parse JSON bodies
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",  // Allow frontend URL or default to localhost for dev
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allow these headers
};
app.use(cors(corsOptions));  // Enable CORS with options

// Routes
app.use('/api/auth', authRoutes);
// Error Handler
// app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
