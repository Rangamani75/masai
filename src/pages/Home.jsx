import { Link } from "react-router-dom";
import { useFollow } from "../state/FollowContext";

export default function Home() {
  const { followedUsers, followUser, unfollowUser } = useFollow();

  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        Followed Users:{" "}
        {followedUsers.length > 0 ? followedUsers.join(", ") : "None"}
      </p>
      <button onClick={() => followUser("User1")}>Follow User1</button>
      <button onClick={() => unfollowUser("User1")}>Unfollow User1</button>
      <br />
      <Link to="/about">Go to About</Link>
    </div>
  );
}
