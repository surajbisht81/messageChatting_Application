import React, { useState } from 'react';
import "./Chat.css";
import {Avatar, IconButton} from '@material-ui/core';
import { AttachFile, Search, MoreVert } from '@material-ui/icons';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import axios from "./axios";

function Chat({messages}) {

    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            "message": input,
            "name": "suraj",
            "timestamp": new Date(),
            "received": "false"
        });

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                 <Avatar />
                 <div className="chat__header__info">
                    <h2>Room Name</h2>
                    <p>Last seen at -----</p>
                 </div>
                 <div className="chat__header__right">
                    <IconButton >
                        <Search />
                    </IconButton>
                    <IconButton >
                        <AttachFile />
                    </IconButton>
                    <IconButton >
                        <MoreVert />
                    </IconButton> 
                 </div>
            </div>

            <div className="chat__body">

                { messages.map( (message) => {
                    return(
                        <p className={`chat__message ${!message.received && "chat__receiver"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp"> {message.timestamp} </span>
                        </p>
                    ) 
                }) }

            </div>
            
            <div className="chat__footer">
               <SentimentSatisfiedIcon />
               <form>
                  <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                  <button onClick={sendMessage} type="submit"> send a message </button>
               </form>
            </div>
        </div>
    )
}

export default Chat
