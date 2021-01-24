import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
      _id
      avatar
      username
      firstName
      lastName
      email
      friendCount
      friends {
        _id
        username
      }
      orders {
        songs {
          _id
          title
        }
      }
    }
  }
`;

export const QUERY_SONGS_BY_GENRE = gql`
  query song($genre: ID) {
    songs(genre: $genre) {
      _id
      title
      artist
      description
      image
      price
      genre {
        _id
        name
      }
      tags {
        name
      }
      song_url
      s3_object_key
    }
  }
`;

export const QUERY_SONGS = gql`
  query getSongs($genre: ID) {
    songs(genre: $genre) {
      _id
      title
      artist
      description
      image
      price
      song_url
      genre {
        _id
      }
    }
  }
`;

export const QUERY_ALL_SONGS = gql`
  {
    songs {
      _id
      title
      description
      price
      song_url
      genre {
        name
      }
    }
  }
`;

export const QUERY_GENRES = gql`
{
  genres {
    _id
    name
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($songs: [ID]!) {
    checkout(songs: $songs) {
      session
    }
  }
`;

export const QUERY_USER = gql`
{
  user {
    avatar
    username
    firstName
    lastName
    orders {
      _id
      purchaseDate
      songs {
        _id
        title
        artist
        description
        price
        image
      }
    }
  }
}
`;

export const QUERY_ARTIST = gql`
  {
    artist {
      avatar
      artistName
      email
      password
      songs {
        _id
        title
        description
        price
        image
      }
      followers {
        _id
        username
      }
    }
  }
`;