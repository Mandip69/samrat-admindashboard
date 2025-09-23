const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const Image = require("../models/Image");
require("dotenv").config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middleware auth
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch(err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if(!req.file) return res.status(400).json({ message: "No file uploaded" });
    const { category } = req.body;

    // Compress image with Sharp
    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Upload to Cloudinary
    cloudinary.uploader.upload_stream(
      { folder: "portfolio" },
      async (error, result) => {
        if(error) return res.status(500).json({ message: error.message });

        // Save image in DB
        const newImage = new Image({ url: result.secure_url, category });
        await newImage.save();

        res.json({ message: "Uploaded successfully", url: result.secure_url });
      }
    ).end(compressedBuffer);

  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
