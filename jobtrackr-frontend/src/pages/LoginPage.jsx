import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const userData = await login(email, password); //wait until login completes
            if (userData) {
                toast.success("Login successfull!");
                setTimeout(() =>navigate("/dashboard"), 200); //navigate after a short delay
            }
        }
        catch (error) {
            toast.error("Invalid credentials. Please try again.");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                className="w-full rounded mb-3 border p-2"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                className="w-full rounded mb-3 border p-2"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className="w-full bg-blue-700 text-white rounded py-2 hover:bg-blue-900">Login</button>
            <p className="text-center text-sm mt-4">
                Don't have an account? <Link to={"/signup"} className="text-blue-600 hover:underline">Signup</Link>
            </p>
        </form>
        </div>
    )
}

