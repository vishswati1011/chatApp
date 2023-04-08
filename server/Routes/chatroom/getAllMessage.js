const express = require('express')
const router = express.Router()
const Chatroom = require("../../models/Chatroom")
const ObjectId = require('mongodb').ObjectId;


router.get('/:chatroomId', async (req, res) => {
    let chatroomId = req.params.chatroomId
    try {
        const chatMessages = await Chatroom.find({_id:ObjectId(chatroomId)})
            if(chatMessages){
                res.json({chatMessages:chatMessages[0].messages,success:true});
            }else{
                res.json({message:"failed to add message to the database",success:false})
            }
       
      
    } catch (err) {
        console.log("error", err)
    }
})
module.exports= router;