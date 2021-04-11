import React, { useEffect, useState } from 'react'
import "./Sidebar.css";
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import axios from './axios';

function Sidebar() {

    const [collection, setCollection] = useState([]);

    useEffect(() => {
        
        axios.get("/collections")
             .then( res => {
                  console.log(res.data);
                  setCollection(res.data);
             })
             .then(err => console.log(err));
    }, [])

    return (
        <div className="sidebar">

            {/* header part */}
            <div className="sidebar__header">
                <Avatar src="http://www.mandysam.com/img/random.jpg"/>
                <div className="sidebar__headerRight">
                    <IconButton >
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton >
                        <ChatIcon />
                    </IconButton>
                    <IconButton >
                        <MoreVertIcon />
                    </IconButton> 
                </div>
            </div>

            {/* search part*/}
            <div className="sidebar__search"> 
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input placeholder="search or start new chat" type="text"/>
                </div>
            </div>

            {/* sidebar_chat */}
            <div className="sidebar__chat">
                <SidebarChat adddNewChat={true} />
                { collection.map( coll => {
                    return <SidebarChat name={coll.name}/>
                })}
            </div>
        </div>
    )
}

export default Sidebar
