exports.default = function(app) {
  app.use('/api/index', require('../routes'));
  app.use('/api/users', require('./api/user'));
};
