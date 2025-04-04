import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            toast.error("Please fill all fields");
            return;
        } else {
            localStorage.setItem("Userdetails", JSON.stringify(user));
            toast.success("Signup successful!");
            navigate("/login");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-black bg-opacity-40 border border-gray-700 p-8 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Signup</h2>

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
                        Signup
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gray-300 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
