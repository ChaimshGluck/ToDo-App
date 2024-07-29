import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userid, setUserid] = useState(null);

    return (
        <UserContext.Provider value={{ userid, setUserid }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };