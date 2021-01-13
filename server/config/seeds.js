const db = require("./connection");
const { User, Song, Genre } = require("../models");

db.once("open", async () => {
  await Genre.deleteMany();

  const genres = await Genre.insertMany([
    { name: 'Rock/Alternative' },
    { name: 'R&B' },
    { name: 'Country' },
    { name: 'Hip-hop/Rap' },
    { name: 'Electronic' },
    { name: 'Jazz' },
    { name: 'Blues' },
    { name: 'Classical' },
    { name: 'Other' }
  ]);

  console.log('genres seeded');

  await Song.deleteMany();

  const songs = await Song.insertMany([
    {
      title: "Catharsis",
      artist: "Jeff Johnston",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "JeffJohnston.jpg",
      price: 0.99,
      genre: genres[0]._id,
      tags: "indie",
    },
    {
      title: "Wild Eyes",
      artist: "Jeff Warren Johnston",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "JeffJohnston.jpg",
      price: 0.99,
      genre: genres[2]._id,
      tags: "outlaw",
    },
  ]);

  console.log("songs seeded");

  await User.deleteMany();

  await User.create({
    avatar: "../../public/images/default.png",
    username: "Pam86",
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        songs: [songs[0]._id],
      },
    ],
  });

  await User.create({
    username: "EH42",
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
