import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userid, setUserid] = useState(null);
    const [profileImg, setProfileImg] = useState(null);

    return (
        <UserContext.Provider value={{ userid, setUserid, profileImg, setProfileImg }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };