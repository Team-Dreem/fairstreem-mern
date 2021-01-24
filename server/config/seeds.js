const db = require("./connection");
const faker = require("faker");
const { Artist, User, Genre, Song } = require("../models");

db.once("open", async () => {
  await Artist.deleteMany();
  await User.deleteMany();
  await Genre.deleteMany();
  await Song.deleteMany();
  
  await Artist.create({
    _id: "600b1de66ea21cf63a4db76c",
    avatar: "../../public/images/default.png",
    artistName: "Test",
    aboutme: "This is a default bio. Tell your listeners more about yourself!",
    email: "test@artist.com",
    password: "12345",
    genre: "Test",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  await Artist.create({
    _id: "600b1de66ea21cf63a4db76d",
    avatar: "https://fairstreem.s3.us-east-2.amazonaws.com/1611111773027",
    artistName: "Jeff Johnston",
    aboutme: "This is a default bio. Tell your listeners more about yourself!",
    email: "jeffjohnston@artist.com",
    password: "12345",
    genre: "Rock/Alternative",
    songs: ["600b1de76ea21cf63a4db77a"],
    followers: [],
  });

  await Artist.create({
  _id: "600b1de66ea21cf63a4db76e",
  avatar: "https://fairstreem.s3.us-east-2.amazonaws.com/1611528845288.png",
  artistName: "Jeff Warren Johnston",
  aboutme: "This is a default bio. Tell your listeners more about yourself!",
  email: "jeffwarrenjohnston@artist.com",
  password: "12345",
  genre: "Country",
  songs: ["600b1de76ea21cf63a4db77b", "600b1de76ea21cf63a4db77c"],
  followers: [],
});

  await Artist.create({
    avatar: "../../../public/images/default.png",
    artistName: "Feed",
    aboutme: "This is a default bio. Tell your listeners more about yourself!",
    email: "feed@artist.com",
    password: "12345",
    genre: "Country",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  await Artist.create({
    avatar: "../../public/images/default.png",
    artistName: "Reboot",
    aboutme: "This is a default bio. Tell your listeners more about yourself!",
    email: "reboot@artist.com",
    password: "12345",
    genre: "Country",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  await Artist.create({
    avatar: "../../public/images/default.png",
    artistName: "Concrete Hat",
    aboutme: "This is a default bio. Tell your listeners more about yourself!",
    email: "concrete_hat@artist.com",
    password: "12345",
    genre: "Country",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  const genres = await Genre.insertMany([
    { name: "Rock/Alternative" },
    { name: "R&B" },
    { name: "Country" },
    { name: "Hip-hop/Rap" },
    { name: "Electronic" },
    { name: "Jazz" },
    { name: "Blues" },
    { name: "Classical" },
    { name: "Other" },
  ]);

  const songs = await Song.insertMany([
    {
      _id: "600b1de76ea21cf63a4db77a",
      title: "Catharsis",
      artistId: "600b1de66ea21cf63a4db76d",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "JeffJohnston.jpg",
      price: 0.99,
      genre: genres[0]._id,
      tags: "indie",
      song_url: "https://fairstreem.s3.us-east-2.amazonaws.com/1611278736518.mp3",
      likes: 6,
    },
    {
      _id: "600b1de76ea21cf63a4db77b",
      title: "Wild Eyes",
      artistId: "600b1de66ea21cf63a4db76e",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "Wild_Eyes.jpg",
      price: 0.99,
      genre: genres[2]._id,
      tags: "outlaw",
      song_url: "empty",
      likes: 6,
    },
    {
      _id: "600b1de76ea21cf63a4db77c",
      title: "El Toro",
      artistId: "600b1de66ea21cf63a4db76e",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "El_Toro.jpg",
      price: 0.99,
      genre: genres[2]._id,
      tags: "outlaw",
      song_url: "empty",
      likes: 6,
    },
  ]);

  await User.deleteMany();
  await User.create({
    avatar: "../../public/images/default.png",
    username: "test",
    firstName: "Test",
    lastName: "User",
    email: "test@test.com",
    password: "12345",
  });

  await User.create({
    avatar: "../../public/images/default.png",
    username: "Pam86",
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "12345",
  });

  await User.create({
    avatar: null,
    username: "EH42",
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "12345",
  });

  // create user data
  // const userData = [];

  // for (let i = 0; i < 10; i += 1) {
  //   const avatar = faker.internet.avatar();
  //   const username = faker.internet.userName();
  //   const firstName = faker.name.firstName();
  //   const lastName = faker.name.lastName();
  //   const email = faker.internet.email(username);
  //   const password = faker.internet.password();

  //   userData.push({ avatar, username, firstName, lastName, email, password });
  // }

  // const createdUsers = await User.collection.insertMany(userData);

  // console.log("users seeded", userData);

  // create artist data
  // const artistData = [];

  // for (let i = 0; i < 50; i += 1) {
  //   const avatar = faker.internet.avatar();
  //   const artistName = faker.random.words();
  //   const bio = "This is a default bio. Tell your listeners more about yourself!";
  //   const email = faker.internet.email(artistName);
  //   const password = faker.internet.password();

  //   artistData.push({ avatar, artistName, bio, email, password });
  // }

  // const createdArtists = await Artist.collection.insertMany(artistData);

  // create friends
  // for (let i = 0; i < 10; i += 1) {
  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { _id: userId } = createdUsers.ops[randomUserIndex];

  //   let friendId = userId;

  //   while (friendId === userId) {
  //     const randomUserIndex = Math.floor(
  //       Math.random() * createdUsers.ops.length
  //     );
  //     friendId = createdUsers.ops[randomUserIndex];
  //   }

  //   await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  // }

  // create songs
  // let createdSongs = [];
  // // let songData = [];
  // for (let i = 0; i < 100; i += 1) {
  //   const title = faker.random.words();

  //   const randomArtistIndex = Math.floor(
  //     Math.random() * createdArtists.ops.length
  //   );
  //   const { _id: artist_id } = createdArtists.ops[randomArtistIndex];
  //   console.log("artist_id:", artist_id);
  //   const artistId = artist_id;
  //   const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);
  //   const image = faker.random.image();
  //   const price = faker.commerce.price();
  //   const genre = genres[Math.floor(Math.random() * genres.length)]._id;
  //   const tags = faker.lorem.word();
  //   const song_url = "https://fairstreem.s3.us-east-2.amazonaws.com/1611278736518.mp3";
  //   const likes = faker.random.number(Math.round(Math.random() * 20) + 1);

    // songData.push({ title, artist, description, image, price, genre, tags, song_url, s3_object_key });

  //   const createdSong = await Song.create({
  //     title,
  //     artistId,
  //     description,
  //     image,
  //     price,
  //     genre,
  //     tags,
  //     song_url,
  //     likes
  //   });

  //   await Artist.updateOne(
  //     { _id: artistId },
  //     { $push: { songs: createdSong._id } }
  //   );

  //   createdSongs.push(createdSong);
  // }

  process.exit();
});