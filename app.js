require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); // For basic security
const rateLimit = require("express-rate-limit"); // To prevent abuse
const mongoSanitize = require("express-mongo-sanitize"); // Sanitize MongoDB inputs
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
// const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection attacks

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow frontend URL or default to localhost
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions)); // Enable CORS with options

// Routes
app.use('/api/auth', authRoutes);

// Error Handler
// app.use(errorHandler); 
// Enable custom error handling

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
