"use strict"

let express = require("express")
let controller = require("./device.controller")
let router = express.Router()

router.get('/', controller.findAll)
router.post('/', controller.create)
router.delete('/:id', controller.delete)
router.put('/:id', controller.update)
router.get('/:id', controller.findOne)

module.exports = router