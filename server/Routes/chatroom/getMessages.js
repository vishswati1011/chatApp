const express = require('express')
const router = express.Router()
const Message = require("../../models/messages")


router.get('/', async (req, res) => {
    try{
        const {from, to} =req.body;
        console.log(from,"from",to)
        const message= await Message.find({ users: { $all: [ from,to ] } })
        .sort({updatedAt:1});
        console.log("message======",message)
        // const projectMessage =message.map((msg)=>{
        //     return{
        //         fromSelf:msg.sender.toString()===from,
        //         message:msg.message.text,
        //     };

        // })
        res.json({
            status:false,
            result:message,
            message:"All message here"})
    }catch(err)
    {
        console.log("error", err)

    }
})
module.exports= router;