const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()


router.post("/register", async(req,res) => {
    try {
        const {name, lastName, email, password, gender} = req.body
        console.log(gender);
        let imageProfile;
        if(gender === 'Male'){
            imageProfile = 'https://st.depositphotos.com/2218212/2938/i/600/depositphotos_29387653-stock-photo-facebook-profile.jpg'
        }else if(gender === "Female"){
            imageProfile = 'https://i.pinimg.com/originals/f3/61/e3/f361e30b86fee7661463bf331de5b1b1.jpg'
        }else if(gender === 'Alien') {
            imageProfile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC0HWc04bm1X1AbM-ResWoSmalOnVz476VdZeptDpO0H9hn0eQCbX3h7hK53YMHHIF0Qc&usqp=CAU'
        }

        const toCreate = {
            name: name,
            lastName: lastName,
            email: email,
            gender: gender,
            password: bcrypt.hashSync(password, 10),
            profilePhoto: imageProfile
        }

        const createUser = await User.create(toCreate)
        if(createUser){
            return res.json({
                status: "success",
                message: "You are register!"
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
})


router.post('/login', async(req,res) => {
    try {
        const {email, password} = req.body
        const findUser = await User.findOne({email: email})
        if(!findUser){
            return res.status(500).json({
                status: "error",
                message: 'Email or password invalid'
            })
        }

        if (!bcrypt.compareSync(password, findUser.password)) {
            return res.status(500).json({
                status: "error",
                message: 'Email or password invalid'
            })
        }

        const token = jwt.sign({userData: findUser}, 'SECRETTOKENHERE', {
            expiresIn: 60 * 60 * 24 * 7
        })

        const toReturn = {
            userData: findUser,
            token: token
        }

        return res.json({
            status: "success",
            data: toReturn
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
})

module.exports = router