const Notification = require("../models/notification")

async function createNotif(userId, description, type){
    const toCreate = {
        userId: userId,
        description: description,
        type: type,
        time: Date.now()
    }

    const newNotif = await Notification.create(toCreate)
    if (newNotif) {
        return newNotif._id
    }else{
        return false
    }
}

module.exports = {createNotif}