import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { SocialMediaPost } from "../components/index";
import { logOut } from "../firebase";
import Button from "react-bootstrap/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Board = (props) => {
  const handleLogOut = () => {
    logOut();
    window.location.replace("/login");
  };

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.replace("/login");
      }
    });
  }, []);

  return (
    <div id="board">
      <div>
        <h1>Board </h1>
        <Button variant="outline-light" onClick={handleLogOut}>
          Log out
        </Button>
      </div>
      <SocialMediaPost />
      <SocialMediaPost />
      <SocialMediaPost />
    </div>
  );
};

Board.propTypes = {};

export default Board;
