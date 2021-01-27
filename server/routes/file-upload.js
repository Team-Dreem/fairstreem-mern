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
  console.log("UPLOADED FILE", req.file, req.files)
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
    console.log("SONG-UPLOAD:", req.file);
    return res.json({

      song_url: req.file.location,

    });  
  });
});

module.exports = router;
