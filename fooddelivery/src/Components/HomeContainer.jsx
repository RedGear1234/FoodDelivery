import React from "react";
import Delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import scooter from "../img/scooter.gif";
import i1 from "../img/i1.png";
import { motion } from "framer-motion";


import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      id="Home"
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
    >
      <div className="py-2 flex-1 flex flex-col items-start md:items-start justify-center gap-6">
        <div className="flex justify-center items-start gap-2 rounded-full  bg-orange-200 px-3 py-2">
          <p className="text-base text-orange-600">Bike Delivery</p>
          <div className="w-6 h-6 rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={scooter}
              alt="Delivery"
              className="w-full p-1 h-full object-contain bg-white"
            />
          </div>
        </div>
        <p className="text-[3.1rem] lg:text-[4.25rem] md:leading-normal font-bold tracking-tight">
          Delivering Deliciousness at Lightning{" "}
          <span className="text-orange-600">Speed</span>
        </p>
        <p className="text-base text-textColor text-center lg:text-left md:w-[80%]">
          From Our Kitchen to Your Doorstep: Experience the Ultimate Convenience
          of Fast Food Delivery and Enjoy Hot and Fresh Meals Without Leaving
          Your Home!
        </p>
        <motion.button
          whileTap={{ scale: 0.6 }}
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-600 w-full md:w-auto px-4 py-2 rounded-sm shadow-lg transition-all duration-100 ease-in-out text-white"
        >
          Order Now
        </motion.button>
      </div>

      <div className="py-2 flex-1 relative">
        <img
          src={heroBg}
          className=" rounded-md  lg:h-550 h-420 w-full lg:w-auto ml-auto"
          alt="heroBg"
        />
        <div className=" gap-6 flex-wrap flex-col w-full h-full absolute top-0 left-0 flex items-center justify-center px-4 py-4 md:px-20 md:py-10 ">
          {heroData &&
            heroData.map((n) => (
              <div
                className="lg:w-190 p-4 bg-cardOverlay rounded-md backdrop-blur-md flex item-center flex-col justify-center drop-shadow-md "
                key={n.id}
              >
                <img
                  src={n.imageSrc}
                  alt="i1"
                  className="md:w-40 md:-mt-22 -mt-14 p-2 w-24 ml-2 md:ml-0"
                />
                <p className=" font-semibold text-textColor text-center text-xs md:text-lg">
                  {n.name}
                </p>
                <p className="text-center text-xs md:text-md font-medium text-lighttextGray my-1">
                  {n.decp}
                </p>
                <p className="text-center text-xs md:text-md font-semibold mt-1  rounded-md p-2 ">
                  <span className="text-orange-600">$</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
