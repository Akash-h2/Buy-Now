import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 shadow-lg">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Left - Brand */}
                <div>
                    <h2 className="text-2xl font-bold tracking-wide">Buy Now</h2>
                    <p className="text-sm text-gray-400 mt-2">Your one-stop online store.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-3 space-y-2 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-gray-100 transition">Home</Link></li>
                        <li><Link to="/products" className="hover:text-gray-100 transition">Products</Link></li>
                       
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-lg font-semibold">Customer Service</h3>
                    <ul className="mt-3 space-y-2 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-gray-100 transition">FAQ</Link></li>
                        <li><Link to="/" className="hover:text-gray-100 transition">Shipping & Returns</Link></li>
                        <li><Link to="/" className="hover:text-gray-100 transition">Support</Link></li>
                    </ul>
                </div>

                {/* Newsletter Subscription */}
                <div>
                    <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
                    <form className="mt-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <Link to="/"><button 
                           
                           className="mt-2 w-full bg-blue-600 py-2 rounded-md hover:bg-blue-500 transition" 
                       >
                           Subscribe
                       </button></Link>
                    </form>
                </div>

            </div>

            {/* Social Links */}
            <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold">Follow Us</h3>
                <div className="flex justify-center space-x-6 mt-3">
                    <a href="/" className="text-gray-400 hover:text-gray-100 transition">Facebook</a>
                    <a href="/" className="text-gray-400 hover:text-gray-100 transition">Twitter</a>
                    <a href="https://www.instagram.com/_akash_7860?igsh=aWV2cjJlb3R2dWto" className="text-gray-400 hover:text-gray-100 transition">Instagram</a>
                    <a href="https://www.linkedin.com/in/akash-kanaujiya-8816412b8/" className="text-gray-400 hover:text-gray-100 transition">Linkdin</a>
                    <a href="https://github.com/Akash-h2/" className="text-gray-400 hover:text-gray-100 transition">Github</a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-xs mt-6">
                © {new Date().getFullYear()} <span className="text-gray-300 font-semibold">Buy Now</span>. All rights reserved. Developed by <span className="text-gray-300 font-semibold">Akash Kanaujiya</span>
            </div>
        </footer>
    );
};

export default Footer;
