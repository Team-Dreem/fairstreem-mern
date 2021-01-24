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
        }
      }
    }
  }
`;

export const QUERY_SONGS_BY_GENRE = gql`
  query getSongs($genre: ID) {
    songs(genre: $genre) {
      _id
      title
      artist
      description
      image
      price
      genre {
        _id
      }
      tags 
      song_url
    }
  }
`;

export const QUERY_SONGS = gql`
  query songs {
    songs {
      _id
      title
      artistId
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
      tags 
      song_url
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

// export const QUERY_ARTISTS = gql`
//   query getArtists($_id: ID){
//     artists(_id: $_id) {
//       _id
//       avatar
//       artistName
//       email
//       password
//       genre
//       aboutme
//       socialMedia
//       songs {
//         _id
//         title
//       }
//       followers {
//         _id
//         username
//       }
//     }
//   }
// `;

export const QUERY_ARTISTS = gql`
  query artists {
    artists {
      _id
      avatar
      artistName
      email
      password
      genre
      aboutme
      socialMedia
      songs {
        _id
        title
      }
      followers {
        _id
        username
      }
    }
  }
`;

export const QUERY_SEARCH = gql`
  query Search($term: String!) {
    search(term: $term) {
      artistName,
      avatar,
      _id
    }
  }
`;
