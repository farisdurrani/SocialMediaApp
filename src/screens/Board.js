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

const Board = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [post, setPost] = useState();
  const [userEmail, setUserEmail] = useState();
  const auth = getAuth();
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
    <div id="board">
      <div>
        <h1>Board </h1>
        <Button variant="outline-light" onClick={handleLogOut}>
          Log out
        </Button>
      </div>
      <p className="hide-older-posts">Older posts are hidden</p>
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
