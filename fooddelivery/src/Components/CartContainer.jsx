import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import EmptyCart from "../img/EmptyCart.svg";
import  CartItem  from "./CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setflag] = useState(1)
  const [tot ,settot] = useState(0)

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(()=>{
    let totalPrice = cartItems.reduce(function (acc, item){
      return acc + item.qty * item.price;
    },0)
    settot(totalPrice)
  },[tot, flag])

  const clearCart =()=>{
    dispatch({
      type : actionType.SET_CARTITEMS,
      cartItems: [],
    })
    localStorage.setItem('cartItems', JSON.stringify([]))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className=" z-[101] w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col fixed top-0 right-0 "
    >
      <div className="w-full flex items-start justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace
            className="text-textColor text-3xl"
            onClick={showCart}
          />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          <RiRefreshFill onClick={clearCart} />
        </motion.p>
      </div>
      {/* bottom section  */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full  bg-orange-600 mt-2 rounded-t-[2rem] flex flex-col">
          <div className=" w-full h-auto md:42 px-6 py-10 flex felx-col flex-wrap gap-3 overflow-y-scroll scrollbar-none">
            {/* cartItem  */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setflag={setflag}
                  flag={flag}
                />
              ))}

            {/* cart total section  */}
            <div className="w-full flex item-center justify-between">
              <p className="text-white text-lg">Sub total</p>
              <p className="text-white text-lg">$8.5</p>
            </div>
            {/* Delivery section  */}
            <div className="w-full flex item-center justify-between">
              <p className="text-white  text-lg">Delivery</p>
              <p className="text-white text-lg">$2.5</p>
            </div>
            <div className="w-full border-b border-white my-2"></div>
            <div className="w-full flex item-center justify-between">
              <p className="text-white  text-xl font-semibold">Total</p>
              <p className="text-white text-xl font-semibold">${tot + 2.5}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.6 }}
                type="button"
                className="bg-gradient-to-br from-orange-400 to-orange-600 w-full  px-4 py-2 rounded-sm shadow-lg  text-white"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.6 }}
                type="button"
                className="bg-gradient-to-br from-orange-400 to-orange-600 w-full  px-4 py-2 rounded-sm shadow-lg  text-white"
              >
                Log in to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="emptyCart" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
