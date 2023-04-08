import React, { useState } from "react";
import product from "../img/product.gif";
import shoppingbag from "../img/shoppingbag.png";
import Avatar from "../img/Avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdAdd, MdLogout } from "react-icons/md";

// Auth
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setisMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };

  const logout = () =>{
    setisMenu(false)
    localStorage.clear()

    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

  const showCart =() =>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow
    });
  }



  return (
    <header className="fixed z-50 w-screen  md:p-6 md:px-16 bg-cardOverlay backdrop-blur-md">
      {/* {" Desktop and tab"} */}
      <div className="hidden md:flex w-full h-full ">
        <Link to="/" className="flex items-center gap-2 ">
          <img src={product} className="w-10 object-cover" alt="logo" />
          <p className="text-headlineColor text-l font-semibold text-orange-600 ">
            Food Delivery
          </p>
        </Link>
        <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="flex items-center gap-8 ml-auto "
        >
          <li className=" text-textColor text-sm hover:text-orange-600 duration-100 transition-all ease-in-out cursor-pointer ">
            Home
          </li>
          <li className=" text-textColor text-sm hover:text-orange-600 duration-100 transition-all ease-in-out cursor-pointer ">
            Menu
          </li>
          <li className=" text-textColor text-sm hover:text-orange-600 duration-100 transition-all ease-in-out cursor-pointer ">
            About us
          </li>
          <li className=" text-textColor text-sm hover:text-orange-600 duration-100 transition-all ease-in-out cursor-pointer ">
            Services
          </li>
        </motion.ul>
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={shoppingbag}
            alt="shoppinbag"
            className="w-6 ml-8 cursor-pointer"
          />
          {cartItems && cartItems.length > 0 && (
            <div className="w-3 h-3 rounded-full bg-cartNumBg flex justify-center p-2 absolute top-0 -right-2 items-center -ml-2">
              <p className="text-white font-normal text-sm">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer drop-shadow-2xl ml-10 rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-orange-600 text-white text-sm px-2 py-2 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
            >
              {user && user.email === "sc9522622@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center rounded-sm gap-3 cursor-pointer hover:bg-orange-300 transition-all duration-100 ease-in-out"
                    onClick={() => setisMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <p
                className="px-4 py-2 flex items-center rounded-sm gap-3 cursor-pointer hover:bg-orange-300 transition-all duration-100 ease-in-out "
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* {" mobile "} */}

      <div className="flex md:hidden item-center p-4 justify-between w-full h-full border">
        <div
          className="relative mt-2 flex item-center justify-center"
          onClick={showCart}
        >
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={shoppingbag}
            alt="shoppinbag"
            className="w-6 h-6 ml-8 cursor-pointer"
          />
          {cartItems &&
            cartItems.length > 0 && (
                <div className="w-2 h-2 rounded-full bg-red-600 flex justify-center p-2 absolute top-0 -right-2 items-center -ml-2">
                  <p className="text-white font-normal text-sm">{cartItems.length}</p>
                </div>
              )}
        </div>

        <Link to="/" className="flex items-center gap-2 ">
          <img src={product} className="w-10 object-cover" alt="logo" />
          <p className="text-headlineColor text-sm font-semibold text-orange-600 ">
            Food Delivery
          </p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer drop-shadow-2xl ml-10 rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-orange-600 text-white text-sm px-2 py-2 shadow-xl rounded-lg absolute flex flex-col top-12 right-0"
            >
              {user && user.email === "sc9522622@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    onClick={() => setisMenu(false)}
                    className="px-4 py-4 flex items-center rounded-sm gap-3 cursor-pointer hover:bg-orange-300 transition-all duration-100 ease-in-out "
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col ">
                <li
                  className=" text-white text-sm  rounded-sm  hover:bg-orange-300 duration-100 transition-all ease-in-out cursor-pointer px-4 py-4 "
                  onClick={() => setisMenu(false)}
                >
                  Home
                </li>
                <li
                  className=" text-white text-sm  rounded-sm  hover:hover:bg-orange-300 duration-100 transition-all ease-in-out cursor-pointer px-4 py-4  "
                  onClick={() => setisMenu(false)}
                >
                  Menu
                </li>
                <li
                  className=" text-white text-sm  rounded-sm  hover:hover:bg-orange-300  duration-100 transition-all ease-in-out cursor-pointer px-4 py-4  "
                  onClick={() => setisMenu(false)}
                >
                  About us
                </li>
                <li
                  className=" text-white text-sm  rounded-sm  hover:hover:bg-orange-300  duration-100 transition-all ease-in-out cursor-pointer  px-4 py-4 "
                  onClick={() => setisMenu(false)}
                >
                  Services
                </li>
              </ul>
              <p
                onClick={logout}
                className="px-4 py-4 flex items-center  rounded-sm gap-3 cursor-pointer hover:bg-blue-300 transition-all duration-100 ease-in-out "
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
