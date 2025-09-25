require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

const app = express();

// CORS: allow only your Vercel frontend
app.use(cors({
  origin: ["https://samrat-admindashboard.vercel.app/"], // replace with your frontend URL
  credentials: true
}));

app.use(express.json()); // parse JSON bodies

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

// Health check
app.get('/', (req, res) => res.send('API is running'));

// Listen on Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
