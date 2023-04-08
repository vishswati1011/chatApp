const express = require('express')
const router = express.Router()
const User = require('../../models/chatuser')
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectId;
// const sendMail = require('../config/sendMail');
const key = require('../../config/Key');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res) => {
    try{
		const {email,password}=req.body;
		console.log("user",req.body)
		const user = await User.findOne({email})
		if(!user){
			res.json({
				success:false,
				message:"Invalid Email"
			})
		}
		if(user)
		{
			console.log("pass",user)
			if((await bcryptjs.compare(password, user.pwd)))
			{
				const {_id,fName,lName,phone}=user;
				const payload = {
					_id,
					email,
					fName,
					lName,
					phone
				}
				jwt.sign(
					payload,
					key.secretKey,
					{
						expiresIn:14400
					},
					(err,token) => {
						res.json({
							payload,
							success:true,
							token:"Bearer " +token,
							message:"Login successfully complete"
						})
					}
				)
			}else{
				res.json({
					success:false,
					message:"Invalid password"
				})
			}
		}
	}catch(err){
		console.log("error",err)
		res.json({
			success:false,
			message:"Invalid email and password"
		})
	}
})


module.exports = router