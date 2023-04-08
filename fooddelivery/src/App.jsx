import { Header, MainContainer, CreateContainer } from "./Components";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { useStateValue } from "./Context/StateProvider";
import { getAllFoodItems } from "./utils/firebasefunction";
import { useEffect } from "react";
import { actionType } from "./Context/reducer";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col text-red-900">
        <Header />
        <main className="mt-16 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
