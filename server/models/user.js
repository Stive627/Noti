/* eslint-disable no-undef */
const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, min:[6, 'The password have to be greater than 5']}
})

module.exports = mongoose.model('user', userSchema)