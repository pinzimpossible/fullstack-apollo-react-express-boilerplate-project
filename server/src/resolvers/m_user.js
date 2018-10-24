import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import User from '../models/m_user';

const tokenExpired = 60 * 60 * 8 // 8 hours

const createToken = async (user, secret) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn: tokenExpired,
  });
};

export default {
  Query: {
    allUser: async () => {
      return await User.find();
    }
  },
  Mutation: {
    signUp: async (root, { username, email, password }) => {
      const user = await User.save()
    }
  }
}