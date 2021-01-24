const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const artistSchema = new Schema(
  {
    avatar: {
      type: String,
      defaultValue: "../../public/images/default.png",
    },
    artistName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song",
        },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
artistSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
artistSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

artistSchema.virtual('followerCount').get(function() {
  return this.followers.length;
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;