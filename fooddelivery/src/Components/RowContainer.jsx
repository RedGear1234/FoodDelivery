import React, { useState, useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainerRef = useRef();
  const [items, setItems] = useState([])

  const [{ cartItems }, dispatch] = useStateValue()

  const addTocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    })
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() =>{
      addTocart()
  },[items])

  return (
    <div
      ref={rowContainerRef}
      className={`w-full flex items-center gap-3 my-10 pt-8 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-300 min-w-[300px] md:min-w-[340px]  md:w-240  mt-2 h-auto  backdrop-blur-lg bg-gradient-to-r from-yellow-400 to-red-500 p-6 rounded-lg hover:drop-shadow-lg "
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ zIndex: 100, scale: 1.2 }}
                className=" -mt-8 drop-shadow-2xl w-72 h-auto"
              >
                <img
                  src={item.imageURL}
                  alt="icecream"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>

            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-full bg-red-600 flex items-center relative top-14 justify-center cursor-pointer hover:shadow-md"
              onClick={() => setItems([...cartItems, item])}
            >
              <MdShoppingBasket className="text-white " />
            </motion.div>

            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-white font-semibold text-base md:text-lg capitalize">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-white">
                calories: {item?.calories}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg  mt-1 text-white font-semibold">
                  <span className="text-sm text-yellow-200">$</span>{" "}
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center flex-col justify-center">
          <img src={NotFound} alt="😥" className="h-340" />
          <p className="font-semibold capitalize mt-1">Items not Avaliable</p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
