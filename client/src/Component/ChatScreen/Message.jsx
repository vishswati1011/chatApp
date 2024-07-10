import React, { useState, useEffect, useRef } from "react";
import { API_URL, SOCKET_URL } from "../Services/url";
import "../Chatroom/Chatroom.css";
import io from "socket.io-client";
import axios from "axios";
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
export default function Chat({ friendId }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState("");
  const userId = localStorage.getItem("chatAppuserid");

  const scrollRef = useRef();
  var socket = io(SOCKET_URL);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    if (localStorage.getItem("chatAppuserid")) {
      socket.emit("add-user", localStorage.getItem("chatAppuserid"));
    }
  }, []);
  const handleNewUserMessage = async () => {
    let date = moment(new Date()).format();
    let msgTime = moment(new Date()).format("h:mm:ss a");
    let msgDate = date.toString().slice(0, 10);
    let payload = {
      content: message,
      type: "text",
      msgTime,
      msgDate,
      sender: userId,
      users: [userId, friendId],
    };
    await axios.post(`${API_URL}chatroom/addMsg`, payload);

    // socket.emit("send-msg", (payload))

    socket.emit("send-msg", {
      from: userId,
      to: friendId,
      message: payload,
    });
    const msgs = [...messageList];
    msgs.push(payload);
    setMessageList(msgs);
    console.log("msgs", msgs, message);
    setMessage("");
  };
  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        console.log("receive msg", msg);
        setArrivalMessage(msg);
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessageList((prev) => [...prev, arrivalMessage]);
    console.log("arrivalMessage");
  }, [arrivalMessage]);

  useEffect(() => {
    window.HTMLElement.prototype.scrollIntoView = messageList;
  }, [messageList]);

  useEffect(() => {
    getData();
  }, [friendId]);
  const getData = async () => {
    let data = {
      from: userId,
      to: friendId,
    };
    const response = await axios.post(`${API_URL}chatroom/getMessage`, data);
    console.log("response", response.data.result);
    if (response.data.success) {
      setMessageList(response.data.result);
    }
  };
  const onEnter = (e) => {
    console.log(e.keyCode, "keycode");
    if (e.keyCode === 13) {
      handleNewUserMessage();
    }
  };
  return (
    <div className="main-chat-div">
      <div id="chat-frame">
          <div className="contact-profile">
            <p>Chat</p>
        </div>
        <div className="chat-messages">
          <div>
            <div id="msg_history">
              {messageList &&
                messageList.map((item, id) => {
                  if (item.sender === userId) {
                    //user
                    return (
                      <li className="replies" key={id}>
                        {console.log(item, "item")}
                        <div
                          style={{ fontWeight: "bold", letterSpacing: "0.8px" }}
                        >
                          {item.name}
                        </div>
                        <br />
                        <p>{item.content}</p>
                      </li>
                    );
                  } else if (item.name === "server") {
                    //sender means friend msg show here
                    return (
                      <div align="center" className="text-muted" key={id}>
                        {item.content}
                      </div>
                    );
                  } else {
                    return (
                      <li className="sent">
                      
                            {/* <div>{item.username}</div> */}
                            <p>{item.content}</p>
                       </li>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="chat-message-input" style={{ marginTop: "20px" }}>
   
          <input
            type="text"
            id="msg"
            onChange={handleChange}
            value={message}
            onKeyDown={onEnter}
            placeholder="Write your message..."
          />
          <button
            className="send-button"
            type="button"
            // disabled={this.state.message.length === 0}
            onClick={handleNewUserMessage}
          >
			<SendIcon/>
          </button> 
       
      </div>
    </div>
  );
}
