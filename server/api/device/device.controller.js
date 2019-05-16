"use strict"

let Device = require('./device.model')
let handle = require('../../config/response')
let code = require('../../config/code')
let token = require('../../config/auth')

exports.findAll = function(req, res) {
    let args = {}
    if(req.query.where) {args = JSON.parse(req.query.where)}
    //  分页
    return Device.paginate({}, args)
        .then(entity => {
            return handle.responseHandle({res: res, message: entity})
        })
        .catch(err => {
            return handle.errorHandle({res: res, message: err})
        })
}

exports.create = function(req, res) {
    return Device.create(req.body)
    .then(entity => {
        return handle.responseHandle({res: res, message: entity})
    })
    .catch(err => {
        return handle.errorHandle({res: res, message: err})
    })
}

exports.delete = function(req, res) {
    return Device.findById(req.params.id).exec()
    .then(entity => {
        return handle.notFoundHandle({res: res, message: entity})
    })
    .then(entity => {
        if(!entity) return null
        return entity.remove()
    })
    .then(entity => {
        return handle.deleteHandle({res: res})
    })
    .catch(err => {
        return handle.errorHandle(res, err)
    })
}

exports.update = function(req, res) {
    if(req.body._id) delete req.body._id
    return Device.findByIdAndUpdate({_id: req.params.id}, req.body).exec()
    .then(entity => {
        return handle.notFoundHandle({res: res, message: entity})
    })
    .then(entity => {
        return handle.responseHandle({res: res, message: entity})
    })
    .catch(err => {
        return handle.errorHandle(res, err)
    })
}

exports.findOne = function(req, res) {
    return Device.findById(req.params.id).exec()
    .then(entity => {
        return handle.notFoundHandle({res: res, message: entity})
    })
    .then(entity => {
        return handle.responseHandle({res: res, message: entity})
    })
    .catch(err => {
        return handle.errorHandle(res, err)
    })
}