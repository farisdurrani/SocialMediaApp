import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { registerUser, signIn, logOut } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      <h1>Social Circle</h1>
      <br />
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
                <Form.Text className="text-muted">
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
              <Button variant="primary" onClick={handleSignIn}>
                Log In
              </Button>
              <br />
              <br />
              <Button variant="primary" onClick={handleRegister}>
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
