import React, { useState, useRef, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import GoogleButton from "react-google-button";
import { useNavigate, Link } from "react-router-dom";
import Message from "../LeftBanner";
import Homepage from "../../home";
import GoogleIcon from "../../../assets/google.png";
import Showpassword from "../../../assets/showPass.png";
import { useSelector } from "react-redux";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PHN_REGEX = /^[0-9]{15,15}$/;

const Login = () => {
  // const { user, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState("Enter a 10 digit phone number");
  const emailRef = useRef();
  const nameRef = useRef();
  const errRef = useRef();
  const [emailFocus, setEmailFocus] = useState(false);
  const phonenum = useSelector((state) => state.phonenum);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      name: name,
      email: email,
      password: password,
    };
    setError("");
    if (password && email) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          userdata
        );
        console.log("response data is ", response);
        navigate("/login");
      } catch (err) {
        console.log(err);
        // toast.error(err.response.data, {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    } else {
      toast("Please enter valid user details");
    }
  };

  const changeVisiblity = () => {
    setVisible(!visible);
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      // await googleSignIn();
      // console.log(user);
      navigate("/usertype");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="loginWrapper">
      <div className="messageLogin">
        <Message></Message>
      </div>
      <div className="userLoginForm">
        <div className="midWrapperLogin">
          <div className="loginMessage">
            Register to Pod
            <span className="changeCol loginMessage">Sphere</span>
          </div>
          <div className="welcomeMessage">
            <span style={{ fontWeight: "700" }} className="welcomeMessage">
              Welcome back!
            </span>{" "}
            Please enter your details.
          </div>
          <form onSubmit={handleSubmit} id="loginForm">
            <div className="passwordWrap">
              <input
                type="text"
                id="password"
                placeholder="Name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="inputPassword"
              />
            </div>
            <div className="passwordWrap">
              <input
                type="text"
                id="password"
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="inputPassword"
              />
            </div>
            <div className="passwordWrap">
              <input
                type={visible ? "text" : "password"}
                id="password"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="inputPassword"
              />
              <div className="showPassword">
                <Button className="showPasswordBtn" onClick={changeVisiblity}>
                  <img src={Showpassword} alt="/" />
                </Button>
              </div>
            </div>
          </form>
          <button
            type="submit"
            className="yellowBtn"
            form="loginForm"
            value="Submit"
          >
            Login
          </button>
          {/* <Button className="whiteBtn" onClick={handleGoogleSignIn}>
            <div className="googleSignUp">
              <div className="googleIcon">
                <img src={GoogleIcon} alt="/" className="GoogleImg" />
              </div>
              <div className="googleMessage">Sign in with Google</div>
            </div>
          </Button> */}
          <div className="notRegistered">
            Already Registered?
            <Link className="linkStyle1 notRegistered" to="/login">
              Log in
            </Link>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
