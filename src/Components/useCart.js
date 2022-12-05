import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



const useCart=()=>{
  const cart=useSelector((state)=>state.authentication.cart)
    const [updated, setUpdated] = useState([])
    const addToCart = (item) => {

        let updatedItem
        let existingItem = cart.find((ele) => ele.id === item.id)
    
        if (existingItem) {
    
          updatedItem = { ...item, ...{ qty: existingItem.qty + 1 } }
    
          let abc = [...cart]
          abc[cart.indexOf(existingItem)] = updatedItem
          // console.log();
          setUpdated(abc)
        } else {
          setUpdated([...cart, item])
        }
    
        localStorage.setItem("cartItems", JSON.stringify(updated));
      };
  
return {
    addToCart,updated
}
}
      export default useCart;





