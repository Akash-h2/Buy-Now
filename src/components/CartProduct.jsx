import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartProduct = () => {
    const { cart, addCart, removeCart } = useCart();
    const navigate = useNavigate();
    
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (productId) => {
        setSelectedItems((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    };

    const proceedToCheckout = () => {
        if (selectedItems.length === 0) {
            toast.info("Please select at least one product to proceed.");
            return;
        }
        navigate("/checkout", { state: { selectedItems } });
    };

    const totalPrice = cart
        .filter((product) => selectedItems.includes(product.id))
        .reduce((initial, product) => initial + product.price * product.quantity, 0);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-3xl bg-black bg-opacity-40 border border-gray-700 p-6 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">🛒 Your Cart</h2>

                {cart.length === 0 ? (
                    <p className="text-gray-300 text-center">Your cart is empty. Add some items!</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((product) => (
                            <li
                                key={product.id}
                                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(product.id)}
                                        onChange={() => handleCheckboxChange(product.id)}
                                        className="w-5 h-5 accent-gray-500"
                                    />
                                    <img
                                        src={product.image}
                                        alt=""
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="text-white font-medium">{product.title}</p>
                                        <p className="text-gray-300 font-bold">₹{product.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => removeCart(product.id)}
                                        className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                                    >
                                        −
                                    </button>
                                    <span className="text-white">{product.quantity}</span>
                                    <button
                                        onClick={() => addCart(product)}
                                        className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <h3 className="text-lg text-white font-semibold mt-6">
                    Total: <span className="text-gray-300">₹{totalPrice}</span>
                </h3>

                <button
                    onClick={proceedToCheckout}
                    className="w-full bg-gray-700 text-white py-3 rounded-md mt-4 hover:bg-gray-600 transition"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartProduct;
