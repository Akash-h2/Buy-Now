import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const { addCart } = useCart();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <h2 className="text-center text-gray-300 text-xl mt-10">Product not found</h2>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12">
            {/* Product Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-96 h-96 object-cover rounded-lg shadow-lg transform hover:scale-105 transition"
                />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 bg-black bg-opacity-40 border border-gray-700 p-8 rounded-lg shadow-lg backdrop-blur-md mt-8 md:mt-0 md:ml-8">
                <h2 className="text-3xl font-bold text-white">{product.title}</h2>
                <p className="text-gray-300 text-lg mt-2">${product.price}</p>
                <p className="text-gray-400 mt-4">{product.description}</p>

                <button
                    onClick={() => addCart(product)}
                    className="mt-6 w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
