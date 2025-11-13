import { createContext, useState, useEffect } from "react";
import api from "../api/axios"
import { local } from "d3";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=> {
        JSON.parse(localStorage.getItem("user")) || null
    });

    const login = async (email, password) => {
        const res = await api.post("/auth/login", {email, password});
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data)
        return res.data; // return user so we can wait for it in the login page
    }

    const signup = async (name, email, password) => {
        const res = await api.post("/auth/sign-up", {name, email, password});
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data)
        return res.data; // return user so we can wait for it in the signup page
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    const token = user?.access_token;

    useEffect(() => {
    // Optionally verify token with backend on mount
    }, []);

    return (
        <AuthContext.Provider value = {{user, token, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// This context:
// Logs in/out
// Stores user JWT in localStorage
// Makes it available to the whole app