import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";


const Navbar = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user"); 
        toast.success("Logged out successfully!");
        navigate("/");
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-40 backdrop-blur-md border-b border-gray-700 shadow-lg z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <div className="text-white text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    🛍️ <span>Buy Now</span>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-gray-300 font-semibold">
                    <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                    <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
                    {!isAuthenticated ? (
                        <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                    ) : (
                        <li>
                            <button 
    onClick={handleLogout} 
    className="bg-blue-600 px-4 py-0.5 rounded-md hover:bg-blue-500 transition"
>
    Logout
</button>
                        </li>
                        
                    )}
                    
                </ul>

                {/* Cart Icon */}
                <div className="relative flex items-center gap-6">
                    <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                        <span className="text-3xl text-white">🛒</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </div>

                    {/* Hamburger Menu - Mobile */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-3xl">
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black bg-opacity-90 p-5 flex flex-col items-center space-y-4 text-gray-300">
                    <Link to="/" className="hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/products" className="hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Products</Link>
                    {!isAuthenticated ? (
                        <Link to="/login" className="hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    ) : (
                        <button 
                            onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
