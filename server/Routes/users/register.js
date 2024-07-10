const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const jwt = require("jsonwebtoken");
const ObjectId = require('mongodb').ObjectId;
const key = require('../../config/Key');
const bcryptjs = require('bcryptjs');

router.post('/', async (req, res) => {
    try {

        const {email,username,password,phone}=req.body;
		
        const checkUser =await User.findOne({email:email})
        if(checkUser)
        {
		
			res.status(400).json({
                success: false,
				message: 'Error in register user',
            });
		}else{	
			const hash = await bcryptjs.hash(password, 12);
			
        	const user = new User({
                email,
                username,
                password:hash,
                phone:Number(phone),
				userStatus:true,
            })
          
			user.save().then((saved)=>{
			const payload = {
					userid:saved._id,
					username,
					phone,
					email
				};
			
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
							token,
							message: 'user registered successfully',
						});
					}
				);
			})
			
			
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