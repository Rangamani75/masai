import { Link } from "react-router-dom";
import { useFollow } from "../state/FollowContext";

export default function About() {
  const { followedUsers } = useFollow();

  return (
    <div className="container">
      <h1>About Page</h1>
      <p>
        You are currently following:{" "}
        {followedUsers.length > 0 ? followedUsers.join(", ") : "No one"}
      </p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
