import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "../pages/ChatInput";
import { addMessage, getAllMessage } from "../utils/ApiRoutes";
import Logout from "./Logout";
import Messages from "./Messages";
import { v4 as uuidv4 } from "uuid";
export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArivalMessage] = useState(null);
  useEffect(() => {
    async function run() {
      if (currentChat) {
        const response = await axios.post(getAllMessage, {
          from: currentUser?._id,
          to: currentChat?._id,
        });
        // console.log(response);
        setMessages(response.data);
      }
    }
    run();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const { data } = await axios.post(addMessage, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    // console.log(data);
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          // console.log(message);
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sender" : "received"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 2rem;
    /* margin-bottom: 1rem; */
    border-bottom: 2px solid #4f04ff21;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        height: 3.5rem;
        padding: 2px;
        border-radius: 50%;
        border: 2px solid #821db5;
        /* padding-bottom:2rem; */
        img {
          height: 3rem;
        }
      }
      /* .circle {
        height: 3rem;
      } */
      .username {
        h3 {
          color: black;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
