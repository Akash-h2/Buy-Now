import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem("Userdetails"));

        if (storedUser && storedUser.email === user.email && storedUser.password === user.password) {
            localStorage.setItem("isAuthenticated", "true");
            toast.success("Login successful!");
            navigate("/cart");
        } else {
            toast.error("Invalid credentials!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-black bg-opacity-40 border border-gray-700 p-8 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-gray-300 hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
