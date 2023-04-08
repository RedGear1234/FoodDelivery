import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
let items = [];

const CartItem = ({ item, flag , setflag}) => {
  const [qty, setqty] = useState(item.qty);
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setqty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setflag(flag + 1)
        }
      });
      cartDispatch();
    } else {
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        cartDispatch();
      } else {
        setqty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setflag(flag + 1)
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full h-340 flex-col justify-center p-1 px-2 rounded-lg  bg-orange-300 flex items-center border">
      <img
        src={item.imageURL}
        className="w-50 h-50 max-w-[100px] md:max-w-[150px] object-contain "
        alt="cartImg"
      />
      {/* name Section  */}
      <div className="flex flex-col gap-1">
        <p className="text-xl text-gray-50">{item?.title}</p>
        <p className="text-gray-200 text-xl font-semibold">
          ${parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* button  */}
      <div className="group mb-2 flex-row flex  items-center gap-2 ml-auto mr-2 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 p-4 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
