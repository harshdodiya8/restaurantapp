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

  return items.docs.map((doc) => doc.data());
};
