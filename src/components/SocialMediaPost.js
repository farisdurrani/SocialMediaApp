import React from "react";

const SocialMediaPost = (props) => {
  const { user_email, post, createdAt } = props.postData;
  const timestamp = new Date(createdAt.seconds * 1000);
  return (
    <div className="post-container mt-3 mb-3">
      <p className="mb-1 text-white">{`${user_email} - ${timestamp.toLocaleString()}`}</p>
      <div className="post-text">
        <p>{post}</p>
      </div>
    </div>
  );
};

export default SocialMediaPost;
