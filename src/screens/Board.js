import React from "react";
import PropTypes from "prop-types";
import { SocialMediaPost } from "../components/index";
import { logOut } from "../firebase";
import Button from "react-bootstrap/Button";

const Board = (props) => {
  const handleLogOut = () => {
    logOut();
    window.location.replace("/login");
  };

  return (
    <div>
      Board
      <Button variant="primary" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
};

Board.propTypes = {};

export default Board;
