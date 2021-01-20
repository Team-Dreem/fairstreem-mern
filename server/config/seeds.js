const db = require("./connection");
const faker = require("faker");
const { Artist, User, Genre, Song } = require("../models");

db.once("open", async () => {
  await Artist.deleteMany();
  await User.deleteMany();
  await Genre.deleteMany();
  await Song.deleteMany();
  

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
      title: "Catharsis",
      artist: "Jeff Johnston",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "JeffJohnston.jpg",
      price: 0.99,
      genre: genres[0]._id,
      tags: "indie",
      song_url: "empty",
      s3_object_key: "empty",
      filePath: "fake_url",
      likes: 6,
    },
    {
      title: "Wild Eyes",
      artist: "Jeff Warren Johnston",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "Wild_Eyes.jpg",
      price: 0.99,
      genre: genres[2]._id,
      tags: "outlaw",
      song_url: "empty",
      s3_object_key: "empty",
      filePath: "fake_url",
      likes: 6,
    },
    {
      title: "El Toro",
      artist: "Jeff Warren Johnston",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "El_Toro.jpg",
      price: 0.99,
      genre: genres[2]._id,
      tags: "outlaw",
      song_url: "empty",
      s3_object_key: "empty",
      filePath: "fake_url",
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
    orders: [
      {
        songs: [songs[0]._id],
      },
    ],
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
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const avatar = faker.internet.avatar();
    const username = faker.internet.userName();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ avatar, username, firstName, lastName, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log("users seeded", userData);

  // create artist data
  const artistData = [];

  for (let i = 0; i < 10; i += 1) {
    const avatar = faker.internet.avatar();
    const artistName = faker.random.words();
    const email = faker.internet.email(artistName);
    const password = faker.internet.password();

    artistData.push({ avatar, artistName, email, password });
  }

  const createdArtists = await Artist.collection.insertMany(artistData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create songs
  let createdSongs = [];
  // let songData = [];
  for (let i = 0; i < 100; i += 1) {
    const title = faker.random.words();

    const randomArtistIndex = Math.floor(
      Math.random() * createdArtists.ops.length
    );
    const { artistName, _id: artistId } = createdArtists.ops[randomArtistIndex];
    console.log("ARTISTNAME:", artistName);
    const artist = artistName;
    const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const image = faker.random.image();
    const price = faker.commerce.price();
    const genre = genres[Math.floor(Math.random() * genres.length)]._id;
    const tags = faker.lorem.word();
    const song_url = faker.internet.url();
    const s3_object_key = faker.internet.password();
    const filePath = faker.internet.url();
    const likes = faker.random.number(Math.round(Math.random() * 20) + 1);

    // songData.push({ title, artist, description, image, price, genre, tags, song_url, s3_object_key });

    const createdSong = await Song.create({
      title,
      artist,
      description,
      image,
      price,
      genre,
      tags,
      song_url,
      s3_object_key,
      filePath,
      likes
    });

    await Artist.updateOne(
      { _id: artistId },
      { $push: { songs: createdSong._id } }
    );

    createdSongs.push(createdSong);
  }

  process.exit();
});