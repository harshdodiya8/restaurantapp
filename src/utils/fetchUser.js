export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userInfo;
};
// export const fetchCart = () => {
//   const cartInfo =
//     localStorage.getItem("cartItems") !== undefined
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : localStorage.clear();
//   return cartInfo;
// };
export const fetchId = () => {
  const userid =
    localStorage.getItem("uniqueid") !== undefined
      ? JSON.parse(localStorage.getItem("uniqueid"))
      : localStorage.clear();
  return userid;
};
