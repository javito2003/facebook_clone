const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendRequestSchema = new Schema({
    userApplicantId: {type: Schema.Types.ObjectId, ref: "User"},
    userDestinationId: {type: Schema.Types.ObjectId, ref: "User"},
    time: {type: Number},
    notifId: {type: String, required: true}
})


const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema)

module.exports = FriendRequest