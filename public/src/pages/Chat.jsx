import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import { Contacts } from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setLoaded] = useState(false);
  // const [con, setCon] = useState(false);
  useEffect(() => {
    async function runs() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setLoaded(true);
      }
    }
    runs();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function runs2() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    runs2();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          className="con"
          contacts={contacts}
          // con={con}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome className="Welcome" currentUser={currentUser} />
        ) : (
          <ChatContainer
            className="ChatContainer"
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}

export default Chat;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #d2c4d9;
  .container {
    height: 85vh;
    width: 85vw;
    border-radius: 0.5rem;
    background-color: #bfa8ca;
    display: grid;
    grid-template-columns: 25% 75%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 40px 0px;

    /* border: 1px solid red; */
    @media screen and(min-width:720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    /* @media screen and(min-width:360px) and (max-width: 480px) {
      grid-template-columns: 25% 75%;
    } */
    @media (max-width: 480px) {
      grid-template-columns: 20% 78%;
      font-size: 1rem;
    }
  }
`;
