import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import MainContainer from "./Components/MainContainer";
import CreateContainer from "./Components/CreateContainer";
import { AnimatePresence } from "framer-motion";
import { getAllFoodItems } from "./utils/firebasefunction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function App() {
  // const foodItems = useSelector((state) => state.authentication.foodItems);
  const user = useSelector((state) => state.authentication.user);
  console.log(user);
  const dispatch = useDispatch();
  const fetchData = async () => {
    const data = await getAllFoodItems();
    dispatch({
      type: "FOOD_ITEMS",
      foodItems: data,
    });
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-24 p-8 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route
              path="/createItem"
              element={
                user && user.email === "dhruvin123.saurabhifosys@gmail.com" ? (
                  <CreateContainer />
                ) : (
                  <div />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
