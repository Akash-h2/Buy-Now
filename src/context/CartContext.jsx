import { createContext, useContext, useEffect, useState  } from "react";

//context banao
const cartContext = createContext();

// lets make provider component

export const CartProvider =({children})=>{

    // local storage retrival
    const localCart = localStorage.getItem("akashCart");
    const initialCart = localCart ? JSON.parse(localCart) : [];
    const [cart, setCart] = useState(initialCart);
   
   
    const addCart =(product)=>{
      setCart((prevCart)=>{
        const existingItem = prevCart.find((item)=> item.id === product.id)
        if(existingItem)
        {
            return prevCart.map((item)=> item.id === product.id ? {...item, quantity: item.quantity +1}:item)
        }else{
            return [...prevCart,{...product, quantity:1}];
        }
            
      })
    }

    const removeCart = (productId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);
            if (existingItem.quantity > 1) {
                return prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevCart.filter((item) => item.id !== productId);
            }
        });
    };

    //local storage
    useEffect(()=>{
        localStorage.setItem("akashCart" , JSON.stringify(cart))
    },[cart])

   
    return(
        <>
        <cartContext.Provider value={{cart, setCart, addCart, removeCart}}>
            {children}

        </cartContext.Provider>
        </>
    )
}

export const useCart =()=>{
    return useContext(cartContext)
}