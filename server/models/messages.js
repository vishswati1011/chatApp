const mongoose = require("mongoose");
const message=new mongoose.Schema(
    {   
        content:"",
        type:"",
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        msgTime:"",
        msgDate:"",
        status:"",   //seen or unseen
        users: []   // array id 2 users id in string if one to one or array of multiple user id if group chat
    })

    
module.exports =mongoose.model("message",message);
