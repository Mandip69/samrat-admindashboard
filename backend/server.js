const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Full CORS configuration
const allowedOrigins = [
  "https://www.samrat-movies.com.np",
  "https://samrat-admin.vercel.app"
];


app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like mobile apps or Postman
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true,
}));

// parse JSON
app.use(express.json());

// Routes
app.use("/api/upload", require("./routes/upload"));
app.use("/api/images", require("./routes/images"));
app.use("/api/auth", require("./routes/auth"));

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
