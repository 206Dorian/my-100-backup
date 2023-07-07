const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
  }
 
  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    Users: [User]
    getUser: User
  
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isAdmin: Boolean!): Auth
    login(username: String!, password: String!): Auth
    deleteUser(username: String!): User
    updateUser(height: String!, weight: String!, age: String!): User
    adminLogin(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
