const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Media = require('../models/Media');
const auth = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// store file in memory buffer
const upload = multer({ storage: multer.memoryStorage() });

// CREATE (Upload to Cloudinary + Save to MongoDB)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: `admin-dashboard/${category}`, resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error', error);
          return res.status(500).json({ message: 'Upload error', error });
        }

        // Save metadata to MongoDB
        const media = new Media({
          title,
          description,
          category,
          public_id: result.public_id,
          secure_url: result.secure_url,
          resource_type: result.resource_type
        });
        await media.save();

        res.json(media);
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
