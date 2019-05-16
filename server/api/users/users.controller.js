"use strict"

let Users = require('./users.model')
let handle = require('../../config/response')
let code = require('../../config/code')
let token = require('../../config/auth')


exports.login = function(req, res) {    
    let { username, password } = req.body
    return Users.findOne({username: username, password: password}).exec()
    .then(user => {
        if(user) return handle.responseHandle({res: res, message: {token: token.token(user._id, 'admin')}})
        return handle.errorHandle({res: res, message: code.loginFail, statusCode: 401})
    })
    .catch(err => {
        return handle.errorHandle({res: res, message: err})
    });
}

exports.register = function(req, res){
    let { username, password } = req.body
    return Users.findOne({username: username}).exec()
    .then(user => {
        if(user) return handle.errorHandle({res: res, message: code.registerFail, statusCode: 401})
        return Users.create(req.body)
        .then(user => {
            return handle.responseHandle({res: res, message: user})
        })
        .catch(err => {
            return handle.errorHandle({res: res, message: err})
        })
    })
    .catch(err => {
        return handle.errorHandle({res: res, message: err})
    })
}

//  =============================================
exports.me = function(req, res){
    let reqToken = req.headers.authorization.split('Bearer ').pop()
    let info = token.verifyToken(reqToken)
    return Users.findById(info._id, {password: 0}).exec()
        .then(user => {
            return handle.notFoundHandle({res: res, message: user})
        })
        .then(user => {
            return handle.responseHandle({res: res, message: user})
        })
        .catch(err => {
            return handle.errorHandle({res: res, message: err})
        })
}

exports.findAll = function(req, res) {
    let args = {}
    if(req.query.where) {args = JSON.parse(req.query.where)}
    //  分页
    return Users.paginate({}, args)
        .then(user => {
            return handle.responseHandle({res: res, message: user})
        })
        .catch(err => {
            return handle.errorHandle({res: res, message: err})
        })
}

exports.create = function(req, res) {
    let { username, password } = req.body
    return Users.findOne({username: username}).exec()
    .then(user => {
        if(user) return handle.errorHandle({res: res, message: code.registerFail, statusCode: 401})
        return Users.create(req.body)
        .then(user => {
            return handle.responseHandle({res: res, message: user})
        })
        .catch(err => {
            return handle.errorHandle({res: res, message: err})
        })
    })
    .catch(err => {
        return handle.errorHandle({res: res, message: err})
    })
}

exports.delete = function(req, res) {
    return Users.findById(req.params.id).exec()
    .then(user => {
        return handle.notFoundHandle({res: res, message: user})
    })
    .then(user => {
        if(!user) return null
        return user.remove()
    })
    .then(user => {
        return handle.deleteHandle({res: res})
    })
    .catch(err => {
        return handle.errorHandle(res, err)
    })
}

exports.update = function(req, res) {
    if(req.body._id) delete req.body._id
    return Users.findByIdAndUpdate({_id: req.params.id}, req.body).exec()
    .then(user => {
        return handle.notFoundHandle({res: res, message: user})
    })
    .then(user => {
        return handle.responseHandle({res: res, message: user})
    })
    .catch(err => {
        return handle.errorHandle(res, err)
    })
}

exports.findOne = function(req, res) {
    return Users.findById(req.params.id).exec()
    .then(user => {
        return handle.notFoundHandle({res: res, message: user})
    })
    .then(user => {
        return handle.responseHandle({res: res, message: user})
    })
    .catch(err => {
        return handle.errorHandle(res, err)
    })
}