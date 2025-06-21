import { useContext } from "react";
import { Context } from "../context/AppContext";
import daybg from "../assets/daybg.webp";
import nightbg from "../assets/nightbg.jpg";
import { motion, AnimatePresence } from "framer-motion";

const ThemeButton = () => {
  const { mode, setMode } = useContext(Context);
  return (
    <div>
      <button
        onClick={() => {
          if (mode) {
            localStorage.setItem("mode", "dark");
          } else {
            localStorage.removeItem("mode");
          }
          setMode(!mode);
        }}
        className={`z-1 w-[3.5rem] h-[2rem] flex items-center ${
          mode ? "justify-start" : "justify-end"
        } rounded-full`}
      >
        <img
          src={mode ? daybg : nightbg}
          alt=""
          className={`absolute -z-1 w-[3.5rem] h-[2rem] rounded-full border-[1px] ${
            mode ? "border-black" : "border-white"
          }`}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`mx-[0.1rem] w-[1.7rem] h-[1.7rem] rounded-full bg-white flex justify-center items-center border-[1px] border-gray-600`}
        >
          <AnimatePresence mode="wait">
            {mode ? (
              <motion.i
                key={"sun"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="fa-solid fa-sun text-amber-400 rounded-full text-[1.2rem]"
              ></motion.i>
            ) : (
              <motion.i
                key={"moon"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="fa-solid fa-moon text-black rounded-full text-[1.2rem]"
              ></motion.i>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeButton;
