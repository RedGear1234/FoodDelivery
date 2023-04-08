import React, {  useState, useEffect } from "react";
import Delivery from "../img/delivery.png";
import HomeContainer from "./HomeContainer";
import RowContainer from "./RowContainer";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../Context/StateProvider";

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue ,cartShow]);

  return (
    <div className=" w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-8">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize  relative before:absolute before:rounded-lg before:content before:w-60 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            freshness of our healthy fruits
          </p>
          <div className="item-center hidden md:flex gap-3">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-sm bg-orange-400 flex justify-center items-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-white text-lg" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-sm bg-orange-400 flex justify-center items-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-white text-lg" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>
      {/* Menu container */}
      <MenuContainer />
      {/* CartContainer */}
      {cartShow && (
      <CartContainer />
      )}
    </div>
  );
};

export default MainContainer;
