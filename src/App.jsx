import CartProduct from "./components/CartProduct";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import Productlist from "./components/Productlist";
import { CartProvider } from "./context/CartContext";
import {BrowserRouter as  Router , Routes, Route} from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import CheckoutPage from "./components/CheckoutPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Chatbox from "./components/Chatbox";
import { ToastContainer } from 'react-toastify';


function App(){
  return(
   <ProductProvider>
     <CartProvider>
      <Router> 
   <Navbar/>
   <Chatbox/>
   <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
   
  
   
   <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/products" element={<Productlist/>}/>
    <Route path="/cart" element={<CartProduct/>}/>
    <Route path="/product/:id" element={<ProductDetail/>}/>
    <Route path="/checkout" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>}/>
   </Routes>
      
      </Router>
      
    </CartProvider>
   </ProductProvider>
  )
}
export default App;