const authMiddleware = (req, res, next) => {
    // Logic for authentication (e.g., verify token)
    next();
  };
  
  module.exports = authMiddleware;
  