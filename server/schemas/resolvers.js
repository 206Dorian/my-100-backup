const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-__v -password');
        return user;
      }
      // Instead of returning null, you can throw an error if the user is not logged in
      throw new AuthenticationError('Not logged in');
    },
    Users: async (parent, args, context) => {
      return await User.find();
    },
    getUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-__v -password');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user: { ...user.toObject(), email: user.email } };
    },
    updateUser: async (parent, { height, weight, age }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { age, height, weight } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, { username }) => {
      const user = await User.findOneAndDelete({ username });
      return `We will miss you ${user.username}`;
    },

  },
};

module.exports = resolvers;
