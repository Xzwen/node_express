
let express = require('express')
let router = express.Router()
let jwt = require('jsonwebtoken')
let handle = require('./response')
let code = require('./code')
let config = require('./index')
// let expressJwt = require('express-jwt')

// 生成token
let token = (id, role) => {
    return jwt.sign({_id: id, role: role}, config.secretKey, {expiresIn: config.expiresIn})
}

//  解析token
let verifyToken = (token) => {
    return jwt.verify(token, config.secretKey, function(err, decoded){
        return decoded
    })
}

//  token中间件
router.use((req, res, next) => {
    if(req.headers && req.headers.authorization){
        let reqToken = req.headers.authorization.split('Bearer ').pop()
        //  过期时间的验证
        return jwt.verify(reqToken, config.secretKey, function (err, decoded) {
            if(err) {
                return handle.errorHandle({res, message: code.tokenFail, statusCode: 401})
            } else {
                next()
            }
        })
    } else {
        return handle.errorHandle({res, message: code.headerFail, statusCode: 401})
    }
})

//  token中间件(使用’express-jwt‘)
// let validateJwt = expressJwt({secret: config.secretKey})
// router.use(validateJwt)

module.exports = {
    token: token,
    verifyToken: verifyToken,
    isAuthenticated: router
}

