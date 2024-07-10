const express = require('express')
const router = express.Router()
const Message = require("../../models/messages")


router.post('/', async (req, res) => {
    try{
        const {from, to} =req.body;
        const message= await Message.find({ users: { $all: [ from,to ] } })
        .sort({updatedAt:1});
        res.json({
            success:true,
            result:message,
            message:"All message here"})
    }catch(err)
    {
        console.log("error", err)

    }
})
module.exports= router;