import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const location = useLocation();

    const selectedItems = location.state?.selectedItems || [];
    const [formdata, setFormdata] = useState({ name: "", email: "", address: "" });
    const [orderplace, setOrderplaced] = useState(false);

    const filteredCart = cart.filter((product) => selectedItems.includes(product.id));
    const totalPrice = filteredCart.reduce((initial, product) => initial + product.quantity * product.price, 0);

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formdata.name || !formdata.email || !formdata.address) {
            toast.error("Please fill all details");
            return;
        }

        setOrderplaced(true);
        setCart(cart.filter((product) => !selectedItems.includes(product.id)));

        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    if (orderplace) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="bg-black bg-opacity-40 border border-gray-700 p-10 rounded-lg shadow-lg backdrop-blur-md text-center w-[600px]">
                    <h2 className="text-3xl text-white font-bold">🎉 Order Placed Successfully!</h2>
                    <p className="text-gray-300 mt-2">Thank you for shopping. ✅</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-4xl bg-black bg-opacity-40 border border-gray-700 p-12 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-4xl font-bold text-white text-center mb-8">Checkout</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    <input
                        type="text"
                        name="address"
                        placeholder="Shipping Address"
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />

                    <h3 className="text-xl text-white font-semibold mt-4">Products in Your Order:</h3>
                    {filteredCart.length > 0 ? (
                        <div className="space-y-3 text-gray-300 bg-gray-800 p-4 rounded-md">
                            {filteredCart.map((product) => (
                                <div key={product.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <p>{product.title}</p>
                                    <span className="text-green-400">₹{product.price} x {product.quantity}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No products selected.</p>
                    )}

                    <h3 className="text-xl text-white font-semibold mt-4">
                        Total: <span className="text-green-400">₹{totalPrice}</span>
                    </h3>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-4 rounded-md text-lg font-semibold hover:bg-green-500 transition"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
