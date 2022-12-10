import React, { useState, useEffect } from "react";
import Logo from "../img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./CartContainer";

const Header = () => {
  const [isMenu, setisMenu] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const user = useSelector((state) => state.authentication.user);
  const cart = useSelector((state) => state.authentication.cart);
  console.log("cart", cart);
  useEffect(() => {
    let totalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.qty * item.price;
    }, 0);
    setTotalPrice(totalPrice);
    console.log(totalPrice);
  }, [cart]);
  // let totalPrie = 12;
  console.log(user);
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData, uid },
      } = await signInWithPopup(firebaseAuth, provider);
      // console.log(response);
      console.log("dds");
      dispatch({
        type: "LOGIN_USERS",
        user: { ...providerData[0], uid },
      });

      localStorage.setItem("user", JSON.stringify({ ...providerData[0], uid }));
      // localStorage.setItem("uniqueid", JSON.stringify(uid));
    } else {
      setisMenu(true);
    }
  };
  const logout = () => {
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type: "LOGIN_USERS",
      user: null,
    });
    if (!user)
      dispatch({
        type: "CLEAR_CART",
        cart: [],
      });
    // localStorage.clear()
  };
  return (
    <div className="fixed z-50 w-screen  p-6 px-16">
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={Logo} className="w-10 object-cover" alt="" />
            <p className="text-headingColor text-xl font-bold">City</p>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 "
          >
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket
              className="text-textColor text-2xl ml-8 cursor-pointer"
              onClick={() => setToggle(true)}
            />
            {toggle && user && (
              <CartContainer setToggle={setToggle} totalPrice={totalPrice} />
            )}
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">{cart.length}</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              referrerPolicy="no-referrer"
              src={user ? user.photoURL : Avatar}
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user &&
                  user.email === "dhruvin123.saurabhifosys@gmail.com" && (
                    <Link to="/createItem">
                      <p
                        onClick={() => setisMenu(false)}
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      >
                        New Item <MdAdd />
                      </p>
                    </Link>
                  )}
                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* //mobile// */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          // onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "dhruvin123.saurabhifosys@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setisMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setisMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setisMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setisMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
