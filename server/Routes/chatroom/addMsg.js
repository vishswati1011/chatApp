const express = require('express')
const router = express.Router()
const Chatroom = require("../../models/Chatroom")
const ObjectId = require('mongodb').ObjectId;

router.post('/:chatroomId', async (req, res) => {
    let chatroomId = req.params.chatroomId;
    try {
        const {sender,content,msgTime,msgDate,type,users} =req.body;
       
           let message ={
                content,
                type,
                msgTime,
                msgDate,
                sender,
                users:users,
                status:unseen
            }

            Chatroom.updateOne({_id:ObjectId(chatroomId)},{$push:{"messages":message}}).then((friendAdd)=>{
                console.log("friendAdd",friendAdd)
                if(friendAdd){
                    res.json({message:"message added",success:true});
                }else{
                    res.json({message:"failed to add message to the database",success:false})
                }
            }).catch((error)=>{
                console.log(error,"--------error")
                res.json({message:"failed to add message to the database",success:false})

            })
    } catch (err) {
        console.log("error", err)
    }
})
module.exports= router;