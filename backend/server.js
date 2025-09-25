require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

const app = express();
app.use(cors());
app.use(express.json()); // parse json bodies

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error('MongoDB error', err));

app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

// simple health
app.get('/', (req,res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
