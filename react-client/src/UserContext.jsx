import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userid, setUserid] = useState(() => {
    return localStorage.getItem("userId") || null;
  });

  const [profileImg, setProfileImg] = useState(() => {
    return localStorage.getItem("profileImg") || null;
  });

  useEffect(() => {
    if (userid) {
      localStorage.setItem("userId", userid);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userid]);

  useEffect(() => {
    if (profileImg) {
      localStorage.setItem("profileImg", profileImg);
    } else {
      localStorage.removeItem("profileImg");
    }
  }, [profileImg]);

  return (
    <UserContext.Provider
      value={{ userid, setUserid, profileImg, setProfileImg }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
