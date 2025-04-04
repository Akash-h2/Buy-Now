import { createContext, useContext, useEffect, useState ,} from "react";
import axios from "axios";
const ProductContext = createContext();

export const ProductProvider =({children})=>{
    const [products,setProducts] =useState([]);
    const[loading ,setLoading]=useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
            setProducts(res.data);
            setLoading(false);
            
        })
        
        .catch(()=>{
            setError("Failed to load products :" );
            setLoading(false);
        })
    },[])
 return(
    <>
    <ProductContext.Provider value={{products , loading, error}}>
        {children}
    </ProductContext.Provider>
    </>
 )
}

export  const useProducts =()=>{
    return useContext(ProductContext)
}