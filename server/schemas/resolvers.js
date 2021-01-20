// import aws from 'aws-sdk';
const { AuthenticationError } = require("apollo-server-express");
const { Artist, User, Song, Genre, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const s3Bucket = process.env.S3_BUCKET;

const resolvers = {
  Query: {
    artists: async () => {
      return Artist.find()
      .select("-__v -password");
    },
    genres: async () => {
      return await Genre.find();
    },
    songs: async (parent, { genre, name }) => {
      const params = {};

      if (genre) {
        params.genre = genre;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Song.find(params).populate("genre");
    },
    song: async (parent, { _id }) => {
      return await Song.findById(_id).populate("genre");
    },
    users: async () => {
      return User.find()
      .select("-__v -password");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.songs",
          populate: "genre",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.songs",
          populate: "genre",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // This will give us the base domain that the request came from. Locally, that would be http://localhost:3001, since the GraphQL Playground is running on port 3001.

      const order = new Order({ songs: args.songs });
      const { songs } = await order.populate("songs").execPopulate();
      // Remember, the checkout() query expects an array of song IDs. We'll pass this array into a new instance of an Order Mongoose model. The Order model will make it much easier to convert these IDs into fully populated song objects.

      const line_items = [];

      for (let i = 0; i < songs.length; i++) {
        // generate song id
        const song = await stripe.songs.create({
          name: songs[i].name,
          description: songs[i].description,
          images: [`${url}/images/${songs[i].image}`],
          // These image thumbnails won't display on the Stripe checkout page when testing locally, because Stripe can't download images that are being served from your personal computer's localhost. You will only see these images when you deploy the app to Heroku.
        });

        // generate price id using the song id
        const price = await stripe.prices.create({
          song: song.id,
          unit_amount: songs[i].price * 100,
          currency: "usd",
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
        // success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        // cancel_url: 'https://example.com/cancel'
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { songs }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ songs });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateSong: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Song.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
