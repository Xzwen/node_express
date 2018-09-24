'use strict';

const User = require('./user.model');
const Promise = require('bluebird');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

exports.index = function(req, res) {
  return User.find({}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

exports.show = function(req, res) {
  return User.findById(req.params.id).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

exports.create = function(req, res) {
  return User.findOne({username: req.body.username}).exec()
    .then(user => {
      if(user) {
        return Promise.resolve({code: 1000, message: '该用户已存在！'});
      }
      return User.create(req.body);
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
};
