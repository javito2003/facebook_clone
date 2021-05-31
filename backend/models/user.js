const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    name: {type: String, required: [true, 'Name is required']},
    lastName: {type: String, required: [true, 'Last name is required']},
    email: {type: String, required: [true, 'Email is required'], unique: true},
    password: {type: String, required: [true, 'Password is required']},
    active: {type: String, default: true},
    gender: {type: String, required: [true, 'Gender is required']},
    profilePhoto: {type:String, required: [true, 'Image is required']}
})

userSchema.plugin(uniqueValidator, {message: "Error, {PATH} already exists"})
userSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password
    return obj
}

const User = mongoose.model('User', userSchema)
module.exports = User