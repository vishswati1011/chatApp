const express = require('express')
const router = express.Router()
const Message = require("../../models/messages")

router.post('/', async (req, res) => {
    try {
        const {sender,content,msgTime,msgDate,type,users} =req.body;
       
           let message = new Message({
                content,
                type,
                msgTime,
                msgDate,
                sender,
                users:users,
                status:"unseen"
            })
            const msgAdd = await message.save().then(()=>{
                res.json({message:"message added",success:true});

            }).catch((error)=>{
                console.log(error,"--------error")
                res.json({message:"failed to add message to the database",success:false})

            })
         
    } catch (err) {
        console.log("error", err)
    }
})
module.exports= router;