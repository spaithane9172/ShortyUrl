import { useContext } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Context } from "../../context/AppContext";
const Navbar = () => {
  const { isUserLogin } = useContext(Context);
  return (
    <nav className="shadow-md flex justify-between items-center px-[1rem] lg:px-[2rem] py-[1rem] bg-gradient-to-b from-gray-300 to-gray-100 fixed w-full">
      <div>
        <img
          src={logo}
          alt=""
          className=" w-[6rem] lg:w-[10rem] h-[2rem] lg:h-[3rem]"
        />
      </div>
      <div>
        {isUserLogin ? (
          <div className="flex justify-center items-center rounded-full w-[2.5rem] h-[2.5rem] border-[1px] border-gray-500 shadow-md cursor-pointer">
            <i className="fa-solid fa-user text-[1.2rem] text-blue-500"></i>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-sm bg-blue-500 text-white font-semibold text-[0.9rem] px-[1.2rem] py-[0.5rem]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
