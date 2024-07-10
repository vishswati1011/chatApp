import React, { useState } from "react";
import Friend from './Friend';
import Chatroom from './Message'
import './Chatscreen.css'
const ChatScreen = () => {

    const [friend,setFriend]=useState("")
    const [show,setShow]= useState(false);
    const handleFriendId = (id) =>{
        setFriend(id);
        setShow(true)
    }

    const handleClose = () =>{
        setShow(!show);
    }

    return (

    
                <div class="chatscreen">
                    <div class="user_list">
                    <Friend handleFriendId={handleFriendId} />
                    </div>

                 <div class="chat_box">
                 {show? <Chatroom handleClose={handleClose}
                      friendId={friend} />:null}
                    </div>

                </div>
           
    )
}
export default ChatScreen;


