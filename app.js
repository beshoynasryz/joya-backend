require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const contactRoutes = require('./routes/contactRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const blogRoutes = require('./routes/blogRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const testimonialRoutes = require("./routes/testimonialRoutes");
const secondSectionRoutes = require("./routes/secondSectionRoutes");
const partnerRoutes = require('./routes/partnerRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const valueRoutes = require("./routes/valuRoutes");
const heroSectionRoutes = require("./routes/heroSectionRoutes");
const keystatsRoutes = require("./routes/keystateRoutes");
const OffPlanRoutes = require("./routes/offPlanRoutes");
const featureRoutes = require("./routes/featureRoutes");
const laxuryRoutes = require("./routes/laxuryRoutes");
const imageServices = require("./routes/imageServicesRoutes");

const { errorHandler } = require("./middleware/errormiddleware");

const app = express();
app.use('/images', express.static('images'));
// Connect MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

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
    origin: [
      "http://localhost:3000",  // Allow local development
      "http://192.168.1.6:3000",  // Allow local development with specific IP
      "https://joya-seven.vercel.app",  // Allow production frontend URL
    ], 
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
  };
  
  app.use(cors(corsOptions));  // Enable CORS with the updated options
  
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/property', propertyRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/secondsection", secondSectionRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/slider', sliderRoutes);
app.use("/api/values", valueRoutes);
app.use("/api/hero-sections", heroSectionRoutes);
app.use("/api/keystats", keystatsRoutes);
app.use("/api/off-plan", OffPlanRoutes);
app.use("/api/feature", featureRoutes);
app.use("/api/laxury", laxuryRoutes);
app.use("/api/image-services", imageServices);


app.get('/', (req, res) => {
    res.send('API is running');
  });
  
// Error Handler
app.use(errorHandler);  // Enable custom error handling

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
