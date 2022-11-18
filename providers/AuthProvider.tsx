import { createContext, useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import { getAccessToken, logout } from "../api/auth";

export const AuthContext = createContext({});

export default function AuthProvider(props: any) {
    const { children } = props;
    const [user, setUser] = useState(null);

    useEffect(() => checkLogin(setUser), []);
    
    return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
}

function checkLogin(setUser: any) {
    const token = getAccessToken();
    if(token) {
        const decodedToken = jwt.decode(token);
        if(decodedToken) setUser(decodedToken);
    } else {
        console.log('No token');
        logout();
    }
}
