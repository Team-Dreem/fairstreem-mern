const mongoose = require("mongoose");

const { Schema } = mongoose;

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: "Genre",
    required: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  song_url: {
    type: String,
  },
  s3_object_key: {
    type: String,
  },
  filePath: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
