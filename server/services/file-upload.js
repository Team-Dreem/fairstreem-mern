const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// var express = require('express')
// var app = express()

const config = require("../config");

aws.config.update({
  secretAccessKey: config.S3_ACCESS_SECRET,
  accessKeyId: config.S3_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new aws.S3();
let fileExtension;
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "audio/mp3" ||
    file.mimetype === "audio/mpeg"
  ) {
    cb(null, true);
    console.log("file.mimetype:", file.mimetype);
  } else {
    cb(new Error("Invalid Mime Type, only .jpeg, .png, or .mp3"), false);
  }

  // handleFileExtension(file.mimetype);
  // console.log("file.mimetype2:", file.mimetype);
};

// const handleFileExtension = (mimetype) => {
//   console.log("mimetype:", mimetype);
//   if (mimetype === "audio/mp3" || mimetype === "audio/mpeg") {
//     fileExtension = "mp3";
//   }
//   console.log('fileExtension1:', fileExtension);
//   return fileExtension
// }

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "fairstreem",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA!" });
    },
    key: function (req, file, cb) {
      cb(
        null,
        Date.now().toString() +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    },
  }),
});

module.exports = upload;
