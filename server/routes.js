const authJwt = require('./config/auth');

exports.default = function(app) {
  // app.use('/api/author', require('./api/author'));
  app.use('/api/users', require('./api/users'));
  app.use('/api/meeting', authJwt.isAuthenticated, require('./api/meeting'));
  app.use('/api/device', authJwt.isAuthenticated, require('./api/device'));
};
