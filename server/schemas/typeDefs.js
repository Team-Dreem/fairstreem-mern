const { gql } = require("apollo-server-express");

// type User {
//   _id: ID
//   avatar: String
//   username: String!
//   firstName: String
//   lastName: String
//   password: String!
//   email: String
//   friends: [User]
//   orders: [Order]
// }

const typeDefs = gql`

  type Genre {
    _id: ID
    name: String
  }

  type Song {
    _id: ID
    title: String
    artistId: String
    description: String
    image: String
    price: Float
    genre: Genre
    tags: [String]
    song_url: String
    likes: Int!
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
    aboutme: String
    friends: [User]
    orders: [Order]
  }

  type Artist {
    _id: ID
    avatar: String
    artistName: String!
    email: String!
    password: String!
    genre: String!
    aboutme: String
    socialMedia: String
    songs: [Song]
    followers: [User]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    search(term: String!): [Artist]
    artist: Artist
    artists(_id: ID, artistName: String): [Artist]
    artistsByGenre(genre: String): [Artist]
    genres: [Genre]
    songs(genre: ID, name: String): [Song]
    song(_id: ID!): Song
    user: User
    users: [User]
    order(_id: ID!): Order
    checkout(songs: [ID]!): Checkout
  }


  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      aboutme: String
      avatar: String
    ): Auth
    addArtist(
      artistName: String!
      email: String!
      password: String!
      genre: String!
      aboutme: String
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
