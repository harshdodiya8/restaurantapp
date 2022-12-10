import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useCart from "./useCart";

const CartItem = ({ item, setToggle, flag }) => {
  const cart = useSelector((state) => state.authentication.cart);
  const dispatch = useDispatch();
  const [updatedqty, setupdatedqty] = useState([]);

  const { addToCart, updated } = useCart();
  useEffect(() => {
    if (updated.length) {
      dispatch({
        type: "ADD_CART",
        payload: updated,
      });
    }
    localStorage.setItem("cartItems", JSON.stringify(updated));
    // console.log("updated", updated);
  }, [updated]);

  const deleteQty = (item) => {
    let existing = cart.find((ele) => ele.id === item.id);
    if (existing.qty > 1) {
      let updatedQty = { ...item, ...{ qty: existing.qty - 1 } };
      let decrement = [...cart];
      decrement[cart.indexOf(existing)] = updatedQty;
      setupdatedqty(decrement);
      console.log("cart", cart);
    } else if (existing.qty === 1) {
      // alert("sdjhh");
      if (cart.length === 1) {
        dispatch({
          type: "CLEAR_CART",
          cart: [],
        });
      }
      let updatedCart = cart.filter((curItem) => curItem.id !== item.id);
      setupdatedqty(updatedCart);
    }

    // localStorage.setItem("cartItems", JSON.stringify(updatedqty));
  };
  useEffect(() => {
    if (updatedqty.length) {
      dispatch({
        type: "DELETE",
        payload: updatedqty,
      });
    }
  }, [updatedqty]);
  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item.imageUrl}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {item?.price}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => deleteQty(item)}>
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.qty}
        </p>

        <motion.div whileTap={{ scale: 0.75 }}>
          <BiPlus
            className="text-gray-50 "
            onClick={async () => await addToCart(item)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
