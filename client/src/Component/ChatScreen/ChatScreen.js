import React, { useState } from "react";
import Users from './Users';
import Chatroom from './Message'

const ChatScrenn = () => {

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
        <>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                    <Users handleFriendId={handleFriendId} />
                    </div>

                 <div class="col-sm">
                 {show? <Chatroom handleClose={handleClose}
                      friendId={friend} />:null}
                    </div>

                </div>
            </div>
        </>
    )
}
export default ChatScrenn;


