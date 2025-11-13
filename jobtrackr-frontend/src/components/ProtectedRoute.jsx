import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({children}) {
    const {user} = useContext(AuthContext);
    if (!user) return <Navigate to="/login" replace/>;  //Using replace prevents unwanted history back navigation loops.
    return children;
}

// This wraps pages that require login.