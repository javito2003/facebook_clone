const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const mongooseAlgolia = require('mongoose-algolia')

const userSchema = new Schema({
    name: {type: String, required: [true, 'Name is required']},
    lastName: {type: String, required: [true, 'Last name is required']},
    email: {type: String, required: [true, 'Email is required'], unique: true},
    password: {type: String, required: [true, 'Password is required']},
    active: {type: String, default: true},
    gender: {type: String, required: [true, 'Gender is required']},
    profilePhoto: {type:String, required: [true, 'Image is required']},
    friendsId: [{type: Schema.Types.ObjectId, ref: "User"}],
    postsId: [{type: Schema.Types.ObjectId, ref: "Post"}]
})

userSchema.plugin(uniqueValidator, {message: "Error, {PATH} already exists"})
userSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password
    return obj
}
userSchema.plugin(mongooseAlgolia, {
    appId: '4ACK75ESJB',
    apiKey: 'd747c2a97732b0dacd0cb9a1953e5d38',
    indexName: 'facebookclone',
    selector: 'name lastName profilePhoto _id friendsId postsId gender active',
    populate:{
        path: 'friendsId postsId'
    },
    debug: true

})

const User = mongoose.model('User', userSchema)
User.SyncToAlgolia()
User.SetAlgoliaSettings({
    searchableAttributes: ['name']
})
module.exports = User