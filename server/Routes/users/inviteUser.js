var User = require('../../models/User')
const express = require('express')
const router = express.Router()
var Chatroom = require('../../models/Chatroom')
const ObjectId = require('mongodb').ObjectId;
const { 
    randomHexColorEndWith,
} = require('random-hex-color-generator')

const updateUserAndchatRoom = (friendId,userId,groupName,callback) =>{
    var data = {
        users:[String(friendId),userId],
        isGroup:false,
        name:groupName
    }
    Chatroom.insertMany(data,(err, chatroom) => {
        if (err) {
            callback({status:false,message:"error in update"})     
        }else{
            User.updateOne({_id: ObjectId(userId)},{$push:{"friendList":{
                userId:friendId,
                chatroomId:chatroom[0]._id
            }}}).then((friendAdd)=>{
                if(friendAdd){
                    User.updateOne({_id: friendId},{$push:{"friendList":{
                        userId:userId,
                        chatroomId:chatroom[0]._id
                    }}})
                    .then((updated)=>{
                        if(updated){
                    
                    callback({status:true,chatroomId:chatroom[0]._id})
                    }
                })
                        
                }
            }).catch((error)=>{
                callback({status:false,message:"error in update"})     
            })
        }
    })
}  
router.post('/:userId', async (req, res) => {

    const {email,name} = req.body;
    const userId = req.params.userId;
    const user = await User.findOne({email})
    let friendId=""
		if(user){
                //if user exist in db then create room with user 
                friendId=user._id   
                updateUserAndchatRoom(friendId,userId,name,async function(response){
                    res.json({success:true,message:'Invite user'});  
                })  
		}else{
            let userColor= randomHexColorEndWith('00')  
            const user ={
                email:email,
                userStatus:false,
                userColor:userColor,
                username:email
            }

           User.insertMany(user,async(err, usersaved) => {
            if (!err) {
                friendId=usersaved[0]._id  
                updateUserAndchatRoom(friendId,userId,async function(response){
                    let friendList={
                        userid:userId,
                        chatroomId:response.chatroomId
                    }
                    User.updateOne({_id: ObjectId(friendId)},{$push:{"friendList":friendList}}).then((friendAdd)=>{
                        res.json({success:true,message:'Invite user'});  
                  
                    })
                    .catch((error)=>{
                        res.json({success:false,error:'Error in add new user'});
                    })
                     }) 
            } else {
              res.json({success:false,error:'Error in add new user'});
            }
           })
        }
       
          
        

})
module.exports= router;