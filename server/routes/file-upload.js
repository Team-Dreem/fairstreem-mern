const express = require("express");
const router = express.Router();
const { Song } = require("../models");

const upload = require("../services/file-upload");

const singleImageUpload = upload.single("image");

const singleSongUpload = upload.single("song");

router.post("/image-upload", function (req, res) {
  singleImageUpload(req, res, function (err) {
    if (err) {
      return res
        .status(422)
        .send({
          errors: [{ title: "File Upload Error", detail: err.message }],
        });
    }
    console.log("IMAGE_UPLOAD:", req.file);
    return res.json({ imageUrl: req.file.location });
  });
});

router.post("/song-upload", function (req, res) {
  singleSongUpload(req, res, function (err, response, body) {
    // console.log("res.body", response.body);
    // console.log("req.file.location:", req.file.location);
    // console.log("key:", req.file.key);

    if (err) {
      return res
        .status(422)
        .send({
          errors: [{ title: "File Upload Error", detail: err.message }],
        });
    }

    Song.create({
      title: req.body.title,
      artistId: req.body.artistId,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      genre: req.body.genre,
      tags: req.body.tags,
      song_url: req.file.location,
    })
      // .then((dbSongData) => res.redirect("/songs" + req.body._id))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    // console.log("res.body:", res.body);
    console.log("SONG-UPLOAD:", req.file);
    return res.json({
      _id: req.body._id,
      title: req.body.title,
      artistId: req.body.artistId,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      genre: req.body.genre,
      tags: req.body.tags,
      song_url: req.file.location,
      // "s3_object_key:": req.file.key, Make sure it was ok to omit this!
    });
  });
});

module.exports = router;
