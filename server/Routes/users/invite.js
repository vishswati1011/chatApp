var User = require('../../models/chatuser')
const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const { 
    randomHexColorEndWith,
} = require('random-hex-color-generator')

const generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
    
};
router.post('/:userId', async (req, res) => {

    const {email} = req.body;
    const userId = req.params.userId;
    const user = await User.findOne({email})
    let friendId=""
		if(user){
                //if user exist in db then create room with user 
                friendId=user._id  
                User.updateOne({_id: ObjectId(userId)},{$push:{"friendList":{userId:friendId}}}).then((friendAdd)=>{
                    User.updateOne({_id: ObjectId(friendId)},{$push:{"friendList":{userId:userId}}}).then((friendAdd)=>{
                    res.json({success:true,message:'Invite user 1111111111'});  
                })  
            })  
		}else{
            let userColor= randomHexColorEndWith('00')  
            console.log(userId,"userId")
            const otp = generateOTP();
            const user ={
                email:email,
                userStatus:false,
                userColor:userColor,
                fName:email,
                friendList:[{userId}],
                otp
            }

           User.insertMany(user,async(err, usersaved) => {
            if (!err) {
                console.log("usersaved",usersaved[0])
                friendId=usersaved[0]._id  

                    let friendList={
                        userId:friendId
                    }
                    User.updateOne({_id: ObjectId(userId)},{$push:{"friendList":friendList}}).then((friendAdd)=>{
                        res.json({success:true,message:'Invite user 2222222'});  
                     
                    })
                    .catch((error)=>{
                        console.log("error---------",error)
                        res.json({success:false,error:'Error in add new user'});
                    })
            } else {
                console.log("error----*****-----",err)

              res.json({success:false,error:'Error in add new user'});
            }
           })
        }
       
          
        

})
module.exports= router;