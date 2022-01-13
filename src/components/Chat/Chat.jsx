import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { GrSend } from "react-icons/gr";
import io from "socket.io-client";
import { getTodayDate } from "../../utils/functions";
import { HOSTNAME } from "../../utils/Constants";

let socket;
const Chat = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const ENDPOINT = HOSTNAME;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setChats([...chats, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [chats]);

  const handleSubmit = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  const handleEnter = (e) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 frame">
          <ul>
            {chats.map((chat, i) => {
              return (
                <li key={i} style={{ width: "100%" }}>
                  <div className="msj macro">
                    <div className="avatar">
                      <img
                        alt="avatar"
                        className="img-circle"
                        style={{ width: "100%" }}
                        src="https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48"
                      />
                    </div>
                    <div className="text text-l">
                      <p>{chat}</p>
                      <p>
                        <small>{getTodayDate()}</small>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* <li style={{ width: '100%' }}>
                            <div className="msj-rta macro">
                                <div className="avatar">
                                    <img className="img-circle" style={{ width: '100%' }} src="https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48" />
                                </div>
                                <div className="text text-r">
                                    <p>Hello Tom...</p>
                                    <p><small>2:33 AM</small></p>
                                </div>
                            </div>
                        </li> */}
          </ul>

          <div>
            <div className="msj-rta macro">
              <div
                className="text text-r"
                style={{ background: "whitesmoke !important" }}
              >
                <input
                  value={message}
                  onKeyPress={handleEnter}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mytext"
                  placeholder="Type a message"
                />
              </div>
            </div>
            <div style={{ padding: 10 }}>
              <button onClick={handleSubmit}>
                {" "}
                <GrSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
