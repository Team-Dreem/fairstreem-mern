const db = require("./connection");
const faker = require("faker");
const { Artist, Comment, User, Genre, Song } = require("../models");

db.once("open", async () => {
  await Artist.deleteMany();
  await User.deleteMany();
  await Genre.deleteMany();
  await Song.deleteMany();
  await Comment.deleteMany();

  await Artist.create({
    _id: "600b1de66ea21cf63a4db76b",
    avatar: "../../public/images/default.png",
    artistName: "Test",
    bio: "This is a default bio. Tell your listeners more about yourself!",
    email: "test@artist.com",
    password: "12345",
    genre: "Test",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  await Artist.create({
    _id: "600b1de66ea21cf63a4db76c",
    avatar: "https://fairstreem.s3.us-east-2.amazonaws.com/1611627258618.jpg",
    artistName: "The American Revival",
    bio: "This is a default bio. Tell your listeners more about yourself!",
    email: "fakeemail@artist.com",
    password: "12345",
    genre: "Rock/Alternative",
    songs: ["600f6827ded0c5264cbe4a28", "600f667905d21d244b5182ea"],
    followers: [],
  });

  await Artist.create({
    _id: "600b1de66ea21cf63a4db76d",
    avatar: "https://fairstreem.s3.us-east-2.amazonaws.com/1611111773027",
    artistName: "Jeff Johnston",
    bio: "This is a default bio. Tell your listeners more about yourself!",
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
    bio: "This is a default bio. Tell your listeners more about yourself!",
    email: "jeffwarrenjohnston@artist.com",
    password: "12345",
    genre: "Country",
    songs: ["600b1de76ea21cf63a4db77b", "600b1de76ea21cf63a4db77c"],
    followers: [],
  });

  await Artist.create({
    artistName: "Feed",
    bio: "This is a default bio. Tell your listeners more about yourself!",
    email: "feed@artist.com",
    password: "12345",
    genre: "Country",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  await Artist.create({
    artistName: "Reboot",
    bio: "This is a default bio. Tell your listeners more about yourself!",
    email: "reboot@artist.com",
    password: "12345",
    genre: "Country",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  await Artist.create({
    artistName: "Concrete Hat",
    bio: "This is a default bio. Tell your listeners more about yourself!",
    email: "concrete_hat@artist.com",
    password: "12345",
    genre: "Country",
    songs: ["600a28d52e97ee7ae2cf63a5"],
    followers: [],
  });

  const genres = await Genre.insertMany([
    { _id: "600dfabaebcba48440047d26", name: "Rock/Alternative" },
    { _id: "600dfabaebcba48440047d27", name: "R&B" },
    { _id: "600dfabaebcba48440047d28", name: "Country" },
    { _id: "600dfabaebcba48440047d29", name: "Hip-hop/Rap" },
    { _id: "600dfabaebcba48440047d2a", name: "Electronic" },
    { _id: "600dfabaebcba48440047d2b", name: "Jazz" },
    { _id: "600dfabaebcba48440047d2c", name: "Blues" },
    { _id: "600dfabaebcba48440047d2d", name: "Classical" },
    { _id: "600dfabaebcba48440047d2e", name: "Other" },
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
      song_url:
        "https://fairstreem.s3.us-east-2.amazonaws.com/1611278736518.mp3",
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
      song_url: "https://fairstreem.s3.us-east-2.amazonaws.com/1611538839197.mp3",
      likes: 6,
    },
    {
      "_id": "600f6827ded0c5264cbe4a28",
      "title": "Rise & Fall",
      "artistId": "600b1de66ea21cf63a4db76c",
      "description": "This is the real song upload test.",
      "image": "https://fairstreem.s3.us-east-2.amazonaws.com/1611627258618.jpg",
      "price": 0.99,
      "genre": {
        "_id": "600dfabaebcba48440047d28"
      },
      "tags": [
        ""
      ],
      "song_url": "https://fairstreem.s3.us-east-2.amazonaws.com/1611622431810.mp3"
    },
    {
      "_id": "600f667905d21d244b5182ea",
      "title": "Porcelain",
      "artistId": "600b1de66ea21cf63a4db76c",
      "description": "This is the real song upload test.",
      "image": "https://fairstreem.s3.us-east-2.amazonaws.com/1611627397778.jpg",
      "price": 0.99,
      "genre": {
        "_id": "600dfabaebcba48440047d28"
      },
      "tags": [
        ""
      ],
      "song_url": "https://fairstreem.s3.us-east-2.amazonaws.com/1611622008635.mp3"
    },
  ]);

  await User.create({
    avatar: "../../public/images/default.png",
    username: "test",
    firstName: "Test",
    lastName: "User",
    email: "test@test.com",
    password: "12345",
    follows: ["600b1de66ea21cf63a4db76d", "600b1de66ea21cf63a4db76e"]
  });

  await User.create({
    avatar: "../../public/images/default.png",
    username: "Pam86",
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "12345",
    follows: ["600b1de66ea21cf63a4db76e"]
  });

  await User.create({
    avatar: null,
    username: "EH42",
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "12345",
    follows: ["600b1de66ea21cf63a4db76d"]
  });

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const avatar = faker.internet.avatar();
    const username = faker.internet.userName();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ avatar, username, firstName, lastName, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create comments
  // let createdComments = [];
  // for (let i = 0; i < 100; i += 1) {
  //   const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username, _id: userId } = createdUsers.ops[randomUserIndex];

  //   const createdComment = await Comment.create({ commentText, username });

  //   const updatedUser = await User.updateOne(
  //     { _id: userId },
  //     { $push: { comments: createdComment._id } }
  //   );

  //   createdComments.push(createdComment);
  // }

  // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomCommentIndex = Math.floor(
  //     Math.random() * createdComments.length
  //   );
  //   const { _id: commentId } = createdComments[randomCommentIndex];

  //   await Comment.updateOne(
  //     { _id: commentId },
  //     { $push: { reactions: { reactionBody, username } } },
  //     { runValidators: true }
  //   );
  // }

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

  // const createdArtists = await Artist.collection.insertMan(artists);

  // // create follows
  // for (let i = 0; i < 10; i += 1) {
  //   const randomArtistIndex = Math.floor(Math.random() * createdArtists.ops.length);
  //   const { _id: artistId } = createdArtists.ops[randomArtistIndex];

  //   let followId = artistId;

  //   while (followId === artistId) {
  //     const randomUserIndex = Math.floor(
  //       Math.random() * createdUsers.ops.length
  //     );
  //     followId = createdUsers.ops[randomUserIndex];
  //   }

  //   await User.updateOne({ _id: userId }, { $addToSet: { follows: followId } });
  // }

  // console.log("users seeded", userData);


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
