import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";
import Message from "../LeftBanner";
import "./index.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State/index.js";

const Login = () => {
  const userId = useSelector((state) => state.userId);
  const [localId, setLocalId] = useState(null);
  useEffect(() => {
    setLocalId(userId);
  }, [userId]);

  const dispatch = useDispatch();
  const { updateUserId } = bindActionCreators(actionCreators, dispatch);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      email: email,
      password: password,
    };
    setError("");

    try {
      await logIn(email, password);
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userdata
      );
      console.log("userId in login is ", response.data.userId);
      updateUserId(response.data.userId);
      console.log("userid global is ", localId);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
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
            Login to Pod<span className="changeCol loginMessage">Sphere</span>
          </div>
          <div className="welcomeMessage">
            <span style={{ fontWeight: "700" }} className="welcomeMessage">
              Welcome back!
            </span>{" "}
            Please enter your details.
          </div>
          <div className="p-4 box">
            {/* <h2 className="mb-3">Firebase Auth Login</h2> */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Log In
                </Button>
              </div>
            </Form>
            <hr />
            <div>
              <GoogleButton
                className="g-btn"
                type="dark"
                onClick={handleGoogleSignIn}
              />
            </div>
          </div>
          <div className="p-4 box mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
