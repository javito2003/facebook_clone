const express = require("express")
const router = express.Router()
const {checkAuth} = require('../middlewares/authentication')
const User = require("../models/user")

//GET request - get users
router.get('/users',checkAuth, async(req,res) => {
    try {
        const findUsers = await User.find().populate('friendsId')

        return res.json({
            status: "success",
            data: findUsers
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

//GET request - get user
router.get("/user", checkAuth, async(req,res) => {
    try {
        const userId = req.query.userId

        const user = await User.findOne({_id: userId}).populate('postsId friendsId')
        if (user) {
            return res.json({
                status: "success",
                data: user
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        })
    }
})

module.exports = router