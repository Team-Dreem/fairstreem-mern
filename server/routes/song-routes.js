const router = require('express').Router();
const { Song, Artist } = require('../models');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuid } = require('uuid');

// All songs
router.get('/', (req, res) => {
    Song.findAll({
    })
        .then(dbSongData => res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// One song
router.get('/:id', (req, res) => {
    Song.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Artist,
                attributes: ['artistName']
            }
        ]
    })
        .then(dbSongData => res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// Create song
router.post('api/song-upload', (req, res) => {
    const s3 = new S3();
    const params = {
        ACL: 'public-read',
        Bucket: 'fairstreem', 
        Key: uuid(),
        Body: req.files.song.data
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }

        Song.create({
            title: req.body.title,
            artistId: req.body.artistId,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            genre: req.body.genre,
            tags: req.body.tags,
            song_url: data.Location,
            // s3_object_key: data.Key,
          })
            .then(dbSongData => res.redirect('/songs/' + req.body._id))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });
})

// Delete song
router.delete('/:id', (req, res) => {
    Song.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbSongData => res.json(dbSongData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

module.exports = router