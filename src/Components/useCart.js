import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase.config";
import { getAllCartItems, getAllFoodItems } from "../utils/firebasefunction";

const useCart = () => {
  const cart = useSelector((state) => state.authentication.cart);
  const user = useSelector((state) => state.authentication.user);

  // const uniqueid = useSelector((state) => state.authentication.user.uid);
  const uniqueid = user?.uid;

  console.log(uniqueid);
  const [updated, setUpdated] = useState([]);
  const returnexistItem = (_item) => {
    return cart.find((ele) => ele.id === _item.id);
  };

  const setdoc = async (cartitem) => {
    await setDoc(doc(db, "cart", uniqueid), Object.assign({}, cartitem));
  };

  const updatedoc = async (abc) => {
    const docRef = doc(db, "cart", uniqueid);

    const data = {
      abc,
    };
    await setDoc(docRef, data);
  };

  const addToCart = (item) => {
    let updatedItem;
    let abc = [...cart];
    let existingItem = returnexistItem(item);
    if (existingItem) {
      updatedItem = { ...item, ...{ qty: existingItem.qty + 1 } };

      abc[cart.indexOf(existingItem)] = updatedItem;

      setUpdated(abc);
      updatedoc(abc);
    } else {
      setUpdated([...cart, item]);

      console.log("updated", updated);
    }
    console.log("dsdsdff", abc);

    // console.log(data1);

    localStorage.setItem("cartItems", JSON.stringify(updated));
  };
  useEffect(() => {
    setdoc(cart);
  }, [cart]);

  return {
    addToCart,
    updated,
  };
};
export default useCart;
