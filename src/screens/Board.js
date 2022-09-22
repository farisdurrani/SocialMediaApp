import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { SocialMediaPost } from "../components/index";
import { logOut } from "../firebase";
import Button from "react-bootstrap/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Board = (props) => {
  const handleLogOut = () => {
    logOut();
    window.location.replace("/login");
  };

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log(`No user detected, Redirect to login`);
        window.location.replace("/login");
      }
    });
  }, []);

  return (
    <div>
      <h1>Board  </h1>
      <Button variant="outline-light" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
};

Board.propTypes = {};

export default Board;
