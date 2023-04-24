import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import Message from "../LeftBanner";
import axios from "axios";
import "./index.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      name: name,
      email: email,
      password: password,
    };
    setError("");
    try {
      await signUp(email, password);
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        userdata
      );
      console.log("response data is ", response);
      navigate("/");
    } catch (err) {
      setError(err.message);
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
          <div className="p-4 box">
            {/* <h2 className="mb-3">Firebase Auth Signup</h2> */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
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
                  Sign up
                </Button>
              </div>
            </Form>
          </div>
          <div className="p-4 box mt-3 text-center">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
