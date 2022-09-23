import React, { useEffect, useState } from "react";
import { SocialMediaPost } from "../components/index";
import {
  logOut,
  getAllResponses,
  addToResponses,
  getCurrentTimestamp,
} from "../firebase";
import Button from "react-bootstrap/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Form from "react-bootstrap/Form";
import logo from "../assets/images/High_Resolution_Logo.png";

const Board = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [post, setPost] = useState();
  const [userEmail, setUserEmail] = useState();
  const handleLogOut = () => {
    logOut();
    window.location.replace("/login");
  };

  const handleSubmit = async () => {
    const data = {
      user_email: userEmail,
      post: post,
      createdAt: getCurrentTimestamp(),
    };
    await addToResponses(data);
    window.location.replace("/board");
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.replace("/login");
        return;
      }
      setUserEmail(user.email);
    });
  }, []);

  useEffect(() => {
    const retrieveAll = async () => {
      const resp = await getAllResponses();
      setAllPosts(resp);
    };
    retrieveAll();
  }, []);

  if (!userEmail) {
    return <div id="board">Loading...</div>;
  }

  return (
    <div id="board" className="mb-5">
        <div className="row">
        <div className="text-center">
          <img
            src={logo}
            className="img-fluid"
            width="30%"
            height="auto"
            alt="Social Circle Logo"
          ></img>
        </div>
      </div> 
      <div className="row justify-content-end">
        <div className="col">
          <p className="hide-older-posts">Older posts are hidden</p>
        </div>
        <div className="col-3">
          <Button variant="outline-light" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
      </div>
      {allPosts.map((e, i) => (
        <SocialMediaPost key={i} postData={e} />
      ))}
      <Form>
        <Form.Group className="mt-2 mb-3 post-input">
          <Form.Control
            onBlur={(e) => setPost(e.target.value)}
            placeholder="What are you thinking about today?"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Send</Button>
      </Form>
    </div>
  );
};

export default Board;
