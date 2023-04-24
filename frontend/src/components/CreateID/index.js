import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../auth/LeftBanner";
import "./index.css";
import axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+-]).{8,24}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const UserDetails = () => {
  const navigate = useNavigate();

  const phonenum = useSelector((state) => state.phonenum);
  const nameofuser = useSelector((state) => state.nameofuser);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("Enter a 10 digit phone number");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });

  const { name, email } = inputValue;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputValue);
  };

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === confirmpassword);
  }, [password, confirmpassword]);

  useEffect(() => {
    setValidName(USER_REGEX.test(userID));
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: nameofuser,
      email: email,
      phno: phonenum,
      userID: userID,
      password: password,
    };
    const v1 = USER_REGEX.test(userID);
    const v2 = PWD_REGEX.test(password);
    console.log("v1 is ", v1);
    if (!v1 || !v2) {
      toast.error("Invalid Input, Please check your details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setError("");
    if (nameofuser && password && userID && phonenum) {
      try {
        const response = await axios.post("/api/register", user);
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Please enter Valid Input details", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="userDetailWrapper">
      <div className="messageLogin">
        <Message></Message>
      </div>
      <div className="userRegisterForm">
        <div className="midWrapperUser">
          <div className="pageName">Create ID & Password</div>
          <div className="pageMessage">
            Create your unique user ID and password.
          </div>
          <form onSubmit={handleSubmit} id="detailsForm">
            <div className="createIDInputWrap">
              <input
                type="text"
                value={email}
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="createIDInputWrap">
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !userID ? "hide" : "invalid"}
              />
              <input
                type="text"
                id="userID"
                placeholder="Create User ID"
                autoComplete="off"
                onChange={(e) => setUserID(e.target.value)}
                value={userID}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="checkInputs"
              />
              <p
                id="uidnote"
                className={
                  userFocus && userID && !validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className="createIDInputWrap">
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !password ? "hide" : "invalid"}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="checkInputs"
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />8 to 24 characters. Must
                include uppercase and lowercase letters, a number and a special
                character. Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>{" "}
                <span aria-label="plus">+</span>{" "}
              </p>
            </div>

            <div className="createIDInputWrap">
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && confirmpassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || confirmpassword ? "hide" : "invalid"}
              />
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm Password"
                autoComplete="off"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmpassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="checkInputs"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>
          </form>
          <div className="termsConditions">
            By signing up, you are agreeing to our
            <span className="termsConditions" style={{ fontWeight: "700" }}>
              Terms And Conditions.
            </span>
          </div>
          <button
            type="submit"
            className="yellowBtn"
            form="detailsForm"
            value="Submit"
          >
            Create Account
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
