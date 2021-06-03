const express = require('express')
const { checkAuth } = require('../middlewares/authentication')
const FriendRequest = require('../models/friendRequest')
const router = express.Router()



router.post("/friendRequest", checkAuth, async(req,res) => {
    try {
        const userApplicantId = req.userData._id
        const userDestinationId = req.body.userDestinationId
        const toCreate = {
            userApplicantId: userApplicantId,
            userDestinationId: userDestinationId,
            time: Date.now()
        }


        const createFriendRequest = await FriendRequest.create(toCreate)
        if (createFriendRequest) {
            return res.json({
                status: "Success",
                message: "Friend Request sended"
            })
        }


    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
})


router.get('/friendRequests', checkAuth, async(req,res) => {
    try {
        const userId = req.userData._id
        const findUsers = await FriendRequest.find({userDestinationId: userId}).populate('userApplicantId')
        if (findUsers) {
            return res.json({
                status: "success",
                data: findUsers
            })
        }

        
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        })
    }
})

//DELETE request - delete friend request
router.delete('/friendrequest', checkAuth, async(req,res) => {
    try {
        const requestId = req.query.requestId
        const deleteRequest = await FriendRequest.findOneAndDelete({_id: requestId})
        if (deleteRequest) {
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