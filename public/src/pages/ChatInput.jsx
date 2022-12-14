import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handelEmojiPicketHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handelEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
    console.log("chat input", msg);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handelEmojiPicketHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handelEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message "
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 6% 94%;
  align-items: center;
  /* background-color: #080420; */
  padding: 0 1rem;
  padding-bottom: 0.3rem;
  @media (max-width: 480px) {
    grid-template-columns: 15% 85%;
    padding-left: 0.4rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    /* border: 1px solid red; */
    .emoji {
      position: relative;
      /* height:100%; */
      /* right: 0; */
      svg {
        font-size: 1.6rem;
        /* font-size: 1.5rem; */
        /* ffff00c8 */
        color: #821db5;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: none;
        border-color: #140e3c;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      color: black;
      width: 90%;
      /* height: 60%; */
      background-color: transparent;
      border: none;
      padding-left: 1rem;
      font-size: 1.1rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
      @media (max-width: 480px) {
        font-size: 1rem;
      }
    }
    button {
      /* width: 3rem; */
      padding: 0.3rem 1.2rem;
      border-radius: 2rem;
      display: flex;
      background-color: #9a86f3;
      justify-items: center;
      border: none;
      align-items: center;
      cursor: pointer;
      svg {
        font-size: 1.7rem;
        color: black;
        @media (max-width: 480px) {
          font-size: 1.3rem;
        }
      }
      @media (max-width: 480px) {
        padding: 0.3rem 0.4rem;
      }
    }
    @media (max-width: 480px) {
      font-size: 1rem;

      width: 110%;
      gap: 0.1rem;
    }
  }
`;
