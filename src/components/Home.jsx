import { useEffect, useState } from "react";
import { Data } from "../assets/Data";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
    const [currentItem, setCurrentItem] = useState(0);
    const { products } = useProducts();  // Ensure products is an array

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentItem((prev) => (prev + 1) % Data.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const prevHandler = () => {
        setCurrentItem((prev) => (prev === 0 ? Data.length - 1 : prev - 1));
    };

    const nextHandler = () => {
        setCurrentItem((prev) => (prev + 1) % Data.length);
    };

    return (
        <>
            {/* Responsive Carousel */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center bg-black">
                {/* Previous Button */}
                <button 
                    onClick={prevHandler} 
                    className="absolute left-3 sm:left-5 bg-gray-900 bg-opacity-60 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-opacity-80 transition z-10"
                >
                    Prev
                </button>

                {/* Image Display */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <img 
                        className="w-full h-full object-cover brightness-75 rounded-lg sm:rounded-none" 
                        src={Data[currentItem].imageUrl} 
                        alt="Slide" 
                    />
                </div>

                {/* Next Button */}
                <button 
                    onClick={nextHandler} 
                    className="absolute right-3 sm:right-5 bg-gray-900 bg-opacity-60 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-opacity-80 transition z-10"
                >
                    Next
                </button>
            </div>

            {/* Featured Products */}
            <div className="p-6 sm:p-10 bg-gray-900 text-white">
                <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white bg-opacity-10 backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-md hover:scale-105 transition">
                            <Link to={`/product/${product.id}`}>
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="w-full h-40 sm:h-52 object-cover mb-3 sm:mb-4 rounded-md"
                                />
                                <h3 className="text-lg sm:text-xl font-semibold">{product.title}</h3>
                                <p className="text-gray-300">${product.price}</p>
                                <p className="text-sm text-gray-400">{product.category}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Home;
