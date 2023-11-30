import React, { createContext, useEffect, useState } from "react";

// JWT
import Cookies from "js-cookie";

// services
import { getUserById } from "../services/users.service";

// Create user context
const UserContext = createContext();

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    // get user_id from cookies
    const user_id = Cookies.get('user_id')

    useEffect(() => {
        const user = async () => {
            const response = await getUserById(user_id);
            setUser(response);
        };
        user();
    }, []);


    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };