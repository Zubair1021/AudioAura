const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  file: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  singer: { type: String, required: true },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

songSchema.index({ name: "text", singer: "text" });

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
