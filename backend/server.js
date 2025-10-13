require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const path = require('path');

const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://samrat-admindashboard-5.onrender.com',
];

// ✅ Proper CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());

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
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

// ✅ Serve frontend build (production)
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, '../frontend/dist')));

// ✅ Fallback for SPA routes (Express 5+ compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname1, '../frontend/dist', 'index.html'));
});

// ✅ Health Check Route
app.get('/health', (req, res) => res.send('API is running 🚀'));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
