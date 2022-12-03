import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDSmNk2Eu5JtEvD3JO7DVo9KyGsItY6LHg",
  authDomain: "fooddelievery-6300a.firebaseapp.com",
  databaseURL: "https://fooddelievery-6300a-default-rtdb.firebaseio.com",
  projectId: "fooddelievery-6300a",
  storageBucket: "fooddelievery-6300a.appspot.com",
  messagingSenderId: "1035165954269",
  appId: "1:1035165954269:web:9184c959f7f9b1a58eeb34",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
