import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { registerUser, signIn, logOut } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/images/High_Resolution_Logo.png";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User ${user.email} is logged in`);
        setCurrentUser(currentUser);
        window.location.replace("/board");
      }
    });
  }, []);

  const handleSignIn = () => {
    signIn(email, password);
    window.location.replace("/board");
  };

  const handleRegister = () => {
    registerUser(email, password);
  };

  if (currentUser) {
    return <>Loading...</>;
  }

  return (
    <div class="container">
      <div class="row">
        <div class="text-center">
          <img src={logo} class="img-fluid" width="20%" height="auto" alt="Social Circle Logo"></img>
        </div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col login-box d-flex justify-content-center align-items-center">
          <div id="login">
            <br />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onBlur={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onBlur={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <br />
              <Button variant="outline-light" onClick={handleSignIn}>
                Log In
              </Button>
              <br />
              <br />
              <Button variant="outline-light" onClick={handleRegister}>
                Register
              </Button>
            </Form>
            <br />
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
};

export default Login;
