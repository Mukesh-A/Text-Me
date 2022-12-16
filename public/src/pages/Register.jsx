import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-left",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //checking if already localStorage has data
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handelValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 character", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be greater than 6 character", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (handelValidation()) {
      console.log("auth validation", registerRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setAvatar");
      }
    }
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handelSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            {/* <h1>TextMe</h1> */}
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account?<Link to="/login"> Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #d2c4d9;
  .brand {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    background-color: #d798f7;
    border-radius: 2rem;
    padding: 3rem 6rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 40px 0px;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #821db5;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1.2rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #821db5;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        transform: scale(0.98);
        background-color: #997af0;
      }
    }
    span {
      color: black;
      a {
        color: #821db5;
        text-decoration: none;
      }
    }
  }
`;
