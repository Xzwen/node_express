"use strict"

let express = require("express")
let controller = require("./users.controller")
let router = express.Router()
const authJwt = require('../../config/auth')

router.post('/login', controller.login)
router.post('/register', controller.register)

router.get('/me', authJwt.isAuthenticated, controller.me)
router.get('/', authJwt.isAuthenticated, controller.findAll)
router.post('/', authJwt.isAuthenticated, controller.create)
router.delete('/:id', authJwt.isAuthenticated, controller.delete)
router.put('/:id', authJwt.isAuthenticated, controller.update)
router.get('/:id', authJwt.isAuthenticated, controller.findOne)

module.exports = router