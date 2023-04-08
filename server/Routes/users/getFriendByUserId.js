const express = require('express')
const router = express.Router()
const User = require("../../models/chatuser")
const ObjectId = require('mongodb').ObjectId;


router.get('/:userId', async (req, res) => {
    try {
        let userId= req.params.userId;
        await User.find({_id:ObjectId(userId)},{email:1,fName:1},{userStatus:{$ne:false}})
        .populate("friendList.userId",["fName","email","userStatus"])
        // .populate("friendList.chatroomId",["_id"])
        .then((findUsers)=>{
            console.log("friendList",findUsers[0])

            if(findUsers){
                res.json({success:true,users:findUsers[0].friendList})
            }else{
            res.json({success:false,message:"no friend exists"})
            }
        }).catch((error)=>{
           
        })
       
    }catch(error){
        res.json({success:false,message:"error in get users"})
    }
    })
module.exports= router;    