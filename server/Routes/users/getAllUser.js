const express = require('express')
const router = express.Router()
const User = require("../../models/User")

router.get('/:userId', async (req, res) => {

    try {
        const allUser = await User.find({_id:{$ne:req.params.userId}},{username:1,email:1,userStatus:1})
            if(allUser){
                res.json({data:allUser,success:true});
            }else{
                res.json({message:"failed to fetch users.",success:false})
            }
       
      
    } catch (err) {
        res.json({message:"failed to fetch users.",success:false,error:err})

    }
})
module.exports= router;