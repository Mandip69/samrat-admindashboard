require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2; // ✅ Cloudinary import

// Routes
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

// ✅ Simple health check
app.get('/', (req, res) => res.send('API is running 🚀'));

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
