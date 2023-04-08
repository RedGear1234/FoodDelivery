import React, { useState, useEffect } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../Context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{foodItems}, dispatch] = useStateValue()

  return (
    <section id="menu" className="w-full my-6">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-2xl font-semibold capitalize  relative before:absolute before:rounded-lg before:content before:w-80 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-red-300 to-red-600 transition-all ease-in-out duration-100 mr-auto">
          Flaming Hot Crusted Chicken Tenders
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`mt-2 group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center justify-center duration-150 hover:bg-cartNumBg transition-all ease-in-out`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white group-hover: drop-shadow-lg flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } text-lg group-hover:text-textColor`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white mt-2`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full ">
          <RowContainer flag={false} data={foodItems?.filter(n => n.category ===  filter)} />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
