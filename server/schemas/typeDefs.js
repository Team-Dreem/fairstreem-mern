const { gql } = require("apollo-server-express");

// type User {
//   _id: ID
//   avatar: String
//   username: String!
//   firstName: String
//   lastName: String
//   password: String!
//   email: String
//   follows: [User]
//   orders: [Order]
// }

const typeDefs = gql`

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Genre {
    _id: ID
    name: String
  }

  type Song {
    _id: ID
    title: String
    artistId: String
    artistName: String
    album: String
    description: String
    image: String
    price: Float
    genre: Genre
    tags: [String]
    song_url: String
    likes: Int!
    comments: [Comment]
  }

  type Order {
    _id: ID
    purchaseDate: String
    songs: [Song]
  }

  type Checkout {
    session: ID
  }

  type User {
    _id: ID
    avatar: String
    username: String!
    password: String!
    email: String!
    bio: String
    followCount: Int
    follows: [Artist]
    comments: [Comment]
    orders: [Order]
  }

  type Artist {
    _id: ID
    avatar: String
    artistName: String!
    email: String!
    password: String!
    genre: String!
    bio: String
    website: String
    socialMedia: String
    songs: [Song]
    followerCount: Int
    followers: [User]
    comments: [Comment]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    search(term: String!): [Artist]
    artist(_id: ID, artistName: String): Artist
    artists(_id: ID, artistName: String): [Artist]
    artistsByGenre(genre: String): [Artist]
    comment(_id: ID!): Comment
    comments(username: String): [Comment]
    genres: [Genre]
    songs(genre: ID, name: String): [Song]
    song(_id: ID): Song
    user(_id: ID, username: String): User
    users: [User]
    userNotLoggedIn(username: String): User
    order(_id: ID!): Order
    checkout(songs: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      bio: String
      avatar: String
    ): Auth
    addArtist(
      artistName: String!
      email: String!
      password: String!
      genre: String!
      bio: String
      socialMedia: String
      avatar: String
    ): Auth
    addOrder(songs: [ID]!): Order
    updateUser(
      username: String
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
    artistLogin(email: String!, password: String!):Auth
  }
`;

module.exports = typeDefs;
