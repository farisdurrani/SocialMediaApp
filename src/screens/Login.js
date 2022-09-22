import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  // if logged in, go to Board

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(email)

  const handleOnSubmit = () => {};

  return (
    <div id="login">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onBlur={e => setEmail(e.target.value)}
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
            onBlur={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
