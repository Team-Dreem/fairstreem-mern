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


export const ADD_ORDER = gql`
  mutation addOrder($songs: [ID]!) {
    addOrder(songs: $songs) {
      purchaseDate
      songs {
        _id
      name
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
  mutation addUser($username: String!, $firstName: String, $lastName: String, $email: String!, $password: String!) {
    addUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;