import React, { useEffect, useState } from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Pusher from "pusher-js";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import axios from "./axios";

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(async () => {
    await axios.get("/messages/sync")
           .then( (res) => {
               setMessages(res.data);
           })
           .catch(err => console.log(err));
  }, [])

  useEffect(() => {
      const pusher = new Pusher('c9fa659fc6b359a23989', {
        cluster: 'eu'
      });

      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessage) => {
          setMessages([...messages, newMessage]);
      });

      return () =>{
        channel.unbind_all();
        channel.unsubscribe();
      }

  }, [messages]);

  return (
    <div className="app">
      <div className="app_body">
          <Sidebar />
          <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
