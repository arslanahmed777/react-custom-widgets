import React, { useState, useEffect } from "react";
import io from "socket.io-client"

let socket
const HomePage = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const ENDPOINT = "http://192.168.104.156:5000";
  useEffect(() => {
    socket = io(ENDPOINT)
    // socket.emit("join", { name: "fawad" }, (callback) => {
    //   console.log("callback", callback);
    //   setChats((prevstate) => { return [...prevstate, callback] })
    // })
    console.log(socket);
  }, [ENDPOINT])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])


  // function for sending messages
  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(""))
    }
  }


  return (
    <div>
      <h1>this is home page for testing</h1>
      <div>
        <ul>
          {messages.map((chat) => {
            return (
              <li>{chat}</li>
            )
          })}
        </ul>

      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
    </div>
  );
};

export default HomePage;
