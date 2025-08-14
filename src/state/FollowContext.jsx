import React, { createContext, useContext, useState } from "react";

const FollowContext = createContext();

function FollowProvider({ children }) {
  const [followedUsers, setFollowedUsers] = useState([]);

  const followUser = (userId) => {
    if (!followedUsers.includes(userId)) {
      setFollowedUsers((prev) => [...prev, userId]);
    }
  };

  const unfollowUser = (userId) => {
    setFollowedUsers((prev) => prev.filter((id) => id !== userId));
  };

  return (
    <FollowContext.Provider value={{ followedUsers, followUser, unfollowUser }}>
      {children}
    </FollowContext.Provider>
  );
}

function useFollow() {
  return useContext(FollowContext);
}

export { FollowProvider, useFollow };
