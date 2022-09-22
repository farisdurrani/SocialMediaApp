import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { registerUser, signIn, logOut } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  // if logged in, go to Board

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User ${user.email} is logged in`);
        setCurrentUser(currentUser);
      }
    });
  }, []);

  const handleSignIn = () => {
    signIn(email, password);
  };

  const handleRegister = () => {
    registerUser(email, password);
  };

  return (
    <div id="login">
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
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
        <br />
        <Button variant="primary" onClick={handleSignIn}>
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default Login;
