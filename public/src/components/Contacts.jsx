import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Logo from "../assets/logo.png";
export const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            {/* <h3>Text Me</h3> */}
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div
                    className={`avatar ${
                      index === currentSelected ? "circle" : ""
                    }`}
                  >
                    <img
                      key={contact}
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className={`avatar`}>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  /* border: 1px solid red; */
  overflow: hidden;
  background-color: #d798f7;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 3rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    /* background-color: red; */
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 3rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: 0.5s ease-in-out;
      .avatar {
        transition: 0.5s ease-in-out;
        img {
          height: 2.5rem;
        }
      }
      .circle {
        height: 3rem;
        padding:2px;
        border-radius: 50%;
        border: 2px solid #821db5;
      }
      .username {
        h3 {
          color: #821db5;
        }
      }
    }
    .selected {
     

      background-color: #c580e7;
    }
  }
  .current-user {
    background-color: #ffffff39;
    display: flex;
    align-items: center;
    justify-content: stretch;
    /* gap: 1rem; */
    .avatar {
      padding:1rem;
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: #821db5;
      }
    }
    @media screen and(min-width:720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
