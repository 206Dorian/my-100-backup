import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $isAdmin: Boolean!) {
    addUser(username: $username, email: $email, password: $password, isAdmin: $isAdmin) {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($username: String!) { 
    deleteUser(username: $username)
  }
`;

