const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 4000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const connectToMongoDB = async () => {
  try {
    const uri = process.env.YOUR_CONNECTION_STRING;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};



const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  connectToMongoDB();

  if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React client
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // All other routes will be handled by the React client
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
