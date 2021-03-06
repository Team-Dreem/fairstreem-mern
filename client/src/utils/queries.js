import gql from "graphql-tag";

export const QUERY_ME = gql`
  {
    me {
      _id
      avatar
      username
      email
      followCount
      follows {
        _id
        avatar
        artistName
      }
      orders {
        songs {
          _id
        }
      }
    }
  }
`;

export const QUERY_ME_ARTIST = gql`
  {
    meArtist {
      _id
      avatar
      artistName
      email
      genre
      bio
      website
      socialMedia
      followerCount
    }
  }
`;

export const QUERY_SONGS_BY_GENRE = gql`
  query getSongs($genre: ID) {
    songs(genre: $genre) {
      _id
      title
      artistId
      artistName
      album
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
      artistName
      album
      description
      image
      price
      genre
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
      orders {
        _id
        purchaseDate
        songs {
          _id
          title
          album
          image
          artistName
          description
          price
          song_url
        }
      }
    }
  }
`;

export const QUERY_ARTIST = gql`
  query getArtist($_id: ID) {
    artist(_id: $_id) {
      _id
      avatar
      artistName
      email
      password
      genre
      bio
      socialMedia
      songs {
        _id
      }
      followers {
        _id
        username
      }
      comments {
        _id
        commentText
      }
    }
  }
`;

export const QUERY_ARTISTS = gql`
  {
    artists {
      _id
      avatar
      artistName
      email
      password
      genre
      bio
      website
      socialMedia
      songs {
        _id
      }
      followers {
        _id
        username
      }
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_ARTIST_BY_GENRE = gql`
  query GetArtistsByGenre($genre: String) {
    artistsByGenre(genre: $genre) {
      artistName
      avatar
      _id
      genre
    }
  }
`;

export const QUERY_SEARCH = gql`
  query Search($term: String!) {
    search(term: $term) {
      artistName
      avatar
      _id
      genre
    }
  }
`;

export const QUERY_COMMENTS = gql` 
query comments($username: String, $artistId: ID) {
  comments(username: $username, artistId: $artistId) {
    _id
    createdAt
    username
    artistId
    commentText
    reactions {
      _id
      createdAt
      username
      reactionBody
    }
  }
}
`;
