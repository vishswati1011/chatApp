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

//not in use
// router.get('/all/:userId', async (req, res) => {
//     let userId = req.params.userId
//     try {
//         const users = await Chatroom.find({ users: { $elemMatch: { $eq: userId } } })
//         if(users){
//             res.json({data :users,success:true});
//         }else{
//             res.json({message:"failed to fetch chat users.",success:false})
//         }
//     } catch (err) {
//         console.log("error", err)
//     }
// })
module.exports= router;