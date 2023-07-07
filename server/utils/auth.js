const jwt = require('jsonwebtoken');

const secret = '45432THISISASECRET987345!!';
const expiration = '1h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const decodedToken = jwt.verify(token, secret);
      // console.log('Decoded Token:', decodedToken);
      req.user = decodedToken.data; // Attach the user object to req.user
    } catch (error) {
      console.log('Invalid token:', error.message);
    }

    return req; // Return the modified req object
  },
  signToken: function ({ username, _id, age, weight, height, email, isAdmin }) {
    const payload = { username, _id, age, weight, height, email, isAdmin };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
