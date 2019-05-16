let code = require('./code')

exports.responseHandle = function({res, message, statusCode=200}) {
    if(!message) return null
    return res.status(statusCode).json(message)
}

exports.errorHandle = function({res, message, statusCode=500}) {
    return res.status(statusCode).json(message)
}

exports.notFoundHandle = function({res, message, statusCode=404}) {
    if(message) return message
    res.status(statusCode).json(code.notFound)
    return null
}

exports.deleteHandle = function({res, message, statusCode=204}) {
    return res.status(statusCode).end()
}