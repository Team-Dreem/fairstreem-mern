import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ARTIST_LOGIN = gql`
  mutation artistLogin($email: String!, $password: String!) {
    artistLogin(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_ORDER = gql`
  mutation addOrder($songs: [ID]!) {
    addOrder(songs: $songs) {
      purchaseDate
      songs {
        _id
        title
        description
        price
        genre {
          name
        } 
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $bio: String, $avatar: String) {
    addUser(username: $username, email: $email, password: $password, bio: $bio, avatar: $avatar) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ARTIST = gql`
  mutation addArtist($artistName: String!, $email: String!, $password: String!, $genre: String!, $bio: String, $socialMedia: String, $avatar: String) {
    addArtist(artistName: $artistName, email: $email, password: $password, genre: $genre, bio: $bio, socialMedia: $socialMedia, avatar: $avatar) {
      token
      user {
        _id
      }
    }
  }
`;