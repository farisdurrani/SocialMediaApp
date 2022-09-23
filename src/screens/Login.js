import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { registerUser, signIn } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/images/High_Resolution_Logo.png";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User ${user.email} is logged in`);
        setCurrentUser(user);
        window.location.replace("/board");
      }
    });
  }, []);

  const handleSignIn = async() => {
    await signIn(email, password);
    window.location.replace("/board");
  };

  const handleRegister = () => {
    registerUser(email, password);
  };

  if (currentUser) {
    return <>Loading...</>;
  }

  return (
    <Container id="login">
      <div className="row">
        <div className="text-center">
          <img
            src={logo}
            className="img-fluid"
            width="20%"
            height="auto"
            alt="Social Circle Logo"
          ></img>
        </div>
      </div>
      <div className="row">
        <div className="col login-box d-flex justify-content-center align-items-center">
          <Form className="mt-5 mb-5" id="login-info">
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
        </div>
      </div>
    </Container>
  );
};

export default Login;
