import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useFollow } from "./state/FollowContext";

function Home() {
  const { followedUsers, followUser, unfollowUser } = useFollow();

  return (
    <div style={{ padding: 20 }}>
      <h1>Home Page</h1>
      <p>Followed Users: {followedUsers.join(", ") || "None"}</p>
      <button onClick={() => followUser("User1")}>Follow User1</button>
      <button onClick={() => unfollowUser("User1")}>Unfollow User1</button>
      <br />
      <Link to="/about">Go to About</Link>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h1>About Page</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
