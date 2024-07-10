const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    otp:{type:Number},
    phone:{
        type:Number,
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} must be an integer',
        },},
    password:{type:String},
    friendList:[
       { 
        userId : {
         type: mongoose.Schema.Types.ObjectId,
         ref: "users"
        },
        chatroomId:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "chatroom"
        }
        }
    ],
    userStatus:{type:Boolean,default:false},
    userColor:{type:String,default:null}
})


module.exports =mongoose.model("users",UserSchema);