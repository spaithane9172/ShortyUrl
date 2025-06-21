import { useContext } from "react";
import { Context } from "../context/AppContext";

const Modal = ({ isOpen, onClose, title, children }) => {
  const { mode } = useContext(Context);
  if (!isOpen) return null;
  return (
    <div className="bg-gray-400/40 w-[100vw] h-[100vh] absolute top-0 left-0 flex justify-center items-center">
      <div
        className={`${
          mode ? "bg-white text-black" : "bg-slate-800 text-white"
        } rounded-md shadow-md`}
      >
        <div className="w-full flex justify-between items-center border-b-[1px] border-gray-200 py-[0.5rem]">
          <h1 className="text-[0.9rem] pl-[0.5rem] font-semibold">{title}</h1>
          <button
            className="w-fit px-[0.5rem] pb-[0.3rem] font-semibold text-[0.9rem]"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark cursor-pointer"></i>
          </button>
        </div>
        <div className="px-[1rem] py-[0.5rem]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
