const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const podcastSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  image: { type: String, required: true },
  audio: { type: String, required: true },
  playback: { type: Number, required: true },
  likes: { type: Number, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Podcast", podcastSchema);
