
import React, { useState, useEffect, useRef } from 'react';
import { API_URL, SOCKET_URL } from '../Services/url';
import './Chatroom.css'
import io from "socket.io-client";
import axios from 'axios';
import { useParams } from 'react-router';
import moment from 'moment'

export default function Chat() {


	const { friendId } = useParams();
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState("");
    const userId = localStorage.getItem("chatAppuserid")

	const scrollRef = useRef();
	var socket = io(SOCKET_URL);

	const handleChange = (event) => {
		setMessage(event.target.value)
	};
	useEffect(() => {
		if (localStorage.getItem("chatAppuserid")) {
			socket.emit("add-user", localStorage.getItem("chatAppuserid"))
		}
	}, [])
	const handleNewUserMessage = async () => {
      let date = moment(new Date()).format();
      let msgTime = moment(new Date()).format("h:mm:ss a");
      let msgDate = date.toString().slice(0, 10);
        let payload = {
           content:message,
           type:"text",
           msgTime,
           msgDate,
           sender:userId
          }
		await axios.post(`${API_URL}chatroom/addMessage/${friendId}`,payload)

		socket.emit("send-msg", (payload))

		const msgs = [...messageList];
		msgs.push(payload);
		setMessageList(msgs);
		console.log("msgs", msgs, message)
		setMessage("");

	};
	useEffect(() => {
		if (socket) {
			socket.on("msg-recieve", (msg) => {
				console.log("receive msg", msg)
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, [socket])

	useEffect(() => {
		arrivalMessage && setMessageList((prev) => [...prev, arrivalMessage]);
		console.log("arrivalMessage")

	}, [arrivalMessage])

	useEffect(()=>{
		window.HTMLElement.prototype.scrollIntoView =messageList;

	},[messageList])

	useEffect(() => {
		getData();
	}, [friendId]);
	const getData = async () => {
		let data ={
			form:userId,
			to:friendId
		}
		const response = await axios.post(`${API_URL}chatroom/getMessage`,data)
		console.log("response", response)
        if(response.data.success){
            setMessageList(response.data.chatMessages)
        }
	};
	console.log("messageList", messageList)

	console.log("friendId", friendId);
	return (
		<div className='col-lg-12'>


			<div className="main-chat-div col-lg-9">
				<div id="chat-frame">
					<div className="chat-content">
						<div className="contact-profile">
							<p>Chat</p>
						</div>
					</div>
					<div className='chat-messages'>
						<div>
							<div
								id='msg_history'>
								{messageList && messageList.map((item, id) => {
									if (item.sender===userId) {
                                        //user 
										return (
											<li
												className="replies"
												key={id}>
												<div
													style={{ fontWeight: 'bold', letterSpacing: '0.8px' }}>
													{item.name}
												</div>
												<br />
												<p>{item.content}</p>
											</li>
										);
									} else if (item.name==="server") {
                                        //sender means friend msaage show here
										return (
											<div align='center' className='text-muted' key={id}>
												{item.content}
											</div>
										);
									} else {
										return (
											<li className='incoming_msg sent'>
												<div className=''>
													<div className=''>
														<div>{item.name}</div>

														<p>{item.message}</p>
													</div>
												</div>
											</li>
										);
									}
								})}
							</div>
						</div>
					</div>

				</div>
				<div className='chat-message-input'
					style={{ marginTop: '20px' }}>
					<div class="wrap">
						<input type="text"
							id='msg'
							onChange={handleChange}
							value={message}
							placeholder="Write your message..." />
						<button
							className="send-button"
							type='button'
							// disabled={this.state.message.length === 0}
							onClick={handleNewUserMessage}>
							{/* <i className="fa fa-paper-plane" aria-hidden="true"></i> */}
							send
						</button>
					</div>
				</div>
			</div>
		</div>
	)

}