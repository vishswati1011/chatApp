const mongoose = require("mongoose");
const chatRoomSchema=new mongoose.Schema(
    {

        messages: [
            {
                content:"",
                type:"",
                sender: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                msgTime:"",
                msgDate:""
            }
        ],
        users: []   // array id 2 users id in string if one to one or array of multiple user id if group chat
    })

    
module.exports =mongoose.model("chatroom",chatRoomSchema);
