import { RiAspectRatioLine } from "react-icons/ri";
import { fetchId, fetchUser } from "../utils/fetchUser";
const userInfo = fetchUser();
// const cartInfo = fetchCart();
// const userid = fetchId();
const initialState = {
  user: userInfo,
  carr:0,
  // uniqueid: userid,
  foodItems: null,
  cart: [],
};
export const authentication = (state = initialState, action) => {
  console.log(action);
  // console.log(state.foodItems.title);

  switch (action.type) {
    case "LOGIN_USERS":
      return {
        ...state,
        user: action.user,
        // uniqueid: action.uniqueid,
      };
    case "FOOD_ITEMS":
      return {
        ...state,
        foodItems: action.foodItems,
      };
    case "ADD_CART":
      return {
        ...state,
        ...{ cart: action.payload },
      };
    // return {
    //   ...state,
    //   cart: [...state.cart, action.payload],
    // };
    // const Index = state.cart.findIndex((ele) => ele.id === action.payload.id);
    // console.log(Index);
    // if (Index >= 0) {return{...state,
    //  ... state.cart[Index].qty += 1
    // }
    // } else {
    //   return {
    //     ...state,
    //     cart: [...state.cart, action.payload],
    //   };
    // }
    // let existingProduct = state.cart.find(
    //   (curItem) => curItem.id === action.payload.id
    // );
    // console.log("ddfd", existingProduct);
    // if (existingProduct) {
    //   let updatedProduct = state.cart.map((curElem) => {
    //     if (curElem.id === action.payload.id) {
    //       // let newQty = curElem.qty + 1;

    //       return {
    //         ...curElem,
    //         qty: curElem.qty + 1,
    //       };
    //     } else {
    //       return curElem;
    //     }
    //   });
    //   return {
    //     ...state,
    //     cart: updatedProduct,
    //   };
    // }

    // return {
    //   ...state,
    //   cart: [...state.cart, action.payload],
    // };
    case "DELETE":
      return {
        ...state,
        ...{ cart: action.payload },
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
