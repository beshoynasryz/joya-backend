const multer = require("multer");
const path = require("path");

// Setup Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Make sure that the 'images' directory exists or create it dynamically
    cb(null, 'images/');  // Upload folder path
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);  // Extract the file extension
    cb(null, Date.now() + fileExtension);  // Create a unique filename using timestamp
  },
});

// File validation function to restrict allowed file types (e.g., only images)
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|svg/;  // Accept only image formats

  // Check if the file's mimetype matches the allowed file types
  const isValid = allowedFileTypes.test(path.extname(file.originalname).toLowerCase()) && allowedFileTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);  // File is valid, proceed with the upload
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);  // Invalid file type, reject upload
  }
};

// Setup multer with storage configuration, file size limits, and file validation
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});

module.exports = upload;
