"use strict"

let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')

let UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    sex: {
        type: String
    },
    birthday: {
        type: String
    },
    phone: {
        type: String,
        validata: {
            validator: (data, res) => {
                return /^1[35689]\d{9}$/g.test(data)
            },
            message: 'phone is unvalided'
        },
        required: [true, 'phone is requireded']
    },
    email: {
        type: String
    },
    abstract: {
        type: String
    }
}, {
    timestamps: true
})

UsersSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Users', UsersSchema)