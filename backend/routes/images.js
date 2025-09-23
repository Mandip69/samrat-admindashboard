const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
