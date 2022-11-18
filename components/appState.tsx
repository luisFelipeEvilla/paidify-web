import { createContext } from "react";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, ROLE_GUEST } from "../utils/constants";
import jwt from 'jsonwebtoken';

export const AppState = createContext({});

const AuthProvider = ({ children } : any) => {
    const [cookies] = useCookies([ACCESS_TOKEN]);
    
    const token = cookies[ACCESS_TOKEN] as string;
    
    let user;
    if(token) {
        user = jwt.decode(token) as { role: number, id: number };
    } else {
        user = { role: ROLE_GUEST } as { role: number, id: number };
    }
    
    const context = { user };
    
    return (
        <AppState.Provider value={context}>{children}</AppState.Provider>
    );
};

export default AuthProvider;
