import React, { useState, useEffect, useRef } from "react";
import { API_URL, SOCKET_URL } from "../Services/url";
import "../Chatroom/Chatroom.css";
import io from "socket.io-client";
import axios from "axios";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";

export default function Chat({ friendId }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState("");
  const userId = localStorage.getItem("chatAppuserid");

  const socket = useRef(); // Reference for socket

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    if (localStorage.getItem("chatAppuserid")) {
      socket.current.emit("add-user", localStorage.getItem("chatAppuserid"));
    }
    return () => {
      socket.current.disconnect();
    };
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

    socket.current.emit("send-msg", {
      from: userId,
      to: friendId,
      message: payload,
    });
    setMessageList((prev) => [...prev, payload]);
    setMessage("");
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage(msg);
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessageList((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    getData();
  }, [friendId]);
  const getData = async () => {
    let data = {
      from: userId,
      to: friendId,
    };
    const response = await axios.post(`${API_URL}chatroom/getMessage`, data);
    if (response.data.success) {
      setMessageList(response.data.result);
    }
  };

  const onEnter = (e) => {
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
          <div id="msg_history">
            {messageList &&
              messageList.map((item, id) => {
                const isFirstMessage = id === messageList.length - 2;
                if (item.sender === userId) {
                  // User message
                  return (
                    <li className="replies" key={id}>
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
                  // Server message
                  return (
                    <div align="center" className="text-muted" key={id}>
                      {item.content}
                    </div>
                  );
                } else {
                  // Friend's message
                  return (
                    <li className="sent" key={id}>
                      <p>{item.content}</p>
                    </li>
                  );
                }
              })}
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
          onClick={handleNewUserMessage}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
