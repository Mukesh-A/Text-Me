import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function Chat() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    const userJson = JSON.parse(user);
    if (!user) {
      navigate("/login");
    }

    if (!userJson.isAvatarImageSet) {
      navigate("/setAvatar");
    }
  }, []);
  return (
    <Container>
      <div className="container"></div>
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
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    /* border: 1px solid red; */
    @media screen and(min-width:720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and(min-width:360px) and (max-width: 480px) {
      grid-template-columns: 25% 75%;
    }
  }
`;
