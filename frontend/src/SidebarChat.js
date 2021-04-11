import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarChat.css";
import axios from "./axios";

function SidebarChat(props) {
    
    const createChat = async (e) => {
        const roomname = prompt("Add a new chat name");

        if(roomname){
            await axios.post("/room/new", {
                "room" : roomname
            });
        }
        else{
            throw new Error("error is occured");
        }
    }

    const handleTheRightChat = async () => {
        await axios.post("/changeChat", {
                        "chatName": props.name
                    })
                    .catch(err => console.log("an error is there"));
    }

    return !props.adddNewChat ? (
        <div className="sidebarChat" onClick={handleTheRightChat} >
            <Avatar />
            <div className="sidebarChat__right">
                <h2>{props.name}</h2>
                <p>Last Message</p>
            </div>
        </div>
    ) :
    (
        <div className="sidebarChat" onClick={createChat}>
            <h2> Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
