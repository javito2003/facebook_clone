const User = require("../models/user");


async function offlineUser(userId){
    const setOffline = await User.findOneAndUpdate({_id: userId}, {$set:{active: false}}, {runValidators: true, new: true})
    if (setOffline) {
        return 'success'
    }
    return 'error'
}

async function onlineUser(userId){
    const setOnlineUser = await User.findOneAndUpdate({_id: userId}, {$set: {active: true}}, {runValidators: true, new: true})
    if (setOnlineUser) {
        return 'success'
    }
    return 'error'
}

module.exports = {offlineUser, onlineUser}