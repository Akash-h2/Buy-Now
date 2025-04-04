import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

const Productlist = () => {
    const { products, loading, error } = useProducts();
    const { addCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState("All");

    if (loading) return <p className="text-center text-gray-300 text-lg">Loading products...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    const categories = ["All", ...new Set(products.map((p) => p.category))];
    const filteredProducts =
        selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

    return (
        <div className="container mx-auto px-6 py-10">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-white mb-6">Our Products</h2>

            {/* Category Filter */}
            <div className="flex justify-center mb-8">
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-black text-white border border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:border-white transition"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category} className="bg-gray-900 text-white">
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-black bg-opacity-30 border border-gray-700 rounded-lg p-4 shadow-lg backdrop-blur-md"
                    >
                        <Link to={`/product/${product.id}`} className="block">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-lg transition-transform transform hover:scale-105"
                            />
                        </Link>
                        <h3 className="text-lg font-semibold text-white mt-4">{product.title}</h3>
                        <p className="text-gray-300">${product.price}</p>
                        <p className="text-sm text-gray-400">{product.category}</p>
                        <button
                            onClick={() => addCart(product)}
                            className="mt-4 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productlist;
