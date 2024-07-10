const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectId;
// const sendMail = require('../config/sendMail');
const key = require('../../config/Key');
const bcryptjs = require('bcryptjs');
const generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
    
};
router.post('/', async (req, res) => {
    try {

        const {email}=req.body;
        const checkUser =await User.findOne({email:email})
		
        if(!checkUser)
        {
		const otp = generateOTP();
            const user = new User({
                email,
				otp, 
            })
            const savedUser = await user.save()
            res.status(400).json({
                success: false,
                message: 'A verifcation code is set to your mail',
            });	
					
        }else if(checkUser.userStatus===false){
		const otp = generateOTP();
		console.log(otp)
            // sendMail(savedUser.email,otp,'account-verification');
            User.updateOne({_id: ObjectId(checkUser._id)},{otp}).then((userupdate)=>{
                res.status(400).json({
                    success: false,
                    message: 'A verifcation code is set to your mail',
                });
            }) 
        }else{
            res.status(400).json({
                success: false,
                message: 'User Already exists',
            });
        }
    }catch(err)
    {
		console.log("error------------",err)
		res.status(400).json({
			success: false,
			message: 'Error in email verification',
		});
    }

})


module.exports = router