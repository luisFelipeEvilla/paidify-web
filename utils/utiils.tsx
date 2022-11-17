import Cookies from "cookies";
import jwt from 'jsonwebtoken';
import { API_URL } from "../config";

export const fetchData = async (endpoint: string, req: any, res: any) => {
    const cookies = new Cookies(req, res);

    const token = cookies.get('token') as string;

    const user = jwt.decode(token) as { id: number };

    const url = `${API_URL}/${endpoint}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data
}

export const getUserData = (req: any, res: any) => {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token') as string;
    const user = jwt.decode(token) as { id: number };
    
    return user;
}   