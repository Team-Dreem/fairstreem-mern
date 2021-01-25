// import aws from 'aws-sdk';
const { AuthenticationError } = require("apollo-server-express");
const { Artist, Comment, User, Song, Genre, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const s3Bucket = process.env.S3_BUCKET;

const resolvers = {
  Query: {
    // artist: async (parent, args, context) => {
    //     const user = await Artist.findById(context.user._id).populate({
    //       path: "orders.songs",
    //       populate: "genre",
    //     });

    //     user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

    //     return user;

    //   throw new AuthenticationError("Not logged in");
    // },
    artists: async () => {
      return Artist.find().populate("followers").populate("comments");
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
        const product = await stripe.products.create({
          name: songs[i].title,
          description: songs[i].description,
          images: [`${url}/images/${songs[i].image}`],
          // These image thumbnails won't display on the Stripe checkout page when testing locally, because Stripe can't download images that are being served from your personal computer's localhost. You will only see these images when you deploy the app to Heroku.
        });
        console.log("resolver product:", product);

        // generate price id using the song id
        const price = await stripe.prices.create({
          product: product.id,
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
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    },
    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await Comment.find(params).sort({ createdAt: -1 });
    },
    // Here, we pass in the parent as more of a placeholder parameter. It won't be used, but we need something in that first parameter's spot so we can access the username argument from the second parameter. We use a ternary operator to check if username exists. If it does, we set params to an object with a username key set to that value. If it doesn't, we simply return an empty object.

    //We then pass that object, with or without any data in it, to our .find() method. If there's data, it'll perform a lookup by a specific username. If there's not, it'll simply return every thought.
    genres: async () => {
      return await Genre.find();
    },
    // songs: async (parent, { genre, title }) => {
    //   const params = {};

    //   if (_id) {
    //     params._id = _id;
    //   }

    //   if (artistName) {
    //     params.artistName= {
    //       $regex: artistName,
    //     };
    //   }

    //   return await Artist.find(params).populate("Artist");
    // },
    //find one artist
    // artist: async (parent, {artistName})=>{
    //   return await Artist.findOne({artistName})
    //   // .populate('songs')
    // },
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
    search: async (parent, { term }, context) => {
      return Artist.find({
        artistName: new RegExp(`.*${term}.*`, "i"),
      }).select("-__v -password");
    },
    // songs: async (parent, { genre, title }) => {
    //   const params = {};

    //   if (genre) {
    //     params.genre = genre;
    //   }

    //   if (title) {
    //     params.title = {
    //       $regex: title,
    //     };
    //   }

    //   return await Song.find(params).populate("genre");
    // },
    song: async (parent, { _id }) => {
      return await Song.findById(_id).populate("genre");
    },
    songs: async () => {
      return await Song.find();
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("follows")
        .populate("comments");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate("follows")
          .populate("comments")
          .populate({
            path: "orders.songs",
            populate: "genre",
          });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    userNotLoggedIn: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.findOne(params)
        .select("-__v -password")
        .populate("follows")
        .populate("comments");
    },
  },
  Mutation: {
    addArtist: async (parent, args) => {
      const artist = await Artist.create(args);
      const token = signToken(artist);

      return { token, artist };
    },
    addOrder: async (parent, { songs }, context) => {
      console.log("context.user", context.user);
      console.log("songs in addOrder arg", songs);
      if (context.user) {
        const order = new Order({ songs });
        console.log("order", order);
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        const populatedOrder = await Order.findById(order._id).populate(
          "songs"
        );
        console.log("popOrder:", populatedOrder);
        return populatedOrder;
      }

      throw new AuthenticationError("Not logged in");
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    artistLogin: async (parent, { email, password }) => {
      const artist = await Artist.findOne({ email });

      if (!artist) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await artist.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(artist);

      return { token, artist };
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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    // updateSong: async (parent, { _id, quantity }) => {
    //   const decrement = Math.abs(quantity) * -1;

    //   return await Song.findByIdAndUpdate(
    //     _id,
    //     { $inc: { quantity: decrement } },
    //     { new: true }
    //   );
    // },
  },
};

module.exports = resolvers;

// The resolver functions will receive parameters at some point, but for now we don't need them because our data source is coming straight from the imported models at the top of the file.

//IMPORTANT
// The Apollo server library can also be set up to pass the data sources, such as the database model we're working with, as an argument to the resolver function. If you ever look at the tutorial Apollo has on its website, you'll see that they set it up in that way, so don't be alarmed if it looks different from how we've set it up here.
