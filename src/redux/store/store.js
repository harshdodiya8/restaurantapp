import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "../main";

const store = configureStore({ reducer: rootreducer });
export default store;
