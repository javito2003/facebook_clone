const express = require('express')
const router = express.Router()

const algoliaSearch = require('algoliasearch')
const { checkAuth } = require('../middlewares/authentication')

const client = algoliaSearch(
    '4ACK75ESJB',
    'd747c2a97732b0dacd0cb9a1953e5d38'
)


const index = client.initIndex('facebookclone')

router.post("/search",checkAuth, async(req,res) => {
    try {

        console.log(req.query);
        let result = await index.search(req.query.name)
        return res.json(result.hits)
    } catch (error) {
        res.json(error.messsage)
    }
})

module.exports = router