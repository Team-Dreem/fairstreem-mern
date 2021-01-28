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
      artist {
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
      artist {
        _id
      }
    }
  }
`;
//adds Artist to User (return type user)¸
export const ADD_FOLLOW = gql`
mutation addFollow($artistId: ID!) {
  addFollow(artistId: $artistId) {
    _id
    username
    followCount
    follows {
      _id
      artistName
    }
  }
}
`;
//adds User to Artist (return type artist)
export const ADD_FOLLOWER = gql`
mutation addFollower($artistId: ID!){
  addFollower(artistId: $artistId) {
    _id
    artistName
    followerCount
    followers{
      _id
      username
    }
  }
}
`

export const ADD_COMMENT = gql`
mutation addComment($commentText: String!, $artistId: ID!) {
  addComment(commentText: $commentText, artistId: $artistId) {
    _id
    commentText
    createdAt
    username
    artistId
    reactionCount
    
  }
}
`
//return type comment
// export const ADD_REACTION = gql`
// mutation addReaction($commentId: ID!, $reactionBody: String!){
//   addReaction(commentId: $commentId, $reactionBody: reactionBody){
//     _id
//     commentText
//     reactions{
//       reactionBody
//     }
//   }
// }
// `


//returns type Song
export const ADD_SONG = gql`
mutation addSong($title: String!, $price: Float!, $description: String, $genre: ID!, $song_url: String, $album: String){
  addSong(title: $title, price: $price, description: $description, genre: $genre, song_url: $song_url, album: $album){
      title
      _id
    }
  }
`

export const UPDATE_USER_AVATAR = gql`
mutation updateUserAvatar($avatarUrl: String!) {
  updateUser(avatar: $avatarUrl) {
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
