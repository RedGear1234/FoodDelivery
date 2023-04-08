import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IoFastFoodOutline,
  IoCloudUpload,
  IoPricetagOutline,
} from "react-icons/io5";
import { RiDeleteBin4Line } from "react-icons/ri";
import { MdOutlineFoodBank, MdAttachMoney, MdDelete } from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { storage } from "../../firebase.config";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { useStateValue } from "../Context/StateProvider";

import {
  saveItem,
  getAllFoodItems,
} from "../utils/firebasefunction";
import { actionType } from "../Context/reducer";


const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [alert, setAlert] = useState("danger");
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageasset, setImageasset] = useState(null);
  const [isLodaing, setLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();
  console.log(foodItems)

  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          ref(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg(`Error while uploading :  Try Again 🔔`);
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageasset(downloadURL);
          setLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlert("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, imageasset);
    deleteObject(deleteRef).then(() => {
      setImageasset(null);
      setLoading(false);
      setFields(true);
      setMsg(`Image Deleted Successfully 🗑`);
      setAlert("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setLoading(true);
    try {
      if (!title || !calories || !imageasset || !price || !category) {
        setFields(true);
        setMsg(`Required flieds can't be empty`);
        setAlert("danger");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()},`,
          title: title,
          imageURL: imageasset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setLoading(false);
        setFields(true);
        setMsg(`Data uploaded Successfully 🎉`);
        clearData();
        setAlert("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg(`Error while uploading :  Try Again 🔔`);
      setTimeout(() => {
        setFields(false);
        setLoading(false);
      }, 4000);
    }
    fetchData()
  };

  const clearData = () => {
    setTitle("");
    setImageasset(null);
    setCalories("");
    setPrice("");
    setCalories("");
    setCategory(null);
  };


   const fetchData = async () => {
     await getAllFoodItems().then((data) => {
       dispatch({
         type: actionType.SET_FOOD_ITEMS,
         foodItems: data,
        });
     });
   };


  return (
    <div className="w-full h-auto flex items-center justify-center min-h-screen bg-cardOverlay backdrop-blur-md">
      <div className="w-[90%] md:w-[75%] border flex flex-col items-center justify-center rounded-lg p-4 gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg  text-center text-lg text-grey-400 ${
              alert === "danger"
                ? "bg-red-600 text-white"
                : "bg-green-400 text-white"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <IoFastFoodOutline className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            placeholder=" Give Me Title..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-grey-500 text-gray-500"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer drop-shadow-md"
          >
            <option value="other" className="bg-white ">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base outline-none capitalize text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLodaing ? (
            <Loader />
          ) : (
            <>
              {!imageasset ? (
                <>
                  <label className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                      <IoCloudUpload className="text-gery-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-700 font-['Roboto']">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageasset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute p-2 bottom-3 right-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <RiDeleteBin4Line className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              placeholder="Calories"
              className="w-full h-full text-lg bg-tarnsparent outline-none text-gray-700 border-none placeholder:text-gray-400"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Price"
              className="w-full h-full text-lg bg-tarnsparent outline-none text-gray-700 border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <motion.button
            whileTap={{ scale: 0.6 }}
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-gradient-to-br from-green-400 to-green-600 py-2 px-12 rounded-lg text-lg text-white font-semibold drop-shadow-md"
            onClick={saveDetails}
          >
            Save
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
