const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: [
    "https://www.samrat-movies.com.np",   // portfolio website
    "https://admin-dashboard.vercel.app"   // admin dashboard
  ]
}));
// allow requests from any frontend
app.use(express.json());

// Routes
app.use("/api/upload", require("./routes/upload"));
app.use("/api/images", require("./routes/images"));
app.use("/api/auth", require("./routes/auth")); // your auth routes

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
