import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome({ currentUser }) {
  //   console.log(currentUser);
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome,<span>{currentUser?.username}</span>
      </h1>
      <h3>Please select a chat to start Messaging</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
  img {
    height: 20rem;
  }

  span {
    color: #4e00ff;
  }
  @media (max-width: 480px) {
    /* flex-direction: column; */
    margin-left: 5rem;

    font-size: 0.6rem;
  }
`;
