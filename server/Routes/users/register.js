const express = require('express')
const router = express.Router()
const User = require("../../models/chatuser")
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectId;
// const sendMail = require('../config/sendMail');
const key = require('../../config/Key');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res) => {
    try {

        const {email,fName,lName,pwd,phone,otp}=req.body;
        console.log(req.body);
        const checkUser =await User.findOne({email:email})
        console.log("checkUser",checkUser);
        const hash = await bcryptjs.hash(pwd, 12);
        if(checkUser)
        {
			if(otp===checkUser.otp){
            console.log("hash",hash);
            const user ={
                email,
                fName,
                lName,
                pwd:hash,
                phone,
				userStatus:true,
            }
          
			User.updateOne({_id: ObjectId(checkUser._id)},{$set:user}).then((friendAdd)=>{
				console.log("friendAdd",friendAdd)
			const payload = {
					userid:checkUser._id,
					fName,
					lName,
					phone,
					email
				};
				// const helper = async () => {
				// 	savedUser.otp = '';
				// 	await savedUser.save();
				// };
				// setTimeout(() => {
				// 	helper();
				// }, 900000);
				jwt.sign(
					payload,
					key.secretKey,
					{
						expiresIn: 14400,
					},
					(err, token) => {
						res.status(200).json({
							result:payload,
							success: true,
							message: 'user registered successfully',
						});
					}
				);
			})
			
			}else{
				res.status(400).json({
					success: false,
					message: 'Invalid Otp',
				});
			}	
        }else{
            res.status(400).json({
                success: false,
				message: 'Error in register user',
            });
        }
    }catch(err)
    {
		console.log("error------------",err)
		res.status(400).json({
			success: false,
			message: 'Error in register user',
		});
    }

})


module.exports = router