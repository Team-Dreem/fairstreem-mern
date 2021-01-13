import gql from 'graphql-tag';

export const QUERY_SONGS = gql`
  query getSongs($genre: ID) {
    songs(genre: $genre) {
      _id
      name
      description
      price
      quantity
      image
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
      name
      description
      price
      quantity
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