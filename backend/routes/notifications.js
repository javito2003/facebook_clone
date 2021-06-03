const express = require("express")
const router = express.Router()
const {checkAuth} = require('../middlewares/authentication')
const Notification = require("../models/notification")


//GET REQUEST - get notif
router.get("/notifications", checkAuth, async(req,res) => {
    try {
        const userId = req.userData._id
        const findNotifications = await Notification.find({userId: userId})
        if (findNotifications) {
            return res.json({
                status: "success",
                data: findNotifications
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
})

router.put('/readnotification', checkAuth, async(req,res) => {
    try {
        const notifId = req.query.notifId
        console.log(notifId);
        const readNotif = await Notification.findOneAndUpdate({_id: notifId}, {readed: true}, {runValidators: true, new: true})
        if (readNotif) {
            return res.json({
                status: "success"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
})


module.exports = router