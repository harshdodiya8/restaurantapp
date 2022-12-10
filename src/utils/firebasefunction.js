import { db } from "../firebase.config";
import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  orderBy,
} from "firebase/firestore";

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(db, "foodItems"), orderBy("id", "desc"))
  );
  // console.log("daffedff", items.docs.data());
  return items.docs.map((doc) => doc.data());
};
export const getAllCartItems = async () => {
  const cart = await getDocs(query(collection(db, "cart")));

  return cart.docs.map((doc) => {
    console.log("docdata", doc.data());
    return doc.data();
  });
};
