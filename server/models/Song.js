const mongoose = require("mongoose");

const { Schema } = mongoose;

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
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
    trim: true,
  },
  likes: {
    type: Number,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
